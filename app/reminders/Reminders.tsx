import Image from "next/image";
import prisma from "@/prisma/client";

const Reminders = async () => {
  const reminders = await prisma.reminder.findMany();
  const backgroundImages = [
    "/reminder1.jpg",
    "/reminder2.jpg",
    "/reminder3.jpg",
  ];

  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {reminders.map((reminder) => (
        <div
          key={reminder.id}
          className="relative w-full h-64 rounded-lg overflow-hidden"
        >
          <Image
            src={getRandomBackground()}
            alt="Reminder"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="flex-grow flex items-center justify-center">
              <p className="text-lg font-semibold bg-opacity-60 p-3 rounded-md w-3/4 md:w-1/2 text-center">
                {reminder.description}
              </p>
            </div>
            <div className="text-center bg-opacity-60 p-2 rounded-md">
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
