import { prisma } from "@/Utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();

  if (user) {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id as string,
      },
    });
    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user?.emailAddresses[0].emailAddress as string,
        },
      });
    }
  }

  redirect("/plan");
};

const NewUser = async () => {
  await createNewUser();

  return <div>...loading</div>;
};

export default NewUser;
