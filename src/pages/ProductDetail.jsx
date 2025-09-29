import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";
import dataDetailProduct from "../data/dataDetailProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const product = dataDetailProduct.find((p) => p.id === parseInt(id));
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        <p>Product not found</p>
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

  // ===== Variant Handling =====
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.length === 1 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const variantLabel = product.variants[0]?.size
    ? "size"
    : product.variants[0]?.color
    ? "color"
    : "variant";

  const handleVariantChange = (e) => {
    const chosen = product.variants.find(
      (v) => v.size === e.target.value || v.color === e.target.value
    );
    setSelectedVariant(chosen);
    setQuantity(1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (selectedVariant) {
      if (value > selectedVariant.stock) {
        setQuantity(selectedVariant.stock);
      } else if (value < 1) {
        setQuantity(1);
      } else {
        setQuantity(value);
      }
    } else {
      setQuantity(value < 1 ? 1 : value);
    }
  };

  // ===== Notification (Toast) =====
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });

    if (showToast.timeoutId) {
      clearTimeout(showToast.timeoutId);
    }

    showToast.timeoutId = setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  // ====== ADD TO CART (versi fix sinkron Cart.jsx) ======
  const handleAddToCart = () => {
    if (!selectedVariant) {
      showToast("error", "Please select a variant first.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const variantKey =
      selectedVariant.size || selectedVariant.color || "default";

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
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 relative">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white transition 
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <XCircle size={20} />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Back */}
      <Link to="/shop" className="text-yellow-600 hover:underline">
        ← Back to Shop
      </Link>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-10 mt-8">
        {/* Images */}
        <div className="flex flex-col items-center">
          <div className="relative w-full flex items-center justify-center bg-white rounded-xl shadow-md p-4">
            <img
              src={images[currentImage]}
              alt={`${product.name}-${currentImage}`}
              className="w-full h-auto max-h-[400px] object-contain rounded-lg"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4 flex-wrap justify-center">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name}-thumb-${i}`}
                  className={`w-20 h-20 object-contain rounded-lg border-2 cursor-pointer transition ${
                    currentImage === i
                      ? "border-yellow-500"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setCurrentImage(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-6">{product.type}</p>

          {/* Harga & Stok */}
          {selectedVariant && (
            <div className="mb-6">
              <p className="text-lg font-bold text-yellow-600">
                {selectedVariant.price}
              </p>
              <p className="text-sm text-gray-500">
                Stock: {selectedVariant.stock}
              </p>
            </div>
          )}

          {/* Dropdown untuk size / color */}
          {product.variants.length > 1 && (
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Choose {product.variants[0].size ? "Size" : "Color"}
              </label>
              <select
                onChange={handleVariantChange}
                value={
                  selectedVariant
                    ? selectedVariant.size || selectedVariant.color
                    : ""
                }
                className="border border-gray-300 rounded-lg px-4 py-2 w-full text-sm shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              >
                <option value="">-- Select --</option>
                {product.variants.map((v, i) => (
                  <option key={i} value={v.size || v.color}>
                    {v.size || v.color}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Input Quantity */}
          {selectedVariant && (
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="border border-gray-300 rounded-lg px-4 py-2 w-24 text-center shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              disabled={!selectedVariant}
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
                selectedVariant
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart
            </button>
          </div>
          {/* Contact Admin Section */}
          <div className="mt-10">
            <h3 className="text-gray-700 font-medium mb-3">
              If you have any questions, feel free to chat with our Admin via
              WhatsApp:
            </h3>
            <a
              href={`https://wa.me/6287722070767?text=${encodeURIComponent(
                `Halo, saya ingin menanyakan mengenai *${product.name}*${
                  selectedVariant && product.variants.length > 1
                    ? ` dengan ${variantLabel} *${
                        selectedVariant.size || selectedVariant.color
                      }*`
                    : ""
                }`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition"
            >
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
