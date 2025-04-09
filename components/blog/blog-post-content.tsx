"use client"

import { BlogPost } from "@/lib/data/blog"
import { formatDate } from "date-fns"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

export function PostContent({ content }: { content: string }) {
  return (
    <div
      className="blog-content prose prose-invert lg:prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export function BlogPostContent({ post }: { post: BlogPost | null }) {
  if (!post) return null;
  
  const { title, publishedAt, createdAt, content, tags, image } = post;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl"
    >
      <Link href="/blog" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8">
        <ArrowLeft size={16} className="mr-2" /> Back to All Posts
      </Link>
      
      <div className="aspect-[16/9] relative mb-8 rounded-lg overflow-hidden">
        <Image
          alt={title}
          className="object-cover"
          src={image}
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      
      <div className="flex flex-wrap gap-2 items-center mb-8">
        <span className="text-gray-400 text-sm">
          {formatDate(new Date(publishedAt || createdAt), "dd MMMM yyyy")}
        </span>
        <span className="text-gray-500">•</span>
        <div className="text-sm text-gray-400">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              href={`/blog/tag/${tag.name}`}
              className="mr-2 hover:text-emerald-400 transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-900/30 rounded-lg border border-gray-800 p-8">
        <PostContent content={content} />
      </div>
      
      {/* Add styles for the blog content */}
      <style jsx global>{`
        .blog-content h2 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: bold;
          font-size: 1.5rem;
          color: #f8f8f8;
        }
        
        .blog-content p {
          margin-bottom: 1.25em;
          line-height: 1.7;
        }
        
        .blog-content ul, .blog-content ol {
          margin-left: 2em;
          margin-bottom: 1.25em;
        }
        
        .blog-content li {
          margin-bottom: 0.5em;
        }
        
        .blog-content pre {
          background-color: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin-bottom: 1.25em;
        }
        
        .blog-content code {
          font-family: monospace;
          font-size: 0.9em;
          color: #10b981;
        }
        
        .blog-content a {
          color: #10b981;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        
        .blog-content a:hover {
          color: #34d399;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1em;
          font-style: italic;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: 1.25em;
          background-color: rgba(16, 185, 129, 0.05);
          padding: 1em;
          border-radius: 0 0.375rem 0.375rem 0;
        }
      `}</style>
    </motion.div>
  );
} 