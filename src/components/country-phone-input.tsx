import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type CountryPhone = { name: string; code: string; dialCode: string; flag: string };

export const countries: CountryPhone[] = [
  { name: "Indonesia", code: "ID", dialCode: "+62", flag: "🇮🇩" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", dialCode: "+82", flag: "🇰🇷" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Thailand", code: "TH", dialCode: "+66", flag: "🇹🇭" },
  { name: "Vietnam", code: "VN", dialCode: "+84", flag: "🇻🇳" },
  { name: "Philippines", code: "PH", dialCode: "+63", flag: "🇵🇭" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
];

type Props = { country: CountryPhone; phone: string; onCountryChange: (country: CountryPhone) => void; onPhoneChange: (phone: string) => void };

export function CountryPhoneInput({ country, phone, onCountryChange, onPhoneChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => countries.filter((item) => `${item.name} ${item.code} ${item.dialCode}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Nomor WhatsApp</label><div className="flex gap-2"><Popover open={open} onOpenChange={setOpen}><PopoverTrigger asChild><Button type="button" variant="outline" className="h-12 min-w-28 justify-between rounded-2xl border-border bg-background/60 px-3"><span className="flex items-center gap-2"><span>{country.flag}</span><span>{country.dialCode}</span></span><ChevronsUpDown className="h-4 w-4 opacity-60" /></Button></PopoverTrigger><PopoverContent align="start" className="w-80 rounded-3xl p-3"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari negara atau kode..." className="h-10 rounded-2xl pl-9" /></div><div className="mt-3 max-h-72 space-y-1 overflow-y-auto pr-1">{filtered.map((item) => <button key={item.code} type="button" onClick={() => { onCountryChange(item); setOpen(false); setQuery(""); }} className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition-colors hover:bg-accent"><span className="flex items-center gap-3"><span className="text-lg">{item.flag}</span><span><span className="block font-medium text-foreground">{item.name}</span><span className="text-xs text-muted-foreground">{item.code} · {item.dialCode}</span></span></span><Check className={cn("h-4 w-4 text-primary", item.code === country.code ? "opacity-100" : "opacity-0")} /></button>)}</div></PopoverContent></Popover><Input type="tel" inputMode="tel" value={phone} onChange={(event) => onPhoneChange(event.target.value.replace(/[^0-9\s-]/g, ""))} placeholder="812 3456 7890" className="h-12 rounded-2xl" /></div></div>;
}
