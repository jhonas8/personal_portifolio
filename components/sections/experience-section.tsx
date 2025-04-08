"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Experience } from "@/lib/data/experiences"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// This is the client-side component that will receive server-fetched data
export function ExperienceSection({ initialData }: { initialData?: Experience[] }) {
  const [experiences, setExperiences] = useState<Experience[]>(initialData || [])
  const [isLoading, setIsLoading] = useState(!initialData)
  const [error, setError] = useState<string | null>(null)

  // If we don't have initialData (SSR), fetch on the client side
  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/data/experiences')
          if (!response.ok) {
            throw new Error('Failed to fetch experiences data')
          }
          const data = await response.json()
          setExperiences(data)
        } catch (error) {
          console.error('Error fetching experiences data:', error)
          setError('An error occurred while fetching your work experience data. Please try again later.')
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [initialData])

  // Skeleton loader while data is being fetched
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div key={i} className="bg-gray-900 border border-gray-800 rounded-lg p-4 animate-pulse">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
            <div className="h-5 bg-gray-700 rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 rounded w-1/4"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-1/5 mb-2"></div>
          <div className="space-y-2 mb-2">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
          </div>
          <div className="flex flex-wrap gap-1">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-5 bg-gray-700 rounded w-16"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  // Error message if data fetch failed
  const ErrorMessage = ({ message }: { message: string }) => (
    <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )

  // Format the period string (start date - end date)
  const formatPeriod = (startDate: string, endDate: string) => {
    return `${startDate} - ${endDate}`
  }

  return (
    <section className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Work Experience</h2>

        <div className="h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-emerald-600 scrollbar-track-gray-800">
          {isLoading ? (
            <SkeletonLoader />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : experiences.length === 0 ? (
            <ErrorMessage message="No work experience data found. Please check your data source or try again later." />
          ) : (
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="py-4 px-5">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                        <CardTitle className="text-lg md:text-xl">{exp.title}</CardTitle>
                        <span className="text-xs text-gray-400">{formatPeriod(exp.startDate, exp.endDate)}</span>
                      </div>
                      <p className="text-emerald-400 font-medium text-sm">{exp.company}</p>
                    </CardHeader>
                    <CardContent className="py-3 px-5">
                      <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.skills.map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 text-xs px-2 py-0.5"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  )
}

