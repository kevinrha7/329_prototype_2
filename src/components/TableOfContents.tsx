import { useState } from 'react';
import { CategoryGroup } from '../types';
import './TableOfContents.css';

interface TableOfContentsProps {
  categoryGroups: CategoryGroup[];
}

function TableOfContents({ categoryGroups }: TableOfContentsProps) {
  // Track which categories are expanded (all collapsed by default)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <nav className="toc">
      <h2 className="toc-title">Contents</h2>
      
      <ul className="toc-list">
        {categoryGroups.map((group) => {
          const categorySlug = group.category
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          
          const isExpanded = expandedCategories.has(group.category);

          return (
            <li key={group.category} className="toc-category">
              <div className="toc-category-header">
                <button
                  className="toc-toggle"
                  onClick={() => toggleCategory(group.category)}
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                  <span className={`toc-arrow ${isExpanded ? 'expanded' : ''}`}>
                    ▶
                  </span>
                </button>
                <a
                  href={`#category-${categorySlug}`}
                  className="toc-link toc-link-category"
                  onClick={(e) => handleClick(e, `category-${categorySlug}`)}
                >
                  {group.category}
                </a>
              </div>
              
              {group.resources.length > 0 && isExpanded && (
                <ul className="toc-resources">
                  {group.resources.map((resource) => (
                    <li key={resource.id}>
                      <a
                        href={`#resource-${resource.id}`}
                        className="toc-link toc-link-resource"
                        onClick={(e) => handleClick(e, `resource-${resource.id}`)}
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default TableOfContents;
