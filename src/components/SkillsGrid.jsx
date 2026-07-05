import React from 'react';
import { skillsData } from '../data/skills';
import { Cpu } from 'lucide-react';
import './SkillsGrid.css';

export default function SkillsGrid() {
  // Convert percentage level (e.g. "90%") to integer rating out of 5 LEDs
  const getLedCount = (levelString) => {
    const percentage = parseInt(levelString, 10) || 0;
    return Math.round((percentage / 100) * 5);
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container skills-container">
        {/* Dynamic trace anchor for Skills section */}
        <div className="trace-anchor" data-id="skills" id="anchor-skills"></div>

        <span className="eyebrow">04 // COMPONENT LAYOUT</span>
        <h2 className="section-title">Technical Skills</h2>

        <div className="skills-grid">
          {skillsData.map((categoryBlock, categoryIdx) => (
            <div key={categoryIdx} className="skills-category-card">
              {/* Card headers look like chip identifiers */}
              <div className="category-header">
                <Cpu size={14} className="category-icon" />
                <span className="category-ic-id">IC-U{categoryIdx + 1}</span>
                <span className="category-name">{categoryBlock.category}</span>
              </div>

              <div className="category-body">
                {categoryBlock.skills.map((skill, skillIdx) => {
                  const activeLeds = getLedCount(skill.level);
                  
                  return (
                    <div key={skillIdx} className="skill-row">
                      <span className="skill-name">{skill.name}</span>
                      
                      {/* 5-dot LED level indicator */}
                      <div className="skill-level-indicator" aria-label={`Skill level: ${skill.level}`}>
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`led-dot ${i < activeLeds ? 'lit' : ''}`}
                          ></span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="category-footer">
                <span className="silkscreen-marking">SILK_MARKING_REV_0</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
