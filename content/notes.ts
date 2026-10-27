// Note catalog：所有筆記和主題分類的唯一來源。頁面、sitemap 和結構化資料都從這裡取資料。
// 正文放在 content/notes/<slug>.mdx，檔名必須和 slug 相同；npm run check 會檢查。

// 主題有自己的頁面；新增主題時，在這裡加一筆。
const categoryEntries = [
  { slug: 'travel', icon: '✈️', title: '出入境與旅行', description: '申請流程、旅行準備與入境相關筆記。' },
  { slug: 'identity-documents', icon: '🪪', title: '身分與文件', description: '身分證件、簽證、申請文件與重要資料。' },
  { slug: 'us-life', icon: '🏡', title: '美國生活', description: '在美國生活時會遇到的實用流程與經驗。' },
  { slug: 'banking-credit', icon: '💳', title: '銀行與信用卡', description: '銀行帳戶、信用建立、信用卡與付款。' },
  { slug: 'insurance-healthcare', icon: '🩺', title: '保險與醫療', description: '醫療保險、看診流程與健康相關筆記。' },
  { slug: 'work-taxes', icon: '💼', title: '工作與報稅', description: '求職、工作文件、薪資與報稅整理。' },
  { slug: 'shopping-daily', icon: '🛍️', title: '購物與日常', description: '採買、退貨、生活服務與日常小事。' },
  { slug: 'home-buying', icon: '🔑', title: '買房', description: '看房、貸款、交易流程與居住規劃。' },
] as const

export type CategorySlug = (typeof categoryEntries)[number]['slug']
export type Category = (typeof categoryEntries)[number] & { href: string }

export const categories: Category[] = categoryEntries.map((entry) => ({ ...entry, href: `/topics/${entry.slug}` }))

// 作者要填的欄位；日期標籤、分類物件和網址由 catalog 算出來。
type NoteEntry = {
  slug: string
  title: string
  categorySlug: CategorySlug
  // 格式 YYYY-MM-DD
  date: string
  summary: string
  coverImage: string
  coverAlt: string
  intro: string
  // 本文目錄：id 必須和正文的 <h2 id="..."> 相同；title 是目錄裡顯示的短標題。
  sections: { id: string; title: string }[]
  // 草稿：正式網站不列出、網址 404；本機 npm run dev 仍看得到，方便預覽。
  draft?: boolean
}

export type Note = NoteEntry & {
  category: Category
  href: string
  // 例如「2026 年 9 月」
  dateLabel: string
  // 例如「2026 年 9 月 16 日」
  dateDisplay: string
}

