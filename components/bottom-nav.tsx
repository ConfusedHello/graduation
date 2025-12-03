"use client"

import { Grid3X3, Info, List } from "lucide-react"

interface BottomNavProps {
  onUploadClick: () => void
  onInfoClick: () => void
  onGridClick: () => void
  isGridView: boolean
}

export function BottomNav({ onUploadClick, onInfoClick, onGridClick, isGridView }: BottomNavProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto">
      <div className="flex items-center gap-0 bg-background/80 backdrop-blur-sm border border-border">
        {/* Left icon */}
        <button className="p-2 sm:p-4 border-r border-border hover:bg-border/50 transition-colors" onClick={onInfoClick}>
          <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground hover:text-foreground-bright" />
        </button>

        {/* Center text */}
        <div className="px-4 sm:px-16 py-2 sm:py-4 flex items-center gap-3 sm:gap-8 flex-1 justify-center">
          <button
            onClick={onUploadClick}
            className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground hover:text-foreground-bright transition-colors"
          >
            Upload
          </button>
          <span className="text-foreground-muted">|</span>
          <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-foreground-muted">Memories</span>
        </div>

        {/* Right icon - grid/list toggle */}
        <button className="p-2 sm:p-4 border-l border-border hover:bg-border/50 transition-colors" onClick={onGridClick}>
          {isGridView ? (
            <List className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground hover:text-foreground-bright" />
          ) : (
            <Grid3X3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground hover:text-foreground-bright" />
          )}
        </button>
      </div>
    </div>
  )
}
