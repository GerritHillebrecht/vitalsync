import { CreateAccountForm } from "@/components/forms/account/create/create-account-form";
import { getAccountByAuthID, getUser } from "@/lib/data-access";
import { redirect } from "next/navigation";

export default async function Page() {
  const {
    data: { user },
    error,
  } = await getUser();

  if (error || !user) {
    console.error(error);
    redirect("/auth/login");
  }

  const { data: account } = await getAccountByAuthID(user.id);

  if (account) {
    redirect("/account");
  }

  return (
    <main className="py-10">
      <section>
        <div className="container mx-auto">
          <h1>Create new Account</h1>
          <CreateAccountForm user={user} />
        </div>
      </section>
    </main>
  );
}