// 新文章先登記在這裡，首頁就會自動列出。
const entries: NoteEntry[] = [
  {
    slug: 'dv-lottery',
    title: '抽美國樂透綠卡：台灣人資格與 DV-2027 新規定',
    categorySlug: 'identity-documents',
    date: '2026-10-26',
    summary: '台灣出生可以抽。整理 DV-2027 法院命令的時程、US$1 登記費、護照新規定、照片規格、中籤後流程與防詐騙。',
    coverImage: '/images/dv-lottery/cover.png',
    coverAlt: '封面文字：抽美國樂透綠卡，台灣出生可以抽，DV-2027 最新規則整理',
    intro: '美國樂透綠卡（DV Lottery）每年最多發 55,000 張移民簽證，台灣出生的人可以參加。DV-2027 經歷暫停、法院命令和上訴，規則和時程都跟往年不同。這篇依官方資料整理今年的規定，登記前仍請以國務院最新公告為準。',
    sections: [
      { id: 'status', title: '今年還有嗎' },
      { id: 'quota', title: '55,000 張怎麼發' },
      { id: 'eligible', title: '台灣人可以抽嗎' },
      { id: 'requirement', title: '學歷或工作經驗' },
      { id: 'new-rules', title: '今年的新規定' },
      { id: 'steps', title: '怎麼登記' },
      { id: 'photo', title: '照片規格' },
      { id: 'photo-where', title: '去哪裡拍' },
      { id: 'results', title: '抽中之後' },
      { id: 'cost', title: '要準備多少錢' },
      { id: 'scams', title: '小心詐騙' },
    ],
  },
  {
    slug: 'ezpass-flex',
    title: 'E-ZPass Flex 怎麼用？HOV 共乘免過路費筆記',
    categorySlug: 'us-life',
    date: '2026-10-14',
    summary: 'DMV 通勤必看：E-ZPass Flex 在 Virginia Express Lanes 共乘免過路費，整理各路段人數門檻、I-66 收費時段、開關切法、申請與費用。',
    coverImage: '/images/ezpass/flex-tag.png',
    coverAlt: 'E-ZPass Flex 感應器，上方有 HOV OFF 與 HOV ON 切換開關',
    intro: 'DMV 通勤必看！共乘人數夠，Virginia Express Lanes 過路費直接 $0。E-ZPass Flex 多了 HOV 開關，這篇整理哪些路可以共乘免費、I-66 的收費時段、開關怎麼切，以及怎麼拿到 Flex。',
    sections: [
      { id: 'overview', title: 'Flex 是什麼' },
      { id: 'roads', title: '哪些路可以共乘免費' },
      { id: 'i66', title: 'I-66 收費時段' },
      { id: 'switch', title: '開關怎麼切' },
      { id: 'apply', title: '怎麼拿到 Flex' },
      { id: 'cost', title: '要多少錢' },
      { id: 'travel', title: '其他州能用嗎' },
      { id: 'checklist', title: '使用前四個提醒' },
      { id: 'sources', title: '官方資料' },
    ],
  },
  {
    slug: 'ezpass-east-coast',
    title: 'E-ZPass 怎麼申請？東岸開車的過路費筆記',
    categorySlug: 'us-life',
    date: '2026-10-14',
    summary: '以紐約、新澤西為例，整理 E-ZPass 帳戶選擇、橋隧費率、預付與 Pay Per Trip、感應器安裝及租車注意事項。',
    coverImage: '/images/ezpass/logo.png',
    coverAlt: 'E-ZPass 標誌',
    intro: '東岸開車常會遇到收費公路、橋梁和隧道。先選適合常走路線的 E-ZPass 帳戶，再把車牌、付款和感應器設定好，過路費就比較好管理。這篇以紐約、新澤西為例，依官方資料整理。',
    sections: [
      { id: 'overview', title: 'E-ZPass 是什麼' },
      { id: 'states', title: '哪些州可以用' },
      { id: 'without', title: '沒有 E-ZPass 會怎樣' },
      { id: 'choose', title: '申請哪一州的帳戶' },
      { id: 'fees', title: '各州月費' },
      { id: 'prepare', title: '要準備什麼' },
      { id: 'apply', title: '申請與付款設定' },
      { id: 'mount', title: '感應器怎麼裝' },
      { id: 'rental', title: '租車怎麼使用' },
      { id: 'checklist', title: '出發前檢查清單' },
      { id: 'sources', title: '官方資料' },
    ],
  },
  {
    slug: 'global-entry',
    title: '台灣護照申請 Global Entry：從良民證到面試',
    categorySlug: 'travel',
    date: '2026-09-16',
    summary: '和 TSA PreCheck 的差別、良民證、TTP 填表、信用卡報銷、面試文件與通過後的使用方式。',
    coverImage: '/images/global-entry-logo.png',
    coverAlt: 'Global Entry 標誌',
    intro: '從良民證、線上申請到面試，照著順序準備。這篇依照我整理的材料與 CBP 官方資訊編寫，申請前仍請以官方頁面為準。',
    sections: [
      { id: 'what', title: '這是什麼' },
      { id: 'compare', title: '和 TSA PreCheck 比較' },
      { id: 'eligible', title: '先準備良民證' },
      { id: 'steps', title: '申請步驟' },
      { id: 'credit-card', title: '信用卡報銷申請費' },
      { id: 'interview', title: '面試要帶什麼' },
      { id: 'use', title: '通過後怎麼用' },
      { id: 'notes', title: '申請前提醒' },
    ],
  },
  {
    slug: 'taiwan-license-us-states',
    title: '台灣駕照換美國駕照：各州免試、筆試規定總整理',
    categorySlug: 'identity-documents',
    date: '2026-10-05',
    summary: '哪些州筆試路試都免、哪些只考筆試、要準備什麼文件、筆試及格標準與中文考試，以及換照流程。',
    coverImage: '/images/dmv/cover.png',
    coverAlt: '台灣駕照換美國駕照的封面圖',
    intro: '持有效台灣駕照，在不少州可以免試或只考筆試就換照。先查自己住的州屬於哪一類，再決定要準備什麼。',
    sections: [
      { id: 'summary', title: '先說結論' },
      { id: 'documents', title: '要準備的文件' },
      { id: 'no-test', title: '全免試的州' },
      { id: 'written-only', title: '只考筆試的州' },
      { id: 'study', title: '筆試怎麼準備' },
      { id: 'other-states', title: '要重新考的州' },
      { id: 'process', title: '換照流程' },
    ],
  },
  {
    slug: 'fidelity-account',
    title: '在美國怎麼開 Fidelity？沒有工作也能開投資帳戶',
    categorySlug: 'banking-credit',
    date: '2026-10-05',
    summary: '已有 401(k) 怎麼登入、第一次開戶、線上驗證卡關改紙本、連結銀行、小額交易驗證與入金。',
    coverImage: '/images/fidelity/logo.png',
    coverAlt: 'Fidelity Investments 標誌',
    intro: '從開 Brokerage Account、線上驗證卡關改走紙本，到連結銀行和入金，整理我自己開 Fidelity 的經驗。',
    sections: [
      { id: 'start', title: '先看你是哪一種' },
      { id: 'have-401k', title: '已經有 401(k)' },
      { id: 'new-account', title: '第一次開戶' },
      { id: 'paper', title: '線上開不了怎麼辦' },
      { id: 'other-accounts', title: '其他帳戶' },
      { id: 'funding', title: '怎麼入金' },
      { id: 'verification', title: '帳戶驗證' },
      { id: 'recap', title: '最後整理' },
    ],
  },
  {
    slug: 'shell-gas-savings',
    title: 'Shell 加油省錢攻略：不辦信用卡也能少付油錢',
    categorySlug: 'shopping-daily',
    date: '2026-10-05',
    summary: 'Fuel Rewards 新戶優惠、會員等級、Shell S Pay、Race Day、T-Mobile Tuesdays、超市點數與 Upside 回饋。',
    coverImage: '/images/shell/shell-fuel-rewards.png',
    coverAlt: 'Shell Fuel Rewards 會員計畫的標誌',
    intro: '同一家 Shell、加一樣的油，善用免費會員、App 付款和現金回饋，一次加滿就可能少付幾美元。',
    sections: [
      { id: 'overview', title: '為什麼不付原價' },
      { id: 'join', title: '加入 Fuel Rewards' },
      { id: 'status', title: '會員等級折扣' },
      { id: 's-pay', title: 'Shell S Pay' },
      { id: 'race-day', title: 'Race Day Rewards' },
      { id: 't-mobile', title: 'T-Mobile Tuesdays' },
      { id: 'grocery', title: '超市點數' },
      { id: 'upside', title: 'Upside 現金回饋' },
      { id: 'payment', title: '付款方式怎麼選' },
      { id: 'summary', title: '總結' },
    ],
  },
]

export function categoryFor(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

function toNote(entry: NoteEntry): Note {
  const [year, month, day] = entry.date.split('-').map(Number)
  return {
    ...entry,
    category: categoryFor(entry.categorySlug)!,
    href: `/notes/${entry.slug}`,
    dateLabel: `${year} 年 ${month} 月`,
    dateDisplay: `${year} 年 ${month} 月 ${day} 日`,
  }
}

// 新到舊排列；同一天的照清單順序。
const showDrafts = process.env.NODE_ENV !== 'production'

export const notes: Note[] = entries
  .filter((entry) => showDrafts || !entry.draft)
  .map(toNote)
  .sort((a, b) => b.date.localeCompare(a.date))

export function noteBySlug(slug: string) {
  return notes.find((note) => note.slug === slug)
}

// 這個分類的筆記，新到舊排列。
export function notesIn(category: Category) {
  return notes.filter((note) => note.category === category)
}

// 側欄和 sitemap 只列出已經有文章的分類；空分類的頁面不給搜尋引擎收錄。
export const activeCategories = categories.filter((category) => notesIn(category).length > 0)
