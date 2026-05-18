export default function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-white/10 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xl font-bold font-display tracking-tighter">
          TechBy<span className="text-gradient">Divy</span>
        </div>
        
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} TechByDivy. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-500 hover:text-white transition-colors">Twitter</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
