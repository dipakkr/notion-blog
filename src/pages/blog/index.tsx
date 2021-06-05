import Link from 'next/link'

import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'

import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'
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

const Index = ({ posts = [], preview }) => {
  return (
    <>
      <Head>
        <title> Blog | Deepak Kumar, Software Engineer @ Airneet</title>
        <meta
          property="og:title"
          content="Deepak Kumar | Welcome to my second brain"
          key="title"
        />
      </Head>

      <div className="x-container">
        {preview && (
          <div className={blogStyles.previewAlertContainer}>
            <div className={blogStyles.previewAlert}>
              <b>Note:</b>
              {` `}Viewing in preview mode{' '}
              <Link href={`/api/clear-preview`}>
                <button className={blogStyles.escapePreview}>
                  Exit Preview
                </button>
              </Link>
            </div>
          </div>
        )}
        <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
          <h1 className="page-heading"> ✍️ All Posts </h1>
          {posts.length === 0 && (
            <p className={blogStyles.noPosts}>There are no posts yet</p>
          )}
          {posts.map((post) => {
            return (
              <div className={blogStyles.postPreview} key={post.Slug}>
                <h3>
                  <span className={blogStyles.titleContainer}>
                    {!post.Published && (
                      <span className={blogStyles.draftBadge}>Draft</span>
                    )}
                    <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                      <a>{post.Page}</a>
                    </Link>
                  </span>
                </h3>

                {/* {post.Authors.length > 0 && (
                <div className="authors">By: {post.Authors.join(' ')}</div>
              )} */}

                {post.Date && (
                  <div className="posted">{getDateStr(post.Date)}</div>
                )}

                {/* <p>
                {(!post.preview || post.preview.length === 0) &&
                  'No preview available'}
                {(post.preview || []).map((block, idx) =>
                  textBlock(block, true, `${post.Slug}${idx}`)
                )}
              </p> */}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Index
