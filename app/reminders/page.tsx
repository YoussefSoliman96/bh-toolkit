import React from "react";
import AddReminderButton from "./AddReminderButton";
import Reminders from "./Reminders";

const RemindersPage = () => {
  return (
    <div>
      <AddReminderButton />
      <Reminders />
    </div>
  );
};

export default RemindersPage;
