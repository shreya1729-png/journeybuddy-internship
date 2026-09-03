"use client";

import { useState } from "react";

export default function Preferences() {
  const [notifications, setNotifications] = useState(true);

  return (
    <section>
      <h2>Preferences</h2>

      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />

        Enable notifications
      </label>

      <p>
        Notifications: {notifications ? "Enabled" : "Disabled"}
      </p>
    </section>
  );
}