import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "./Container";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-2 z-40">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-4 items-center">
            <img
              className="h-[55px] w-[180px]"
              src={"https://www.conferencealerts.org/images/logo.webp"}
              alt="Workflow"
            />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="hover:bg-[#034F75] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:bg-[#034F75] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to="/create-event"
                  className="hover:bg-[#034F75] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Event
                </Link>
                <Link
                  to="/subscribe"
                  className="hover:bg-[#034F75] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Subscribe Now
                </Link>
                <Link
                  to="/blog"
                  className="hover:bg-[#034F75] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Blog
                </Link>
                <Link
                  to="/contact-us"
                  className="hover:bg-[#034F75] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          <Link to="/login">
            <div className="hidden md:block bg-slate-800 hover:bg-[#034F75] text-white px-4 py-1 rounded-xl">
              Log In
            </div>
          </Link>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden transition-all duration-200" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-black">
              <Link
                to="/"
                className="hover:bg-[#034F75] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:bg-[#034F75] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </Link>
              <Link
                to="/create-event"
                className="hover:bg-[#034F75] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Event
              </Link>
              <Link
                to="/subscribe"
                className="hover:bg-[#034F75] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Subscribe Now
              </Link>
              <Link
                to="/blog"
                className="hover:bg-[#034F75] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Blog
              </Link>
              <Link
                to="/contact-us"
                className="hover:bg-[#034F75] hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="bg-slate-800 text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Log In
              </Link>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}

export default Navbar;
