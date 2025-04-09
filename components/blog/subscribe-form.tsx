"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

export function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }
    
    setStatus("loading")
    
    // Simulate API call - In production, this would call your API
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus("success")
      setMessage("Thanks for subscribing! You'll receive updates about new blog posts.")
      setEmail("")
    } catch (error) {
      setStatus("error")
      setMessage("There was an error subscribing. Please try again.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-center"
    >
      <h3 className="text-2xl font-bold mb-4">Subscribe for Updates</h3>
      <p className="text-gray-400 mb-6">
        Stay updated with the latest articles, tutorials, and insights on software development, tech trends, and industry best practices.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {status !== "success" ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 shrink-0"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        ) : (
          <div className="bg-emerald-900/30 border border-emerald-800 rounded-md p-4 text-emerald-300">
            {message}
          </div>
        )}
        
        {status === "error" && (
          <div className="mt-2 text-sm text-red-400">
            {message}
          </div>
        )}
      </form>
    </motion.div>
  )
} 