import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";

const LoadingProviderDetailPage = () => {
  return (
    <Box maxWidth="xl">
      <Skeleton />
      <Flex gap="9" my="2">
        <Skeleton width="5rem" />
        <Skeleton width="2rem" />
      </Flex>
      <Card mt="4" className="max-w-md">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingProviderDetailPage;
