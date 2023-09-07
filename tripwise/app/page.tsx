import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? "/plan" : "/new-user";
  return (
    <div className="w-screen h-screen flex justify-center items-center  bg-[url('https://images.unsplash.com/photo-1489861408921-2f6a1e6c1155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')]">
      <div className="w-full max-w-[700px] mx-auto text-red-100">
        <h1 className="text-6xl mb-4 font-mono italic">
          Your Best Trip Planning Companion
        </h1>
        <p className="text-2xl mb-4 text-orange-200 ">
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
