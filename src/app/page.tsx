"use client";

import { useEffect, useMemo } from "react";
import { UserButton } from "@/features/auth/components/user-button";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspce-modal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = useCreateWorkspaceModal();

  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      
      /*
      
      replace method unlike push, just replaces the history so when you want to go back, 
      it wont work like going to homepage or something, we stay at the home page but the 
      url gets changed and the dom is rewritten owing to the router dependency in the 
      useEffect hook
      */
      router.replace(`/workspace/${workspaceId}`);
      
    } else if (!open) {
      setOpen(true);
    }
  }, [isLoading, open, router, setOpen, workspaceId]);

  return (
    <main>
      <UserButton />
    </main>
  );
}
