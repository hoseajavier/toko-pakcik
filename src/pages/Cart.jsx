import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, X, ShoppingCart, Package } from "lucide-react";

const formatRupiah = (amount) => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [confirmItem, setConfirmItem] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const removeFromCart = (id, variantKey) => {
    setCart(
      cart.filter((item) => !(item.id === id && item.variantKey === variantKey))
    );
    setConfirmItem(null);
  };

  const updateQuantity = (id, variantKey, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(
      cart.map((item) =>
        item.id === id && item.variantKey === variantKey
          ? { ...item, quantity: Math.min(newQuantity, item.maxStock || 99) }
          : item
      )
    );
  };

  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
      0
    );
  };

  const clearCart = () => {
    setCart([]);
    setConfirmClear(false);
  };

  const handleFinalCheckout = () => {
    if (cart.length === 0) return;

    let message = `Halo, saya ingin memesan:\n`;

    cart.forEach((item) => {
      message += `- ${item.name} (${item.variantKey}) x ${
        item.quantity
      } = ${formatRupiah(item.price * item.quantity)}\n`;
    });

    message += `\nTotal = ${formatRupiah(getTotal())}\n\n`;
    message += `Nama Penerima: ${customer.name}\n`;
    message += `Alamat Pengiriman: ${customer.address}\n`;
    message += `No. Telepon: ${customer.phone}`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "6287722070767";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );

    setCheckoutModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-24 px-4 md:px-12 lg:px-20 relative">
      {/* Enhanced Title with Animation */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex-grow border-t border-gray-300"></div>
        <div className="mx-6 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-gray-600" />
          <span className="text-3xl font-bold tracking-widest text-transparent bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
            SHOPPING CART
          </span>
          <ShoppingCart className="w-8 h-8 text-gray-600" />
        </div>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-auto border border-gray-200 transform hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Add some products to get started!
            </p>
            <button
              onClick={() => (window.location.href = "/shop")}
              className="px-8 py-3 bg-yellow-600 text-white rounded-xl shadow-lg hover:bg-yellow-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Cart Items with Modern Cards */}
          <div className="space-y-6 mb-8">
            {cart.map((item, i) => (
              <div
                key={`${item.id}-${item.variantKey}-${i}`}
                className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group overflow-hidden relative"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>

                <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Product Image & Info */}
                  <div className="flex items-center gap-6 flex-1">
                    <div className="relative group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-28 h-28 object-contain rounded-2xl bg-gray-50 shadow-md group-hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {item.name}
                      </h3>

                      {/* Modern badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-100">
                          {item.type}
                        </span>
                        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-sm font-medium rounded-full border border-gray-200">
                          {item.variantKey}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-yellow-600">
                          {formatRupiah(item.price)}
                        </span>
                        <span className="text-sm text-gray-400">per item</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 lg:w-auto">
                    {/* Modern quantity selector */}
                    <div className="flex items-center bg-gray-50 rounded-2xl p-2 shadow-inner border border-gray-200">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.variantKey,
                            item.quantity - 1
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-all duration-200 disabled:opacity-50 border border-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-16 text-center font-bold text-lg text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.variantKey,
                            item.quantity + 1
                          )
                        }
                        className="w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:bg-green-50 hover:text-green-600 transition-all duration-200 disabled:opacity-50 border border-gray-100"
                        disabled={item.quantity >= (item.maxStock || 99)}
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* Price display */}
                    <div className="text-center lg:text-right bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-100">
                      <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">
                        Subtotal
                      </p>
                      <p className="text-xl font-bold text-gray-800">
                        {formatRupiah(item.quantity * item.price)}
                      </p>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => setConfirmItem(item)}
                      className="w-12 h-12 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md border border-red-100"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Summary Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Total section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600 font-medium">
                    {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    Total Amount
                  </span>
                </div>
                <div className="text-4xl font-bold text-gray-800">
                  {formatRupiah(getTotal())}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setConfirmClear(true)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => setCheckoutModal(true)}
                  className="px-8 py-3 bg-yellow-600 text-white rounded-xl shadow-lg hover:bg-yellow-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold min-w-[200px]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Checkout Modal */}
      {checkoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative max-h-[90vh] overflow-y-auto border border-gray-200">
            <button
              onClick={() => setCheckoutModal(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Checkout
              </h2>
              <p className="text-gray-600">Complete your order information</p>
            </div>

            <div className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({ ...customer, name: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your complete shipping address"
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({ ...customer, address: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 text-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {cart.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.variantKey} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-gray-800">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                  <div className="pt-4 border-t-2 border-gray-300">
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-gray-800">Total</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {formatRupiah(getTotal())}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinalCheckout}
                disabled={
                  !customer.name || !customer.address || !customer.phone
                }
                className="w-full py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
              >
                {!customer.name || !customer.address || !customer.phone
                  ? "Please fill all required fields"
                  : "Confirm & Send to WhatsApp"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Confirm Modals */}
      {confirmItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center border border-gray-200 transform scale-100 transition-transform">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Remove Item?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Remove{" "}
              <span className="font-bold text-gray-800">
                "{confirmItem.name}"
              </span>{" "}
              from your cart?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  removeFromCart(confirmItem.id, confirmItem.variantKey)
                }
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setConfirmItem(null)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-all duration-300 font-semibold shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmClear && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center border border-gray-200">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Clear Cart?
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              This will remove{" "}
              <span className="font-bold">all {cart.length} items</span> from
              your cart.
            </p>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg"
              >
                Yes, Clear All
              </button>
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-all duration-300 font-semibold shadow-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
