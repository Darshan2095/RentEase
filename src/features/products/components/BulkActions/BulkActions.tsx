"use client";

import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle, ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  count: number;
  onDelete: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function BulkActions({
  count,
  onDelete,
  onActivate,
  onDeactivate,
}: Props) {
  if (!count) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-4 rounded-2xl bg-slate-950 px-5 py-3 shadow-2xl shadow-slate-950/20 border border-slate-800 backdrop-blur-xl">
        
        {/* Count Indicator */}
        <div className="flex items-center gap-2.5 pr-4 border-r border-slate-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-[11px] font-black text-white">
            {count}
          </span>
          <p className="text-[13px] font-bold text-white tracking-tight">
            Selected
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onActivate}
            className="h-9 px-3 text-[12px] font-bold text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <CheckCircle className="mr-2 h-3.5 w-3.5 text-emerald-400" />
            Activate
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onDeactivate}
            className="h-9 px-3 text-[12px] font-bold text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <ShieldAlert className="mr-2 h-3.5 w-3.5 text-amber-400" />
            Deactivate
          </Button>

          <div className="h-4 w-[1px] bg-slate-800 mx-1" />

          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-9 px-3 text-[12px] font-bold text-red-400 hover:text-red-300 hover:bg-red-950/50"
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}