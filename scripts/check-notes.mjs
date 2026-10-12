// 檢查 content/notes.ts 的登記資料和正文是否對得上。npm run build 之前會自動執行，也可以手動跑 npm run check。
import { readFile } from 'node:fs/promises'
import { notes } from '../content/notes.ts'

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

if (problems.length > 0) {
  console.error(`筆記檢查沒有通過（${problems.length} 個問題）：`)
  for (const problem of problems) console.error(`  ✘ ${problem}`)
  process.exit(1)
}
console.log(`✔ ${notes.length} 篇筆記檢查通過`)
