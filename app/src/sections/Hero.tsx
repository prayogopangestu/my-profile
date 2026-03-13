import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Github } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Greeting animation
      tl.fromTo(
        greetingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.2
      );

      // Name animation with split characters
      if (nameRef.current) {
        const chars = nameRef.current.innerText.split('');
        nameRef.current.innerHTML = chars
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');
        tl.fromTo(
          nameRef.current.querySelectorAll('span'),
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.03 },
          0.4
        );
      }

      // Title typewriter effect
      tl.fromTo(
        titleRef.current,
        { width: 0, opacity: 1 },
        { width: '100%', duration: 1, ease: 'steps(18)' },
        0.8
      );

      // Description fade up
      tl.fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1
      );

      // Buttons scale up
      tl.fromTo(
        buttonsRef.current?.children || [],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
        1.2
      );

      // Hero image 3D float in
      tl.fromTo(
        imageRef.current,
        { z: -500, opacity: 0, rotateY: -30 },
        { z: 0, opacity: 1, rotateY: 0, duration: 1.2 },
        0.5
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Apply parallax to image
  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        rotateY: mousePosition.x * 10,
        rotateX: -mousePosition.y * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-purple-900/20 animate-gradient" />
      
      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(107, 70, 193, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(107, 70, 193, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className="text-center lg:text-left order-2 lg:order-1">
            <span
              ref={greetingRef}
              className="inline-block text-purple-400 font-medium text-lg mb-4 opacity-0"
            >
              Hello, I'm
            </span>
            
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 overflow-hidden"
            >
              Prayogo Pangestu
            </h1>
            
            <p
              ref={titleRef}
              className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-gradient mb-6 whitespace-nowrap overflow-hidden inline-block"
            >
              Backend Developer
            </p>
            
            <p
              ref={descRef}
              className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 opacity-0"
            >
              Passionate backend developer specializing in Go (Golang), Node.js, and Clean Architecture. I build scalable systems, RESTful APIs, and microservices that power modern applications.
            </p>
            
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-base font-medium rounded-full magnetic-btn animate-pulse-glow"
                onClick={() => scrollToSection('projects')}
              >
                <Github className="mr-2 w-5 h-5" />
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-base font-medium rounded-full magnetic-btn"
                onClick={() => scrollToSection('contact')}
              >
                <Mail className="mr-2 w-5 h-5" />
                Contact Me
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center" style={{ perspective: '1000px' }}>
            <div
              ref={imageRef}
              className="relative w-full max-w-md lg:max-w-lg animate-float opacity-0"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="/hero-illustration.jpg"
                alt="Developer Workspace"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* Glow effect behind image */}
              <div className="absolute -inset-4 bg-purple-600/20 rounded-3xl blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-500 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-purple-500 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
