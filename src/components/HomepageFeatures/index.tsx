import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type ArticleCollection = {
  title: string;
  description: string;
  count: number;
  link: string;
  icon?: string;
};

const ArticleCollections: ArticleCollection[] = [
  {
    title: 'Account, security, verification',
    description: 'Find out about verification, discover how to make changes and better protect your account.',
    count: 19,
    link: '/helpcenter/docs/category/account-security',
    icon: '🔐',
  },
  {
    title: 'Trade on CoinByte',
    description: 'Find out the trading and buy/sell function of CoinByte',
    count: 12,
    link: '/helpcenter/docs/category/trading',
    icon: '📈',
  },
  {
    title: 'Deposits and Withdrawals',
    description: 'To find out deposits and withdrawals of both crypto and fiat assets.',
    count: 15,
    link: '/helpcenter/docs/category/deposits-withdrawals',
    icon: '💳',
  },
  {
    title: 'Use of CoinByte',
    description: 'Learn how to personalize your experience and get solutions to frequently asked questions.',
    count: 7,
    link: '/helpcenter/docs/category/user-guide',
    icon: '📱',
  },
];

function ArticleCard({title, description, count, link, icon}: ArticleCollection) {
  return (
    <div className={clsx('col col--6', styles.featureCard)}>
      <Link to={link} className={styles.cardLink}>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>{icon}</span>
            <h3>{title}</h3>
          </div>
          <p>{description}</p>
          <div className={styles.cardFooter}>
            <span>{count} articles</span>
            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Advice and answers from the CoinByte Team</h2>
        <div className="row">
          {ArticleCollections.map((props, idx) => (
            <ArticleCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
