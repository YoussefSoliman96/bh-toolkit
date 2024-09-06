import { Badge, Flex } from "@radix-ui/themes";
import CopyButton from "../list/CopyButton";

const ProviderLink = ({ doxyLink }: { doxyLink: string }) => {
  return (
    <Flex gap="3" className="items-center">
      <Badge color="violet" size="2">
        {doxyLink}
      </Badge>
      <CopyButton doxyLink={doxyLink} />
    </Flex>
  );
};

export default ProviderLink;
