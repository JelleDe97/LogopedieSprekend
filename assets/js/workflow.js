(function(){
  const svg = document.querySelector('.workflow-line');
  const path = svg.querySelector('path');

  function debounce(fn, wait=100){
    let t; return function(...a){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a),wait); };
  }

  function getCenters(){
    const circles = document.querySelectorAll('.circle');
    const svgRect = svg.getBoundingClientRect();
    return Array.from(circles).map(c=>{
      const r = c.getBoundingClientRect();
      return {
        x: (r.left + r.right)/2 - svgRect.left,
        y: (r.top + r.bottom)/2 - svgRect.top
      };
    });
  }

  function isVerticalLayout(){
    const pts = getCenters();
    return pts.length>1 && Math.abs(pts[0].x - pts[1].x) < 20;
  }

  function buildPath(points, vertical){
    if(points.length<2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for(let i=0; i<points.length-1; i++){
      const p1 = points[i], p2 = points[i+1];
      const dir = (i % 2 === 0) ? -1 : 1;
      const baseOffset = vertical ? Math.min(80, Math.abs(p2.y - p1.y)/2) : Math.min(80, Math.abs(p2.x - p1.x)/2);
      const offset = baseOffset * dir;

      if(!vertical){
        const cp1x = p1.x + (p2.x - p1.x) / 3;
        const cp2x = p1.x + 2 * (p2.x - p1.x) / 3;
        const cp1y = p1.y + offset;
        const cp2y = p2.y + offset;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      } else {
        const cp1y = p1.y + (p2.y - p1.y) / 3;
        const cp2y = p1.y + 2 * (p2.y - p1.y) / 3;
        const cp1x = p1.x + offset;
        const cp2x = p2.x + offset;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }
    }
    return d;
  }

  function updateSvgSize(){
    const wrapper = svg.parentElement;
    const rect = wrapper.getBoundingClientRect();
    svg.setAttribute('width', rect.width);
    svg.setAttribute('height', rect.height);
    svg.style.width = rect.width + 'px';
    svg.style.height = rect.height + 'px';
  }

  function updatePath(){
    updateSvgSize();
    const pts = getCenters();
    const vertical = isVerticalLayout();
    path.setAttribute('d', buildPath(pts, vertical));
  }

  window.addEventListener('load', ()=>{
    updatePath();
    setTimeout(updatePath, 120);
  });
  window.addEventListener('resize', debounce(updatePath, 80));

})();
