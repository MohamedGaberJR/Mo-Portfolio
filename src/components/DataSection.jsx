import React, { useState } from 'react';
import { BarChart2, Database, ShieldAlert, GitCommit } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './DataSection.css';

export default function DataSection() {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Data for the interactive SVG copper line chart
  const chartPoints = [
    { x: 30, y: 150, value: 'Q1: Data Prep', desc: 'ETL Pipelines established' },
    { x: 90, y: 110, value: 'Q2: ERD Modeling', desc: 'Relational logic mapped' },
    { x: 150, y: 130, value: 'Q3: DAX Aggs', desc: 'Complex calculations written' },
    { x: 210, y: 60, value: 'Q4: Optimization', desc: 'Indexes & Query tuning' },
    { x: 270, y: 40, value: 'Release: Dashboard', desc: 'Power BI visual reporting' }
  ];

  // Draw SVG path for the chart
  const pathD = `M ${chartPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`;

  return (
    <section id="data" className="data-section">
      <div className="container data-container">
        {/* Dynamic trace anchor for Data & Analytics section */}
        <div className="trace-anchor" data-id="data" id="anchor-data"></div>

        <div className="data-grid">
          <ScrollReveal className="data-info">
            <span className="eyebrow-copper">03 // DATA CORES & ANALYTICS</span>
            <h2 className="section-title title-copper">
              Data & Analytics
            </h2>
            <p className="data-desc">
              My engineering approach goes beyond UI design. Drawing from my BIS background, I design robust relational database structures, map complex system dependencies, and build interactive analytics pipelines.
            </p>

            <div className="data-highlights">
              <div className="data-highlight-item">
                <Database size={16} className="highlight-icon-copper" />
                <div>
                  <h4>Database Design & ERDs</h4>
                  <p>Lead architect on TradeLink database schemas. Expert in designing normalizations (1NF to 3NF), establishing data dictionaries, and writing optimized CRUD matrices.</p>
                </div>
              </div>

              <div className="data-highlight-item">
                <BarChart2 size={16} className="highlight-icon-copper" />
                <div>
                  <h4>Power BI & Data Modeling</h4>
                  <p>Experienced in writing advanced DAX (Data Analysis Expressions) queries, managing star/snowflake schemas, and formatting Tableau dashboards for executive reporting.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="data-visual" delay={0.12}>
            <div className="dashboard-board">
              <div className="board-header">
                <span className="board-title">COPPER REGISTRY INTERFACE</span>
                <span className="board-freq">4.1 GHz</span>
              </div>
              
              <div className="dashboard-body">
                {/* Custom SVG Line Chart */}
                <div className="chart-container">
                  <svg className="analytics-svg" viewBox="0 0 300 200">
                    <defs>
                      <linearGradient id="copper-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--copper-accent)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--copper-accent)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="10" y1="40" x2="290" y2="40" stroke="rgba(201, 143, 74, 0.08)" strokeDasharray="3,3" />
                    <line x1="10" y1="90" x2="290" y2="90" stroke="rgba(201, 143, 74, 0.08)" strokeDasharray="3,3" />
                    <line x1="10" y1="140" x2="290" y2="140" stroke="rgba(201, 143, 74, 0.08)" strokeDasharray="3,3" />

                    {/* Area under curve */}
                    <path
                      d={`${pathD} L 270 180 L 30 180 Z`}
                      fill="url(#copper-gradient)"
                    />

                    {/* Main line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="var(--copper-accent)"
                      strokeWidth="2.5"
                    />

                    {/* Interactive points */}
                    {chartPoints.map((pt, idx) => (
                      <g 
                        key={idx} 
                        className="chart-dot-group"
                        onMouseEnter={() => setHoveredPoint(pt)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={idx === 4 ? 6 : 4}
                          className="chart-dot"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Tooltip */}
                  <div className={`chart-tooltip ${hoveredPoint ? 'visible' : ''}`}>
                    {hoveredPoint && (
                      <>
                        <div className="tooltip-value">{hoveredPoint.value}</div>
                        <div className="tooltip-desc">{hoveredPoint.desc}</div>
                      </>
                    )}
                  </div>
                </div>

                {/* Dashboard Metrics */}
                <div className="dashboard-stats-grid">
                  <div className="stat-pill-copper">
                    <span className="stat-lbl-copper">QUERY OPT</span>
                    <span className="stat-val-copper">94.8%</span>
                  </div>
                  <div className="stat-pill-copper">
                    <span className="stat-lbl-copper">DAX STACK</span>
                    <span className="stat-val-copper">ACTIVE</span>
                  </div>
                </div>
              </div>

              <div className="board-footer">
                <span className="footer-silk-copper">DATA INTEGRITY BLOCK v1.2</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
