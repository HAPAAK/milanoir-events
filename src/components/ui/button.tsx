import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-semibold transition-[transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_25px_rgba(66,130,255,0.35)] hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(66,130,255,0.4)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_8px_20px_rgba(255,0,72,0.3)] hover:-translate-y-0.5",
        outline:
          "border border-primary/60 text-primary hover:bg-primary/10 shadow-[0_5px_15px_rgba(64,93,230,0.25)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_8px_20px_rgba(20,20,40,0.5)] hover:-translate-y-0.5",
        ghost: "text-foreground hover:bg-foreground/10",
        link: "text-primary underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        style={style}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
