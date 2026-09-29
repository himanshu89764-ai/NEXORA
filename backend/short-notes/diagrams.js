function svgBox(title, lines) {
    const safeLines = lines
        .map((line, index) => {
            const y = 65 + index * 32;
            return `
                <text x="50%" y="${y}"
                      text-anchor="middle"
                      class="diagram-text">${escapeXml(line)}</text>
            `;
        })
        .join("");

    return `
<svg class="nexora-svg"
     viewBox="0 0 800 260"
     xmlns="http://www.w3.org/2000/svg">

    <rect x="10" y="10" width="780" height="240"
          rx="18" fill="#ffffff"
          stroke="#333333" stroke-width="2"/>

    <text x="50%" y="42"
          text-anchor="middle"
          class="diagram-title">${escapeXml(title)}</text>

    ${safeLines}
</svg>
`;
}

function escapeXml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function solarSystemDiagram() {
    return `
<svg class="nexora-svg"
     viewBox="0 0 1200 760"
     xmlns="http://www.w3.org/2000/svg"
     role="img"
     aria-label="सौरमंडल का शैक्षिक चित्र">

  <defs>
    <radialGradient id="sunGrad" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#fff7a8"/>
      <stop offset="55%" stop-color="#ffd43b"/>
      <stop offset="100%" stop-color="#f39c12"/>
    </radialGradient>

    <radialGradient id="earthGrad" cx="35%" cy="30%">
      <stop offset="0%" stop-color="#8ee7ff"/>
      <stop offset="55%" stop-color="#2d9cdb"/>
      <stop offset="100%" stop-color="#1769aa"/>
    </radialGradient>

    <radialGradient id="marsGrad" cx="35%" cy="30%">
      <stop offset="0%" stop-color="#ffb07c"/>
      <stop offset="60%" stop-color="#e76f51"/>
      <stop offset="100%" stop-color="#a83d2a"/>
    </radialGradient>

    <radialGradient id="jupiterGrad" cx="35%" cy="30%">
      <stop offset="0%" stop-color="#f6dfb5"/>
      <stop offset="50%" stop-color="#d8a66a"/>
      <stop offset="100%" stop-color="#a96f3d"/>
    </radialGradient>

    <radialGradient id="saturnGrad" cx="35%" cy="30%">
      <stop offset="0%" stop-color="#fff0b8"/>
      <stop offset="55%" stop-color="#e6c77a"/>
      <stop offset="100%" stop-color="#b58b45"/>
    </radialGradient>

    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="5" stdDeviation="7"
                    flood-color="#333" flood-opacity="0.22"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect x="12" y="12" width="1176" height="736"
        rx="28" fill="#fffdf4"
        stroke="#333" stroke-width="3"/>

  <!-- Title -->
  <text x="600" y="55"
        text-anchor="middle"
        font-size="32"
        font-weight="700"
        fill="#222">
    सौरमंडल — सूर्य और आठ ग्रह
  </text>

  <!-- Educational note -->
  <text x="600" y="88"
        text-anchor="middle"
        font-size="17"
        fill="#555">
    ग्रहों की दूरी और आकार सांकेतिक हैं
  </text>

  <!-- Orbit paths -->
  <g fill="none" stroke="#9aa0a6" stroke-width="2" opacity="0.75">
    <ellipse cx="600" cy="390" rx="95" ry="58"/>
    <ellipse cx="600" cy="390" rx="135" ry="82"/>
    <ellipse cx="600" cy="390" rx="180" ry="108"/>
    <ellipse cx="600" cy="390" rx="230" ry="138"/>
    <ellipse cx="600" cy="390" rx="295" ry="176"/>
    <ellipse cx="600" cy="390" rx="365" ry="218"/>
    <ellipse cx="600" cy="390" rx="440" ry="262"/>
    <ellipse cx="600" cy="390" rx="520" ry="305"/>
  </g>

  <!-- Sun -->
  <circle cx="600" cy="390" r="66"
          fill="url(#sunGrad)"
          stroke="#d88900"
          stroke-width="4"
          filter="url(#softShadow)"/>
  <g stroke="#f4b400" stroke-width="6" stroke-linecap="round">
    <line x1="600" y1="305" x2="600" y2="285"/>
    <line x1="600" y1="475" x2="600" y2="495"/>
    <line x1="515" y1="390" x2="495" y2="390"/>
    <line x1="685" y1="390" x2="705" y2="390"/>
    <line x1="540" y1="330" x2="525" y2="315"/>
    <line x1="660" y1="450" x2="675" y2="465"/>
    <line x1="660" y1="330" x2="675" y2="315"/>
    <line x1="540" y1="450" x2="525" y2="465"/>
  </g>
  <text x="600" y="398"
        text-anchor="middle"
        font-size="20"
        font-weight="700"
        fill="#7a4700">
    सूर्य
  </text>

  <!-- Mercury -->
  <circle cx="695" cy="390" r="9"
          fill="#8d8d8d" stroke="#555" stroke-width="2"/>
  <text x="695" y="368" text-anchor="middle"
        font-size="15" fill="#333">बुध</text>

  <!-- Venus -->
  <circle cx="735" cy="390" r="13"
          fill="#e7b85c" stroke="#a47719" stroke-width="2"/>
  <text x="735" y="360" text-anchor="middle"
        font-size="15" fill="#333">शुक्र</text>

  <!-- Earth -->
  <circle cx="780" cy="390" r="16"
          fill="url(#earthGrad)"
          stroke="#155a8a"
          stroke-width="2"
          filter="url(#softShadow)"/>
  <path d="M770 385 Q778 378 784 384 T792 392"
        fill="none" stroke="#4caf50" stroke-width="4"/>
  <circle cx="798" cy="382" r="4"
          fill="#cfcfcf" stroke="#777" stroke-width="1"/>
  <text x="780" y="350" text-anchor="middle"
        font-size="16" font-weight="700" fill="#145a8a">पृथ्वी</text>
  <text x="780" y="335" text-anchor="middle"
        font-size="13" fill="#555">तीसरा ग्रह</text>

  <!-- Mars -->
  <circle cx="830" cy="390" r="12"
          fill="url(#marsGrad)"
          stroke="#8e3325" stroke-width="2"/>
  <text x="830" y="365" text-anchor="middle"
        font-size="15" fill="#333">मंगल</text>

  <!-- Jupiter -->
  <circle cx="895" cy="390" r="28"
          fill="url(#jupiterGrad)"
          stroke="#87562c" stroke-width="3"
          filter="url(#softShadow)"/>
  <path d="M870 382 Q895 374 920 382
           M869 394 Q895 402 921 394"
        fill="none" stroke="#9b6940" stroke-width="5"/>
  <text x="895" y="350" text-anchor="middle"
        font-size="15" fill="#333">बृहस्पति</text>

  <!-- Saturn -->
  <ellipse cx="965" cy="390" rx="42" ry="11"
           fill="none" stroke="#c49b58" stroke-width="7"/>
  <circle cx="965" cy="390" r="22"
          fill="url(#saturnGrad)"
          stroke="#9d7a3f" stroke-width="3"/>
  <text x="965" y="350" text-anchor="middle"
        font-size="15" fill="#333">शनि</text>

  <!-- Uranus -->
  <circle cx="1040" cy="390" r="17"
          fill="#76d7e8"
          stroke="#398c9b" stroke-width="2"/>
  <text x="1040" y="350" text-anchor="middle"
        font-size="15" fill="#333">अरुण</text>

  <!-- Neptune -->
  <circle cx="1120" cy="390" r="17"
          fill="#4169e1"
          stroke="#2448a8" stroke-width="2"/>
  <text x="1120" y="350" text-anchor="middle"
        font-size="15" fill="#333">वरुण</text>

  <!-- Earth callout -->
  <path d="M780 410 L780 505 L930 505"
        fill="none" stroke="#155a8a"
        stroke-width="3"/>
  <rect x="930" y="470" width="210" height="78"
        rx="14" fill="#e8f6ff"
        stroke="#155a8a" stroke-width="2"/>
  <text x="1035" y="500"
        text-anchor="middle"
        font-size="16"
        font-weight="700"
        fill="#155a8a">
    पृथ्वी
  </text>
  <text x="1035" y="523"
        text-anchor="middle"
        font-size="14"
        fill="#333">
    सूर्य से तीसरा ग्रह
  </text>
  <text x="1035" y="542"
        text-anchor="middle"
        font-size="13"
        fill="#555">
    चंद्रमा इसका प्राकृतिक उपग्रह है
  </text>

  <!-- Planet order -->
  <rect x="80" y="610" width="1040" height="88"
        rx="18" fill="#f4f7fb"
        stroke="#777" stroke-width="2"/>
  <text x="600" y="640"
        text-anchor="middle"
        font-size="17"
        font-weight="700"
        fill="#333">
    सूर्य से ग्रहों का क्रम
  </text>
  <text x="600" y="670"
        text-anchor="middle"
        font-size="20"
        font-weight="600"
        fill="#222">
    बुध → शुक्र → पृथ्वी → मंगल → बृहस्पति → शनि → अरुण → वरुण
  </text>
</svg>`;
}

