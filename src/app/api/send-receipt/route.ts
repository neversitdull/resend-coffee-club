import { ReceiptEmailTemplate } from "@/components/receipt-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendReceiptEmail() {
  const email = "neversitdull@gmail.com";

  return resend.emails.send({
    from: "Josh from CC <hi@mail.resend.coffee>",
    to: [email],
    subject: "Your coffee receipt",
    react: ReceiptEmailTemplate(),
    attachments: [
      {
        path: "https://jqdnns81kv8dbrzq.public.blob.vercel-storage.com/receipt.pdf",
        filename: "receipt.pdf",
      },
    ],
  });
}

export async function GET(request: Request) {
  try {
    await sendReceiptEmail();
    return NextResponse.redirect(new URL("/thanks", request.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
