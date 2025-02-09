import { Companies } from "./_components/companies-selector";

export default function Page() {
  console.log("Rendering Layout /app/[locale]/app/layout.tsx");
  return (
    <div>
      <Companies />
    </div>
  );
}
