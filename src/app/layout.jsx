"use client";
import Provider from "@/Provider/Provider";
import "./globals.css";
import { Menu } from "@/components";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Provider>
          <Menu>{children}</Menu>
        </Provider>
      </body>
    </html>
  );
}
