import { ReceiptEmailTemplate } from "@/components/receipt-template";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendReceiptEmail() {
  const email = "neversitdull@gmail.com";
  const pdfBuffer = Buffer.from("This is your coffee receipt!", "utf-8");

  return resend.emails.send({
    from: "Josh from CC <hi@mail.resend.coffee>",
    to: [email],
    subject: "Your coffee receipt",
    react: ReceiptEmailTemplate(),
    attachments: [
      {
        filename: "receipt.pdf",
        content: pdfBuffer.toString("base64"),
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
