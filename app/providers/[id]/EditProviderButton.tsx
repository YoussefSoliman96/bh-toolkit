import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditProviderButton = async ({ providerId }: { providerId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/providers/edit/${providerId}`}>Edit Provider</Link>
    </Button>
  );
};

export default EditProviderButton;
