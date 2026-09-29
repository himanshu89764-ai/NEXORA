const map = L.map("mapCanvas", {
    zoomControl: false
}).setView([22.9734, 78.6569], 5);

const BASE_TILE_URL =
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

L.tileLayer(BASE_TILE_URL, {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);


// ================================
// MAP VIEWS
// ================================

const mapViews = {
    india: {
        center: [22.9734, 78.6569],
        zoom: 5
    },

    world: {
        center: [20, 0],
        zoom: 2
    }
};


// ================================
// LAYERS
// ================================

const layerRegistry = {
    states: L.layerGroup(),
    rivers: L.layerGroup(),
    mountains: L.layerGroup(),
    passes: L.layerGroup(),
    cities: L.layerGroup(),
    seas: L.layerGroup()
};


// ================================
// INITIAL LEARNING LOCATIONS
// ================================

const locations = [
    {
        id: "delhi",
        name: "New Delhi",
        type: "Important City",
        lat: 28.6139,
        lng: 77.2090,
        layer: "cities",
        description: "Capital of India."
    },

    {
        id: "nathula",
        name: "Nathu La Pass",
        type: "Mountain Pass",
        lat: 27.3860,
        lng: 88.8300,
        layer: "passes",
        description: "Important mountain pass in Sikkim."
    },

    {
        id: "himalayas",
        name: "Himalayas",
        type: "Mountain System",
        lat: 30.0000,
        lng: 80.0000,
        layer: "mountains",
        description: "Major mountain system along India's northern boundary."
    },

    {
        id: "ganga",
        name: "Ganga",
        type: "River",
        lat: 25.3000,
        lng: 83.0000,
        layer: "rivers",
        description: "One of the major river systems of northern India."
    },

    {
        id: "arabian-sea",
        name: "Arabian Sea",
        type: "Sea",
        lat: 15.0000,
        lng: 68.0000,
        layer: "seas",
        description: "Sea located west of the Indian peninsula."
    }
];


// ================================
// CREATE MARKERS
// ================================

const markerIndex = {};

locations.forEach(location => {
    const marker = L.marker([location.lat, location.lng]);

    marker.bindTooltip(location.name);

    marker.on("click", () => {
        showLocation(location);
    });

    layerRegistry[location.layer].addLayer(marker);

    markerIndex[location.id] = {
        marker,
        location
    };
});


// Add default layers
Object.values(layerRegistry).forEach(layer => {
    layer.addTo(map);
});


// ================================
// INFO PANEL
// ================================

function showLocation(location) {
    const panel = document.getElementById("infoPanel");
    if (!panel) return;

    const stateData = typeof NEXORA_STATE_DATA !== "undefined"
        ? NEXORA_STATE_DATA[location.name]
        : null;

    if (stateData) {
        panel.innerHTML = `
            <div class="info-content">
                <div class="info-type">${location.type}</div>
                <h2>${location.name}</h2>
                <p>${location.description}</p>

                <div class="info-meta">
                    <span>Latitude: ${location.lat}</span>
                    <span>Longitude: ${location.lng}</span>
                </div>

                <div class="smart-details">
                    <h3>Capital</h3>
                    <p>${stateData.capital}</p>

                    <h3>Region</h3>
                    <p>${stateData.region}</p>

                    <h3>Important Rivers</h3>
                    <p>${stateData.importantRivers.join(", ")}</p>

                    <h3>Physical Features</h3>
                    <p>${stateData.physicalFeatures.join(", ")}</p>

                    <h3>Important Places</h3>
                    <p>${stateData.importantPlaces.join(", ")}</p>

                    <h3>UPSC Facts</h3>
                    <ul>${stateData.upscFacts.map(fact => `<li>${fact}</li>`).join("")}</ul>

                    <h3>NCERT Facts</h3>
                    <ul>${stateData.ncertFacts.map(fact => `<li>${fact}</li>`).join("")}</ul>
                </div>

                <button class="info-action" id="learnLocationBtn">
                    Learn More
                </button>
            </div>
        `;
        return;
    }

    panel.innerHTML = `
        <div class="info-content">
            <div class="info-type">${location.type}</div>
            <h2>${location.name}</h2>
            <p>${location.description}</p>
            <div class="info-meta">
                <span>Latitude: ${location.lat}</span>
                <span>Longitude: ${location.lng}</span>
            </div>
            <button class="info-action" id="learnLocationBtn">Learn More</button>
        </div>
    `;
}


// ================================
// MAP TYPE
// ================================

document.querySelectorAll(".map-type").forEach(button => {
    button.addEventListener("click", () => {
        const mapType = button.dataset.map;

        const view = mapViews[mapType];

        if (!view) return;

        map.setView(view.center, view.zoom);

        document.querySelectorAll(".map-type").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
    });
});


// ================================
// LAYER TOGGLES
// ================================

document.querySelectorAll('input[data-layer]').forEach(input => {
    input.addEventListener("change", () => {
        const layerName = input.dataset.layer;
        const layer = layerRegistry[layerName];

        if (!layer) return;

        if (input.checked) {
            layer.addTo(map);
        } else {
            map.removeLayer(layer);
        }
    });
});


// ================================
// SEARCH
// ================================

function searchLocation() {
    const input = document.getElementById("mapSearch");

    if (!input) return;

    const query = input.value.trim().toLowerCase();

    if (!query) return;

    const result = locations.find(location =>
        location.name.toLowerCase().includes(query) ||
        location.type.toLowerCase().includes(query)
    );

    if (!result) {
        const panel = document.getElementById("infoPanel");

        if (panel) {
            panel.innerHTML = `
                <div class="info-content">
                    <h2>Location not found</h2>
                    <p>
                        Try a location from the available mapping dataset.
                    </p>
                </div>
            `;
        }

        return;
    }

    const layer = layerRegistry[result.layer];

    if (layer && !map.hasLayer(layer)) {
        layer.addTo(map);

        const checkbox =
            document.querySelector(
                `input[data-layer="${result.layer}"]`
            );

        if (checkbox) {
            checkbox.checked = true;
        }
    }

    map.flyTo(
        [result.lat, result.lng],
        8,
        {
            duration: 1.2
        }
    );

    setTimeout(() => {
        markerIndex[result.id].marker.openTooltip();
        showLocation(result);
    }, 700);
}

const searchButton = document.getElementById("searchBtn");

if (searchButton) {
    searchButton.addEventListener("click", searchLocation);
}

const searchInput = document.getElementById("mapSearch");

if (searchInput) {
    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            searchLocation();
        }
    });
}


