import Container from "@/components/layout/Container";
import PageSection from "@/components/layout/PageSection";
import CategoryCard from "./CategoryCard";
import { categoriesData } from "./categories.data";

export default function Categories() {
  return (
    <PageSection id="categories" className="bg-background">
      <Container className="space-y-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
          <p className="text-muted-foreground">
            Explore our vast selection of premium items curated for every corner of your home or workspace.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              count={category.count}
              icon={category.icon}
              href={category.href}
            />
          ))}
        </div>
      </Container>
    </PageSection>
  );
}
