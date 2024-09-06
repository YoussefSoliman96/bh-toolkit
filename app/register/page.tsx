"use client";
import { useState } from "react";
import * as Label from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { Button } from "@radix-ui/themes";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    title: "",
    gender: "MALE",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log(formData);
    // Call API to submit data
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <Label.Root
              className="block text-sm font-medium text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </Label.Root>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <Label.Root
              className="block text-sm font-medium text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </Label.Root>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Username */}
          <div>
            <Label.Root
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </Label.Root>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label.Root
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </Label.Root>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Title */}
          <div>
            <Label.Root
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </Label.Root>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <Label.Root
              className="block text-sm font-medium text-gray-700"
              htmlFor="gender"
            >
              Gender
            </Label.Root>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
