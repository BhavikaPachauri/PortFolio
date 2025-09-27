
import { useEffect, useRef } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min.js"; // change to other effect as desired

export default function VantaBackground({ children, options = {} }) {
  const containerRef = useRef(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    // prevent double-init (React StrictMode mounts twice in dev)
    if (!vantaRef.current && containerRef.current) {
      vantaRef.current = WAVES({
        el: containerRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        // override with any options passed from props:
        ...options,
      });
    }

    return () => {
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Vanta canvas */}
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      {/* Your content on top */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
