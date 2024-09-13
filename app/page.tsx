import { Metadata } from "next";
import Reminders from "./reminders/Reminders";
import AddReminderButton from "./reminders/AddReminderButton";

export default function Home() {
  return (
    <>
      <AddReminderButton />
      <Reminders />
    </>
  );
}

export const metadata: Metadata = {
  title: "Brain Health - Dashboard",
};
