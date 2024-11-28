import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-800 via-purple-600 to-pink-500 text-white py-12 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Footer Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="flex flex-col items-start">
            <h3 className="font-bold text-xl mb-6">Contact Us</h3>
            <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-4">
              Call / Text: (+92) 317-7190178 <br />
              Wahabnadeem311@gmail.com <br />
              @IdealCity Gujranwala
            </p>
            {/* Social Icons */}
            <div className="flex space-x-6 mt-6">
              <a
                href="https://www.instagram.com/wahabnadeem24"
                className="text-white hover:text-gray-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png"
                  alt="Instagram"
                  className="w-8 h-8 transition-transform transform hover:scale-125"
                />
              </a>
              <a
                href="https://www.facebook.com/share/3ZPrQMwiWq9XViwB/"
                className="text-white hover:text-gray-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <img
                  src="https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook_colored_svg_copy-512.png"
                  alt="Facebook"
                  className="w-8 h-8 transition-transform transform hover:scale-125"
                />
              </a>
              <a
                href="https://wa.me/923177190178"
                className="text-white hover:text-gray-400 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-8 h-8 transition-transform transform hover:scale-125"
                />
              </a>
            </div>
          </div>

          {/* About Us Section */}
          <div className="text-gray-300">
            <h3 className="font-bold text-xl mb-6">About Us</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/blog" className="hover:text-white transition-all duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-all duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/termsandconditions" className="hover:text-white transition-all duration-300">
                  Terms And Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="text-gray-300">
            <h3 className="font-bold text-xl mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/login" className="hover:text-white transition-all duration-300">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link to="/book-now" className="hover:text-white transition-all duration-300">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-all duration-300">
                 Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="mt-12 border-gray-700" />

        {/* Footer Bottom Section */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-center text-center text-sm text-gray-400">
          <p className="mb-4 lg:mb-0">&copy; 2024 IdealCity. All rights reserved.</p>
          <p>
            Powered by{" "}
            <a
              href="https://www.youtube.com/@TahirTechnology-ci6mz"
              className="text-white hover:underline"
            >
              Wahab & Tahir
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;