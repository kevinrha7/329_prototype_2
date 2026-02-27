import { useEffect, useMemo, useState } from 'react';
import { Resource } from '../types';
import './DiscoverCarousel.css';

interface DiscoverCarouselProps {
  resources: Resource[];
  onResourceSelect: (resourceId: string) => void;
}

const shuffleResources = (items: Resource[]): Resource[] => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function DiscoverCarousel({ resources, onResourceSelect }: DiscoverCarouselProps) {
  const randomizedResources = useMemo(() => shuffleResources(resources), [resources]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [randomizedResources]);

  useEffect(() => {
    if (randomizedResources.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % randomizedResources.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [randomizedResources]);

  if (randomizedResources.length === 0) {
    return (
      <div className="discover-carousel">
        <p className="discover-title">Discover Something New</p>
        <p className="discover-empty">You bookmarked everything. Nice work.</p>
      </div>
    );
  }

  const currentResource = randomizedResources[currentIndex];

  return (
    <div className="discover-carousel">
      <div className="discover-header">
        <p className="discover-title">Discover Something New</p>
      </div>

      <button
        type="button"
        className="discover-card"
        onClick={() => onResourceSelect(currentResource.id)}
      >
        <span className="discover-label">Try this resource</span>
        <strong className="discover-resource-title">{currentResource.title}</strong>
        <span className="discover-resource-category">{currentResource.category}</span>
      </button>
    </div>
  );
}

export default DiscoverCarousel;
