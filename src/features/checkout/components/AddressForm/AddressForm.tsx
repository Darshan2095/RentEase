"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Props {
  address: any;
  setAddress: any;
}

export default function AddressForm({
  address,
  setAddress,
}: Props) {
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Card className="space-y-4 p-6">

      <Input
        name="fullName"
        placeholder="Full Name"
        value={address.fullName}
        onChange={handleChange}
      />

      <Input
        name="phone"
        placeholder="Phone"
        value={address.phone}
        onChange={handleChange}
      />

      <Input
        name="address"
        placeholder="Address"
        value={address.address}
        onChange={handleChange}
      />

      <Input
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
      />

      <Input
        name="state"
        placeholder="State"
        value={address.state}
        onChange={handleChange}
      />

      <Input
        name="pincode"
        placeholder="Pincode"
        value={address.pincode}
        onChange={handleChange}
      />

    </Card>
  );
}