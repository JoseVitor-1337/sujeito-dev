import { GetStaticProps } from 'next'
import { useCallback, useState } from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

import styles from "./styles.module.scss";
import thumb from "../../../public/images/thumb.png";
import { getPrismicClient } from "../../services/prismic";


type Post = {
  title: string;
  slug: string;
  description: string;
  cover: string;
  updatedAt: string;
}

type IPostsProps = {
  posts: Post[],
  page: number,
  totalPages: number
} 


export default function Posts({ posts: postsBlog, page, totalPages }: IPostsProps) {
  const [currentPage, setCurrentPage] = useState(Number(page))

  const [posts, setPosts] = useState(postsBlog || [])

  const requestPost = useCallback(async (pageNumber: number) => {
    const prismic = getPrismicClient()

    const response = await prismic.query([  
      Prismic.Predicates.at("document.type", "post")], 
      { 
        orderings: "[document.last_publication_date desc]",  
        fetch: ["post.title", "post.description", "post.cover"], 
        pageSize: 1,
        page: String(pageNumber)
      })

      return response
   }, [])

  const navigatePage = useCallback(async (pageNumber: number) => {
    const response = await requestPost(pageNumber)

    if (response.results.length === 0) return

    const newPosts = response.results.map(post => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        description: post.data.description.find((content) => content.type === "paragraph")?.text ?? "",
        cover: post.data.cover.url,
        updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-Br", { day: "2-digit", month: "long", year: "numeric"})
      }
    })

    setCurrentPage(pageNumber)
    setPosts(newPosts)
  }, [requestPost])

  return (
    <>
      <Head>
        <title>Blog | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <Image
                  width={720}
                  height={410}
                  quality={100}
                  src={post.cover}
                  alt={post.title}
                  blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcvehUPQAGbwKIN//eWAAAAABJRU5ErkJggg=='
                  placeholder='blur'
                />

                <strong>{post.title}</strong>
                <time>{post.updatedAt}</time>
                <p>{post.description}</p>
              </a>
            </Link>
          ))} 

          <div className={styles.buttonNavegate}>
            {Number(currentPage) >= 2 && (
              <div>
                <button onClick={() => navigatePage(1)}>
                  <FiChevronsLeft size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(currentPage - 1)}>
                  <FiChevronLeft size={25} color="#FFF" />
                </button>
              </div>
            )}
          
            {Number(currentPage) < Number(totalPages) && (
              <div>
                <button onClick={() => navigatePage(currentPage + 1)}>
                  <FiChevronRight size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(Number(totalPages))}>
                  <FiChevronsRight size={25} color="#FFF" />
                </button>
              </div>
            )}

           </div>
        </div>
      </main>
    </>
  );
}
 
export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([  
    Prismic.Predicates.at("document.type", "post")], 
    { 
      orderings: "[document.last_publication_date desc]",  
      fetch: ["post.title", "post.description", "post.cover"], 
      pageSize: 1
    },
    )

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description: post.data.description.find((content) => content.type === "paragraph")?.text ?? "",
      cover: post.data.cover.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-Br", { day: "2-digit", month: "long", year: "numeric"})
    }
  })

  return {
    props: {
      posts,
      page: response.page,
      totalPages: response.total_pages
    },
    revalidate: 60 * 30 // Atualiza a cada 30 minutos.
  }
}