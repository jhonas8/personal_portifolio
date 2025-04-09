"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BlogPost, getBlogPosts } from "@/lib/data/blog"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function BlogSection() {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const data = await getBlogPosts(1, 3)
        setRecentPosts(data.posts as unknown as BlogPost[])
      } catch (error) {
        console.error("Error fetching recent posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentPosts()
  }, [])

  return (
    <section id="blog" className="container mx-auto px-4 py-20 md:py-0">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Blog</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Explore my latest articles and thoughts on software development, tech trends, and industry insights.
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {recentPosts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/30 border border-gray-800 rounded-lg overflow-hidden hover:border-emerald-800 transition-all duration-300 text-left"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="aspect-[16/9] relative">
                    <Image
                      alt={post.title}
                      className="object-cover"
                      src={post.image}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-emerald-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3">
                    {post.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-12">
            <p className="text-gray-400">Stay tuned for upcoming articles!</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/blog">
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
              Browse All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/blog#subscribe">
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-400 hover:bg-emerald-950 w-full sm:w-auto"
            >
              Subscribe for Updates
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

