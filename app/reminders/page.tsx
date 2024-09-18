"use client";

import Reminders from "./Reminders";
import AddReminderButton from "./AddReminderButton";
import { useState } from "react";

const ReminderPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReminderAdded = () => {
    // Trigger re-fetch by updating the key
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="flex justify-center mb-6">
        <AddReminderButton onReminderAdded={handleReminderAdded} />
      </div>
      <div className="w-full">
        <Reminders key={refreshKey} />
      </div>
    </div>
  );
};

export default ReminderPage;
