import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ErrorSectionProps = {
  errorHeading: string;
  errorMessage?: string | null;
  sectionHeight?: string;
};

export default function ErrorSection({
  errorHeading,
  errorMessage,
  sectionHeight = "50vh",
}: ErrorSectionProps) {
  return (
    <div
      className={`min-h-[${sectionHeight}] flex flex-col items-center justify-center gap-2 p-6 text-center text-sm text-red-500 bg-red-100 border border-red-200 rounded-xl`}
    >
      <p className="text-sm md:text-lg font-semibold">{errorHeading}</p>
      <p className="font-medium">{errorMessage}</p>
    </div>
  );
}
