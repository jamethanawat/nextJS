import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AuditLogFooterProps = {
  createdDate?: string | null;
  createdBy?: string | null;
  updatedDate?: string | null;
  updatedBy?: string | null;
  className?: string;
};

type AuditFieldProps = {
  label: string;
  value?: string | null;
};

function AuditField({ label, value }: AuditFieldProps) {
  return (
    <div className="grid grid-cols-10 items-center gap-2">
      <Label className="col-span-4 text-right text-xs">{label}</Label>
      <div className="col-span-6">
        <Input
          readOnly
          value={value && value.trim() ? value : "-"}
          className="h-8 text-center text-xs"
        />
      </div>
    </div>
  );
}

export default function AuditLogFooter({
  createdDate,
  createdBy,
  updatedDate,
  updatedBy,
  className,
}: AuditLogFooterProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800",
        className
      )}
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-x-6">
        <AuditField label="Created Date :" value={createdDate} />
        <AuditField label="Created By :" value={createdBy} />
        <AuditField label="Updated Date :" value={updatedDate} />
        <AuditField label="Updated By :" value={updatedBy} />
      </div>
    </div>
  );
}
