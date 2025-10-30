
import { Facebook, Instagram, Youtube } from "lucide-react";
import React from "react";


const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 px-8 md:px-20 py-14 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div className="space-y-5">
          <h2 className="text-2xl font-extrabold text-[#0E295C]">VyomaGlobal.</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            We craft digital experiences that elevate your brand. From web
            design to marketing automation, VyomaGlobal helps your business
            connect, grow, and scale — globally.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="bg-gray-100 hover:bg-[#0E295C] hover:text-white text-gray-500 p-3 rounded-full transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="bg-gray-100 hover:bg-[#0E295C] hover:text-white text-gray-500 p-3 rounded-full transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="bg-gray-100 hover:bg-[#0E295C] hover:text-white text-gray-500 p-3 rounded-full transition"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-[#0E295C]">Company</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Our Clients</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-[#0E295C]">Services</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#">Website Design</a></li>
            <li><a href="#">Digital Marketing</a></li>
            <li><a href="#">Brand Strategy</a></li>
            <li><a href="#">Business Automation</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-bold text-lg mb-4 text-[#0E295C]">Get in Touch</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>📞 +91 8460207883</li>
            <li>📧 vyomaglobal01@gmail.com</li>
            <li>📍 Ahmedabad, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} VyomaGlobal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;