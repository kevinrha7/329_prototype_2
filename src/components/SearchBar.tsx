import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="search-bar">
        <svg 
          className="search-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none"
        >
          <path 
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search resources (e.g., counseling, tutoring, resume, Adobe, safety)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button 
            className="search-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {value && (
        <div className="search-results-count">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
