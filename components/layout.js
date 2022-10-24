import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import NavBar from "./NavBar";

const name = 'Your Name'
export const siteTitle = "Your's Blog"

export default function Layout({ children, home, blog }) {
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <Image
                priority
                src="/images/profile.png"
                className={utilStyles.borderCircle}
                height={144}
                width={144}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <></>
          )}
        </header>

        <main>{children}</main>
        {!home && !blog && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← 回到主页</a>
            </Link>
          </div>
        )}
        {!home && blog && (
          <div className={styles.backToHome}>
            <Link href="/blog">
              <a>← 返回</a>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
