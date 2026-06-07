import { navigateTo } from "./utils";

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo(to);
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;