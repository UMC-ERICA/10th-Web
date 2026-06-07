interface RouteProps {
  path: string;
  element: React.ReactNode;
  currentPath?: string;
}

const Route = ({ path, element, currentPath }: RouteProps) => {
  if (path === currentPath) {
    return <>{element}</>;
  }

  if (path === "*") {
    return <>{element}</>;
  }

  return null;
};

export default Route;