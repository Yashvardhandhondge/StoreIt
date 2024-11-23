import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Poppins} from 'next/font/google'

const pop = Poppins({
  subsets : ['latin'],
  weight: ['100','200','300','400', '500','600', '700','800','900'],
  variable: '--font-poppins',
}) 


export const metadata: Metadata = {
  title: "My storage",
  description:"My storage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pop.variable} font-pop antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
