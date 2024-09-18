import React from "react";
import { Skeleton } from "../components";

const LoadingRemindersPage = () => {
  const reminders = [1, 2, 3, 4, 5, 6];
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="flex justify-center mb-6">
        <Skeleton width="118" height="32" />
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {reminders.map((reminder) => (
            <Skeleton key={reminder} width="313px" height="256px" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingRemindersPage;
