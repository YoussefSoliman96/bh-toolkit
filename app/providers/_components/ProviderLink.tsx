import { Badge, Flex } from "@radix-ui/themes";
import CopyButton from "../list/CopyButton";
import { Responsive } from "@radix-ui/themes/props";

interface Props {
  doxyLink: string;
  size: Responsive<"3" | "1" | "2">;
}

const ProviderLink = ({ doxyLink, size }: Props) => {
  return (
    <Flex gap="3" className="items-center">
      <Badge color="violet" size={size}>
        {doxyLink}
      </Badge>
      <CopyButton doxyLink={doxyLink} />
    </Flex>
  );
};

export default ProviderLink;
