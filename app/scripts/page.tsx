"use client";
import { Flex, Button, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";

const ScriptsPage = () => {
  const { status, data: session } = useSession();
  const [copyStatus, setCopyStatus] = useState<number | null>(null);

  const scripts = [
    {
      title: "Consents and Medical Records (Free)",
      message: `Hi! This is ${session?.user.firstName} reaching out to you from Brain Health USA 
Please fill out this form if you agree to give us consent to share your medical records and information. Thank you!`,
      link: "https://brainhealthusa.com/authorization-to-release-information/",
    },
    {
      title: "Consents and Medical Records (Paid)",
      message: `Hi! This is ${session?.user.firstName} reaching out to you from Brain Health USA 
Please fill out this form to request your medical records. Thank you!`,
      link: "https://brainhealthusa.com/medical-records/",
    },
    {
      title: "New Patients",
      message: `Hi! This is ${session?.user.firstName} reaching out to you from Brain Health USA
To continue with the enrollment process, kindly fill out the new patient intake form (for adults) by clicking the following link:`,
      link: "https://brainhealthusa.com/intake",
    },
    {
      title: "Minor Intake Form (up to 17)",
      message: `Hi! This is ${session?.user.firstName} reaching out to you from Brain Health USA
To continue with the enrollment process, kindly fill out the new patient intake form (minors) by clicking the following link:`,
      link: "https://brainhealthusa.com/minor-intake",
    },
  ];

  // Function to handle copying the script message
  const handleCopyMessage = async (message: string, index: number) => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyStatus(index); // Set the copyStatus to the index of the copied script
    } catch (error) {
      setCopyStatus(null);
    }
    // Reset the status after 2 seconds
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold mb-6">Scripts</h2>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {scripts.map((script, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-3">{script.title}</h3>
            <p className="text-gray-700 mb-2 whitespace-pre-wrap">
              {script.message}
            </p>
            {script.link && (
              <Link
                href={script.link}
                passHref
                target="_blank"
                className="text-blue-600 underline"
              >
                {script.link}
              </Link>
            )}
            {/* Copy button */}
            <Flex mt="4" gap="3">
              <Button
                variant="ghost"
                onClick={() => handleCopyMessage(script.message, index)}
              >
                <FaCopy size="25" />
              </Button>
              {copyStatus === index && (
                <Text color="green">Message copied!</Text>
              )}
            </Flex>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptsPage;
