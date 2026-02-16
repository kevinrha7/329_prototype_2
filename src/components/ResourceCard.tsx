import { Resource } from '../types';
import './ResourceCard.css';

interface ResourceCardProps {
  resource: Resource;
}

function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="resource-card" id={`resource-${resource.id}`}>
      <h3 className="resource-title">{resource.title}</h3>
      <p className="resource-description">{resource.description}</p>
      
      <div className="resource-tags">
        {resource.tags.map((tag) => (
          <span key={tag} className="resource-tag">
            {tag}
          </span>
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
