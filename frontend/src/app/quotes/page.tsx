"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Trash2, Package, MapPin, Upload, FileCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuoteReviewPage() {
  const { items, removeItem, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [lpoFile, setLpoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (items.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, deliveryAddress, specialNotes }),
      });

      if (!res.ok) throw new Error("Quote submission failed");

      const { quoteId } = await res.json();

      // Upload LPO if provided
      if (lpoFile) {
        const uploadData = new FormData();
        uploadData.append("file", lpoFile);
        uploadData.append("userId", "current"); // Handled by session on server
        uploadData.append("docType", "LPO");
        
        await fetch("/api/compliance/upload", {
          method: "POST",
          body: uploadData,
        });
      }

      clearCart();
      router.push("/dashboard");
      alert("Quote request submitted successfully!");
    } catch (err) {
      alert("Error submitting quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Review Quote Request</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items */}
          <div className="bg-card border border-border/40 rounded-2xl overflow-hidden">
            <div className="p-4 bg-muted/30 border-b border-border/40 font-bold text-sm tracking-tight">Requested Items</div>
            {items.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground italic text-sm">Your quote list is empty.</div>
            ) : (
              <div className="divide-y divide-border/20">
                {items.map(item => (
                  <div key={item.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="text-primary size-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery & Compliance */}
          <div className="bg-card border border-border/40 rounded-2xl p-6 space-y-6">
            <div>
              <label className="text-xs font-bold text-muted-foreground mb-2 block uppercase flex items-center gap-2">
                <MapPin className="size-3" /> Delivery Address
              </label>
              <textarea 
                rows={3} 
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Full state and facility address"
                className="w-full bg-muted/40 border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary/50 text-sm resize-none" 
              />
            </div>
            
            <div className="border-t border-border/20 pt-6">
              <label className="text-xs font-bold text-muted-foreground mb-4 block uppercase flex items-center gap-2">
                <FileCheck className="size-3" /> Local Purchase Order (LPO)
              </label>
              <div className="relative border-2 border-dashed border-border p-8 rounded-xl hover:border-primary/40 transition-colors text-center cursor-pointer group">
                <input type="file" onChange={(e) => setLpoFile(e.target.files ? e.target.files[0] : null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                <Upload className="size-6 text-muted-foreground mx-auto mb-2 group-hover:text-primary" />
                <p className="text-xs font-medium">{lpoFile ? lpoFile.name : "Upload LPO / End User Certificate"}</p>
                <p className="text-[10px] text-muted-foreground mt-1 lowercase italic">Required for bulk ethanol dispatch per NAFDAC</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Submission Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Items</span>
                <span className="font-bold">{items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Verification</span>
                <span className="text-primary font-bold">Standard</span>
              </div>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={loading || items.length === 0}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin size-4" /> : "Submit Quote Request"}
            </button>
          </div>
          
          <p className="text-[10px] text-muted-foreground leading-relaxed italic px-2">
            "By submitting this request, you confirm that your industrial license is valid and that you will provide all necessary compliance documentation upon request."
          </p>
        </div>
      </div>
    </div>
  );
}
