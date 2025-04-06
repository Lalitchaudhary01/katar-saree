const Wishlist = require("../models/Wishlist");

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id });
    res.status(200).json(wishlist?.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const {
      productId,
      title,
      image,
      originalPrice,
      discountPrice,
      discount,
      colors,
      desc,
      currencyCode,
      currencySymbol,
    } = req.body;

    let wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user._id, items: [] });
    }

    // Check if item already exists
    const existingItem = wishlist.items.find(
      (item) => item.productId === productId
    );

    if (!existingItem) {
      wishlist.items.push({
        productId,
        title,
        image,
        originalPrice,
        discountPrice,
        discount,
        colors,
        desc,
        currencyCode,
        currencySymbol,
      });
      await wishlist.save();
    }

    res.status(200).json(wishlist.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (wishlist) {
      wishlist.items = wishlist.items.filter(
        (item) => item.productId !== productId
      );
      await wishlist.save();
    }

    res.status(200).json(wishlist?.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

// Clear wishlist
exports.clearWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ userId: req.user._id });
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ error: "Failed to clear wishlist" });
  }
};
