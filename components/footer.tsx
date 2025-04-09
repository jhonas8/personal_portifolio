"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800 pt-16 pb-24 md:pb-8 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Message Me Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <h3 className="text-2xl font-bold mb-6">Message Me</h3>
            <p className="text-gray-400 mb-6">
              Have a question or want to work together? Send me a message and I'll get back to you as soon as possible.
            </p>
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4 mb-8">
              <p className="flex items-center gap-3">
                <Mail className="text-emerald-400" size={20} />
                <a href={`mailto:${process.env.EMAIL_ADDRESS || "joao.victor.ribeiro.melo@joaomeloltda.com"}`} className="text-gray-300 hover:text-white transition-colors">
                  {process.env.EMAIL_ADDRESS || "joao.victor.ribeiro.melo@joaomeloltda.com"}
                </a>
              </p>
              <p className="text-gray-400">Based in Salvador-BA, Brazil</p>
            </div>

            <h3 className="text-xl font-bold mb-4">Follow Me</h3>
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
              <a href={`mailto:${process.env.EMAIL_ADDRESS || "joao.victor.ribeiro.melo@joaomeloltda.com"}`} className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} João Melo. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Back to top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}

