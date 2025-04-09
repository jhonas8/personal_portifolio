"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { BlogPostsPreview } from "@/components/blog/blog-post-preview"
import { BlogPostsPagination } from "@/components/blog/blog-posts-pagination"
import { SubscribeForm } from "@/components/blog/subscribe-form"
import { GetPostsResult, getBlogPosts } from "@/lib/data/blog"

export default function BlogPage() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const currentPage = pageParam ? parseInt(pageParam) : 1
  
  const [blogData, setBlogData] = useState<GetPostsResult | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const data = await getBlogPosts(currentPage, 3)
        setBlogData(data)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [currentPage])
  
  return (
    <div className="min-h-screen flex flex-col space-gradient text-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <Link href="/" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8">
              <ArrowLeft size={16} className="mr-2" /> Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : blogData && blogData.posts.length > 0 ? (
              <>
                <BlogPostsPreview posts={blogData.posts} />
                
                {blogData.pagination.totalPages > 1 && (
                  <div className="my-12">
                    <BlogPostsPagination pagination={blogData.pagination} />
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">No posts found!</h2>
                <p className="text-gray-400 mb-4">
                  Check back soon for updates or subscribe to get notified when new articles are published.
                </p>
              </div>
            )}
            
            {/* Subscribe Form */}
            <div className="mt-16">
              <SubscribeForm />
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

