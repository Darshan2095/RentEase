"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  address: any;
  setAddress: (address: any) => void;
}

export default function AddressForm({ address, setAddress }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const fields = [
    { name: "fullName", label: "Full Name", placeholder: "e.g. John Doe", span: "col-span-2" },
    { name: "phone", label: "Phone Number", placeholder: "+91 00000 00000", span: "col-span-2" },
    { name: "address", label: "Street Address", placeholder: "House No, Area, Colony", span: "col-span-2" },
    { name: "city", label: "City", placeholder: "Ahmedabad", span: "col-span-1" },
    { name: "state", label: "State", placeholder: "Gujarat", span: "col-span-1" },
    { name: "pincode", label: "Pincode", placeholder: "380001", span: "col-span-2" },
  ];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-slate-900">Shipping Details</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className={`space-y-2 ${field.span}`}>
            <Label htmlFor={field.name} className="text-xs font-semibold uppercase text-slate-500">
              {field.label}
            </Label>
            <Input
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={address[field.name] || ""}
              onChange={handleChange}
              className="h-11 rounded-xl border-slate-200 focus:border-blue-600 focus:ring-blue-600"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}