"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { reminderSchema } from "@/app/validationSchemas";
import { Reminder } from "@prisma/client";
import { useEffect, useState } from "react";
import axios from "axios";

type ReminderFormValues = z.infer<typeof reminderSchema>;

const fetchReminders = async () => {
  const response = await axios.get("/api/reminders");
  return response.data;
};

const createReminder = async (data: ReminderFormValues) => {
  const response = await axios.post("/api/reminders", data);
  return response.data;
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
  });

  useEffect(() => {
    fetchReminders().then(setReminders);
  }, []);

  const onSubmit: SubmitHandler<ReminderFormValues> = async (data) => {
    await createReminder(data);
    const updatedReminders = await fetchReminders();
    setReminders(updatedReminders);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reminders</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            className={`mt-1 block w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Creator
          </label>
          <input
            type="text"
            {...register("creator")}
            className={`mt-1 block w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.creator ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.creator && (
            <p className="text-red-500 text-sm">{errors.creator.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          Add Reminder
        </button>
      </form>
      <div>
        <h2 className="text-xl font-bold mb-4">Existing Reminders</h2>
        <ul className="list-disc pl-5">
          {reminders.map((reminder) => (
            <li key={reminder.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{reminder.description}</span>
                <span className="text-gray-500">by {reminder.creator}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
