"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductImageUpload from "../ProductImageUpload/ProductImageUpload";
import { productSchema } from "@/features/products/validations/product.schema";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { ProductColumn } from "../ProductTable/ProductTableColumns";

type FormValues = z.infer<typeof productSchema>;

interface Props {
  product?: ProductColumn | null;
  onSuccess: () => void;
}

const rentalOptions = [3, 6, 9, 12];

export default function ProductForm({
  product,
  onSuccess,
}: Props) {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const { data: categories = [] } = useCategories();

  const form = useForm<FormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: "",
      description: "",
      category: "",
      images: [],
      monthlyRent: 0,
      securityDeposit: 0,
      rentalTenure: [3],
      stock: 0,
      brand: "",
      dimensions: "",
      color: "",
      material: "",
      isFeatured: false,
    },
  });

  useEffect(() => {
    if (!product) return;

    form.reset({
      name: product.name,
      category: product.category,
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-2 gap-5">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Product Name
                </FormLabel>

                <FormControl>
                  <Input
                    placeholder="Wooden Study Table"
                    {...field}
                  />
                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Category
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>

                    <SelectTrigger>

                      <SelectValue placeholder="Select Category" />

                    </SelectTrigger>

                  </FormControl>

                  <SelectContent>
                    {categories.map((category: any) => (
                      <SelectItem
                        key={category._id}
                        value={category._id}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>

                </Select>

                <FormMessage />

              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyRent"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Monthly Rent
                </FormLabel>

                <FormControl>

                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="securityDeposit"
            render={({ field }) => (
              <FormItem>

                <FormLabel>
                  Security Deposit
                </FormLabel>

                <FormControl>

                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                  />

                </FormControl>

                <FormMessage />

              </FormItem>
            )}
          />
                    <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value))
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>

                <FormControl>
                  <Input placeholder="IKEA" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>

                <FormControl>
                  <Input placeholder="Brown" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>

                <FormControl>
                  <Input placeholder="Wood" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dimensions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dimensions</FormLabel>

                <FormControl>
                  <Input
                    placeholder="120 x 60 x 75 cm"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        <FormField
  control={form.control}
  name="images"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Product Images</FormLabel>

      <FormControl>
        <ProductImageUpload
          value={field.value}
          onChange={field.onChange}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Product description..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rentalTenure"
          render={() => (
            <FormItem>
              <FormLabel>Rental Tenure</FormLabel>

              <div className="flex gap-6">

                {rentalOptions.map((month) => (
                  <FormField
                    key={month}
                    control={form.control}
                    name="rentalTenure"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">

                        <Checkbox
                          checked={field.value.includes(month)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([
                                ...field.value,
                                month,
                              ]);
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (m) => m !== month
                                )
                              );
                            }
                          }}
                        />

                        <FormLabel className="font-normal">
                          {month} Months
                        </FormLabel>

                      </FormItem>
                    )}
                  />
                ))}

              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-4">

              <div>
                <FormLabel>Featured Product</FormLabel>
              </div>

              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              onSuccess();
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={
              createMutation.isPending ||
              updateMutation.isPending
            }
          >
            {product
              ? "Update Product"
              : "Create Product"}
          </Button>

        </div>

      </form>
    </Form>
  );
}