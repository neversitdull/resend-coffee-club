import { ScheduledEmailTemplate } from "@/components/scheduled-template";
import { Button } from "@/components/ui/button";
import { CCLogo } from "@/components/ui/cc-logo";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { WelcomeEmailTemplate } from "@/components/welcome-template";
import Image from "next/image";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default function Home() {
  async function subscribe(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;

    if (!email) {
      return;
    }

    const { data: welcomeData, error: welcomeError } = await resend.emails.send(
      {
        from: "Josh from CC <hi@mail.resend.coffee>",
        to: [email],
        subject: "Welcome to the Resend Coffee Club",
        react: WelcomeEmailTemplate(),
      }
    );

    const { data: scheduledData, error: scheduledError } =
      await resend.emails.send({
        from: "Josh from CC <hi@mail.resend.coffee>",
        to: [email],
        subject: "Your first coffee is on its way!",
        react: ScheduledEmailTemplate(),
        scheduledAt: "in 1 min",
      });

    if (welcomeError || scheduledError) {
      console.error("Email errors:", { welcomeError, scheduledError });
    } else {
      console.log("Emails sent:", { welcomeData, scheduledData });
    }
  }

  return (
    <div className="relative flex h-screen flex-col items-center justify-around gap-4 px-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/coffee-bag.png"
          alt="Resend Coffee Club Coffee Bag"
          width={680}
          height={880}
          className="object-contain opacity-30"
          priority
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-6 text-center">
        <div className="py-20 effect-font-gradient">
          <CCLogo />
        </div>
        <h1 className="text-balance font-display text-7xl font-semibold opacity-90 effect-font-gradient">
          Resend Coffee Club
        </h1>
        <p className="max-w-prose text-balance text-lg text-white opacity-70">
          Specialty coffee, hand-selected by the Resend team. Delivered straight
          to your inbox every Wednesday.
        </p>
        <form className="mt-8 flex flex-col gap-4 w-sm" action={subscribe}>
          <Input
            placeholder="Email"
            name="email"
            className="h-12 rounded-xl text-white border border-white/10 backdrop-blur-[25px] bg-gradient-to-r from-white/5 to-white/10 focus-visible:ring-1 focus-visible:ring-white/20"
          />
          <Button className="h-12 px-5 rounded-2xl text-white font-semibold border border-white/10 backdrop-blur-[25px] bg-gradient-to-r from-white/5 to-white/10 hover:bg-white/90 hover:text-black focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:bg-white/90 focus-visible:text-black transition-all duration-200 disabled:opacity-30">
            Subscribe
          </Button>
        </form>
      </div>

      <Logo className="relative z-10 text-white opacity-80" />
    </div>
  );
}
