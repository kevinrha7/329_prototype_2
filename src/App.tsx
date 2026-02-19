import { useState, useMemo } from 'react';
import { resources } from './data';
import { CategoryGroup } from './types';
import SearchBar from './components/SearchBar';
import TableOfContents from './components/TableOfContents';
import CategorySection from './components/CategorySection';
import ScrollToTop from './components/ScrollToTop';
import FeedbackButton from './components/FeedbackButton';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter resources based on search query and selected tag
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Filter by selected tag first
    if (selectedTag) {
      filtered = filtered.filter((resource) => 
        resource.tags.includes(selectedTag)
      );
    }

    // Then apply search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      
      filtered = filtered.filter((resource) => {
        const matchesTitle = resource.title.toLowerCase().includes(query);
        const matchesDescription = resource.description.toLowerCase().includes(query);
        const matchesTags = resource.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesCategory = resource.category.toLowerCase().includes(query);
        
        return matchesTitle || matchesDescription || matchesTags || matchesCategory;
      });
    }

    return filtered;
  }, [searchQuery, selectedTag]);

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

  // Handler for tag clicks
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSearchQuery(''); // Clear search when filtering by tag
    // Scroll to top to show the filter is active
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to clear tag filter
  const clearTagFilter = () => {
    setSelectedTag(null);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Northwestern University Student Resources</h1>
          <p className="subtitle">Find support quickly. Browse by category or search by keyword.</p>
          
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery}
            resultCount={filteredResources.length}
          />

          {selectedTag && (
            <div className="tag-filter-notice">
              <span>
                Showing resources tagged with: <strong>{selectedTag}</strong>
              </span>
              <button onClick={clearTagFilter} className="clear-filter-btn">
                Clear filter ✕
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="layout">
        <main className="main-content">

          {categoryGroups.length > 0 ? (
            categoryGroups.map((group) => (
              <CategorySection 
                key={group.category} 
                group={group} 
                onTagClick={handleTagClick}
                selectedTag={selectedTag}
              />
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

      <ScrollToTop />
      <FeedbackButton />
    </div>
  );
}

export default App;
