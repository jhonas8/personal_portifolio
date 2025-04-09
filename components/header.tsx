"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useScroll } from "@react-three/drei"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're on a page with Three.js (like home page)
      if (document.getElementById('blog-section')) {
        // We're on the main page with ScrollControls, no need for scroll listener
        // The render loop below will handle it
        return;
      }
      
      // Regular scroll behavior for non-Three.js pages
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Use drei's scroll hook for Three.js pages
  const scroll = useScroll()
  
  // Update scrolled state on animation frame when using Three.js
  useEffect(() => {
    if (!document.getElementById('blog-section')) {
      // We're not on the main page with ScrollControls
      return;
    }
    
    let rafId: number;
    const updateScroll = () => {
      if (scroll?.offset > 0.05) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
      rafId = requestAnimationFrame(updateScroll)
    }
    
    rafId = requestAnimationFrame(updateScroll)
    return () => cancelAnimationFrame(rafId)
  }, [scroll])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    
    // Try to find the element
    const element = document.getElementById(id)
    
    if (element) {
      // Calculate appropriate scroll offset based on the section
      const headerHeight = 80; // Approximate header height
      let offsetY = 0;
      
      offsetY = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Specific adjustments for different sections if needed
      if (id === 'experience') {
        // Add additional offset for experience section
        offsetY -= 20;
      } else if (id === 'projects') {
        // Add specific offset for projects section
        offsetY -= 10;
      }
      
      // Perform the smooth scroll
      window.scrollTo({
        top: offsetY,
        behavior: "smooth",
      })
      
      // Close mobile menu if open
      setIsMenuOpen(false)
    } else {
      // If element not found immediately, try once more after a small delay
      // This helps with dynamically rendered sections
      setTimeout(() => {
        const delayedElement = document.getElementById(id)
        if (delayedElement) {
          const headerHeight = 80;
          const offsetY = delayedElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetY,
            behavior: "smooth",
          })
        }
        setIsMenuOpen(false)
      }, 100)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-gray-800/50"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          João Melo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
            className="hover:text-emerald-400 transition-colors"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, "experience")}
            className="hover:text-emerald-400 transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, "projects")}
            className="hover:text-emerald-400 transition-colors"
          >
            Projects
          </a>
          <Link href="/blog" className="hover:text-emerald-400 transition-colors">
            Blog
          </Link>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hover:text-emerald-400 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
          <nav className="flex flex-col space-y-8 text-center text-xl">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, "about")}
              className="hover:text-emerald-400 transition-colors"
            >
              About
            </a>
            <a
              href="#experience"
              onClick={(e) => handleNavClick(e, "experience")}
              className="hover:text-emerald-400 transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, "projects")}
              className="hover:text-emerald-400 transition-colors"
            >
              Projects
            </a>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="hover:text-emerald-400 transition-colors"
            >
              Blog
            </Link>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="hover:text-emerald-400 transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

