import dynamic from "next/dynamic";
import IssueFormLoading from "./loading";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/authOptions";
import Toast from "@/app/components/Toast";
import { BsBugFill } from "react-icons/bs";
import { Sparkles, ListChecks, Zap } from "lucide-react";
import NoScroll from "@/app/components/NoScroll";

const IssueForm = dynamic(() => import("@/app/components/form/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormLoading />,
});

const CreateIssuePage = async () => {
  const session = await getServerSession(AuthOptions);

  if (!session) return <Toast />;

  return (
    <NoScroll>
    <div className="px-4 md:px-8 max-w-7xl mx-auto h-[calc(100vh-4rem)] overflow-hidden py-6">
      <div className="flex flex-col lg:flex-row gap-8 items-start h-full">

        <div className="lg:w-72 shrink-0 flex flex-col gap-6 lg:sticky lg:top-24">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary">
              <BsBugFill className="text-2xl" />
              <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40">New Ticket</span>
            </div>
            <h1 className="text-3xl font-black text-base-content leading-tight tracking-tight">
              Report an Issue
            </h1>
            <p className="text-sm text-base-content/50 font-medium leading-relaxed">
              Describe the problem clearly so your team can triage and resolve it fast.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              { icon: <ListChecks size={14} />, label: "Clear title", desc: "One sentence that describes the problem" },
              { icon: <Sparkles size={14} />, label: "Use AI Triage", desc: "Let AI suggest the right priority level" },
              { icon: <Zap size={14} />, label: "Add detail", desc: "Steps to reproduce, expected vs actual" },
            ].map(({ icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3 p-3 rounded-2xl bg-base-200">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">{icon}</div>
                <div>
                  <p className="text-xs font-black text-base-content">{label}</p>
                  <p className="text-[11px] text-base-content/50 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-base-200 rounded-3xl shadow-xl p-6 min-w-0 h-full overflow-y-auto">
          <IssueForm />
        </div>

      </div>
    </div>
    </NoScroll>
  );
};

export default CreateIssuePage;
