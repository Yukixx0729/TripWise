import { getUserByClientID } from "@/Utils/auth";
import { prisma } from "@/Utils/db";
import Editor from "@/components/Editor";
import Form from "@/components/Editor";

const getEntry = async (id: string) => {
  const user = await getUserByClientID();
  const entry = await prisma.planEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      plan: true,
    },
  });
  return entry;
};

const PlanContent = async ({ params }) => {
  const entry = await getEntry(params.id);
  return (
    <div className="p-5 w-full flex justify-center flex-col align-center">
      <Editor entry={entry} />
    </div>
  );
};

export default PlanContent;
