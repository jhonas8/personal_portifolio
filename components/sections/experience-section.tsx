"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Experience } from "@/lib/data/experiences"

export function ExperienceSection({ initialData }: { initialData?: Experience[] }) {
  const [data, setData] = useState<Experience[] | null>(initialData || null)
  const [isLoading, setIsLoading] = useState(!initialData)

  // If we don't have initialData (SSR), fetch on the client side
  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/data/experiences')
          if (!response.ok) {
            throw new Error('Failed to fetch experiences data')
          }
          const experiencesData = await response.json()
          setData(experiencesData)
        } catch (error) {
          console.error('Error fetching experiences data:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [initialData])

  // Use default experiences if data is still loading or unavailable
  const experiences = data || [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      startDate: "2021",
      endDate: "Present",
      description:
        "Led the development of the company's flagship product using React and Next.js. Implemented state management with Redux and improved performance by 40%.",
      skills: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      startDate: "2018",
      endDate: "2021",
      description:
        "Developed and maintained multiple web applications using React on the frontend and Node.js on the backend. Worked closely with the design team to implement responsive UI components.",
      skills: ["React", "Node.js", "Express", "MongoDB", "GraphQL"],
    },
    {
      title: "Junior Web Developer",
      company: "WebCraft Agency",
      startDate: "2016",
      endDate: "2018",
      description:
        "Started as a junior developer working on various client projects. Gained experience in frontend development with HTML, CSS, and JavaScript.",
      skills: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
    },
  ]

  return (
    <section className="container mx-auto px-4 py-20 md:py-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Work Experience</h2>

        {isLoading ? (
          // Loading skeleton
          <div className="space-y-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="py-4 px-5">
                    <div className="h-6 bg-gray-800 rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-gray-800 rounded w-1/3"></div>
                  </CardHeader>
                  <CardContent className="py-3 px-5">
                    <div className="h-20 bg-gray-800 rounded mb-3"></div>
                    <div className="flex flex-wrap gap-1">
                      {[0, 1, 2, 3].map((j) => (
                        <div key={j} className="h-5 bg-gray-800 rounded w-16"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  x: index % 2 === 0 ? -50 : 50, 
                  scale: 0.8 
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1 
                }}
                viewport={{ 
                  once: false,
                  amount: 0.3
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="py-4 px-5">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                      <CardTitle className="text-lg md:text-xl">{exp.title}</CardTitle>
                      <span className="text-xs text-gray-400">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-emerald-400 font-medium text-sm">{exp.company}</p>
                  </CardHeader>
                  <CardContent className="py-3 px-5">
                    <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {exp.skills && exp.skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.2 + (idx * 0.05) 
                          }}
                          viewport={{ amount: 0.5, once: false }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 text-xs px-2 py-0.5"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