function latitudeLongitudeDiagram() {
    return svgBox(
        "अक्षांश और देशांतर",
        [
            "ध्रुव",
            "│",
            "अक्षांश = भूमध्य रेखा के उत्तर/दक्षिण कोणीय दूरी",
            "भूमध्य रेखा = 0°",
            "देशांतर = प्रधान मध्यान्ह रेखा के पूर्व/पश्चिम कोणीय दूरी",
            "प्रधान मध्यान्ह रेखा = 0°"
        ]
    );
}

function earthMotionsDiagram() {
    return svgBox(
        "पृथ्वी की दो प्रमुख गतियाँ",
        [
            "घूर्णन → अपनी धुरी पर घूमना → लगभग 24 घंटे → दिन और रात",
            "परिक्रमण → सूर्य की परिक्रमा → लगभग 365¼ दिन",
            "धुरी का झुकाव + परिक्रमण → ऋतुओं में परिवर्तन"
        ]
    );
}

function mapsDiagram() {
    return `
<svg class="nexora-svg"
     viewBox="0 0 1000 650"
     xmlns="http://www.w3.org/2000/svg">

    <rect x="12" y="12" width="976" height="626"
          rx="20" fill="#eef7ff"
          stroke="#333" stroke-width="3"/>

    <text x="500" y="45"
          text-anchor="middle"
          class="diagram-title">
        भारत — आकार और स्थिति
    </text>

    <!-- Seas -->
    <rect x="55" y="105" width="220" height="455"
          rx="18" fill="#d7efff"/>
    <rect x="725" y="105" width="220" height="455"
          rx="18" fill="#d7efff"/>
    <text x="165" y="335"
          text-anchor="middle"
          font-size="24"
          fill="#155a8a"
          transform="rotate(-90 165 335)">
        अरब सागर
    </text>
    <text x="835" y="335"
          text-anchor="middle"
          font-size="24"
          fill="#155a8a"
          transform="rotate(90 835 335)">
        बंगाल की खाड़ी
    </text>

    <!-- India schematic outline -->
    <path d="
        M 470 105
        L 505 125
        L 535 160
        L 575 185
        L 600 220
        L 625 255
        L 610 290
        L 585 315
        L 565 345
        L 545 385
        L 525 425
        L 505 470
        L 480 525
        L 455 565
        L 430 525
        L 415 480
        L 400 430
        L 385 385
        L 365 345
        L 345 315
        L 325 285
        L 340 250
        L 365 220
        L 390 190
        L 420 165
        L 445 130
        Z"
        fill="#ffd86b"
        stroke="#a55b00"
        stroke-width="4"/>

    <!-- Himalayan band -->
    <path d="
        M 350 245
        L 370 215
        L 405 190
        L 440 170
        L 475 150
        L 510 165
        L 545 185
        L 575 205
        L 595 225
        L 580 245
        L 540 230
        L 500 220
        L 455 215
        L 410 225
        L 375 245
        Z"
        fill="#c7d2e8"
        stroke="#667085"
        stroke-width="2"/>

    <!-- Tropic of Cancer -->
    <line x1="352" y1="325" x2="595" y2="325"
          stroke="#d12d2d"
          stroke-width="3"
          stroke-dasharray="10 8"/>
    <text x="605" y="331"
          font-size="18"
          fill="#b42318">
        कर्क रेखा 23°30′ उत्तर
    </text>

    <!-- Standard Meridian -->
    <line x1="500" y1="145" x2="500" y2="500"
          stroke="#1769aa"
          stroke-width="3"
          stroke-dasharray="8 7"/>
    <text x="512" y="485"
          font-size="18"
          fill="#145b8a">
        मानक याम्योत्तर 82°30′ पूर्व
    </text>

    <!-- Latitude extent -->
    <line x1="315" y1="105" x2="655" y2="105"
          stroke="#8e44ad"
          stroke-width="2"/>
    <text x="500" y="92"
          text-anchor="middle"
          font-size="17"
          fill="#6b2c85">
        उत्तरी सीमा: लगभग 37°6′ उत्तर
    </text>

    <line x1="395" y1="570" x2="550" y2="570"
          stroke="#8e44ad"
          stroke-width="2"/>
    <text x="475" y="600"
          text-anchor="middle"
          font-size="17"
          fill="#6b2c85">
        दक्षिणी सीमा: लगभग 8°4′ उत्तर
    </text>

    <!-- Longitude labels -->
    <text x="285" y="385"
          text-anchor="middle"
          font-size="17"
          fill="#7a3e00">
        पश्चिम: 68°7′ पूर्व
    </text>

    <text x="690" y="220"
          text-anchor="middle"
          font-size="17"
          fill="#7a3e00">
        पूर्व: 97°25′ पूर्व
    </text>

    <!-- Neighbour labels -->
    <text x="440" y="135"
          font-size="17"
          fill="#344054">
        चीन
    </text>

    <text x="315" y="235"
          font-size="17"
          fill="#344054">
        पाकिस्तान
    </text>

    <text x="585" y="255"
          font-size="17"
          fill="#344054">
        नेपाल
    </text>

    <text x="590" y="285"
          font-size="17"
          fill="#344054">
        भूटान
    </text>

    <text x="585" y="350"
          font-size="17"
          fill="#344054">
        बांग्लादेश
    </text>

    <text x="335" y="430"
          font-size="17"
          fill="#344054">
        म्यांमार
    </text>

    <text x="250" y="525"
          font-size="19"
          fill="#155a8a">
        लक्षद्वीप
    </text>

    <text x="760" y="535"
          font-size="19"
          fill="#155a8a">
        अंडमान-निकोबार
    </text>

    <!-- India label -->
    <text x="470" y="380"
          text-anchor="middle"
          font-size="30"
          font-weight="700"
          fill="#7a3e00">
        भारत
    </text>

    <!-- Footer -->
    <text x="500" y="625"
          text-anchor="middle"
          font-size="16"
          fill="#475467">
        क्षेत्रफल: लगभग 32.8 लाख वर्ग किमी | विश्व में लगभग 7वाँ स्थान
    </text>

</svg>`;
}

