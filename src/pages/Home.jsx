import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Globe,
  Headphones,
  Shield,
  ArrowRight,
  ShoppingCart,
  CheckCircle,
  XCircle,
} from "lucide-react";

import carousel1 from "../assets/carousel1.jpg";
import carousel2 from "../assets/carousel2.jpeg";
import carousel3 from "../assets/carousel3.jpeg";
import carousel4 from "../assets/carousel4.jpeg";
import carousel5 from "../assets/carousel5.jpeg";
import carousel6 from "../assets/carousel6.jpeg";
import carousel7 from "../assets/carousel7.jpeg";
import carousel8 from "../assets/carousel8.jpeg";

import dataProduct from "../data/dataProduct";
import featuredProduct from "../data/featuredProduct";

const images = [
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
  carousel8,
];

const testimonials = [
  {
    name: "Haniah Sunandar",
    review:
      "Tokonya kumplit, harga murah dan penjaganya baik..tokonya ga susah di cari",
    rating: 5,
  },
  {
    name: "Oebay Haristian",
    review: "Toko perlengkapan karate, lengkap, murah, bagus, mantaplah",
    rating: 5,
  },
  {
    name: "Indra Setiawan",
    review: "recomended buat pesan pakaian karate",
    rating: 5,
  },
  {
    name: "Depi Kharismawan",
    review: "butuh perlengkapan karate? datang lah kesini",
    rating: 5,
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredImages = featuredProduct.images;
  const WHATSAPP_LINK =
    "https://wa.me/6287722070767?text=Halo%2C%20saya%20tertarik%20dengan%20produk%20Chino%20Pants.%20Bisa%20tolong%20berikan%20info%20lebih%20lanjut%3F";

  const [selectedSize, setSelectedSize] = useState(null);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  // Fungsi helper untuk menampilkan notifikasi toast
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 3000);
  };

  // Handler untuk memilih ukuran
  const handleSizeSelect = (size) => {
    setSelectedSize(size === selectedSize ? null : size); // Klik lagi untuk batal
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
    const quantity = 1; // Default kuantitas 1 untuk featured product

    // Kita gunakan nama produk sebagai ID unik jika ID tidak ada di data
    const productId = featuredProduct.id || featuredProduct.name;
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
      // Buat objek varian agar konsisten dengan struktur cart Anda
      const variantObject = {
        size: selectedSize,
        stock: stock,
        price: featuredProduct.price, // Ambil harga utama produk
      };

      cart.push({
        id: productId,
        name: featuredProduct.name,
        // 'type' bisa ditambahkan jika ada di data featuredProduct
        image: featuredImages[0],
        variant: variantObject,
        variantKey,
        quantity,
        price: parseInt(featuredProduct.price.replace(/[^\d]/g, ""), 10),
        maxStock: stock,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    showToast("success", "Product added to cart!");
    // Kirim event agar komponen lain (spt Navbar) bisa update
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonialIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeaturedIndex((prev) =>
        prev === featuredImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredImages.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

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

  const handleDragStart = (x) => {
    startX.current = x;
    isDragging.current = true;
  };

  const handleDragMove = (x) => {
    if (!isDragging.current) return;
    const diff = x - startX.current;

    if (diff > 50) {
      prevSlide();
      isDragging.current = false;
    } else if (diff < -50) {
      nextSlide();
      isDragging.current = false;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full bg-white">
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

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[50vh] sm:min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-16 sm:pt-26">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-orange-900/30 animate-pulse opacity-60 z-0"></div>

        <div
          className="flex min-h-[60vh] sm:min-h-screen overflow-hidden"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="relative w-full min-h-[60vh] sm:min-h-screen flex-shrink-0 flex items-center justify-center overflow-hidden transition-transform duration-1000 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              <img
                src={src}
                alt={`Slide ${i}`}
                className="w-full h-auto min-h-screen object-contain sm:object-contain md:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-0"></div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-30">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 ${
                currentIndex === i
                  ? "w-6 sm:w-12 h-2 sm:h-3 bg-gray-300 rounded-full"
                  : "w-2 sm:w-3 h-2 sm:h-3 bg-white/40 rounded-full hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="w-full py-20 px-6 sm:px-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            Featured Product
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-12">
            Our best-selling premium chino pants crafted for comfort,
            durability, and everyday style.
          </p>

          {/* Product Card */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 bg-white shadow-xl rounded-2xl p-8 border border-gray-200 overflow-hidden">
            {/* Left: Images (Carousel) */}
            <div className="w-full lg:w-1/2">
              <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-lg aspect-square">
                {/* Image Container */}
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

                {/* Prev/Next Buttons */}
                <button
                  onClick={prevFeaturedSlide}
                  className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition z-10"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>
                <button
                  onClick={nextFeaturedSlide}
                  className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition z-10"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {featuredImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeaturedIndex(i)}
                      className={`transition-all duration-300 ${
                        featuredIndex === i
                          ? "w-6 h-2 bg-white shadow-md rounded-full"
                          : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-1/2">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {featuredProduct.name}
              </h3>

              <p className="text-gray-700 mb-5 leading-relaxed">
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

              {/* Stock Table */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Available Sizes
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {Object.entries(featuredProduct.stock).map(([size, qty]) => {
                    const isSelected = selectedSize === size;
                    const isOutOfStock = qty <= 0;
                    return (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        disabled={isOutOfStock}
                        className={`rounded-lg p-3 text-center shadow-sm border text-sm font-medium transition-all ${
                          isSelected
                            ? "border-slate-900 bg-slate-900 text-white shadow-md"
                            : "border-slate-200 text-slate-600 hover:border-slate-400"
                        } ${
                          isOutOfStock
                            ? "opacity-40 cursor-not-allowed hover:border-slate-200 bg-slate-50 text-slate-400"
                            : "cursor-pointer"
                        }`}
                      >
                        <p className="font-semibold">{size}</p>
                        <p className="text-xs mt-1">
                          {isOutOfStock ? "Sold Out" : `${qty} pcs`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Button "Add to Cart" */}
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!selectedSize}
              >
                <ShoppingCart size={22} className="mr-3" />
                Add to Cart
              </button>

              {/* WhatsApp Link */}
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
      </section>

      {/* PRODUCTS SECTION */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Collection
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Discover premium karate equipment suitable for beginners to
              professionals.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-7xl mx-auto">
            {dataProduct.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="bg-gray-50 p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 sm:h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-4 sm:p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xl sm:text-2xl font-bold text-yellow-600 mb-4">
                    {product.price}
                  </p>

                  <button className="w-full py-2 sm:py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 font-medium">
                    <ShoppingCart size={18} />
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/shop"
              className="group inline-flex items-center px-8 py-3 
                         bg-black text-white font-bold text-base rounded-full shadow-lg 
                         hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              View All Products
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                size={18}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="relative bg-gray-900 py-24 sm:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="text-center lg:text-left">
            <p className="text-base font-semibold tracking-wider text-yellow-500 uppercase">
              About Us
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Built with Passion,
              <br />
              Since <span className="text-yellow-400">1953</span>.
            </h2>
            <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-300">
              Toko Pakcik is more than just a store; it is decades of dedication
              to martial arts. Founded by{" "}
              <span className="font-bold text-white">Dasril Muchtar</span>, we
              have served the karate community with the finest equipment for
              generations.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 w-full max-w-md">
              <span className="text-xl font-bold tracking-widest text-transparent bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text">
                TOKO PAKCIK
              </span>
              <div className="mt-6">
                <p className="text-gray-300 text-sm">Founded By</p>
                <p className="text-white text-3xl font-bold">Dasril Muchtar</p>
              </div>
              <div className="mt-6">
                <p className="text-gray-300 text-sm">Year Established</p>
                <p className="text-white text-3xl font-bold">1953</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-yellow-600">Toko Pakcik</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer more than products — we offer trust.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="group text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white transform group-hover:scale-110 transition-transform duration-300">
                  <Globe size={32} />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Global Delivery
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We ship worldwide using JNE (Indonesia) and EMS (International).
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white transform group-hover:scale-110 transition-transform duration-300">
                  <Headphones size={32} />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Customer Service
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Customer support that understands Karate and Competition
                standards.
              </p>
            </div>

            <div className="group text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-white transform group-hover:scale-110 transition-transform duration-300">
                  <Shield size={32} />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Safe Shopping
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Secure and trusted online transactions supported by major banks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION — ***NOT TRANSLATED*** */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Out Customers Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
              Trusted by martial artists worldwide
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 flex justify-center px-4"
                  >
                    <div className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 border border-white/30 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl"></div>

                      <div className="flex justify-center mb-4 sm:mb-6 gap-1">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6 fill-current"
                          />
                        ))}
                      </div>

                      <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-6 sm:mb-8 leading-relaxed italic font-medium text-center relative z-10 text-balance px-2 sm:px-4">
                        "{t.review}"
                      </blockquote>

                      <div className="text-center relative z-10">
                        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                          {t.name}
                        </h4>
                        <p className="text-gray-500 mt-1 sm:mt-2 text-sm md:text-base">
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-0 sm:left-2 -translate-y-1/2 
                       bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-full shadow-lg 
                       hover:bg-white hover:scale-110 transition-all duration-300 
                       border border-gray-200 z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-0 sm:right-2 -translate-y-1/2 
                       bg-white/90 backdrop-blur-md p-2 sm:p-3 rounded-full shadow-lg 
                       hover:bg-white hover:scale-110 transition-all duration-300 
                       border border-gray-200 z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>
          </div>

          <div className="mt-6 sm:mt-8 flex justify-center space-x-2 sm:space-x-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIndex(i)}
                className={`transition-all duration-300 ${
                  testimonialIndex === i
                    ? "w-6 sm:w-8 md:w-10 lg:w-12 h-2 sm:h-3 bg-gray-700 rounded-full"
                    : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-300 rounded-full hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <a
              href="https://www.google.com/maps/place/Osh+Karate+Mania/@-6.8952452,107.603087,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68e65ae3902221:0x14c1b9e7e536a36b!8m2!3d-6.8952505!4d107.6056619!16s%2Fg%2F11bz0r4pnk?entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 
                       bg-black text-white font-bold text-sm sm:text-base rounded-full shadow-xl 
                       hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              See All Customer Reviews
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                size={16}
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
