"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutSection() {
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
        <h1 className="text-5xl md:text-7xl font-bold mb-6">João Melo</h1>
        <h3 className="text-2xl md:text-3xl font-medium text-gray-300 mb-8">Software Developer</h3>

        <p className="text-lg text-gray-400 mb-8">
          I'm a fullstack developer with 5 years of experience, primarily focused on backend development. I specialize in
          Node.js and FastAPI development, with hands-on experience working with Golang, Java, Python, and Ruby on Rails. While
          my strongest expertise lies in backend technologies, I also work with React, Next.js, and TypeScript to deliver
          complete, end-to-end solutions that are both performant and accessible.
        </p>

        <div className="flex flex-wrap gap-4 mb-10">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Download CV <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-950">
            Contact Me
          </Button>
        </div>

        <div className="flex gap-6">
          <a
            href={process.env.GITHUB_PROFILE || "https://github.com/jhonas8"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href={process.env.LINKEDIN_PROFILE || "https://www.linkedin.com/in/joao-melo-ribeiro/"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href={`mailto:${process.env.EMAIL_ADDRESS || "joao.victor.ribeiro.melo@joaomeloltda.com"}`} 
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  )
}

