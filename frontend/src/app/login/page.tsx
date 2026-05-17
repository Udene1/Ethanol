"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error === "Account pending approval" 
          ? "Your account is still being reviewed by our compliance team. Please wait for approval." 
          : "Invalid email or password.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-md">
      <div className="bg-card border border-border/40 p-8 rounded-2xl shadow-xl shadow-primary/5">
        <div className="text-center mb-8">
          <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-primary size-6" />
          </div>
          <h1 className="text-2xl font-bold">Secure Login</h1>
          <p className="text-muted-foreground text-sm mt-2">Verified B2B access only.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Business Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-muted/40 border border-border rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-primary/50 transition-colors" 
                placeholder="corporate@company.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" 
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-xs text-destructive text-center leading-relaxed">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-5 animate-spin" /> : "Sign In"}
            {!loading && <ArrowRight className="size-5" />}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-muted-foreground border-t border-border/20 pt-6">
          Don't have a business account? <a href="/register" className="text-primary font-semibold hover:underline">Register for KYC</a>
        </div>
      </div>
    </div>
  );
}
