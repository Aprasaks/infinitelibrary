// src/app/page.js
"use client"

import SearchBar from '../app/components/SearchBar';
import LibraryScene from '../app/components/LibraryScene';

export default function Home() {
  const handleSearch = (keyword) => {
    console.log('검색어:', keyword);
    // 나중에 API 호출 후 결과를 3D 씬에 반영할 로직을 여기에 작성합니다.
  };

  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold p-4">Infinite Library</h1>
      <SearchBar onSearch={handleSearch} />
      <LibraryScene />
    </main>
  );
}