import { GetServerSideProps } from 'next'
import Image from "next/image";
import Head from "next/head";
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from "../../../services/prismic";

import styles from "./styles.module.scss";
import { get } from 'https';

type Post = {
  title: string;
  slug: string;
  description: string;
  cover: string;
  updatedAt: string;
}

type IPostsProps = {
  post: Post,
} 

export default function PostDetails({ post }: IPostsProps) {

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <Image
            width={720}
            height={410}
            quality={100}
            src={post.cover}
            alt={post.title}
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcvehUPQAGbwKIN//eWAAAAABJRU5ErkJggg=='
            placeholder='blur'
          />
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post.description}} />
        </article>
      </main>
    </>
  );
}
 
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const { slug } = params

  const prismic = getPrismicClient()

  const response = await prismic.getByUID("post", String(slug), { })

  if (!response) { 
    return {
      redirect: {
        destination: "/posts",
        permanent: false
      },
    }
  }

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    description: RichText.asHtml(response.data.description),
    cover: response.data.cover.url,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString("pt-Br", { day: "2-digit", month: "long", year: "numeric"})
  }

  return {
    props: {
      post
    },
  }
}