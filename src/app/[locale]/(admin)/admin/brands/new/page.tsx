import { BrandForm } from "@/components/admin/brand-form";

export default function NewBrandPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">New brand</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">
        Drafts stay hidden until you publish them.
      </p>
      <BrandForm />
    </div>
  );
}
