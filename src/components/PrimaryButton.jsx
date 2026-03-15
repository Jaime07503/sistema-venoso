import { useNavigate, useLocation } from "react-router-dom";

export default function PrimaryButton({ text, to, icon, variant = "study" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.pathname === to;

  const variants = {
    study: {
      gradient: "from-[#c98bb7] via-[#d99db1] to-[#cf8b9e]",
      activeBorder: "border-[#c98bb7]",
      glow: "shadow-[0_0_0_3px_rgba(201,139,183,0.35)]",
    },
    game: {
      gradient: "from-[#ba7f8c] via-[#d48f92] to-[#c7727b]",
      activeBorder: "border-[#c7727b]",
      glow: "shadow-[0_0_0_3px_rgba(199,114,123,0.35)]",
    },
    quiz: {
      gradient: "from-[#a98acb] via-[#bc9fd7] to-[#b483c2]",
      activeBorder: "border-[#b483c2]",
      glow: "shadow-[0_0_0_3px_rgba(180,131,194,0.35)]",
    },
    clinic: {
      gradient: "from-[#7b8fc9] via-[#98a8d8] to-[#8ca0d4]",
      activeBorder: "border-[#7b8fc9]",
      glow: "shadow-[0_0_0_3px_rgba(123,143,201,0.35)]",
    },
  };

  const style = variants[variant];

  return (
    <button
      onClick={() => navigate(to)}
      className={`
        w-full
        rounded-[1.7rem]
        px-6
        py-5
        text-white
        border
        border-white/30
        bg-gradient-to-r ${style.gradient}
        transition-all
        duration-200
        shadow-lg

        hover:scale-[1.02]
        hover:brightness-105
        hover:shadow-xl

        active:scale-[0.96]

        ${isActive ? `${style.activeBorder} ${style.glow}` : ""}
      `}
    >
      <div className="flex items-center justify-center gap-3">
        <span className="text-white flex items-center justify-center">
          {icon}
        </span>

        <span className="text-xl font-bold tracking-tight">
          {text}
        </span>
      </div>
    </button>
  );
}