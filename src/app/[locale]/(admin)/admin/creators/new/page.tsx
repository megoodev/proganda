import { CreatorForm } from "@/components/admin/creator-form";

export default function NewCreatorPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">New creator</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">
        Drafts stay hidden until you publish them.
      </p>
      <CreatorForm />
    </div>
  );
}
