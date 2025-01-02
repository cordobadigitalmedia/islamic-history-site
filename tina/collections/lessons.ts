import { AnyField, Collection, Field, Template } from "tinacms"

import { RichTextTemplates } from "../templates/rich-text-templates"
import { backgroundColorOptions } from "./common"

export const LessonCollection: Collection = {
  name: "lesson",
  label: "Lessons",
  path: "content/lessons",
  format: "mdx",
  fields: [
    {
      name: "title",
      label: "Lesson title",
      type: "string",
    },
    {
      name: "level",
      label: "Grade Level",
      type: "string",
      options: [
        { label: "3-6", value: "3-6" },
        { label: "7-9", value: "7-9" },
        { label: "High School", value: "highschool" },
      ],
    },
    {
      name: "blocks",
      label: "Content Blocks",
      description:
        "You can re-order them as needed and have different blocks on each page",
      type: "object",
      list: true,
      templates: [
        {
          name: "richContent",
          label: "Rich Text Content",
          fields: [
            {
              name: "content",
              type: "rich-text",
              label: "Content",
              description: "Rich content for page",
              templates: RichTextTemplates,
            },
            {
              type: "string",
              name: "backgroundColor",
              label: "Background color type",
              options: backgroundColorOptions,
            },
            {
              type: "string",
              name: "textAlign",
              label: "Text Alignment",
              options: ["left", "center", "right"],
            },
          ],
        },
      ],
    },
  ],
}
