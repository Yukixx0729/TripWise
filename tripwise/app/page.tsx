import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/plan" : "/new-user";
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-[650px] mx-auto">
        <h1 className="text-6xl mb-4 font-mono">
          Your Ultimate Trip Planning Companion.
        </h1>
        <p className="text-2xl text-black/60 mb-4">
          Discover the perfect way to plan your next adventure with ease. Our
          app simplifies trip planning like never before.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl text-white">
              Get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
