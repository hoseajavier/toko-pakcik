import { MessageCircle, Phone, Clock, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-20 px-4 sm:px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions about our products or orders? We're here to help!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact Card */}
            <div className="bg-white shadow-xl rounded-3xl p-8 md:p-10 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Contact Our Admin
              </h2>

              <p className="text-gray-600 mb-8 text-center leading-relaxed">
                For inquiries about products, orders, or any other information,
                please reach out to our admin via WhatsApp. We're ready to
                assist you!
              </p>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/6287722070767?text=${encodeURIComponent(
                  "Halo Admin, saya ingin bertanya"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat via WhatsApp</span>
              </a>

              <p className="text-sm text-gray-500 text-center mt-4">
                Click to start a conversation
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Info Card 1 */}
              <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      Phone Number
                    </h3>
                    <p className="text-gray-600">+62 877-2207-0767</p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      Jl. Pelesiran No.71, Tamansari, Bandung, Kota Bandung,
                      Jawa Barat 40116
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Mon - Fri: 08:00 AM - 04:00 PM <br />
                      Saturday: 08:00 AM - 12:00 PM
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Note: Response may be slower on weekends
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
