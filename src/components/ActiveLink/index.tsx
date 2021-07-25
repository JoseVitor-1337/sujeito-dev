import { useRouter } from "next/dist/client/router";
import Link from "next/link";

interface IActiveLinkProps {
  link: {
    label: string;
    path: string;
  };
}

export function ActiveLink({ link }: IActiveLinkProps) {
  const { asPath } = useRouter();

  const activeStyle =
    asPath === link.path ? { color: "var(--yellow-500)", fontWeight: 700 } : {};

  return (
    <Link href={link.path}>
      <a style={activeStyle}>{link.label}</a>
    </Link>
  );
}
