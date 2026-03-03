import type { SVGProps } from "react";

type IconName =
  | "dashboard"
  | "users"
  | "user"
  | "transactions"
  | "withdrawals"
  | "jobs"
  | "referrals"
  | "account"
  | "ticket"
  | "logout"
  | "search"
  | "bell"
  | "chevron"
  | "menu";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case "dashboard":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M4 13h7V4H4v9zm9 7h7V11h-7v9zM4 20h7v-5H4v5zm9-16v5h7V4h-7z"
            fill="currentColor"
          />
        </svg>
      );
    case "users":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M16 11c1.66 0 3-1.34 3-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z"
            fill="currentColor"
          />
        </svg>
      );
    case "user":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z"
            fill="currentColor"
          />
        </svg>
      );
    case "transactions":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M16 17l5-5-5-5v3H4v4h12v3z"
            fill="currentColor"
          />
        </svg>
      );
    case "withdrawals":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h1zm-7 16h14v2H5v-2z"
            fill="currentColor"
          />
        </svg>
      );
    case "jobs":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M10 2h4a2 2 0 0 1 2 2v2h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2zm4 4V4h-4v2h4z"
            fill="currentColor"
          />
        </svg>
      );
    case "referrals":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 7V3.5L19.5 9H15z"
            fill="currentColor"
          />
        </svg>
      );
    case "account":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z"
            fill="currentColor"
          />
        </svg>
      );
    case "ticket":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M20 5H4a2 2 0 0 0-2 2v2.5a1 1 0 0 0 1 1 1.5 1.5 0 0 1 0 3 1 1 0 0 0-1 1V17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2.5a1 1 0 0 0-1-1 1.5 1.5 0 0 1 0-3 1 1 0 0 0 1-1V7a2 2 0 0 0-2-2zm-9 11H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V6h2v2z"
            fill="currentColor"
          />
        </svg>
      );
    case "logout":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M10 17l1.41-1.41L8.83 13H21v-2H8.83l2.58-2.59L10 7l-7 7 7 7zm-6 4h8v-2H4V5h8V3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"
            fill="currentColor"
          />
        </svg>
      );
    case "search":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill="currentColor"
          />
        </svg>
      );
    case "bell":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5L4 18v1h16v-1l-2-2z"
            fill="currentColor"
          />
        </svg>
      );
    case "chevron":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            fill="currentColor"
          />
        </svg>
      );
    case "menu":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <path
            d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            fill="currentColor"
          />
        </svg>
      );
    default:
      return null;
  }
}
