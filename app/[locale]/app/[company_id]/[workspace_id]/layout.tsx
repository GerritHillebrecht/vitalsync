export default function Layout({ children }: { children: React.ReactNode }) {
  console.log(
    "Rendering Layout /app/[locale]/[company_id]/[workspace_id]/layout.tsx"
  );
  return <>{children}</>;
}
