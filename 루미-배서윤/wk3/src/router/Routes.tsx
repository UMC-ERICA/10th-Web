import React from "react";
import useCurrentPath from "./useCurrentPath";

interface RoutesProps {
  children: React.ReactNode;
}

const Routes = ({ children }: RoutesProps) => {
  const currentPath = useCurrentPath();

  return (
    <>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { currentPath })
      )}
    </>
  );
};

export default Routes;