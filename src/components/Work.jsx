import React from 'react';
import { projects } from '../data/projects';
import FeaturedProject from './FeaturedProject';
import ProjectCard from './ProjectCard';
import ScrollReveal from './ScrollReveal';
import './Work.css';

export default function Work() {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="work" className="work-section">
      <div className="container">
        <ScrollReveal>
          <span className="eyebrow">02 // PORTFOLIO CHIPS</span>
          <h2 className="section-title">Technical Projects</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="featured-wrapper">
            <FeaturedProject project={featuredProject} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="other-projects-header">
            <span className="sub-eyebrow">ADDITIONAL BOARD REGISTERS</span>
            <div className="header-divider-line"></div>
          </div>
        </ScrollReveal>

        <div className="projects-grid">
          {otherProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.08 + index * 0.06}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
