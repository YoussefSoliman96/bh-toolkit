"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
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

const NewProviderPage = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProviderForm>({
    resolver: zodResolver(createProviderSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/providers", data);
      router.push("/providers");
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl ">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="First Name" {...register("firstName")} />
        <ErrorMessage>{errors.firstName?.message}</ErrorMessage>

        <TextField.Root placeholder="Last Name" {...register("lastName")} />
        <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
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
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
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
        <ErrorMessage>{errors.gender?.message}</ErrorMessage>

        <TextField.Root placeholder="Evaluation" {...register("evaluation")} />
        <ErrorMessage>{errors.evaluation?.message}</ErrorMessage>

        <TextField.Root placeholder="Follow Up" {...register("followUp")} />
        <ErrorMessage>{errors.followUp?.message}</ErrorMessage>

        <TextField.Root placeholder="Languages" {...register("languages")} />
        <ErrorMessage>{errors.languages?.message}</ErrorMessage>

        <TextField.Root placeholder="Age range" {...register("ageRange")} />
        <ErrorMessage>{errors.ageRange?.message}</ErrorMessage>

        <TextField.Root
          placeholder="Working hours"
          {...register("workingHours")}
        />
        <ErrorMessage>{errors.workingHours?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          Submit
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewProviderPage;
