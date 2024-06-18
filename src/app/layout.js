import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">      
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <NavBar />
        {/* {children} */}
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
        </body>
    </html>
  );
}