function domainsDiagram() {
    return svgBox(
        "पृथ्वी के प्रमुख परिमंडल",
        [
            "स्थलमंडल → ठोस भूमि",
            "जलमंडल → जल",
            "वायुमंडल → गैसीय आवरण",
            "जीवमंडल → जीवन का क्षेत्र",
            "चारों परिमंडल परस्पर जुड़े हुए हैं"
        ]
    );
}

function landformsDiagram() {
    return svgBox(
        "प्रमुख स्थलरूप",
        [
            "पर्वत → ऊँचे एवं तीव्र ढाल वाले स्थलरूप",
            "पठार → ऊँचा तथा अपेक्षाकृत समतल शीर्ष",
            "मैदान → अपेक्षाकृत समतल एवं निम्न भूमि",
            "निर्माण में अंतर्जात और बहिर्जात प्रक्रियाओं की भूमिका"
        ]
    );
}

function indiaDiagram() {
    return svgBox(
        "भारत — प्रमुख भौतिक विभाग",
        [
            "हिमालय",
            "↓",
            "उत्तरी मैदान",
            "↓",
            "प्रायद्वीपीय पठार",
            "पश्चिमी/पूर्वी तटीय मैदान + द्वीप समूह"
        ]
    );
}

function climateVegetationDiagram() {
    return svgBox(
        "जलवायु → वनस्पति → वन्य जीवन",
        [
            "तापमान + वर्षा + स्थलाकृति",
            "↓",
            "जलवायु परिस्थितियाँ",
            "↓",
            "प्राकृतिक वनस्पति",
            "↓",
            "वन्य जीवन और पारिस्थितिक तंत्र"
        ]
    );
}

