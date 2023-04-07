import { ReactElement, useContext, useEffect } from "react";
import { Box } from "@mui/material";
import PageContainer from "../../src/components/container/PageContainer";
import { AuthContext } from "../../src/contexts/AuthContext";
import { useRouter } from "next/router";
import MyProfile from "../../src/components/my-profile";

// components
import FullLayout from "../../src/layouts/full/FullLayout";

export default function MyProfilePage() {
  const { user, isLoading } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !user) push("/");
  }, [isLoading, user]);

  return (
    <PageContainer title="My Profile" description="this is MyProfilePage">
      <Box>
        <MyProfile />
      </Box>
    </PageContainer>
  );
}

MyProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
