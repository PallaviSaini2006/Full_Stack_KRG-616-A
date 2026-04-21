public class ValidationUtil {

    public static void validateUid(String uid) throws IllegalArgumentException {
        if (uid == null || uid.length() < 8 || uid.length() > 12 || uid.contains(" ")) {
            throw new IllegalArgumentException("Invalid UID: must be 8-12 chars, no spaces. Got: " + uid);
        }
    }

    public static void validateAssetId(String assetId) throws IllegalArgumentException {
        if (assetId == null || !assetId.startsWith("LAB-") || !assetId.matches("LAB-\\d+")) {
            throw new IllegalArgumentException("Invalid AssetId: must start with 'LAB-' and end with digits. Got: " + assetId);
        }
    }

    public static void validateHours(int hrs) throws IllegalArgumentException {
        if (hrs < 1 || hrs > 6) {
            throw new IllegalArgumentException("Invalid hours: must be 1-6. Got: " + hrs);
        }
    }
}
