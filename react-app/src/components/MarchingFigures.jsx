function MarchingFigures() {
  const peeps = [
    '/images/peep-22.svg',
    '/images/peep-24.svg',
    '/images/peep-25.svg',
    '/images/peep-26.svg',
  ];

  const figures = peeps.map((src, i) => (
    <img key={`peep-${i}`} src={src} alt="" className="march-figure" />
  ));

  return (
    <div className="marching-figures-container" aria-hidden="true">
      <div className="marching-row marching-row-left">
        <div className="marching-track">
          {figures}
          {figures}
          {figures}
        </div>
      </div>
    </div>
  );
}

export default MarchingFigures;
