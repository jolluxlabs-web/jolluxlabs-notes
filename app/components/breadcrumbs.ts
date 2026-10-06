import { absoluteUrl } from '@/content/site'

// 麵包屑的結構化資料：讓搜尋引擎看懂「首頁 → 分類 → 文章」的層級。
export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
