import { Link } from "react-router-dom";
import { Phone, MapPin } from "lucide-react";
import logoOsh from "../assets/logo-toko-osh.png";

const Footer = () => {
  return (
    <footer className="bg-[#23282d] text-gray-300 pt-12 pb-6 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-4">
            <img
              src={logoOsh}
              alt="Logo"
              className="h-12 w-auto cursor-pointer"
            />
            <span className="text-xl font-bold text-white">TOKO PAKCIK</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Toko Pakcik is a karate equipment store providing high-quality
            uniforms, belts, gloves, and other martial arts gear. We are
            committed to supporting athletes with durable and comfortable
            products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-yellow-400 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-yellow-400 transition">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Jl. Pelesiran No.71, Tamansari, Bandung, Kota
              Bandung, Jawa Barat 40116
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +62 877-2207-0767
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} TOKO PAKCIK. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
