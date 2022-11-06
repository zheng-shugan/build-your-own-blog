import fs from 'fs'
import path from 'path'
// 格式化 markdown 文章
import matter from "gray-matter";

import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = () => {
  // 获得在 /posts 文件夹里的 .md 文件
  const fileNames = fs.readdirSync(postsDirectory);
  // 移除 .DS_Store 文件
  const postNames = fileNames.filter((file) => file !== '.DS_Store')
  const allPostsData = postNames.map((postName) => {
    // 移除 .md 的扩展名，获取 id
    const id = postName.replace(/\.md$/, '')

    // 用字符串存储 markdown 文章
    const fullPath = path.join(postsDirectory, postName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 使用 gray-matter 解析文章数据部分
    const matterResult = matter(fileContents)

    // 返回文章 id 和内容
    return {
      id,
      ...matterResult.data
    }
  })

  // 按文章日期排序
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  })
}

export const getAllPostIds = () => {
  // 返回一个像这样的数组
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  // 获取所有 markdown 文章名
  let fileNames = fs.readdirSync(postsDirectory)
  fileNames = fileNames.filter((name) => name !== '.DS_Store')

  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id) {
  // 找到文章路径
  const fullPath = path.join(postsDirectory, `${id}.md`)
  // 读取文章数据
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // 使用 gray 格式化文章数据
  const matterResult = matter(fileContents)

  // 使用 remark 将 markdown 转成 HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHTML = processedContent.toString()

  // 返回一个带有 id 的对象
  // contentHTML: 生成的 HTML 数据
  // ...matterResult.data
  return {
    id,
    contentHTML,
    ...matterResult.data
  }
}
