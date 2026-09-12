import { useEffect } from 'react';
import SiteFooter from '../components/layout/SiteFooter';
import { GUIDE_INFO, ACADEMIC_METADATA, TEAM_MEMBERS } from '../data/teamData';
import styles from './DevelopedByPage.module.css';

export default function DevelopedByPage() {
  useEffect(() => {
    document.title = 'Developed By — SQL Aggregation Visualizer Team';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className="label">Project Personnel &amp; Supervision</span>
            <h1 className={styles.heroTitle}>
              Developed By <span className={styles.gradientText}>Academic Team</span>
            </h1>
            <p className={styles.heroDesc}>
              Engineered for {ACADEMIC_METADATA.courseName} ({ACADEMIC_METADATA.courseCode}) at{' '}
              {ACADEMIC_METADATA.institution}. Designed to provide intuitive visual insight into
              complex relational database aggregation mechanics.
            </p>

            <div className={styles.metaPills}>
              <div className={styles.pill}>
                <span className={styles.pillLabel}>Academic Year:</span>
                <span className={styles.pillVal}>{ACADEMIC_METADATA.submissionYear}</span>
              </div>
              <div className={styles.pill}>
                <span className={styles.pillLabel}>Domain:</span>
                <span className={styles.pillVal}>Database Systems &amp; OLAP Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          {/* Faculty Guide Spotlight Card */}
          <section className={styles.guideSection} aria-label="Faculty Supervision">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSub}>Academic Mentorship</span>
              <h2 className={styles.sectionHeading}>Project Guide &amp; Faculty Advisor</h2>
            </div>

            <div className={styles.guideCard}>
              <div className={styles.guideAvatarCol}>
                <div className={styles.avatarLarge}>
                  {GUIDE_INFO.avatarUrl ? (
                    <img src={GUIDE_INFO.avatarUrl} alt={GUIDE_INFO.name} className={styles.avatarImg} />
                  ) : (
                    <div className={styles.monogram}>Dr. S</div>
                  )}
                </div>
                <div className={styles.guideTag}>Faculty Supervisor</div>
              </div>

              <div className={styles.guideInfoCol}>
                <div className={styles.guidePre}>Guided By</div>
                <h3 className={styles.guideName}>{GUIDE_INFO.name}</h3>
                <div className={styles.guideDesignation}>{GUIDE_INFO.designation}</div>
                <div className={styles.guideDept}>{GUIDE_INFO.department}</div>
                <div className={styles.guideInst}>{GUIDE_INFO.institution}</div>
                
                <p className={styles.guideBio}>{GUIDE_INFO.profileBio}</p>
              </div>
            </div>
          </section>

          {/* Student Team Cards Grid */}
          <section className={styles.teamSection} aria-label="Student Development Team">
            <div className={styles.sectionHeader}>
              <span className={styles.sectionSub}>Student Engineering Team</span>
              <h2 className={styles.sectionHeading}>Project Developers &amp; Researchers</h2>
              <p className={styles.teamNotice}>
                Student credentials and responsibilities are configured in{' '}
                <code className={styles.configCode}>src/data/teamData.js</code>.
              </p>
            </div>

            <div className={styles.teamGrid}>
              {TEAM_MEMBERS.map((member, idx) => {
                const initials = member.name
                  .split(' ')
                  .map(n => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

                return (
                  <article key={member.id || idx} className={styles.memberCard}>
                    <div className={styles.cardTop}>
                      <div className={styles.avatarWrapper}>
                        {member.avatarUrl ? (
                          <img src={member.avatarUrl} alt={member.name} className={styles.avatarImg} />
                        ) : (
                          <div className={`${styles.studentAvatar} ${styles[`color_${(idx % 4) + 1}`]}`}>
                            {initials || `S${idx + 1}`}
                          </div>
                        )}
                        {member.isLeader && (
                          <span className={styles.leaderBadge} title="Team Lead">Lead</span>
                        )}
                      </div>

                      <div className={styles.nameBlock}>
                        <h3 className={styles.memberName}>{member.name}</h3>
                        <div className={styles.regNumber}>
                          <span className={styles.regLabel}>Reg No:</span>
                          <span className={styles.regVal}>{member.registerNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.roleBadge}>{member.role}</div>

                    <p className={styles.contributionText}>{member.contribution}</p>

                    {member.githubUrl && (
                      <div className={styles.cardFooter}>
                        <a
                          href={member.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.profileLink}
                        >
                          Developer Profile ↗
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
