"use client";

import { useEffect, useState } from "react";
import { Package, User, Clock, CheckCircle, CreditCard, Send } from "lucide-react";

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/admin/quotes");
      const data = await res.json();
      setQuotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-12 text-center">Loading quote requests...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">Order & Quote Management</h1>
        <p className="text-muted-foreground mt-1 text-sm lowercase">Review industrial quote requests and issue invoices.</p>
      </div>

      <div className="grid gap-6">
        {quotes.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground border border-dashed border-border rounded-xl italic">
            No quote requests found.
          </div>
        ) : (
          quotes.map(quote => (
            <div key={quote.id} className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 bg-muted/30 border-b border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Clock className="size-3" /> {new Date(quote.createdAt).toLocaleDateString()}
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                  quote.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-green-500/10 text-green-500 border-green-500/20"
                }`}>
                  {quote.status}
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-2">
                      <User className="size-3" /> Buyer Information
                    </h3>
                    <p className="font-bold">{quote.user.companyName}</p>
                    <p className="text-sm text-muted-foreground">{quote.user.name} • {quote.user.email}</p>
                    <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                      Delivery: {quote.deliveryAddress}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-2">
                      <Package className="size-3" /> Requested Items
                    </h3>
                    <div className="space-y-2">
                      {quote.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-xs border-b border-border/10 pb-1">
                          <span>{item.product.name}</span>
                          <span className="font-bold">{item.quantity} {item.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-border/20">
                  <div className="text-sm text-muted-foreground italic">
                    {quote.specialNotes ? `Note: "${quote.specialNotes}"` : "No special instructions provided."}
                  </div>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                      Reject
                    </button>
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                      <Send className="size-4" /> Issue Price Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
