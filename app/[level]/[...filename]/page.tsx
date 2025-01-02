import React from "react"
import client from "@/tina/__generated__/client"

import { LessonComponent } from "@/components/app/lesson"

export default async function Page({
  params,
}: {
  params: Promise<{ level: string; filename: string[] }>
}) {
  console.log(await params)
  const pathArray = await params
  const result = await client.queries.lessonAndWrapper({
    relativePath: `${pathArray.level}/${pathArray.filename.join("/")}.mdx`,
  })
  return <LessonComponent {...result} />
}

export async function generateStaticParams() {
  const pages = await client.queries.lessonConnection()
  const paths = pages.data?.lessonConnection.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }))

  return paths || []
}
