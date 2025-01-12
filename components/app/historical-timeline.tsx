"use client"

import * as React from "react"
import Link from "next/link"
import { Landmark } from "lucide-react"
import { GrOverview } from "react-icons/gr"
import { LuBookOpenText } from "react-icons/lu"

import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  no: number
  title: string
  period: string
  startYear: number
  endYear: number
  description: string
  category: string
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

const timelineStart = 450
const timelineEnd = 2050

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

const historicalEvents = [
  {
    id: "introduction-overview",
    no: 1,
    title: "Introduction and Overview",
    period: "Introduction",
    startYear: 622,
    endYear: 2000,
    description: "An overview of Islamic history from 622 to 2000 CE.",
    category: "overview",
  },
  {
    id: "writing-of-history",
    no: 2,
    title: "The Writing of History",
    period: "Introduction",
    startYear: 622,
    endYear: 2000,
    description: "Exploration of how history is written and interpreted.",
    category: "overview",
  },
  {
    id: "overview",
    no: 3,
    title: "Overview of the period 622-2000",
    period: "Introduction",
    startYear: 622,
    endYear: 2000,
    description: "Overview of the period 622-2000.",
    category: "overview",
  },
  {
    id: "world-advent-islam",
    no: 4,
    title: "The World at the Advent of Islam",
    period: "Prophetic & Rashidun",
    startYear: 622,
    endYear: 661,
    description: "The World at the Advent of Islam.",
    category: "introduction",
  },
  {
    id: "prophet-muhammad",
    no: 5,
    title: "The Prophet Muhammad",
    period: "Prophetic & Rashidun",
    startYear: 610,
    endYear: 632,
    description: "The life and mission of Prophet Muhammad.",
    category: "event",
  },
  {
    id: "abu-bakr",
    no: 6,
    title: "Abu Bakr The Truthful",
    period: "Prophetic & Rashidun",
    startYear: 632,
    endYear: 634,
    description: "The caliphate of Abu Bakr, the first Rightly Guided Caliph.",
    category: "event",
  },
  {
    id: "umar-the-just",
    no: 7,
    title: "Umar the Just",
    period: "Prophetic & Rashidun",
    startYear: 634,
    endYear: 644,
    description: "The caliphate of Umar, the second Rightly Guided Caliph.",
    category: "event",
  },
  {
    id: "uthman-son-of-affan",
    no: 8,
    title: "Uthman son of Affan",
    period: "Prophetic & Rashidun",
    startYear: 644,
    endYear: 656,
    description: "The caliphate of Uthman, the third Rightly Guided Caliph.",
    category: "event",
  },
  {
    id: "ali-son-of-abu-talib",
    no: 9,
    title: "The Lion of God, Ali son of Abu Talib",
    period: "Prophetic & Rashidun",
    startYear: 656,
    endYear: 661,
    description: "The caliphate of Ali, the fourth Rightly Guided Caliph.",
    category: "event",
  },
  {
    id: "umayyads-abbasids",
    no: 10,
    title: "Umayyads & Abbasids",
    period: "High Caliphate",
    startYear: 661,
    endYear: 1066,
    description: "The Umayyad and Abbasid dynasties and their impact.",
    category: "introduction",
  },
  {
    id: "harun-the-good",
    no: 11,
    title: "Harun the Good & The Abbasids",
    period: "High Caliphate",
    startYear: 786,
    endYear: 809,
    description: "The reign of Harun al-Rashid and the Abbasid golden age.",
    category: "event",
  },
  {
    id: "baghdad-city-life",
    no: 12,
    title: "Baghdad & City Life in the High Caliphate",
    period: "High Caliphate",
    startYear: 661,
    endYear: 1066,
    description: "Life in Baghdad during the height of the Abbasid Caliphate.",
    category: "culture",
  },
  {
    id: "intellectual-trends-high-caliphate",
    no: 13,
    title: "High Caliphate Intellectual Trends",
    period: "High Caliphate",
    startYear: 661,
    endYear: 1066,
    description:
      "Scholarly and intellectual developments during the High Caliphate.",
    category: "culture",
  },
  {
    id: "europe-high-caliphate",
    no: 14,
    title: "Europe During The High Caliphate Period",
    period: "High Caliphate",
    startYear: 661,
    endYear: 1066,
    description: "The state of Europe during the Islamic High Caliphate.",
    category: "culture",
  },
  {
    id: "economies-muslim-christian",
    no: 15,
    title: "Economies of the Muslim & Christian Worlds",
    period: "High Caliphate",
    startYear: 661,
    endYear: 1066,
    description:
      "Comparison of economic systems in Muslim and Christian lands.",
    category: "culture",
  },
  {
    id: "middle-period-introduction",
    no: 16,
    title: "Middle Period Introduction",
    period: "Middle Period",
    startYear: 1066,
    endYear: 1500,
    description: "Overview of the Middle Period in Islamic history.",
    category: "introduction",
  },
  {
    id: "normans-feudalism-crusades",
    no: 17,
    title: "The Normans, Feudalism & the Crusades",
    period: "Middle Period",
    startYear: 1100,
    endYear: 1300,
    description:
      "The impact of Normans, feudalism, and the Crusades on the Islamic world.",
    category: "event",
  },
  {
    id: "intellectual-trends-middle-period",
    no: 18,
    title: "Middle Period Intellectual Trends",
    period: "Middle Period",
    startYear: 1066,
    endYear: 1500,
    description:
      "Scholarly and intellectual developments during the Middle Period.",
    category: "culture",
  },
  {
    id: "nomads-eurasian-steppe",
    no: 19,
    title: "Nomads of the Eurasian Steppe",
    period: "Middle Period",
    startYear: 1037,
    endYear: 1517,
    description: "The influence of nomadic peoples from the Eurasian Steppe.",
    category: "event",
  },
  {
    id: "mongolian-eruption",
    no: 20,
    title: "The Mongolian Eruption",
    period: "Middle Period",
    startYear: 1219,
    endYear: 1368,
    description: "The Mongol invasions and their impact on the Islamic world.",
    category: "event",
  },
  {
    id: "ibn-battuta-adventures",
    no: 21,
    title: "The Amazing Adventures of Ibn Battuta",
    period: "Middle Period",
    startYear: 1325,
    endYear: 1354,
    description:
      "The travels and experiences of the famous Muslim explorer Ibn Battuta.",
    category: "event",
  },
  {
    id: "mansa-musa-mali-empire",
    no: 22,
    title: "Mansa Musa & the Mali Empire",
    period: "Middle Period",
    startYear: 1312,
    endYear: 1337,
    description: "The reign of Mansa Musa and the Mali Empire in West Africa.",
    category: "event",
  },
  {
    id: "gunpowder-period-introduction",
    no: 23,
    title: "Introduction to The Gunpowder Period",
    period: "Gunpowder Period",
    startYear: 1500,
    endYear: 1707,
    description: "Overview of the Gunpowder Period in Islamic history.",
    category: "introduction",
  },
  {
    id: "europe-and-turks",
    no: 24,
    title: "Europe and the Turks",
    period: "Gunpowder Period",
    startYear: 1453,
    endYear: 1922,
    description: "The relationship between Europe and the Ottoman Turks.",
    category: "culture",
  },
  {
    id: "life-ottoman-empire",
    no: 25,
    title: "Life in the Ottoman Empire",
    period: "Gunpowder Period",
    startYear: 1301,
    endYear: 1922,
    description: "Daily life and culture in the Ottoman Empire.",
    category: "culture",
  },
  {
    id: "mughal-empire",
    no: 26,
    title: "The Mughal Empire",
    period: "Gunpowder Period",
    startYear: 1526,
    endYear: 1857,
    description: "The rise and reign of the Mughal Empire in India.",
    category: "event",
  },
  {
    id: "enlightenment-revolutions",
    no: 27,
    title: "18th Century Enlightenment & Revolutions",
    period: "European Age",
    startYear: 1707,
    endYear: 2000,
    description:
      "The Age of Enlightenment and revolutionary movements in the 18th century.",
    category: "introduction",
  },
  {
    id: "european-world-empires",
    no: 28,
    title: "European World Empires",
    period: "European Age",
    startYear: 1800,
    endYear: 2000,
    description:
      "The expansion of European colonial empires in the 19th century.",
    category: "culture",
  },
  {
    id: "great-britain-supreme",
    no: 29,
    title: "19th Century Great Britain Supreme",
    period: "European Age",
    startYear: 1800,
    endYear: 1899,
    description:
      "The dominance of Great Britain as a global power in the 19th century.",
    category: "event",
  },
  {
    id: "world-wars",
    title: "20th Century The Two World Wars",
    no: 30,
    period: "European Age",
    startYear: 1900,
    endYear: 1945,
    description:
      "The impact of World War I and World War II on global affairs.",
    category: "event",
  },
  {
    id: "american-world-order",
    no: 31,
    title: "20th Century The American World Order",
    period: "European Age",
    startYear: 1945,
    endYear: 2000,
    description:
      "The rise of American global dominance in the post-World War II era.",
    category: "event",
  },
]

