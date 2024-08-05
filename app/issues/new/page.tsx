import dynamic from "next/dynamic";
import IssueFormLoading from "./loading";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";

const IssueForm = dynamic(() => import("@/app/components/form/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

const CreateIssuePage = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    return (
      <div className="px-6 xl:px-48 md:px-16">
        <p>You must be signed in to create an issue.</p>
      </div>
    );
  }

  return (
    <div className="px-6 xl:px-48 md:px-16">
      <IssueForm />
    </div>
  );
};

export default CreateIssuePage;
