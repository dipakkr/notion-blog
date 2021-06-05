import sharedStyles from '../styles/shared.module.css'

import { postIsPublished } from '../lib/blog-helpers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'
import BlogList from '../components/Blog/bloglist'
import Head from 'next/head'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

export default function Index({ posts = [], preview }) {
  return (
    <>
      <Head>
        <title> Deepak Kumar - Welcome to my second brain </title>
        <meta
          property="og:title"
          content="Deepak Kumar | Welcome to my second brain"
          key="title"
        />
      </Head>
      <div className={sharedStyles.layout}>
        <div className="x-container">
          <h1>👋 Hi, I'm Deepak</h1>

          <p>
            I'm a software engineer. I love building SaaS for makers and
            developers 💚. I share my journey daily on Twitter.
          </p>
        </div>
        <BlogList posts={posts.slice(0, 5)} />
      </div>
    </>
  )
}
