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
    return svgBox(
        "सौरमंडल — अवधारणात्मक संरचना",
        [
            "सूर्य",
            "↓",
            "बुध → शुक्र → पृथ्वी → मंगल → बृहस्पति → शनि → अरुण → वरुण",
            "पृथ्वी = सूर्य से तीसरा ग्रह",
            "चंद्रमा = पृथ्वी का प्राकृतिक उपग्रह"
        ]
    );
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


function getDiagramForChapter(chapterKey) {
    const diagrams = {
        "solar-system": solarSystemDiagram,
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

