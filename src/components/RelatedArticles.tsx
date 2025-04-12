import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface Document {
  id: string;
  title: string;
  description?: string;
  permalink: string;
  frontMatter?: {
    description?: string;
    sidebar_position?: number;
  };
}

interface RelatedArticlesProps {
  category?: string;
}

/**
 * 相关文章组件 - 显示特定类别下的所有文档
 */
export default function RelatedArticles({ category }: RelatedArticlesProps): React.ReactNode {
  const location = useLocation();
  const [relatedDocs, setRelatedDocs] = useState<Document[]>([]);
  const { siteConfig } = useDocusaurusContext();
  
  // 客户端渲染时使用
  useEffect(() => {
    try {
      // 安全地获取全局文档数据
      // @ts-ignore
      const data = usePluginData('docusaurus-plugin-content-docs');
      if (!data || !data.docs) {
        console.warn('No docs data available');
        return;
      }
      
      const docs = data.docs;
      if (!docs || typeof docs !== 'object') {
        console.warn('Invalid docs data format');
        return;
      }
      
      // 如果没有提供分类，尝试从当前路径推断
      const derivedCategory = category || (() => {
        const pathParts = location.pathname.split('/');
        const docsIndex = pathParts.indexOf('docs');
        if (docsIndex >= 0 && docsIndex < pathParts.length - 1) {
          return pathParts[docsIndex + 1];
        }
        return '';
      })();
      
      // 过滤出指定目录下的文档
      const articleDocs = Object.entries(docs)
        .filter(([id]) => id.startsWith(derivedCategory) && !id.endsWith('/index'))
        .map(([_, doc]) => doc)
        .filter(doc => doc.permalink !== location.pathname);
      
      setRelatedDocs(articleDocs);
    } catch (error) {
      console.error('Error in RelatedArticles component:', error);
    }
  }, [category, location.pathname]);
  
  // 静态构建时的硬编码数据
  const accountSecurityDocs = [
    {
      id: 'account-security/create-account',
      title: 'Create an Account',
      permalink: '/helpcenter/docs/account-security/create-account',
    },
    {
      id: 'account-security/two-factor-authentication',
      title: 'Two-Factor Authentication (2FA)',
      permalink: '/helpcenter/docs/account-security/two-factor-authentication',
    },
    {
      id: 'account-security/security-settings',
      title: 'Account Security Settings',
      permalink: '/helpcenter/docs/account-security/security-settings',
    },
    {
      id: 'account-security/verification',
      title: 'Verification Guide',
      permalink: '/helpcenter/docs/account-security/verification',
    },
    {
      id: 'account-security/modify-info',
      title: 'Modify Account Information',
      permalink: '/helpcenter/docs/account-security/modify-info',
    },
    {
      id: 'account-security/password-recovery',
      title: 'Password Recovery and Reset',
      permalink: '/helpcenter/docs/account-security/password-recovery',
    }
  ];
  
  // 使用动态获取的文档或硬编码文档
  const docsToShow = relatedDocs.length > 0 
    ? relatedDocs 
    : accountSecurityDocs.filter(doc => doc.permalink !== location.pathname);
  
  if (docsToShow.length === 0) {
    return null;
  }
  
  return (
    <div className="related-articles margin-top--xl">
      <h2>Related Articles</h2>
      <ul className="card-container">
        {docsToShow.map((article, index) => (
          <li key={index} className="card padding--md margin-bottom--sm">
            <Link to={article.permalink} className="related-article-link">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 