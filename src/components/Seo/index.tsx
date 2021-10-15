import { Head } from 'next/document'

const SeoData = ({ title, description }) => {
  return (
    <Head>
      <title> {title}</title>
      <meta property="og:title" content={title} key="title" />
      <meta property="og:type" content="website" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={''} property="og:image" />
      <meta content={title} property="twitter:title" />
      <meta content={description} property="twitter:description" />
      <meta content={''} property="twitter:image" />
    </Head>
  )
}

export default SeoData
