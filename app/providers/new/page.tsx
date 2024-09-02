"use client";
import { createProviderSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Callout,
  DropdownMenu,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ProviderForm = z.infer<typeof createProviderSchema>;

// export enum Title {
//   NP = "NP",
//   MD = "MD",
//   DNP = "DNP",
//   DO = "DO",
// }

// export enum Gender {
//   MALE = "MALE",
//   FEMALE = "FEMALE",
// }

// Interface for creating a provider
// export interface CreateProviderForm {
//   firstName: string;
//   lastName: string;
//   title: Title;
//   gender: Gender;
//   evaluation: string; // Expected in minutes, e.g., 30
//   followUp: string; // Expected in minutes, e.g., 15
//   languages: string; // Array of languages the provider speaks
//   ageRange: string; // Example: "18-65"
//   workingHours: string; // Example: "08:00-16:00"
// }

const NewProviderPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProviderForm>({
    resolver: zodResolver(createProviderSchema),
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/providers", data);
            router.push("/providers");
          } catch (error) {
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="First Name" {...register("firstName")} />
        {errors.firstName && (
          <Text color="red" as="p">
            {errors.firstName.message}
          </Text>
        )}
        <TextField.Root placeholder="Last Name" {...register("lastName")} />
        {errors.lastName && (
          <Text color="red" as="p">
            {errors.lastName.message}
          </Text>
        )}
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
          {errors.title && (
            <Text color="red" as="p">
              {errors.title.message}
            </Text>
          )}
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
        {errors.gender && (
          <Text color="red" as="p">
            {errors.gender.message}
          </Text>
        )}
        <TextField.Root placeholder="Evaluation" {...register("evaluation")} />
        {errors.evaluation && (
          <Text color="red" as="p">
            {errors.evaluation.message}
          </Text>
        )}
        <TextField.Root placeholder="Follow Up" {...register("followUp")} />
        {errors.followUp && (
          <Text color="red" as="p">
            {errors.followUp.message}
          </Text>
        )}
        <TextField.Root placeholder="Languages" {...register("languages")} />
        {errors.languages && (
          <Text color="red" as="p">
            {errors.languages.message}
          </Text>
        )}
        <TextField.Root placeholder="Age range" {...register("ageRange")} />
        {errors.ageRange && (
          <Text color="red" as="p">
            {errors.ageRange.message}
          </Text>
        )}
        <TextField.Root
          placeholder="Working hours"
          {...register("workingHours")}
        />
        {errors.workingHours && (
          <Text color="red" as="p">
            {errors.workingHours.message}
          </Text>
        )}
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default NewProviderPage;