function insideOurEarthDiagram() {
    return `
<svg class="nexora-svg" viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg">

    <text x="400" y="35" text-anchor="middle"
          class="diagram-title">पृथ्वी की आंतरिक संरचना</text>

    <circle cx="400" cy="225" r="165"
            fill="#f4c7a1" stroke="#333" stroke-width="3"/>

    <circle cx="400" cy="225" r="115"
            fill="#e58b5b" stroke="#333" stroke-width="2"/>

    <circle cx="400" cy="225" r="58"
            fill="#e3b341" stroke="#333" stroke-width="2"/>

    <text x="400" y="220" text-anchor="middle"
          class="diagram-text">आंतरिक कोर</text>

    <text x="400" y="245" text-anchor="middle"
          class="diagram-text">Core</text>

    <text x="400" y="130" text-anchor="middle"
          class="diagram-text">बाह्य कोर</text>

    <text x="400" y="82" text-anchor="middle"
          class="diagram-text">मेंटल</text>

    <text x="400" y="405" text-anchor="middle"
          class="diagram-text">भूपर्पटी — सबसे बाहरी परत</text>

</svg>`;
}


/* =========================================================
   HISTORY — THE MAKING OF A GLOBAL WORLD
   TOPIC-SPECIFIC GLOBAL TRADE / SILK ROUTES MAP
   ========================================================= */

