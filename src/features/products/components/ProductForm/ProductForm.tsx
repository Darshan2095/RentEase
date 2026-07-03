"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import ProductImageUpload from "../ProductImageUpload/ProductImageUpload";
import { productSchema } from "@/features/products/validations/product.schema";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { ProductColumn } from "../ProductTable/ProductTableColumns";

type FormValues = z.infer<typeof productSchema>;

export default function ProductForm({ product, onSuccess }: { product?: ProductColumn | null, onSuccess: () => void }) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const { data: categories = [] } = useCategories();

  const form = useForm<FormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", monthlyRent: 0, securityDeposit: 0, stock: 0, isFeatured: false, rentalTenure: [3] }
  });
  

  useEffect(() => {

    if (!product) return;

    // Extract category ID if it's an object, otherwise use as-is
    const categoryValue = typeof product.category === "string" 
      ? product.category 
      : product.category?._id || "";

    form.reset({

      name: product.name,

      category: categoryValue,

      monthlyRent: product.monthlyRent,

      securityDeposit: product.securityDeposit,

      stock: product.availableStock,

      description: "",

      images: [],

      rentalTenure: [3],

      brand: "",

      dimensions: "",

      color: "",

      material: "",

      isFeatured: product.isFeatured,

    });

  }, [product, form]);



  async function onSubmit(values: FormValues) {

    if (product) {

      await updateMutation.mutateAsync({

        slug: product.slug,

        payload: values,

      });

    } else {

      await createMutation.mutateAsync(values);

    }



    form.reset();

    onSuccess();

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Section 1: Core Identification */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Product Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem><FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Choose..." /></SelectTrigger></FormControl>
                  <SelectContent>{categories.map((c: any) => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </FormItem>
            )} />
          </div>
        </div>

        <Separator />

        {/* Section 2: Economics */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pricing & Inventory</h3>
          <div className="grid grid-cols-3 gap-4">
             <FormField control={form.control} name="monthlyRent" render={({ field }) => (
              <FormItem><FormLabel>Monthly Rent</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="securityDeposit" render={({ field }) => (
              <FormItem><FormLabel>Deposit</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl></FormItem>
            )} />
             <FormField control={form.control} name="stock" render={({ field }) => (
              <FormItem><FormLabel>Units Available</FormLabel><FormControl><Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} /></FormControl></FormItem>
            )} />
          </div>
        </div>

        {/* Add visual flair for the "Featured" switch */}
        <FormField control={form.control} name="isFeatured" render={({ field }) => (
          <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Feature on Homepage</FormLabel>
              <p className="text-xs text-slate-500">Enable this to boost asset visibility in the main catalog.</p>
            </div>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </div>
        )} />

        {/* ... (Rest of fields) */}
      </form>
    </Form>
  );
}