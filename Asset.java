public class Asset {
    private final String assetId;
    private final String assetName;
    private boolean available;
    private final int securityLevel;

    public Asset(String assetId, String assetName, boolean available, int securityLevel) {
        this.assetId = assetId;
        this.assetName = assetName;
        this.available = available;
        this.securityLevel = securityLevel;
    }

    public String getAssetId() {
        return assetId;
    }

    public String getAssetName() {
        return assetName;
    }

    public boolean isAvailable() {
        return available;
    }

    public int getSecurityLevel() {
        return securityLevel;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
}
