class LibraryItem {
    @Override
    public boolean equals(Object object) {
        return object instanceof LibraryItem;
    }

    @Override
    public int hashCode() {
        return 1;
    }
}

class Book extends LibraryItem {
    // overloads equals, does not override: must not be reported
    public boolean equals(Book other) {
        return true;
    }

    public static String label() {
        return "static methods are skipped";
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Book().equals(new Book()));
    }
}
