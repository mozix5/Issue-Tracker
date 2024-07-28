import dynamic from "next/dynamic";
import IssueFormLoading from "./loading";

const IssueForm = dynamic(() => import("@/app/components/form/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

const CreateIssuePage = () => {
  return (
    <div className="px-48">
      <IssueForm />
    </div>
  );
};

export default CreateIssuePage;
