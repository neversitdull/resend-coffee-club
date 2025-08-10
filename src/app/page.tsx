import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  async function subscribe(formData: FormData) {
    "use server";

    const email = formData.get("email");

    console.log(email);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-balance text-center font-bold text-6xl opacity-90">
        Resend Coffee Club
      </h1>
      <p className="max-w-prose text-balance text-center font-medium text-lg opacity-70">
        Specialty coffee, hand-selected by the Resend team. Delivered straight
        to your inbox every Wednesday.
      </p>
      <form className="mt-10 flex gap-2" action={subscribe}>
        <Input placeholder="Email" name="email" />
        <Button>Subscribe</Button>
      </form>
    </div>
  );
}
