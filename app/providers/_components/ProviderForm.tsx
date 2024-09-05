"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { providerSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Provider } from "@prisma/client";
import { Button, Callout, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ProviderFormData = z.infer<typeof providerSchema>;

interface Props {
  provider?: Provider;
}

const ProviderForm = ({ provider }: { provider?: Provider }) => {
  const currentPath = usePathname();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProviderFormData>({
    resolver: zodResolver(providerSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (provider) await axios.patch("/api/providers/" + provider.id, data);
      else await axios.post("/api/providers", data);
      router.push("/providers/list");
      router.refresh();
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
        <TextField.Root
          placeholder="First Name"
          defaultValue={provider?.firstName}
          {...register("firstName")}
        />
        <ErrorMessage>{errors.firstName?.message}</ErrorMessage>

        <TextField.Root
          placeholder="Last Name"
          defaultValue={provider?.lastName}
          {...register("lastName")}
        />
        <ErrorMessage>{errors.lastName?.message}</ErrorMessage>
        {currentPath.includes("new") && (
          <>
            <div>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    size="2"
                    defaultValue={provider?.title}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger placeholder="Title" />
                    <Select.Content>
                      <Select.Group>
                        <Select.Label>Title</Select.Label>
                        <Select.Item value="NP">NP</Select.Item>
                        <Select.Item value="MD">MD</Select.Item>
                        <Select.Item value="DNP">DNP</Select.Item>
                        <Select.Item value="DO">DO</Select.Item>
                        <Select.Item value="DO">AMFT</Select.Item>
                        <Select.Item value="DO">APCC</Select.Item>
                        <Select.Item value="DO">LCSW</Select.Item>
                        <Select.Item value="DO">PhD</Select.Item>
                        <Select.Item value="DO">PsyD</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                )}
              ></Controller>
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </div>
            <div>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select.Root
                    size="2"
                    defaultValue={provider?.role}
                    onValueChange={field.onChange}
                  >
                    <Select.Trigger placeholder="Role" />
                    <Select.Content>
                      <Select.Group>
                        <Select.Label>Title</Select.Label>
                        <Select.Item value="PSYCHIATRIST">
                          Psychiatrist
                        </Select.Item>
                        <Select.Item value="THERAPIST">Therapist</Select.Item>
                        <Select.Item value="RESIDENCY">Residency</Select.Item>
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
                <Select.Root
                  size="2"
                  defaultValue={provider?.gender}
                  onValueChange={field.onChange}
                >
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
          </>
        )}

        <TextField.Root
          defaultValue={provider?.evaluation}
          placeholder="Evaluation"
          {...register("evaluation")}
        />
        <ErrorMessage>{errors.evaluation?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={provider?.followUp}
          placeholder="Follow Up"
          {...register("followUp")}
        />
        <ErrorMessage>{errors.followUp?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={provider?.languages}
          placeholder="Languages"
          {...register("languages")}
        />
        <ErrorMessage>{errors.languages?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={provider?.ageRange}
          placeholder="Age range"
          {...register("ageRange")}
        />
        <ErrorMessage>{errors.ageRange?.message}</ErrorMessage>

        <TextField.Root
          defaultValue={provider?.workingHours}
          placeholder="Working hours"
          {...register("workingHours")}
        />
        <ErrorMessage>{errors.workingHours?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {provider ? "Edit" : "Submit"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default ProviderForm;
