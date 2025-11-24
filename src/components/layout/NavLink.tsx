"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<LinkProps, "href"> {
  href: LinkProps["href"];
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName: _pending, href, ...props }, ref) => {
    const pathname = usePathname();

    const hrefString = typeof href === "string" ? href : "";
    const targetPath = hrefString.split("#")[0];
    const isActive = targetPath ? pathname === targetPath : pathname === hrefString;

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
