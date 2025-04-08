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
  
  // Increase the number of pages to account for varying content heights
  // This controls the total scrollable height
  const totalPages = 5.5

  return (
    <main className="relative h-screen w-full space-gradient text-white overflow-hidden">
      <Header />
      <div ref={containerRef} className="w-full h-screen">
        <Canvas className="w-full h-full">
          <ScrollControls pages={totalPages} damping={0.25}>
            <Scene />
            <Scroll html>
              <div className="w-screen">
                {/* About section - First viewport */}
                <section id="about" className="h-screen flex items-center justify-center">
                  <AboutSection initialData={initialMainData} />
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
                
                {/* Footer - Always at the bottom */}
                <section id="contact" className="min-h-screen flex items-center justify-center mt-20">
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