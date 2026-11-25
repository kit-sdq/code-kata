public class Main {
    static class LibraryItem {
        public String describe() {
            return "Medium";
        }
    }

    static class Book extends LibraryItem {
        public String describe() {
            return "Buch";
        }
    }

    public static void main(String[] args) {
        System.out.println(new Book().describe());
    }
}
