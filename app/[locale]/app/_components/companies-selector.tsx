"use client";

import { useCurrentLocale } from "@/locales/client";
import { useAccount } from "@/provider";
import Link from "next/link";

export function Companies() {
  const { account } = useAccount();
  const locale = useCurrentLocale();

  return (
    <div>
      {/* <pre>
        <code>{JSON.stringify(account, null, 2)}</code>
      </pre> */}
      {account?.companies?.map((company) => (
        <div key={company.id} className="flex items-center gap-x-2">
          <img
            src={company.company_name}
            alt={company.company_name}
            className="w-8 h-8 rounded-full"
          />
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
                <img
                  src={workspace.workspace_name}
                  alt={workspace.workspace_name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{workspace.workspace_name}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
