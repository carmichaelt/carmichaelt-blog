export function DateFormatter({ date }: { date: string }) {
  if (!date) return null;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;

  return (
    <time dateTime={date} className="text-sm text-zinc-500">
      {new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(parsed)}
    </time>
  );
}
