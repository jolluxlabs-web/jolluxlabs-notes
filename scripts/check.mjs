// 網站內容檢查。npm run build 之前會自動執行，也可以手動跑 npm run check。
// 1. content/notes.ts 的登記資料和正文對得上
// 2. 結構化資料裡每個 @id 引用，都有某一頁定義
import { readFile } from 'node:fs/promises'
import { notes } from '../content/notes.ts'
import { forAllPages } from '../app/structured-data.ts'

const problems = []
const seen = new Set()

for (const note of notes) {
  const where = `「${note.slug}」`

  if (seen.has(note.slug)) problems.push(`${where} slug 重複`)
  seen.add(note.slug)

  const [year, month, day] = note.date.split('-').map(Number)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  if (!/^\d{4}-\d{2}-\d{2}$/.test(note.date) || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) {
    problems.push(`${where} date「${note.date}」不是合法的 YYYY-MM-DD 日期`)
  }

  const file = `content/notes/${note.slug}.mdx`
  let source
  try {
    source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8')
  } catch {
    problems.push(`${where} 找不到正文 ${file}（檔名必須和 slug 相同）`)
    continue
  }

  const headingIds = new Set([...source.matchAll(/<h2\b[^>]*\bid="([^"]+)"/g)].map((match) => match[1]))
  for (const section of note.sections) {
    if (!headingIds.has(section.id)) {
      problems.push(`${where} 目錄的 id「${section.id}」在 ${file} 裡找不到對應的 <h2 id="${section.id}">`)
    }
  }
}

// 只有 @id 一個欄位的物件是引用；帶其他欄位的是定義。
const defined = new Set()
const referenced = new Set()
function collectIds(value) {
  if (Array.isArray(value)) return value.forEach(collectIds)
  if (!value || typeof value !== 'object') return
  if (typeof value['@id'] === 'string') (Object.keys(value).length === 1 ? referenced : defined).add(value['@id'])
  Object.values(value).forEach(collectIds)
}
collectIds(forAllPages())
for (const id of referenced) {
  if (!defined.has(id)) problems.push(`結構化資料引用了 @id「${id}」，但沒有任何一頁定義它`)
}

if (problems.length > 0) {
  console.error(`檢查沒有通過（${problems.length} 個問題）：`)
  for (const problem of problems) console.error(`  ✘ ${problem}`)
  process.exit(1)
}
console.log(`✔ ${notes.length} 篇筆記、${defined.size} 個結構化資料 @id 檢查通過`)
