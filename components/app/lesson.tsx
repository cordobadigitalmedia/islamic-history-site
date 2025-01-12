"use client"

import { LessonAndWrapperQuery } from "@/tina/__generated__/types"
import { useTina } from "tinacms/dist/react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { PageContent } from "@/components/lesson/page-content"
import { SiteHeader } from "@/components/site-header"

import AudioPlayer from "../audio-player"

export function LessonComponent(props: {
  data: LessonAndWrapperQuery
  variables: {
    relativePath: string
  }
  query: string
}) {
  const { data } = useTina(props)
  return (
    <Card className="w-full max-w-6xl mx-auto opacity-95 bg-white">
      <CardContent className="p-6">
        <Breadcrumb className="mb-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Back to Timeline</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-end justify-end w-full mb-2">
          <AudioPlayer src="/audio/original/lesson4" />
        </div>
        <div className="flex min-h-[calc(100vh-65px)] flex-col">
          <div className="grow">
            <div>
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
        </div>
      </CardContent>
    </Card>
  )
}
