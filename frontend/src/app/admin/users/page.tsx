"use client";

import { useEffect, useState } from "react";
import { Check, X, Building, Shield, ExternalLink } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId: string, action: "APPROVE" | "REJECT") => {
    try {
      const res = await fetch("/api/admin/users/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      alert("Action failed");
    }
  };

  if (loading) return <div className="p-12 text-center">Loading applications...</div>;

  const pendingUsers = users.filter(u => u.role === "PENDING_BUYER");
  const verifiedUsers = users.filter(u => u.role === "APPROVED_BUYER");

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm lowercase">Review and verify industrial business applications.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-muted/40 rounded-lg border border-border/40">
            <span className="text-xs text-muted-foreground block uppercase">Pending</span>
            <span className="font-bold">{pendingUsers.length}</span>
          </div>
          <div className="px-4 py-2 bg-muted/40 rounded-lg border border-border/40">
            <span className="text-xs text-muted-foreground block uppercase">Verified</span>
            <span className="font-bold text-primary">{verifiedUsers.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Shield className="size-5 text-primary" /> Pending Verification
          </h2>
          {pendingUsers.length === 0 ? (
            <div className="bg-muted/10 border border-dashed border-border rounded-xl py-12 text-center text-muted-foreground">
              No pending applications at this time.
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingUsers.map(user => (
                <div key={user.id} className="bg-card border border-border/40 p-6 rounded-xl flex items-center justify-between">
                  <div className="flex gap-6 items-start">
                    <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building className="text-primary size-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{user.companyName}</h3>
                      <p className="text-sm text-muted-foreground">{user.name} • {user.email}</p>
                      <div className="flex gap-4 mt-3 text-[10px] text-muted-foreground font-mono uppercase">
                        <span>RC: {user.cacNumber}</span>
                        <span>Contact: {user.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                      <ExternalLink className="size-3" /> View Documents
                    </button>
                    <button 
                      onClick={() => handleAction(user.id, "REJECT")}
                      className="size-10 flex items-center justify-center text-destructive bg-destructive/10 rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      <X className="size-5" />
                    </button>
                    <button 
                      onClick={() => handleAction(user.id, "APPROVE")}
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      <Check className="size-4" /> Approve Buyer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
