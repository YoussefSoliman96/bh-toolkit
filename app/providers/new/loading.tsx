import { Skeleton } from "@/app/components";
import { Box, Flex, Card } from "@radix-ui/themes";

const LoadingNewProviderPage = () => {
  return (
    <Box maxWidth="xl">
      <Skeleton />
      <Flex gap="9" my="2">
        <Skeleton width="7rem" />
        <Skeleton width="7rem" />
      </Flex>
      <Flex gap="9" my="2">
        <Skeleton width="2rem" />
        <Skeleton width="2rem" />
      </Flex>
      <Card mt="4" className="max-w-md">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default LoadingNewProviderPage;
