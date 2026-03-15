export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white/75 backdrop-blur-sm rounded-[1.6rem] shadow-md p-5 mb-4 border border-white/40">
      <h3 className="text-[#7a1f2a] font-bold text-lg mb-3">
        {title}
      </h3>

      <div className="text-sm text-[#5f3a40] leading-relaxed">
        {children}
      </div>
    </div>
  );
}