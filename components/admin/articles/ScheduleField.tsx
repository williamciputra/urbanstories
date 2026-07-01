"use client";

type ScheduleFieldProps = {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

export default function ScheduleField({
  date,
  time,
  onDateChange,
  onTimeChange,
}: ScheduleFieldProps) {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900">
        Publish Schedule
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="publish-date"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Publish Date
          </label>

          <input
            id="publish-date"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
          />
        </div>

        <div>
          <label
            htmlFor="publish-time"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Publish Time
          </label>

          <input
            id="publish-time"
            type="time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-black"
          />
        </div>
      </div>
    </div>
  );
}