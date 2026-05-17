import { ArrowRight, ShieldCheck, FileText, Lock } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/20 border-b border-border/10">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Lock className="size-3" /> GATED B2B PORTAL
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Gated Supply Infrastructure for <span className="text-primary">Industrial Ethanol</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The exclusive ordering platform for verified breweries, laboratories, and manufacturers. 
            Ensuring purity, consistency, and 100% NAFDAC compliance for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/register" 
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Start Registration <ArrowRight className="size-5" />
            </a>
            <a 
              href="#compliance" 
              className="w-full sm:w-auto px-8 py-4 rounded-lg border border-border bg-background/50 font-medium hover:bg-accent transition-colors"
            >
              Review Compliance Requirements
            </a>
          </div>
        </div>
      </section>

      {/* Compliance / KYC Overview */}
      <section id="compliance" className="py-24 border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Onboarding & KYC Process</h2>
            <p className="text-muted-foreground">Rigorous verification for industrial safety and regulatory compliance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-muted/20 border border-border/40 hover:border-primary/20 transition-all">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <FileText className="text-primary size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Registration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Submit your CAC registration details, Tax ID, and valid business address for initial review.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-muted/20 border border-border/40 hover:border-primary/20 transition-all">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-primary size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Admin Verification</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our compliance team reviews your permits and NAFDAC licenses before granting catalog access.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-muted/20 border border-border/40 hover:border-primary/20 transition-all">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Lock className="text-primary size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Gated Access</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Once approved, view technical specifications, purity tiers, and request formal price quotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Banner */}
      <section className="py-16 bg-primary/5 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-lg font-bold mb-4">Technical Data Note</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Certificates of Analysis (COAs) and detailed purity reports (96% - 99.9% Ethanol) are available exclusively 
              within the gated dashboard for verified industrial users. Log in to view detailed technical specifications.
            </p>
            <div className="text-xs text-muted-foreground italic border-t border-border/40 pt-4">
              "Factual technical data is for industrial and pharmaceutical processing references only."
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
