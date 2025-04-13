"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Scroll, ScrollControls } from "@react-three/drei"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { BlogSection } from "@/components/sections/blog-section"
import { Scene } from "@/components/3d/scene"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Client component with static data
export function HomeContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [totalPages, setTotalPages] = useState(5.5)
  
  // Update totalPages based on screen size
  useEffect(() => {
    const handleResize = () => {
      // More pages needed for smaller screens
      if (window.innerWidth < 640) {
        setTotalPages(8.5); // Small mobile devices
      } else if (window.innerWidth < 768) {
        setTotalPages(7.5); // Medium mobile devices
      } else if (window.innerWidth < 1024) {
        setTotalPages(6.5); // Tablets
      } else {
        setTotalPages(5.5); // Desktops
      }
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="relative h-screen w-full space-gradient text-white overflow-hidden">
      {/* <Header /> */}
      <div ref={containerRef} className="w-full h-screen">
        <Canvas className="w-full h-full">
          <ScrollControls pages={totalPages} damping={0.25}>
            <Scene />
            <Scroll html>
              <div className="w-screen">
                {/* About section - First viewport with top padding */}
                <section id="about" className="h-screen flex items-center justify-center pt-16 md:pt-0">
                  <AboutSection />
                </section>
                
                {/* Experience section - Allow natural height growth */}
                <section id="experience" className="min-h-screen py-24 flex flex-col justify-start">
                  <ExperienceSection />
                </section>
                
                {/* Projects section - After experience */}
                <section id="projects" className="min-h-screen flex items-center justify-center mt-12">
                  <ProjectsSection />
                </section>
                
                {/* Blog section */}
                <section id="blog-section" className="min-h-screen flex items-center justify-center">
                  <BlogSection />
                </section>
                
                {/* Footer - Ensure it's visible on mobile with adequate space */}
                <section id="contact" className="min-h-screen md:min-h-[60vh] flex items-center justify-center mt-24 md:mt-0 mb-0">
                  <Footer />
                </section>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </main>
  )
} 