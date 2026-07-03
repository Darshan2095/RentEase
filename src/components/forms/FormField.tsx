import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface FormFieldWrapperProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
  required?: boolean;
}

export default function FormFieldWrapper({
  label,
  htmlFor,
  error,
  children,
  required,
}: FormFieldWrapperProps) {
  return (
    <div className="flex flex-col space-y-2 w-full group/field">
      {/* Label Layer Container */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="text-[13px] font-semibold tracking-tight text-[#111827] select-none transition-colors duration-200 group-focus-within/field:text-[#2563EB] pointer-events-auto"
        >
          {label}
          {required && (
            <span className="ml-1 text-[#EF4444] font-bold select-none" aria-hidden="true">
              *
            </span>
          )}
        </label>
      </div>

      {/* Embedded Input Component Slot */}
      <div className="relative w-full">
        {children}
      </div>

      {/* Premium Contextual Validation State Container */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-out flex items-center
          ${error 
            ? "max-h-6 opacity-100 mt-1" 
            : "max-h-0 opacity-0 mt-0 pointer-events-none"
          }`}
        role="alert"
        aria-live="polite"
      >
        {error && (
          <div className="flex items-center space-x-1.5 text-[#EF4444]">
            <AlertCircle className="h-3.5 w-3.5 shrink-0 stroke-[2]" />
            <p className="text-[12px] font-medium tracking-tight leading-none">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}