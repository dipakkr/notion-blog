const socialURLs = [
  `https://twitter.com/HQdeepak`,
  `https://github.com/dipakkr`,
  `https://linkedin.com/in/dipakkr`,
]

const Footer = () => (
  <footer className="footer-container">
    <div className="f-item-container">
      <div className="footer-title">
        <p className="about">About this place</p>
        <p> Welcome to my digital garden </p>
      </div>

      <div className="footer-content">
        <p className="mt-1">
          I'm Deepak, a software engineer. On this site, I occasionally write
          about programming tutorials, tips and tricks and my experiments with
          life. You can find me on{' '}
          <a href="https://www.linkedin.com/in/dipakkr/">
            Linkedin or <a href="https://twitter.com/HQdeepak"> Twitter </a>
          </a>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
