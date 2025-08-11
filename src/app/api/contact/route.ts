// app/api/contact/route.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, website } = await req.json();

    if (website) {
      return new Response("Spam detected", { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // you can change to your verified domain later
      to: "sergeykuzmin495@gmail.com",
      subject: subject || `New message from ${name}`,
      text: `
              Name: ${name}
              Email: ${email}
              Message: ${message}
            `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Email failed to send" }), {
      status: 500,
    });
  }
}
