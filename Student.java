public class Student {
    private String uid;
    private String name;
    private int fineAmount;
    private int currentBorrowCount;

    public Student(String uid, String name, int fineAmount, int currentBorrowCount) {
        this.uid = uid;
        this.name = name;
        this.fineAmount = fineAmount;
        this.currentBorrowCount = currentBorrowCount;
    }

    public String getUid() {
        return uid;
    }

    public String getName() {
        return name;
    }

    public int getFineAmount() {
        return fineAmount;
    }

    public int getCurrentBorrowCount() {
        return currentBorrowCount;
    }

    public void setFineAmount(int amount) {
        this.fineAmount = amount;
    }

    public void incrementBorrowCount() {
        this.currentBorrowCount++;
    }
}
