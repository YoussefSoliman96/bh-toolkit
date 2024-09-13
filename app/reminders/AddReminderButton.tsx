"use client";

import { useSession } from "next-auth/react";
import { Dialog, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

interface ReminderForm {
  description: string;
}

interface AddReminderButtonProps {
  onReminderAdded: () => void;
}

const AddReminderButton: React.FC<AddReminderButtonProps> = ({
  onReminderAdded,
}) => {
  const { register, handleSubmit, reset } = useForm<ReminderForm>();
  const { data: session } = useSession();

  const onSubmit: SubmitHandler<ReminderForm> = async (data) => {
    const creatorName = `${session?.user?.firstName ?? ""} ${
      session?.user?.lastName ?? ""
    }`;

    try {
      await axios.post("/api/reminders", {
        ...data,
        creator: creatorName,
      });
      // Close the dialog and reset form fields after successful submission
      reset();
      onReminderAdded(); // Notify parent component
    } catch (error) {
      console.error("Failed to add reminder:", error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Add Reminder
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Add Reminder</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Write the reminder below
        </Dialog.Description>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <TextField.Root
                placeholder="Reminder"
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Save</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddReminderButton;
