export default function ToolStatus({ date }: { date: string }) {
  const isNew = new Date(date) > new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  // ignore the dates for now
  // if (!isNew) {
  if (isNew != null) {
    return null;
  }

  return (
    <div className="uppercase text-[10px] w-fit font-dm-mono font-medium leading-[130%] text-[#F4EEE2] py-1 px-2.5 rounded-2xl bg-[#F45757]">
      New
    </div>
  );
}
