"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import src from "react-select";
import style from "styled-jsx/style";

const Reminders = () => {
  const [reminders, setReminders] = useState<any[]>([]);
  // const backgroundImages = [
  //   "/reminder1.jpg",
  //   "/reminder2.jpg",
  //   "/reminder3.jpg",
  // ];

  // const getRandomBackground = () => {
  //   const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  //   return backgroundImages[randomIndex];
  // };

  const fetchReminders = async () => {
    try {
      const response = await axios.get("/api/reminders");
      setReminders(response.data);
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="relative w-full h-64 rounded-lg overflow-hidden"
        >
          <Image
            src="/reminder1.jpg"
            alt="Reminder"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="absolute inset-0"
            priority
          />
          {/* Add overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex-grow flex items-center justify-center">
              <p className="text-lg text-white p-3 rounded-md w-3/4 md:w-1/2 text-center">
                {reminder.description}
              </p>
            </div>
            <div className="text-center p-2 rounded-md text-white">
              <p className="text-sm opacity-80">{reminder.creator}</p>
              <p className="text-xs opacity-60">
                {new Date(reminder.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reminders;
