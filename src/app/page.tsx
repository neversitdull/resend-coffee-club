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
    <div className="flex flex-col md:flex-row h-screen items-center px-20">
      {/* Left Column - Content */}
      <div className="flex flex-1 flex-col items-start justify-between h-full gap-6 pr-10 py-20">
        <div className="effect-font-gradient mb-10">
          <CCLogo />
        </div>
        <div className="flex flex-col gap-6 py-10">
          <h1 className="text-balance text-left font-sans text-6xl font-semibold opacity-90 effect-font-gradient">
            Resend Coffee Club
          </h1>
          <p className="max-w-prose text-balance text-left text-lg text-white opacity-70">
            Specialty coffee, hand-selected by the Resend team. Delivered
            straight to your inbox every Wednesday.
          </p>
          <form className="flex gap-4 w-md mt-4" action={subscribe}>
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
        <div>
          <Logo className="text-white opacity-50 mt-auto" />
        </div>
      </div>

      {/* Right Column - Coffee Bag Image */}
      <div className="flex flex-1 items-center justify-center">
        <Image
          src="/coffee-bag.png"
          alt="Resend Coffee Club Coffee Bag"
          width={400}
          height={600}
          className="object-contain opacity-30"
          priority
        />
      </div>
    </div>
  );
}
