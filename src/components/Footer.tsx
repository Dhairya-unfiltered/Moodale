
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Services',
      links: [
        { name: 'SEO Optimization', href: '#services' },
        { name: 'Social Media Marketing', href: '#services' },
        { name: 'Content Marketing', href: '#services' },
        { name: 'PPC Advertising', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#services' },
        { name: 'Our Team', href: '#team' },
        { name: 'Careers', href: '#contact' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Case Studies', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'FAQ', href: '#' }
      ]
    }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-moodale-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="mb-4">
              <a href="#" className="text-2xl font-display font-bold">
                <span className="text-white">M</span>
                <span className="text-moodale-orange">OO</span>
                <span className="text-white">DAL</span>
                <span className="text-moodale-orange">E</span>
              </a>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              We help businesses increase their online visibility through customized marketing strategies that deliver measurable results.
            </p>
            <div className="flex space-x-4">
           
              <a
                href="https://www.instagram.com/moodale_/"
                className="p-2 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
                aria-label="Instagram"
                target='_blank'
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/moodale/"
                className="p-2 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
                aria-label="LinkedIn"
                target='_blank'
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {footerLinks.map((group, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium mb-4 text-white">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-moodale-orange transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2020 Moodale. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-moodale-orange transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-moodale-orange transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-moodale-orange transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
