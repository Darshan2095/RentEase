"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface CategoryFormValues {
  name: string;
  slug: string;
  icon: string;
  description: string;
}

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormValues>;
  onSubmit: (data: CategoryFormValues) => void;
  isLoading?: boolean;
}

export default function CategoryForm({ defaultValues, onSubmit, isLoading = false }: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: { name: "", slug: "", icon: "", description: "", ...defaultValues },
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const name = watch("name");
  useEffect(() => {
    if (!defaultValues?.slug && name) {
      setValue("slug", name.toLowerCase().trim().replace(/\s+/g, "-"));
    }
  }, [name, setValue, defaultValues?.slug]);

  return (
    <Card className="border-slate-200 shadow-none">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Category Name</Label>
              <Input
                placeholder="e.g. Living Room"
                className="h-10"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Slug</Label>
              <Input
                placeholder="living-room"
                className="h-10 bg-slate-50"
                {...register("slug", { required: "Slug is required" })}
              />
              {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Icon (Emoji or URL)</Label>
            <Input 
              placeholder="🛋️" 
              className="h-10 w-24 text-center text-xl" 
              {...register("icon")} 
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Description</Label>
            <Textarea
              rows={3}
              placeholder="Brief description of this category..."
              className="resize-none"
              {...register("description")}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full md:w-auto h-10 px-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Category"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}