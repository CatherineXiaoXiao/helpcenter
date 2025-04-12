import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useAllDocsData } from '@docusaurus/plugin-content-docs/client';

interface DocumentListProps {
  category: string;
}

type DocItem = any;

export default function DocumentList({ category }: DocumentListProps): React.ReactNode {
  const [error, setError] = useState<string | null>(null);
  
  try {
    // 使用 Docusaurus v3 中的 useAllDocsData 钩子
    const allDocsData = useAllDocsData() as any;
    
    if (!allDocsData) {
      console.warn('No docs data available');
      return <div>No document data available.</div>;
    }
    
    // 获取默认的文档数据
    const docsData = allDocsData.default;
    
    if (!docsData || !docsData.versions || !docsData.versions[0] || !docsData.versions[0].docs) {
      console.warn('Invalid docs data structure');
      return <div>Unable to find documents data.</div>;
    }
    
    const docs = docsData.versions[0].docs as Record<string, DocItem>;
    
    // 添加一些调试输出
    useEffect(() => {
      console.log(`DocumentList for category: ${category}`);
      console.log('Available docs:', Object.keys(docs).length);
      
      // 查看有多少文档匹配当前分类
      const matchingDocs = Object.values(docs).filter(doc => 
        doc.id.startsWith(category + '/') && !doc.id.endsWith('/index')
      );
      console.log(`Found ${matchingDocs.length} docs matching category: ${category}`);
      
      // 输出一个文档对象，以便检查它的结构
      if (matchingDocs.length > 0) {
        console.log('Sample doc object:', matchingDocs[0]);
      }
    }, [category, docs]);
    
    // 过滤出指定目录下的文档，排除index.md
    // 注意: 需要匹配 "category/"，而不是仅仅匹配前缀
    const filteredDocs = Object.values(docs).filter(doc => 
      doc.id.startsWith(category + '/') && !doc.id.endsWith('/index')
    ).sort((a, b) => {
      // 尝试按照sidebar_position排序，如果它存在于metadata或frontMatter中
      const posA = a.metadata?.sidebar_position ?? a.frontMatter?.sidebar_position ?? 999;
      const posB = b.metadata?.sidebar_position ?? b.frontMatter?.sidebar_position ?? 999;
      return posA - posB;
    });
    
    if (filteredDocs.length === 0) {
      return <div className="margin-bottom--lg">No documents found in this category.</div>;
    }
    
    return (
      <div className="row category-list">
        {filteredDocs.map((doc) => {

          // 尝试从不同位置获取描述信息和标题
          const description = doc.metadata?.description || doc.frontMatter?.description || doc.description || '';
          const title = doc.metadata?.title || doc.frontMatter?.title || doc.title || doc.id;
          const path = doc.path || doc.permalink || `#${doc.id}`;
          
          return (
            <div className="col col--4 margin-bottom--lg" key={doc.id}>
              <div className="card">
                <div className="card__body">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <div className="card__footer">
                  <Link 
                    className="button button--primary button--block" 
                    to={path}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.error("Error in DocumentList component:", error);
    // 将错误信息更新到状态
    useEffect(() => {
      setError(error instanceof Error ? error.message : String(error));
    }, [error]);
    
    return (
      <div className="alert alert--danger margin-bottom--lg">
        <p>Failed to load documents. Please try again later.</p>
        {error && <details><summary>Error details</summary><pre>{error}</pre></details>}
      </div>
    );
  }
} 