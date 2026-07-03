"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Loader2 } from "lucide-react";

import { useReturnRental } from "../../hooks/useReturnRental";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rental: any;
}

export default function ReturnRentalDialog({
  open,
  onOpenChange,
  rental,
}: Props) {
  const mutation = useReturnRental();

  const [damageStatus, setDamageStatus] =
    useState("NONE");

  const [damageCharges, setDamageCharges] =
    useState(0);

  const [notes, setNotes] = useState("");

  if (!rental) return null;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setDamageStatus("NONE");
      setDamageCharges(0);
      setNotes("");
    }

    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    mutation.mutate(
      {
        id: rental._id,
        damageStatus,
        damageCharges,
        notes,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>
            Return Rental
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <h3 className="font-semibold">
              {rental.product?.name}
            </h3>

            <p className="text-sm text-muted-foreground">
              Customer: {rental.user?.fullName}
            </p>

          </div>

          <div className="space-y-2">

            <Label>
              Damage Status
            </Label>

            <Select
              value={damageStatus}
              onValueChange={setDamageStatus}
            >
              <SelectTrigger>

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                <SelectItem value="NONE">
                  No Damage
                </SelectItem>

                <SelectItem value="MINOR">
                  Minor Damage
                </SelectItem>

                <SelectItem value="MAJOR">
                  Major Damage
                </SelectItem>

              </SelectContent>

            </Select>

          </div>

          <div className="space-y-2">

            <Label>
              Damage Charges
            </Label>

            <Input
              type="number"
              value={damageCharges}
              onChange={(e) =>
                setDamageCharges(
                  Number(e.target.value)
                )
              }
            />

          </div>

          <div className="space-y-2">

            <Label>
              Return Notes
            </Label>

            <Textarea
              rows={4}
              value={notes}
              placeholder="Enter return notes..."
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            Complete Return
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}