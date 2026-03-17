import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: "Small Go E-Commerce",
      description:
        "A small e-commerce application built with Go, Fiber, PostgreSQL, and Kafka following Clean Architecture principles.",
      image: "/project-ecommerce.jpg",
      tags: ["Go", "Fiber", "PostgreSQL", "Kafka"],
      demoLink: "#",
      githubLink: "https://github.com/prayogopangestu/small-go-ecommers",
    },
    {
      title: "Budget Tracker",
      description:
        "A full-featured budget tracker application with both frontend and backend built with Golang, Fiber, PostgreSQL, and Kafka following Clean Architecture principles.",
      image: "/project-ai-dashboard.jpg",
      tags: ["Go", "Fiber", "PostgreSQL", "Kafka"],
      demoLink: "#",
      githubLink: "https://github.com/prayogopangestu/budget-tracker",
    },
    {
      title: "Task Management System",
      description:
        "A full-stack task management application built with Go, TypeScript, and PostgreSQL.",
      image: "/project-taskapp.jpg",
      tags: ["Go", "TypeScript", "PostgreSQL", "React"],
      demoLink: "#",
      githubLink: "https://github.com/prayogopangestu/task_management_system",
    },
    {
      title: "Small E-Commerce (MERN)",
      description:
        "A full-featured e-commerce web application built with the MERN stack following clean architecture principles.",
      image: "/project-ecommerce.jpg",
      tags: ["MongoDB", "Express", "React", "Node.js"],
      demoLink: "#",
      githubLink: "https://github.com/prayogopangestu/small-e-commerce",
    },
    {
      title: "Workflow Automation System",
      description:
        "A full-stack platform designed to automate and streamline repetitive business processes through customizable workflows.",
      image: "/project-ai-dashboard.jpg",
      tags: ["JavaScript", "Node.js", "React", "Workflow"],
      demoLink: "#",
      githubLink: "https://github.com/prayogopangestu/project_was",
    },
    {
      title: "Competitor Pricing Tracker",
      description:
        "A comprehensive competitor pricing tracking system that monitors product prices and alerts users via Discord and Email.",
      image: "/project-taskapp.jpg",
      tags: ["TypeScript", "Node.js", "Web Scraping", "API"],
      demoLink: "#",
      githubLink:
        "https://github.com/prayogopangestu/Competitor-Pricing-Tracker",
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

      // Cards stagger animation
      const cardsTrigger = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            cardsRef.current?.querySelectorAll(".project-card") || [],
            { y: 50, opacity: 0, rotateX: 10 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
            },
          );
        },
        once: true,
      });
      triggers.push(cardsTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 lg:py-32 w-full overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-20">
          <h2 className="animate-item text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 opacity-0">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="animate-item text-gray-400 text-base sm:text-lg max-w-2xl mx-auto opacity-0">
            Some of my work from GitHub repositories
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card glass rounded-2xl overflow-hidden opacity-0 group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-purple-600/80 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 text-xs"
                    onClick={() => window.open(project.githubLink, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8"
            onClick={() =>
              window.open(
                "https://github.com/prayogopangestu?tab=repositories",
                "_blank",
              )
            }
          >
            <Github className="w-5 h-5 mr-2" />
            View All Repositories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
