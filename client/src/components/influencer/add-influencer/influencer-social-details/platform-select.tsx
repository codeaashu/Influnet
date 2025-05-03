import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface PlatformSelectProps {
  name: string; // "platform.platform_id"
  platforms: { platform_name: string; id: string }[];
}

export default function PlatformSelect({
  name,
  platforms,
}: PlatformSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="w-full">
          <label
            htmlFor="platform-select"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Platform
          </label>
          <div className="relative">
            <select
              id="platform-select"
              value={field.value || ""}
              onChange={field.onChange}
              className="peer w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>
                Select a platform
              </option>
              {platforms.map((platform) => {
                return (
                  <option key={platform.id} value={platform}>
                    {platform.platform_name}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 14a1 1 0 01-.7-.3l-5-5a1 1 0 111.4-1.4L10 11.6l4.3-4.3a1 1 0 111.4 1.4l-5 5a1 1 0 01-.7.3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    />
  );
}
