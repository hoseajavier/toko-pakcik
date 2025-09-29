import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoOsh from "../assets/logo-toko-osh.png";
import logoPakcik from "../assets/logo-pakcik.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Cart", path: "/cart" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-[#23282d] text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        {/* Left Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logoOsh}
            alt="Logo OSH"
            className="h-16 w-auto cursor-pointer"
          />
        </Link>

        {/* Center Navigation (Desktop) */}
        <div className="hidden md:flex space-x-12 font-semibold text-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative hover:text-yellow-400 transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Logo (Desktop) */}
        <div className="hidden md:flex items-center">
          <img
            src={logoPakcik}
            alt="Logo Pakcik"
            className="h-16 w-auto"
          />
        </div>

        {/* Mobile Right Side: Logo + Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <img
            src={logoPakcik}
            alt="Logo Pakcik"
            className="h-14 w-auto cursor-pointer"
          />
          <button
            className="p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#23282d] border-t border-white/10">
          <div className="flex flex-col space-y-5 px-6 py-6 font-semibold text-lg text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
