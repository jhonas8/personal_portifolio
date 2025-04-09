"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

// This is the client-side component with static data
export function AboutSection() {
  // Use environment variables for links when available
  const githubProfile = process.env.GITHUB_PROFILE || "https://github.com/jhonas8"
  const linkedinProfile = process.env.LINKEDIN_PROFILE || "https://www.linkedin.com/in/joao-melo-ribeiro/"
  const emailAddress = process.env.EMAIL_ADDRESS || "joao.victor.ribeiro.melo@joaomeloltda.com"
  
  // Static content from the provided data
  const data = {
    name: "João Melo",
    title: "Software Developer",
    personalDescription: "I'm a fullstack developer with 5 years of experience, primarily focused on backend development. I specialize in Node.js and FastAPI development, with hands-on experience working with Golang, Java, Python, and Ruby on Rails. While my strongest expertise lies in backend technologies, I also work with React, Next.js, and TypeScript to deliver complete, end-to-end solutions that are both performant and accessible.",
    contactMe: "https://linktr.ee/joaomeloltda"
  }

  // Dynamically fetch CV link
  const [cvLink, setCvLink] = useState("#")

  useEffect(() => {
    const fetchCvLink = async () => {
      try {
        const response = await fetch('/api/data/main')
        if (response.ok) {
          const mainData = await response.json()
          if (mainData && mainData.cvLink) {
            console.log('CV link:', mainData.cvLink)
            setCvLink(mainData.cvLink)
          }
        }
      } catch (error) {
        console.error('Error fetching CV link:', error)
        // Keep using the default CV link if fetching fails
      }
    }

    fetchCvLink()
  }, [])

  return (
    <section className="container mx-auto px-4 py-20 md:py-0 mt-8 md:mt-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.8 }}
          className="text-sm font-semibold text-emerald-400 mb-2"
        >
          Hello, I'm
        </motion.h2>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: false, amount: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          {data.name}
        </motion.h1>
        
        <motion.h3
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false, amount: 0.8 }}
          className="text-2xl md:text-3xl font-medium text-gray-300 mb-8"
        >
          {data.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: false, amount: 0.8 }}
          className="text-lg text-gray-400 mb-8"
        >
          {data.personalDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: false, amount: 0.8 }}
          className="flex flex-wrap gap-4 mb-10"
        >
          <Link href={cvLink} target="_blank">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Download CV <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href={data.contactMe} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-950">
              Contact Me
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: false, amount: 0.8 }}
          className="flex gap-6"
        >
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
        </motion.div>
      </motion.div>
    </section>
  )
}

