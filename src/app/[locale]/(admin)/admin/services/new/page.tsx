import { ServiceForm } from "@/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-3xl font-black">New service plan</h1>
      <p className="mt-1 mb-8 text-sm text-white/50">
        Plans are keyed by id, so re-saving an existing id updates that plan.
      </p>
      <ServiceForm />
    </div>
  );
}
