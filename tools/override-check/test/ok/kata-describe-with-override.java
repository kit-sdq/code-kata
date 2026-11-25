class LibraryItem {
    private final String title;
    private final String signature;

    public LibraryItem(String title, String signature) {
        this.title = title;
        this.signature = signature;
    }

    public String getTitle() {
        return title;
    }

    public String describe() {
        return title + " (" + signature + ")";
    }
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

public class Main {
    public static void main(String[] args) {
        LibraryItem item = new Book("Faust", "L 100", "Goethe");
        System.out.println(item.describe());
    }
}