function globalTradeRoutesDiagram() {
    return `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 1000 520"
     width="100%"
     role="img"
     aria-label="Silk Routes and Global Trade Connections">

    <rect x="0" y="0" width="1000" height="520"
          rx="14" fill="#ffffff" stroke="#c00000" stroke-width="3"/>

    <text x="500" y="38"
          text-anchor="middle"
          font-size="24"
          font-weight="700"
          fill="#c00000">
        SILK ROUTES &amp; GLOBAL TRADE CONNECTIONS
    </text>

    <!-- simplified geographic regions -->
    <path d="M70 150
             C150 105 245 115 300 165
             C340 205 300 260 235 275
             C165 292 95 260 62 220 Z"
          fill="#f2f2f2" stroke="#777" stroke-width="2"/>

    <path d="M300 165
             C390 110 510 120 585 175
             C635 212 620 270 555 292
             C475 318 375 286 315 245
             C280 220 275 190 300 165 Z"
          fill="#eeeeee" stroke="#777" stroke-width="2"/>

    <path d="M585 175
             C680 125 810 135 905 190
             C950 220 935 285 865 310
             C775 342 660 310 590 270
             C555 245 555 195 585 175 Z"
          fill="#f4f4f4" stroke="#777" stroke-width="2"/>

    <text x="165" y="205" text-anchor="middle"
          font-size="20" font-weight="700">EUROPE</text>

    <text x="450" y="205" text-anchor="middle"
          font-size="20" font-weight="700">ASIA</text>

    <text x="760" y="225" text-anchor="middle"
          font-size="20" font-weight="700">EAST ASIA</text>

    <!-- Silk route -->
    <path d="M180 180
             C270 145 360 150 455 190
             C545 228 625 215 735 235"
          fill="none"
          stroke="#c00000"
          stroke-width="7"
          stroke-linecap="round"/>

    <circle cx="180" cy="180" r="9" fill="#c00000"/>
    <circle cx="455" cy="190" r="9" fill="#c00000"/>
    <circle cx="735" cy="235" r="9" fill="#c00000"/>

    <text x="450" y="145"
          text-anchor="middle"
          font-size="18"
          font-weight="700"
          fill="#c00000">
        SILK ROUTES
    </text>

    <!-- Maritime connection -->
    <path d="M205 255
             C360 360 585 370 820 285"
          fill="none"
          stroke="#555"
          stroke-width="5"
          stroke-dasharray="12 9"/>

    <text x="515" y="405"
          text-anchor="middle"
          font-size="17"
          font-weight="700">
        LAND + MARITIME TRADE CONNECTIONS
    </text>

    <!-- goods -->
    <text x="105" y="455" font-size="16">
        Silk • Spices • Textiles • Precious metals
    </text>

    <text x="590" y="455" font-size="16">
        People • Ideas • Religions • Crops
    </text>
</svg>`;
}


/* =========================================================
   HISTORY — NATIONALISM IN INDIA
   SIMPLIFIED MOVEMENT / REGIONAL MAP VISUAL
   ========================================================= */

function nationalismIndiaDiagram() {
    return `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 900 560"
     width="100%"
     role="img"
     aria-label="Nationalism in India movement map">

    <rect x="0" y="0" width="900" height="560"
          rx="14" fill="#ffffff" stroke="#c00000" stroke-width="3"/>

    <text x="450" y="38"
          text-anchor="middle"
          font-size="24"
          font-weight="700"
          fill="#c00000">
        NATIONALISM IN INDIA — MOVEMENT MAP
    </text>

    <!-- simplified India silhouette, intentionally schematic -->
    <path d="M390 90
             L475 105
             L530 150
             L545 215
             L520 270
             L535 330
             L505 385
             L470 450
             L445 505
             L415 450
             L375 400
             L345 345
             L320 285
             L330 225
             L350 170 Z"
          fill="#f1f1f1"
          stroke="#555"
          stroke-width="3"/>

    <circle cx="370" cy="205" r="9" fill="#c00000"/>
    <circle cx="425" cy="255" r="9" fill="#c00000"/>
    <circle cx="480" cy="320" r="9" fill="#c00000"/>
    <circle cx="405" cy="375" r="9" fill="#c00000"/>

    <text x="590" y="190" font-size="18" font-weight="700">
        Major themes
    </text>

    <text x="590" y="225" font-size="16">
        • Non-Cooperation Movement
    </text>

    <text x="590" y="255" font-size="16">
        • Civil Disobedience Movement
    </text>

    <text x="590" y="285" font-size="16">
        • Mass mobilisation
    </text>

    <text x="590" y="315" font-size="16">
        • Peasants and workers
    </text>

    <text x="590" y="345" font-size="16">
        • Regional participation
    </text>

    <text x="100" y="505"
          font-size="15"
          fill="#555">
        Schematic educational map — not to geographic scale.
    </text>
</svg>`;
}


/* =========================================================
   HISTORY — NATIONALISM IN EUROPE
   EUROPEAN NATIONALISM MAP VISUAL
   ========================================================= */

