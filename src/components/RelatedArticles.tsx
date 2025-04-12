import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

/**
 * 相关文章组件 - 显示 Account & Security 类别下的所有文档
 */
export default function RelatedArticles(): JSX.Element | null {
  const location = useLocation();
  
  // 硬编码账户安全类别下的所有文章
  const securityArticles = [
    {
      title: 'Account & Security Overview',
      permalink: '/helpcenter/docs/account-security',
    },
    {
      title: 'Create an Account',
      permalink: '/helpcenter/docs/account-security/create-account',
    },
    {
      title: 'Two-Factor Authentication (2FA)',
      permalink: '/helpcenter/docs/account-security/two-factor-authentication',
    }
  ];
  
  // 过滤掉当前页面
  const filteredArticles = securityArticles.filter(
    article => article.permalink !== location.pathname
  );
  
  if (filteredArticles.length === 0) {
    return null;
  }
  
  return (
    <div className="related-articles margin-top--xl">
      <h2>Related Articles</h2>
      <ul className="card-container">
        {filteredArticles.map((article, index) => (
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