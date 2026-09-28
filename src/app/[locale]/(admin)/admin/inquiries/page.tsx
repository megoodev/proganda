import { getAdminInquiries } from "@/lib/admin-data";
import { InquiriesTable, type InquiryRow } from "@/components/admin/inquiries-table";

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries();

  const rows: InquiryRow[] = inquiries.map((inquiry) => ({
    id: inquiry.id,
    name: inquiry.name,
    email: inquiry.email,
    company: inquiry.company,
    interest: inquiry.interest,
    message: inquiry.message,
    status: inquiry.status,
    createdAtLabel: new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(inquiry.createdAt),
  }));

  const newCount = rows.filter((row) => row.status === "new").length;

  return (
    <div>
      <div>
        <h1 className="text-3xl font-black">Inquiries</h1>
        <p className="mt-1 text-sm text-white/50">
          Briefs sent from the public contact form.{" "}
          {newCount > 0 ? (
            <span className="text-[#3AA7FD]">{newCount} new.</span>
          ) : null}
        </p>
      </div>
      <div className="mt-8">
        <InquiriesTable rows={rows} />
      </div>
    </div>
  );
}