function nationalismEuropeDiagram() {
    return `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 1000 520"
     width="100%"
     role="img"
     aria-label="Nationalism in Europe visual">

    <rect x="0" y="0" width="1000" height="520"
          rx="14" fill="#ffffff" stroke="#c00000" stroke-width="3"/>

    <text x="500" y="38"
          text-anchor="middle"
          font-size="24"
          font-weight="700"
          fill="#c00000">
        NATIONALISM IN EUROPE
    </text>

    <!-- schematic Europe -->
    <path d="M155 155
             L250 100
             L355 125
             L430 100
             L535 145
             L625 125
             L760 175
             L830 245
             L790 315
             L675 345
             L555 325
             L470 355
             L365 325
             L260 350
             L175 295
             Z"
          fill="#eeeeee"
          stroke="#666"
          stroke-width="3"/>

    <circle cx="420" cy="245" r="30"
            fill="#c00000" opacity="0.15"
            stroke="#c00000" stroke-width="3"/>

    <circle cx="565" cy="245" r="30"
            fill="#c00000" opacity="0.15"
            stroke="#c00000" stroke-width="3"/>

    <text x="420" y="250"
          text-anchor="middle"
          font-size="15"
          font-weight="700">
        GERMAN
    </text>

    <text x="565" y="250"
          text-anchor="middle"
          font-size="15"
          font-weight="700">
        ITALIAN
    </text>

    <text x="420" y="275"
          text-anchor="middle"
          font-size="14">
        UNIFICATION
    </text>

    <text x="565" y="275"
          text-anchor="middle"
          font-size="14">
        UNIFICATION
    </text>

    <text x="100" y="420"
          font-size="17"
          font-weight="700">
        Key ideas:
    </text>

    <text x="100" y="450" font-size="16">
        Nation-state • Liberalism • Conservatism • Unification
    </text>

    <text x="100" y="480"
          font-size="14"
          fill="#555">
        Schematic educational map — not to geographic scale.
    </text>
</svg>`;
}


/* =========================================================
   HISTORY — AGE OF INDUSTRIALISATION
   INDUSTRIAL CENTRES / TRADE VISUAL
   ========================================================= */

function industrialisationCentresDiagram() {
    return `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 1000 520"
     width="100%"
     role="img"
     aria-label="Industrialisation centres and trade connections">

    <rect x="0" y="0" width="1000" height="520"
          rx="14" fill="#ffffff" stroke="#c00000" stroke-width="3"/>

    <text x="500" y="38"
          text-anchor="middle"
          font-size="24"
          font-weight="700"
          fill="#c00000">
        AGE OF INDUSTRIALISATION — PRODUCTION &amp; TRADE
    </text>

    <rect x="90" y="125" width="250" height="110"
          rx="12" fill="#f1f1f1"
          stroke="#555" stroke-width="2"/>

    <text x="215" y="165"
          text-anchor="middle"
          font-size="21"
          font-weight="700">
        BRITAIN
    </text>

    <text x="215" y="195"
          text-anchor="middle"
          font-size="16">
        Factories • Cotton • Steam
    </text>

    <rect x="375" y="125" width="250" height="110"
          rx="12" fill="#f1f1f1"
          stroke="#555" stroke-width="2"/>

    <text x="500" y="165"
          text-anchor="middle"
          font-size="21"
          font-weight="700">
        GLOBAL MARKETS
    </text>

    <text x="500" y="195"
          text-anchor="middle"
          font-size="16">
        Trade • Capital • Demand
    </text>

    <rect x="660" y="125" width="250" height="110"
          rx="12" fill="#f1f1f1"
          stroke="#555" stroke-width="2"/>

    <text x="785" y="165"
          text-anchor="middle"
          font-size="21"
          font-weight="700">
        COLONIAL INDIA
    </text>

    <text x="785" y="195"
          text-anchor="middle"
          font-size="16">
        Textiles • Raw materials
    </text>

    <path d="M340 180 L375 180"
          stroke="#c00000" stroke-width="6"/>

    <path d="M625 180 L660 180"
          stroke="#c00000" stroke-width="6"/>

    <text x="500" y="295"
          text-anchor="middle"
          font-size="20"
          font-weight="700"
          fill="#c00000">
        INDUSTRIALISATION
    </text>

    <path d="M500 235 L500 335"
          stroke="#c00000" stroke-width="6"/>

    <rect x="220" y="350" width="560" height="90"
          rx="12" fill="#f7f7f7"
          stroke="#777" stroke-width="2"/>

    <text x="500" y="385"
          text-anchor="middle"
          font-size="17"
          font-weight="700">
        Technology + Labour + Capital + Markets
    </text>

    <text x="500" y="415"
          text-anchor="middle"
          font-size="15">
        Machine production did not immediately eliminate hand production.
    </text>
</svg>`;
}



