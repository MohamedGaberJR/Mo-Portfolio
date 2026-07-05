import React from 'react';
import { projects } from '../data/projects';
import FeaturedProject from './FeaturedProject';
import ProjectCard from './ProjectCard';
import './Work.css';

export default function Work() {
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="work" className="work-section">
      <div className="container">
        <span className="eyebrow">02 // PORTFOLIO CHIPS</span>
        <h2 className="section-title">Technical Projects</h2>

        {/* Featured Project - CarKit */}
        <div className="featured-wrapper">
          <FeaturedProject project={featuredProject} />
        </div>

        {/* Secondary Projects Grid */}
        <div className="other-projects-header">
          <span className="sub-eyebrow">ADDITIONAL BOARD REGISTERS</span>
          <div className="header-divider-line"></div>
        </div>

        <div className="projects-grid">
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
