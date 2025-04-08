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

// Client component that uses the pre-fetched data
export function HomeContent({ initialMainData }: { initialMainData?: MainData }) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <main className="relative h-screen w-full space-gradient text-white overflow-hidden">
      <Header />
      <div ref={containerRef} className="w-full h-screen">
        <Canvas className="w-full h-full">
          <ScrollControls pages={5} damping={0.25}>
            <Scene />
            <Scroll html>
              <div className="w-screen">
                <div id="about" className="h-screen flex items-center justify-center">
                  <AboutSection initialData={initialMainData} />
                </div>
                <div id="experience" className="h-screen flex items-center justify-center">
                  <ExperienceSection />
                </div>
                <div id="projects" className="h-screen flex items-center justify-center">
                  <ProjectsSection />
                </div>
                <div id="blog-section" className="h-screen flex items-center justify-center">
                  <BlogSection />
                </div>
                <div id="contact" className="h-screen flex items-center justify-center">
                  <Footer />
                </div>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </main>
  )
} 