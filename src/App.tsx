import { useEffect, useRef } from 'react'
import FaultyTerminal from '@/components/FaultyTerminal'

/* ── DATA ── */
const skills = [
  {
    category: 'AI / LLMs & Agents',
    tags: ['LangGraph', 'RAG', 'RAGAS', 'DeepEval', 'LLM-as-Judge', 'Agentic Coding', 'Vector DB'],
  },
  {
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    category: 'Backend & Infra',
    tags: ['FastAPI', 'Python', 'Celery', 'PostgreSQL', 'AWS', 'REST APIs'],
  },
  {
    category: 'Languages',
    tags: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    category: 'Soft Skills',
    tags: ['Data Analytics', 'Rapid Prototyping', 'Public Speaking', 'Project Leadership'],
  },
]

const experience = [
  {
    company: 'Mindhive Asia',
    companyTag: 'Mindhive',
    role: 'AI Software Engineer',
    dates: 'Current',
    bullets: [
      'Built an LLM-powered chatbot that converts natural language and uploaded documents into structured ERP actions.',
      'Engineered asynchronous document ingestion pipelines using Celery workers, enabling users to reference documents while extraction jobs run in the background.',
      'Developed LangGraph agent tools and document-driven workflows enabling ERP record creation directly from uploaded business documents.',
      'Designed and deployed production AI systems focused on reliability through robust workflow design and distributed task orchestration.',
    ],
  },
  {
    company: 'Payments Network Malaysia',
    companyTag: 'PayNet',
    role: 'AI R&D Intern',
    dates: 'Sept 2024 – May 2025',
    bullets: [
      'Contributed to the development of a Retrieval-Augmented Generation (RAG) chatbot, participating in architecture brainstorming sessions and requirements alignment meetings with key stakeholders.',
      'Spearheaded the evaluation framework for the chatbot using RAGAS library and LLM-as-judge methodologies to assess faithfulness, context recall, context precision, and answer relevancy.',
      'Led frontend development using React, Tailwind CSS, Context API, and shadcn component library, creating an intuitive and responsive user interface.',
      'Provided data-driven insights to optimize chatbot performance — improved overall performance by 12% through comprehensive evaluation results.',
    ],
  },
]

const clubs = [
  {
    org: 'AIESEC',
    role: 'Director of Events',
    dates: 'Nov 2023 – Nov 2024',
    desc: 'Led a team of 3 to manage tech events including forums, conferences, and hackathons.',
  },
  {
    org: 'AIESEC',
    role: 'Director of Community Project SDG 4',
    dates: 'Aug 2023 – Feb 2024',
    desc: 'Led a team of 5 to create a 4-week volunteer project involving 5 project partners and 12 volunteers, aligned with UN SDG 4 (Quality Education).',
  },
]

const competitions = [
  {
    placement: 'Hackathon Winner',
    title: 'Moneylion X ELLM Startup Initiative',
    desc: 'Built a sustainable clothing app using CLIP embeddings for AI-powered outfit matching.',
  },
  {
    placement: 'Honourable Mention — Top 15',
    title: 'HLB Can You Hack It Hackathon',
    desc: 'Built an AI-powered investment recommendation app.',
  },
  {
    placement: 'First Runner-Up',
    title: "L'Oréal Brandstorm Malaysia",
    desc: 'Built an AI-powered hair stylist training academy.',
  },
]

/* ── REVEAL HOOK ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/* ── SECTION WRAPPER ── */
function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

