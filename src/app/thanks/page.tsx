import Image from "next/image";

export default function Thanks() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-around gap-4 px-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/coffee-bag.png"
          alt="Resend Coffee Club Coffee Bag"
          width={680}
          height={880}
          className="object-contain opacity-50"
        />
      </div>
      <div className="z-10 flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col items-center text-center gap-3">
          <h1 className="text-balance font-sans text-5xl font-semibold opacity-90 effect-font-gradient-">
            Thank you for your purchase!
          </h1>
          <p className="max-w-prose text-balance text-lg text-white opacity-70">
            Your order is on it's way!
          </p>
        </div>
      </div>
    </div>
  );
}
