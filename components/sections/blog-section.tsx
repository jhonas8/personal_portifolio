"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BlogSection() {
  return (
    <section id="blog" className="container mx-auto px-4 py-20 md:py-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog</h2>
        <p className="text-xl text-gray-400 mb-8">
          Visit my blog to check my latest posts and thoughts on software development, tech trends, and industry insights.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/blog">
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">Visit Blog</Button>
          </Link>
          <Button
            variant="outline"
            className="border-emerald-600 text-emerald-400 hover:bg-emerald-950 w-full sm:w-auto"
          >
            Subscribe for Updates
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

