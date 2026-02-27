import { useState, useMemo, useEffect } from 'react';
import { resources } from './data';
import { CategoryGroup } from './types';
import SearchBar from './components/SearchBar';
import DiscoverCarousel from './components/DiscoverCarousel';
import TableOfContents from './components/TableOfContents';
import CategorySection from './components/CategorySection';
import SavedResourcesSection from './components/SavedResourcesSection';
import ScrollToTop from './components/ScrollToTop';
import FeedbackButton from './components/FeedbackButton';
import './App.css';

const BOOKMARK_COOKIE_NAME = 'nu_resource_bookmarks';

const getBookmarkedIdsFromCookie = (): string[] => {
  if (typeof document === 'undefined') {
    return [];
  }

  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${BOOKMARK_COOKIE_NAME}=`));

  if (!cookie) {
    return [];
  }

  try {
    const value = decodeURIComponent(cookie.substring(BOOKMARK_COOKIE_NAME.length + 1));
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

const saveBookmarkedIdsToCookie = (bookmarkedIds: string[]) => {
  if (typeof document === 'undefined') {
    return;
  }

  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${BOOKMARK_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(bookmarkedIds)
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => getBookmarkedIdsFromCookie());
  const [pendingScrollResourceId, setPendingScrollResourceId] = useState<string | null>(null);

  useEffect(() => {
    saveBookmarkedIdsToCookie(bookmarkedIds);
  }, [bookmarkedIds]);

  // Filter resources based on search query and selected tag
  const filteredResources = useMemo(() => {
    let filtered = resources;

    // Filter by selected tag first
    if (selectedTags.length > 0) {
      filtered = filtered.filter((resource) => 
        resource.tags.some((tag) => selectedTags.includes(tag))
      );
    }

    // Then apply search query if present
    if (searchQuery.trim()) {
      const queryTerms = searchQuery
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);
      
      filtered = filtered.filter((resource) => {
        const matchesTitle = queryTerms.some((term) =>
          resource.title.toLowerCase().includes(term)
        );
        const matchesDescription = queryTerms.some((term) =>
          resource.description.toLowerCase().includes(term)
        );
        const matchesTags = queryTerms.some((term) =>
          resource.tags.some((tag) => tag.toLowerCase().includes(term))
        );
        const matchesCategory = queryTerms.some((term) =>
          resource.category.toLowerCase().includes(term)
        );
        
        return matchesTitle || matchesDescription || matchesTags || matchesCategory;
      });
    }

    return filtered;
  }, [searchQuery, selectedTags]);

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

  const bookmarkedResources = useMemo(
    () => resources.filter((resource) => bookmarkedIds.includes(resource.id)),
    [bookmarkedIds]
  );
  const discoverableResources = useMemo(
    () => resources.filter((resource) => !bookmarkedIds.includes(resource.id)),
    [bookmarkedIds]
  );

  // Handler for tag clicks
  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((selected) => selected !== tag) : [...prev, tag]
    );
    setSearchQuery(''); // Clear search when filtering by tag
    // Scroll to top to show the filter is active
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to clear tag filter
  const clearTagFilter = () => {
    setSelectedTags([]);
  };

  const handleToggleBookmark = (resourceId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(resourceId)
        ? prev.filter((id) => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleDiscoverResourceSelect = (resourceId: string) => {
    setSearchQuery('');
    setSelectedTags([]);
    setPendingScrollResourceId(resourceId);
  };

  useEffect(() => {
    if (!pendingScrollResourceId) {
      return;
    }

    const target = document.getElementById(`resource-${pendingScrollResourceId}`);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setPendingScrollResourceId(null);
  }, [pendingScrollResourceId, categoryGroups]);

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

          {selectedTags.length > 0 && (
            <div className="tag-filter-notice">
              <span>
                Showing resources tagged with: <strong>{selectedTags.join(', ')}</strong>
              </span>
              <button onClick={clearTagFilter} className="clear-filter-btn">
                Clear filters ✕
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="layout">
        <main className="main-content">
          <DiscoverCarousel
            resources={discoverableResources}
            onResourceSelect={handleDiscoverResourceSelect}
          />

          <SavedResourcesSection
            resources={bookmarkedResources}
            onTagClick={handleTagClick}
            selectedTags={selectedTags}
            onToggleBookmark={handleToggleBookmark}
          />

          {categoryGroups.length > 0 ? (
            categoryGroups.map((group) => (
              <CategorySection 
                key={group.category} 
                group={group} 
                onTagClick={handleTagClick}
                selectedTags={selectedTags}
                onToggleBookmark={handleToggleBookmark}
                bookmarkedIds={bookmarkedIds}
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
          <div className="sidebar-feedback">
            <FeedbackButton />
          </div>
        </aside>
      </div>

      <ScrollToTop />
    </div>
  );
}

export default App;
