import { getAccountByAuthID, getCompanies, getUser } from "@/lib/data-access";
import { Companies } from "./_components/companies-selector";

export default async function Page() {
  console.log("Rendering Layout /app/[locale]/app/page.tsx");

  // const {
  //   data: { user },
  // } = await getUser();

  // const { data: account } = await getAccountByAuthID(user!.id);

  return (
    <div>
      <Companies />
    </div>
  );
}
