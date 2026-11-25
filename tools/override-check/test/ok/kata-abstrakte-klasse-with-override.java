import java.util.ArrayList;
import java.util.List;

abstract class LibraryItem {
    private final String title;
    private final String signature;

    public LibraryItem(String title, String signature) {
        this.title = title;
        this.signature = signature;
    }

    public String getTitle() {
        return title;
    }

    public abstract String describe();
}

class Book extends LibraryItem {
    private final String author;

    public Book(String title, String signature, String author) {
        super(title, signature);
        this.author = author;
    }

    @Override
    public String describe() {
        return "Buch: " + getTitle() + " von " + author;
    }
}

class Magazine extends LibraryItem {
    private final int issue;

    public Magazine(String title, String signature, int issue) {
        super(title, signature);
        this.issue = issue;
    }
    @Override
    public String describe() {
        return "Heft: " + getTitle() + " Nr. " + issue;
    }
}

class Newspaper extends LibraryItem {
    private final String date;

    public Newspaper(String title, String signature, String date) {
        super(title, signature);
        this.date = date;
    }
    @Override
    public String describe() {
        return "Zeitung: " + getTitle() + " vom " + date;
    }
}

public class Main {
    public static void main(String[] args) {
        List<LibraryItem> items = new ArrayList<>();
        items.add(new Book("Faust", "L 100", "Goethe"));
        items.add(new Magazine("c't", "Z 20", 14));
        items.add(new Newspaper("Stadtanzeiger", "Z 31", "25.11.2026"));
        for (LibraryItem item : items) {
            System.out.println(item.describe());
        }
    }
}
