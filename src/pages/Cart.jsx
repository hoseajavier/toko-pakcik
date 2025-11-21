import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, X, ShoppingCart, Package, ArrowRight, MapPin, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";

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
      // Update cart count globally if you have a custom event listener
      window.dispatchEvent(new Event("storage"));
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
    <div className="bg-white min-h-screen font-sans text-slate-900 pt-28 pb-24">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-10">
           <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Shopping Cart</h1>
           <span className="text-slate-500 font-medium">{cart.length} Items</span>
        </div>

        {cart.length === 0 ? (
          // --- EMPTY STATE ---
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <ShoppingCart className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-slate-500 mb-8 text-center max-w-md">
              Looks like you haven't added any gear yet. 
              Check out our collection to find what you need.
            </p>
            <Link
              to="/shop"
              className="px-8 py-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all duration-300 font-bold flex items-center gap-2"
            >
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          // --- CART CONTENT ---
          <div className="flex flex-col lg:flex-row gap-12 relative">
            
            {/* LEFT: Cart Items List */}
            <div className="flex-1 space-y-6">
              {cart.map((item, i) => (
                <div
                  key={`${item.id}-${item.variantKey}-${i}`}
                  className="flex flex-col sm:flex-row gap-6 p-4 sm:p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all"
                >
                  {/* Image */}
                  <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                       <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                             {item.name}
                          </h3>
                          <button 
                             onClick={() => setConfirmItem(item)}
                             className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                       <p className="text-sm text-slate-500 mb-1">{item.type}</p>
                       <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md uppercase tracking-wider">
                          {item.variantKey}
                       </span>
                    </div>

                    <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                       {/* Quantity Control */}
                       <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                          <button
                             onClick={() => updateQuantity(item.id, item.variantKey, item.quantity - 1)}
                             disabled={item.quantity <= 1}
                             className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 transition"
                          >
                             <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                          <button
                             onClick={() => updateQuantity(item.id, item.variantKey, item.quantity + 1)}
                             disabled={item.quantity >= (item.maxStock || 99)}
                             className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-30 transition"
                          >
                             <Plus size={14} />
                          </button>
                       </div>

                       {/* Price */}
                       <div className="text-right">
                          <p className="text-sm text-slate-400">Total</p>
                          <p className="text-lg font-bold text-yellow-600">
                             {formatRupiah(item.quantity * item.price)}
                          </p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}

               <button
                  onClick={() => setConfirmClear(true)}
                  className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-2 mt-4 pl-2"
                >
                  <Trash2 size={16} /> Clear Shopping Cart
               </button>
            </div>

            {/* RIGHT: Order Summary (Sticky) */}
            <div className="lg:w-96 shrink-0">
               <div className="sticky top-32 bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                     <div className="flex justify-between text-slate-600">
                        <span>Subtotal ({cart.length} items)</span>
                        <span>{formatRupiah(getTotal())}</span>
                     </div>
                     <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Calculated via WA</span>
                     </div>
                  </div>
                  
                  <div className="border-t border-slate-200 pt-4 mb-8">
                     <div className="flex justify-between items-end">
                        <span className="font-bold text-slate-900">Total</span>
                        <span className="text-2xl font-bold text-slate-900">{formatRupiah(getTotal())}</span>
                     </div>
                  </div>

                  <button
                    onClick={() => setCheckoutModal(true)}
                    className="w-full py-4 bg-yellow-500 text-slate-900 rounded-xl font-bold shadow-lg hover:bg-yellow-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                     Checkout Now <ArrowRight size={20} />
                  </button>
               </div>
            </div>

          </div>
        )}
      </div>

      {/* --- CHECKOUT MODAL --- */}
      {checkoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
               <h2 className="text-lg font-bold text-slate-900">Customer Details</h2>
               <button onClick={() => setCheckoutModal(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition">
                  <X size={20} />
               </button>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-5">
               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                     <User size={16} /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:bg-white focus:outline-none transition-all"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                     <Phone size={16} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 08123456789"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:bg-white focus:outline-none transition-all"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                     <MapPin size={16} /> Shipping Address
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Full street address, city, province"
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-yellow-500 focus:bg-white focus:outline-none transition-all resize-none"
                  />
               </div>

               <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-sm text-yellow-800">
                  <p>We will redirect you to <strong>WhatsApp</strong> to finalize the payment and shipping details with our admin.</p>
               </div>
            </div>

            {/* Footer */}
            <div className="p-6 pt-0">
               <button
                  onClick={handleFinalCheckout}
                  disabled={!customer.name || !customer.address || !customer.phone}
                  className="w-full py-3 bg-green-600 text-white rounded-xl font-bold shadow-lg hover:bg-green-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none transition-all"
               >
                  Confirm Order via WhatsApp
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- DELETE CONFIRMATION MODAL --- */}
      {confirmItem && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Remove Item?</h3>
            <p className="text-slate-500 mb-6">
               Are you sure you want to remove <span className="font-bold text-slate-900">"{confirmItem.name}"</span> from your cart?
            </p>
            <div className="flex gap-3">
               <button onClick={() => setConfirmItem(null)} className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition">Cancel</button>
               <button onClick={() => removeFromCart(confirmItem.id, confirmItem.variantKey)} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition">Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* --- CLEAR CART MODAL --- */}
      {confirmClear && (
        <div className="fixed inset-0 flex items-center justify-center z-[60] bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center">
             <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
               <Trash2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Clear Cart?</h3>
            <p className="text-slate-500 mb-6">
               This will remove all items from your shopping cart. This action cannot be undone.
            </p>
            <div className="flex gap-3">
               <button onClick={() => setConfirmClear(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-bold hover:bg-slate-200 transition">Cancel</button>
               <button onClick={clearCart} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition">Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;