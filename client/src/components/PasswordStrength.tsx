import { checkPasswordStrength } from "../utils/validatePassword";
import { CheckCircle, XCircle } from "lucide-react";

export default function PasswordStrength({ password }: { password: string }) {
  const checks = checkPasswordStrength(password);

  const Rule = ({
    label,
    passed,
  }: {
    label: string;
    passed: boolean;
  }) => (
    <div className="flex items-center gap-2 text-sm">
      {passed ? (
        <CheckCircle className="text-green-400 w-4 h-4" />
      ) : (
        <XCircle className="text-red-400 w-4 h-4" />
      )}
      <span className={passed ? "text-green-400" : "text-red-400"}>{label}</span>
    </div>
  );

  return (
    <div className="mt-2 space-y-1">
      <Rule label="At least 8 characters" passed={checks.length} />
      <Rule label="Includes uppercase letter" passed={checks.uppercase} />
      <Rule label="Includes number" passed={checks.number} />
      <Rule label="Includes special character (!@#$%^&*)" passed={checks.special} />
    </div>
  );
}