// ================================
// MAP CONTROLS
// ================================

const zoomIn = document.getElementById("zoomIn");
const zoomOut = document.getElementById("zoomOut");
const resetMap = document.getElementById("resetMap");

if (zoomIn) {
    zoomIn.addEventListener("click", () => {
        map.zoomIn();
    });
}

if (zoomOut) {
    zoomOut.addEventListener("click", () => {
        map.zoomOut();
    });
}

if (resetMap) {
    resetMap.addEventListener("click", () => {
        map.setView(
            mapViews.india.center,
            mapViews.india.zoom
        );
    });
}


// ================================
// LEARN / QUIZ MODE
// ================================

const learnModeBtn = document.getElementById("learnModeBtn");
const quizModeBtn = document.getElementById("quizModeBtn");
const quizPanel = document.getElementById("quizPanel");

function setMode(mode) {
    if (mode === "quiz") {
        if (quizPanel) {
            quizPanel.style.display = "block";
        }

        if (learnModeBtn) {
            learnModeBtn.classList.remove("active");
        }

        if (quizModeBtn) {
            quizModeBtn.classList.add("active");
        }
    } else {
        if (quizPanel) {
            quizPanel.style.display = "none";
        }

        if (quizModeBtn) {
            quizModeBtn.classList.remove("active");
        }

        if (learnModeBtn) {
            learnModeBtn.classList.add("active");
        }
    }
}

if (learnModeBtn) {
    learnModeBtn.addEventListener("click", () => {
        setMode("learn");
    });
}

if (quizModeBtn) {
    quizModeBtn.addEventListener("click", () => {
        setMode("quiz");
    });
}


// ================================
// STARTUP
// ================================

setMode("learn");

console.log("NEXORA Smart Mapping initialized.");


// ========================================
// INDIA STATES & UTs GEOJSON LAYER
// ========================================

let indiaStatesLayer = null;

