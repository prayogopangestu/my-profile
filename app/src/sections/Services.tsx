import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Server,
  Database,
  Code,
  MessageSquare,
  Layers,
  Cpu,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const services = [
    {
      icon: Server,
      title: "Full Stack Development",
      description:
        "Build complete end-to-end applications from responsive frontends with React and Next.js to robust backends with Go and Node.js.",
    },
    {
      icon: Database,
      title: "Database Design",
      description:
        "Design and optimize database schemas using PostgreSQL, MongoDB, and Redis for high-performance applications.",
    },
    {
      icon: Code,
      title: "API Development",
      description:
        "Create RESTful and GraphQL APIs with proper documentation, authentication, and rate limiting.",
    },
    {
      icon: MessageSquare,
      title: "Frontend Development",
      description:
        "Create beautiful, responsive, and interactive user interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
    },
    {
      icon: Layers,
      title: "Full Stack Architecture",
      description:
        "Design and implement complete application architecture with modern frameworks, microservices, and message brokers.",
    },
    {
      icon: Cpu,
      title: "System Integration",
      description:
        "Integrate third-party services, payment gateways, and external APIs into your applications.",
    },
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const ctx = gsap.context(() => {
      // Heading animation
      const headingTrigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            headingRef.current?.querySelectorAll(".animate-item") || [],
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            },
          );
        },
        once: true,
      });
      triggers.push(headingTrigger);

      // SVG grid lines draw animation
      const svgTrigger = ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => {
          const paths = svgRef.current?.querySelectorAll("line");
          paths?.forEach((path, i) => {
            const length = path.getTotalLength?.() || 100;
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
            gsap.to(path, {
              strokeDashoffset: 0,
              duration: 1.5,
              delay: i * 0.1,
              ease: "power3.out",
            });
          });
        },
        once: true,
      });
      triggers.push(svgTrigger);

      // Cards fade up animation
      const cardsTrigger = ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            gridRef.current?.querySelectorAll(".service-card") || [],
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              delay: 0.5,
            },
          );
        },
        once: true,
      });
      triggers.push(cardsTrigger);

      // Icons pop in
      const iconsTrigger = ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            gridRef.current?.querySelectorAll(".service-icon") || [],
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              stagger: 0.1,
              ease: "back.out(1.7)",
              delay: 0.8,
            },
          );
        },
        once: true,
      });
      triggers.push(iconsTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 lg:py-32 w-full overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 opacity-0">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="animate-item text-gray-400 text-base sm:text-lg max-w-2xl mx-auto opacity-0">
            Services tailored to your full stack development needs
          </p>
        </div>

        {/* Services Grid with SVG lines */}
        <div ref={gridRef} className="relative">
          {/* SVG Grid Lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            style={{ zIndex: 0 }}
          >
            {/* Horizontal lines */}
            <line
              x1="0"
              y1="33%"
              x2="100%"
              y2="33%"
              stroke="rgba(107, 70, 193, 0.2)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="66%"
              x2="100%"
              y2="66%"
              stroke="rgba(107, 70, 193, 0.2)"
              strokeWidth="1"
            />
            {/* Vertical lines */}
            <line
              x1="33%"
              y1="0"
              x2="33%"
              y2="100%"
              stroke="rgba(107, 70, 193, 0.2)"
              strokeWidth="1"
            />
            <line
              x1="66%"
              y1="0"
              x2="66%"
              y2="100%"
              stroke="rgba(107, 70, 193, 0.2)"
              strokeWidth="1"
            />
          </svg>

          {/* Services Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card glass rounded-2xl p-6 lg:p-8 opacity-0 group hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Icon */}
                <div className="service-icon w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-300 opacity-0">
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Hover gradient border effect */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"
                  style={{
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 3s ease infinite",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
