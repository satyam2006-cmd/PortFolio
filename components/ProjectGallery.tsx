"use client";

import React, { useEffect, useState, forwardRef } from "react";
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import ProjectStickyCards from "./ProjectStickyCards";
import { ArrowRight } from "lucide-react";
import useIsMobile from "@/hooks/useIsMobile";

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  created_at: string;
}

interface ProjectGalleryProps {
  onClose: () => void;
}

const ProjectGallery = forwardRef<HTMLDivElement, ProjectGalleryProps>(
  ({ onClose }, ref) => {
    const [repos, setRepos] = useState<GitHubRepo[]>([]);
    const [isClosing, setIsClosing] = useState(false);
    const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
    const { isMobile, isTablet, isSmall } = useIsMobile();
    const isSmallScreen = isMobile;

    const [scrollContainer, setScrollContainer] =
      useState<HTMLDivElement | null>(null);
    const scrollContainerRef = (el: HTMLDivElement | null) => {
      if (el) setScrollContainer(el);
    };

    const handleClose = (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setIsClosing(true);
      // Give Framer Motion time to release pointer capture before unmounting
      setTimeout(() => {
        onClose();
      }, 150);
    };

    // Fetch GitHub repos
    useEffect(() => {
      // Fetch by created date
      fetch(
        "https://api.github.com/users/satyam2006-cmd/repos?sort=created&direction=desc&per_page=12",
      )
        .then((res) => res.json())
        .then((data: GitHubRepo[]) => {
          const filtered = data.filter(
            (r) =>
              r.name !== "satyam2006-cmd" &&
              r.name !== "PortFolio" &&
              r.name !== "Portfolio",
          );
          // Prioritize live projects, then sort by creation date (newest first)
          const sorted = filtered.sort((a, b) => {
            const aHasLive = !!a.homepage;
            const bHasLive = !!b.homepage;

            if (aHasLive !== bHasLive) {
              return aHasLive ? -1 : 1;
            }

            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          setRepos(sorted);
        })
        .catch(console.error);
    }, []);

    const carouselItems = repos.map((repo) => ({
      id: repo.name,
      title: repo.name.replace(/-/g, " "),
      description: repo.description || "",
      url: repo.homepage || repo.html_url,
      tech: repo.language || undefined,
      // Start with the user's custom 'webpreview.png', then fallback to social preview service
      image: `https://raw.githubusercontent.com/satyam2006-cmd/${repo.name}/main/webpreview.png`,
    }));

    // Fallback items if GitHub fetch fails or is pending
    const displayItems =
      carouselItems.length > 0
        ? carouselItems
        : [
          {
            id: 1,
            title: "Loading...",
            description: "Fetching projects from GitHub",
            url: "",
            tech: undefined as string | undefined,
            image: "",
          },
        ];

    const activeProject = displayItems[activeCarouselIndex] || displayItems[0] || { title: "", description: "", url: "", tech: "" };

    return (
      <div
        ref={scrollContainerRef}
        className={isSmallScreen ? "expanded-scroll" : ""}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "linear-gradient(135deg, #5b0a0ad3 0%, #800000 100%)",
          overflowY: isSmallScreen ? "auto" : "hidden",
          overflowX: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
        .expanded-scroll::-webkit-scrollbar { display: none; }
      `}</style>

        {/* Close button - always visible inside container */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleClose}
          style={{
            position: "sticky",
            top: isMobile ? "12px" : "24px",
            alignSelf: "flex-end",
            marginRight: isMobile ? "12px" : "30px",
            marginTop: isMobile ? "12px" : "24px",
            marginBottom: isMobile ? "-56px" : "-84px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%",
            color: "#fff",
            cursor: "pointer",
            fontSize: "1.5rem",
            fontWeight: 300,
            zIndex: 1010,
            width: isMobile ? "44px" : "60px",
            height: isMobile ? "44px" : "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.1)" }}
        >
          ✕
        </motion.button>

        {isSmallScreen ? (
          /* Mobile/tablet view: Stacking cards carousel with top image */
          <>
            {/* Top image - rotated 180° and embedded at the very top */}
            <div
              style={{
                width: "100%",
                height: "30vh",
                minHeight: "200px",
                position: "relative",
                overflow: "hidden",
                flexShrink: 0,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                zIndex: 20,
              }}
            >
              <img
                src="/top.png"
                alt="Top display"
                style={{
                  width: "100%",
                  height: "100%",
                  transform: "rotate(180deg)",
                  opacity: 1,
                  pointerEvents: "none",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  filter:
                    "drop-shadow(0 0 30px rgba(255,255,255,0.12)) drop-shadow(0 0 60px rgba(139,0,0,0.4))",
                }}
              />
            </div>

            <ProjectStickyCards
              cards={displayItems}
              scrollContainer={scrollContainer}
            />
          </>
        ) : (
          /* Desktop view: Split layout with astronaut and curved 3D Carousel */
          <>
            {/* Background Text */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "15vw",
                fontWeight: 900,
                color: "rgba(61, 3, 3, 0.97)",
                whiteSpace: "nowrap",
                zIndex: 0,
                pointerEvents: "none",
                textTransform: "uppercase",
                letterSpacing: "0.01em",
              }}
            >
              EXPLORE PROJECTS
            </div>

            {/* Astro Image */}
            <img
              src="/rest-removebg-preview.png"
              alt="Astronaut"
              style={{
                position: "absolute",
                left: "calc(-8vw + 16px)",
                top: "50%",
                transform: "translateY(-50%)",
                width: "35vw",
                height: "auto",
                maxHeight: "85vh",
                objectFit: "contain",
                zIndex: 5,
                pointerEvents: "none",
                filter: "drop-shadow(0 0 100px rgba(139, 0, 0, 0.3))",
              }}
            />

            {/* Main Content Area */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "0 5vw",
                overflow: "hidden",
              }}
            >
              {/* Project Details Panel (Outside) */}
              <div
                style={{
                  flex: "0 0 35%",
                  marginLeft: "23vw", // Clears the shifted astronaut on the left
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  color: "#fff",
                  zIndex: 30,
                  pointerEvents: "auto",
                  paddingRight: "40px",
                }}
              >
                {/* Project Number */}
                <motion.div
                  key={`num-${activeCarouselIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 0.5, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 800,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                    color: "#fff",
                  }}
                >
                  PROJECT {String(activeCarouselIndex + 1).padStart(2, "0")}
                </motion.div>

                {/* Project Description */}
                <motion.p
                  key={`desc-${activeCarouselIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: 1.6,
                    color: "#f8f8f8",
                    marginBottom: "28px",
                    fontWeight: 400,
                    textAlign: "left",
                    maxWidth: "400px",
                  }}
                >
                  {activeProject.description || "No description available."}
                </motion.p>

                {/* Project Tech Stack & Author */}
                <motion.div
                  key={`meta-${activeCarouselIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                    paddingTop: "20px",
                    width: "100%",
                    maxWidth: "400px",
                  }}
                >
                  {activeProject.tech && (
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "1.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>TECH:</span>
                      <span style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#FF3D00",
                        letterSpacing: "1px",
                        background: "rgba(255, 61, 0, 0.1)",
                        padding: "4px 12px",
                        borderRadius: "100px",
                        border: "1px solid rgba(255, 61, 0, 0.2)"
                      }}>
                        {activeProject.tech}
                      </span>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "1.5px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>CREATOR:</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.5px", color: "#fff" }}>
                      Satyam2006-cmd
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Carousel Container */}
              <div
                style={{
                  flex: "0 0 45%",
                  marginLeft: "auto",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  position: "relative",
                  zIndex: 20,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  style={{ width: "100%", height: "80vh", position: "relative", right: "60px" }}
                >
                  <Carousel
                    items={displayItems}
                    baseWidth={520}
                    baseHeight={340}
                    disableInteraction={isClosing}
                    themeColor="red"
                    onActiveChange={setActiveCarouselIndex}
                  />
                </motion.div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  },
);

export default ProjectGallery;