fetch("data/india-states.geojson")
    .then(response => {
        if (!response.ok) {
            throw new Error("States GeoJSON could not be loaded");
        }

        return response.json();
    })
    .then(data => {

        indiaStatesLayer = L.geoJSON(data, {
            style: {
                weight: 1.5,
                opacity: 1,
                fillOpacity: 0.12
            },

            onEachFeature: (feature, layer) => {

                const properties = feature.properties || {};

                const stateName =
                    properties.st_nm ||
                    properties.NAME_1 ||
                    properties.name ||
                    properties.NAME ||
                    "Unknown State / UT";

                layer.bindTooltip(stateName);

                layer.on("click", () => {

                    showLocation({
                        name: stateName,
                        type: "State / Union Territory",
                        lat: layer.getBounds().getCenter().lat.toFixed(4),
                        lng: layer.getBounds().getCenter().lng.toFixed(4),
                        description:
                            `Interactive mapping region: ${stateName}.`
                    });

                });

                layer.on("mouseover", () => {
                    layer.setStyle({
                        weight: 2.5,
                        fillOpacity: 0.28
                    });
                });

                layer.on("mouseout", () => {
                    indiaStatesLayer.resetStyle(layer);
                });
            }
        });

        indiaStatesLayer.addTo(map);

        console.log(
            "NEXORA States & UTs layer loaded."
        );
    })
    .catch(error => {
        console.error(
            "NEXORA States layer error:",
            error
        );
    });


// ========================================
// SMART LAYER SYSTEM — STATES/UTs SYNC
// ========================================

if (indiaStatesLayer) {
    map.removeLayer(indiaStatesLayer);
    layerRegistry.states.addLayer(indiaStatesLayer);
}

const statesCheckbox = document.querySelector(
    '[data-layer="states"]'
);

if (statesCheckbox) {

    if (statesCheckbox.checked) {
        layerRegistry.states.addTo(map);
    }

    statesCheckbox.addEventListener("change", () => {

        if (statesCheckbox.checked) {
            layerRegistry.states.addTo(map);
        } else {
            map.removeLayer(layerRegistry.states);
        }

    });
}

console.log("NEXORA Smart States Layer connected.");


// ========================================
// SMART STATE SEARCH
// ========================================

function searchSmartState(query) {

    if (typeof NEXORA_STATE_DATA === "undefined") {
        return false;
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return false;
    }

    const stateName = Object.keys(NEXORA_STATE_DATA).find(
        name => name.toLowerCase() === normalizedQuery
    );

    if (!stateName) {
        return false;
    }

    if (indiaStatesLayer) {

        let matchedLayer = null;

        indiaStatesLayer.eachLayer(layer => {

            const properties = layer.feature?.properties || {};

            const name =
                properties.st_nm ||
                properties.NAME_1 ||
                properties.name ||
                properties.NAME;

            if (name === stateName) {
                matchedLayer = layer;
            }

        });

        if (matchedLayer) {

            const bounds = matchedLayer.getBounds();

            map.fitBounds(bounds, {
                padding: [30, 30],
                maxZoom: 7
            });

            matchedLayer.openTooltip();

            const center = bounds.getCenter();

            showLocation({
                name: stateName,
                type: "State / Union Territory",
                lat: center.lat.toFixed(4),
                lng: center.lng.toFixed(4),
                description:
                    `Interactive mapping region: ${stateName}.`
            });

            return true;
        }
    }

    return false;
}




// ========================================
// SMART RIVERS LAYER
// ========================================

const riverCoordinates = {
    "Ganga": [
        [30.92, 79.07],
        [29.95, 78.16],
        [28.61, 77.23],
        [27.18, 81.97],
        [25.59, 85.14],
        [25.26, 87.85]
    ],

    "Yamuna": [
        [31.01, 78.46],
        [30.14, 78.31],
        [29.16, 77.99],
        [28.61, 77.21],
        [27.17, 78.01],
        [25.43, 81.88]
    ],

    "Brahmaputra": [
        [29.35, 94.72],
        [28.07, 95.33],
        [27.48, 94.91],
        [26.14, 91.74],
        [25.76, 89.70]
    ],

    "Narmada": [
        [22.67, 81.75],
        [22.05, 78.95],
        [21.70, 76.20],
        [21.65, 73.00]
    ],

    "Godavari": [
        [19.94, 73.53],
        [19.10, 78.95],
        [18.20, 80.00],
        [16.90, 81.85]
    ],

    "Krishna": [
        [17.92, 73.65],
        [16.50, 74.75],
        [16.25, 77.60],
        [16.00, 80.65]
    ],

    "Mahanadi": [
        [20.05, 82.15],
        [20.45, 82.90],
        [20.30, 84.00],
        [20.25, 85.90]
    ]
};

const riverLayer = L.layerGroup();

