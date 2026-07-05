import React from 'react';
import { BarChart3, Database, ShieldCheck, ChevronRight, FileText } from 'lucide-react';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  if (!project) return null;

  // Determine an appropriate icon based on the project ID
  const renderIcon = () => {
    if (project.id === 'dashboards') {
      return <BarChart3 size={20} className="card-header-icon" />;
    }
    if (project.id === 'tradelink') {
      return <Database size={20} className="card-header-icon" />;
    }
    return <FileText size={20} className="card-header-icon" />;
  };

  return (
    <div className="project-card">
      {/* Decorative PCB corner brackets */}
      <span className="card-corner corner-tl"></span>
      <span className="card-corner corner-tr"></span>
      <span className="card-corner corner-bl"></span>
      <span className="card-corner corner-br"></span>

      {/* Travelling laser trace line (CSS pulse) */}
      <div className="card-pulse-line"></div>

      <div className="card-header">
        {renderIcon()}
        <span className="card-id">{project.id.toUpperCase()}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <h4 className="card-subtitle">{project.subtitle}</h4>
        
        <div className="card-role">
          <span className="role-lbl">ROLE:</span> {project.role}
        </div>

        <p className="card-description">{project.description}</p>

        <ul className="card-bullets">
          {project.bullets.map((bullet, idx) => (
            <li key={idx} className="card-bullet-item">
              <span className="card-bullet-dot"></span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-footer">
        <div className="card-tags">
          {project.tech.map((tag) => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
