"use client";

import { Provider } from "@prisma/client";
import { Card, Flex, Select, Text, Button, Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

interface Props {
  providers: Provider[];
}

const ProviderSelector = ({ providers }: Props) => {
  const session = useSession();

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [copyStatus, setCopyStatus] = useState<string | null>(null); // Change to null for conditional rendering

  const handleProviderChange = (value: string) => {
    const provider = providers.find((p) => p.id === parseInt(value));
    setSelectedProvider(provider || null);
    console.log(provider);
  };

  const handleCopyMessage = () => {
    if (!selectedProvider || !month || !day || !time) {
      setCopyStatus("Please fill in all the fields.");
      return;
    }

    const message = `Hi! This is ${
      session.data?.user.firstName || "Agent's name"
    } reaching out to you from Brain Health USA. Your next appointment is set with ${
      selectedProvider?.title || "[Provider's title]"
    } ${selectedProvider?.firstName || ""} ${
      selectedProvider?.lastName || ""
    } for ${month}/${day} at ${time}. Please follow the following link to connect with your provider: ${
      selectedProvider?.link ? selectedProvider.link : "[Provider's link]"
    }. If you need to change or cancel your appointment, please inform us at least 24hrs in advance. A $35 fee may apply to no-shows.`;

    // Copy message to clipboard
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setCopyStatus("Message copied!"); // Set success message
        setTimeout(() => setCopyStatus(null), 2000); // Clear message after 2 seconds
      })
      .catch(() => {
        setCopyStatus("Failed to copy message."); // Set failure message
      });
  };

  return (
    <Flex justify="between">
      <Flex direction="column" gap="8">
        <Select.Root onValueChange={handleProviderChange}>
          <Select.Trigger placeholder="Choose provider" />
          <Select.Content>
            {providers.map((provider) => (
              <Select.Item key={provider.id} value={provider.id.toString()}>
                {provider.firstName + " " + provider.lastName}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
        <div className="mt-4">
          <label>
            Month:
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
              className="ml-2 w-16"
            />
          </label>
          <label className="ml-4">
            Day:
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
              className="ml-2 w-16"
            />
          </label>
        </div>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="Select time"
        />
      </Flex>

      {selectedProvider && (
        <Card className="max-w-md">
          <Text as="p">
            Hi! This is {session.data?.user.firstName || "Agent's name"}{" "}
            reaching out to you from Brain Health USA. Your next appointment is
            set with{" "}
            {`${selectedProvider?.title || "[Provider's name]"} ${
              selectedProvider?.firstName || ""
            } ${selectedProvider?.lastName || ""}`}{" "}
            for {month ? month : ""}/{day ? day : ""} at {time ? time : ""}.
            Please follow the following link to connect with your provider:{" "}
            {selectedProvider?.link ? selectedProvider.link : ""}. If you need
            to change or cancel your appointment, please inform us at least 24
            hours in advance. A $35 fee may apply to no-shows.
          </Text>

          <Flex mt="4" gap="3">
            <Button variant="ghost" onClick={handleCopyMessage}>
              <FaCopy size="25" />
            </Button>
            {copyStatus && (
              <Text color={copyStatus.includes("copied") ? "green" : "red"}>
                {copyStatus}
              </Text>
            )}
          </Flex>
        </Card>
      )}
    </Flex>
  );
};

export default ProviderSelector;
