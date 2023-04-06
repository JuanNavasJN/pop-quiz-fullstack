import { ReactElement, useContext, useEffect } from "react";
import PageContainer from "../../src/components/container/PageContainer";
import { AuthContext } from "../../src/contexts/AuthContext";
import { useRouter } from "next/router";
import Event from "../../src/components/events/Event";

// components
import FullLayout from "../../src/layouts/full/FullLayout";

export default function EventPage() {
  const { user, isLoading } = useContext(AuthContext);
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading && !user) push("/");
  }, [isLoading, user]);

  return (
    <PageContainer title="Event" description="this is Event">
      <Event />
    </PageContainer>
  );
}

EventPage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
