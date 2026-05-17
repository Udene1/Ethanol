"use client";

import { useSession } from "next-auth/react";
import { ShoppingCart, FileText, ChevronRight, Package, Box } from "lucide-react";

export default function BuyerDashboard() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold">Welcome, {session?.user?.name || "Verified Buyer"}</h1>
        <p className="text-muted-foreground mt-1 text-sm lowercase">EthanolDirect Verified Supply Portal</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Stats/Actions */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl hover:bg-primary/10 transition-all cursor-pointer group">
            <ShoppingCart className="text-primary mb-4 size-8" />
            <h3 className="font-bold text-lg mb-2">Request New Quote</h3>
            <p className="text-sm text-muted-foreground mb-4">Browse our industrial catalog and request latest pricing.</p>
            <div className="flex items-center text-primary text-xs font-bold gap-1 group-hover:gap-2 transition-all">
              Gated Catalog <ChevronRight className="size-4" />
            </div>
          </div>
          
          <div className="bg-muted/30 border border-border/40 p-6 rounded-2xl hover:bg-muted/50 transition-all cursor-pointer group">
            <FileText className="text-muted-foreground mb-4 size-8 group-hover:text-primary transition-colors" />
            <h3 className="font-bold text-lg mb-2">Order History</h3>
            <p className="text-sm text-muted-foreground mb-4">Track your current industrial shipments and invoices.</p>
            <div className="flex items-center text-muted-foreground text-xs font-bold gap-1">
              View History <ChevronRight className="size-4" />
            </div>
          </div>
        </div>

        {/* Status / Compliance sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border/40 p-6 rounded-2xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Box className="size-5 text-primary" /> Supply Status
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Verification</span>
                <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-green-500/20">Active</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Active Quotes</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">In Transit</span>
                <span className="font-bold">0</span>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-600/10 border border-yellow-600/20 p-4 rounded-xl text-[10px] text-yellow-600 leading-relaxed italic">
            "Reminder: Local Purchase Orders (LPO) or End User Certificates are mandatory for all bulk ethanol transactions."
          </div>
        </div>
      </div>
    </div>
  );
}
