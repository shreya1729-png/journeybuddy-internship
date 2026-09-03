"use client";

import { useState } from "react";

export default function LiveStatus() {
  const [online, setOnline] = useState(true);

  return (
    <section>
      <h2>System Status</h2>

      <p>{online ? "Online" : "Offline"}</p>

      <button onClick={() => setOnline(!online)}>
        Toggle Status
      </button>
    </section>
  );
}