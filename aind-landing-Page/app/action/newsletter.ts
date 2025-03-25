"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";

// Initialize Mailchimp with your API key and server prefix
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us1"
});

interface MailchimpError extends Error {
  response?: {
    body: {
      title: string;
      detail: string;
    };
  };
}

export async function subscribeToNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return {
      success: false,
      message: "Email is required",
    };
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
    console.log("Success! You are now subscribed.");
    return {
      success: true,
      message: "Success! You are now subscribed.",
    };
  } catch (error: unknown) {
    const mailchimpError = error as MailchimpError;
    if (mailchimpError.response?.body) {
      const { title, detail } = mailchimpError.response.body;

      if (title && title.includes("Member Exists")) {
        return {
          success: false,
          message: "You are already subscribed to our newsletter.",
        };
      }

      return {
        success: false,
        message:
          detail || title || "An error occurred with the subscription service.",
      };
    }

    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
