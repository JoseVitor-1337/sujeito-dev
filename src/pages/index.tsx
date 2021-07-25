import Head from "next/head";

import styles from "../styles/home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sujeito Dev - Home</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.header}>
          <section className={styles.ctaText}>
            <h1>Levando você para o próximo nível</h1>
            <span>
              Uma plataforma com cursos que vão do zero até o profissional na
              prática, direto ao ponto aplicando o que usamos no mercado de
              trabalho
            </span>

            <a href="">
              <button>COMEÇAR AGORA </button>
            </a>
          </section>
          <img src="/images/banner-conteudos.png" alt="Banner" />
        </div>
      </main>
    </>
  );
}
