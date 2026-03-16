function MarchingFigures() {
  // Realistic walking women silhouettes using smooth curves
  const figures = [
    // Figure 1: Woman walking with hair flowing, mid-stride
    <svg key="f1" viewBox="0 0 50 100" className="march-figure">
      <path fill="currentColor" d="M27 8a7 7 0 1 0-5 0c-1.5.3-3 1-3 1l-1 3c-1 .5-3 2-4 4l-5 7 3 2 5-6v5l-5 22-1 8 1 5h4l3-12 3-10 2 10 2 12h4l1-5-1-8-4-22v-5l3 3 5-2-3-5c-1-2-2-3-3-3l-1-4z"/>
    </svg>,
    // Figure 2: Woman with raised fist, striding forward
    <svg key="f2" viewBox="0 0 50 100" className="march-figure">
      <path fill="currentColor" d="M26 8a7 7 0 1 0-4 0l-3 2-2 6-6 4-3 5 3 2 5-4 1 4-6 24 1 8v4h4l2-11 3-12 3 12 1 11h4v-4l1-8-5-24 1-4 4 2 1-4-4-4-2-6zm-6-2l-2-8-2 1 2 7z"/>
    </svg>,
    // Figure 3: Woman walking confidently, ponytail
    <svg key="f3" viewBox="0 0 50 100" className="march-figure">
      <path fill="currentColor" d="M24 3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zm7 3c2-2 5-3 7-2l-1 2c-2-1-4 0-5 1zm-9 11l-2 3-5 3v8l3 1 3-4 0 3-4 20-1 10 1 4h4l2-13 2-9 2 9 2 13h4l1-4-1-10-4-20v-3l3 3 3-1v-8l-5-3-2-3z"/>
    </svg>,
    // Figure 4: Woman holding sign overhead
    <svg key="f4" viewBox="0 0 55 100" className="march-figure">
      <path fill="currentColor" d="M27 12a7 7 0 1 0-5 0l-3 2-1 6-5 4v7l3 1 3-4v4l-5 22-1 8 1 4h4l2-12 3-10 2 10 3 12h4l1-4-2-8-4-22v-4l3 2 2-1 1-7-5-4-1-6zM18 14l-1-14h12l1 5H19z"/>
      <rect x="14" y="0" width="16" height="8" rx="1" fill="currentColor" opacity="0.7"/>
    </svg>,
    // Figure 5: Woman with megaphone, leaning forward
    <svg key="f5" viewBox="0 0 55 100" className="march-figure">
      <path fill="currentColor" d="M25 8a7 7 0 1 0-4 0l-3 2-1 5-5 5v7l3 1 3-5v5l-5 22-1 9 1 4h4l2-12 3-10 2 10 2 12h4l1-4-1-9-4-22v-5l2 2 2-2v-7l-3-3-1-6zm3 8l8-4 3 2 2 4-3 2-8-2z"/>
    </svg>,
    // Figure 6: Woman mid-walk, arms swinging naturally
    <svg key="f6" viewBox="0 0 50 100" className="march-figure">
      <path fill="currentColor" d="M25 8a7 7 0 1 0-4 0l-3 1-1 5c-2 1-4 3-5 5l-3 6 3 2 4-5v5l-4 21-1 9 1 4h4l2-12 2-10 3 10 2 12h4l1-4-1-9-5-21v-5l5 4 3-1-4-6c-1-2-3-4-5-5l-1-5z"/>
    </svg>,
    // Figure 7: Woman with flowing skirt/dress
    <svg key="f7" viewBox="0 0 50 100" className="march-figure">
      <path fill="currentColor" d="M25 8a7 7 0 1 0-4 0l-3 2-1 5-5 4v7l3 1 3-4v2c-2 4-5 14-8 24l1 3h8l2-10 2 10h8l1-3c-3-10-6-20-8-24v-2l3 3 3-1v-7l-5-4-1-5z"/>
    </svg>,
    // Figure 8: Woman with banner on pole
    <svg key="f8" viewBox="0 0 55 100" className="march-figure">
      <path fill="currentColor" d="M27 12a7 7 0 1 0-5 0l-3 2-1 5-5 5v7l3 1 3-5 0 5-5 22-1 8 1 4h4l2-12 3-10 2 10 3 12h4l1-4-2-8-4-22v-5l3 3 3-1v-7l-5-5-1-5z"/>
      <line x1="36" y1="14" x2="40" y2="0" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M40 0l12 4-12 5z" fill="currentColor" opacity="0.65"/>
    </svg>,
  ];

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
