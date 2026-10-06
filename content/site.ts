// 網站基本資料：結構化資料、sitemap、分享預覽都會用到這裡。
// 換成自己的網域時，改 url（或在 Vercel 設定環境變數 NEXT_PUBLIC_SITE_URL）。
export const site = {
  name: '美國生活筆記',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://meiguo-notes-nextjs.vercel.app').replace(/\/$/, ''),
  description: '把在美國生活遇到的事情，整理成用得上的中文實用筆記。',
  // 作者：會顯示在「關於我」與每篇文章，也會寫進結構化資料。
  author: '美國生活筆記',
  // 作者的一句話介紹（關於我頁面最上方）。
  authorTagline: '在美國東岸生活的台灣人，把自己走過的流程整理成筆記，避免自己忘記，也希望能幫助更多人。',
  logo: '/images/jollux-bear-mark.png',
  locale: 'zh_TW',
  // Google Analytics 4 的評估 ID；留空字串就不載入。
  gaId: 'G-L1TM8KWDTH',
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`
}
