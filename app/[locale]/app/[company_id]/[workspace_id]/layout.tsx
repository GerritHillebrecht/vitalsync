import { Workspace } from "@/models";
import { ReactNode } from "react";

// export async function generateStaticParams() {
//   const { data: workspaces } = await getWorkspaces();

//   const workspace_params = workspaces?.map(({ id }) => ({
//     params: { workspace_id: id },
//   }));
//   console.log("Workspace Params: ", workspace_params);
//   return workspace_params ?? [];
// }

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ workspace_id: Workspace["id"] }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { workspace_id } = await params;
  console.log(
    "Rendering Layout /app/[locale]/[company_id]/[workspace_id]/layout.tsx"
  );
  console.log("Workspace ID: ", workspace_id);
  return <>{children}</>;
}
