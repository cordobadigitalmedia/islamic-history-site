"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { LessonAndWrapperQuery } from "@/tina/__generated__/types"
import { tinaField } from "tinacms/dist/react"

import { Button } from "@/components/ui/button"

export function SiteHeader({
  header,
}: {
  header: LessonAndWrapperQuery["header"]
}) {
  const headerHeight = header.headerHeight ? header.headerHeight : "64px"
  const logoHeight = header.logoHeight ? header.logoHeight : "50px"
  const logoWidth = header.logoWidth ? header.logoWidth : "50px"
  const backgroundCol = header.backgroundColor
    ? `bg-${header.backgroundColor}`
    : `bg-primary`
  return (
    <header className={`${backgroundCol} sticky top-0 z-40 w-full border-b`}>
      <div className={`container flex ${headerHeight} items-center`}>
        <Link href="/" className="flex items-center gap-1">
          <div
            style={{
              position: "relative",
              width: logoWidth,
              height: logoHeight,
            }}
            data-tina-field={header.logo && tinaField(header, "logo")}
          >
            <Image
              src={header.logo || ""}
              alt={header.siteTitle || ""}
              fill
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          {header.logoTitle && (
            <div
              className="font-crimson"
              data-tina-field={header.logo && tinaField(header, "logoTitle")}
            >
              {header.logoTitle}
            </div>
          )}
        </Link>
        {header.ctaButton && (
          <div
            data-tina-field={
              header.ctaButton && tinaField(header.ctaButton, "title")
            }
            key={header.ctaButton.link}
            className="flex grow justify-end"
          >
            <Link
              href={header.ctaButton.link as string}
              target={header.ctaButton.type === "relative" ? "_self" : "_blank"}
            >
              <Button variant="default">{header.ctaButton.title}</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
