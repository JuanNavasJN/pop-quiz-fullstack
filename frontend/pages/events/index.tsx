import { ReactElement, useContext, useEffect } from "react";
import PageContainer from "../../src/components/container/PageContainer";
import { AuthContext } from "../../src/contexts/AuthContext";
import { useRouter } from "next/router";
import Events from "../../src/components/events";

// components
import FullLayout from "../../src/layouts/full/FullLayout";

export default function EventsPage() {
  const { user, isLoading } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !user) push("/");
  }, [isLoading, user]);

  return (
    <PageContainer title="Events" description="this is Events">
      <Events />
    </PageContainer>
  );
}

EventsPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
