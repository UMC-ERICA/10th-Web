import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export default function FormInput({ error, className, ...props }: Props) {
  return (
    <div>
      <input
        className={`w-full rounded-md border border-gray-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:border-pink-500 ${className ?? ''}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
