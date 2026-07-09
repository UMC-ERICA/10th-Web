import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled,
  className,
  ...props
}: Props) {
  const base = `rounded-md py-3 font-semibold transition${fullWidth ? ' w-full' : ''}`;

  const styles: Record<Variant, string> = {
    primary: disabled
      ? 'cursor-not-allowed bg-gray-700 text-gray-400'
      : 'bg-pink-500 text-white hover:bg-pink-400',
    outline: 'border border-gray-600 text-white hover:bg-zinc-800',
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${styles[variant]} ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
