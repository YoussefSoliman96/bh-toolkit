import { Metadata } from "next";
import Reminders from "./reminders/Reminders";
import AddReminderButton from "./reminders/AddReminderButton";
import { Text } from "@radix-ui/themes";
import ReminderPage from "./reminders/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Text className="text-4xl font-bold text-center mb-8">Reminders</Text>
      <div className="w-full ">
        <ReminderPage />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Brain Health - Dashboard",
};
