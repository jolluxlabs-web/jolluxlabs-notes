# 美國生活筆記｜編輯指南

這個網站的文章共用同一套版型。平常寫新文章，主要修改 `content/` 裡的檔案，不用複製網頁程式碼。

## 各檔案用途

| 想修改的內容 | 檔案 |
| --- | --- |
| 首頁自我介紹 | `app/page.tsx` |
| 文章標題、日期、分類、摘要、前言、目錄 | `content/notes.ts` |
| Global Entry 文章正文 | `content/notes/global-entry.mdx` |
| 新文章的寫作範本 | `content/ARTICLE_TEMPLATE.mdx` |
| 網站顏色、字體與排版 | `app/globals.css` |
| 網站名稱、網址、作者（結構化資料與 sitemap 會用到） | `content/site.ts` |
| 文章圖片 | `public/images/` |

## 新增一篇文章

以下以「美國駕照」為例。網址會是 `/notes/drivers-license`。

1. 複製 `content/ARTICLE_TEMPLATE.mdx`，命名為 `content/notes/drivers-license.mdx`。把範本中的示意文字、圖片檔名和來源連結換成真正內容；不需要的段落可以刪掉。
2. 打開 `content/notes.ts`，在最上方加入：

   ```tsx
   import DriversLicense from './notes/drivers-license.mdx'
   ```

3. 在同一檔案的 `notes` 清單裡新增一筆：

   ```tsx
   {
     slug: 'drivers-license',
     title: '美國駕照申請筆記',
     categorySlug: 'daily-life',
     date: '2026-09-17',
     dateLabel: '2026 年 9 月',
     dateDisplay: '2026 年 9 月 17 日',
     summary: '這篇文章的簡短摘要，會顯示在搜尋結果中。',
     intro: '文章開頭的兩三句介紹。',
     sections: [
       { id: 'overview', title: '這篇筆記要解決什麼問題？' },
       { id: 'preparation', title: '開始前要準備什麼？' },
       { id: 'steps', title: '實際步驟' },
       { id: 'experience', title: '我的經驗與提醒' },
       { id: 'sources', title: '資料來源' },
     ],
     Content: DriversLicense,
   },
   ```

4. 如果 `daily-life` 是新分類，也在 `categories` 清單新增：

   ```tsx
   { slug: 'daily-life', title: '日常生活', description: '在美國生活的實用流程與經驗。' },
   ```

   `categorySlug` 必須和分類的 `slug` 完全相同。目錄的 `id` 必須和正文標題的 `id` 相同；例如 `{ id: 'steps' }` 對應 `<h2 id="steps">實際步驟</h2>`。

完成後，首頁、分類頁和文章頁都會使用同一筆資料。不要把範本檔直接放在 `content/notes/`；它只是供你複製的底稿。

## 在電腦上預覽

在這個專案資料夾的終端機輸入：

```bash
npm run dev
```

到 `http://localhost:3000` 查看。修改檔案並儲存後，頁面通常會自動更新。預覽結束時，在終端機按 `Control + C`。

## 更新公開網站

確認內容後，在同一個專案資料夾輸入：

```bash
npx vercel --prod
```

正式網站網址是 <https://meiguo-notes-nextjs.vercel.app/>。之後若接上 GitHub，也可以改用 GitHub 自動部署。
