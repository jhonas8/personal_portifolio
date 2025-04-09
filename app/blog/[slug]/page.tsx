"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BlogPostContent } from "@/components/blog/blog-post-content"
import { SubscribeForm } from "@/components/blog/subscribe-form"
import { getBlogPost, BlogPost } from "@/lib/data/blog"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      try {
        const data = await getBlogPost(slug)
        setPost(data.post)
      } catch (error) {
        console.error("Error fetching blog post:", error)
      } finally {
        setLoading(false)
      }
    }
    
    if (slug) {
      fetchPost()
    }
  }, [slug])
  
  return (
    <div className="min-h-screen flex flex-col space-gradient text-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : post ? (
            <BlogPostContent post={post} />
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
                <p className="text-gray-400 mb-4">
                  The blog post you're looking for doesn't exist or has been removed.
                </p>
              </div>
            </div>
          )}
          
          {/* Subscribe Form */}
          <div className="max-w-4xl mx-auto mt-16">
            <SubscribeForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 