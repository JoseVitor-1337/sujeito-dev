import styles from "./styles.module.scss";
import Imagem from "next/image";
import Link from "next/link";
import logo from "../../../public/images/logo.svg";
import { ActiveLink } from "../ActiveLink";
import { useMemo } from "react";

export function Header() {
  const links = useMemo(() => {
    return [
      {
        path: "/",
        label: "Home",
      },
      {
        path: "/posts",
        label: "Conteúdos",
      },
      {
        path: "/sobre",
        label: "Quem somos?",
      },
    ];
  }, []);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link passHref href="/">
          <Imagem src={logo} alt="Sujeito programado" />
        </Link>

        <nav>
          {links.map((link) => (
            <ActiveLink key={link.path} link={link} />
          ))}
        </nav>

        <a
          className={styles.readyButton}
          type="button"
          href="https://sujeitoprogramador.com"
        >
          COMEÇAR
        </a>
      </div>
    </header>
  );
}
