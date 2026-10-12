// 麵包屑路徑：每種頁面的層級只在這裡定義一次。
// 畫面上的 <Breadcrumb> 和給搜尋引擎的結構化資料都從這裡產生，兩邊不會不一致。
import type { Category, Note } from '../content/notes.ts'

export type Trail = {
  name: string
  href: string
  // 畫面上改顯示的短標籤；結構化資料仍用 name。
  label?: string
}[]

const home = { name: '首頁', href: '/' }

export function trailForNote(note: Note): Trail {
  return [home, { name: note.category.title, href: note.category.href }, { name: note.title, href: note.href, label: '文章' }]
}

export function trailForTopic(category: Category): Trail {
  return [home, { name: category.title, href: category.href }]
}

export function trailForAbout(): Trail {
  return [home, { name: '關於我', href: '/about' }]
}