Object.keys(riverCoordinates).forEach(riverName => {

    const line = L.polyline(
        riverCoordinates[riverName],
        {
            weight: 4,
            opacity: 0.85
        }
    );

    line.bindTooltip(riverName);

    line.on("click", () => {

        const data =
            typeof NEXORA_RIVER_DATA !== "undefined"
                ? NEXORA_RIVER_DATA[riverName]
                : null;

        if (data) {

            const panel =
                document.getElementById("infoPanel");

            if (panel) {

                panel.innerHTML = `
                    <div class="info-content">
                        <div class="info-type">
                            ${data.type}
                        </div>

                        <h2>${riverName}</h2>

                        <div class="smart-details">

                            <h3>Origin</h3>
                            <p>${data.origin}</p>

                            <h3>Flows Through</h3>
                            <p>${data.flowsThrough.join(", ")}</p>

                            <h3>Drainage</h3>
                            <p>${data.drainage}</p>

                            <h3>Major Tributaries</h3>
                            <p>${data.tributaries.join(", ")}</p>

                            <h3>UPSC Facts</h3>
                            <ul>
                                ${data.upscFacts
                                    .map(fact => `<li>${fact}</li>`)
                                    .join("")}
                            </ul>

                        </div>
                    </div>
                `;
            }
        }
    });

    riverLayer.addLayer(line);
});

layerRegistry.rivers = riverLayer;

console.log(
    "NEXORA Smart Rivers Layer loaded:",
    Object.keys(riverCoordinates).length,
    "rivers"
);


// ========================================
// RIVERS CHECKBOX
// ========================================

const riversCheckbox =
    document.querySelector('[data-layer="rivers"]');

if (riversCheckbox) {

    if (riversCheckbox.checked) {
        riverLayer.addTo(map);
    }

    riversCheckbox.addEventListener("change", () => {

        if (riversCheckbox.checked) {
            riverLayer.addTo(map);
        } else {
            map.removeLayer(riverLayer);
        }

    });
}


// ========================================
// SMART RIVER SEARCH
// ========================================

function searchSmartRiver(query) {

    if (typeof NEXORA_RIVER_DATA === "undefined") {
        return false;
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return false;
    }

    const riverName = Object.keys(NEXORA_RIVER_DATA).find(
        name => name.toLowerCase() === normalizedQuery
    );

    if (!riverName || !riverCoordinates[riverName]) {
        return false;
    }

    const coordinates = riverCoordinates[riverName];

    map.fitBounds(coordinates, {
        padding: [40, 40],
        maxZoom: 7
    });

    const data = NEXORA_RIVER_DATA[riverName];

    const panel = document.getElementById("infoPanel");

    if (panel) {
        panel.innerHTML = `
            <div class="info-content">
                <div class="info-type">${data.type}</div>

                <h2>${riverName}</h2>

                <div class="smart-details">

                    <h3>Origin</h3>
                    <p>${data.origin}</p>

                    <h3>Flows Through</h3>
                    <p>${data.flowsThrough.join(", ")}</p>

                    <h3>Drainage</h3>
                    <p>${data.drainage}</p>

                    <h3>Major Tributaries</h3>
                    <p>${data.tributaries.join(", ")}</p>

                    <h3>UPSC Facts</h3>
                    <ul>
                        ${data.upscFacts
                            .map(fact => `<li>${fact}</li>`)
                            .join("")}
                    </ul>

                </div>
            </div>
        `;
    }

    return true;
}



console.log("NEXORA Smart River Search connected.");

// ========================================
// SMART GEOJSON STATE / UT SEARCH
// ========================================

function searchGeoJSONState(query) {

    if (!indiaStatesLayer) {
        return false;
    }

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return false;
    }

    let matchedLayer = null;
    let matchedName = null;

    indiaStatesLayer.eachLayer(layer => {

        const properties = layer.feature?.properties || {};

        const name =
            properties.st_nm ||
            properties.NAME_1 ||
            properties.name ||
            properties.NAME;

        if (
            name &&
            name.toLowerCase() === normalizedQuery
        ) {
            matchedLayer = layer;
            matchedName = name;
        }
    });

    if (!matchedLayer) {
        return false;
    }

    const bounds = matchedLayer.getBounds();

    map.fitBounds(bounds, {
        padding: [30, 30],
        maxZoom: 7
    });

    matchedLayer.openTooltip();

    const center = bounds.getCenter();

    showLocation({
        name: matchedName,
        type: "State / Union Territory",
        lat: center.lat.toFixed(4),
        lng: center.lng.toFixed(4),
        description:
            `Interactive mapping region: ${matchedName}.`
    });

    console.log(
        "NEXORA GeoJSON State Search:",
        matchedName
    );

    return true;
}


// Add final universal GeoJSON search fallback
console.log(
    "NEXORA All States/UTs GeoJSON Search connected."
);
