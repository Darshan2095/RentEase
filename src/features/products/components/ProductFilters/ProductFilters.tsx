"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  featured: string;
  setFeatured: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  categories: any[];
}

export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  featured,
  setFeatured,
  sort,
  setSort,
  categories,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">

      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>

          {categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
            >
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={featured} onValueChange={setFeatured}>
        <SelectTrigger>
          <SelectValue placeholder="Featured" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="true">Featured</SelectItem>
          <SelectItem value="false">Normal</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="-createdAt">
            Latest
          </SelectItem>

          <SelectItem value="name">
            Name A-Z
          </SelectItem>

          <SelectItem value="monthlyRent">
            Rent Low → High
          </SelectItem>

          <SelectItem value="-monthlyRent">
            Rent High → Low
          </SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}