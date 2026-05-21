"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Upload, Building2, UserCircle, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    companyName: "",
    cacNumber: "",
    phoneNumber: "",
    address: "",
    tin: "",
  });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    cacCert: null,
    nafdacLicense: null,
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files) {
      setFiles({ ...files, [type]: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Register User
      const regRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await regRes.json();
      
      if (!regRes.ok) throw new Error(data.error || "Registration failed");
      
      const newUserId = data.userId;
      setUserId(newUserId);

      // 2. Upload Files
      for (const [type, file] of Object.entries(files)) {
        if (file) {
          const uploadData = new FormData();
          uploadData.append("file", file);
          uploadData.append("userId", newUserId);
          uploadData.append("docType", type === "cacCert" ? "CAC_CERTIFICATE" : "NAFDAC_LICENSE");
          
          await fetch("/api/compliance/upload", {
            method: "POST",
            body: uploadData,
          });
        }
      }

      setStep(4);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Business Registration</h1>
        <p className="text-muted-foreground text-sm">
          Complete your KYC profile to access the gated industrial catalog.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
              step >= s ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="bg-card border border-border/40 p-8 rounded-2xl shadow-xl shadow-primary/5">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Building2 className="size-5" />
              <h2 className="font-bold">Company Information</h2>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Company Name</label>
                <input name="companyName" value={formData.companyName} onChange={handleChange} type="text" placeholder="e.g. Premium Breweries Ltd" className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">CAC Reg Number</label>
                  <input name="cacNumber" value={formData.cacNumber} onChange={handleChange} type="text" placeholder="RC-123456" className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Tax ID (TIN)</label>
                  <input name="tin" value={formData.tin} onChange={handleChange} type="text" placeholder="TIN-789012" className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Business Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Full operational address" className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors resize-none" />
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Continue to Documentation <ArrowRight className="size-5" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center gap-2 text-primary mb-2">
              <ShieldCheck className="size-5" />
              <h2 className="font-bold">KYC Documentation</h2>
            </div>
            <p className="text-xs text-muted-foreground lowercase mb-6">
              Upload clear PDF or JPG copies of your business permits.
            </p>
            
            <div className="grid gap-4">
              <div className="relative border-2 border-dashed border-border p-6 rounded-xl hover:border-primary/40 transition-colors cursor-pointer group">
                <input type="file" onChange={(e) => handleFileChange(e, "cacCert")} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="size-8 text-muted-foreground mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium">{files.cacCert ? files.cacCert.name : "CAC Certificate"}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Upload PDF (Max 5MB)</p>
              </div>
              <div className="relative border-2 border-dashed border-border p-6 rounded-xl hover:border-primary/40 transition-colors cursor-pointer group">
                <input type="file" onChange={(e) => handleFileChange(e, "nafdacLicense")} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="size-8 text-muted-foreground mx-auto mb-3 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium">{files.nafdacLicense ? files.nafdacLicense.name : "NAFDAC Operational License"}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Required for pharmaceutical/food processors</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">Back</button>
              <button onClick={() => setStep(3)} className="flex-[2] bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">Final Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary mb-2">
              <UserCircle className="size-5" />
              <h2 className="font-bold">Account Credentials</h2>
            </div>
            <div className="grid gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Contact Person</label>
                <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Full name of representative" className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Business Email</label>
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="corporate@company.com" className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block uppercase tracking-wider">Secure Password</label>
                <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 transition-colors" />
              </div>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg text-[10px] text-muted-foreground leading-relaxed italic">
              "By submitting, you agree that all information is accurate and subject to verification by EthanolDirect compliance officers."
            </div>
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit for Approval"}
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-12">
            <div className="size-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="size-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Application Submitted</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Thank you for registering. Our compliance team will review your CAC and NAFDAC documentation. 
              You will receive an email once your account is verified and catalog access is granted.
            </p>
            <a href="/" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold">Return Home</a>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-muted-foreground">
        Already have a verified account? <a href="/login" className="text-primary font-semibold hover:underline">Log in here</a>
      </div>
    </div>
  );
}
