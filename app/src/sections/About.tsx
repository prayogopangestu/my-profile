import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Briefcase, FolderGit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: FolderGit, value: '16+', label: 'Repositories' },
    { icon: Code2, value: '6+', label: 'Technologies' },
    { icon: Briefcase, value: '5+', label: 'Projects' },
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Heading reveal animation
      const headingTrigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
            { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(headingTrigger);

      // Image scale and reveal
      const imageTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            { scale: 1.2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(imageTrigger);

      // Text content stagger
      const textTrigger = ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            textRef.current?.querySelectorAll('.text-line') || [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.4 }
          );
        },
        once: true,
      });
      triggers.push(textTrigger);

      // Stats cards fly in
      const statsTrigger = ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            statsRef.current?.querySelectorAll('.stat-card') || [],
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.6 }
          );
        },
        once: true,
      });
      triggers.push(statsTrigger);

      // Parallax effect on image
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      triggers.forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-32 w-full overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Heading */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 lg:mb-16 opacity-0"
        >
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative opacity-0">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto">
              <img
                src="/profile-photo.jpg"
                alt="Prayogo Pangestu"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-purple-500 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-purple-600/20 rounded-full blur-xl" />
          </div>

          {/* Content */}
          <div ref={textRef} className="space-y-6">
            <p className="text-line text-gray-300 text-base sm:text-lg leading-relaxed opacity-0">
              I'm a passionate backend developer with strong expertise in Go (Golang) and Node.js. My focus is on building robust, scalable, and maintainable systems using Clean Architecture principles.
            </p>
            <p className="text-line text-gray-300 text-base sm:text-lg leading-relaxed opacity-0">
              I have experience developing various applications including e-commerce platforms, budget tracking systems, task management tools, and workflow automation systems. I love working with modern technologies like Fiber, PostgreSQL, Kafka, and the MERN stack.
            </p>
            <p className="text-line text-gray-300 text-base sm:text-lg leading-relaxed opacity-0">
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and continuously learning to improve my craft. I believe in writing clean, testable code that stands the test of time.
            </p>

            {/* Skills tags */}
            <div className="text-line flex flex-wrap gap-2 pt-4 opacity-0">
              {['Go', 'Node.js', 'React', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Kafka', 'Fiber'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-purple-600/20 text-purple-300 rounded-full text-sm font-medium border border-purple-500/30 skill-tag"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 lg:mt-24"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card glass-card rounded-xl p-6 text-center opacity-0 hover:transform hover:scale-105 transition-all duration-300"
              style={{ perspective: '1000px' }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
