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
    return svgBox(
        "मानचित्र के प्रमुख घटक",
        [
            "दिशा + पैमाना + प्रतीक",
            "↓",
            "मानचित्र = पृथ्वी की सतह का चयनित, मापित और सामान्यीकृत निरूपण",
            "भौतिक मानचित्र | राजनीतिक मानचित्र | विषयगत मानचित्र"
        ]
    );
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

function getDiagramForChapter(chapterKey) {
    const diagrams = {
        "solar-system": solarSystemDiagram,
        "globe-latitudes-longitudes": latitudeLongitudeDiagram,
        "motions-of-earth": earthMotionsDiagram,
        "maps": mapsDiagram,
        "major-domains-earth": domainsDiagram,
        "major-landforms-earth": landformsDiagram,
        "our-country-india": indiaDiagram,
        "india-climate-vegetation-wildlife": climateVegetationDiagram
    };

    const generator = diagrams[chapterKey];

    return generator ? generator() : "";
}

module.exports = {
    getDiagramForChapter
};