type GradeLevel = "3_6" | "7_9" | "highschool"

export default function HistoricalTimeline() {
  const [selectedEvent, setSelectedEvent] =
    React.useState<TimelineEvent | null>(null)
  const [gradeLevel, setGradeLevel] = React.useState<GradeLevel>("7_9")

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
    const timeDiff = endYear - startYear
    const left =
      ((startYear - timelineStart - 22 + timeDiff / 2) / timelineWidth) * 100
    return {
      left: `${left}%`,
    }
  }

  const getPositionStyleIntro = (startYear: number, endYear: number) => {
    const left = ((startYear - timelineStart - 22) / timelineWidth) * 100
    return {
      left: `${left}%`,
    }
  }

  const getCategoryColor = (category: TimelineEvent["category"]) => {
    switch (category) {
      case "event":
        return "bg-red-500/80 hover:bg-red-500/30 border-green-500"
      default:
        return "bg-gray-500/20 hover:bg-gray-500/30 border-gray-500"
    }
  }

  const getMainPeriodStyle = (index: number) => {
    const baseColor = "#2A9D8F"
    const opacity = 1 - index * 0.15 // Decrease opacity for each period
    return `rgba(42, 157, 143, ${Math.max(0.2, opacity)})`
  }

  const getSubPeriodStyle = (index: number) => {
    const baseColor = "#E9C46A"
    const opacity = 1 - index * 0.15 // Decrease opacity for each period
    return `rgba(233, 196, 106, ${Math.max(0.2, opacity)})`
  }

  const generateGridLines = () => {
    const lines = []
    for (let year = timelineStart; year <= timelineEnd; year += 50) {
      const left = ((year - timelineStart) / timelineWidth) * 100
      lines.push(
        <div
          key={year}
          className="absolute top-0 bottom-0 border-l border-dashed border-gray-200"
          style={{ left: `${left}%` }}
        />
      )
    }
    return lines
  }

  return (
    <Card className="w-full max-w-6xl mx-auto opacity-95 bg-white">
      <CardContent className="p-6">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="prose max-w-none">
              <h2 className="font-bold">
                Lessons in the History of Islam and the West
              </h2>
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
            <AlertTitle className="text-lg">Get started</AlertTitle>
            <AlertDescription>
              <ol className="list-decimal ml-4">
                <li className="my-1">
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
                <li className="my-1">
                  If this is your first time, start with{" "}
                  <Link
                    href={`${gradeLevel}/introduction`}
                    className="underline hover:no-underline"
                  >
                    Part 1: Introduction & Overview (Lesson 1-3)
                  </Link>
                  .
                </li>
                <li className="my-1">
                  Otherwise, click on an overview, event or culture lesson in
                  the timeline.
                </li>
              </ol>
            </AlertDescription>
          </Alert>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#2a9d8f] border border-green-500 rounded" />
              <span>Eurocentric Classification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#e9c46a] border border-blue-500 rounded" />
              <span>Islamic Classification</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 items-center justify-center flex bg-red-500/80 border border-red-500 rounded">
                <GrOverview className="w-4 h-4 text-white" />
              </div>
              <span>Overview Lesson</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 items-center justify-center flex bg-red-500/80 border border-red-500 rounded">
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <span>Event Lesson</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 items-center justify-center flex bg-red-500/80 border border-red-500 rounded">
                <LuBookOpenText className="w-4 h-4 text-white" />
              </div>
              <span>Culture Lesson</span>
            </div>
          </div>

          {/* Desktop Timeline */}
          <div className="relative h-[800px] hidden md:block">
            {/* Vertical grid lines */}
            {generateGridLines()}

            {/* Main period regions */}
            <div className="absolute top-11 left-0 right-0 h-16">
              {mainPeriods.map((period, rowIndex) => (
                <div
                  key={period.id}
                  className="absolute h-full flex items-center justify-cente border-x border-teal-200/50 px-4"
                  style={{
                    ...getPositionStyle(period.startYear, period.endYear),
                    backgroundColor: getMainPeriodStyle(rowIndex),
                  }}
                >
                  <div
                    className={`absolute ${
                      rowIndex % 2 === 0 ? "top-1/4" : "bottom-1/4"
                    } left-1/2 transform -translate-x-1/2 whitespace-nowrap flex flex-col items-center`}
                  >
                    <div className="text-sm font-medium text-white">
                      {period.title}
                    </div>
                    <div className="text-xs ml-1 text-gray-100 flex items-center">
                      ({period.startYear} -{" "}
                      {period.endYear === 2024
                        ? "present"
                        : `${period.endYear}`}
                      )
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sub-period regions */}
            <div className="absolute top-28 left-0 right-0 h-16">
              {subPeriods.map((period, rowIndex) => (
                <div
                  key={period.id}
                  className="absolute h-full flex items-center justify-center border-x border-amber-200/50 px-4"
                  style={{
                    ...getPositionStyle(period.startYear, period.endYear),
                    backgroundColor: getSubPeriodStyle(rowIndex),
                  }}
                >
                  <div
                    className={`absolute ${
                      rowIndex % 2 === 0 ? "top-1/4" : "bottom-1/4"
                    } left-1/2 transform -translate-x-1/2 whitespace-nowrap flex flex-col items-center`}
                  >
                    <div className="text-sm font-medium text-black">
                      {period.title}
                    </div>
                    <div className="text-xs ml-1 text-black flex items-center">
                      ({period.startYear} -{" "}
                      {period.endYear === 2024 ? "present" : period.endYear})
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline base line */}
            <div className="absolute left-0 right-0 top-0 h-0.5 bg-gray-200" />

            {/* Year markers */}
            {[
              500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600,
              1700, 1800, 1900, 2000,
            ].map((year) => (
              <div
                key={year}
                className="absolute top-0 transform translate-y-1/5"
                style={{
                  left: `${((year - timelineStart) / timelineWidth) * 100}%`,
                }}
              >
                <div className="h-3 w-0.5 bg-gray-300 mb-1" />
                <span className="text-sm text-gray-600 -ml-3">{year}</span>
              </div>
            ))}

            {/* Events and Labels */}
            {historicalEvents
              .filter((item) => item.category === "introduction")
              .map((event, index) => {
                const rowIndex = index % 2 // Use 4 rows
                return (
                  <div
                    key={event.id}
                    className="absolute cursor-pointer"
                    style={{
                      ...getPositionStyleIntro(event.startYear, event.endYear),
                      top: `${23 + rowIndex * 5}%`,
                    }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <button
                      className={`w-8 h-8 rounded-full cursor-pointer bg-red-500/80 hover:bg-red-500/30 border-green-500 border shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white relative flex items-center justify-center text-white`}
                      onClick={() => setSelectedEvent(event)}
                      aria-label={`View details for ${event.title}`}
                    >
                      <GrOverview className="w-5 h-5" />
                    </button>
                    <div
                      className={`absolute bottom-0.5
                    } -left-1/4 transform -translate-x-full flex flex-col whitespace-nowrap items-end`}
                    >
                      <div className="text-sm text-gray-600 bg-white px-1 flex gap-1">
                        <span className="rounded-full px-2 bg-red-500/80 opacity-75 text-white">
                          {`L${event.no || index}`}
                        </span>
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-400 bg-white px-1">
                        {event.startYear !== timelineStart
                          ? `(${event.startYear} - ${event.endYear})`
                          : `- ${event.endYear})`}
                      </div>
                    </div>
                  </div>
                )
              })}
            {historicalEvents
              .filter(
                (item) =>
                  item.category === "event" || item.category === "culture"
              )
              .map((event, index) => {
                const rowIndex = index % 10 // Use 4 rows
                return (
                  <div
                    key={event.id}
                    className="absolute cursor-pointer"
                    style={{
                      ...getPositionStyleFixedW(event.startYear, event.endYear),
                      top: `${34 + rowIndex * 7}%`,
                    }}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <button
                      className={`w-8 h-8 rounded-full cursor-pointer bg-red-500/80 hover:bg-red-500/30 border-green-500 border shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white relative flex items-center justify-center text-white`}
                      onClick={() => setSelectedEvent(event)}
                      aria-label={`View details for ${event.title}`}
                    >
                      {event.category === "culture" ? (
                        <LuBookOpenText className="w-5 h-5" />
                      ) : (
                        <Landmark className="w-5 h-5" />
                      )}
                    </button>
                    <div
                      className={`absolute bottom-0.5
                    } -left-1/4 transform -translate-x-full whitespace-nowrap flex flex-col items-end`}
                    >
                      <div className="text-sm text-gray-600 bg-white px-1 flex gap-1">
                        <span className="rounded-full px-2 bg-red-500/80 opacity-75 text-white">
                          {`L${event.no || index}`}
                        </span>
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-400 bg-white px-1">
                        {`(${event.startYear} - ${event.endYear})`}
                      </div>
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
