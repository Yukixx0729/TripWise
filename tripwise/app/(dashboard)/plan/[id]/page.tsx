import { getSingleEntry } from "@/Utils/api";
import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import Editor from "@/components/Editor";
import Form from "@/components/Editor";

type PlanContentProps = {
  params: {
    id: string;
  };
};
const PlanContent: React.FC<PlanContentProps> = ({ params }) => {
  return (
    <div className="p-5 w-full flex justify-center flex-col align-center">
      <Editor id={params.id} />
    </div>
  );
};

export default PlanContent;
