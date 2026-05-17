import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EthanolDirect B2B | Secure Industrial Supply Platform",
  description: "Verified B2B marketplace for food-grade ethanol and industrial chemicals. NAFDAC Compliant.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          {/* Compliance Banner */}
          <div className="bg-yellow-600/20 border-b border-yellow-600/30 py-2 px-4 text-center text-xs font-medium text-yellow-500">
            FOR LICENSED INDUSTRIAL USE ONLY. ALL BUYERS MUST BE VERIFIED AND COMPLY WITH NAFDAC REGULATIONS.
          </div>
        
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded flex items-center justify-center font-bold text-primary-foreground">
                ED
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">EthanolDirect B2B</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
              <a href="#compliance" className="hover:text-foreground transition-colors">Compliance</a>
              <a href="#about" className="hover:text-foreground transition-colors">Technical Data</a>
              <a href="/register" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity">Business Registration</a>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-border/40 py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-bold text-foreground mb-4">EthanolDirect</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The primary gated portal for verified industrial buyers in Nigeria. 
                  Streamlining procurement while ensuring total regulatory compliance.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-4">Regulatory Notice</h3>
                <p className="text-xs text-muted-foreground/80 lowercase italic leading-relaxed">
                  "This platform is for verified b2b customers only. all sales are subject to nafdac regulations, verification, and final approval. the company is not responsible for misuse or non-compliance by buyers."
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-4">Quick Contact</h3>
                <p className="text-sm text-muted-foreground">Verification Enquiries:<br/>support@ethanoldirect.ng</p>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} EthanolDirect. Gated B2B Infrastructure.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
