import { CategoryGroup } from '../types';
import './TableOfContents.css';

interface TableOfContentsProps {
  categoryGroups: CategoryGroup[];
}

function TableOfContents({ categoryGroups }: TableOfContentsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

          return (
            <li key={group.category} className="toc-category">
              <a
                href={`#category-${categorySlug}`}
                className="toc-link toc-link-category"
                onClick={(e) => handleClick(e, `category-${categorySlug}`)}
              >
                {group.category}
              </a>
              
              {group.resources.length > 0 && (
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
