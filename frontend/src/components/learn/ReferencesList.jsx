import { useState } from 'react';
import styles from './ReferencesList.module.css';

export default function ReferencesList({ references }) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All References' },
    { id: 'books', label: '1. Books' },
    { id: 'official', label: '2. Official Documentation' },
    { id: 'websites', label: '3. Educational Websites' },
    { id: 'papers', label: '4. Research Papers' },
    { id: 'videos', label: '5. YouTube Videos' },
  ];

  const renderBooks = () => (
    <div className={styles.categoryBlock}>
      <h3 className={styles.categoryTitle}>1. Academic Books & Standard Curricula</h3>
      <div className={styles.refGrid}>
        {references.books.map((book, idx) => (
          <div key={idx} className={styles.refCard}>
            <div className={styles.refHeader}>
              <span className={styles.refBadge}>Book</span>
              <span className={styles.refYear}>{book.year}</span>
            </div>
            <h4 className={styles.refItemTitle}>{book.title}</h4>
            <p className={styles.refAuthors}>Authors: {book.authors}</p>
            <p className={styles.refPublisher}>Publisher: {book.publisher}</p>
            <p className={styles.refDesc}>{book.relevance}</p>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.refLink}
            >
              Academic Catalog Entry ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOfficial = () => (
    <div className={styles.categoryBlock}>
      <h3 className={styles.categoryTitle}>2. Official Database Engine Specifications</h3>
      <div className={styles.refGrid}>
        {references.officialDocumentation.map((doc, idx) => (
          <div key={idx} className={styles.refCard}>
            <div className={styles.refHeader}>
              <span className={styles.refBadge}>Documentation</span>
              <span className={styles.refOrg}>{doc.organization}</span>
            </div>
            <h4 className={styles.refItemTitle}>{doc.title}</h4>
            <p className={styles.refDesc}>{doc.description}</p>
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.refLink}
            >
              Official Engine Spec ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWebsites = () => (
    <div className={styles.categoryBlock}>
      <h3 className={styles.categoryTitle}>3. Professional Educational Websites</h3>
      <div className={styles.refGrid}>
        {references.educationalWebsites.map((site, idx) => (
          <div key={idx} className={styles.refCard}>
            <div className={styles.refHeader}>
              <span className={styles.refBadge}>Tutorial</span>
              <span className={styles.refOrg}>{site.platform}</span>
            </div>
            <h4 className={styles.refItemTitle}>{site.title}</h4>
            <p className={styles.refDesc}>{site.description}</p>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.refLink}
            >
              Visit Educational Resource ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPapers = () => (
    <div className={styles.categoryBlock}>
      <h3 className={styles.categoryTitle}>4. Seminal Computer Science Research Papers</h3>
      <div className={styles.refGrid}>
        {references.researchPapers.map((paper, idx) => (
          <div key={idx} className={styles.refCard}>
            <div className={styles.refHeader}>
              <span className={styles.refBadge}>Research Paper</span>
              <span className={styles.refYear}>{paper.year}</span>
            </div>
            <h4 className={styles.refItemTitle}>{paper.title}</h4>
            <p className={styles.refAuthors}>Authors: {paper.authors}</p>
            <p className={styles.refJournal}>{paper.journal}</p>
            <p className={styles.refDesc}>{paper.significance}</p>
            <div className={styles.refDoi}>DOI: {paper.doi}</div>
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.refLink}
            >
              Access Published Research ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVideos = () => (
    <div className={styles.categoryBlock}>
      <h3 className={styles.categoryTitle}>5. Educational YouTube Videos</h3>
      <div className={styles.refGrid}>
        {references.youtubeVideos.map((vid, idx) => (
          <div key={idx} className={styles.refCard}>
            <div className={styles.refHeader}>
              <span className={styles.refBadge}>YouTube Video</span>
              <span className={styles.refOrg}>{vid.channel}</span>
            </div>
            <h4 className={styles.refItemTitle}>{vid.title}</h4>
            <p className={styles.refDesc}>
              <strong>Topic Covered:</strong> {vid.topicCovered}
            </p>
            <a
              href={vid.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.refLink}
            >
              Watch Video Lesson on YouTube ↗
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.section} aria-label="Academic References">
      <div className={styles.header}>
        <span className="label">Academic Integrity</span>
        <h2 className={styles.sectionTitle}>Curated Academic References</h2>
        <p className={styles.sectionDesc}>
          Every formula, query transformation, and educational lesson is backed by real, verifiable academic literature,
          official engine standards, and peer-reviewed research papers.
        </p>

        <div className={styles.tabNav} role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`${styles.tabBtn} ${activeTab === cat.id ? styles.tabActive : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        {(activeTab === 'all' || activeTab === 'books') && renderBooks()}
        {(activeTab === 'all' || activeTab === 'official') && renderOfficial()}
        {(activeTab === 'all' || activeTab === 'websites') && renderWebsites()}
        {(activeTab === 'all' || activeTab === 'papers') && renderPapers()}
        {(activeTab === 'all' || activeTab === 'videos') && renderVideos()}
      </div>
    </section>
  );
}
