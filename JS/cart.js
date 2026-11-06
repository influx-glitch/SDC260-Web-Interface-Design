/*
Name: Jessica Hussain
Last Updated: 11/01/2026
Project: Briar & Bone
Purpose: Share saved cart information between store pages.
*/

const CART_STORAGE_KEY = "briarAndBoneCart";

// Reads saved items. An empty or invalid cart returns an empty array.
function getCart() {
    try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        const cart = savedCart ? JSON.parse(savedCart) : [];

        if (!Array.isArray(cart)) {
            return [];
        }

        // Keep only items with the expected information.
        return cart.filter(function (item) {
            return (
                item !== null &&
                typeof item === "object" &&
                typeof item.id === "string" &&
                typeof item.name === "string" &&
                Number.isFinite(item.price) &&
                item.price >= 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0
            );
        });
    } catch (error) {
        console.error("Could not read the saved cart:", error);
        return [];
    }
}

// Saves the cart after items or quantities change.
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        return true;
    } catch (error) {
        console.error("Could not save the cart:", error);
        return false;
    }
}

// Calculates the subtotal in cents to keep currency rounding consistent.
function getCartSubtotal() {
    const subtotalCents = getCart().reduce(function (total, item) {
        return total + Math.round(item.price * 100) * item.quantity;
    }, 0);

    return subtotalCents / 100;
}