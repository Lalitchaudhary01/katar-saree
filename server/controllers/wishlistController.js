const Wishlist = require("../models/Wishlist");

// Get wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.json(wishlist?.items || []);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  const { userId, productId, name, price, image } = req.body;
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) wishlist = new Wishlist({ userId, items: [] });

    if (!wishlist.items.some((item) => item.productId === productId)) {
      wishlist.items.push({ productId, name, price, image });
      await wishlist.save();
    }
    res.json(wishlist.items);
  } catch (err) {
    res.status(500).json({ error: "Failed to update wishlist" });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.items = wishlist.items.filter(
        (item) => item.productId !== productId
      );
      await wishlist.save();
    }
    res.json(wishlist?.items || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};
