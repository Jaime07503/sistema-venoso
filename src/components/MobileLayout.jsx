export default function MobileLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6d9d6] flex justify-center">
      <div className="relative z-10 w-full max-w-md px-5 pt-6 pb-40">
        {children}
      </div>

      <BloodFlowFooterMobile />
      <BloodFlowFooterDesktop />
    </div>
  );
}

function BloodFlowSvg({ className = "", preserveAspectRatio = "none" }) {
  return (
    <svg
      viewBox="0 0 430 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio={preserveAspectRatio}
    >
      <defs>
        <linearGradient id="bgGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f8c7c2" />
          <stop offset="100%" stopColor="#f4b3b0" />
        </linearGradient>

        <linearGradient id="vesselGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d26a70" />
          <stop offset="50%" stopColor="#e48a8f" />
          <stop offset="100%" stopColor="#c95e66" />
        </linearGradient>

        <linearGradient id="vesselInner" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f4b1b0" />
          <stop offset="50%" stopColor="#f7c4c2" />
          <stop offset="100%" stopColor="#efaaaa" />
        </linearGradient>

        <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>

        <path
          id="flowPath"
          d="M-20 150 C 70 105, 150 185, 240 150 S 390 105, 460 145"
        />
      </defs>

      <rect width="430" height="240" fill="url(#bgGlow)" opacity="0.2" />

      <ellipse
        cx="120"
        cy="170"
        rx="130"
        ry="60"
        fill="#ffffff"
        opacity="0.05"
        filter="url(#softBlur)"
      />
      <ellipse
        cx="330"
        cy="140"
        rx="140"
        ry="70"
        fill="#ffffff"
        opacity="0.05"
        filter="url(#softBlur)"
      />

      <path
        d="M-20 150 C 70 105, 150 185, 240 150 S 390 105, 460 145"
        stroke="url(#vesselGradient)"
        strokeWidth="88"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />

      <path
        d="M-20 150 C 70 105, 150 185, 240 150 S 390 105, 460 145"
        stroke="url(#vesselInner)"
        strokeWidth="62"
        strokeLinecap="round"
        fill="none"
        opacity="0.96"
      />

      <path
        d="M-20 150 C 70 105, 150 185, 240 150 S 390 105, 460 145"
        stroke="#ffd7d5"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
        transform="translate(0,-8)"
      />

      <g opacity="0.95">
        <ellipse rx="9" ry="6.5" fill="#b83d36">
          <animateMotion dur="6.4s" repeatCount="indefinite" rotate="auto">
            <mpath href="#flowPath" />
          </animateMotion>
        </ellipse>

        <ellipse rx="8.5" ry="6.2" fill="#cf4b43">
          <animateMotion
            dur="7.2s"
            begin="-1.5s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#flowPath" />
          </animateMotion>
        </ellipse>

        <ellipse rx="9" ry="6.3" fill="#a9322e">
          <animateMotion
            dur="5.8s"
            begin="-2.6s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#flowPath" />
          </animateMotion>
        </ellipse>

        <ellipse rx="8.2" ry="5.8" fill="#c9443d">
          <animateMotion
            dur="6.9s"
            begin="-4.1s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#flowPath" />
          </animateMotion>
        </ellipse>

        <ellipse rx="8.8" ry="6.2" fill="#b53731">
          <animateMotion
            dur="7.6s"
            begin="-5s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#flowPath" />
          </animateMotion>
        </ellipse>

        <ellipse rx="8.4" ry="6" fill="#d4554d">
          <animateMotion
            dur="6.1s"
            begin="-3.2s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#flowPath" />
          </animateMotion>
        </ellipse>
      </g>

      <g opacity="0.9">
        <circle r="5.8" fill="#fff3dc">
          <animateMotion dur="8.5s" begin="-2s" repeatCount="indefinite">
            <mpath href="#flowPath" />
          </animateMotion>
        </circle>

        <circle r="4.6" fill="#f7edcf">
          <animateMotion dur="7.7s" begin="-5.4s" repeatCount="indefinite">
            <mpath href="#flowPath" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}

function BloodFlowFooterMobile() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 md:hidden">
      <BloodFlowSvg
        className="h-[180px] w-full"
        preserveAspectRatio="none"
      />
    </div>
  );
}

function BloodFlowFooterDesktop() {
  return (
    <div className="pointer-events-none absolute bottom-6 left-1/2 z-0 hidden -translate-x-1/2 md:block">
      <div className="w-[720px] lg:w-[860px] xl:w-[980px] opacity-90">
        <BloodFlowSvg
          className="h-[150px] w-full"
          preserveAspectRatio="xMidYMid meet"
        />
      </div>
    </div>
  );
}