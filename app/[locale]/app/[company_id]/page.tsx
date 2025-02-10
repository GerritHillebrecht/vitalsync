import { getWorkspaces } from "@/lib/data-access";

export default async function Page({
  params,
}: {
  params: Promise<{ company_id: string }>;
}) {
  const { company_id } = await params;
  const { data: workspaces } = await getWorkspaces(company_id);
  return (
    <div>
      <h1>Workspaces</h1>
      <ul>
        {workspaces?.map((workspace) => (
          <li key={workspace.id}>{workspace.workspace_name}</li>
        ))}
      </ul>
    </div>
  );
}
