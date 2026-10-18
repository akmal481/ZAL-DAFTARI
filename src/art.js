export const col=(h,a=1)=>`hsl(${h} 85% 60% / ${a})`;
export const bgOf=(h,img)=>img?`url(${img})`:`linear-gradient(145deg,hsl(${h} 70% 38%),hsl(${(h+40)%360} 75% 14%))`;
export function fig(id,h){const hl={
oldi:'<rect class=h x=21 y=30 width=10 height=34 rx=5 /><rect class=h x=69 y=30 width=10 height=34 rx=5 /><ellipse class=h cx=18 cy=48 rx=4 ry=7 />',
orqa:'<rect class=h x=21 y=30 width=10 height=34 rx=5 /><rect class=h x=69 y=30 width=10 height=34 rx=5 /><path d="M50 22V66" stroke="#fff" stroke-opacity=".4" fill=none />',
oyoq:'<rect class=h x=36 y=68 width=13 height=50 rx=6 /><rect class=h x=51 y=68 width=13 height=50 rx=6 />',
gurut:'<ellipse class=h cx=42 cy=36 rx=10 ry=8 /><ellipse class=h cx=58 cy=36 rx=10 ry=8 />',
qanot:'<path class=h d="M35 28L47 33V60L38 62Z" /><path class=h d="M65 28L53 33V60L62 62Z" /><path d="M50 22V66" stroke="#fff" stroke-opacity=".4" fill=none />',
yelka:'<circle class=h cx=30 cy=28 r=8.5 /><circle class=h cx=70 cy=28 r=8.5 />',
press:[0,1,2].map(i=>`<rect class=h x=43 y=${42+i*8} width=6 height=6.5 rx=2 /><rect class=h x=51 y=${42+i*8} width=6 height=6.5 rx=2 />`).join('')}[id];
return`<svg class=fig viewBox="0 0 100 124" style="--hc:${col(h)}"><circle class=b cx=50 cy=11 r=7 /><path class=b d="M33 24Q50 19 67 24L63 66Q50 71 37 66Z"/><circle class=b cx=30 cy=28 r=7 /><circle class=b cx=70 cy=28 r=7 /><rect class=b x=21 y=30 width=10 height=34 rx=5 /><rect class=b x=69 y=30 width=10 height=34 rx=5 /><rect class=b x=18 y=62 width=9 height=26 rx=4.5 /><rect class=b x=73 y=62 width=9 height=26 rx=4.5 /><rect class=b x=36 y=68 width=13 height=50 rx=6 /><rect class=b x=51 y=68 width=13 height=50 rx=6 />${hl}</svg>`}
export const bar=h=>`<svg class=art viewBox="0 0 200 100"><rect x=14 y=47 width=172 height=6 rx=3 fill="#cfd3e0"/><rect x=40 y=16 width=12 height=68 rx=4 fill="${col(h)}"/><rect x=55 y=26 width=9 height=48 rx=3 fill="${col(h,.75)}"/><rect x=148 y=16 width=12 height=68 rx=4 fill="${col(h)}"/><rect x=136 y=26 width=9 height=48 rx=3 fill="${col(h,.75)}"/><rect x=66 y=43 width=5 height=14 fill="#9aa0b4"/><rect x=129 y=43 width=5 height=14 fill="#9aa0b4"/></svg>`;
