import { memo } from 'react'
import Head from 'next/head'

type IHeadProps = {
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
  googlePublisher?: string;
  siteName?: string;
  author?: string;
  siteType?: string;
  title: string;
  url: string;
  description: string;
  image: string;
  robots?: string;
}

function SEO({
  twitterCard = 'summary',
  twitterSite,
  twitterCreator,
  siteName,
  siteType = "website",
  description,
  author,
  title,
  url,
  image,
  robots = 'index, noFollow',
  googlePublisher
}: IHeadProps ) {
  return (
    <Head>
      <meta charSet="UTF-8" />

      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {url && <link rel="canonical" href={url} />}
      {author && <meta name="author" content={description} />}
      {author && <meta name="robots" content={robots} />}

      {title && <meta itemProp="name" content={title} />}
      {description && <meta itemProp="description" content={description} />}
      {image && <meta itemProp="image" content={image} />}
      {googlePublisher && <link itemProp={googlePublisher} rel="publisher" />}

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      {siteType && <meta property="og:type" content={siteType} />}
      {image && <meta property="og:image" content={image} />}

      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {url && <meta name="twitter:url" content={url} />}
      {twitterCard && <meta name="twitter:card" content={twitterCard} />}
      {image && <meta name="twitter:image" content={image} />}
      {twitterCreator && (
        <meta name="twitter:creator" content={twitterCreator} />
      )}
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
    </Head>
  )
}

export default memo(SEO)
