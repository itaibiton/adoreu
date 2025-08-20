import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Clerk webhook endpoint
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers.get("svix-signature");

    try {
      const payload = JSON.parse(payloadString);
      const { type, data } = payload;

      switch (type) {
        case "user.created":
        case "user.updated":
          await ctx.runMutation(api.auth.createUser, {
            clerkUserId: data.id,
            email: data.email_addresses?.[0]?.email_address,
            displayName: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "User",
          });
          break;

        case "user.deleted":
          // Handle user deletion if needed
          break;
      }

      return new Response(null, { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response("Webhook error", { status: 400 });
    }
  }),
});

export default http;