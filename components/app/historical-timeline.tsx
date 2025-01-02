"use client"

import * as React from "react"
import Link from "next/link"

import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

interface TimelineEvent {
  id: string
  title: string
  period: string
  startYear: number
  endYear: number
  description: string
  category: "empire" | "age" | "event" | "person"
}

interface Period {
  id: string
  title: string
  startYear: number
  endYear: number
}

const mainPeriods: Period[] = [
  {
    id: "middle-ages",
    title: "The Middle Ages",
    startYear: 476,
    endYear: 1500,
  },
  {
    id: "early-modern",
    title: "Early Modern Period",
    startYear: 1500,
    endYear: 1800,
  },
  {
    id: "modern",
    title: "Modern Period",
    startYear: 1800,
    endYear: 2024,
  },
]

const subPeriods: Period[] = [
  {
    id: "high-caliphate",
    title: "High Caliphate Period",
    startYear: 622,
    endYear: 1066,
  },
  {
    id: "middle-period",
    title: "Middle Period",
    startYear: 1066,
    endYear: 1500,
  },
  {
    id: "gunpowder-period",
    title: "Gunpowder Period",
    startYear: 1500,
    endYear: 1707,
  },
  {
    id: "european-age",
    title: "European Age",
    startYear: 1707,
    endYear: 2024,
  },
]

const historicalEvents: TimelineEvent[] = [
  {
    id: "introduction",
    title: "Introduction and Overview",
    period: "High Caliphate",
    startYear: 600,
    endYear: 610,
    description:
      "The context of the Islamic history in relation to western history.",
    category: "event",
  },
  {
    id: "prophet-muhammad",
    title: "The Prophet Muhammad",
    period: "High Caliphate",
    startYear: 610,
    endYear: 632,
    description:
      "The period of Muhammad's prophethood and the founding of Islam.",
    category: "event",
  },
  {
    id: "abu-bakr",
    title: "Caliphate of Abu Bakr",
    period: "High Caliphate",
    startYear: 632,
    endYear: 634,
    description: "The first Rashidun Caliph and close companion of Muhammad.",
    category: "event",
  },
  {
    id: "umar-the-just",
    title: "Umar the Just",
    period: "High Caliphate",
    startYear: 634,
    endYear: 661,
    description:
      "The second Rashidun Caliph, known for his justice and expansion of the caliphate.",
    category: "event",
  },
]

type GradeLevel = "3_6" | "7_9" | "highschool"

