import java.util.HashMap;

public class AssetStore {
    private HashMap<String, Asset> assets;

    public AssetStore() {
        this.assets = new HashMap<>();
    }

    public void addAsset(Asset asset) {
        assets.put(asset.getAssetId(), asset);
    }

    public Asset findAsset(String assetId) throws NullPointerException {
        Asset asset = assets.get(assetId);
        if (asset == null) {
            throw new NullPointerException("Asset not found: " + assetId);
        }
        return asset;
    }

    public void markBorrowed(Asset asset) throws IllegalStateException {
        if (!asset.isAvailable()) {
            throw new IllegalStateException("Asset already borrowed: " + asset.getAssetId());
        }
        asset.setAvailable(false);
    }
}
