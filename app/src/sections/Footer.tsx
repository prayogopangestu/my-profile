import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Instagram, Heart, ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/prayogopangestu', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 90%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current?.querySelectorAll('.footer-item') || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-12 lg:py-16 w-full border-t border-purple-500/20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent" />

      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="footer-item opacity-0">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prayogo<span className="text-purple-400">.</span>
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              Backend Developer passionate about building scalable systems with Go and Node.js.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-item opacity-0">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-item opacity-0">
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-400">prayogopangestu@gmail.com</p>
              <p className="text-gray-400">github.com/prayogopangestu</p>
              <p className="text-gray-400">Indonesia</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-item pt-8 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0">
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart className="w-4 h-4 text-red-500 mx-1 fill-red-500" /> by Prayogo Pangestu
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400 hover:bg-purple-600 hover:text-white transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
