"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

export default function CategoryForm({
  defaultValues,
  onSubmit,
  isLoading = false,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      icon: "",
      description: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        name: defaultValues.name || "",
        slug: defaultValues.slug || "",
        icon: defaultValues.icon || "",
        description: defaultValues.description || "",
      });
    }
  }, [defaultValues, reset]);

  const name = watch("name");

  useEffect(() => {
    if (!defaultValues?.slug) {
      setValue(
        "slug",
        name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
      );
    }
  }, [name, setValue, defaultValues]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label>Category Name</Label>

        <Input
          placeholder="Furniture"
          {...register("name", {
            required: "Category name is required",
          })}
        />

        {errors.name && (
          <p className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Slug</Label>

        <Input
          placeholder="furniture"
          {...register("slug", {
            required: "Slug is required",
          })}
        />

        {errors.slug && (
          <p className="text-sm text-red-500">
            {errors.slug.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Icon</Label>

        <Input
          placeholder="🛋️"
          {...register("icon")}
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>

        <Textarea
          rows={4}
          placeholder="Category description..."
          {...register("description")}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Category"}
      </Button>
    </form>
  );
}