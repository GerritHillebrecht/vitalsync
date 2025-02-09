"use client";

import { Account } from "@/models";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useState } from "react";

interface AccountContextType {
  user: User;
  setUser: (user: User) => void;

  account: Account;
  setAccount: (account: Account) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountContextProviderProps {
  children: React.ReactNode;
  user: AccountContextType["user"];
  account: AccountContextType["account"];
}

export function AccountContextProvider({
  children,
  user: initialUser,
  account: initialAccount,
}: AccountContextProviderProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [account, setAccount] = useState<Account>(initialAccount);

  const value: AccountContextType = { user, account, setUser, setAccount };

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);

  if (context === undefined) {
    throw new Error("useAccount must be used within a AccountContextProvider");
  }

  return context;
}
