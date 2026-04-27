import GroupsListing from "@/components/GroupsListing";

export default function GroupsPage() {
  return (
    <main>
      <h1 className="text-3xl font-black text-slate-950">Areas by group</h1>
      <p className="mt-2 text-sm font-semibold text-slate-600">
        Search or filter by region, then browse Group A, B, and C.
      </p>
      <div className="mt-6">
        <GroupsListing />
      </div>
    </main>
  );
}
