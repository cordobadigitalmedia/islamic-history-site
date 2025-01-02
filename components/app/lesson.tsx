"use client"

import { LessonAndWrapperQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

import { Footer } from "@/components/footer"
import { PageContent } from "@/components/lesson/page-content"
import { SiteHeader } from "@/components/site-header"

export function LessonComponent(props: {
  data: LessonAndWrapperQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)
  return (
    <>
      <SiteHeader header={data.header} />
      <div className="flex min-h-[calc(100vh-65px)] flex-col">
        <div className="grow">
          <div className="container mx-auto py-4">
            <div className="prose">
              <h1>{data.lesson.title}</h1>
            </div>
            {data.lesson.blocks?.map((block, i) => {
              switch (block?.__typename) {
                case "LessonBlocksRichContent": {
                  return <PageContent key={i} {...block} />
                }
              }
            })}
          </div>
        </div>
        <Footer footer={data.footer} />
      </div>
    </>
  )
}
