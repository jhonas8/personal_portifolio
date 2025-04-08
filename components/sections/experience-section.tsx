"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Led the development of the company's flagship product using React and Next.js. Implemented state management with Redux and improved performance by 40%.",
      skills: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS"],
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      period: "2018 - 2021",
      description:
        "Developed and maintained multiple web applications using React on the frontend and Node.js on the backend. Worked closely with the design team to implement responsive UI components.",
      skills: ["React", "Node.js", "Express", "MongoDB", "GraphQL"],
    },
    {
      title: "Junior Web Developer",
      company: "WebCraft Agency",
      period: "2016 - 2018",
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
                    <span className="text-xs text-gray-400">{exp.period}</span>
                  </div>
                  <p className="text-emerald-400 font-medium text-sm">{exp.company}</p>
                </CardHeader>
                <CardContent className="py-3 px-5">
                  <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {exp.skills.map((skill, idx) => (
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
      </motion.div>
    </section>
  )
}

