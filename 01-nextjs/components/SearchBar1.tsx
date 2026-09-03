"use client";

import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <p>Searching for: {search}</p>
    </div>
  );
}