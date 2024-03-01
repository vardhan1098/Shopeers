import React from "react";
import "../styles/Footer.css"; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Shoppe</h3>
            <p>
              {/* Add brief information about Shoppe here */}
              Shoppe is your one-stop shop for all your shopping needs. We offer
              a wide variety of products from top brands at competitive prices.
            </p>
          </div>
          <div className="footer-section">
            <h3>Customer Care</h3>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Shipping Information</a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect with Us</h3>
            <ul className="social-links">
              <li>
                <a href="#">
                  <i class="bx bxl-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bx bxl-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bx bxl-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Payment Options</h3>
            <ul className="social-links">
              <li>
                <a href="#">
                  <i class="bx bxl-visa"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="bx bxl-mastercard"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>
            &copy; {new Date().getFullYear()} Shopper Stop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
