"use client";

import { useCurrentLocale } from "@/locales/client";
import { useAccount } from "@/provider";
import Link from "next/link";

export function Companies() {
  const { account } = useAccount();
  const locale = useCurrentLocale();

  return (
    <div>
      {account?.companies?.map((company) => (
        <div key={company.id} className="flex items-center gap-x-2">
          <Link href={`/${locale}/app/${company.id}`}>
            <span>{company.company_name}</span>
          </Link>
          <div>
            {company.workspaces?.map((workspace) => (
              <Link
                href={`/${locale}/app/${company.id}/${workspace.id}`}
                key={workspace.id}
                className="flex items-center gap-x-2"
              >
                <span>{workspace.workspace_name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
