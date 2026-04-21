public class Main {
    public static void main(String[] args) {
        // Initialize stores
        StudentStore studentStore = new StudentStore();
        AssetStore assetStore = new AssetStore();

        // Create 2-3 students (hardcoded)
        Student student1 = new Student("KRG20281", "Alice Kumar", 0, 0);
        Student student2 = new Student("KRG20282", "Bob Singh", 50, 2);
        Student student3 = new Student("XYZ19001", "Charlie Brown", 0, 0);

        studentStore.addStudent(student1);
        studentStore.addStudent(student2);
        studentStore.addStudent(student3);

        // Create 3-4 assets (hardcoded)
        Asset asset1 = new Asset("LAB-101", "HDMI Cable", true, 1);
        Asset asset2 = new Asset("LAB-102", "Network Adapter", true, 2);
        Asset asset3 = new Asset("LAB-103", "High Security Key", true, 3);
        Asset asset4 = new Asset("LAB-104", "USB Cable", false, 1);

        assetStore.addAsset(asset1);
        assetStore.addAsset(asset2);
        assetStore.addAsset(asset3);
        assetStore.addAsset(asset4);

        // Create checkout service
        CheckoutService service = new CheckoutService(studentStore, assetStore);

        System.out.println("========== LAB ITEM CHECKOUT SYSTEM ==========\n");

        // Test Case 1: Successful checkout
        System.out.println("--- TEST 1: Successful Checkout ---");
        CheckoutRequest req1 = new CheckoutRequest("KRG20281", "LAB-102", 4);
        try {
            String receipt = service.checkout(req1);
            System.out.println("SUCCESS: " + receipt);
        } catch (IllegalArgumentException e) {
            AuditLogger.logError(e);
        } catch (NullPointerException e) {
            AuditLogger.logError(e);
        } catch (SecurityException e) {
            AuditLogger.logError(e);
        } catch (IllegalStateException e) {
            AuditLogger.logError(e);
        } finally {
            AuditLogger.log("Attempt finished for UID=KRG20281, asset=LAB-102");
        }

        System.out.println();

        // Test Case 2: Invalid hours
        System.out.println("--- TEST 2: Invalid Hours (8 hours) ---");
        CheckoutRequest req2 = new CheckoutRequest("KRG20281", "LAB-101", 8);
        try {
            String receipt = service.checkout(req2);
            System.out.println("SUCCESS: " + receipt);
        } catch (IllegalArgumentException e) {
            AuditLogger.logError(e);
        } catch (NullPointerException e) {
            AuditLogger.logError(e);
        } catch (SecurityException e) {
            AuditLogger.logError(e);
        } catch (IllegalStateException e) {
            AuditLogger.logError(e);
        } finally {
            AuditLogger.log("Attempt finished for UID=KRG20281, asset=LAB-101");
        }

        System.out.println();

        // Test Case 3: Policy failure - fine amount > 0
        System.out.println("--- TEST 3: Policy Failure (Outstanding Fine) ---");
        CheckoutRequest req3 = new CheckoutRequest("KRG20282", "LAB-101", 3);
        try {
            String receipt = service.checkout(req3);
            System.out.println("SUCCESS: " + receipt);
        } catch (IllegalArgumentException e) {
            AuditLogger.logError(e);
        } catch (NullPointerException e) {
            AuditLogger.logError(e);
        } catch (SecurityException e) {
            AuditLogger.logError(e);
        } catch (IllegalStateException e) {
            AuditLogger.logError(e);
        } finally {
            AuditLogger.log("Attempt finished for UID=KRG20282, asset=LAB-101");
        }

        System.out.println();

        // Test Case 4: Security restriction - Level 3 asset, non-KRG user
        System.out.println("--- TEST 4: Security Restriction (Non-KRG User) ---");
        CheckoutRequest req4 = new CheckoutRequest("XYZ19001", "LAB-103", 2);
        try {
            String receipt = service.checkout(req4);
            System.out.println("SUCCESS: " + receipt);
        } catch (IllegalArgumentException e) {
            AuditLogger.logError(e);
        } catch (NullPointerException e) {
            AuditLogger.logError(e);
        } catch (SecurityException e) {
            AuditLogger.logError(e);
        } catch (IllegalStateException e) {
            AuditLogger.logError(e);
        } finally {
            AuditLogger.log("Attempt finished for UID=XYZ19001, asset=LAB-103");
        }

        System.out.println();

        // Test Case 5: Max hours warning and cable policy
        System.out.println("--- TEST 5: Max Hours Warning (6 hours) ---");
        CheckoutRequest req5 = new CheckoutRequest("KRG20281", "LAB-101", 6);
        try {
            String receipt = service.checkout(req5);
            System.out.println("SUCCESS: " + receipt);
        } catch (IllegalArgumentException e) {
            AuditLogger.logError(e);
        } catch (NullPointerException e) {
            AuditLogger.logError(e);
        } catch (SecurityException e) {
            AuditLogger.logError(e);
        } catch (IllegalStateException e) {
            AuditLogger.logError(e);
        } finally {
            AuditLogger.log("Attempt finished for UID=KRG20281, asset=LAB-101");
        }
    }
}
