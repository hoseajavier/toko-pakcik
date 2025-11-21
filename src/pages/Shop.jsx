import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  ChevronDown,
  Search,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- DATA ---
import dataProduct from "../data/dataProduct";
import featuredProduct from "../data/featuredProduct";

const Shop = () => {
  // ================= STATE: SHOP GENERAL =================
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  // ================= STATE: FEATURED PRODUCT & CART =================
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const featuredImages = featuredProduct.images || [];
  const WHATSAPP_LINK =
    "https://wa.me/6287722070767?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20celana%20chino%20ini.%20Bisa%20tolong%20berikan%20info%20lebih%20lanjut%3F";

  // ================= EFFECTS =================
  // Auto-slide Featured Product
  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) =>
        prev === featuredImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredImages.length]);

  // ================= HANDLERS: FEATURED CAROUSEL =================
  const nextFeaturedSlide = () => {
    setFeaturedIndex((prev) =>
      prev === featuredImages.length - 1 ? 0 : prev + 1
    );
  };
  const prevFeaturedSlide = () => {
    setFeaturedIndex((prev) =>
      prev === 0 ? featuredImages.length - 1 : prev - 1
    );
  };

  // ================= HANDLERS: ADD TO CART LOGIC =================
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast("error", "Please select a size first.");
      return;
    }

    const stock = featuredProduct.stock[selectedSize];
    if (stock <= 0) {
      showToast("error", "This size is out of stock.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const quantity = 1;
    const productId = featuredProduct.id || "featured-01"; // ID dummy jika tidak ada
    const variantKey = selectedSize;

    const existingIndex = cart.findIndex(
      (item) => item.id === productId && item.variantKey === variantKey
    );

    if (existingIndex >= 0) {
      if (cart[existingIndex].quantity + quantity > stock) {
        showToast("error", "Quantity exceeds available stock.");
        return;
      }
      cart[existingIndex].quantity += quantity;
    } else {
      const variantObject = {
        size: selectedSize,
        stock: stock,
        price: featuredProduct.price,
      };

      const numericPrice = parseInt(
        featuredProduct.price.replace(/[^\d]/g, ""),
        10
      );

      cart.push({
        id: productId,
        name: featuredProduct.name,
        type: "Featured",
        image: featuredImages[0],
        variant: variantObject,
        variantKey,
        quantity,
        price: numericPrice,
        maxStock: stock,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("success", "Product added to cart!");
    window.dispatchEvent(new Event("storage"));
  };

  // ================= LOGIC: FILTER & SORT (SHOP GRID) =================
  const getPriceRange = (price) => {
    const numbers = price
      .split("-")
      .map((p) => parseInt(p.replace(/[^\d]/g, ""), 10))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) return [0, 0];
    if (numbers.length === 1) return [numbers[0], numbers[0]];
    return [Math.min(...numbers), Math.max(...numbers)];
  };

  const filteredProducts = dataProduct.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const [minA, maxA] = getPriceRange(a.price);
    const [minB, maxB] = getPriceRange(b.price);

    if (sortOrder === "asc") {
      return minA - minB;
    } else {
      return maxB - maxA;
    }
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* === TOAST NOTIFICATION === */}
      <div
        className={`fixed top-24 right-5 z-50 transition-all duration-500 transform ${
          toast.show
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <div
          className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${
            toast.type === "success"
              ? "bg-white border-green-100 text-green-700"
              : "bg-white border-red-100 text-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <XCircle size={20} className="text-red-500" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      </div>

      {/* ================= HEADER SECTION ================= */}
      <div className="bg-neutral-900 text-white py-24 px-6 text-center relative overflow-hidden pt-32">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Shop Collection
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Premium equipment designed for champions. Browse our complete
            catalog of gis, belts, and protective gear.
          </p>
        </div>
      </div>

      {/* ================= FEATURED PRODUCT SPOTLIGHT ================= */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 bg-white shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-100 overflow-hidden">
            {/* Left: Carousel */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-inner aspect-square sm:aspect-video lg:aspect-square">
                <div
                  className="flex h-full transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${featuredIndex * 100}%)` }}
                >
                  {featuredImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${featuredProduct.name} - ${idx + 1}`}
                      className="w-full h-full object-contain flex-shrink-0"
                    />
                  ))}
                </div>

                {/* Nav Buttons */}
                <button
                  onClick={prevFeaturedSlide}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:scale-110 transition"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <button
                  onClick={nextFeaturedSlide}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:scale-110 transition"
                >
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>

            {/* Right: Info & Actions */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {featuredProduct.name}
              </h3>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {featuredProduct.description}
              </p>
              {/* Price Section - Flash Sale Style */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                    Save 33%
                  </span>
                  <span className="text-red-600 text-xs font-bold uppercase tracking-wide">
                    Limited Offer
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Rp 99.900
                  </span>
                  <span className="text-xl text-gray-400 line-through font-medium decoration-gray-400/50">
                    Rp 150.000
                  </span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                    Select Size
                  </h4>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {Object.entries(featuredProduct.stock).map(([size, qty]) => {
                    const isSelected = selectedSize === size;
                    const isOutOfStock = qty <= 0;
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        disabled={isOutOfStock}
                        className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                          isSelected
                            ? "border-black bg-black text-white"
                            : "border-gray-200 text-gray-700 hover:border-gray-400 bg-white"
                        } ${
                          isOutOfStock
                            ? "opacity-40 cursor-not-allowed bg-gray-50"
                            : "cursor-pointer"
                        }`}
                      >
                        {size}
                        <span className="block text-[10px] font-normal mt-1 opacity-80">
                          {isOutOfStock ? "Sold" : `${qty} pcs`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!selectedSize}
              >
                <ShoppingCart size={22} className="mr-3" />
                Add to Cart
              </button>

              <p className="text-sm text-gray-600 mt-5">
                Have questions?{" "}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline font-semibold hover:text-green-700 transition"
                >
                  Chat with us on WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT (GRID) ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* TOOLBAR (Filter, Search, Sort) */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-slate-100 pb-8">
          {/* Left: Result Count & Search */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <span className="text-slate-500 font-medium text-sm whitespace-nowrap">
              Showing {sortedProducts.length} results
            </span>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64 group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>
          </div>

          {/* Right: Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-slate-500" />
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none bg-white border border-slate-200 text-slate-700 py-2.5 pl-10 pr-10 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:border-slate-300 transition-all text-sm font-medium shadow-sm"
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown size={16} className="text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRODUCTS GRID ================= */}
        {sortedProducts.length > 0 ? (
          <div className="grid gap-x-8 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4 shadow-sm group-hover:shadow-md transition-shadow bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button className="bg-white text-slate-900 font-bold py-3 px-8 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-yellow-400 flex items-center gap-2">
                      <ShoppingCart size={16} />
                      View Details
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-yellow-600 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-slate-500 text-sm">Martial Arts</p>
                    <p className="text-lg font-bold text-slate-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search size={32} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-500">
              Try changing your search term or sort criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
