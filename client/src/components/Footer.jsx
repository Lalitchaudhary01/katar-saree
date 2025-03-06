import React from "react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-secondary text-primary pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="font-primary text-2xl mb-6">Katan Banaras</h3>
            <p className="font-secondary text-primary text-opacity-80 mb-6 leading-relaxed">
              Exquisite handcrafted sarees and ethnic wear that celebrate
              India's rich textile heritage. Our creations blend traditional
              craftsmanship with contemporary elegance.
            </p>
            <div className="flex space-x-4">
              <SocialIcon
                href="#"
                ariaLabel="Facebook"
                iconPath="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
              />
              <SocialIcon
                href="#"
                ariaLabel="Instagram"
                iconPath="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
              <SocialIcon
                href="#"
                ariaLabel="Pinterest"
                iconPath="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"
              />
              <SocialIcon
                href="#"
                ariaLabel="YouTube"
                iconPath="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
              />
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-primary text-xl mb-6">Shop</h3>
            <ul className="space-y-3 font-secondary">
              <FooterLink href="/New-arrivals" text="New Arrivals" />
              <FooterLink href="#" text="Best Sellers" />
              <FooterLink href="/sarees/silk" text="Banarasi Silk Sarees" />
              <FooterLink href="#" text="Wedding Collection" />
              <FooterLink href="#" text="Lehengas" />
              <FooterLink href="#" text="Dupattas" />
              <FooterLink href="#" text="Accessories" />
            </ul>
          </div>

          {/* Information Column */}
          <div>
            <h3 className="font-primary text-xl mb-6">Information</h3>
            <ul className="space-y-3 font-secondary">
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/collection" text="Collections" />
              <FooterLink href="/shipping-policy" text="Shipping Policy" />
              <FooterLink href="/return-policy" text="Return Policy" />
              <FooterLink href="/privacy-policy" text="Privacy Policy" />
              <FooterLink href="/terms-conditions" text="Terms & Conditions" />
              <FooterLink href="/contact" text="Contact Us" />
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-primary text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4 font-secondary">
              <ContactItem
                iconPath="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
                text="B-14, Bada Lalpur, Sigra<br>Varanasi, Uttar Pradesh 221010<br>India"
              />
              <ContactItem
                iconPath="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                text="info@katanbanaras.com"
                href="mailto:info@katanbanaras.com"
              />
              <ContactItem
                iconPath="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                text="+91 98765 43210"
                href="tel:+919876543210"
              />
              <ContactItem
                iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                text="Mon-Sat: 10:00 AM - 7:00 PM<br>Sunday: Closed"
              />
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-primary border-opacity-20 pt-8 pb-6">
          <div className="flex flex-wrap justify-center gap-6">
            <PaymentMethodIcon
              src="https://source.unsplash.com/random/120x40/?visa,logo"
              alt="Visa"
            />
            <PaymentMethodIcon
              src="https://source.unsplash.com/random/120x40/?mastercard,logo"
              alt="Mastercard"
            />
            <PaymentMethodIcon
              src="https://source.unsplash.com/random/120x40/?americanexpress,logo"
              alt="American Express"
            />
            <PaymentMethodIcon
              src="https://source.unsplash.com/random/120x40/?paypal,logo"
              alt="PayPal"
            />
            <PaymentMethodIcon
              src="https://source.unsplash.com/random/120x40/?rupay,logo"
              alt="RuPay"
            />
            <PaymentMethodIcon
              src="https://source.unsplash.com/random/120x40/?upi,logo"
              alt="UPI"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary border-opacity-20 pt-8 text-center">
          <p className="font-secondary text-sm text-primary text-opacity-60">
            &copy; 2023 Katan Banaras. All rights reserved. Handcrafted with{" "}
            <span className="text-accent">♥</span> in Varanasi, India.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        id="back-to-top"
        className="fixed bottom-8 right-8 bg-accent text-primary p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </footer>
  );
};

// Reusable Social Icon Component
const SocialIcon = ({ href, ariaLabel, iconPath }) => (
  <a
    href={href}
    aria-label={ariaLabel}
    className="text-primary hover:text-accent transition-colors duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d={iconPath} />
    </svg>
  </a>
);

// Reusable Footer Link Component
const FooterLink = ({ href, text }) => (
  <li>
    <a
      href={href}
      className="text-primary text-opacity-80 hover:text-accent transition-colors duration-300"
    >
      {text}
    </a>
  </li>
);

// Reusable Contact Item Component
const ContactItem = ({ iconPath, text, href }) => (
  <li className="flex items-start">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-accent mr-3 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d={iconPath}
      />
    </svg>
    {href ? (
      <a
        href={href}
        className="text-primary text-opacity-80 hover:text-accent transition-colors duration-300"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    ) : (
      <span
        className="text-primary text-opacity-80"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )}
  </li>
);

// Reusable Payment Method Icon Component
const PaymentMethodIcon = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-8 object-contain opacity-80" />
);

export default Footer;
