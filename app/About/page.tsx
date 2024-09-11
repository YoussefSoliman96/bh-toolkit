import prisma from "@/prisma/client";
import { Flex, Separator, Card, Text } from "@radix-ui/themes";

const About = async () => {
  const offices = await prisma.office.findMany();

  const contactDetails = {
    intakeNo: "213-567-4570 EXT: 89568",
    officeNo: "(877) 515-8113",
    faxNo: "877-538-2102",
    emails: ["info@brainhealthusa.com", "fax@brainhealthusa.com"],
  };
  return (
    <Flex direction="column" gap="6" className="p-4">
      <Text size="5" weight="bold">
        Our Office Locations
      </Text>
      <Separator />

      <Flex direction="column" gap="4">
        {offices.map((office, index) => (
          <Card key={index} className="p-4">
            <Text size="4" weight="medium">
              {office.name}
            </Text>
            <Text as="p">{office.address}</Text>
          </Card>
        ))}
      </Flex>

      <Separator className="mt-6" />

      <Text size="5" weight="bold">
        Contact info
      </Text>

      <Card className="p-4">
        <Text as="p">
          <strong>Intake No.:</strong> {contactDetails.intakeNo}
        </Text>
        <Text as="p">
          <strong>Office No.:</strong> {contactDetails.officeNo}
        </Text>
        <Text as="p">
          <strong>Fax No.:</strong> {contactDetails.faxNo}
        </Text>
        <Text as="p">
          <strong>Email:</strong>{" "}
          {contactDetails.emails.map((email, index) => (
            <span key={index}>
              <a href={`mailto:${email}`}>{email}</a>
              {index < contactDetails.emails.length - 1 && ", "}
            </span>
          ))}
        </Text>
      </Card>
    </Flex>
  );
};

export default About;
