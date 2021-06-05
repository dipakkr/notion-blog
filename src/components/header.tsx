import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navigation = [
  { href: '/', name: 'Home' },
  { href: '/blog', name: 'Blog' },
  { href: '/cheatsheets', name: 'Cheatsheets' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

const Header = ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <div className="navbar-section">
      <div className="navbar-container w-container">
        <div className="navigation-div">
          <div className="nav-name-div">
            <a href="/" className="navigation-link">
              Deepak Kumar{' '}
            </a>
          </div>
          <div className="nav-links-div">
            <div className="nav-secondary-div no-padding-left">
              <a
                href="/blog"
                aria-current="page"
                className="navigation-link-secondary w--current"
              >
                Blog
              </a>
            </div>
            <div className="nav-secondary-div">
              <a href="/newsletter" className="navigation-link-secondary">
                Newsletter
              </a>
            </div>
            <div className="nav-secondary-div no-padding-right">
              <a href="/programmatic-seo" className="navigation-link-secondary">
                About
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
