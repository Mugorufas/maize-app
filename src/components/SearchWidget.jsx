import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_GUIDES } from '../data/guideInitialData';
import './SearchWidget.css';

const SearchWidget = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const matches = [];

    // Scan through all guides
    Object.entries(INITIAL_GUIDES).forEach(([guideKey, data]) => {
      // 1. Search in Sections
      data.sections.forEach(section => {
        const textToSearch = `${section.title} ${section.explanation} ${section.items.map(i => i.label + ' ' + i.text).join(' ')}`.toLowerCase();
        
        if (searchTerms.every(term => textToSearch.includes(term))) {
          matches.push({
            id: `${guideKey}-${section.id}`,
            title: section.title,
            category: guideKey.charAt(0).toUpperCase() + guideKey.slice(1),
            path: `/${guideKey}#${section.id}`
          });
        }
      });
    });

    setResults(matches.slice(0, 5));
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (path) => {
    setIsOpen(false);
    setQuery('');
    navigate(path);
    
    // Fallback for anchor scrolling
    const hash = path.split('#')[1];
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="search-widget" ref={searchRef}>
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search guides (e.g. Spacing, Fertilizer)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="search-results">
          {results.map((res) => (
            <div
              key={res.id}
              className="search-result-item"
              onClick={() => handleSelect(res.path)}
            >
              <span className="result-cat">{res.category}</span>
              <span className="result-title">{res.title}</span>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query.trim() && results.length === 0 && (
        <div className="search-results">
          <div className="search-result-empty">No matching topics found</div>
        </div>
      )}
    </div>
  );
};

export default SearchWidget;
