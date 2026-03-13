import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const clustersRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: 'Backend',
      skills: ['Go', 'Node.js', 'Express.js', 'Fiber', 'REST API', 'GraphQL', 'gRPC'],
      color: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML/CSS'],
      color: 'from-purple-500 to-purple-700',
    },
    {
      title: 'Database & Tools',
      skills: ['PostgreSQL', 'MongoDB', 'Kafka', 'Docker', 'Git', 'Redis'],
      color: 'from-purple-600 to-pink-500',
    },
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Heading animation
      const headingTrigger = ScrollTrigger.create({
        trigger: headingRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            headingRef.current?.querySelectorAll('.word') || [],
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(headingTrigger);

      // Clusters implosion animation
      const clustersTrigger = ScrollTrigger.create({
        trigger: clustersRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            clustersRef.current?.querySelectorAll('.skill-cluster') || [],
            { scale: 2, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
          );
        },
        once: true,
      });
      triggers.push(clustersTrigger);

      // Floating animation for skill tags
      const tags = clustersRef.current?.querySelectorAll('.skill-tag-float');
      tags?.forEach((tag, i) => {
        gsap.to(tag, {
          y: `${Math.sin(i) * 10}`,
          x: `${Math.cos(i) * 5}`,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1,
        });
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
      id="skills"
      className="relative py-20 lg:py-32 w-full overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 overflow-hidden">
            <span className="word inline-block">My</span>{' '}
            <span className="word inline-block text-gradient">Skills</span>
          </h2>
          <p className="word text-gray-400 text-base sm:text-lg max-w-2xl mx-auto opacity-0">
            Technologies I work with to build scalable applications
          </p>
        </div>

        {/* Skills Clusters */}
        <div
          ref={clustersRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="skill-cluster glass rounded-2xl p-6 lg:p-8 opacity-0"
            >
              {/* Category Title */}
              <div className="mb-6 text-center">
                <h3 className={`text-xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className={`w-16 h-1 bg-gradient-to-r ${category.color} rounded-full mx-auto mt-2`} />
              </div>

              {/* Skills Cloud */}
              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="skill-tag-float skill-tag px-4 py-2 bg-purple-600/10 text-purple-300 rounded-lg text-sm font-medium border border-purple-500/30 cursor-default"
                    style={{
                      animationDelay: `${skillIndex * 0.1}s`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Connection lines SVG (decorative) */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B46C1" />
              <stop offset="100%" stopColor="#9F7AEA" />
            </linearGradient>
          </defs>
          <path
            d="M20,50 Q50,30 80,50"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.2"
            strokeDasharray="2,2"
          />
          <path
            d="M20,50 Q50,70 80,50"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="0.2"
            strokeDasharray="2,2"
          />
        </svg>
      </div>
    </section>
  );
};

export default Skills;
