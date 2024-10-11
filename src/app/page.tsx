'use client'

import { useEffect, useMemo } from "react";
import { UserButton } from "@/features/auth/components/user-button";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

export default function Home() {
  const { data, isLoading } = useGetWorkspaces();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) return;

    if (workspaceId) {
      console.log("Redirect to workspace")
    } else {
      console.log("Open creation model")
    }
  }, [isLoading, workspaceId])

  return (
    <main>

      <UserButton />
    </main>
  );
}
