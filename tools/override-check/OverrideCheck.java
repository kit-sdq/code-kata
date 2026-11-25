import java.util.HashSet;
import java.util.Set;

import javax.annotation.processing.AbstractProcessor;
import javax.annotation.processing.RoundEnvironment;
import javax.annotation.processing.SupportedAnnotationTypes;
import javax.lang.model.SourceVersion;
import javax.lang.model.element.Element;
import javax.lang.model.element.ExecutableElement;
import javax.lang.model.element.Modifier;
import javax.lang.model.element.TypeElement;
import javax.lang.model.type.TypeMirror;
import javax.lang.model.util.ElementFilter;
import javax.tools.Diagnostic;

/**
 * Opt-in course rule for code katas with {@code requireOverride: true}: every method that
 * overrides or implements a method of a superclass or interface must carry {@code @Override}.
 * javac runs this processor in the browser (CheerpJ, JDK 8 tools.jar) via
 * {@code -processorpath /str/override-check.jar -processor OverrideCheck}, see
 * public/sandbox-worker.js. A finding is reported as a compile error, so it shows up in the
 * site's existing compile-error display.
 *
 * Covered: top-level classes, interfaces and enums of the submitted source and their member
 * (nested) types, recursively. The compiler decides what overrides (Elements.overrides), so
 * overloads such as equals(Book) are not reported.
 * Known limits: methods in anonymous classes and local classes are not checked (they are not
 * reachable through the element API). Static methods are skipped (they hide, they do not
 * override). Java 8 compatible: build with tools/override-check/build.sh (javac --release 8).
 */
@SupportedAnnotationTypes("*")
public class OverrideCheck extends AbstractProcessor {

    @Override
    public SourceVersion getSupportedSourceVersion() {
        return SourceVersion.latestSupported();
    }

    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment env) {
        for (Element root : env.getRootElements()) {
            if (root instanceof TypeElement) {
                checkType((TypeElement) root);
            }
        }
        return false;
    }

    private void checkType(TypeElement type) {
        for (ExecutableElement method : ElementFilter.methodsIn(type.getEnclosedElements())) {
            if (method.getModifiers().contains(Modifier.STATIC) || method.getAnnotation(Override.class) != null) {
                continue;
            }
            if (overridesSomething(method, type, type.asType(), new HashSet<String>())) {
                processingEnv.getMessager().printMessage(Diagnostic.Kind.ERROR,
                    "Die Methode " + method.getSimpleName() + "() überschreibt eine Methode einer Oberklasse"
                        + " oder eines Interfaces und hat kein @Override. In diesem Kurs bekommt jede"
                        + " überschreibende Methode @Override.",
                    method);
            }
        }
        for (TypeElement nested : ElementFilter.typesIn(type.getEnclosedElements())) {
            checkType(nested);
        }
    }

    private boolean overridesSomething(ExecutableElement method, TypeElement type, TypeMirror current, Set<String> seen) {
        for (TypeMirror superType : processingEnv.getTypeUtils().directSupertypes(current)) {
            Element superElement = processingEnv.getTypeUtils().asElement(superType);
            if (!(superElement instanceof TypeElement)) {
                continue;
            }
            TypeElement superTypeElement = (TypeElement) superElement;
            if (!seen.add(superTypeElement.getQualifiedName().toString())) {
                continue;
            }
            for (ExecutableElement candidate : ElementFilter.methodsIn(superTypeElement.getEnclosedElements())) {
                if (processingEnv.getElementUtils().overrides(method, candidate, type)) {
                    return true;
                }
            }
            if (overridesSomething(method, type, superType, seen)) {
                return true;
            }
        }
        return false;
    }
}
