import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/components/form/IssueForm"), {
  ssr: false,
  loading: () => <div>loading</div>,
});

const CreateIssuePage = () => {
  return (
    <div className="px-48">
      <IssueForm />
    </div>
  );
};

export default CreateIssuePage;
