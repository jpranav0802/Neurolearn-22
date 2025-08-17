import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-solid border-border-color">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <a 
            className="text-text-secondary hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" 
            href="#facebook"
            aria-label="Follow us on Facebook"
          >
            <span className="sr-only">Facebook</span>
            <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path 
                clipRule="evenodd" 
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                fillRule="evenodd"
              />
            </svg>
          </a>
          <a 
            className="text-text-secondary hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" 
            href="#twitter"
            aria-label="Follow us on Twitter"
          >
            <span className="sr-only">Twitter</span>
            <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm text-text-secondary">
            © 2024 Neurolearn. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
