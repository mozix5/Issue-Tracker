import dynamic from "next/dynamic";
import IssueFormLoading from "./loading";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";
import Toast from "@/app/components/Toast";

const IssueForm = dynamic(() => import("@/app/components/form/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

const CreateIssuePage = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return <Toast />;
  }

  return (
    <div className="px-6 xl:px-48 md:px-16">
      <IssueForm />
    </div>
  );
};

export default CreateIssuePage;
