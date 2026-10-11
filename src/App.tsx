import { useState, lazy, Suspense } from 'react';
import { Preloader } from './components/Preloader';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { SpatialBackground } from './components/SpatialBackground';
import { CustomCursor } from './components/CustomCursor';
import { CommandPalette } from './components/CommandPalette';
import { PillNavbar } from './components/PillNavbar';
import { Sidebar } from './components/Sidebar';
import { TerminalOverlay } from './components/TerminalOverlay';
import { SpatialPanel } from './components/SpatialPanel';
import { WebGLErrorBoundary } from './components/canvas/WebGLErrorBoundary';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { StatsStrip } from './components/sections/StatsStrip';
import { SkillsSection } from './components/sections/SkillsSection';
import { MarqueeTextBand } from './components/MarqueeTextBand';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { OpenSourceSection } from './components/sections/OpenSourceSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';

// Code-split WebGL 3D avatar shatter canvas
const ShatterAvatarScene = lazy(() => import('./components/canvas/ShatterAvatarScene'));

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <SmoothScrollProvider>
      {/* 1. Interactive Custom Cursor (dot + trailing ring with contextual labels) */}
      <CustomCursor />

      {/* 2. Developer Terminal Easter Egg (Press `) */}
      <TerminalOverlay />

      {/* 3. Global Command Palette (Press Cmd/Ctrl + K) */}
      <CommandPalette />

      {/* 4. VisionOS Spatial Preloader */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* 5. Deep Navy Background Gradient + Film Grain */}
      <SpatialBackground />

      {/* 6. Fixed Fullscreen WebGL 3D Avatar Shatter Canvas with Robust Fallback */}
      <WebGLErrorBoundary>
        <Suspense fallback={null}>
          <ShatterAvatarScene />
        </Suspense>
      </WebGLErrorBoundary>

      {/* 7. Fixed Top Pill Nav (Logo, Section Pills, Audio Toggle, Search, Hire Me) */}
      <PillNavbar />

      {/* 8. Fixed Left Slim Icon Sidebar */}
      <Sidebar />

      {/* 9. Large Floating VisionOS Glass Window Panel Shell */}
      <main
        className={`relative z-10 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <SpatialPanel>
          {/* Hero Bento Area */}
          <HeroSection />

          {/* 01 / About Section */}
          <AboutSection />

          {/* L2.3 / Verified Stats Strip (Solid Cream Cards) */}
          <StatsStrip />

          {/* 02 / Skills Section */}
          <SkillsSection />

          {/* K2 Marquee Text Band */}
          <MarqueeTextBand />

          {/* 03 / Selected Projects Gallery */}
          <ProjectsSection />

          {/* 04 / Open Source PRs */}
          <OpenSourceSection />

          {/* 05 / Timeline (Experience & Milestones) */}
          <ExperienceSection />

          {/* 06 / Exit (Contact Transmission) */}
          <ContactSection />
        </SpatialPanel>
      </main>
    </SmoothScrollProvider>
  );
}

export default App;
