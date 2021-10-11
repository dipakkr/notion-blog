const socialURLs = [
  `https://twitter.com/HQdeepak`,
  `https://github.com/dipakkr`,
  `https://linkedin.com/in/dipakkr`,
]

const Footer = () => (
  <footer className="footer-container">
    <div className="f-item-container">
      <div className="footer-title">
        <p className="about">About me</p>
      </div>

      <div className="footer-content">
        <p className="mt-1">
          I'm Deepak, a software engineer, blogger and indie maker. I loved to
          write and build scalable tech product.
        </p>
        <p>
          <a href="https://twitter.com/HQdeepak"> Twitter </a> |{' '}
          <a href="https://www.linkedin.com/in/dipakkr/">Linkedin</a>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
