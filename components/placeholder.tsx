import { LucideMessageSquareWarning } from "lucide-react";

type PlaceholderProps = {
  label: string;
  renderIcon?: (className: string) => React.ReactElement;
  renderButton?: (className: string) => React.ReactElement;
};

const Placeholder = ({
  label,
  renderIcon = (className: string) => (
    <LucideMessageSquareWarning className={className} />
  ),
  renderButton = (className: string) => <div className={className} />
}: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {renderIcon("w-16 h-16")}
      <h2 className="text-lg text-center">{label}</h2>
      {renderButton("h-9")}
    </div>
  );
};

export { Placeholder };