function universalTextbookDiagram(chapterKey) {
    const key = String(chapterKey || "").toLowerCase();

    const titles = {
        "food-chain-web": "Food Chain / Food Web",
        "photosynthesis": "Photosynthesis",
        "cell": "Basic Cell Structure",
        "heart": "Human Heart",
        "digestive-system": "Human Digestive System",
        "respiratory-system": "Human Respiratory System",
        "circulatory-system": "Human Circulatory System",
        "river-system": "River System",
        "volcano": "Volcano Structure",
        "river-landforms": "River Landforms",
        "atmosphere-layers": "Layers of Atmosphere",
        "rock-types": "Three Major Rock Types",
        "electric-circuit": "Simple Electric Circuit",
        "light-rays": "Light Ray Diagram",
        "force-motion": "Force and Motion",
        "atomic-structure": "Basic Atomic Structure",
        "chemical-reaction": "Chemical Reaction",
        "geometry-figure": "Geometry Figure",
        "life-cycle": "Life Cycle",
        "process-cycle": "Process / Cycle",
        "stages-steps": "Stages / Steps"
    };

    const title = titles[key];
    if (!title) return null;

    const palette = [
        ["#e53935","#fff5f5"],
        ["#1565c0","#f3f8ff"],
        ["#2e7d32","#f3fff4"],
        ["#6a1b9a","#faf3ff"]
    ];

    const boxes = [
        ["INPUT","Observation / Starting Point"],
        ["PROCESS","Key concept / Transformation"],
        ["OUTPUT","Result / Application"]
    ];

    if (key === "food-chain-web") {
        return `<svg class="nexora-svg" viewBox="0 0 900 330" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="860" height="290" rx="20" fill="#fff" stroke="#1565c0" stroke-width="3"/>
        <text x="450" y="55" text-anchor="middle" class="diagram-title">Food Chain</text>
        <g font-family="Arial, sans-serif" font-size="20" text-anchor="middle">
        <rect x="55" y="125" width="145" height="65" rx="12" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
        <text x="127" y="165">Plants</text>
        <rect x="270" y="125" width="145" height="65" rx="12" fill="#fff3e0" stroke="#ef6c00" stroke-width="2"/>
        <text x="342" y="165">Herbivore</text>
        <rect x="485" y="125" width="145" height="65" rx="12" fill="#ffebee" stroke="#c62828" stroke-width="2"/>
        <text x="557" y="165">Carnivore</text>
        <rect x="700" y="125" width="145" height="65" rx="12" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2"/>
        <text x="772" y="165">Decomposer</text>
        <path d="M200 157 L270 157 M415 157 L485 157 M630 157 L700 157" stroke="#333" stroke-width="4" marker-end="url(#arrow)"/>
        </g>
        <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
        </svg>`;
    }

    if (key === "electric-circuit") {
        return `<svg class="nexora-svg" viewBox="0 0 900 400" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="860" height="360" rx="20" fill="#fff" stroke="#1565c0" stroke-width="3"/>
        <text x="450" y="58" text-anchor="middle" class="diagram-title">Simple Electric Circuit</text>
        <path d="M150 180 H300 M420 180 H690 V290 H150 V180" fill="none" stroke="#222" stroke-width="5"/>
        <circle cx="360" cy="180" r="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="4"/>
        <text x="360" y="188" text-anchor="middle" font-size="24">Cell</text>
        <rect x="690" y="235" width="100" height="55" rx="8" fill="#fff9c4" stroke="#f9a825" stroke-width="3"/>
        <text x="740" y="270" text-anchor="middle" font-size="21">Bulb</text>
        <text x="150" y="335" font-size="21">Closed conducting path → electric current flows</text>
        </svg>`;
    }

    if (key === "atomic-structure") {
        return `<svg class="nexora-svg" viewBox="0 0 800 430" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="760" height="390" rx="20" fill="#fff" stroke="#6a1b9a" stroke-width="3"/>
        <text x="400" y="55" text-anchor="middle" class="diagram-title">Basic Atomic Structure</text>
        <ellipse cx="400" cy="220" rx="230" ry="115" fill="none" stroke="#1565c0" stroke-width="3"/>
        <ellipse cx="400" cy="220" rx="145" ry="70" fill="none" stroke="#2e7d32" stroke-width="3"/>
        <circle cx="400" cy="220" r="62" fill="#ffebee" stroke="#c62828" stroke-width="3"/>
        <text x="400" y="215" text-anchor="middle" font-size="22">Nucleus</text>
        <text x="400" y="242" text-anchor="middle" font-size="18">p + n</text>
        <circle cx="255" cy="220" r="13" fill="#1565c0"/><text x="235" y="195" font-size="18">e⁻</text>
        <circle cx="400" cy="150" r="13" fill="#1565c0"/><text x="420" y="145" font-size="18">e⁻</text>
        <circle cx="630" cy="220" r="13" fill="#1565c0"/><text x="650" y="225" font-size="18">e⁻</text>
        </svg>`;
    }

    if (key === "photosynthesis") {
        return `<svg class="nexora-svg" viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="860" height="320" rx="20" fill="#fff" stroke="#2e7d32" stroke-width="3"/>
        <text x="450" y="55" text-anchor="middle" class="diagram-title">Photosynthesis</text>
        <rect x="70" y="125" width="180" height="75" rx="15" fill="#e3f2fd" stroke="#1565c0" stroke-width="3"/>
        <text x="160" y="170" text-anchor="middle" font-size="22">CO₂ + Water</text>
        <rect x="360" y="105" width="180" height="115" rx="15" fill="#e8f5e9" stroke="#2e7d32" stroke-width="3"/>
        <text x="450" y="155" text-anchor="middle" font-size="22">Leaf +</text>
        <text x="450" y="185" text-anchor="middle" font-size="22">Sunlight</text>
        <rect x="650" y="125" width="180" height="75" rx="15" fill="#fff3e0" stroke="#ef6c00" stroke-width="3"/>
        <text x="740" y="170" text-anchor="middle" font-size="22">Glucose + O₂</text>
        <path d="M250 162 H355 M545 162 H645" stroke="#333" stroke-width="4" marker-end="url(#pArrow)"/>
        <defs><marker id="pArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#333"/></marker></defs>
        </svg>`;
    }

    return `<svg class="nexora-svg" viewBox="0 0 900 330" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="860" height="290" rx="20" fill="#fff" stroke="#1565c0" stroke-width="3"/>
    <text x="450" y="55" text-anchor="middle" class="diagram-title">${title}</text>
    <g font-family="Arial, sans-serif" text-anchor="middle">
    ${boxes.map((b,i)=>`
      <rect x="${70+i*285}" y="115" width="210" height="100" rx="16" fill="${palette[i][1]}" stroke="${palette[i][0]}" stroke-width="3"/>
      <text x="${175+i*285}" y="155" font-size="22" font-weight="bold">${b[0]}</text>
      <text x="${175+i*285}" y="185" font-size="16">${b[1]}</text>
    `).join("")}
    </g>
    <path d="M280 165 H350 M565 165 H635" stroke="#333" stroke-width="4"/>
    </svg>`;
}


