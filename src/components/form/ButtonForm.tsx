import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  variant?: "default" | "outline" | "secondary" | "destructive" | "link" |"bg_lener";
  size?: "default" | "sm" | "lg";
}

export const ButtonForm = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      link: "text-blue-600 underline-offset-4 hover:underline",
      bg_lener: "bg-gradient-to-br from-[#0f766e] to-[#059669]  text-white shadow-theme-xs",
    };

    const sizeClasses = {
      sm: "h-9 px-3 text-xs",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-lg",
    };

    return (
      <button
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 
                   focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none 
                   ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
        ref={ref}
        {...props}
      />
    );
  }
);

ButtonForm.displayName = "ButtonForm";
