/**
 * Sample leaf visual presets for immediate 1-click testing & demonstration
 * Representing the 3 core PlantVillage classes plus dynamic non-hardcoded variations.
 */

// Helper to encode SVG to reliable base64 data URL
function createSvgDataUrl(svgString: string): string {
  try {
    if (typeof window !== 'undefined' && window.btoa) {
      return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgString.trim())))}`;
    }
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
  } catch (e) {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
  }
}

export interface SampleLeafSpecimen {
  id: string;
  name: string;
  description: string;
  expectedClassHint: string;
  dataUrl: string;
}

export const SAMPLE_LEAVES: SampleLeafSpecimen[] = [
  {
    id: 'early_blight_sample',
    name: 'Tomato Leaf - Concentric Ring Lesions',
    description: 'Leaf showing dark brown necrotic target-spots with alternating concentric rings and chlorotic yellow halos.',
    expectedClassHint: 'Early Blight (Alternaria solani)',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#2d3748" />
        <g transform="translate(200, 200) rotate(-15)">
          <!-- Main Leaf Body -->
          <path d="M 0,-160 C 90,-110 130,-20 90,80 C 60,140 20,170 0,180 C -20,170 -60,140 -90,80 C -130,-20 -90,-110 0,-160 Z" fill="#4a7c39" stroke="#2e5322" stroke-width="4" />
          <!-- Leaf Venation -->
          <path d="M 0,-150 L 0,170" stroke="#719b52" stroke-width="4" stroke-linecap="round"/>
          <path d="M 0,-100 Q 40,-80 80,-70" stroke="#719b52" stroke-width="2.5" fill="none"/>
          <path d="M 0,-60 Q -40,-40 -80,-30" stroke="#719b52" stroke-width="2.5" fill="none"/>
          <path d="M 0,0 Q 45,20 75,40" stroke="#719b52" stroke-width="2.5" fill="none"/>
          <path d="M 0,40 Q -45,60 -70,80" stroke="#719b52" stroke-width="2.5" fill="none"/>
          
          <!-- Early Blight Necrotic Concentric Spot 1 -->
          <circle cx="35" cy="-30" r="32" fill="#d4b138" opacity="0.65" />
          <circle cx="35" cy="-30" r="24" fill="#6d4c28" />
          <circle cx="35" cy="-30" r="17" fill="#422c15" />
          <circle cx="35" cy="-30" r="10" fill="#261608" />
          <circle cx="35" cy="-30" r="4" fill="#0f0702" />

          <!-- Early Blight Necrotic Concentric Spot 2 -->
          <circle cx="-35" cy="50" r="26" fill="#e2c84b" opacity="0.7" />
          <circle cx="-35" cy="50" r="19" fill="#5c3e21" />
          <circle cx="-35" cy="50" r="13" fill="#3b2411" />
          <circle cx="-35" cy="50" r="7" fill="#1e1106" />

          <!-- Smaller Satellite Lesions -->
          <circle cx="48" cy="45" r="14" fill="#c9a834" opacity="0.8" />
          <circle cx="48" cy="45" r="9" fill="#4e331b" />
          <circle cx="-25" cy="-70" r="16" fill="#c9a834" opacity="0.8" />
          <circle cx="-25" cy="-70" r="10" fill="#4e331b" />
        </g>
        <text x="20" y="380" fill="#a0aec0" font-family="sans-serif" font-size="14">Sample 01: Alternaria Bullseye Concentric Rings</text>
      </svg>
    `)
  },
  {
    id: 'late_blight_sample',
    name: 'Tomato Leaf - Water-Soaked Necrosis',
    description: 'Leaf exhibiting rapid dark purplish-black water-soaked lesions expanding inward from margins with mildew sporulation.',
    expectedClassHint: 'Late Blight (Phytophthora infestans)',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#2d3748" />
        <g transform="translate(200, 200) rotate(10)">
          <!-- Main Leaf Body -->
          <path d="M 0,-160 C 90,-110 130,-20 90,80 C 60,140 20,170 0,180 C -20,170 -60,140 -90,80 C -130,-20 -90,-110 0,-160 Z" fill="#3f6d32" stroke="#25471d" stroke-width="4" />
          <!-- Midrib and Veins -->
          <path d="M 0,-150 L 0,170" stroke="#5a8b48" stroke-width="4" stroke-linecap="round"/>
          <path d="M 0,-90 Q 40,-70 80,-60" stroke="#5a8b48" stroke-width="2.5" fill="none"/>
          <path d="M 0,-50 Q -40,-30 -80,-20" stroke="#5a8b48" stroke-width="2.5" fill="none"/>
          <path d="M 0,10 Q 45,30 75,50" stroke="#5a8b48" stroke-width="2.5" fill="none"/>
          
          <!-- Late Blight Water Soaked Purplish-Black Necrotic Blotches -->
          <!-- Top edge collapse -->
          <path d="M -15,-155 C 30,-150 70,-110 50,-80 C 20,-70 -10,-110 -15,-155 Z" fill="#232729" opacity="0.9" />
          <path d="M 0,-140 C 35,-130 55,-95 40,-85" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="2,3" fill="none" opacity="0.75" />
          
          <!-- Lateral Margin Blotches -->
          <path d="M 50,-40 C 100,-30 110,30 75,50 C 45,40 40,-20 50,-40 Z" fill="#1a1c1e" opacity="0.95" stroke="#687358" stroke-width="3" />
          <path d="M -50,10 C -95,20 -100,90 -65,110 C -40,95 -35,30 -50,10 Z" fill="#1c2022" opacity="0.92" stroke="#5e6650" stroke-width="3" />
          
          <!-- White Downy Mildew Spores Indicator -->
          <circle cx="65" cy="5" r="3" fill="#f7fafc" opacity="0.8" />
          <circle cx="72" cy="18" r="2.5" fill="#f7fafc" opacity="0.8" />
          <circle cx="58" cy="22" r="3" fill="#f7fafc" opacity="0.7" />
          <circle cx="-60" cy="55" r="3.5" fill="#f7fafc" opacity="0.8" />
          <circle cx="-52" cy="70" r="2.5" fill="#f7fafc" opacity="0.75" />
        </g>
        <text x="20" y="380" fill="#a0aec0" font-family="sans-serif" font-size="14">Sample 02: Phytophthora Water-Soaked Foliage</text>
      </svg>
    `)
  },
  {
    id: 'healthy_sample',
    name: 'Tomato Leaf - Healthy Vigorous Foliage',
    description: 'Vigorous leaf specimen with rich chlorophyll pigmentation, smooth intact serrated margins, and uniform venation without lesions.',
    expectedClassHint: 'Healthy Foliage (Baseline Reference)',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#2d3748" />
        <g transform="translate(200, 200) rotate(-5)">
          <!-- Main Healthy Leaf -->
          <path d="M 0,-165 C 95,-115 135,-25 95,85 C 65,145 25,175 0,185 C -25,175 -65,145 -95,85 C -135,-25 -95,-115 0,-165 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="4" />
          <!-- Symmetrical Secondary Lobes -->
          <path d="M 0,-155 L 0,175" stroke="#66bb6a" stroke-width="4" stroke-linecap="round"/>
          <path d="M 0,-110 Q 45,-90 85,-80" stroke="#66bb6a" stroke-width="3" fill="none"/>
          <path d="M 0,-110 Q -45,-90 -85,-80" stroke="#66bb6a" stroke-width="3" fill="none"/>
          <path d="M 0,-60 Q 55,-40 95,-30" stroke="#66bb6a" stroke-width="3" fill="none"/>
          <path d="M 0,-60 Q -55,-40 -95,-30" stroke="#66bb6a" stroke-width="3" fill="none"/>
          <path d="M 0,0 Q 55,20 85,40" stroke="#66bb6a" stroke-width="3" fill="none"/>
          <path d="M 0,0 Q -55,20 -85,40" stroke="#66bb6a" stroke-width="3" fill="none"/>
          <path d="M 0,60 Q 45,80 65,100" stroke="#66bb6a" stroke-width="2.5" fill="none"/>
          <path d="M 0,60 Q -45,80 -65,100" stroke="#66bb6a" stroke-width="2.5" fill="none"/>
          
          <!-- Subtle Highlights reflecting sunlight -->
          <ellipse cx="25" cy="-60" rx="40" ry="15" fill="#81c784" opacity="0.3" transform="rotate(25 25 -60)" />
          <ellipse cx="-25" cy="10" rx="35" ry="12" fill="#81c784" opacity="0.3" transform="rotate(-25 -25 10)" />
        </g>
        <text x="20" y="380" fill="#a0aec0" font-family="sans-serif" font-size="14">Sample 03: Vigorous Chlorophyll Uninfected Lamina</text>
      </svg>
    `)
  },
  {
    id: 'leaf_curl_sample',
    name: 'Tomato Leaf - Viral Curl & Stunting',
    description: 'Leaf showing inward margin curling, thickened brittle veins, and interveinal yellow chlorosis characteristic of viral vector stress.',
    expectedClassHint: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
        <rect width="400" height="400" fill="#2d3748" />
        <g transform="translate(200, 200)">
          <!-- Deformed cupped leaf -->
          <path d="M 0,-140 C 70,-110 110,-40 60,60 C 40,110 15,140 0,150 C -15,140 -40,110 -60,60 C -110,-40 -70,-110 0,-140 Z" fill="#88a834" stroke="#5d781b" stroke-width="4" />
          <!-- Curled Inward Edges -->
          <path d="M 0,-130 L 0,140" stroke="#b0c950" stroke-width="4.5" stroke-linecap="round"/>
          <path d="M 50,-80 C 80,-50 70,10 50,40" stroke="#d4e157" stroke-width="5" fill="none" opacity="0.9" />
          <path d="M -50,-80 C -80,-50 -70,10 -50,40" stroke="#d4e157" stroke-width="5" fill="none" opacity="0.9" />
          
          <!-- Chlorosis / Yellow Mosaic Vein Swelling -->
          <ellipse cx="20" cy="-40" rx="20" ry="15" fill="#fbc02d" opacity="0.6" />
          <ellipse cx="-20" cy="20" rx="25" ry="18" fill="#fbc02d" opacity="0.55" />
          <circle cx="0" cy="-80" r="15" fill="#ffeb3b" opacity="0.5" />
        </g>
        <text x="20" y="380" fill="#a0aec0" font-family="sans-serif" font-size="14">Sample 04: Upward Foliar Cupping & Yellow Veining</text>
      </svg>
    `)
  }
];
