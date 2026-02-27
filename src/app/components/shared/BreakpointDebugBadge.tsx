'use client'

const BreakpointDebugBadge = () => (
  <div className="fixed bottom-3 right-3 z-[9999] pointer-events-none select-none">
    <div className="rounded-full bg-black/80 text-white text-[11px] px-3 py-1 shadow-lg">
      <span className="inline sm:hidden">xs (&lt;640)</span>
      <span className="hidden sm:inline md:hidden">sm (640-767)</span>
      <span className="hidden md:inline lg:hidden">md (768-1023)</span>
      <span className="hidden lg:inline xl:hidden">lg (1024-1279)</span>
      <span className="hidden xl:inline 2xl:hidden">xl (1280-1535)</span>
      <span className="hidden 2xl:inline">2xl (&gt;=1536)</span>
    </div>
  </div>
)

export default BreakpointDebugBadge
