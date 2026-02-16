import { CategoryGroup } from '../types';
import ResourceCard from './ResourceCard';
import './CategorySection.css';

interface CategorySectionProps {
  group: CategoryGroup;
}

function CategorySection({ group }: CategorySectionProps) {
  // Create a slug for the category anchor
  const categorySlug = group.category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <section className="category-section" id={`category-${categorySlug}`}>
      <h2 className="category-heading">{group.category}</h2>
      <p className="category-blurb">{group.categoryBlurb}</p>
      
      <div className="resource-grid">
        {group.resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
