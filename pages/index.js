import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'

import utilStyles from '../styles/utils.module.css'

import { getSortedPostsData } from "../utils/posts";

// 接收从 getStaticProps 返回的数据
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* 以下部分换成自己的个人介绍就好～ */}
      <section className={utilStyles.headingMd}>
        前端开发&nbsp;/&nbsp;大三&nbsp;&nbsp;/&nbsp;福州
      </section>
      <p>Hey，我是网络专业的大三学生郑书淦</p>
      <p>目前在学习 Vue 及其周边生态</p>
      <p>
        我喜欢编程、享受代码带来的正反馈、发现新技术，并构建出实用/好用的软件。
        同时我也是一个科技爱好者，对新科技、新技术也很感兴趣。
      </p>
      <p>
        在课余时间我会在博客上写下一些我在学习时候遇到的坑，以及对某技术的看法。
        未来也许也会在各个平台上分享。
      </p>
      <p>
        你可以在 <a href="https://space.bilibili.com/99041702" target="_blank" rel="noreferrer">
        B 站</a>，
        <a href="https://github.com/zheng-shugan" target="_blank" rel="noreferrer">Github</a> 上找到我。也可以通过邮箱
        <a href="mailto:zhengshugan@foxmail.com">zhengshugan@foxmail.com</a>来找到我。
      </p>
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
