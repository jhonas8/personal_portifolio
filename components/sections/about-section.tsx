"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { MainData } from "@/lib/data/main"
import Link from "next/link"

// This is the client-side component that will receive server-fetched data
export function AboutSection({ initialData }: { initialData?: MainData }) {
  const [data, setData] = useState<MainData | null>(initialData || null)
  const [isLoading, setIsLoading] = useState(!initialData)

  // If we don't have initialData (SSR), fetch on the client side
  useEffect(() => {
    if (!initialData) {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/data/main')
          if (!response.ok) {
            throw new Error('Failed to fetch main data')
          }
          const mainData = await response.json()
          setData(mainData)
        } catch (error) {
          console.error('Error fetching main data:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [initialData])

  // Use default content if data is still loading
  if (!data && isLoading) {
    return (
      <section className="container mx-auto px-4 py-20 md:py-0">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-4 w-24 bg-gray-700 rounded mb-2"></div>
          <div className="h-10 w-48 bg-gray-700 rounded mb-6"></div>
          <div className="h-6 w-64 bg-gray-700 rounded mb-8"></div>
          <div className="h-32 bg-gray-700 rounded mb-8"></div>
          <div className="flex gap-4 mb-10">
            <div className="h-10 w-32 bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-700 rounded"></div>
          </div>
          <div className="flex gap-6">
            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </section>
    )
  }

  // Fallback values in case data is null
  const {
    name = "João Melo",
    title = "Software Developer",
    personalDescription = "I'm a fullstack developer with 5 years of experience, primarily focused on backend development. I specialize in Node.js and FastAPI development, with hands-on experience working with Golang, Java, Python, and Ruby on Rails.",
    cvLink = "#",
    contactMe = "#contact",
    githubProfile = "https://github.com/jhonas8",
    linkedinProfile = "https://www.linkedin.com/in/joao-melo-ribeiro/",
    emailAddress = "joao.victor.ribeiro.melo@joaomeloltda.com"
  } = data || {}

  return (
    <section className="container mx-auto px-4 py-20 md:py-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-sm font-semibold text-emerald-400 mb-2">Hello, I'm</h2>
        <h1 className="text-5xl md:text-7xl font-bold mb-6">{name}</h1>
        <h3 className="text-2xl md:text-3xl font-medium text-gray-300 mb-8">{title}</h3>

        <p className="text-lg text-gray-400 mb-8">
          {personalDescription}
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <Link href={cvLink} target="_blank">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Download CV <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href={contactMe} target="_blank">
            <Button variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-950">
              Contact Me
            </Button>
          </Link>
        </div>

        <div className="flex gap-6">
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href={linkedinProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href={`mailto:${emailAddress}`} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

