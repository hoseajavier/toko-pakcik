import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, ShoppingCart, ShieldCheck, Truck, Phone } from "lucide-react";

// --- MOCK DATA (Ganti dengan import lokal Anda) ---
import dataDetailProduct from "../data/dataDetailProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const product = dataDetailProduct.find((p) => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  // ===== Variant Handling =====
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.length === 1 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  
  // ===== Notification (Toast) =====
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-700 bg-gray-50">
        <p className="text-lg font-medium">Product not found</p>
        <Link to="/shop" className="ml-4 text-yellow-600 hover:underline">Back to Shop</Link>
      </div>
    );
  }

  const images = Array.isArray(product.image) ? product.image : [product.image];

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const variantLabel = product.variants[0]?.size
    ? "Size"
    : product.variants[0]?.color
    ? "Color"
    : "Variant";

  const handleVariantChange = (val) => {
    const chosen = product.variants.find(
      (v) => v.size === val || v.color === val
    );
    setSelectedVariant(chosen);
    setQuantity(1);
  };

  const handleQuantityChange = (type) => {
     if (!selectedVariant) return;
     
     if (type === 'increase') {
        if (quantity < selectedVariant.stock) setQuantity(quantity + 1);
     } else {
        if (quantity > 1) setQuantity(quantity - 1);
     }
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  // ====== ADD TO CART ======
  const handleAddToCart = () => {
    if (!selectedVariant) {
      showToast("error", "Please select a variant first.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const variantKey = selectedVariant.size || selectedVariant.color || "default";

    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.variantKey === variantKey
    );

    if (existingIndex >= 0) {
      if (cart[existingIndex].quantity + quantity > selectedVariant.stock) {
        showToast("error", "Quantity exceeds available stock.");
        return;
      }
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        type: product.type,
        image: images[0],
        variant: selectedVariant,
        variantKey,
        quantity,
        price: parseInt(selectedVariant.price.replace(/[^\d]/g, ""), 10),
        maxStock: selectedVariant.stock,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("success", "Product added to cart successfully!");
    // Optional: Trigger storage event for Navbar cart count update if needed
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 pt-28 pb-20">
      
      {/* Toast Notification */}
      <div className={`fixed top-24 right-5 z-50 transition-all duration-500 transform ${toast.show ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${toast.type === "success" ? "bg-white border-green-100 text-green-700" : "bg-white border-red-100 text-red-600"}`}>
          {toast.type === "success" ? <CheckCircle size={20} className="text-green-500" /> : <XCircle size={20} className="text-red-500" />}
          <span className="font-medium">{toast.message}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm font-medium text-slate-500">
           <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
           <span className="mx-2">/</span>
           <Link to="/shop" className="hover:text-slate-900 transition-colors">Shop</Link>
           <span className="mx-2">/</span>
           <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT COLUMN: PRODUCT IMAGES */}
          <div className="space-y-6">
             {/* Main Image */}
             <div className="relative bg-slate-50 rounded-3xl overflow-hidden aspect-square group">
                <img
                  src={images[currentImage]}
                  alt={product.name}
                  className="w-full h-full object-contain object-center p-8 transition-transform duration-500 group-hover:scale-105"
                />
                
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white text-slate-900 shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0">
                       <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white text-slate-900 shadow-lg transition-all opacity-0 group-hover:opacity-100 translate-x-[10px] group-hover:translate-x-0">
                       <ChevronRight size={24} />
                    </button>
                  </>
                )}
             </div>

             {/* Thumbnails */}
             {images.length > 1 && (
               <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                 {images.map((img, i) => (
                   <button
                     key={i}
                     onClick={() => setCurrentImage(i)}
                     className={`flex-shrink-0 w-24 h-24 rounded-xl border-2 overflow-hidden transition-all ${
                       currentImage === i ? "border-slate-900 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                     }`}
                   >
                     <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
             )}
          </div>

          {/* RIGHT COLUMN: PRODUCT INFO */}
          <div className="lg:sticky lg:top-32 h-fit space-y-8">
             
             {/* Header */}
             <div>
                <span className="text-yellow-600 font-bold tracking-wider text-sm uppercase mb-2 block">{product.type}</span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
                
                {/* Price Display */}
                <div className="flex items-baseline gap-4">
                   {selectedVariant ? (
                      <span className="text-3xl font-bold text-slate-900">{selectedVariant.price}</span>
                   ) : (
                      <span className="text-3xl font-bold text-slate-900">
                        {/* Logic to show range if multiple variants exist, simplified here */}
                        From {product.variants[0].price}
                      </span>
                   )}
                   {selectedVariant && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedVariant.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                         {selectedVariant.stock > 0 ? `In Stock (${selectedVariant.stock})` : 'Out of Stock'}
                      </span>
                   )}
                </div>
             </div>
             
             <hr className="border-slate-100" />

             {/* Controls */}
             <div className="space-y-6">
                
                {/* Variant Selector */}
                {product.variants.length > 1 && (
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-3">Select {variantLabel}</label>
                      <div className="flex flex-wrap gap-3">
                         {product.variants.map((v, i) => {
                            const val = v.size || v.color;
                            const isSelected = selectedVariant && (selectedVariant.size === val || selectedVariant.color === val);
                            return (
                               <button
                                  key={i}
                                  onClick={() => handleVariantChange(val)}
                                  className={`px-6 py-3 rounded-lg border text-sm font-medium transition-all ${
                                    isSelected 
                                      ? "border-slate-900 bg-slate-900 text-white shadow-md" 
                                      : "border-slate-200 text-slate-600 hover:border-slate-400"
                                  }`}
                               >
                                  {val}
                               </button>
                            );
                         })}
                      </div>
                   </div>
                )}

                {/* Quantity Selector */}
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-3">Quantity</label>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center border border-slate-300 rounded-lg">
                         <button 
                            onClick={() => handleQuantityChange('decrease')}
                            disabled={!selectedVariant || quantity <= 1}
                            className="px-4 py-3 hover:bg-slate-50 rounded-l-lg disabled:opacity-50 transition"
                         >
                            -
                         </button>
                         <span className="w-12 text-center font-medium">{quantity}</span>
                         <button 
                            onClick={() => handleQuantityChange('increase')}
                            disabled={!selectedVariant || quantity >= selectedVariant.stock}
                            className="px-4 py-3 hover:bg-slate-50 rounded-r-lg disabled:opacity-50 transition"
                         >
                            +
                         </button>
                      </div>
                   </div>
                </div>

                {/* Action Button */}
                <button
                   onClick={handleAddToCart}
                   disabled={!selectedVariant || selectedVariant.stock === 0}
                   className={`w-full py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 ${
                      !selectedVariant || selectedVariant.stock === 0 
                        ? "hover:bg-gray-800 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                        : "bg-black text-white"
                   }`}
                >
                   <ShoppingCart />
                   Add to Cart
                </button>
             </div>

             {/* Value Props */}
             <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
                   <Truck className="text-slate-400 shrink-0" />
                   <div>
                      <h4 className="font-bold text-sm">Fast Delivery</h4>
                      <p className="text-xs text-slate-500 mt-1">Shipping via JNE & EMS</p>
                   </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
                   <ShieldCheck className="text-slate-400 shrink-0" />
                   <div>
                      <h4 className="font-bold text-sm">Official Gear</h4>
                      <p className="text-xs text-slate-500 mt-1">100% Authentic Product</p>
                   </div>
                </div>
             </div>

             {/* Contact Support */}
             <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                <div className="flex items-start gap-4">
                   <div className="bg-green-100 p-3 rounded-full text-green-600">
                      <Phone size={24} />
                   </div>
                   <div>
                      <h3 className="font-bold text-slate-900">Need Help?</h3>
                      <p className="text-sm text-slate-600 mt-1 mb-4">
                         Have questions about sizing or material? Chat with our expert team.
                      </p>
                      <a
                        href={`https://wa.me/6287722070767?text=${encodeURIComponent(
                          `Halo, saya ingin menanyakan mengenai *${product.name}*${
                            selectedVariant 
                              ? ` dengan ${variantLabel} *${selectedVariant.size || selectedVariant.color}*`
                              : ""
                          }`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-green-700 hover:text-green-800 hover:underline"
                      >
                        Chat via WhatsApp →
                      </a>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;