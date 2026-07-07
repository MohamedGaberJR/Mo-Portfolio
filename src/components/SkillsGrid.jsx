import React from 'react';
import { skillsData } from '../data/skills';
import { Cpu } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './SkillsGrid.css';

export default function SkillsGrid() {
  const getLedCount = (levelString) => {
    const percentage = parseInt(levelString, 10) || 0;
    return Math.round((percentage / 100) * 5);
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container skills-container">
        <div className="trace-anchor" data-id="skills" id="anchor-skills"></div>

        <ScrollReveal>
          <span className="eyebrow">04 // COMPONENT LAYOUT</span>
          <h2 className="section-title">Technical Skills</h2>
        </ScrollReveal>

        <div className="skills-grid">
          {skillsData.map((categoryBlock, categoryIdx) => (
            <ScrollReveal key={categoryIdx} delay={categoryIdx * 0.07}>
              <div className="skills-category-card pcb-corners">
                <span className="pcb-corner-bl" aria-hidden="true" />
                <span className="pcb-corner-br" aria-hidden="true" />
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
                        <div className="skill-level-indicator" aria-label={`Skill level: ${skill.level}`}>
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`led-dot ${i < activeLeds ? 'lit' : ''}`}
                              style={{ '--led-index': i }}
                            />
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
