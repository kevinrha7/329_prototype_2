import { Resource } from '../types';
import ResourceCard from './ResourceCard';
import './SavedResourcesSection.css';

interface SavedResourcesSectionProps {
  resources: Resource[];
  onTagClick: (tag: string) => void;
  selectedTags: string[];
  onToggleBookmark: (resourceId: string) => void;
}

function SavedResourcesSection({
  resources,
  onTagClick,
  selectedTags,
  onToggleBookmark,
}: SavedResourcesSectionProps) {
  return (
    <section className="saved-resources-section" id="saved-resources">
      <div className="saved-resources-header">
        <h2 className="saved-resources-title">Saved Resources</h2>
        <span className="saved-resources-count">{resources.length} saved</span>
      </div>

      {resources.length > 0 ? (
        <div className="saved-resources-grid">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onTagClick={onTagClick}
              selectedTags={selectedTags}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={true}
            />
          ))}
        </div>
      ) : (
        <p className="saved-resources-empty">
          Bookmark resources to keep them here for quick access.
        </p>
      )}
    </section>
  );
}

export default SavedResourcesSection;
