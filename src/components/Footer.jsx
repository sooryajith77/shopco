import React from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa6";
import { FaCcVisa } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcApplePay } from "react-icons/fa6";
import { FaGooglePay } from "react-icons/fa";
import { BiLogoMastercard } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="newsletter">
            <h2>STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h3>SHOP.CO</h3>
            <p>Find clothes that matches your style with our wide range of clothing, accessories, and shoes.</p>
            <div className="social-links">
              <a href="#"><FaFacebookSquare />
</a>
              <a href="#"><FaInstagramSquare />
</a>
              <a href="#"><FaTwitter /></a>
               <a href="#"><FaHeadphones />   
</a>
            </div>
          </div>


          <div className="footer-section">
            <h4>SHOP</h4>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Kids</a>
            <a href="#">Accessories</a>
          </div>

          <div className="footer-section">
            <h4>SUPPORT</h4>
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
          </div>

          <div className="footer-section">
            <h4>COMPANY</h4>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>

          <div className="footer-section">
            <h4>NEWS & UPDATES</h4>
            <a href="#">Latest News</a>
            <a href="#">Offers</a>
            <a href="#">Events</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 SHOP.CO. All rights reserved.</p>
          <div className="payment-methods">
            <span><FaCcVisa />
</span>
            <span><FaCcApplePay />
</span>
            <span><FaCcPaypal />
</span>
<span><FaGooglePay />
</span>
<span><BiLogoMastercard />
</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #f8f8f8;
          margin-top: 60px;
          padding-top: 60px;
        }
        .footer-top {
          background: #000;
          color: white;
          padding: 40px;
          border-radius: 20px;
          margin-bottom: 50px;
        }
        .newsletter {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .newsletter h2 {
          font-size: 24px;
          max-width: 400px;
        }
        .newsletter-form {
          display: flex;
          gap: 15px;
        }
        .newsletter-form input {
          padding: 12px 20px;
          border-radius: 30px;
          border: none;
          width: 300px;
        }
        .footer-content {
          display: grid;
          grid-template-columns: 2fr repeat(4, 1fr);
          gap: 30px;
          margin-bottom: 40px;
        }
        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .footer-section h3, .footer-section h4 {
          margin-bottom: 10px;
        }
        .footer-section a {
          text-decoration: none;
          color: #666;
        }
        .social-links {
          display: flex;
          gap: 15px;
        }
        .social-links a {
          font-size: 24px;
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-top: 1px solid #ddd;
        }
      .payment-methods {
  display: flex;
  gap: 20px; /* Space between icons */
  align-items: center;
}

.payment-methods svg {
  width: 30px;
  height: 30px;
  cursor: pointer; /* Optional */
}
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
          }
          .newsletter {
            flex-direction: column;
            text-align: center;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;