import { useState, useMemo } from 'react';
import { resources } from './data';
import { CategoryGroup } from './types';
import SearchBar from './components/SearchBar';
import TableOfContents from './components/TableOfContents';
import CategorySection from './components/CategorySection';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter resources based on search query
  const filteredResources = useMemo(() => {
    if (!searchQuery.trim()) {
      return resources;
    }

    const query = searchQuery.trim().toLowerCase();
    
    return resources.filter((resource) => {
      const matchesTitle = resource.title.toLowerCase().includes(query);
      const matchesDescription = resource.description.toLowerCase().includes(query);
      const matchesTags = resource.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesCategory = resource.category.toLowerCase().includes(query);
      
      return matchesTitle || matchesDescription || matchesTags || matchesCategory;
    });
  }, [searchQuery]);

  // Group filtered resources by category
  const categoryGroups = useMemo(() => {
    const groups: { [key: string]: CategoryGroup } = {};

    filteredResources.forEach((resource) => {
      if (!groups[resource.category]) {
        groups[resource.category] = {
          category: resource.category,
          categoryBlurb: resource.categoryBlurb,
          resources: [],
        };
      }
      groups[resource.category].resources.push(resource);
    });

    return Object.values(groups);
  }, [filteredResources]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Northwestern University Student Resources</h1>
          <p className="subtitle">Find support quickly. Browse by category or search by keyword.</p>
        </div>
      </header>

      <div className="layout">
        <main className="main-content">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            resultCount={filteredResources.length}
          />

          {categoryGroups.length > 0 ? (
            categoryGroups.map((group) => (
              <CategorySection key={group.category} group={group} />
            ))
          ) : (
            <div className="no-results">
              <p>No resources found matching "{searchQuery}"</p>
              <p className="no-results-hint">Try different keywords or browse all resources.</p>
            </div>
          )}
        </main>

        <aside className="sidebar">
          <TableOfContents categoryGroups={categoryGroups} />
        </aside>
      </div>
    </div>
  );
}

export default App;
