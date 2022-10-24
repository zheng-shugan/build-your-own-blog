import { useEffect } from "react";

import Layout from "../../components/layout";

import { getAllPostIds, getPostData } from "../../utils/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';

// github 样式文件
import "highlight.js/styles/github.css";
// highlight.js 核心
import hljs from "highlight.js/lib/core";
// 单独使用js部分
import javascript from "highlight.js/lib/languages/javascript";

// 注册需要高亮的语言
const heightLanguage = ["javascript", "cpp", "css", "html", "typescript", "java", "rust", "go"]
heightLanguage.map((lang) => {
  hljs.registerLanguage(lang, javascript)
})

// 文章组件
export default function Post({ postData }) {
  // 代码高亮
  useEffect(() => {
    hljs.configure({
      ignoreUnescapedHTML: true
    })
    const codes = document.querySelectorAll('pre code')
    codes.forEach((el) => {
      hljs.highlightElement(el)
    })
  }, [])

  return (
    <Layout blog>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        {/* 文章标题 */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        {/* 发布时间 */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/* 文章内容 */}
        <article className="md">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHTML }} />
        </article>
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}
