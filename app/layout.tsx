import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Test Lab",
  description: "Design and evaluate autonomous agent behaviors interactively"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
