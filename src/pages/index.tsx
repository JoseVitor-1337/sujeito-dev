import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/home.module.scss";

import techs from "../../public/images/techs.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Sujeito Programador</title>
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

            <div>
              <Link passHref href="/">
                <button>COMEÇAR AGORA</button>
              </Link>
            </div>
                    
          </section>
             <Image
              width={400}
              height={400}
              src="/images/banner-conteudos.png"
              alt="Banner do Sujeito Programador"
            />
 
        </div>

        <hr className={styles.divider} />

        <div className={styles.sectionContent}>
          <section>
            <h2>Aprenda criar aplicativos para Android e IOS</h2>
            <span>
              Você vai descobrir o jeito mais moderno de desenvolver apps
              nativos para IOS e Android, construindo aplicativos do zero até o
              deploy
            </span>
          </section>

          <Image
            width={400}
            height={400}
            src="/images/financasApp.png"
            alt="Conteúdo de desenvolvimento de Apps "
          />
        
        </div>

        <hr className={styles.divider} />

        <div className={styles.sectionContent}>

          <Image
            width={400}
            height={400}
            src="/images/webDev.png"
            alt="Conteúdo de desenvolvimento de aplicações WEB"
          />

          <section>
            <h2>Aprenda criar sistemas WEB</h2>
            <span>
              Criar sistemas web, sites usando as tecnologias mais modernas e
              requisitadas pelo mercado.
            </span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techs} alt="Tecnologias" />
          <h2>
            Mais de <span className={styles.studants}>15 mil</span> já levaram
            sua carreira para o próximo nível
          </h2>
          <span>
            E você vai perder a chance de evoluir de uma vez por todas?
          </span>
          <a>
            <button>COMEÇAR AGORA!</button>
          </a>
        </div>
      </main>
    </>
  );
}
