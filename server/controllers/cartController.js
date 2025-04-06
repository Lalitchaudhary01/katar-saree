const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    res.status(200).json(cart?.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, color, price, name, image } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId && item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        productId,
        quantity: quantity || 1,
        color,
        price,
        name,
        image,
        addedAt: new Date(),
      });
    }

    await cart.save();
    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId, color, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId && item.color === color
      );

      if (itemIndex > -1) {
        if (quantity > 0) {
          cart.items[itemIndex].quantity = quantity;
        } else {
          cart.items.splice(itemIndex, 1);
        }
        await cart.save();
      }
    }

    res.status(200).json(cart?.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to update quantity" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId, color } = req.body;
    const cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => !(item.productId === productId && item.color === color)
      );
      await cart.save();
    }

    res.status(200).json(cart?.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.user._id });
    res.status(200).json([]);
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
