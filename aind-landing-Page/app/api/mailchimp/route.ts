import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

interface MailchimpError extends Error {
  response?: {
    body: {
      title: string;
      detail: string;
      status: number;
    };
  };
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Add member to list
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: "subscribed",
      }
    );

    return NextResponse.json(
      { message: "Success! You are now subscribed." },
      { status: 201 }
    );
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;
    console.log(mailchimpError);

    if (mailchimpError.response?.body) {
      const { title, detail, status } = mailchimpError.response.body;

      if (status === 400 && title.includes("Member Exists")) {
        return NextResponse.json(
          { message: "You are already subscribed to our newsletter." },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: detail || title },
        { status: status || 500 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}