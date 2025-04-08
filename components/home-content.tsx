"use client"

import { useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Scroll, ScrollControls } from "@react-three/drei"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { BlogSection } from "@/components/sections/blog-section"
import { Scene } from "@/components/3d/scene"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MainData } from "@/lib/data/main"
import { Experience } from "@/lib/data/experiences"

// Client component that uses the pre-fetched data
export function HomeContent({ 
  initialMainData,
  initialExperiencesData
}: { 
  initialMainData?: MainData;
  initialExperiencesData?: Experience[];
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Set the number of pages based on content
  // This controls the total scrollable height
  const totalPages = 5

  return (
    <main className="relative h-screen w-full space-gradient text-white overflow-hidden">
      <Header />
      <div ref={containerRef} className="w-full h-screen">
        <Canvas className="w-full h-full">
          <ScrollControls pages={totalPages} damping={0.25} distance={1}>
            <Scene />
            <Scroll html>
              <div className="w-screen">
                {/* First section - About */}
                <section id="about" className="h-screen flex items-center justify-center">
                  <AboutSection initialData={initialMainData} />
                </section>
                
                {/* Second section - Experience */}
                <section id="experience" className="h-screen flex items-center justify-center">
                  <ExperienceSection initialData={initialExperiencesData} />
                </section>
                
                {/* Third section - Projects */}
                <section id="projects" className="h-screen flex items-center justify-center">
                  <ProjectsSection />
                </section>
                
                {/* Fourth section - Blog */}
                <section id="blog-section" className="h-screen flex items-center justify-center">
                  <BlogSection />
                </section>
                
                {/* Fifth section - Contact/Footer - positioned at the very bottom */}
                <section id="contact" className="h-screen flex items-center justify-center">
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