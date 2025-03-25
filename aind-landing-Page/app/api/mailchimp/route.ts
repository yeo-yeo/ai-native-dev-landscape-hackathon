import type { NextApiRequest, NextApiResponse } from "next";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Add member to list
    await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID as string,
      {
        email_address: email,
        status: "subscribed",
      }
    );

    return res
      .status(201)
      .json({ message: "Success! You are now subscribed." });
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;
    console.log(mailchimpError);
    if (mailchimpError.response?.body) {
      const { title, detail, status } = mailchimpError.response.body;

      if (status === 400 && title.includes("Member Exists")) {
        return res
          .status(400)
          .json({ message: "You are already subscribed to our newsletter." });
      }

      return res.status(status).json({ message: detail || title });
    }

    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
}
