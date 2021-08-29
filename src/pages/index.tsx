import sharedStyles from '../styles/shared.module.css'

import { postIsPublished } from '../lib/blog-helpers'
import getNotionUsers from '../lib/notion/getNotionUsers'
import getBlogIndex from '../lib/notion/getBlogIndex'
import BlogList from '../components/Blog/BlogList'
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
            Hi, I am Deepak from 🇮🇳. I am{' '}
            <b> software engineer, open sourcer and writer</b>. I built this
            place to document my journey of learning, building new products and
            sharing new ideas. I'm also very passionate about building a
            business that has a great impact on society.
          </p>

          <p>
            After completing my engineering in 2019, I started working on my
            startup,{' '}
            <a href="https://feedingtrends.com/front-bench-startup-in-ed-tech-sector-founders-funding-future-goals-vision-mission">
              Frontbench{' '}
            </a>{' '}
            - an online marketplace for mentorship, to help students get better
            guidance. In a span of 6 months,{' '}
            <b>
              {' '}
              we built a community of 10k students across 50+ campuses across
              India.
            </b>{' '}
            We had product, we had community, but we were not clear about our
            business model, So we shut it down.
          </p>

          <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1625607974761/-Lk6h2KN9.jpeg" />

          <p>
            I then worked with multiple startup like
            <b> FluxAuto, 91wheels, and Airmeet(now)</b> to build software
            products. With this blog, I am trying to develop a more consistent
            habit of writing online and sharing my thought and experiments.
          </p>

          <p>
            As naval rightly says, Learn to build & Learn to sell. And, you will
            unstoppable.
          </p>

          <p>
            {' '}
            Say Hi 👋 on <a href="https://twitter.com/HQdeepak">
              Twitter{' '}
            </a>{' '}
          </p>
        </div>
        <BlogList posts={posts.slice(0, 5)} />
      </div>
    </>
  )
}
