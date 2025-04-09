"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { BlogPostsPreview } from "@/components/blog/blog-post-preview"
import { BlogPostsPagination, BlogPaginationProps } from "@/components/blog/blog-posts-pagination"
import { SubscribeForm } from "@/components/blog/subscribe-form"
import { BlogPost, GetPostsResult, getPostsByTag } from "@/lib/data/blog"

// Component that uses navigation hooks
function TagContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const tagName = params.tag as string
  const pageParam = searchParams.get('page')
  const currentPage = pageParam ? parseInt(pageParam) : 1
  
  const [blogData, setBlogData] = useState<GetPostsResult | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const data = await getPostsByTag(tagName, currentPage)
        setBlogData(data)
      } catch (error) {
        console.error("Error fetching blog posts by tag:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (tagName) {
      fetchPosts()
    }
  }, [tagName, currentPage])

  return (
    <>
      <Link href="/blog" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8">
        <ArrowLeft size={16} className="mr-2" /> Back to All Posts
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-2">#{tagName}</h1>
      <p className="text-gray-400 text-lg mb-8">
        Browsing posts tagged with #{tagName}
      </p>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : blogData && blogData.posts.length > 0 ? (
        <>
          <BlogPostsPreview posts={blogData.posts as unknown as BlogPost[]} />
          
          {blogData.pagination.totalPages > 1 && (
            <div className="my-12">
              <BlogPostsPagination 
                pagination={blogData.pagination as unknown as BlogPaginationProps['pagination']} 
                basePath={`/blog/tag/${tagName}?page=`}
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No posts found with this tag</h2>
          <p className="text-gray-400 mb-4">
            Try browsing a different tag or check out all posts on the blog.
          </p>
        </div>
      )}
    </>
  )
}

export default function TagPage() {
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
            <Suspense fallback={
              <div className="flex justify-center items-center h-64">
                <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <TagContent />
            </Suspense>
            
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