function getDiagramForChapter(chapterKey) {
    const diagrams = {
        "solar-system": solarSystemDiagram,
        "food-chain-web": () => universalTextbookDiagram("food-chain-web"),
        "photosynthesis": () => universalTextbookDiagram("photosynthesis"),
        "cell": () => universalTextbookDiagram("cell"),
        "heart": () => universalTextbookDiagram("heart"),
        "digestive-system": () => universalTextbookDiagram("digestive-system"),
        "respiratory-system": () => universalTextbookDiagram("respiratory-system"),
        "circulatory-system": () => universalTextbookDiagram("circulatory-system"),
        "river-system": () => universalTextbookDiagram("river-system"),
        "volcano": () => universalTextbookDiagram("volcano"),
        "river-landforms": () => universalTextbookDiagram("river-landforms"),
        "atmosphere-layers": () => universalTextbookDiagram("atmosphere-layers"),
        "rock-types": () => universalTextbookDiagram("rock-types"),
        "electric-circuit": () => universalTextbookDiagram("electric-circuit"),
        "light-rays": () => universalTextbookDiagram("light-rays"),
        "force-motion": () => universalTextbookDiagram("force-motion"),
        "atomic-structure": () => universalTextbookDiagram("atomic-structure"),
        "chemical-reaction": () => universalTextbookDiagram("chemical-reaction"),
        "geometry-figure": () => universalTextbookDiagram("geometry-figure"),
        "life-cycle": () => universalTextbookDiagram("life-cycle"),
        "process-cycle": () => universalTextbookDiagram("process-cycle"),
        "stages-steps": () => universalTextbookDiagram("stages-steps"),
        "globe-latitudes-longitudes": latitudeLongitudeDiagram,
        "motions-of-earth": earthMotionsDiagram,
        "maps": mapsDiagram,
        "major-domains-earth": domainsDiagram,
        "major-landforms-earth": landformsDiagram,
        "our-country-india": indiaDiagram,
        "india-climate-vegetation-wildlife": climateVegetationDiagram,
        "inside-our-earth": insideOurEarthDiagram,
        "global-trade-routes": globalTradeRoutesDiagram,
        "nationalism-in-india": nationalismIndiaDiagram,
        "nationalism-in-europe": nationalismEuropeDiagram,
        "industrialisation-centres": industrialisationCentresDiagram
    };

    const generator = diagrams[chapterKey];

    return generator ? generator() : "";
}

module.exports = {
    getDiagramForChapter
};


/* NEXORA_FINAL_MEMORY_MAP_DIAGRAM_V23 */

function nexoraV23MemoryMapDefinition(chapterTitle) {
    return {
        type: 'memory-map',
        title: String(chapterTitle || 'Selected Chapter'),
        sections: [
            'Core Concepts',
            'Definitions & Terms',
            'Causes / Processes / Effects',
            'Exam Focus',
            'Quick Revision'
        ]
    };
}

/* END NEXORA_FINAL_MEMORY_MAP_DIAGRAM_V23 */

