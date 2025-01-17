"use client";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "@/redux/provider";
import { Footer, Header } from "@/components";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ModalRegister from "@/components/ModalRegister";
import { ApolloProv } from "@/apollocms/apollo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.title = "FoodManager " + pathname!.split("/").slice(-1);
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <body>
        <Providers>
          <ApolloProv>
            <div className="app">
              <Header />
              <div className="container">
                {children}
                <ModalRegister />
              </div>
              <Footer />
            </div>
          </ApolloProv>
        </Providers>
      </body>
    </html>
  );
}
