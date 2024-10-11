import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ConvexClientProvider } from "@/components/convex-client-provider";

import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Woks",
  description: "Woks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          <ConvexClientProvider>
            <CreateWorkspaceModal />
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
