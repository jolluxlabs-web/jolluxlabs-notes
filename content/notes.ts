import type { ComponentType } from 'react'
import GlobalEntry from './notes/global-entry.mdx'
import TaiwanLicenseUsStates from './notes/taiwan-license-us-states.mdx'
import FidelityAccount from './notes/fidelity-account.mdx'
import ShellGasSavings from './notes/shell-gas-savings.mdx'

export type Note = {
  slug: string
  title: string
  categorySlug: string
  date: string
  dateLabel: string
  dateDisplay: string
  summary: string
  coverImage: string
  coverAlt: string
  intro: string
  sections: { id: string; title: string }[]
  Content: ComponentType
}

// 新文章先登記在這裡，首頁就會自動列出。
export const notes: Note[] = [
  {
    slug: 'global-entry',
    title: '台灣護照申請 Global Entry：從良民證到面試',
    categorySlug: 'travel',
    date: '2026-09-16',
    dateLabel: '2026 年 9 月',
    dateDisplay: '2026 年 9 月 16 日',
    summary: '和 TSA PreCheck 的差別、良民證、TTP 填表、信用卡報銷、面試文件與通過後的使用方式。',
    coverImage: '/images/global-entry-cover.jpg',
    coverAlt: '警察刑事紀錄證明（良民證）範例，標示出申請 Global Entry 要填的文號位置',
    intro: '從良民證、線上申請到面試，照著順序準備。這篇依照我整理的材料與 CBP 官方資訊編寫，申請前仍請以官方頁面為準。',
    sections: [
      { id: 'what', title: '這是什麼' },
      { id: 'compare', title: '和 TSA PreCheck 比較' },
      { id: 'eligible', title: '先準備良民證' },
      { id: 'steps', title: '申請步驟' },
      { id: 'interview', title: '面試要帶什麼' },
      { id: 'use', title: '通過後怎麼用' },
      { id: 'notes', title: '申請前提醒' },
    ],
    Content: GlobalEntry,
  },
  {
    slug: 'taiwan-license-us-states',
    title: '台灣駕照換美國駕照：各州免試、筆試規定總整理',
    categorySlug: 'identity-documents',
    date: '2026-10-05',
    dateLabel: '2026 年 10 月',
    dateDisplay: '2026 年 10 月 5 日',
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
    Content: TaiwanLicenseUsStates,
  },
  {
    slug: 'fidelity-account',
    title: '在美國怎麼開 Fidelity？沒有工作也能開投資帳戶',
    categorySlug: 'banking-credit',
    date: '2026-10-05',
    dateLabel: '2026 年 10 月',
    dateDisplay: '2026 年 10 月 5 日',
    summary: '已有 401(k) 怎麼登入、第一次開戶、線上驗證卡關改紙本、連結銀行、小額交易驗證與入金。',
    coverImage: '/images/fidelity/micro-deposit.jpg',
    coverAlt: 'Fidelity 小額驗證交易的通知畫面',
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
    Content: FidelityAccount,
  },
  {
    slug: 'shell-gas-savings',
    title: 'Shell 加油省錢攻略：不辦信用卡也能少付油錢',
    categorySlug: 'shopping-daily',
    date: '2026-10-05',
    dateLabel: '2026 年 10 月',
    dateDisplay: '2026 年 10 月 5 日',
    summary: 'Fuel Rewards 新戶優惠、會員等級、Shell S Pay、Race Day、T-Mobile Tuesdays、超市點數與 Upside 回饋。',
    coverImage: '/images/shell/new-members.png',
    coverAlt: 'Shell Fuel Rewards 新會員前三次加油省 10、20、30 美分的優惠圖',
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
    Content: ShellGasSavings,
  },
]

// 主題有自己的頁面；新增主題時，在這裡加一筆。
export const categories = [
  { slug: 'travel', icon: '✈️', title: '出入境與旅行', description: '申請流程、旅行準備與入境相關筆記。' },
  { slug: 'identity-documents', icon: '🪪', title: '身分與文件', description: '身分證件、簽證、申請文件與重要資料。' },
  { slug: 'us-life', icon: '🏡', title: '美國生活', description: '在美國生活時會遇到的實用流程與經驗。' },
  { slug: 'banking-credit', icon: '💳', title: '銀行與信用卡', description: '銀行帳戶、信用建立、信用卡與付款。' },
  { slug: 'insurance-healthcare', icon: '🩺', title: '保險與醫療', description: '醫療保險、看診流程與健康相關筆記。' },
  { slug: 'work-taxes', icon: '💼', title: '工作與報稅', description: '求職、工作文件、薪資與報稅整理。' },
  { slug: 'shopping-daily', icon: '🛍️', title: '購物與日常', description: '採買、退貨、生活服務與日常小事。' },
  { slug: 'home-buying', icon: '🔑', title: '買房', description: '看房、貸款、交易流程與居住規劃。' },
]

export function categoryFor(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function notesIn(categorySlug: string) {
  return notes.filter((note) => note.categorySlug === categorySlug)
}

// 側欄和 sitemap 只列出已經有文章的分類；空分類的頁面不給搜尋引擎收錄。
export const activeCategories = categories.filter((category) => notesIn(category.slug).length > 0)
