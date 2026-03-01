import { LucideLoaderCircle } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex-1 flex flex-col place-items-center self-center">
      <LucideLoaderCircle className="w-16 h-16 animate-spin" />
    </div>
  );
};
