import React, { useState, useMemo } from "react";
import { Folder, Search, LayoutGrid, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Fuse from "fuse.js";
import { PROJECTS } from "@/constants";

interface ExplorerContentProps {
  onProjectClick?: (projectId: number) => void;
}

const CAT_IMAGES = [
  "/cat/cat1.jpg",
  "/cat/cat2.jpg",
  "/cat/cat3.jpg",
  "/cat/cat4.jpg",
];

export const ExplorerContent: React.FC<ExplorerContentProps> = ({
  onProjectClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState<"projects" | "images">(
    "projects"
  );

  // Prepare projects with company name extracted
  const projectsWithCompany = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        company: project.name.split(" - ")[0],
      })),
    []
  );

  // Configure Fuse.js
  const fuse = useMemo(
    () =>
      new Fuse(projectsWithCompany, {
        keys: [
          { name: "name", weight: 0.3 },
          { name: "company", weight: 0.4 },
          { name: "tags", weight: 0.3 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [projectsWithCompany]
  );

  // Filter projects based on search
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projectsWithCompany;
    }
    const results = fuse.search(searchQuery);
    return results.map((result) => result.item);
  }, [searchQuery, fuse, projectsWithCompany]);

  return (
    <div className="h-full flex flex-col text-gray-200">
      {/* Explorer Header */}
      <div className="bg-white/5 border-b border-white/10 p-2 flex items-center gap-3">
        <div className="flex gap-2 text-gray-500">
          <div className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            ←
          </div>
          <div className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            →
          </div>
          <div className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
            ↑
          </div>
        </div>
        <div className="flex-1 bg-black/20 rounded px-3 py-1 text-sm text-gray-400 border border-white/5 flex items-center gap-2">
          <Folder size={14} className="text-yellow-500" />
          <span>
            {currentView === "images"
              ? "~/desktop/Images"
              : "~/desktop/My Projects"}
          </span>
        </div>
        {currentView === "projects" && (
          <div className="w-48 bg-black/20 rounded px-3 py-1 text-sm text-gray-400 border border-white/5 flex items-center gap-2">
            <Search size={14} className="text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="bg-transparent border-none outline-none flex-1 text-gray-300 placeholder-gray-500"
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-40 bg-black/10 border-r border-white/5 p-2 hidden sm:block">
          <div className="space-y-1">
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-gray-400 hover:bg-white/10 hover:text-white rounded cursor-pointer transition-colors">
              <LayoutGrid size={14} /> Quick Access
            </div>
            <div
              onClick={() => setCurrentView("projects")}
              className={`flex items-center gap-2 px-2 py-1.5 text-xs rounded cursor-pointer transition-colors ${
                currentView === "projects"
                  ? "text-blue-300 bg-blue-500/10 border border-blue-500/20 font-medium"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Folder size={14} /> Projects
            </div>
            <div
              onClick={() => setCurrentView("images")}
              className={`flex items-center gap-2 px-2 py-1.5 text-xs rounded cursor-pointer transition-colors ${
                currentView === "images"
                  ? "text-blue-300 bg-blue-500/10 border border-blue-500/20 font-medium"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ImageIcon size={14} /> Images
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {currentView === "images" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CAT_IMAGES.map((imagePath, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all group backdrop-blur-sm"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={imagePath}
                      alt={`Cat image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No projects found matching &quot;{searchQuery}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onProjectClick?.(project.id)}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-black/20 transition-all cursor-pointer group backdrop-blur-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${project.color} backdrop-blur-md overflow-hidden`}
                    >
                      {project.icon ? (
                        <Image
                          src={project.icon}
                          alt={project.name}
                          width={40}
                          height={40}
                          className="object-contain p-1"
                        />
                      ) : (
                        <Folder size={20} />
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-100 mb-1 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h3>
                  {project.role && (
                    <p className=" text-gray-500 mb-2 italic">{project.role}</p>
                  )}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/5 border-t border-white/10 p-1 px-3 text-xs text-gray-500 flex gap-4">
        <span>
          {currentView === "images"
            ? `${CAT_IMAGES.length} ${
                CAT_IMAGES.length === 1 ? "item" : "items"
              }`
            : `${filteredProjects.length} ${
                filteredProjects.length === 1 ? "item" : "items"
              }${searchQuery ? ` (filtered from ${PROJECTS.length})` : ""}`}
        </span>
      </div>
    </div>
  );
};
