"use client";

import { createClient } from "@/lib/supabase/client";
import { LocaleSelector } from "../navigation/locale-selector";
import { Logo } from "./logo";
import { ThemeModeToggle } from "./theme-selector";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Account } from "@/models";
import { getAccounts } from "@/lib/data-access/client";

export function Footer() {
  // const supabase = createClient();
  // const [user, setUser] = useState<User | null>(null);
  // const [account, setAccount] = useState<Account | null>(null);
  // const [companies, setCompanies] = useState<Account["companies"] | null>(null);

  // useEffect(() => {
  //   async function getUser() {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();

  //     setUser(user);
  //   }

  //   getUser();
  // }, []);

  // useEffect(() => {
  //   async function getAccount() {
  //     if (user) {
  //       const { data: account, error } = await getAccounts();

  //       setAccount(account);
  //     }
  //   }
  //   if (user) {
  //     getAccount();
  //   }
  // }, [user]);

  // useEffect(() => {
  //   async function getCompanies() {
  //     if (account) {
  //       const { data: companies, error } = await supabase
  //         .from("companies")
  //         .select("*");

  //       setCompanies(companies);
  //     }
  //   }
  //   if (account) {
  //     getCompanies();
  //   }
  // }, [account]);

  return (
    <footer className="py-8 border-t bg-background">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between gap-x-2">
          <Logo />
          <div className="flex items-center gap-x-2">
            <LocaleSelector />
            <ThemeModeToggle />
          </div>
        </nav>
        {/* <p>User</p>
        {JSON.stringify(user?.id, null, 2)}
        <p>Account</p>
        {JSON.stringify(account, null, 2)}
        <p>Companies</p>
        {JSON.stringify(companies, null, 2)} */}
      </div>
    </footer>
  );
}
