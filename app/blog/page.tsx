"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col space-gradient text-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
              <p className="text-gray-400 mb-8">
                I'm currently working on some interesting articles about software development, technology trends, and my
                personal experiences in the industry. Check back soon for updates!
              </p>

              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-medium mb-4">Get notified when new articles are published</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <Button className="bg-emerald-600 hover:bg-emerald-700 shrink-0">Subscribe</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

