import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-logo" href="/" aria-label="美國生活筆記首頁"><img className="logo-mark bear-mark" src="/images/jollux-bear-mark.png" alt="" /> 美國生活筆記</Link>
      <nav className="site-nav" aria-label="主要導覽">
        <Link href="/about">關於我</Link>
      </nav>
    </header>
  )
}
