"use client"

import { cn } from "@/lib/utils"
import { BlogPost } from "@/lib/data/blog"
import { formatDate } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { FunctionComponent } from "react"
import { motion } from "framer-motion"

export const BlogPostPreview: FunctionComponent<{
  post: BlogPost;
}> = ({ post }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="break-words bg-gray-900/30 rounded-lg overflow-hidden border border-gray-800 hover:border-emerald-800 transition-all duration-300"
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
      <div className="p-6 space-y-4">
        <h2 className="font-sans font-semibold tracking-tighter text-2xl md:text-3xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-emerald-400 transition-colors">{post.title}</Link>
        </h2>
        <div className="text-sm text-gray-400 italic">
          {formatDate(new Date(post.publishedAt || post.updatedAt), "dd MMMM yyyy")}
        </div>
        <div className="text-gray-300 leading-relaxed line-clamp-3">
          {post.description}
        </div>
        <div className="text-sm text-gray-400 pt-2">
          {post.tags.map((tag) => (
            <Link 
              key={tag.id} 
              href={`/blog/tag/${tag.name}`}
              className="mr-2 inline-block hover:text-emerald-400 transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const BlogPostsPreview: FunctionComponent<{
  posts: BlogPost[];
  className?: string;
}> = ({ posts, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 lg:gap-12 md:grid-cols-2 my-8",
        className
      )}
    >
      {posts.map((post) => (
        <BlogPostPreview key={post.id} post={post} />
      ))}
    </div>
  );
}; 