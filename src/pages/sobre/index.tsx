import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Head from "next/head";
import Image from "next/image";
import styles from "./styles.module.scss";
import { getPrismicClient } from "../../services/prismic";

import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

type About = {
  title: string;
  description: string;
  banner: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

type IAboutProps = {
  about: About,
} 

export default function About({ about }: IAboutProps) {
  console.log(`about`, about)
 
  return (
    <>
      <Head>
        <title>Sobre | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.content}>
            <h1>{about.title}</h1>
            <p>{about.description}</p>

            <a href={about.youtube}>
              <FaYoutube size={40} />
            </a>
            <a href={about.instagram}>
              <FaInstagram size={40} />
            </a>
            <a href={about.facebook}>
              <FaFacebook size={40} />
            </a>
            <a href={about.linkedin}>
              <FaLinkedin size={40} />
            </a>

          </section>


          <Image src={about.banner} alt={about.title} width={720} height={720} />
        </div>
      
      </main>
    </>
  );
}
 
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([Prismic.Predicates.at("document.type", "about")])

  const {title, description, banner, facebook, instagram, youtube, linkedin } = response.results[0].data

  const about = {
    title: RichText.asText(title),
    description: RichText.asText(description),
    banner: banner.url,
    facebook: facebook.url,
    instagram: instagram.url,
    youtube: youtube.url,
    linkedin: linkedin.url,
  }

  return {
    props: { about },
    revalidate: 2 * 60 * 60
  }
}