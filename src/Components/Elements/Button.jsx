import { cva } from "class-variance-authority";

const button = cva("rounded-full px-6 duration-200 text-[13px] font-bold cursor-pointer", {
  variants: {
    variant: {
      primary: "text-white bg-main-purple hover:bg-main-purple-hover",
      secondary: "text-main-purple bg-main-purple/10 hover:bg-main-purple/25",
      destructive: "text-white bg-red hover:bg-red-hover",
    },
    size: {
      sm: "h-10",
      lg: "h-12",
    },
    fullWidth: {
      true: "w-full",
    },
    disabled: {
      true: "cursor-not-allowed opacity-25 hover:bg-main-purple",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {"primary" | "secondary" | "destructive"} props.variant - The visual style of the button.
 * @param {"sm" | "lg"} props.size - The size of the button.
 * @param {boolean} props.fullWidth - Whether the button should take the full width of its container.
 * @param {string} props.className - Additional CSS classes to apply to the button.
 * @param {boolean} props.disabled - Whether the button is disabled.
 * @returns {JSX.Element}
 */
export function Button (props) {
  const { children, variant, size, fullWidth, className, disabled, ...rest } = props;
  return (
    <button
      className={button({ variant, size, fullWidth, className, disabled })}
      {...rest}
    >
      {children}
    </button>
  );
};
