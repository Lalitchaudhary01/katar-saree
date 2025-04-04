const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart?.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, size, color } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        quantity: quantity || 1,
        size,
        color,
        addedAt: new Date(),
      });
    }

    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = cart.items.filter((item) => item.productId !== productId);
      await cart.save();
    }

    res.json(cart?.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
