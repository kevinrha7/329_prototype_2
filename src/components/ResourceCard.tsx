import { Resource } from '../types';
import './ResourceCard.css';

interface ResourceCardProps {
  resource: Resource;
  onTagClick: (tag: string) => void;
  selectedTag: string | null;
}

function ResourceCard({ resource, onTagClick, selectedTag }: ResourceCardProps) {
  return (
    <div className="resource-card" id={`resource-${resource.id}`}>
      <h3 className="resource-title">{resource.title}</h3>
      <p className="resource-description">{resource.description}</p>
      
      <div className="resource-tags">
        {resource.tags.map((tag) => (
          <button
            key={tag}
            className={`resource-tag ${selectedTag === tag ? 'tag-active' : ''}`}
            onClick={() => onTagClick(tag)}
            title={`Filter by ${tag}`}
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
