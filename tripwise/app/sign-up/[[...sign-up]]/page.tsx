import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp redirectUrl="/new-user" afterSignInUrl="/new-user" />;
}
