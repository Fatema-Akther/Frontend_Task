// components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Logo and Tagline */}
        <div className="flex flex-col items-start">
          <div className="mb-4">
            <Image
              src="/images/Logo2.PNG" // Adjust path as needed
              alt="G'LORE Logo"
              width={150} // Adjust width as needed
              height={40} // Adjust height as needed
              className="object-contain"
            />
          </div>
          <p className="text-white text-sm">CLOTHES THAT SMILE</p>
          <p className="mt-4 text-white text-sm">
            আমাদের কালেকশন আপনাকে দেবে আপনার অভিজ্ঞতা এবং অভিযোগ একটি সঠিক সমাধান।
          </p>
        </div>

        {/* Column 2: Explore More */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explore More</h3>
          <ul className="space-y-2">
            <li>
              <Link
      href="#"
         className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300"
>
  New Arrivals
</Link>

            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Client Experience */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Client Experience</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300">
                Track Your Order
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300">
                Customer Reviews
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-[#C42D4B] transition-colors duration-300">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Get In Touch & Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">GET IN TOUCH</h3>
          <p className="text-gray-400 mb-2 hover:text-[#C42D4B] transition-colors duration-300">মোবাইল নং: (+88) 01855-375963</p>
           <p className="text-gray-400 mb-6 hover:text-[#C42D4B] transition-colors duration-300">ইমেইল: hello@glorebd.com</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-white text-sm">
        <p className="font-bold">
  &copy; {new Date().getFullYear()} Powered by{' '}
  <a
    href="https://caliquick.com"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white"
  >
    Cali<span style={{ color: '#C05816' }}>Q</span>uick
  </a>
</p>

      </div>
    </footer>
  );
};

export default Footer;