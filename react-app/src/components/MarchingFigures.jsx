function MarchingFigures() {
  // Each figure is a unique SVG silhouette of a woman marching
  const figures = [
    // Figure 1: Woman with raised fist
    <svg key="f1" viewBox="0 0 60 120" className="march-figure">
      <g fill="currentColor">
        <circle cx="30" cy="10" r="8" />
        <path d="M22 20h16l4 30h-24z" />
        <path d="M20 50l-6-20-4 1 7 22z" />
        <path d="M40 50l6-20 4 1-7 22z" />
        <path d="M16 30l-8-14-3 2 9 14z" />
        <rect x="24" y="50" width="5" height="30" rx="2" />
        <rect x="31" y="50" width="5" height="30" rx="2" />
        <ellipse cx="26" cy="82" rx="5" ry="3" />
        <ellipse cx="34" cy="82" rx="5" ry="3" />
      </g>
    </svg>,
    // Figure 2: Woman with sign
    <svg key="f2" viewBox="0 0 60 120" className="march-figure">
      <g fill="currentColor">
        <circle cx="30" cy="12" r="9" />
        <path d="M20 22h20l2 32h-24z" />
        <path d="M18 54l-4-18-3 1 5 19z" />
        <path d="M42 22l4-16h12v12H46l-2 6z" />
        <rect x="44" y="2" width="14" height="10" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="22" y="54" width="6" height="28" rx="2" />
        <path d="M34 54l8 26 4-1-7-27z" />
        <ellipse cx="25" cy="84" rx="5" ry="3" />
        <ellipse cx="43" cy="82" rx="5" ry="3" />
      </g>
    </svg>,
    // Figure 3: Woman with flowing hair
    <svg key="f3" viewBox="0 0 60 120" className="march-figure">
      <g fill="currentColor">
        <circle cx="28" cy="10" r="8" />
        <path d="M36 6c4 2 8 8 10 16l-4 1c-2-6-4-10-8-13z" opacity="0.8" />
        <path d="M20 20h18l3 34h-24z" />
        <path d="M18 54l-8-22-3 1 8 23z" />
        <path d="M38 54l8-22 3 1-8 23z" />
        <path d="M22 54l-4 28 5 1 3-27z" />
        <path d="M36 54l4 28-5 1-3-27z" />
        <ellipse cx="17" cy="84" rx="5" ry="3" />
        <ellipse cx="41" cy="84" rx="5" ry="3" />
      </g>
    </svg>,
    // Figure 4: Woman with megaphone
    <svg key="f4" viewBox="0 0 60 120" className="march-figure">
      <g fill="currentColor">
        <circle cx="30" cy="11" r="8" />
        <path d="M22 21h16l3 30h-22z" />
        <path d="M38 25l12-6 4 10-14 2z" opacity="0.85" />
        <path d="M20 51l-6-16-3 1 6 17z" />
        <rect x="24" y="51" width="5" height="30" rx="2" />
        <rect x="31" y="51" width="5" height="30" rx="2" />
        <ellipse cx="26" cy="83" rx="5" ry="3" />
        <ellipse cx="34" cy="83" rx="5" ry="3" />
      </g>
    </svg>,
    // Figure 5: Woman with banner/flag
    <svg key="f5" viewBox="0 0 60 120" className="march-figure">
      <g fill="currentColor">
        <circle cx="30" cy="10" r="8" />
        <path d="M22 20h16l2 32h-20z" />
        <path d="M20 52l-4-20-3 1 5 21z" />
        <path d="M40 20l2-18h2v20l-2 2z" />
        <path d="M44 2l14 6-14 6z" opacity="0.7" />
        <rect x="24" y="52" width="5" height="28" rx="2" />
        <path d="M33 52l6 26 4-1-6-27z" />
        <ellipse cx="26" cy="82" rx="5" ry="3" />
        <ellipse cx="40" cy="80" rx="5" ry="3" />
      </g>
    </svg>,
    // Figure 6: Woman with linked arms
    <svg key="f6" viewBox="0 0 60 120" className="march-figure">
      <g fill="currentColor">
        <circle cx="30" cy="12" r="9" />
        <path d="M20 22h20l2 30h-24z" />
        <path d="M16 36l-14 2v-4l14-2z" />
        <path d="M44 36l14 2v-4l-14-2z" />
        <rect x="23" y="52" width="6" height="30" rx="2" />
        <rect x="32" y="52" width="6" height="30" rx="2" />
        <ellipse cx="26" cy="84" rx="5" ry="3" />
        <ellipse cx="35" cy="84" rx="5" ry="3" />
      </g>
    </svg>,
  ];

  // Create two rows marching in opposite directions for visual richness
  return (
    <div className="marching-figures-container" aria-hidden="true">
      <div className="marching-row marching-row-left">
        <div className="marching-track">
          {figures}
          {figures}
        </div>
      </div>
      <div className="marching-row marching-row-right">
        <div className="marching-track">
          {figures}
          {figures}
        </div>
      </div>
    </div>
  );
}

export default MarchingFigures;
