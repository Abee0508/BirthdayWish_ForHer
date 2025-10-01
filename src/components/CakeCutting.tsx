import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface CakeCuttingProps {
  onComplete: () => void;
}

const CakeCutting: React.FC<CakeCuttingProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);
  const knifeRef = useRef<HTMLDivElement>(null);
  const [isCutting, setIsCutting] = useState(false);
  const [cuts, setCuts] = useState<Array<{x: number, y: number, angle?: number}>>([]);
  const [slice, setSlice] = useState<null | { x: number, y: number, angle: number }>(null);
  const [knifePos, setKnifePos] = useState<{x: number, y: number}>({ x: 0, y: 0 });

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(cakeRef.current,
      { scale: 0, rotation: -10, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'back.out(1.7)' }
    );

    gsap.fromTo(knifeRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setKnifePos({ x, y });
  };

  const handleCakeClick = (e: React.MouseEvent) => {
    if (cuts.length >= 1 || slice) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cakeCenter = { x: rect.width / 2, y: rect.height / 2 };
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Calculate angle from center to click
    const angle = Math.atan2(y - cakeCenter.y, x - cakeCenter.x) * 180 / Math.PI;
    setCuts([{ x, y, angle }]);
    setIsCutting(true);
    // Animate knife
    gsap.to(knifeRef.current, {
      scale: 1.2,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
    setTimeout(() => setIsCutting(false), 200);
    // Show slice and animate it away
    setTimeout(() => {
      setSlice({ x: cakeCenter.x, y: cakeCenter.y, angle });
      setTimeout(() => {
        setSlice(null);
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: onComplete
          });
        }, 800);
      }, 1000);
    }, 300);
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-yellow-200 via-orange-100 to-pink-200 flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onClick={handleCakeClick}
      style={{ cursor: "default" }}
    >
      {/* Cake */}
      <div
        ref={cakeRef}
        className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[250px] md:h-[250px] flex items-center justify-center"
      >
        <div
          className="text-8xl sm:text-9xl md:text-[120px] relative select-none"
          style={{ userSelect: "none" }}
        >
          {/* Cake base */}
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          >
            🎂
          </span>
          {/* Slice animation */}
          {slice && (
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: "100px",
                height: "100px",
                transform: `translate(-50%, -50%) rotate(${slice.angle}deg)`,
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              {/* Slice shape: triangle with cake emoji background */}
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                style={{ position: "absolute", left: 0, top: 0 }}
              >
                <defs>
                  <pattern
                    id="cakePattern"
                    patternUnits="userSpaceOnUse"
                    width="100"
                    height="100"
                  >
                    <text x="0" y="80" fontSize="100">
                      🎂
                    </text>
                  </pattern>
                </defs>
                <polygon
                  points="50,50 100,40 80,100"
                  fill="url(#cakePattern)"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  style={{ filter: "drop-shadow(0 2px 6px #fbbf24)" }}
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Knife cursor (follows mouse, but default cursor is visible) */}
      <div
        ref={knifeRef}
        className="pointer-events-none text-2xl xs:text-3xl sm:text-4xl"
        style={{
          position: "absolute",
          left: knifePos.x,
          top: knifePos.y,
          transform: "translate(-50%, -50%) rotate(45deg)",
          zIndex: 100,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        🔪
      </div>

      {/* Instructions */}
      <div className="absolute top-8 xs:top-12 sm:top-16 md:top-20 left-1/2 transform -translate-x-1/2 text-center px-3">
        <h2
          className="text-2xl xs:text-3xl sm:text-4xl font-bold text-orange-600 mb-2 sm:mb-3 md:mb-4"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Cut the Birthday Cake! 🎂
        </h2>
        <p className="text-sm xs:text-base sm:text-lg md:text-xl text-orange-500">
          Click on the cake to cut it! ({3 - cuts.length} cuts remaining)
        </p>
      </div>

      {/* Celebration particles */}
      {cuts.length > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CakeCutting;