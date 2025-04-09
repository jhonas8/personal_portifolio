"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "OMP",
      startDate: "2024",
      endDate: "present",
      description: "Lead the development of payment systems, automated agents and microservices maintanance. Working close to the customer, was resposible to architect and develop software solutions using cloud solutions and microservices pattern.",
      skills: ["GCP", "AWS", "Python", "Nodejs", "Golang", "FastAPI"],
    },
    {
      title: "Software Instructor",
      company: "Rasmoo",
      startDate: "2023",
      endDate: "present",
      description: "Lead the creation of software instruction modules; Auxiliate developers from all levels to grow on knowledge and further steps on career. Worked with classes for DevOps and programming contents.",
      skills: ["AWS", "Java", "Golang", "K8s", "Docker", "GCP", "Azure"],
    },
    {
      title: "Software Engineer",
      company: "Westpoint",
      startDate: "2020",
      endDate: "2024",
      description: "Worked on different projects, being responsible to help building and maintain a large data processing and orchestration service; Deployment of Spark and Airflow on K8s to AWS platform; Worked with relational, non-relational and graph databases. Developed a whole feature of large data aggregation with database stream watchers for updating the pre-processed data.",
      skills: ["AWS", "CDK", "NextJs", "ReactJs", "React Native", "Nodejs", "Python", "Airflow", "Spark"],
    },
    {
      title: "Software Engineer",
      company: "Ledax",
      startDate: "2022",
      endDate: "2023",
      description: "Worked on building data-oriented dashboards for companies to track energy consumption metrics.Worked on developing a billings module; Creating a Treemap graph from scratch; Ensuring responsiveness on pages; Showing time series data on different graphs and interactive components.",
      skills: ["AWS", "ReactJs", "React graphs", "Figma"],
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
                    <span className="text-xs text-gray-400">{exp.startDate} - {exp.endDate}</span>
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

