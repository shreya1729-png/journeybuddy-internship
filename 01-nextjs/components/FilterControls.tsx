"use client";

import { useState } from "react";

export default function FilterControls() {
  const [period, setPeriod] = useState("All");

  return (
    <div>
      <label htmlFor="period">Filter by period: </label>

      <select
        id="period"
        value={period}
        onChange={(event) => setPeriod(event.target.value)}
      >
        <option>All</option>
        <option>Today</option>
        <option>Last 7 days</option>
        <option>Last 30 days</option>
      </select>

      <p>Selected period: {period}</p>
    </div>
  );
}