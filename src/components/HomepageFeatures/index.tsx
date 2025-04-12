import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { usePluginData } from '@docusaurus/useGlobalData';
import type { ReactNode } from 'react';
import styles from './styles.module.css';

type ArticleCollection = {
  title: string;
  description: string;
  link: string;
  icon?: string;
  category: string;
};

const ArticleCollections: ArticleCollection[] = [
  {
    title: 'Account, security, verification',
    description: 'Find out about verification, discover how to make changes and better protect your account.',
    category: 'account-security',
    link: '/helpcenter/docs/account-security',
    icon: '🔐',
  },
  {
    title: 'Trade on CoinByte',
    description: 'Find out the trading and buy/sell function of CoinByte',
    category: 'trading',
    link: '/helpcenter/docs/trading',
    icon: '📈',
  },
  {
    title: 'Deposits and Withdrawals',
    description: 'To find out deposits and withdrawals of both crypto and fiat assets.',
    category: 'deposits-withdrawals',
    link: '/helpcenter/docs/deposits-withdrawals',
    icon: '💳',
  },
  {
    title: 'Use of CoinByte',
    description: 'Learn how to personalize your experience and get solutions to frequently asked questions.',
    category: 'user-guide',
    link: '/helpcenter/docs/user-guide',
    icon: '📱',
  },
];

interface ArticleCardProps extends ArticleCollection {
  count: number;
}

function ArticleCard({title, description, count, link, icon}: ArticleCardProps) {
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
            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  const [collectionsWithCount, setCollectionsWithCount] = useState<ArticleCardProps[]>([]);
  
  useEffect(() => {
    try {
      const data = usePluginData('docusaurus-plugin-content-docs') as any;
      
      if (!data || !data.docs) {
        console.warn('No docs data available, using default counts');
        const defaultCounts = ArticleCollections.map(collection => ({
          ...collection,
          count: 0
        }));
        setCollectionsWithCount(defaultCounts);
        return;
      }
      
      const docs = data.docs;
      
      const categoryCounts = ArticleCollections.map(collection => {
        const categoryDocs = Object.values(docs).filter((doc: any) => 
          doc && doc.id && doc.id.startsWith(collection.category) && !doc.id.endsWith('/index')
        );
        
        return {
          ...collection,
          count: categoryDocs.length || 0
        };
      });
      
      setCollectionsWithCount(categoryCounts);
    } catch (error) {
      console.error('Error calculating article counts:', error);
      const fallbackCounts = [
        { ...ArticleCollections[0], count: 6 },
        { ...ArticleCollections[1], count: 0 },
        { ...ArticleCollections[2], count: 0 },
        { ...ArticleCollections[3], count: 0 }
      ];
      setCollectionsWithCount(fallbackCounts);
    }
  }, []);
  
  if (collectionsWithCount.length === 0) {
    return renderFeatureSection(ArticleCollections.map(collection => ({
      ...collection,
      count: 0
    })));
  }
  
  return renderFeatureSection(collectionsWithCount);
}

function renderFeatureSection(collections: ArticleCardProps[]) {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Advice and answers from the CoinByte Team</h2>
        <div className="row">
          {collections.map((props, idx) => (
            <ArticleCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
