"use client";

import { useEffect, useState } from "react";
import { Package, Clock, ExternalLink, CreditCard, ChevronRight } from "lucide-react";

export default function OrderHistoryPage() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/quotes") // In a real app, this would be a user-specific filtered route
      .then(res => res.json())
      .then(data => {
        setQuotes(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-12 text-center text-sm">Retrieving your order history...</div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">Invoices & Shipments</h1>
        <p className="text-muted-foreground mt-1 text-sm lowercase">Track your history and download industrial documents.</p>
      </div>

      <div className="space-y-6">
        {quotes.length === 0 ? (
          <div className="p-24 text-center border border-dashed border-border rounded-3xl text-sm italic text-muted-foreground">
            No history found. Approved buyers can browse products and start a new quote request.
          </div>
        ) : (
          quotes.map(quote => (
            <div key={quote.id} className="bg-card border border-border/40 rounded-2xl overflow-hidden hover:border-primary/20 transition-all">
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Package className="text-primary size-5" />
                  </div>
                  <div>
                    <h3 className="font-bold flex items-center gap-2 uppercase tracking-tight text-sm">
                      QUOTE #{quote.id.slice(-6)}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground uppercase font-mono">
                      <span className="flex items-center gap-1"><Clock className="size-3" /> {new Date(quote.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{quote.items.length} Industrial Items</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Status</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                      quote.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : "bg-green-500/10 text-green-500 border-green-500/20"
                    }`}>
                      {quote.status}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-muted/50 border border-border/40 rounded-lg text-[10px] font-bold uppercase hover:bg-muted transition-all">
                      <ExternalLink className="size-3 inline mr-1" /> View Quote
                    </button>
                    {quote.status === "QUOTED" && (
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-[10px] font-bold uppercase hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg shadow-primary/10">
                        <CreditCard className="size-3" /> Pay Invoice
                      </button>
                    )}
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
