import Layout  from '../components/layout'
import Link from "next/link";
import Date from "../components/date";
import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from "../utils/posts";
import Head from "next/head";

const blogTitle = "Your's Blog"

// 接收从 getStaticProps 返回的数据
export default function Home({ allPostsData }) {
  return (
    <Layout>
      {/* 标签页名称 */}
      <Head>
        <title>{ blogTitle }</title>
      </Head>

      {/* 文章列表 */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>博客列表</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// 获取项目中的静态资源
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
