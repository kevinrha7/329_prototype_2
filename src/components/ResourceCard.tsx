import { Resource } from '../types';
import './ResourceCard.css';

interface ResourceCardProps {
  resource: Resource;
  onTagClick: (tag: string) => void;
  selectedTags: string[];
  onToggleBookmark: (resourceId: string) => void;
  isBookmarked: boolean;
}

function ResourceCard({
  resource,
  onTagClick,
  selectedTags,
  onToggleBookmark,
  isBookmarked,
}: ResourceCardProps) {
  return (
    <div className="resource-card" id={`resource-${resource.id}`}>
      <div className="resource-header">
        <h3 className="resource-title">{resource.title}</h3>
        <button
          type="button"
          className={`resource-bookmark ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={() => onToggleBookmark(resource.id)}
          aria-label={isBookmarked ? `Remove bookmark for ${resource.title}` : `Bookmark ${resource.title}`}
          aria-pressed={isBookmarked}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark resource'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 3h12v18l-6-4-6 4V3z" />
          </svg>
        </button>
      </div>
      <p className="resource-description">{resource.description}</p>
      
      <div className="resource-tags">
        {resource.tags.map((tag) => (
          <button
            key={tag}
            className={`resource-tag ${selectedTags.includes(tag) ? 'tag-active' : ''}`}
            onClick={() => onTagClick(tag)}
            title={`Toggle filter for ${tag}`}
          >
            {tag}
          </button>
        ))}
      </div>

      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="resource-link"
      >
        Official Site →
      </a>
    </div>
  );
}

export default ResourceCard;
