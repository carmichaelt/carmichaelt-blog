import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
      {children}
    </h1>
  );
}