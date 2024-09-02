"use client";
import { Button, DropdownMenu, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export enum Title {
  NP = "NP",
  MD = "MD",
  DNP = "DNP",
  DO = "DO",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

// Interface for creating a provider
export interface CreateProviderForm {
  firstName: string;
  lastName: string;
  title: Title;
  gender: Gender;
  evaluation: string; // Expected in minutes, e.g., 30
  followUp: string; // Expected in minutes, e.g., 15
  languages: string; // Array of languages the provider speaks
  ageRange: string; // Example: "18-65"
  workingHours: string; // Example: "08:00-16:00"
}

const NewProviderPage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<CreateProviderForm>();

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/providers", data);
        router.push("/providers");
      })}
    >
      <TextField.Root placeholder="First Name" {...register("firstName")} />
      <TextField.Root placeholder="Last Name" {...register("lastName")} />
      <div>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Select.Root size="2" onValueChange={field.onChange}>
              <Select.Trigger placeholder="Title" />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Title</Select.Label>
                  <Select.Item value="NP">NP</Select.Item>
                  <Select.Item value="MD">MD</Select.Item>
                  <Select.Item value="DNP">DNP</Select.Item>
                  <Select.Item value="DO">DO</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          )}
        ></Controller>
      </div>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Select.Root size="2" onValueChange={field.onChange}>
            <Select.Trigger placeholder="Gender" />
            <Select.Content>
              <Select.Group>
                <Select.Label>Gender</Select.Label>
                <Select.Item value="MALE">Male</Select.Item>
                <Select.Item value="FEMALE">Female</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        )}
      ></Controller>
      <TextField.Root placeholder="Evaluation" {...register("evaluation")} />
      <TextField.Root placeholder="Follow Up" {...register("followUp")} />
      <TextField.Root placeholder="Languages" {...register("languages")} />
      <TextField.Root placeholder="Age range" {...register("ageRange")} />
      <TextField.Root
        placeholder="Working hours"
        {...register("workingHours")}
      />
      <Button>Submit</Button>
    </form>
  );
};

export default NewProviderPage;
