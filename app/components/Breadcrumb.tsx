import Link from 'next/link'
import { Fragment } from 'react'
import type { Trail } from '@/app/breadcrumbs'

// 畫面上的麵包屑；最後一格是目前頁面，不加連結。
export default function Breadcrumb({ trail }: { trail: Trail }) {
  const current = trail[trail.length - 1]
  return (
    <div className="breadcrumb">
      {trail.slice(0, -1).map((item) => (
        <Fragment key={item.href}><Link href={item.href}>{item.label ?? item.name}</Link><span>/</span></Fragment>
      ))}
      <strong>{current.label ?? current.name}</strong>
    </div>
  )
}
