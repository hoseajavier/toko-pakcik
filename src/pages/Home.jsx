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

  // Auto-slide effect untuk gambar
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Auto-slide effect untuk testimoni
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonialIndex]);

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

  const handleDragStart = (x) => {
    startX.current = x;
    isDragging.current = true;
  };

  const handleDragMove = (x) => {
    if (!isDragging.current) return;
    const diff = x - startX.current;

    if (diff > 50) {
      // geser kanan
      prevSlide();
      isDragging.current = false;
    } else if (diff < -50) {
      // geser kiri
      nextSlide();
      isDragging.current = false;
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* ================= HERO CAROUSEL SECTION ================= */}
      <section className="relative w-full min-h-[50vh] sm:min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black pt-16 sm:pt-26">
        {/* Background overlay with animated gradient */}
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

        {/* Modern Indicators */}
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

      {/* ================= FOUNDER SECTION ================= */}
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-blue-50 py-20 px-6 md:px-12 lg:px-20">
        {/* Floating elements for visual interest */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center mb-12">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <span className="mx-6 text-2xl font-bold tracking-widest text-transparent bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
              TOKO PAKCIK
            </span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-6">
              Founded By
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600 mb-2">
              Dasril Muchtar
            </p>
            <p className="text-gray-600 text-lg md:text-xl">Since 1953</p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="bg-gradient-to-br from-gray-100 to-white py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="mx-6 text-2xl font-bold tracking-widest text-transparent bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
                OUR PRODUCTS
              </span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Premium Karate Equipment
            </h2>
            <p className="text-gray-600 text-base sm:text-xl">
              Discover our complete collection of martial arts gear
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {dataProduct.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 sm:h-64 object-contain p-6"
                  />
                </div>
                <div className="p-4 sm:p-6 text-center">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h4>
                  <p className="text-lg sm:text-2xl font-bold text-yellow-600 mb-3">
                    {product.price}
                  </p>
                  <button className="w-full py-2 sm:py-3 bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="bg-gradient-to-br from-gray-800 to-black py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-gray-500">Toko Pakcik</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience excellence with our comprehensive service offerings
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <Globe size={32} />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors duration-300">
                Global Delivery
              </h4>
              <p className="text-gray-300 leading-relaxed">
                We ship worldwide with JNE (Indonesia) and EMS (International).
                Automated shipping calculations for your convenience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <Headphones size={32} />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                Convenient Customer Service
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Convenient customer service with knowledge of Karate and
                Competition.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-white group-hover:scale-110 transition-transform duration-300">
                  <Shield size={32} />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400/20 to-teal-500/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
                Secure Shopping
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Safe and secure online transactions with trusted payment methods
                supported by major banks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-blue-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="mx-4 sm:mx-6 text-lg sm:text-xl md:text-2xl font-bold tracking-widest text-transparent bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
                TESTIMONIALS
              </span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              What Our Customers Say
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Trusted by martial artists worldwide
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              {/* Carousel content */}
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 flex justify-center px-4"
                  >
                    {/* Testimonial Card */}
                    <div
                      className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl 
                              w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl 
                              mx-auto p-4 sm:p-6 md:p-8 lg:p-12 
                              border border-white/20 relative overflow-hidden"
                    >
                      {/* Background decoration */}
                      <div
                        className="absolute top-0 right-0 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 
                                bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-2xl"
                      ></div>

                      {/* Stars */}
                      <div className="flex justify-center mb-4 sm:mb-6 gap-1">
                        {Array.from({ length: t.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-current animate-pulse"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <blockquote
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 
                                       text-gray-700 mb-6 sm:mb-8 leading-relaxed italic font-medium 
                                       text-center relative z-10 break-words text-balance px-2 sm:px-4"
                      >
                        "{t.review}"
                      </blockquote>

                      {/* Customer Name */}
                      <div className="text-center relative z-10">
                        <h4
                          className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold 
                                 bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent"
                        >
                          {t.name}
                        </h4>
                        <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
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

          {/* Indicators */}
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

          {/* CTA Button */}
          <div className="mt-8 sm:mt-12 text-center">
            <a
              href="https://www.google.com/maps/place/Osh+Karate+Mania/@-6.8952452,107.603087,17z/data=!3m1!4b1!4m6!3m5!1s0x2e68e65ae3902221:0x14c1b9e7e536a36b!8m2!3d-6.8952505!4d107.6056619!16s%2Fg%2F11bz0r4pnk?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
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
