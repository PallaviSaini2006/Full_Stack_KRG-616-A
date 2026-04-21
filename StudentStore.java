import java.util.HashMap;

public class StudentStore {
    private HashMap<String, Student> students;

    public StudentStore() {
        this.students = new HashMap<>();
    }

    public void addStudent(Student student) {
        students.put(student.getUid(), student);
    }

    public Student findStudent(String uid) throws NullPointerException {
        Student student = students.get(uid);
        if (student == null) {
            throw new NullPointerException("Student not found: " + uid);
        }
        return student;
    }
}
