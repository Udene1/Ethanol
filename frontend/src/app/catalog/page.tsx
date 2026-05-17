"use client";

import { useEffect, useState } from "react";
import { Search, Filter, Plus, Package, Info, FileDown } from "lucide-react";

export default function CatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProducts(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category.name)))];

  if (loading) return <div className="p-24 text-center">Loading industrial catalog...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Industrial Catalog</h1>
          <p className="text-muted-foreground mt-1 text-sm">Factual specifications for verified industrial procurement.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-muted/40 border border-border/40 rounded-lg outline-none focus:border-primary/50 text-sm"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-muted/40 border border-border/40 rounded-lg outline-none focus:border-primary/50 text-sm appearance-none cursor-pointer"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
          No products matched your search or category filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-card border border-border/40 rounded-2xl overflow-hidden group hover:border-primary/30 transition-all flex flex-col">
              <div className="h-40 bg-muted/50 flex items-center justify-center border-b border-border/20 relative">
                <Package className="size-12 text-muted-foreground group-hover:scale-110 transition-transform" />
                <div className="absolute top-3 right-3 bg-background/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold border border-border/40 uppercase">
                  {product.category.name}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="mt-auto space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                    <div className="bg-muted/30 px-2 py-1.5 rounded flex items-center gap-1.5">
                      <Info className="size-3" /> Purity: {product.puritySpec || "Standard"}
                    </div>
                    <div className="bg-muted/30 px-2 py-1.5 rounded flex items-center gap-1.5">
                      <Box className="size-3" /> {product.packaging}
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2">
                    <Plus className="size-4" /> Add to Quote Request
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors py-1">
                    <FileDown className="size-3" /> View Technical COA
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Compliance Disclaimer Footer for Catalog */}
      <div className="mt-16 p-6 bg-yellow-600/5 border border-yellow-600/10 rounded-2xl text-[10px] text-yellow-600/80 italic text-center">
        "All data presented here is for industrial reference only. Transactions require formal LPO/EUC documentation and final compliance approval before dispatch."
      </div>
    </div>
  );
}
