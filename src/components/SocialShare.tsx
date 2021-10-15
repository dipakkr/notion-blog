const SocialShare = (props) => {
  return (
    <>
      <a
        className="twitter-share-button"
        href={`https://twitter.com/intent/tweet?text=${
          `I just read - \n ` + props.content
        } via @HQdeepak`}
      >
        Tweet
      </a>
    </>
  )
}

export default SocialShare