/* ── APP ── */
export default function App() {
  return (
    <>
      {/* NAV */}
      <nav>
        <a href="#" className="nav-logo">TWS</a>
        <ul className="nav-links">
          <li><a href="#summary">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-shader" aria-hidden="true">
          <FaultyTerminal
            scale={1.5}
            gridMul={[2, 1]}
            digitSize={1.2}
            timeScale={0.5}
            pause={false}
            scanlineIntensity={0.5}
            glitchAmount={1}
            flickerAmount={1}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.1}
              tint="#00C8FF"
            mouseReact
            mouseStrength={0.5}
            pageLoadAnimation
            brightness={0.6}
          />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-inner">
          <p className="hero-pre">// Portfolio — AI Software Engineer</p>
          <h1 className="hero-name">Tay Wei Shen</h1>
          <p className="hero-role">
            AI Software Engineer • LLM Agents<span className="hero-cursor">|</span>
          </p>
          <p className="hero-tagline">
            Building production AI systems powered by LangGraph agents and asynchronous automation pipelines. 
            Specialized in evaluation frameworks and distributed task orchestration.
          </p>
          <div className="hero-ctas">
            <a href="mailto:tayweishen4@gmail.com" className="btn-ghost">
              Email me →
            </a>
            <a
              href="https://www.linkedin.com/in/tay-wei-shen"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              LinkedIn →
            </a>
          </div>
        </div>
        <p className="hero-scroll-hint">scroll to explore</p>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="section" id="summary">
        <div className="container">
          <RevealSection>
            <p className="section-label">// 001 — About</p>
            <div className="section-divider" />
            <div className="summary-grid">
              <div className="summary-pullquote">
                <p>
                  I don't just deploy models —<br />
                  I measure them until they're production-ready.
                </p>
              </div>
              <div className="summary-detail">
          <p>
            Fresh CS grad from <strong>Taylor's University</strong> (CGPA 3.72,
            Dean's List every semester) specialising in AI. Currently an AI Software Engineer at <strong>Mindhive Asia</strong>, 
            building LLM-powered agents and document-driven automation systems. Previously interned at
            <strong> Payments Network Malaysia (PayNet)</strong> on a RAG chatbot — owning the RAGAS evaluation 
            framework and the entire React frontend.
          </p>
          <br />
          <p>
            Focused on delivering reliable production AI systems through evaluation frameworks, 
            distributed task orchestration, and robust workflow design. I care about the full stack: 
            LangGraph agent design, asynchronous pipelines, embeddings, retrieval, evaluation, and UI.
          </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="container">
          <RevealSection>
            <p className="section-label">// 002 — Skills & Tools</p>
            <h2 className="section-title">What I work with</h2>
            <div className="skills-grid">
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="skill-group-label">{group.category}</p>
                  <div className="skill-tags">
                    {group.tags.map((tag) => (
                      <span key={tag} className="skill-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section className="section" id="experience">
        <div className="container">
          <RevealSection>
            <p className="section-label">// 003 — Work Experience</p>
            <h2 className="section-title">Where I've shipped</h2>
            <div className="timeline">
              {experience.map((job, i) => (
                <div className="timeline-item" key={i}>
                  <p className="timeline-company">
                    [{job.company}]{' '}
                    <span>— {job.companyTag}</span>
                  </p>
                  <div className="timeline-meta">
                    <span className="timeline-role">{job.role}</span>
                    <span className="timeline-dates">{job.dates}</span>
                  </div>
                  <ul className="timeline-bullets">
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* COMPETITION WINS */}
      <section className="section" id="wins">
        <div className="container">
          <RevealSection>
            <p className="section-label">// 004 — Competition Wins</p>
            <h2 className="section-title">Recognised performance</h2>
            <div className="wins-grid">
              {competitions.map((comp, i) => (
                <div className="win-badge" key={i}>
                  <p className="win-label">
                    <span className="win-dot" />
                    {comp.placement}
                  </p>
                  <p className="win-title">{comp.title}</p>
                  <p className="card-desc">{comp.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" id="education">
        <div className="container">
          <RevealSection>
            <p className="section-label">// 005 — Education</p>
            <h2 className="section-title">Academic foundation</h2>
            <div className="education-block">
              <p className="edu-degree">
                Bachelor of Computer Science<br />
                Specialising in Artificial Intelligence
              </p>
              <div className="edu-meta">
                <span className="edu-gpa">CGPA <strong>3.72</strong> — Dean's List every semester</span>
                <span className="edu-grad">Graduated: August 2025</span>
              </div>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-label)', fontFamily: 'IBM Plex Mono' }}>
                Taylor's University
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CLUB EXPERIENCE */}
      <section className="section" id="clubs">
        <div className="container">
          <RevealSection>
            <p className="section-label">// 006 — Extracurricular</p>
            <h2 className="section-title">Leadership beyond code</h2>
            <div className="cards-grid">
              {clubs.map((club, i) => (
                <div className="card" key={i}>
                  <p className="card-org">{club.org}</p>
                  <p className="card-role">{club.role}</p>
                  <p className="card-dates">{club.dates}</p>
                  <p className="card-desc">{club.desc}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-watermark" aria-hidden="true">
          <span className="contact-watermark-text">AI ENGINEER</span>
        </div>
        <div className="contact-inner">
          <RevealSection>
            <p className="section-label">// 007 — Contact</p>
            <h2 className="contact-heading">
              Let's talk.<span style={{ color: 'var(--color-accent)' }}>_</span>
            </h2>
            <p className="contact-sub">
              Open to AI/ML engineering roles,
              anything that involves building systems that actually think.
            </p>
            <div className="contact-links">
              <a href="mailto:tayweishen4@gmail.com" className="btn-ghost">
                tayweishen4@gmail.com →
              </a>
              <a
                href="https://www.linkedin.com/in/tay-wei-shen"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                LinkedIn →
              </a>
            </div>
            <div className="contact-footer">
              <span>
                <span className="footer-accent">Tay Wei Shen</span> — AI Engineer, Subang Jaya
              </span>
              <span>Deployed with Cloudflare</span>
            </div>
          </RevealSection>
        </div>
      </section>
    </>
  )
}
