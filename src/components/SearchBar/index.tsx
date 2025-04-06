import React from 'react';
import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import styles from './styles.module.css';

export default function SearchBar(): JSX.Element {
  return (
    <div className={styles.searchContainer}>
      <DocSearch
        appId="YOUR_APP_ID"
        indexName="help-center"
        apiKey="YOUR_SEARCH_API_KEY"
        placeholder="Search the help center..."
        searchParameters={{
          facetFilters: ['language:en'],
        }}
        transformItems={(items) => {
          return items.map((item) => ({
            ...item,
            url: item.url,
          }));
        }}
      />
    </div>
  );
} 