export default function HistoricalTimeline() {
  const [selectedEvent, setSelectedEvent] =
    React.useState<TimelineEvent | null>(null)
  const [gradeLevel, setGradeLevel] = React.useState<GradeLevel>("7_9")
  const timelineStart = 476
  const timelineEnd = 2024
  const timelineWidth = timelineEnd - timelineStart

  const getPositionStyle = (startYear: number, endYear: number) => {
    const left = ((startYear - timelineStart) / timelineWidth) * 100
    const width = ((endYear - startYear) / timelineWidth) * 100
    return {
      left: `${left}%`,
      width: `${width}%`,
    }
  }

  const getPositionStyleFixedW = (startYear: number, endYear: number) => {
    const left = ((startYear - timelineStart) / timelineWidth) * 100
    const width = 2
    return {
      left: `${left}%`,
      width: `${width}%`,
    }
  }

  const getCategoryColor = (category: TimelineEvent["category"]) => {
    switch (category) {
      case "empire":
        return "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500"
      case "age":
        return "bg-green-500/20 hover:bg-green-500/30 border-green-500"
      case "event":
        return "bg-red-500/20 hover:bg-red-500/30 border-green-500"
      case "person":
        return "bg-purple-500/20 hover:bg-purple-500/30 border-purple-500"
      default:
        return "bg-gray-500/20 hover:bg-gray-500/30 border-gray-500"
    }
  }

  const generateGridLines = () => {
    const lines = []
    for (let year = timelineStart; year <= timelineEnd; year += 50) {
      const left = ((year - timelineStart) / timelineWidth) * 100
      lines.push(
        <div
          key={year}
          className="absolute top-0 bottom-0 w-px bg-gray-200"
          style={{ left: `${left}%` }}
        />
      )
    }
    return lines
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="prose max-w-none">
              <h2 className="font-bold">Islamic History Learning</h2>
            </div>

            <Select
              value={gradeLevel}
              onValueChange={(value: GradeLevel) => setGradeLevel(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3_6">Grades 3-6</SelectItem>
                <SelectItem value="7_9">Grades 7-9</SelectItem>
                <SelectItem value="highschool">High School</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Alert>
            <AlertTitle>Get started</AlertTitle>
            <AlertDescription>
              <ol className="list-decimal ml-4">
                <li>
                  Select a grade level on the top right to customize the
                  learning content, which is based on the textbook{" "}
                  <Link
                    href="https://lci.org.uk/islamic-history-textbook/"
                    target="blank"
                    className="underline font-semibold"
                  >
                    A history of Islam and the west.
                  </Link>
                </li>
                <li>
                  Click on an event in the timeline to view the lesson for that
                  event.
                </li>
              </ol>
            </AlertDescription>
          </Alert>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100/50 border border-green-500 rounded" />
              <span>Eurocentric Classification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100/50 border border-blue-500 rounded" />
              <span>Islamic Classification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500/20 border border-red-500 rounded" />
              <span>Key Events</span>
            </div>
          </div>

          {/* Desktop Timeline */}
          <div className="relative h-[800px] hidden md:block">
            {/* Vertical grid lines */}
            {generateGridLines()}

            {/* Main period regions */}
            <div className="absolute top-0 left-0 right-0 h-16">
              {mainPeriods.map((period, rowIndex) => (
                <div
                  key={period.id}
                  className="absolute h-full flex items-center justify-center bg-gray-100/50 border-x border-gray-200 px-4"
                  style={getPositionStyle(period.startYear, period.endYear)}
                >
                  <div
                    className={`absolute ${
                      rowIndex % 2 === 0 ? "top-1/2" : "bottom-1/2"
                    } left-1/2 transform -translate-x-1/2 whitespace-nowrap flex flex-col items-center`}
                  >
                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                      {period.title}
                      <span className="text-xs ml-1 text-gray-500">
                        (c.{period.startYear} -{" "}
                        {period.endYear === 2024
                          ? "present"
                          : `c.${period.endYear}`}
                        )
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub-period regions */}
            <div className="absolute top-16 left-0 right-0 h-16">
              {subPeriods.map((period, rowIndex) => (
                <div
                  key={period.id}
                  className="absolute h-full flex items-center justify-center bg-blue-100/50 border-x border-blue-200 px-4"
                  style={getPositionStyle(period.startYear, period.endYear)}
                >
                  <div
                    className={`absolute ${
                      rowIndex % 2 === 0 ? "top-1/2" : "bottom-1/2"
                    } left-1/2 transform -translate-x-1/2 whitespace-nowrap flex flex-col items-center`}
                  >
                    <span className="text-sm font-medium text-blue-600 whitespace-nowrap">
                      {period.title}
                      <span className="text-xs ml-1 text-blue-500">
                        ({period.startYear} -{" "}
                        {period.endYear === 2024 ? "present" : period.endYear})
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline base line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200" />

            {/* Year markers */}
            {[500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2000].map((year) => (
              <div
                key={year}
                className="absolute top-1/2 transform -translate-y-1/2"
                style={{
                  left: `${((year - timelineStart) / timelineWidth) * 100}%`,
                }}
              >
                <div className="h-3 w-0.5 bg-gray-300 mb-1" />
                <span className="text-sm text-gray-600 -ml-3">{year}</span>
              </div>
            ))}

            {/* Events and Labels */}
            {historicalEvents.map((event, index) => {
              const rowIndex = index % 3 // Use 4 rows
              return (
                <div
                  key={event.id}
                  className="absolute cursor-pointer"
                  style={{
                    ...getPositionStyleFixedW(event.startYear, event.endYear),
                    top: `${20 + rowIndex * 6}%`,
                  }}
                  onClick={() => setSelectedEvent(event)}
                >
                  <button
                    className={`w-full h-5 rounded-full cursor-pointer transition-colors ${getCategoryColor(
                      event.category
                    )}`}
                    onClick={() => setSelectedEvent(event)}
                    aria-label={`View details for ${event.title}`}
                  />
                  <div
                    className={`absolute ${
                      rowIndex % 2 === 0
                        ? "bottom-full mb-1"
                        : "bottom-full mb-1"
                    } left-1/2 transform -translate-x-1/2 whitespace-nowrap flex flex-col items-center`}
                  >
                    <span className="text-xs text-gray-600 bg-white px-1">
                      {event.title}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4">
            {mainPeriods.map((mainPeriod) => (
              <div key={mainPeriod.id} className="space-y-2">
                <h3 className="text-lg font-semibold">{mainPeriod.title}</h3>
                <div className="pl-4 border-l-2 border-gray-300 space-y-4">
                  {subPeriods
                    .filter(
                      (subPeriod) =>
                        subPeriod.startYear >= mainPeriod.startYear &&
                        subPeriod.endYear <= mainPeriod.endYear
                    )
                    .map((subPeriod) => (
                      <div key={subPeriod.id} className="space-y-2">
                        <h4 className="text-md font-medium">
                          {subPeriod.title}
                        </h4>
                        <div className="pl-4 border-l-2 border-blue-300 space-y-2">
                          {historicalEvents
                            .filter(
                              (event) =>
                                event.startYear >= subPeriod.startYear &&
                                event.endYear <= subPeriod.endYear
                            )
                            .map((event) => (
                              <div key={event.id} className="relative">
                                <button
                                  className={`w-full text-left p-2 border rounded-md cursor-pointer transition-colors ${getCategoryColor(
                                    event.category
                                  )}`}
                                  onClick={() => setSelectedEvent(event)}
                                >
                                  <span className="font-medium">
                                    {event.title}
                                  </span>
                                  <span className="text-xs ml-2 text-gray-500">
                                    ({event.startYear} - {event.endYear})
                                  </span>
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        >
          {selectedEvent && (
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  <p className="text-sm text-muted-foreground mb-2">
                    {selectedEvent.startYear} - {selectedEvent.endYear}
                  </p>
                  <p>{selectedEvent.description}</p>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Link href={`${gradeLevel}/${selectedEvent.id}`}>
                  <Button>View Lesson</Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </CardContent>
    </Card>
  )
}
