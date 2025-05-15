// src/app/page.js
"use client"

import {useState} from 'react';
import SearchBar from '../app/components/SearchBar';
import LibraryScene from '../app/components/LibraryScene';

export default function Home() {
  const [results, setResults] = useState([]);
  
    const handleSearch = async (keyword) => {
      const res = await fetch(`/api/search?query=${encodeURIComponent(keyword)}`);
      const json = await res.json();
      setResults(json.data);
    };

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold p-4">Infinite Library</h1>
      <SearchBar onSearch={handleSearch} />
      <LibraryScene entries={results} />
    </main>
  );
}