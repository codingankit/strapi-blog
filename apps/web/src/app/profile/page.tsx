import { protectRoute } from "@/features/auth";

export const metadata = { title: "Profile" };

export default async function Profile() {
  const user = await protectRoute();
  const name = user?.user_metadata?.name as string | undefined;

  return (
    <section className="max-w-3xl mx-auto px-6 pt-10 pb-16 md:pb-24">
      <h1 className="text-2xl font-bold tracking-tight md:text-4xl text-foreground leading-tight mb-8">
        Profile
      </h1>
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-muted-foreground">Name</dt>
          <dd className="font-medium">{name ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Email</dt>
          <dd className="font-medium">{user?.email}</dd>
        </div>
      </dl>
    </section>
  );
}
