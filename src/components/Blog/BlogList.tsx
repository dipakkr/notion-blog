import Link from 'next/link'
import { getBlogLink, getDateStr } from '../../lib/blog-helpers'

import blogStyles from '../../styles/blog.module.css'

const BlogList = ({ posts, title = 'Posts' }) => {
  return (
    <div className="x-container">
      <h3> Posts </h3>

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

            {post.Date && <div className="posted">{getDateStr(post.Date)}</div>}

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
  )
}

export default BlogList
