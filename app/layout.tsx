import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/styles/globals.css";
import { I18nProvider } from "@/app/context/I18nContext";
import { ThemeProvider } from "@/app/context/ThemeContext";
import Navbar from "@/app/components/ui/navbar/Navbar";
import Footer from "@/app/components/ui/footer/Footer";
import { ToastContainer } from 'react-toastify';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PortFolio Emanuel",
  description:
    "My personal portfolio website showcasing my projects and skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function() {
        try {
          var saved = localStorage.getItem('theme');
          if (saved === 'light') {
            document.documentElement.classList.add('light');
            document.body && document.body.classList && document.body.classList.add('light');
            return;
          }
          if (saved === 'dark') {
            document.documentElement.classList.remove('light');
            document.body && document.body.classList && document.body.classList.remove('light');
            return;
          }
          var prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
          if (prefersLight) {
            document.documentElement.classList.add('light');
            document.body && document.body.classList && document.body.classList.add('light');
          }
        } catch (e) {}
      })();
    `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="grow">
                {children}
              </main>
              <Footer />
              <ToastContainer />
            </div>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
