// "use server";

// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function submitTicket(formData: FormData) {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const message = formData.get("message") as string;

//   try {
//     await resend.emails.send({
//       from: "Support Form <onboarding@resend.dev>", // Update to your domain later
//       to: "yoursite@email.tawk.to", // YOUR TAWK.TO FORWARDING EMAIL
//       replyTo: email, // This allows you to reply to the user directly from Tawk.to
//       subject: `New Ticket from ${name}`,
//       text: `User: ${name} (${email})\n\nMessage: ${message}`,
//     });

//     return { success: true };
//   } catch (error) {
//     return { success: false };
//   }
// }
