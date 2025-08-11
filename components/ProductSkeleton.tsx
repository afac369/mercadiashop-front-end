export default function ProductSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-[4/3] rounded-xl bg-white/10" />
      <div className="mt-3 h-4 w-2/3 rounded bg-white/10" />
      <div className="mt-2 h-3 w-4/5 rounded bg-white/10" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-5 w-20 rounded bg-white/10" />
        <div className="h-9 w-24 rounded-xl bg-white/10" />
      </div>
    </div>
  );
}
