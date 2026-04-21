import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class CheckoutService {
    private StudentStore studentStore;
    private AssetStore assetStore;

    public CheckoutService(StudentStore studentStore, AssetStore assetStore) {
        this.studentStore = studentStore;
        this.assetStore = assetStore;
    }

    public String checkout(CheckoutRequest req) throws IllegalArgumentException, IllegalStateException, SecurityException, NullPointerException {
        // 1. Validate request fields using ValidationUtil
        ValidationUtil.validateUid(req.getUid());
        ValidationUtil.validateAssetId(req.getAssetId());
        ValidationUtil.validateHours(req.getHoursRequested());

        // 2. Fetch student + asset
        Student student = studentStore.findStudent(req.getUid());
        Asset asset = assetStore.findAsset(req.getAssetId());

        // 3. Apply policies
        // Check fine amount
        if (student.getFineAmount() > 0) {
            throw new IllegalStateException("Student has outstanding fine: $" + student.getFineAmount());
        }

        // Check borrow limit
        if (student.getCurrentBorrowCount() >= 2) {
            throw new IllegalStateException("Student has reached borrow limit (2 items)");
        }

        // Check asset availability
        if (!asset.isAvailable()) {
            throw new IllegalStateException("Asset not available: " + asset.getAssetId());
        }

        // Check security level
        if (asset.getSecurityLevel() == 3 && !req.getUid().startsWith("KRG")) {
            throw new SecurityException("Security level 3 asset restricted to KRG users only");
        }

        // 4. Apply realistic constraints
        int hoursToCheckout = req.getHoursRequested();

        if (hoursToCheckout == 6) {
            System.out.println("WARNING: Max duration selected. Return strictly on time.");
        }

        if (asset.getAssetName().contains("Cable") && hoursToCheckout > 3) {
            System.out.println("Policy applied: Cables can be issued max 3 hours. Updated to 3.");
            hoursToCheckout = 3;
        }

        // Mark asset as borrowed
        assetStore.markBorrowed(asset);
        student.incrementBorrowCount();

        // 5. Generate and return receipt
        String txnId = generateTransactionId(req.getAssetId(), req.getUid());
        String receipt = String.format("%s | Student: %s | Asset: %s | Hours: %d",
                txnId, student.getName(), asset.getAssetName(), hoursToCheckout);

        return receipt;
    }

    private String generateTransactionId(String assetId, String uid) {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return "TXN-" + today.format(formatter) + "-" + assetId + "-" + uid;
    }
}
