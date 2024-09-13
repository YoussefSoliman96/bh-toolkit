"use client";

import { Provider } from "@prisma/client";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { FaCopy } from "react-icons/fa";

interface Props {
  providers: Provider[];
}

const ProviderSelector = ({ providers }: Props) => {
  const session = useSession();

  const today = new Date();
  const initialDate = today.toISOString().split("T")[0];

  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    null
  );
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState("");
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const providerId = queryParams.get("providerId");

    if (providerId) {
      const provider = providers.find((p) => p.id === parseInt(providerId));
      setSelectedProvider(provider || null);
    }
  }, [providers]);

  const handleProviderChange = (provider: any) => {
    const selected = providers.find((p) => p.id === provider.value);
    setSelectedProvider(selected || null);
  };

  const handleCopyMessage = () => {
    if (!selectedProvider || !date || !time) {
      setCopyStatus("Please fill in all the fields.");
      return;
    }

    const formattedTime = convertTo12HourFormat(time);
    const formattedDate = new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const message = `Hi! This is ${
      session.data?.user.firstName || "Agent's name"
    } reaching out to you from Brain Health USA. Your next appointment is set with ${
      selectedProvider?.title || "[Provider's title]"
    } ${selectedProvider?.firstName || ""} ${
      selectedProvider?.lastName || ""
    } for ${formattedDate} at ${formattedTime}. Please follow the following link to connect with your provider: ${
      selectedProvider?.link ? selectedProvider.link : "[Provider's link]"
    }. If you need to change or cancel your appointment, please inform us at least 24hrs in advance. A $35 fee may apply to no-shows.`;

    navigator.clipboard
      .writeText(message)
      .then(() => {
        setCopyStatus("Message copied!");
        setTimeout(() => setCopyStatus(null), 2000);
      })
      .catch(() => {
        setCopyStatus("Failed to copy message.");
      });
  };

  const providerOptions = providers.map((provider) => ({
    value: provider.id,
    label: `${provider.firstName} ${provider.lastName}`,
  }));

  return (
    <Flex justify="between">
      <Flex direction="column" gap="8">
        <Select
          options={providerOptions}
          onChange={handleProviderChange}
          value={
            selectedProvider
              ? {
                  value: selectedProvider.id,
                  label: `${selectedProvider.firstName} ${selectedProvider.lastName}`,
                }
              : null
          }
          placeholder="Choose provider"
          className="text-black"
        />

        <div className="mt-4">
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="ml-2 w-44"
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
            for{" "}
            {date
              ? new Date(date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}{" "}
            at {time ? convertTo12HourFormat(time) : ""}. Please follow the
            following link to connect with your provider:{" "}
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

const convertTo12HourFormat = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12;
  return `${adjustedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
};
