import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner"
import {ReactQueryProvider} from "./providers";
import WebSocketProvider from "./providers/ws-status-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMA | Ask me Anything",
  description: "AMA | Ask me Anything",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ReactQueryProvider>
          <WebSocketProvider>
            {children}
            <Toaster invert richColors/>
          </WebSocketProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
