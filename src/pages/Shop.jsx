import { useState } from "react";
import { Link } from "react-router-dom";
import dataProduct from "../data/dataProduct";

const Shop = () => {
  const [sortOrder, setSortOrder] = useState("asc");

  const getPriceRange = (price) => {
    const numbers = price
      .split("-")
      .map((p) => parseInt(p.replace(/[^\d]/g, ""), 10))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) return [0, 0];
    if (numbers.length === 1) return [numbers[0], numbers[0]];
    return [Math.min(...numbers), Math.max(...numbers)];
  };

  const sortedProducts = [...dataProduct].sort((a, b) => {
    const [minA, maxA] = getPriceRange(a.price);
    const [minB, maxB] = getPriceRange(b.price);

    if (sortOrder === "asc") {
      return minA - minB;
    } else {
      return maxB - maxA;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20">
      {/* Title */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-8">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <span className="mx-6 text-2xl font-bold tracking-widest text-transparent bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text">
            SHOP PRODUCTS
          </span>
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>

      {/* Sorting Filter */}
      <div className="flex justify-baseline mb-8">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="asc">Sort by price: low to high</option>
          <option value="desc">Sort by price: high to low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {sortedProducts.map((product) => (
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
  );
};

export default Shop;
