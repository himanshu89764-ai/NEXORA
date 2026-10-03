
/* NEXORA_FAST_RELIABLE_SHARE_V1 */
(function(){
const reliableDomains=["gov.in","nic.in","ac.in","edu.in","upsc.gov.in","nta.ac.in","ncert.nic.in","cbse.gov.in","isro.gov.in","who.int","un.org","worldbank.org","imf.org","oecd.org"];
window.NEXORA_RELIABLE_DOMAINS=reliableDomains;
window.nexoraSourceIsReliable=function(url){try{const h=new URL(url).hostname.toLowerCase();return reliableDomains.some(d=>h===d||h.endsWith("."+d));}catch(e){return false;}};
window.nexoraShare=function(){const u=location.origin+location.pathname+"?ref=nexora-share";if(navigator.share){navigator.share({title:"NEXORA",text:"Try NEXORA",url:u}).catch(function(){});}else if(navigator.clipboard){navigator.clipboard.writeText(u).then(function(){alert("NEXORA link copied");});}else{prompt("Copy NEXORA link",u);}};
window.addEventListener("DOMContentLoaded",function(){if(document.getElementById("nexoraShareButton"))return;var b=document.createElement("button");b.id="nexoraShareButton";b.type="button";b.textContent="Share NEXORA";b.onclick=window.nexoraShare;b.setAttribute("aria-label","Share NEXORA");b.style.cssText="position:fixed;right:14px;bottom:14px;z-index:99999;border:0;border-radius:999px;padding:10px 16px;font-weight:700;cursor:pointer";document.body.appendChild(b);});
})();

/* NEXORA UNIVERSAL AUTHENTIC MASTER FETCH BRIDGE V1 */
(function(){
  if(window.__NEXORA_UNIVERSAL_AUTHENTIC_MASTER__) return;
  window.__NEXORA_UNIVERSAL_AUTHENTIC_MASTER__=true;
  const originalFetch=window.fetch.bind(window);
  window.fetch=function(input,init){
    try{
      const u=typeof input==="string"?input:(input&&input.url)||"";
      if(u.includes("/api/pyq/final-online")||u.includes("/api/pyq/final-geography")||u.includes("/api/pyq/geography-authentic")){
        const x=new URL(u,location.origin);
        const exam=x.searchParams.get("exam")||"";
        const subject=x.searchParams.get("subject")||"";
        const year=x.searchParams.get("year")||"";
        const target=new URL("/api/pyq/universal-authentic-master",location.origin);
        if(exam) target.searchParams.set("exam",exam);
        if(subject) target.searchParams.set("subject",subject);
        if(year) target.searchParams.set("year",year);
        return originalFetch(target.toString(),init);
      }
    }catch(e){}
    return originalFetch(input,init);
  };
  console.log("NEXORA UNIVERSAL AUTHENTIC MASTER FETCH BRIDGE V1: ACTIVE");
})();


/* NEXORA FINAL ONLINE GEOGRAPHY FETCH BRIDGE V1 */
(function(){
  if(window.__NEXORA_FINAL_GEO_BRIDGE__) return;
  window.__NEXORA_FINAL_GEO_BRIDGE__=true;
  const originalFetch=window.fetch;
  window.fetch=function(input,init){
    let u=typeof input==="string" ? input : (input&&input.url)||"";
    try{
      const x=new URL(u,window.location.origin);
      const subject=(x.searchParams.get("subject")||"").toLowerCase();
      const exam=(x.searchParams.get("exam")||"").toLowerCase();
      if(
        x.pathname.includes("/api/pyq/final-online") &&
        subject.includes("geography") &&
        (exam.includes("upsc") || exam==="")
      ){
        x.pathname="/api/pyq/final-geography";
        u=x.toString();
        if(typeof input==="string") input=u;
        else input=new Request(u,input);
      }
    }catch(e){}
    return originalFetch.call(this,input,init);
  };
})();


/* NEXORA UNIVERSAL CURATED FRONTEND */
window.NEXORA_UNIVERSAL_CURATED_FRONTEND = {
  exams: [
    "UPSC","SSC","Banking","Railway","Defence","Teaching",
    "JEE","NEET","CUET","UGC-NET","State PSC","State Exams",
    "Police","Law","Management","Agriculture","School Exam",
    "College / University","Other"
  ],
  languages: ["English","Hindi"]
};


// =================================
// DOM ELEMENTS

// =================================

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const answerTitle =
    document.getElementById("answerTitle");

const answerText =
    document.getElementById("answerText");

const answerDetails =
    document.getElementById("answerDetails");

const officialSource =
    document.getElementById("officialSource");

const officialDescription =
    document.getElementById("officialDescription");

const researchSource =
    document.getElementById("researchSource");

const researchDescription =
    document.getElementById("researchDescription");

const actionTitle =
    document.getElementById("actionTitle");

const actionDescription =
    document.getElementById("actionDescription");

const roadmapButton =
    document.getElementById("roadmapButton");

const verifySourcesButton =
    document.getElementById("verifySourcesButton");



// =================================
// NEXORA USER

// =================================

function getNexoraUserId() {

    const userId =
        localStorage.getItem("nexoraUserId");

    return userId || null;
}



// =================================
// SEARCH BUTTON

// =================================

if (searchButton) {
    searchButton.addEventListener(
        "click",
        performSearch
    );
}



// =================================
// ENTER KEY SEARCH

// =================================

if (searchInput) {
    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                performSearch();

            }

        }
    );
}



// =================================
// MAIN SEARCH

// =================================

async function performSearch() {

    const query =
        searchInput.value.trim();

    /* =========================================================
       NEXORA DIRECT WEBSITE INSIDE PERFORMSEARCH FINAL
       Runs BEFORE AI / WEB SEARCH
       ========================================================= */
    const directWebsiteMap = [
        ["sarkari result", "https://www.sarkariresult.com/"],
        ["sarkariresult", "https://www.sarkariresult.com/"],
        ["flipkart", "https://www.flipkart.com/"],
        ["amazon india", "https://www.amazon.in/"],
        ["amazon", "https://www.amazon.in/"],
        ["youtube", "https://www.youtube.com/"],
        ["google", "https://www.google.com/"],
        ["facebook", "https://www.facebook.com/"],
        ["instagram", "https://www.instagram.com/"],
        ["wikipedia", "https://www.wikipedia.org/"],
        ["linkedin", "https://www.linkedin.com/"],
        ["github", "https://github.com/"],
        ["gmail", "https://mail.google.com/"],
        ["whatsapp", "https://web.whatsapp.com/"]
    ];

    const directQuery = query
        .toLowerCase()
        .replace(/\\s+/g, " ")
        .replace(/[?!.,]+$/, "")
        .trim();

    let directWebsite = null;

    for (const [name, url] of directWebsiteMap) {

        if (directQuery === name) {
            directWebsite = url;
            break;
        }

        const remainder =
            directQuery.slice(name.length).trim();

        if (
            remainder &&
            (
                /^20\\d{2}$/.test(remainder) ||
                /^(website|official|site|login|app|india)$/.test(remainder)
            )
        ) {
            directWebsite = url;
            break;
        }
    }

    if (directWebsite) {

        console.log(
            "NEXORA DIRECT WEBSITE INSIDE PERFORMSEARCH FINAL:",
            query,
            "=>",
            directWebsite
        );

        window.location.assign(directWebsite);

        return;
    }

    if (query === "") {

        alert("Please enter a question.");

        return;

    }


    // Save local history

    saveSearchHistory(query);

    // Always show the exact question searched by the user
    answerTitle.textContent = query;


    // Loading

    answerTitle.textContent =
        "NEXORA is searching...";

    answerText.textContent =
        "Searching the web and processing your question...";

    answerDetails.textContent =
        "Connecting to NEXORA AI and Tavily Web Search.";


    // Run AI + Search

    


await Promise.all([

    askNexoraBackend(query),

    searchWeb(query),

    searchBestVideo(query)

]);

}



// =================================
// ASK NEXORA

// =================================

async function askNexoraBackend(question) {

    try {

        const userId =
            getNexoraUserId();


        const response =
            await fetch(
                (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://nexora-o8wi.onrender.com") + "/api/ask",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        question: question,

                        userId: userId

                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(

                data.message ||

                "AI request failed"

            );

        }



        // =================================
        // AI ANSWER

        // =================================

        answerTitle.textContent =
            question;

        answerText.textContent =
            data.answer ||

            "NEXORA could not generate an answer.";

        answerDetails.textContent =
            "Answer generated by NEXORA Local AI using " +

            data.model;



        // =================================
        // ACTION

        // =================================

        actionTitle.textContent =
            "What can you do with this information?";

        actionDescription.textContent =
            "NEXORA can help you research this topic, " +

            "verify sources and create a learning roadmap.";


    } catch (error) {

        console.error(
            "NEXORA AI Error:",
            error
        );


        answerTitle.textContent =
            question;

        answerText.textContent =
            "NEXORA AI could not process the answer.\n\nPlease try again or check the NEXORA backend logs."; 

    }

}


// =================================
// BEST VIDEO SEARCH

// =================================

async function searchBestVideo(query) {

    try {

        const baseUrl =
            (window.location.hostname === "localhost" ||
             window.location.hostname === "127.0.0.1")
                ? "http://localhost:5001"
                : "https://nexora-o8wi.onrender.com";

        const response =
            await fetch(
                baseUrl +
                "/api/video?q=" +
                encodeURIComponent(query)
            );

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Video search failed"
            );

        }

        console.log(
            "NEXORA Best Video:",
            data.video
        );

        if (data.video) {

            displayBestVideo(
                data.video
            );

        }

    } catch (error) {

        console.error(
            "NEXORA Video Search Error:",
            error
        );

    }

}

// =================================
// DISPLAY BEST VIDEO

// =================================

function displayBestVideo(video) {

    const videoSection =
        document.getElementById("bestVideoSection");

    const videoTitle =
        document.getElementById("bestVideoTitle");

    const videoDescription =
        document.getElementById("bestVideoDescription");

    const videoLink =
        document.getElementById("bestVideoLink");


    if (
        !videoSection ||
        !videoTitle ||
        !videoDescription ||
        !videoLink
    ) {

        console.error(
            "Best Video elements not found."
        );

        return;

    }


    videoTitle.textContent =
        video.title ||
        "Best Video";


    videoDescription.textContent =
        video.content
            ? video.content.slice(0, 180)
            : "A relevant video for this topic.";


    videoLink.href =
        video.url || "#";


    videoSection.style.display =
        "block";

}


// ============================================================
// NEXORA IMAGE RESULTS FINAL UI
// Home-screen visual results. Click image -> actions.
// ============================================================

function nexoraImageQueryIntent(query) {
    const q = String(query || "").toLowerCase().trim();

    const terms = [
        "image", "images", "photo", "photos",
        "picture", "pictures", "pic", "pics",
        "wallpaper", "photograph", "visual",
        "फोटो", "तस्वीर", "चित्र", "छवि",
        "दिखाओ"
    ];

    return terms.some(term => q.includes(term));
}

function nexoraImageApiBase() {
    return (
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
    )
        ? "http://localhost:5001"
        : "https://nexora-o8wi.onrender.com";
}

function nexoraEnsureImageStyles() {
    if (document.getElementById("nexoraImageStylesFinal")) return;

    const style = document.createElement("style");
    style.id = "nexoraImageStylesFinal";

    style.textContent = `
        #nexoraImageResultsFinal {
            width: min(1180px, calc(100% - 32px));
            margin: 22px auto;
            padding: 18px;
            border-radius: 20px;
            background: rgba(255,255,255,.98);
            box-shadow: 0 8px 30px rgba(0,0,0,.10);
            box-sizing: border-box;
        }

        #nexoraImageResultsFinal .nexora-image-title {
            font-size: 22px;
            font-weight: 800;
            margin-bottom: 15px;
        }

        #nexoraImageGridFinal {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
            gap: 14px;
        }

        .nexora-image-card-final {
            border: 0;
            padding: 0;
            margin: 0;
            background: #fff;
            border-radius: 16px;
            overflow: hidden;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0,0,0,.12);
            transition: transform .18s ease, box-shadow .18s ease;
            text-align: left;
        }

        .nexora-image-card-final:hover {
            transform: translateY(-3px);
            box-shadow: 0 9px 25px rgba(0,0,0,.18);
        }

        .nexora-image-card-final img {
            display: block;
            width: 100%;
            height: 190px;
            object-fit: cover;
            background: #f1f1f1;
        }

        .nexora-image-card-final .nexora-image-desc {
            padding: 10px 12px;
            font-size: 13px;
            line-height: 1.4;
            color: #444;
        }

        #nexoraImageModalFinal {
            position: fixed;
            inset: 0;
            z-index: 2147483647;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: rgba(0,0,0,.82);
            box-sizing: border-box;
        }

        #nexoraImageModalFinal.nexora-open {
            display: flex;
        }

        #nexoraImageModalBoxFinal {
            width: min(1000px, 96vw);
            max-height: 94vh;
            overflow: auto;
            border-radius: 18px;
            background: #fff;
            padding: 14px;
            box-sizing: border-box;
        }

        #nexoraImageModalPreviewFinal {
            display: block;
            width: 100%;
            max-height: 72vh;
            object-fit: contain;
            border-radius: 12px;
            background: #111;
        }

        #nexoraImageModalActionsFinal {
            display: flex;
            flex-wrap: wrap;
            gap: 9px;
            margin-top: 12px;
        }

        #nexoraImageModalActionsFinal button,
        #nexoraImageModalActionsFinal a {
            border: 0;
            border-radius: 10px;
            padding: 10px 15px;
            cursor: pointer;
            text-decoration: none;
            font-weight: 700;
            background: #111827;
            color: #fff;
            font-size: 14px;
        }

        #nexoraImageCloseFinal {
            margin-left: auto;
            background: #dc2626 !important;
        }

        @media(max-width:600px) {
            #nexoraImageResultsFinal {
                width: calc(100% - 18px);
                padding: 12px;
                margin: 14px auto;
            }

            #nexoraImageGridFinal {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 9px;
            }

            .nexora-image-card-final img {
                height: 145px;
            }
        }
    `;

    document.head.appendChild(style);
}

function nexoraEnsureImageModalFinal() {
    if (document.getElementById("nexoraImageModalFinal")) return;

    const modal = document.createElement("div");
    modal.id = "nexoraImageModalFinal";

    modal.innerHTML = `
        <div id="nexoraImageModalBoxFinal">
            <img id="nexoraImageModalPreviewFinal" alt="NEXORA image">

            <div id="nexoraImageModalActionsFinal">
                <button id="nexoraImageDownloadFinal" type="button">Download</button>
                <button id="nexoraImageShareFinal" type="button">Share</button>
                <a id="nexoraImageOpenFinal" href="#" target="_blank" rel="noopener noreferrer">
                    Open Image
                </a>
                <button id="nexoraImageCloseFinal" type="button">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const close = () => {
        modal.classList.remove("nexora-open");
    };

    document.getElementById("nexoraImageCloseFinal")
        .addEventListener("click", close);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) close();
    });

    document.getElementById("nexoraImageDownloadFinal")
        .addEventListener("click", async () => {
            const url = modal.dataset.imageUrl || "";
            if (!url) return;

            try {
                const response = await fetch(url, {
                    mode: "cors"
                });

                if (!response.ok) throw new Error("download failed");

                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = objectUrl;
                a.download = "NEXORA-image.jpg";
                document.body.appendChild(a);
                a.click();
                a.remove();

                setTimeout(() => URL.revokeObjectURL(objectUrl), 3000);

            } catch (error) {
                // Cross-origin sites may block direct blob download.
                // Fallback opens the original image safely.
                window.open(url, "_blank", "noopener,noreferrer");
            }
        });

    document.getElementById("nexoraImageShareFinal")
        .addEventListener("click", async () => {
            const url = modal.dataset.imageUrl || "";
            if (!url) return;

            try {
                if (navigator.share) {
                    await navigator.share({
                        title: "NEXORA Image",
                        text: "Image from NEXORA",
                        url
                    });
                } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    alert("Image link copied.");
                } else {
                    window.open(url, "_blank", "noopener,noreferrer");
                }
            } catch (error) {
                // User cancelled share; no NEXORA error.
            }
        });
}

function nexoraOpenImageFinal(url, description) {
    nexoraEnsureImageModalFinal();

    const modal = document.getElementById("nexoraImageModalFinal");
    const preview = document.getElementById("nexoraImageModalPreviewFinal");
    const open = document.getElementById("nexoraImageOpenFinal");

    modal.dataset.imageUrl = url;

    preview.src = url;
    preview.alt = description || "NEXORA image";

    open.href = url;

    modal.classList.add("nexora-open");
}

function nexoraRenderImageResults(images, query) {
    nexoraEnsureImageStyles();
    nexoraEnsureImageModalFinal();

    let panel = document.getElementById("nexoraImageResultsFinal");

    if (!panel) {
        panel = document.createElement("section");
        panel.id = "nexoraImageResultsFinal";

        // Keep image results on the main/home screen,
        // independent of the existing Sources section.
        const anchor =
            document.querySelector("#searchResults") ||
            document.querySelector("#results") ||
            document.querySelector("main") ||
            document.body;

        if (anchor === document.body) {
            document.body.insertBefore(panel, document.body.firstChild);
        } else {
            anchor.prepend(panel);
        }
    }

    panel.innerHTML = "";

    if (!nexoraImageQueryIntent(query) || !Array.isArray(images) || !images.length) {
        panel.style.display = "none";
        return;
    }

    panel.style.display = "block";

    const title = document.createElement("div");
    title.className = "nexora-image-title";
    title.textContent = "Images for: " + String(query || "").trim();

    const grid = document.createElement("div");
    grid.id = "nexoraImageGridFinal";

    images
        .map((item) => {
            if (typeof item === "string") {
                return { url: item, description: "" };
            }

            return {
                url: String(item?.url || ""),
                description: String(item?.description || "")
            };
        })
        .filter((item) => /^https?:\/\//i.test(item.url))
        .slice(0, 6)
        .forEach((item) => {
            const card = document.createElement("button");
            card.type = "button";
            card.className = "nexora-image-card-final";

            const img = document.createElement("img");
            img.loading = "lazy";
            img.src = item.url;
            img.alt = item.description || "NEXORA image";

            const desc = document.createElement("div");
            desc.className = "nexora-image-desc";
            desc.textContent =
                item.description || "Click image for Download / Share";

            card.appendChild(img);
            card.appendChild(desc);

            card.addEventListener("click", () => {
                nexoraOpenImageFinal(item.url, item.description);
            });

            grid.appendChild(card);
        });

    panel.appendChild(title);
    panel.appendChild(grid);
}


// =================================
// TAVILY WEB SEARCH

// =================================

async function searchWeb(query) {

    try {

        const userId =
            getNexoraUserId();


        const response =
            await fetch(

                (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5001"
    : "https://nexora-o8wi.onrender.com") + "/api/search?q=" +

                encodeURIComponent(query) +

                "&userId=" +

                encodeURIComponent(userId || "")

            );


        const data =
            await response.json();

        // NEXORA DIRECT WEBSITE RESPONSE AUTHORITY
        if (data && data.directWebsite && data.url) {
            console.log("NEXORA DIRECT WEBSITE:", data.url);
            window.location.replace(data.url);
            return;
        }


        if (!response.ok || !data.success) {

            throw new Error(

                data.message ||

                "Web search failed"

            );

        }


        console.log(
            "Tavily Results:",
            data.sources
        );

        // ============================================================
        // NEXORA IMAGE QUERY AI ANSWER ISOLATION
        // Image requests must render visual gallery, not web-result
        // text inside the AI Answer. Normal searches remain unchanged.
        // ============================================================
        if (nexoraImageQueryIntent(query)) {
            data.sources = [];
            console.log(
                "NEXORA IMAGE AI SOURCE TEXT: DISABLED"
            );
        }

        // ============================================================
        // NEXORA IMAGE SEARCH - ONLY WHEN USER REQUESTS A PICTURE
        // Existing Sources flow remains untouched.
        // ============================================================
        if (nexoraImageQueryIntent(query)) {
            try {
                const imageResponse = await fetch(
                    nexoraImageApiBase() +
                    "/api/image-search?q=" +
                    encodeURIComponent(query)
                );

                const imageData = await imageResponse.json();

                nexoraRenderImageResults(
                    imageData?.images || [],
                    query
                );

            } catch (imageError) {
                console.warn(
                    "NEXORA IMAGE SEARCH OPTIONAL FAILURE:",
                    imageError?.message || imageError
                );

                nexoraRenderImageResults([], query);
            }
        } else {
            nexoraRenderImageResults([], query);
        }



        // Display sources

        // ============================================================
        // NEXORA IMAGE RESULTS: KEEP OUT OF SOURCES
        // ============================================================
        if (nexoraImageQueryIntent(query)) {
            const sourceCandidates = [
                "#sources",
                ".sources",
                "#sourceSection",
                ".source-section",
                "#sourcesSection",
                ".sources-section"
            ];

            sourceCandidates.forEach((selector) => {
                document.querySelectorAll(selector).forEach((el) => {
                    el.innerHTML = "";
                    el.style.display = "none";
                });
            });

            console.log(
                "NEXORA IMAGE SOURCE ISOLATION: ACTIVE"
            );
        } else {
            displaySources(
                data.sources || []
            );
        }


    } catch (error) {

        console.error(
            "NEXORA Web Search Error:",
            error
        );


        showSourceError();

    }

}



// =================================
// DISPLAY SOURCES

// =================================

function displaySources(sources) {

    if (
        !sources ||
        sources.length === 0
    ) {

        officialSource.textContent =
            "No sources found";

        officialDescription.textContent =
            "NEXORA could not find web sources for this search.";

        researchSource.textContent =
            "No research sources";

        researchDescription.textContent =
            "Try a different search query.";

        return;

    }



    // =================================
    // FIRST SOURCE

    // =================================

    const first =
        sources[0];


    officialSource.textContent =
        first.title ||

        "Web Source";


    officialDescription.textContent =
        first.content ||

        first.url ||

        "No description available.";


    makeSourceClickable(
        officialSource,
        first.url
    );



    // =================================
    // SECOND SOURCE

    // =================================

    if (sources.length > 1) {

        const second =
            sources[1];


        researchSource.textContent =
            second.title ||

            "Research Source";


        researchDescription.textContent =
            second.content ||

            second.url ||

            "No description available.";


        makeSourceClickable(
            researchSource,
            second.url
        );

    }


    // Remaining sources

    addAdditionalSources(
        sources.slice(2)
    );

}



// =================================
// CLICKABLE SOURCE

// =================================

function makeSourceClickable(
    element,
    url
) {

    if (!url) {

        return;

    }


    element.style.cursor =
        "pointer";


    element.title =
        "Open source";


    element.onclick =
        function () {

            window.open(

                url,

                "_blank",

                "noopener,noreferrer"

            );

        };

}



// =================================
// ADDITIONAL SOURCES

// =================================

function addAdditionalSources(sources) {

    const sourcesSection =
        document.querySelector(
            ".sources-section"
        );


    if (!sourcesSection) {

        return;

    }


    // Remove old cards

    document
        .querySelectorAll(
            ".nexora-extra-source"
        )
        .forEach(
            card => card.remove()
        );


    sources.forEach(
        function (source) {

            const card =
                document.createElement("div");


            card.className =
                "source-card nexora-extra-source";


            const container =
                document.createElement("div");


            const type =
                document.createElement("span");


            type.className =
                "source-type";


            type.textContent =
                source.sourceType ||

                "Web Source";


            const title =
                document.createElement("h3");


            title.textContent =
                source.title ||

                "Untitled Source";


            const description =
                document.createElement("p");

            description.textContent =
                "";


            if (source.url) {

                title.style.cursor =
                    "pointer";


                title.title =
                    "Open source";


                title.onclick =
                    function () {

                        window.open(

                            source.url,

                            "_blank",

                            "noopener,noreferrer"

                        );

                    };

            }


            container.appendChild(type);

            container.appendChild(title);

            container.appendChild(description);

            card.appendChild(container);


            sourcesSection.appendChild(card);

        }
    );

}



// =================================
// SOURCE ERROR

// =================================

function showSourceError() {

    officialSource.textContent =
        "Web Search Unavailable";


    officialDescription.textContent =
        "NEXORA could not retrieve live web sources for this search.";


    researchSource.textContent =
        "No Research Sources";


    researchDescription.textContent =
        "The answer can still use NEXORA AI general knowledge.";

}



// =================================
// LEARNING ROADMAP

// =================================

if (roadmapButton) {

    roadmapButton.addEventListener(

        "click",

        function () {

            const topic =
                searchInput.value.trim();


            if (topic === "") {

                alert(
                    "Please search for a topic first."
                );

                return;

            }


            window.location.href =
                "roadmap.html?topic=" +

                encodeURIComponent(topic);

        }

    );

}



// =================================
// VERIFY SOURCES

// =================================

if (verifySourcesButton) {

    verifySourcesButton.addEventListener(

        "click",

        function () {

            const topic =
                searchInput.value.trim();


            if (topic === "") {

                alert(
                    "Please search for a topic first."
                );

                return;

            }


            window.location.href =
                "verify.html?topic=" +

                encodeURIComponent(topic);

        }

    );

}



// =================================
// LOCAL SEARCH HISTORY

// =================================

function saveSearchHistory(query) {

    let history =
        JSON.parse(

            localStorage.getItem(
                "nexoraSearchHistory"
            )

        ) || [];


    history.unshift(query);


    history =
        history.slice(0, 10);


    localStorage.setItem(

        "nexoraSearchHistory",

        JSON.stringify(history)

    );


    localStorage.setItem(

        "nexoraSearchCount",

        history.length

    );

}



// =================================
// DEBUG USER

// =================================

console.log(
    "NEXORA User ID:",
    getNexoraUserId()
);


// =================================
// =================================
// NEXORA SHORT NOTES
// =================================

const shortNotesClass =
    document.getElementById("shortNotesClass");

const shortNotesSubject =
    document.getElementById("shortNotesSubject");

const shortNotesBook =
    document.getElementById("shortNotesBook");

const shortNotesChapter =
    document.getElementById("shortNotesChapter");

const shortNotesExam =
    document.getElementById("shortNotesExam");

const shortNotesLanguage =
    document.getElementById("shortNotesLanguage");

const shortNotesMode =
    document.getElementById("shortNotesMode");

const shortNotesButton =
    document.getElementById("shortNotesButton");

const shortNotesStatus =
    document.getElementById("shortNotesStatus");

const shortNotesCustomFields =
    document.getElementById("shortNotesCustomFields");

const shortNotesCustomBook =
    document.getElementById("shortNotesCustomBook");

const shortNotesCustomChapter =
    document.getElementById("shortNotesCustomChapter");

let shortNotesManifest = {};

function normalizeShortNotesValue(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");
}

function examMatchesBook(book, exam) {
  const e = normalizeShortNotesValue(exam);
  if (!e) return true;

  const text = normalizeShortNotesValue([
    book?.title,
    book?.name,
    book?.bookTitle,
    book?.subject,
    book?.author,
    book?.category
  ].filter(Boolean).join(" "));

  /*
   * NEXORA EXAM -> BOOK DOMAIN GUARD
   * Keep the universal catalogue intact, but never show
   * clearly unrelated books for a selected entrance exam.
   */
  if (e.includes("neet")) {
    return (
      /biology|botany|zoology|human physiology|life science/.test(text) ||
      /chemistry|organic chemistry|inorganic chemistry|physical chemistry/.test(text) ||
      /physics|mechanics|thermodynamics|electrodynamics|optics/.test(text)
    );
  }

  if (e.includes("jee")) {
    return (
      /physics|mechanics|thermodynamics|electrodynamics|optics/.test(text) ||
      /chemistry|organic chemistry|inorganic chemistry|physical chemistry/.test(text) ||
      /mathematics|maths|algebra|calculus|coordinate geometry/.test(text)
    );
  }

  /*
   * For other exams, preserve existing universal behaviour.
   */
  return true;
}

function getShortNotesClassData() {
    const classKey =
        shortNotesClass?.value || "";

    const manifestKey =
        classKey
            .toLowerCase()
            .replace(/\s+/g, "");

    return (
        shortNotesManifest[classKey] ||
        shortNotesManifest[manifestKey] ||
        null
    );
}


/* ============================================================
   NEXORA_STANDARD_BOOK_FILTER_V5

   Standard books are exam/reference books and therefore
   can be available for Classes 6-12.

   NCERT remains class-specific.
   ============================================================ */

function nexoraIsStandardBook(book) {
    return !!(
        book &&
        (
            book.standardReference === true ||
            book.sourceType === "standard_reference"
        )
    );
}

function nexoraBookHasUsableChapters(book) {
    return !!(
        book &&
        Array.isArray(book.chapters) &&
        book.chapters.length > 0
    );
}


/* NEXORA UNIVERSAL SUBJECT NORMALIZER V1 */
function nexoraNormalizeShortNotesSubjectName(value){const raw=String(value||"").trim();const key=raw.toLowerCase().replace(/[\s_\-]+/g,"");const aliases={math:"Mathematics",maths:"Mathematics",mathematics:"Mathematics","गणित":"Mathematics",hindi:"Hindi",english:"English",science:"Science"};return aliases[key]||raw;}
function getShortNotesSubjectData() {
    const classData =
        getShortNotesClassData();

    const subjectKey =
        shortNotesSubject?.value || "";

    if (
        !classData ||
        !classData.subjects
    ) {
        return null;
    }

    return (
        classData.subjects[subjectKey] ||
        classData.subjects[
            subjectKey.toLowerCase()
        ] ||
        null
    );
}

function getExamFilteredBooks() {
  // UNIVERSAL:
  // All manifest books remain available for every exam.
  // The selected exam controls note style, difficulty,
  // MCQ/Mains adaptation, not book visibility.
  try {
    const books = Array.isArray(window.shortNotesBooks)
      ? window.shortNotesBooks
      : (Array.isArray(window.shortNotesManifestBooks)
          ? window.shortNotesManifestBooks
          : []);

    return books.slice();
  } catch (e) {
    console.warn("Universal book list fallback:", e);
    return [];
  }
}

async function loadShortNotesManifest() {
    try {
        const response =
            await fetch(
                "/api/short-notes/manifest"
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.message ||
                "Manifest error"
            );
        }

        shortNotesManifest =
            data.manifest || {};

        populateShortNotesBooks();

    } catch (error) {
        console.error(
            "NEXORA Short Notes Manifest Error:",
            error
        );

        if (shortNotesStatus) {
            shortNotesStatus.textContent =
                "Unable to load books.";
        }
    }
}





async function populateShortNotesBooks() {
    // FINAL BOOK RESET GUARD
    // Preserve an already-selected real book.
    if (shortNotesBook && shortNotesBook.value) {
        console.log("NEXORA BOOK RESET GUARD: preserving selected book");
        return;
    }

    if (!shortNotesBook) return;

    shortNotesBook.innerHTML =
        '<option value="">Select Book</option>';

    shortNotesChapter.innerHTML =
        '<option value="">Select Chapter</option>';

    shortNotesChapter.disabled = true;

    const subjectData = getShortNotesSubjectData();

    if (!subjectData) {
        console.warn("NEXORA: No subject catalogue found");
        return;
    }

    const books = [];

    // Direct NCERT book
    if (
        subjectData.titleEn ||
        subjectData.title ||
        subjectData.name
    ) {
        books.push({
            id: subjectData.id || "",
            titleEn:
                subjectData.titleEn ||
                subjectData.title ||
                subjectData.name,
            titleHi:
                subjectData.titleHi ||
                subjectData.titleEn ||
                subjectData.title ||
                subjectData.name,
            author: "NCERT",
            chapters:
                subjectData.chapters ||
                subjectData.chapterList ||
                []
        });
    }

    // Standard/reference books
    if (Array.isArray(subjectData.books)) {
        books.push(...subjectData.books);
    } else if (
        subjectData.books &&
        typeof subjectData.books === "object"
    ) {
        books.push(...Object.values(subjectData.books));
    }

    // Deduplicate books
    const seen = new Set();

    books.forEach(book => {
        const id =
            book.id ||
            book.titleEn ||
            book.title ||
            book.name;

        if (!id || seen.has(String(id))) return;

        seen.add(String(id));

        const option = document.createElement("option");
        option.value = String(id);
        option.textContent =
            book.titleEn ||
            book.title ||
            book.name ||
            "Book";

        option.dataset.book = JSON.stringify(book);

        shortNotesBook.appendChild(option);
    });

    shortNotesBook.disabled =
        shortNotesBook.options.length <= 1;

    console.log(
        "NEXORA DIRECT BOOKS:",
        [...shortNotesBook.options]
            .slice(1)
            .map(o => o.textContent)
    );
}


function getUniversalBookAuthor(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.author ||
        book.writer ||
        book.authorName ||
        book.writerName ||
        book.by ||
        ""
    ).trim();
}

function getUniversalBookTitle(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.title ||
        book.bookTitle ||
        book.name ||
        book.book ||
        book.titleEn ||
        book.titleHi ||
        ""
    ).trim();
}

function renderUniversalBookList() {
    const select =
        document.getElementById("shortNotesBook");

    if (!select) return;

    const authorInput =
        document.getElementById("shortNotesAuthor");

    const selectedAuthor =
        String(authorInput?.value || "")
            .trim()
            .toLowerCase();

    const books =
        Array.isArray(window.shortNotesBooks)
            ? window.shortNotesBooks
            : [];

    select.innerHTML = "";

    const first =
        document.createElement("option");

    first.value = "";
    first.textContent =
        selectedAuthor
            ? "Select Book"
            : "Search/select Writer first";

    select.appendChild(first);

    const seen = new Set();

    books.forEach((book, index) => {
        if (!book || typeof book !== "object") {
            return;
        }

        const title =
            getUniversalBookTitle(book);

        if (!title) return;

        const author =
            getUniversalBookAuthor(book);

        if (
            selectedAuthor &&
            author &&
            !author.toLowerCase().includes(selectedAuthor)
        ) {
            return;
        }

        const key =
            title.toLowerCase() +
            "::" +
            author.toLowerCase();

        if (seen.has(key)) return;

        seen.add(key);

        const option =
            document.createElement("option");

        option.value =
            String(
                book.id ??
                book.bookId ??
                book.value ??
                `book-${index}`
            );

        option.textContent =
            author
                ? `${title} — ${author}`
                : title;

        option.dataset.author = author;

        // Store complete book object for chapter routing.
        try {
            option.dataset.bookObject =
                JSON.stringify(book);
        } catch (_) {}

        select.appendChild(option);
    });

    const custom =
        document.createElement("option");

    custom.value = "custom";
    custom.textContent =
        "Custom / Other Book";

    select.appendChild(custom);

    updateShortNotesCustomFields();
}



function populateShortNotesChapters() {
    if (!shortNotesChapter) return;

    shortNotesChapter.innerHTML =
        '<option value="">Select Chapter</option>';

    shortNotesChapter.disabled = true;

    const selectedOption =
        shortNotesBook?.options[
            shortNotesBook.selectedIndex
        ];

    if (!selectedOption || !selectedOption.value) {
        console.log("NEXORA: No book selected");
        return;
    }

    let book = null;

    // --------------------------------------------------------
    // PRIMARY SOURCE:
    // The exact book object stored on the selected option.
    // This prevents NCERT books from being lost when standard
    // books are also attached to the same subject.
    // --------------------------------------------------------
    try {
        if (selectedOption.dataset.book) {
            book = JSON.parse(selectedOption.dataset.book);
        }
    } catch (error) {
        console.warn(
            "NEXORA: Could not parse selected book metadata",
            error
        );
    }

    // --------------------------------------------------------
    // SECONDARY SOURCE:
    // Find exact book from current subject catalogue.
    // --------------------------------------------------------
    if (!book) {
        const subjectData =
            getShortNotesSubjectData();

        if (subjectData) {
            const books = [];

            // Direct NCERT book
            if (
                subjectData.titleEn ||
                subjectData.title ||
                subjectData.name
            ) {
                books.push(subjectData);
            }

            // Standard/reference books
            if (Array.isArray(subjectData.books)) {
                books.push(...subjectData.books);
            } else if (
                subjectData.books &&
                typeof subjectData.books === "object"
            ) {
                books.push(
                    ...Object.values(subjectData.books)
                );
            }

            book = books.find(item =>
                String(
                    item.id ||
                    item.titleEn ||
                    item.title ||
                    item.name ||
                    ""
                ) === String(selectedOption.value)
            );
        }
    }

    if (!book) {
        console.warn(
            "NEXORA: Selected book object not found:",
            selectedOption.value
        );
        return;
    }

    // --------------------------------------------------------
    // ONLY VERIFIED CHAPTER ARRAYS
    // --------------------------------------------------------
    let chapters =
        book.chapters ||
        book.chapterList ||
        book.topics ||
        [];

    if (!Array.isArray(chapters)) {
        if (
            chapters &&
            typeof chapters === "object"
        ) {
            chapters = Object.values(chapters);
        } else {
            chapters = [];
        }
    }

    chapters.forEach((chapter, index) => {
        let value = "";
        let label = "";

        if (typeof chapter === "string") {
            value = chapter;
            label = chapter;
        } else if (
            chapter &&
            typeof chapter === "object"
        ) {
            value =
                chapter.id ||
                chapter.slug ||
                chapter.titleEn ||
                chapter.title ||
                chapter.name ||
                "";

            label =
                chapter.titleEn ||
                chapter.title ||
                chapter.name ||
                chapter.titleHi ||
                value;
        }

        if (!value || !label) return;

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent =
            `${index + 1}. ${label}`;

        option.dataset.chapter =
            typeof chapter === "string"
                ? JSON.stringify({
                    title: chapter
                })
                : JSON.stringify(chapter);

        shortNotesChapter.appendChild(option);
    });

    shortNotesChapter.disabled =
        shortNotesChapter.options.length <= 1;

    console.log(
        "NEXORA SELECTED BOOK:",
        selectedOption.textContent
    );

    console.log(
        "NEXORA CHAPTERS LOADED:",
        chapters.length
    );

    console.log(
        "NEXORA CHAPTER LIST:",
        chapters.map(chapter =>
            typeof chapter === "string"
                ? chapter
                : (
                    chapter.titleEn ||
                    chapter.title ||
                    chapter.name ||
                    ""
                )
        )
    );
}


function updateShortNotesCustomFields() {
    if (!shortNotesCustomFields) {
        return;
    }

    const show =
        shortNotesBook?.value === "custom" ||
        shortNotesChapter?.value === "custom";

    shortNotesCustomFields.style.display =
        show ? "block" : "none";
}

/* NEXORA FINAL SUBJECT PRESERVATION GUARD V1
   Exam selection must NOT erase Class or Subject.
   The active Short Notes controller handles the cascade.
*/
function resetAfterExamChange() {
    populateShortNotesBooks();
}

/* Disabled legacy reset listener:
   it previously cleared Class + Subject on Exam change.
*/
if (shortNotesExam) {
    shortNotesExam.addEventListener(
        "change",
        resetAfterExamChange
    );
}

if (shortNotesClass) {
    shortNotesClass.addEventListener(
        "change",
        () => {
            if (shortNotesSubject) {
                shortNotesSubject.value = "";
            }

            populateShortNotesBooks();
        }
    );
}

if (shortNotesSubject) {
    shortNotesSubject.addEventListener(
        "change",
        populateShortNotesBooks
    );
}

if (shortNotesBook) {
    shortNotesBook.addEventListener(
        "change",
        populateShortNotesChapters
    );
}

if (shortNotesChapter) {
    shortNotesChapter.addEventListener(
        "change",
        updateShortNotesCustomFields
    );
}

if (shortNotesButton) {
    shortNotesButton.addEventListener(
        "click",
        async () => {
            const className =
                shortNotesClass?.value.trim() ||
                "";

            let subject =
                shortNotesSubject?.value.trim() ||
                "";

            let bookValue =
                shortNotesBook?.value ||
                "";

            /* ========================================================
               STANDARD BOOK SUBJECT AUTO-RESOLVER
               Subject may be hidden/blank in Standard Book mode.
               Resolve it directly from the selected real book metadata.
               ======================================================== */
            const earlyBookOption =
                shortNotesBook?.selectedOptions?.[0] || null;

            if (!subject && earlyBookOption) {
                const subjectCandidates = [
                    earlyBookOption.dataset?.subject,
                    earlyBookOption.dataset?.bookSubject
                ];

                if (earlyBookOption.dataset?.book) {
                    try {
                        const bookMeta =
                            JSON.parse(earlyBookOption.dataset.book);

                        subjectCandidates.push(
                            bookMeta.subject,
                            bookMeta.subjectName,
                            bookMeta.subjectEn,
                            bookMeta.subjectTitle
                        );
                    } catch (_) {}
                }

                subject =
                    subjectCandidates
                        .map(v => String(v || "").trim())
                        .find(Boolean) ||
                    "";
            }

            let chapterValue =
                shortNotesChapter?.value ||
                "";

            const nexoraBookOption =
                shortNotesBook?.selectedOptions?.[0] || null;

            const selectedChapterOption =
                shortNotesChapter?.selectedOptions?.[0] || null;

            let selectedBookTitle =
                nexoraBookOption?.dataset?.book
                    ? (() => {
                        try {
                            const b = JSON.parse(
                                nexoraBookOption.dataset.book
                            );
                            return String(
                                b.titleEn ||
                                b.title ||
                                b.name ||
                                b.bookTitle ||
                                nexoraBookOption.textContent ||
                                ""
                            ).trim();
                        } catch (_) {
                            return String(
                                nexoraBookOption.textContent || ""
                            ).trim();
                        }
                    })()
                    : String(
                        nexoraBookOption?.textContent || ""
                    ).trim();

            let selectedChapterTitle =
                selectedChapterOption?.dataset?.chapter
                    ? (() => {
                        try {
                            const c = JSON.parse(
                                selectedChapterOption.dataset.chapter
                            );
                            return String(
                                c.titleEn ||
                                c.title ||
                                c.name ||
                                c.titleHi ||
                                selectedChapterOption.textContent ||
                                ""
                            )
                            .replace(/^\s*\d+\.\s*/, "")
                            .trim();
                        } catch (_) {
                            return String(
                                selectedChapterOption.textContent || ""
                            )
                            .replace(/^\s*\d+\.\s*/, "")
                            .trim();
                        }
                    })()
                    : String(
                        selectedChapterOption?.textContent || ""
                    )
                    .replace(/^\s*\d+\.\s*/, "")
                    .trim();

            const examSelect =
                document.getElementById("shortNotesExam");

            const examOption =
                examSelect &&
                examSelect.options &&
                examSelect.selectedIndex >= 0
                    ? examSelect.options[examSelect.selectedIndex]
                    : null;

            const exam =
                String(
                    examSelect?.value ||
                    examOption?.textContent ||
                    ""
                )
                .replace(/\s+/g, " ")
                .trim();

            const language =
                shortNotesLanguage?.value ||
                "english";

            const mode =
                shortNotesMode?.value ||
                "exam";

            const customBook =
                shortNotesCustomBook?.value.trim() ||
                "";

            const customChapter =
                shortNotesCustomChapter?.value.trim() ||
                "";

            const author =
                document.getElementById(
                    "shortNotesAuthor"
                )?.value.trim() || "";

            if (
                !exam ||
                /^select\s+exam$/i.test(exam) ||
                /^please\s+select/i.test(exam)
            ) {
                shortNotesStatus.textContent =
                    "Please select Exam.";
                return;
            }

            const selectedBookEl =
  document.getElementById("shortNotesBook");
const selectedBookOption =
  selectedBookEl &&
  selectedBookEl.options[selectedBookEl.selectedIndex];

/* NEXORA FINAL CLICK-TIME CHAPTER DROPDOWN RE-READ V2 */
const liveChapterEl =
    document.getElementById("shortNotesChapter");

const liveChapterOption =
    liveChapterEl &&
    liveChapterEl.options &&
    liveChapterEl.selectedIndex >= 0
        ? liveChapterEl.options[liveChapterEl.selectedIndex]
        : null;

if (
    liveChapterEl &&
    liveChapterEl.value &&
    liveChapterEl.value !== "custom" &&
    liveChapterEl.value !== "Select Chapter"
) {
    chapterValue = liveChapterEl.value;

    selectedChapterTitle =
        liveChapterOption?.dataset?.title ||
        liveChapterOption?.dataset?.chapterTitle ||
        liveChapterOption?.textContent?.trim() ||
        liveChapterEl.value;
}

const standardBookMode =
  !!(
    selectedBookEl &&
    selectedBookEl.value &&
    (
      selectedBookEl.dataset.standardBookMode === "1" ||
      selectedBookOption?.dataset?.standard === "true" ||
      selectedBookOption?.dataset?.bookType === "standard" ||
      selectedBookOption?.dataset?.nexoraStandard === "true" ||
      selectedBookOption?.dataset?.nexoraRoute === "STANDARD" ||
      selectedBookEl.dataset.nexoraMode === "STANDARD"
    )
  );

if (!className && !standardBookMode) {
  shortNotesStatus.textContent="Please select Class.";
  return;
}

            if (!subject && standardBookMode) {
                subject =
                    selectedBookOption?.dataset?.subject ||
                    selectedBookEl?.dataset?.subject ||
                    selectedBookOption?.dataset?.nexoraSubject ||
                    selectedBookEl?.dataset?.nexoraSubject ||
                    "Other";
            }

            /* NEXORA FINAL SUBJECT AUTHORITY V2 */
            if (!subject) {
                const liveSubjectEl =
                    document.getElementById("shortNotesSubject");

                const liveSubjectOption =
                    liveSubjectEl &&
                    liveSubjectEl.options &&
                    liveSubjectEl.selectedIndex >= 0
                        ? liveSubjectEl.options[liveSubjectEl.selectedIndex]
                        : null;

                const liveBookEl =
                    document.getElementById("shortNotesBook");

                const liveBookOption =
                    liveBookEl &&
                    liveBookEl.options &&
                    liveBookEl.selectedIndex >= 0
                        ? liveBookEl.options[liveBookEl.selectedIndex]
                        : null;

                subject =
                    String(
                        liveSubjectEl?.value ||
                        liveSubjectOption?.dataset?.subject ||
                        liveSubjectOption?.dataset?.nexoraSubject ||
                        liveBookOption?.dataset?.subject ||
                        liveBookOption?.dataset?.nexoraSubject ||
                        liveBookEl?.dataset?.subject ||
                        liveBookEl?.dataset?.nexoraSubject ||
                        ""
                    ).trim();

                /* A real selected book is allowed to carry Subject.
                   This is required for Standard Book flow where Class
                   is intentionally not required. */
                if (!subject && liveBookOption) {
                    const bookText =
                        String(liveBookOption.textContent || "").trim();

                    if (
                        bookText &&
                        !/^select\s+book$/i.test(bookText) &&
                        !/^no\s+book/i.test(bookText)
                    ) {
                        subject = "Other";
                    }
                }
            }

            if (!subject) {
                shortNotesStatus.textContent =
                    "Please select Subject.";
                console.warn(
                    "NEXORA FINAL SUBJECT AUTHORITY V2: Subject missing"
                );
                return;
            }

            if (!bookValue && standardBookMode) {
                const standardBookFallback =
                    selectedBookEl?.value ||
                    selectedBookOption?.value ||
                    selectedBookOption?.dataset?.bookId ||
                    selectedBookOption?.dataset?.id ||
                    selectedBookOption?.dataset?.book ||
                    "";

                if (standardBookFallback) {
                    bookValue = standardBookFallback;
                }
            }

            /*
             * NEXORA FINAL LIVE BOOK GUARD V8
             * Read the currently selected Book directly from the DOM.
             * Do not trust stale bookValue from an earlier cascade.
             */
            const finalLiveBookEl =
                document.getElementById("shortNotesBook");

            const finalLiveBookOption =
                finalLiveBookEl?.selectedOptions?.[0] || null;

            const finalLiveBookValue =
                String(
                    finalLiveBookEl?.value ||
                    finalLiveBookOption?.value ||
                    ""
                ).trim();

            const finalLiveBookText =
                String(
                    finalLiveBookOption?.textContent ||
                    ""
                ).trim();

            const finalLiveBookId =
                String(
                    finalLiveBookOption?.dataset?.bookId ||
                    finalLiveBookOption?.dataset?.id ||
                    ""
                ).trim();

            const finalHasRealBook =
                !!finalLiveBookValue &&
                !/^(select|choose|please\s+select)\s+book$/i.test(
                    finalLiveBookValue
                ) &&
                !/^(select|choose|please\s+select)\s+book$/i.test(
                    finalLiveBookText
                );

            if (finalHasRealBook) {
                bookValue =
                    finalLiveBookValue ||
                    finalLiveBookId ||
                    bookValue ||
                    "";

                selectedBookTitle =
                    String(
                        finalLiveBookOption?.dataset?.bookTitle ||
                        finalLiveBookOption?.dataset?.title ||
                        finalLiveBookText ||
                        selectedBookTitle ||
                        ""
                    ).trim();
            }

            if (!bookValue && !finalHasRealBook) {
                shortNotesStatus.textContent =
                    "Please select Book.";
                return;
            }

            console.log(
                "NEXORA FINAL LIVE BOOK GUARD V8:",
                JSON.stringify({
                    value: bookValue,
                    title: selectedBookTitle,
                    text: finalLiveBookText,
                    id: finalLiveBookId,
                    realBook: finalHasRealBook
                })
            );

            if (
                bookValue === "custom" &&
                !customBook
            ) {
                shortNotesStatus.textContent =
                    "Please enter Book name.";
                return;
            }

            if (!chapterValue) {
                const chapterEl =
                    document.getElementById("shortNotesChapter");

                const chapterOption =
                    chapterEl &&
                    chapterEl.options &&
                    chapterEl.selectedIndex >= 0
                        ? chapterEl.options[chapterEl.selectedIndex]
                        : null;

                const chapterFallback =
                    chapterOption?.value ||
                    chapterOption?.dataset?.chapterId ||
                    chapterOption?.dataset?.id ||
                    chapterOption?.dataset?.chapter ||
                    chapterOption?.dataset?.title ||
                    chapterOption?.textContent?.trim() ||
                    "";

                if (
                    chapterFallback &&
                    chapterFallback !== "Select Chapter"
                ) {
                    chapterValue = chapterFallback;
                }

                if (!chapterValue) {
                    shortNotesStatus.textContent =
                        "Please select Chapter.";
                    return;
                }
            }

            if (
                chapterValue === "custom" &&
                !customChapter
            ) {
                shortNotesStatus.textContent =
                    "Please enter Chapter name.";
                return;
            }

            /*
             * NEXORA LIVE BOOK METADATA BRIDGE V2
             * Always resolve the currently selected book at click time.
             * Never allow placeholder "Select Book" into the API.
             */
            const liveBookOption =
                shortNotesBook?.selectedOptions?.[0] || null;

            let liveBookTitle = "";

            if (bookValue === "custom") {
                liveBookTitle = String(
                    customBook || ""
                ).trim();
            } else if (liveBookOption) {
                try {
                    const rawBook =
                        liveBookOption.dataset?.book || "";

                    if (rawBook) {
                        const parsedBook =
                            JSON.parse(rawBook);

                        liveBookTitle = String(
                            parsedBook.titleEn ||
                            parsedBook.titleHi ||
                            parsedBook.title ||
                            parsedBook.name ||
                            parsedBook.bookTitle ||
                            ""
                        ).trim();
                    }
                } catch (_) {}

                if (!liveBookTitle) {
                    liveBookTitle = String(
                        liveBookOption.dataset?.bookTitle ||
                        liveBookOption.dataset?.title ||
                        liveBookOption.textContent ||
                        ""
                    ).trim();
                }
            }

            /*
             * NEXORA FINAL LIVE BOOK RESOLUTION V6
             * The selected <option> is authoritative at click time.
             * Standard/reference books do not require class.
             * Never reject a valid selected book merely because
             * metadata title is unavailable.
             */
            const liveBookValue = String(
                shortNotesBook?.value || bookValue || ""
            ).trim();

            const liveBookDataTitle = String(
                liveBookOption?.dataset?.bookTitle ||
                liveBookOption?.dataset?.title ||
                liveBookOption?.dataset?.nexoraBookTitle ||
                liveBookOption?.dataset?.titleEn ||
                liveBookOption?.dataset?.titleHi ||
                ""
            ).trim();

            if (
                !liveBookTitle ||
                /^select\s+book$/i.test(liveBookTitle)
            ) {
                liveBookTitle = liveBookDataTitle;
            }

            if (
                !liveBookTitle ||
                /^select\s+book$/i.test(liveBookTitle)
            ) {
                const optionText = String(
                    liveBookOption?.textContent || ""
                ).trim();

                if (
                    optionText &&
                    !/^select\s+book$/i.test(optionText)
                ) {
                    liveBookTitle = optionText;
                }
            }

            if (
                !liveBookTitle ||
                /^select\s+book$/i.test(liveBookTitle)
            ) {
                liveBookTitle = String(
                    selectedBookTitle || ""
                ).trim();
            }

            /*
             * If a real book option is selected, allow the backend
             * catalogue resolver to resolve the title from bookId.
             * Only an actual empty/placeholder selection is rejected.
             */
            const hasRealBookSelection =
                !!liveBookValue &&
                !/^select\s+book$/i.test(liveBookValue) &&
                !/^select\s+book$/i.test(
                    String(liveBookOption?.textContent || "").trim()
                );

            if (
                !liveBookTitle ||
                /^select\s+book$/i.test(liveBookTitle)
            ) {
                if (!hasRealBookSelection) {
                    shortNotesStatus.textContent =
                        "Please select Book.";
                    return;
                }

                liveBookTitle = liveBookValue;
            }

            console.log(
                "NEXORA FINAL LIVE BOOK:",
                JSON.stringify({
                    value: liveBookValue,
                    title: liveBookTitle,
                    text: String(
                        liveBookOption?.textContent || ""
                    ).trim()
                })
            );

            const liveChapterTitle =
                chapterValue === "custom"
                    ? String(customChapter || "").trim()
                    : String(
                        selectedChapterTitle ||
                        selectedChapterOption?.textContent ||
                        chapterValue ||
                        ""
                    ).trim();

            
    /*
     * NEXORA UNIVERSAL BOOK SUBMIT BRIDGE V5
     * Read the LIVE selected option at click time.
     */
    {
        const finalBookOption =
            shortNotesBook &&
            shortNotesBook.selectedOptions &&
            shortNotesBook.selectedOptions.length
                ? shortNotesBook.selectedOptions[0]
                : null;

        if (finalBookOption) {
            const finalBookValue =
                String(
                    finalBookOption.value || ""
                ).trim();

            const finalBookText =
                String(
                    finalBookOption.textContent || ""
                ).trim();

            let finalBookTitle = "";

            try {
                const rawFinalBook =
                    String(
                        finalBookOption.dataset?.book || ""
                    ).trim();

                if (rawFinalBook) {
                    const parsedFinalBook =
                        JSON.parse(rawFinalBook);

                    finalBookTitle =
                        String(
                            parsedFinalBook.titleEn ||
                            parsedFinalBook.titleHi ||
                            parsedFinalBook.title ||
                            parsedFinalBook.name ||
                            parsedFinalBook.bookTitle ||
                            ""
                        ).trim();
                }
            } catch (_) {}

            if (!finalBookTitle) {
                finalBookTitle =
                    String(
                        finalBookOption.dataset?.bookTitle ||
                        finalBookOption.dataset?.title ||
                        finalBookText ||
                        ""
                    ).trim();
            }

            if (
                finalBookValue &&
                !/^(select|choose|please\s+select)\s+book$/i.test(
                    finalBookValue
                )
            ) {
                bookValue = finalBookValue;
            }

            if (
                finalBookTitle &&
                !/^(select|choose|please\s+select)\s+book$/i.test(
                    finalBookTitle
                )
            ) {
                selectedBookTitle = finalBookTitle;
            } else if (
                finalBookText &&
                !/^(select|choose|please\s+select)\s+book$/i.test(
                    finalBookText
                )
            ) {
                selectedBookTitle = finalBookText;
            }
        }
    }

    /* ============================================================
   NEXORA FINAL AUTHORITATIVE SELECTION CONTEXT V1
   DOWNLOAD MUST USE CURRENT DOM SELECTIONS
   NEVER FALL BACK TO UPSC / Other
   ============================================================ */
            const nexoraLiveExamSelect =
                document.getElementById("shortNotesExam");

            const nexoraLiveExamOption =
                nexoraLiveExamSelect &&
                nexoraLiveExamSelect.options &&
                nexoraLiveExamSelect.selectedIndex >= 0
                    ? nexoraLiveExamSelect.options[
                        nexoraLiveExamSelect.selectedIndex
                    ]
                    : null;

            const nexoraLiveExam =
                String(
                    nexoraLiveExamSelect?.value ||
                    nexoraLiveExamOption?.textContent ||
                    ""
                )
                .replace(/\s+/g, " ")
                .trim();

            const nexoraLiveClass =
                String(shortNotesClass?.value || "").trim();

            let nexoraLiveSubject =
                String(shortNotesSubject?.value || "").trim();

            const nexoraLiveBook =
                String(
                    selectedBookTitle ||
                    selectedBookOption?.textContent ||
                    ""
                )
                .replace(/\s+/g, " ")
                .trim();

            const nexoraLiveChapter =
                String(
                    selectedChapterTitle ||
                    selectedChapterOption?.textContent ||
                    ""
                )
                .replace(/^\s*\d+\.\s*/, "")
                .replace(/\s+/g, " ")
                .trim();

            if (
                !nexoraLiveExam ||
                /^select\s+exam$/i.test(nexoraLiveExam) ||
                /^please\s+select/i.test(nexoraLiveExam)
            ) {
                shortNotesStatus.textContent = "Please select Exam.";
                return;
            }

            /* NEXORA FINAL LIVE SUBJECT AUTHORITY V2 */
            if (!nexoraLiveSubject) {
                const liveSubjectEl =
                    document.getElementById("shortNotesSubject");

                const liveSubjectOption =
                    liveSubjectEl &&
                    liveSubjectEl.options &&
                    liveSubjectEl.selectedIndex >= 0
                        ? liveSubjectEl.options[liveSubjectEl.selectedIndex]
                        : null;

                const liveBookEl =
                    document.getElementById("shortNotesBook");

                const liveBookOption =
                    liveBookEl &&
                    liveBookEl.options &&
                    liveBookEl.selectedIndex >= 0
                        ? liveBookEl.options[liveBookEl.selectedIndex]
                        : null;

                nexoraLiveSubject =
                    String(
                        liveSubjectEl?.value ||
                        liveSubjectOption?.dataset?.subject ||
                        liveSubjectOption?.dataset?.nexoraSubject ||
                        liveBookOption?.dataset?.subject ||
                        liveBookOption?.dataset?.nexoraSubject ||
                        liveBookEl?.dataset?.subject ||
                        liveBookEl?.dataset?.nexoraSubject ||
                        ""
                    ).trim();

                if (!nexoraLiveSubject && liveBookOption) {
                    const bookText =
                        String(liveBookOption.textContent || "").trim();

                    if (
                        bookText &&
                        !/^select\s+book$/i.test(bookText) &&
                        !/^no\s+book/i.test(bookText)
                    ) {
                        nexoraLiveSubject = "Other";
                    }
                }
            }

            if (!nexoraLiveSubject) {
                shortNotesStatus.textContent = "Please select Subject.";
                console.warn(
                    "NEXORA FINAL LIVE SUBJECT AUTHORITY V2: Subject missing"
                );
                return;
            }

            if (!nexoraLiveBook) {
                shortNotesStatus.textContent = "Please select Book.";
                return;
            }

            if (!nexoraLiveChapter) {
                shortNotesStatus.textContent = "Please select Chapter.";
                return;
            }

            console.log(
                "NEXORA FINAL AUTHORITATIVE DOWNLOAD CONTEXT:",
                {
                    exam: nexoraLiveExam,
                    className: nexoraLiveClass,
                    subject: nexoraLiveSubject,
                    book: nexoraLiveBook,
                    chapter: nexoraLiveChapter
                }
            );

            const requestBody = {
                className:
                    nexoraLiveClass || className || "",
                subject:
                    nexoraLiveSubject,


                bookId:
                    bookValue === "custom"
                        ? ""
                        : bookValue,

                bookTitle:
                    liveBookTitle,

                selectedBookTitle:
                    liveBookTitle,

                chapter:
                    chapterValue === "custom"
                        ? ""
                        : liveChapterTitle,

                chapterTitle:
                    chapterValue === "custom"
                        ? String(customChapter || "").trim()
                        : liveChapterTitle,

                selectedChapterTitle:
                    chapterValue === "custom"
                        ? String(customChapter || "").trim()
                        : liveChapterTitle,

                exam: nexoraLiveExam,
                language,
                mode
            };

            console.log(
                "NEXORA FINAL SHORT NOTES REQUEST:",
                JSON.stringify(requestBody)
            );

            shortNotesButton.disabled =
                true;

            shortNotesStatus.textContent =
                "Generating Short Notes PDF...";

            try {
                const response =
                    await fetch(
                        "/api/short-notes",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body:
                                JSON.stringify(
                                    requestBody
                                )
                        }
                    );

                if (!response.ok) {
                    let message =
                        "Failed to generate PDF.";

                    try {
                        const data =
                            await response.json();

                        message =
                            data.message ||
                            data.error ||
                            message;
                    } catch (_) {}

                    throw new Error(
                        message
                    );
                }

                const blob =
                    await response.blob();

                const url =
                    window.URL.createObjectURL(
                        blob
                    );

                const oldPreview =
                    document.getElementById(
                        "nexoraNotesPreview"
                    );

                if (oldPreview) {
                    oldPreview.remove();
                }

                const overlay =
                    document.createElement(
                        "div"
                    );

                overlay.id =
                    "nexoraNotesPreview";

                overlay.style.cssText =
                    "position:fixed;inset:0;z-index:999999;" +
                    "background:rgba(0,0,0,.86);" +
                    "display:flex;flex-direction:column;" +
                    "padding:14px;box-sizing:border-box;";

                const toolbar =
                    document.createElement(
                        "div"
                    );

                toolbar.style.cssText =
                    "display:flex;justify-content:flex-end;" +
                    "gap:10px;padding-bottom:10px;";

                const downloadBtn =
                    document.createElement(
                        "button"
                    );

                downloadBtn.type = "button";
                downloadBtn.textContent =
                    "⬇ Download PDF";

                downloadBtn.style.cssText =
                    "padding:11px 18px;border:0;" +
                    "border-radius:9px;cursor:pointer;" +
                    "font-weight:700;";

                downloadBtn.onclick = () => {
                    const link =
                        document.createElement(
                            "a"
                        );

                    link.href = url;

                    link.download =
                        "NEXORA-Short-Notes-" +
                        className.replace(
                            /\s+/g,
                            "-"
                        ) +
                        "-" +
                        language +
                        ".pdf";

                    document.body.appendChild(
                        link
                    );

                    link.click();
                    link.remove();

                    console.log(
                        "NEXORA PREVIEW: MANUAL PDF DOWNLOAD SUCCESS"
                    );
                };

                const closeBtn =
                    document.createElement(
                        "button"
                    );

                closeBtn.type = "button";
                closeBtn.textContent =
                    "✕ Close";

                closeBtn.style.cssText =
                    "padding:11px 18px;border:0;" +
                    "border-radius:9px;cursor:pointer;" +
                    "font-weight:700;";

                closeBtn.onclick = () => {
                    overlay.remove();

                    window.URL.revokeObjectURL(
                        url
                    );
                };

                const frame =
                    document.createElement(
                        "iframe"
                    );

                frame.src = url;

                frame.title =
                    "NEXORA Short Notes PDF Preview";

                frame.style.cssText =
                    "width:100%;flex:1;border:0;" +
                    "border-radius:10px;background:#fff;" +
                    "min-height:0;";

                toolbar.appendChild(
                    downloadBtn
                );

                toolbar.appendChild(
                    closeBtn
                );

                overlay.appendChild(
                    toolbar
                );

                overlay.appendChild(
                    frame
                );

                document.body.appendChild(
                    overlay
                );

                shortNotesStatus.textContent =
                    "PDF generated. Preview opened online.";

                console.log(
                    "NEXORA ONLINE PDF PREVIEW: OPENED"
                );

                shortNotesStatus.textContent =
                    "PDF generated successfully.";

            } catch (error) {
                console.error(
                    "NEXORA Short Notes Error:",
                    error
                );

                shortNotesStatus.textContent =
                    error.message ||
                    "Unable to generate PDF.";

            } finally {
                shortNotesButton.disabled =
                    false;
            }
        }
    );
}

loadShortNotesManifest();

// =================================
// NEXORA PYQ & TEST SERIES

// =================================

const pyqSubject =
    document.getElementById("pyqSubject");

const pyqExam =
    document.getElementById("pyqExam");

const pyqType =
    document.getElementById("pyqType");

const pyqLanguage =
    document.getElementById("pyqLanguage");

const pyqYear =
    document.getElementById("pyqYear");

const pyqTopic =
    document.getElementById("pyqTopic");

const pyqButton =
    document.getElementById("pyqButton");

const testSeriesButton =
    document.getElementById("testSeriesButton");

const pyqTestStatus =
    document.getElementById("pyqTestStatus");


// =================================
// NEXORA GENERIC PYQ SUBJECTS
// =================================

const pyqSubjectsByExam = {
    upsc: [
        ["geography", "Geography"],
        ["polity", "Polity"],
        ["history", "History"],
        ["economy", "Economy"],
        ["environment", "Environment"],
        ["science", "Science & Technology"],
        ["current-affairs", "Current Affairs"]
    ],

    ssc: [
        ["general-awareness", "General Awareness"],
        ["reasoning", "Reasoning"],
        ["quantitative-aptitude", "Quantitative Aptitude"],
        ["english", "English"]
    ],

    jee: [
        ["physics", "Physics"],
        ["chemistry", "Chemistry"],
        ["mathematics", "Mathematics"]
    ],

    neet: [
        ["physics", "Physics"],
        ["chemistry", "Chemistry"],
        ["biology", "Biology"]
    ],

    college: [
        ["computer-science", "Computer Science"],
        ["mathematics", "Mathematics"],
        ["physics", "Physics"],
        ["chemistry", "Chemistry"],
        ["other", "Other"]
    ]
};


function updatePYQSubjects() {

    if (!pyqSubject || !pyqExam) {
        return;
    }

    const exam =
        pyqExam.value || "upsc";

    const subjects =
        pyqSubjectsByExam[exam] ||
        pyqSubjectsByExam.upsc;

    pyqSubject.innerHTML = "";

    subjects.forEach(([value, label]) => {

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent = label;

        pyqSubject.appendChild(option);

    });

}


// Update subjects when exam changes

if (pyqExam) {

    pyqExam.addEventListener(
        "change",
        updatePYQSubjects
    );

}


// =================================
// NEXORA GENERIC PYQ TOPICS
// =================================

const pyqTopicsBySubject = {

    geography: [
        ["", "All Chapters"],
        ["physical-geography", "Physical Geography"],
        ["geomorphology", "Geomorphology"],
        ["earth-interior", "Interior of the Earth"],
        ["plate-tectonics", "Plate Tectonics"],
        ["rocks-minerals", "Rocks & Minerals"],
        ["landforms", "Landforms"],
        ["climatology", "Climatology"],
        ["atmosphere", "Atmosphere"],
        ["solar-radiation", "Solar Radiation & Heat Balance"],
        ["atmospheric-circulation", "Atmospheric Circulation"],
        ["weather-systems", "Weather Systems"],
        ["oceanography", "Oceanography"],
        ["ocean-movements", "Movements of Ocean Water"],
        ["biodiversity", "Biodiversity"],
        ["indian-physiography", "India: Structure & Physiography"],
        ["drainage", "Drainage System"],
        ["indian-climate", "Indian Climate"],
        ["natural-vegetation", "Natural Vegetation"],
        ["soils", "Soils"],
        ["agriculture", "Agriculture"],
        ["minerals", "Mineral Resources"],
        ["industries", "Industries"],
        ["transport", "Transport & Communication"],
        ["population", "Population"],
        ["urbanization", "Urbanization"],
        ["regional-planning", "Regional Planning"],
        ["disasters", "Natural Hazards & Disasters"],
        ["mapping-gis", "Mapping, GIS & Remote Sensing"]
    ],

    polity: [
        ["", "All Chapters"],
        ["constitution", "Constitution"],
        ["making-of-constitution", "Making of the Constitution"],
        ["constitutional-features", "Constitutional Features"],
        ["citizenship", "Citizenship"],
        ["fundamental-rights", "Fundamental Rights"],
        ["dpsp", "Directive Principles"],
        ["fundamental-duties", "Fundamental Duties"],
        ["amendment", "Constitutional Amendments"],
        ["basic-structure", "Basic Structure"],
        ["president", "President"],
        ["vice-president", "Vice-President"],
        ["prime-minister", "Prime Minister & Council of Ministers"],
        ["parliament", "Parliament"],
        ["supreme-court", "Supreme Court"],
        ["high-courts", "High Courts"],
        ["judiciary", "Judiciary"],
        ["federalism", "Federalism"],
        ["centre-state", "Centre-State Relations"],
        ["local-government", "Local Government"],
        ["elections", "Elections"],
        ["constitutional-bodies", "Constitutional Bodies"],
        ["statutory-bodies", "Statutory & Regulatory Bodies"],
        ["emergency", "Emergency Provisions"],
        ["governance", "Governance"]
    ],

    history: [
        ["", "All Chapters"],
        ["prehistory", "Prehistory"],
        ["indus-valley", "Indus Valley Civilization"],
        ["vedic-age", "Vedic Age"],
        ["mahajanapadas", "Mahajanapadas"],
        ["buddhism-jainism", "Buddhism & Jainism"],
        ["maurya", "Mauryan Empire"],
        ["post-maurya", "Post-Mauryan Period"],
        ["gupta", "Gupta Period"],
        ["sangam", "Sangam Age"],
        ["ancient-art-culture", "Ancient Art & Culture"],
        ["delhi-sultanate", "Delhi Sultanate"],
        ["mughal", "Mughal Empire"],
        ["bhakti-sufi", "Bhakti & Sufi Movements"],
        ["regional-kingdoms", "Regional Kingdoms"],
        ["medieval-culture", "Medieval Art & Culture"],
        ["europeans", "Arrival of Europeans"],
        ["british-expansion", "British Expansion"],
        ["constitutional-acts", "Constitutional Acts"],
        ["social-religious-reform", "Social & Religious Reform"],
        ["revolt-1857", "Revolt of 1857"],
        ["nationalism", "Indian Nationalism"],
        ["gandhian-era", "Gandhian Era"],
        ["revolutionary-movement", "Revolutionary Movement"],
        ["independence-partition", "Independence & Partition"],
        ["industrial-revolution", "Industrial Revolution"],
        ["french-revolution", "French Revolution"],
        ["russian-revolution", "Russian Revolution"],
        ["world-wars", "World Wars"],
        ["imperialism", "Imperialism & Colonialism"],
        ["decolonization", "Decolonization"],
        ["cold-war", "Cold War"]
    ],

    economy: [
        ["", "All Chapters"],
        ["basic-concepts", "Basic Economic Concepts"],
        ["national-income", "National Income"],
        ["economic-growth", "Economic Growth"],
        ["economic-development", "Economic Development"],
        ["inflation", "Inflation"],
        ["unemployment", "Unemployment"],
        ["poverty", "Poverty"],
        ["inclusive-growth", "Inclusive Growth"],
        ["fiscal-policy", "Fiscal Policy"],
        ["monetary-policy", "Monetary Policy"],
        ["banking", "Banking"],
        ["financial-markets", "Financial Markets"],
        ["taxation", "Taxation"],
        ["budget", "Union Budget"],
        ["public-finance", "Public Finance"],
        ["external-sector", "External Sector"],
        ["balance-payments", "Balance of Payments"],
        ["exchange-rate", "Exchange Rate"],
        ["agriculture-economy", "Agriculture Economy"],
        ["industry", "Industry"],
        ["infrastructure", "Infrastructure"],
        ["planning", "Planning"],
        ["financial-inclusion", "Financial Inclusion"]
    ],

    environment: [
        ["", "All Chapters"],
        ["ecology", "Ecology"],
        ["ecosystem", "Ecosystem"],
        ["food-chain", "Food Chain & Food Web"],
        ["ecological-cycles", "Biogeochemical Cycles"],
        ["biodiversity", "Biodiversity"],
        ["species", "Species & Endemism"],
        ["conservation", "Biodiversity Conservation"],
        ["protected-areas", "Protected Areas"],
        ["forests", "Forests"],
        ["wetlands", "Wetlands"],
        ["marine-ecosystems", "Marine Ecosystems"],
        ["climate-change", "Climate Change"],
        ["pollution", "Pollution"],
        ["environmental-laws", "Environmental Laws"],
        ["eia", "Environmental Impact Assessment"],
        ["international-conventions", "International Environmental Conventions"],
        ["sustainable-development", "Sustainable Development"]
    ],

    science: [
        ["", "All Chapters"],
        ["physics-basics", "Physics Basics"],
        ["chemistry-basics", "Chemistry Basics"],
        ["biology-basics", "Biology Basics"],
        ["space", "Space Technology"],
        ["astronomy", "Astronomy"],
        ["biotechnology", "Biotechnology"],
        ["genetics", "Genetics"],
        ["health-disease", "Health & Diseases"],
        ["nuclear", "Nuclear Technology"],
        ["energy", "Energy Technology"],
        ["nanotechnology", "Nanotechnology"],
        ["computers", "Computers & Digital Technology"],
        ["artificial-intelligence", "Artificial Intelligence"],
        ["telecommunication", "Telecommunication"],
        ["defence-technology", "Defence Technology"]
    ],

    "current-affairs": [
        ["", "All Chapters"],
        ["national", "National Affairs"],
        ["international", "International Affairs"],
        ["polity-governance", "Polity & Governance"],
        ["economy", "Economy"],
        ["environment", "Environment"],
        ["science-technology", "Science & Technology"],
        ["security", "Internal Security"],
        ["reports-indices", "Reports & Indices"],
        ["international-organizations", "International Organizations"],
        ["places-in-news", "Places in News"],
        ["government-schemes", "Government Schemes"],
        ["awards", "Awards & Honours"]
    ],

    "general-awareness": [
        ["", "All Chapters"],
        ["history", "History"],
        ["geography", "Geography"],
        ["polity", "Indian Polity"],
        ["economy", "Economy"],
        ["general-science", "General Science"],
        ["static-gk", "Static GK"],
        ["current-affairs", "Current Affairs"],
        ["art-culture", "Art & Culture"],
        ["sports", "Sports"]
    ],

    reasoning: [
        ["", "All Chapters"],
        ["analogy", "Analogy"],
        ["classification", "Classification"],
        ["series", "Number & Alphabet Series"],
        ["coding-decoding", "Coding-Decoding"],
        ["blood-relations", "Blood Relations"],
        ["direction-sense", "Direction Sense"],
        ["ranking", "Ranking & Order"],
        ["syllogism", "Syllogism"],
        ["venn-diagram", "Venn Diagram"],
        ["statement-conclusion", "Statement & Conclusion"],
        ["puzzles", "Puzzles"],
        ["seating-arrangement", "Seating Arrangement"],
        ["clock-calendar", "Clock & Calendar"],
        ["non-verbal", "Non-Verbal Reasoning"]
    ],

    "quantitative-aptitude": [
        ["", "All Chapters"],
        ["number-system", "Number System"],
        ["hcf-lcm", "HCF & LCM"],
        ["simplification", "Simplification"],
        ["percentage", "Percentage"],
        ["ratio", "Ratio & Proportion"],
        ["average", "Average"],
        ["profit-loss", "Profit & Loss"],
        ["simple-interest", "Simple Interest"],
        ["compound-interest", "Compound Interest"],
        ["time-work", "Time & Work"],
        ["pipes-cisterns", "Pipes & Cisterns"],
        ["speed-distance", "Speed, Time & Distance"],
        ["boats-streams", "Boats & Streams"],
        ["algebra", "Algebra"],
        ["geometry", "Geometry"],
        ["mensuration", "Mensuration"],
        ["trigonometry", "Trigonometry"],
        ["statistics", "Statistics"],
        ["data-interpretation", "Data Interpretation"]
    ],

    english: [
        ["", "All Chapters"],
        ["parts-of-speech", "Parts of Speech"],
        ["tenses", "Tenses"],
        ["subject-verb", "Subject-Verb Agreement"],
        ["articles", "Articles"],
        ["prepositions", "Prepositions"],
        ["voice", "Active & Passive Voice"],
        ["narration", "Direct & Indirect Speech"],
        ["error-spotting", "Error Spotting"],
        ["sentence-improvement", "Sentence Improvement"],
        ["vocabulary", "Vocabulary"],
        ["synonyms-antonyms", "Synonyms & Antonyms"],
        ["idioms", "Idioms & Phrases"],
        ["one-word", "One Word Substitution"],
        ["cloze-test", "Cloze Test"],
        ["reading-comprehension", "Reading Comprehension"],
        ["para-jumbles", "Para Jumbles"]
    ],

    physics: [
        ["", "All Chapters"],
        ["units-measurements", "Units & Measurements"],
        ["vectors", "Vectors"],
        ["kinematics", "Kinematics"],
        ["laws-of-motion", "Laws of Motion"],
        ["work-energy-power", "Work, Energy & Power"],
        ["rotational-motion", "Rotational Motion"],
        ["gravitation", "Gravitation"],
        ["properties-of-matter", "Properties of Matter"],
        ["thermodynamics", "Thermodynamics"],
        ["kinetic-theory", "Kinetic Theory"],
        ["oscillations", "Oscillations"],
        ["waves", "Waves"],
        ["electrostatics", "Electrostatics"],
        ["capacitance", "Capacitance"],
        ["current-electricity", "Current Electricity"],
        ["magnetism", "Magnetic Effects of Current"],
        ["emi-ac", "Electromagnetic Induction & AC"],
        ["em-waves", "Electromagnetic Waves"],
        ["ray-optics", "Ray Optics"],
        ["wave-optics", "Wave Optics"],
        ["dual-nature", "Dual Nature of Matter"],
        ["atoms-nuclei", "Atoms & Nuclei"],
        ["semiconductors", "Semiconductors"],
        ["experimental-skills", "Experimental Physics"]
    ],

    chemistry: [
        ["", "All Chapters"],
        ["mole-concept", "Some Basic Concepts / Mole Concept"],
        ["atomic-structure", "Atomic Structure"],
        ["periodicity", "Periodic Classification"],
        ["chemical-bonding", "Chemical Bonding"],
        ["states-of-matter", "States of Matter"],
        ["thermodynamics", "Thermodynamics"],
        ["equilibrium", "Equilibrium"],
        ["redox", "Redox Reactions"],
        ["solutions", "Solutions"],
        ["electrochemistry", "Electrochemistry"],
        ["chemical-kinetics", "Chemical Kinetics"],
        ["surface-chemistry", "Surface Chemistry"],
        ["s-block", "s-Block Elements"],
        ["p-block", "p-Block Elements"],
        ["d-f-block", "d- and f-Block Elements"],
        ["coordination", "Coordination Compounds"],
        ["metallurgy", "Metallurgy"],
        ["organic-basics", "Organic Chemistry Basics"],
        ["hydrocarbons", "Hydrocarbons"],
        ["haloalkanes", "Haloalkanes & Haloarenes"],
        ["alcohols-phenols-ethers", "Alcohols, Phenols & Ethers"],
        ["aldehydes-ketones-acids", "Aldehydes, Ketones & Carboxylic Acids"],
        ["amines", "Amines"],
        ["biomolecules", "Biomolecules"],
        ["polymers", "Polymers"],
        ["practical-chemistry", "Practical Chemistry"]
    ],

    mathematics: [
        ["", "All Chapters"],
        ["sets-relations", "Sets, Relations & Functions"],
        ["complex-numbers", "Complex Numbers"],
        ["quadratic-equations", "Quadratic Equations"],
        ["sequence-series", "Sequences & Series"],
        ["permutations-combinations", "Permutations & Combinations"],
        ["binomial", "Binomial Theorem"],
        ["probability", "Probability & Statistics"],
        ["matrices-determinants", "Matrices & Determinants"],
        ["straight-lines", "Straight Lines"],
        ["circles", "Circles"],
        ["conics", "Conic Sections"],
        ["vectors", "Vector Algebra"],
        ["three-dimensional", "Three Dimensional Geometry"],
        ["limits", "Limits & Continuity"],
        ["differentiation", "Differentiation"],
        ["applications-derivatives", "Applications of Derivatives"],
        ["integration", "Integral Calculus"],
        ["differential-equations", "Differential Equations"],
        ["trigonometry", "Trigonometry"]
    ],

    biology: [
        ["", "All Chapters"],
        ["diversity", "Diversity in Living World"],
        ["plant-anatomy", "Structural Organisation in Plants"],
        ["animal-anatomy", "Structural Organisation in Animals"],
        ["cell-biology", "Cell Structure & Function"],
        ["biomolecules", "Biomolecules"],
        ["plant-physiology", "Plant Physiology"],
        ["human-physiology", "Human Physiology"],
        ["reproduction", "Reproduction"],
        ["genetics", "Genetics & Heredity"],
        ["evolution", "Evolution"],
        ["human-health", "Human Health & Disease"],
        ["biology-welfare", "Biology & Human Welfare"],
        ["biotechnology", "Biotechnology"],
        ["ecology", "Ecology"],
        ["biodiversity", "Biodiversity & Conservation"]
    ],

    "computer-science": [
        ["", "All Chapters"],
        ["programming", "Programming Fundamentals"],
        ["oop", "Object-Oriented Programming"],
        ["data-structures", "Data Structures"],
        ["algorithms", "Algorithms"],
        ["dbms", "Database Management Systems"],
        ["operating-systems", "Operating Systems"],
        ["computer-networks", "Computer Networks"],
        ["computer-architecture", "Computer Architecture"],
        ["software-engineering", "Software Engineering"],
        ["theory-computation", "Theory of Computation"],
        ["compiler-design", "Compiler Design"],
        ["artificial-intelligence", "Artificial Intelligence"],
        ["machine-learning", "Machine Learning"],
        ["web-development", "Web Development"],
        ["cybersecurity", "Cybersecurity"],
        ["cloud-computing", "Cloud Computing"],
        ["distributed-systems", "Distributed Systems"]
    ],

    other: [
        ["", "All Chapters"]
    ]
};

function updatePYQTopics() {

    if (!pyqTopic || !pyqSubject) {
        return;
    }

    let subject =
        pyqSubject.value || "geography";

    const topics =
        pyqTopicsBySubject[subject] ||
        [["", "All Topics"]];

    pyqTopic.innerHTML = "";

    topics.forEach(([value, label]) => {

        const option =
            document.createElement("option");

        option.value = value;
        option.textContent = label;

        pyqTopic.appendChild(option);

    });

}


if (pyqSubject) {

    pyqSubject.addEventListener(
        "change",
        updatePYQTopics
    );

}


// Initial subject + topic list

updatePYQSubjects();
updatePYQTopics();




/* =========================================================
   NEXORA FINAL PYQ OPTION RENDERER
   ONE RENDER PATH ONLY
   ========================================================= */
function nexoraFinalPYQOptions(options) {
    if (!Array.isArray(options)) return [];

    const clean = [];
    const seen = new Set();

    for (const raw of options) {
        let value = String(raw == null ? "" : raw)
            .replace(/^[A-D][\.\):\-]\s*/i, "")
            .trim();

        if (!value) continue;

        const key = value
            .replace(/\s+/g, " ")
            .toLowerCase();

        if (seen.has(key)) continue;

        seen.add(key);
        clean.push(value);

        if (clean.length === 4) break;
    }

    return clean;
}

// =================================
// LOAD PYQs

// =================================


// NEXORA GEOGRAPHY TYPE AUTO V1



async function loadPYQs() {
    try {
        const subjectEl = document.getElementById("pyqSubject");
        const examEl = document.getElementById("pyqExam");
        const typeEl = document.getElementById("pyqType");
        const yearEl = document.getElementById("pyqYear");

        const subjectRaw = subjectEl ? subjectEl.value : "geography";
        const examRaw = examEl ? examEl.value : "upsc";
        const typeRaw = typeEl ? typeEl.value : "prelims";
        const yearRaw = yearEl ? yearEl.value : "all";

        const subjectMap = {
            geography: "Geography",
            polity: "Polity",
            history: "History",
            economy: "Economy",
            environment: "Environment",
            science: "Science & Technology",
            "science-technology": "Science & Technology",
            "science & technology": "Science & Technology",
            current_affairs: "Current Affairs"
        };

        const subject =
            subjectMap[String(subjectRaw || "").toLowerCase()] ||
            subjectRaw ||
            "Geography";

        /*
         * FINAL UNIVERSAL SOURCE
         * Uses the normalized official-source-only dataset.
         * The original 6147-record master remains untouched.
         */
        const response = await fetch(
            "/api/pyq/universal-normalized",
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(
                "NORMALIZED PYQ HTTP " + response.status
            );
        }

        const payload = await response.json();

        let questions = Array.isArray(payload.questions)
            ? payload.questions
            : [];

        const masterTotal = questions.length;

        /* AUTHENTIC SOURCE-ONLY GUARD */
        questions = questions.filter(q =>
            q &&
            q.official_source === true &&
            q.verified_source === true &&
            q.question_verified === true &&
            q.ai_generated !== true &&
            q.fake_pyq !== true &&
            (
                String(q.nexora_type || "").toUpperCase() !== "MCQ" ||
                !window.__NEXORA_PYQ_IS_DISPLAYABLE__ ||
                window.__NEXORA_PYQ_IS_DISPLAYABLE__(q)
            )
        );

        const normalize = value =>
            String(value == null ? "" : value)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "");

        const wantedSubject = normalize(subject);
        const wantedExam = normalize(examRaw);
        const wantedType = normalize(typeRaw);
        const wantedYear = String(yearRaw || "").toLowerCase();

        /* SUBJECT FILTER */
        if (
            wantedSubject &&
            wantedSubject !== "all" &&
            wantedSubject !== "allsubjects"
        ) {
            questions = questions.filter(q => {
                const actualSubject = normalize(q.subject);

                return (
                    actualSubject === wantedSubject ||
                    actualSubject.includes(wantedSubject) ||
                    wantedSubject.includes(actualSubject)
                );
            });
        }

        /* EXAM FILTER */
        if (
            wantedExam &&
            wantedExam !== "all" &&
            wantedExam !== "allexams"
        ) {
            questions = questions.filter(q => {
                const actualExam = normalize(q.exam);

                if (wantedExam.includes("upsc")) {
                    return actualExam.includes("upsc");
                }

                return (
                    actualExam === wantedExam ||
                    actualExam.includes(wantedExam) ||
                    wantedExam.includes(actualExam)
                );
            });
        }

        /*
         * TYPE FILTER
         * Normalized parser:
         * MCQ  -> Prelims
         * MAINS -> Mains
         */
        if (
            wantedType &&
            wantedType !== "all"
        ) {
            questions = questions.filter(q => {
                const normalizedType =
                    String(q.nexora_type || "").toUpperCase();

                const actualType =
                    normalizedType === "MCQ"
                        ? "prelims"
                        : normalizedType === "MAINS"
                            ? "mains"
                            : normalize(q.type);

                if (wantedType === "prelims") {
                    return actualType === "prelims";
                }

                if (wantedType === "mains") {
                    return actualType === "mains";
                }

                return (
                    actualType === wantedType ||
                    actualType.includes(wantedType)
                );
            });
        }

        /* YEAR FILTER */
        if (
            wantedYear &&
            wantedYear !== "all" &&
            wantedYear !== "allyears"
        ) {
            questions = questions.filter(q =>
                String(q.year == null ? "" : q.year) === wantedYear
            );
        }

        /*
         * ADAPTER:
         * normalized fields -> existing renderer fields
         *
         * No question text or options are generated.
         * Everything comes from the original verified source record.
         */
        questions = questions.map(q => {
            const normalizedOptions =
                q.nexora_options &&
                typeof q.nexora_options === "object"
                    ? q.nexora_options
                    : {};

            const options = ["A","B","C","D"]
                .map(letter => normalizedOptions[letter])
                .filter(value =>
                    String(value == null ? "" : value).trim()
                );

            const normalizedType =
                String(q.nexora_type || "").toUpperCase();

            return {
                ...q,

                question:
                    q.nexora_question ||
                    q.question ||
                    q.question_raw ||
                    "",

                options: options,

                type:
                    normalizedType === "MCQ"
                        ? "prelims"
                        : normalizedType === "MAINS"
                            ? "mains"
                            : (q.type || ""),

                source:
                    q.source_pdf ||
                    q.source ||
                    "AUTHENTIC OFFICIAL SOURCE",

                source_pdf:
                    q.source_pdf ||
                    "",

                question_hi:
                    q.question_hi ||
                    "",

                options_hi:
                    Array.isArray(q.options_hi)
                        ? q.options_hi
                        : []
            };
        });

        console.log(
            "NEXORA FINAL PYQ LOAD:",
            "NORMALIZED_MASTER=", masterTotal,
            "AUTHENTIC=", questions.length,
            "SUBJECT=", subject,
            "EXAM=", examRaw,
            "TYPE=", typeRaw,
            "YEAR=", yearRaw
        );

        const result = {
            success: true,
            official_source_only: true,
            ai_generated_questions: 0,
            fake_pyqs: 0,
            fabricated_missing_years: false,
            total: questions.length,
            questions: questions
        };

                /* NEXORA PYQ FINAL LANGUAGE DISPLAY HOOK V3 */

                const __nexoraPyqLanguage =

                    window.__NEXORA_GET_PYQ_LANGUAGE__

                        ? window.__NEXORA_GET_PYQ_LANGUAGE__()

                        : "english";


                if (Array.isArray(result)) {

                    result = result

                        .map(q =>

                            window.__NEXORA_APPLY_PYQ_LANGUAGE__

                                ? window.__NEXORA_APPLY_PYQ_LANGUAGE__(q)

                                : q

                        )

                        .filter(Boolean);

                } else if (result && Array.isArray(result.questions)) {

                    result.questions = result.questions

                        .map(q =>

                            window.__NEXORA_APPLY_PYQ_LANGUAGE__

                                ? window.__NEXORA_APPLY_PYQ_LANGUAGE__(q)

                                : q

                        )

                        .filter(Boolean);

                } else if (result && Array.isArray(result.data)) {

                    result.data = result.data

                        .map(q =>

                            window.__NEXORA_APPLY_PYQ_LANGUAGE__

                                ? window.__NEXORA_APPLY_PYQ_LANGUAGE__(q)

                                : q

                        )

                        .filter(Boolean);

                }


                console.log(

                    "NEXORA FINAL PYQ LANGUAGE:",

                    __nexoraPyqLanguage,

                    "| DISPLAY SOURCE: result"

                );

        displayPYQs(result);

    } catch (error) {
        console.error(
            "NEXORA FINAL PYQ LOAD ERROR:",
            error
        );

        displayPYQs({
            success: false,
            official_source_only: true,
            ai_generated_questions: 0,
            fake_pyqs: 0,
            fabricated_missing_years: false,
            total: 0,
            questions: [],
            message:
                "Unable to load verified authentic PYQs."
        });
    }
}

async function downloadPYQPDF(questions, meta) {

    try {

        if (!Array.isArray(questions) || !questions.length) {
            alert("No PYQs available for PDF download.");
            return;
        }

        const response = await fetch(
            "/api/pyq/pdf",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    questions: questions,
                    language: meta.language || "bilingual",
                    exam: pyqExam ? pyqExam.value : "",
                    subject: pyqSubject ? pyqSubject.value : "",
                    type: pyqType ? pyqType.value : "",
                    year: pyqYear ? pyqYear.value : "",
                    topic: pyqTopic ? pyqTopic.value : ""
                })
            }
        );

        if (!response.ok) {
            throw new Error("PDF generation failed.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        a.href = url;
        a.download =
            "NEXORA-PYQ-" +
            (pyqSubject ? pyqSubject.value : "PYQ") +
            "-" +
            (pyqYear ? pyqYear.value || "all-years" : "all-years") +
            ".pdf";

        document.body.appendChild(a);
        a.click();
        a.remove();

        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);

    } catch (error) {

        console.error(
            "NEXORA PYQ PDF ERROR:",
            error
        );

        alert(
            error.message ||
            "Unable to generate PYQ PDF."
        );
    }
}



// NEXORA PYQ OPTION FORMATTER V1





/* NEXORA FINAL UNIVERSAL PYQ FRONTEND ROUTER V5 */
(function(){
  if (window.__NEXORA_UNIVERSAL_PYQ_V5__) return;
  window.__NEXORA_UNIVERSAL_PYQ_V5__ = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async function(input, init){
    try {
      let url = typeof input === "string" ? input : (input && input.url) || "";

      if (
        url.includes("/api/pyq/geography-prelims-authentic") ||
        url.includes("/api/pyq/geography-prelims-final") ||
        url.includes("/api/pyq/universal-30-year")
      ) {
        if (typeof input === "string") {
          input = url.replace(
            /\/api\/pyq\/(?:geography-prelims-authentic|geography-prelims-final|universal-30-year)/,
            "/api/pyq/universal"
          );
        } else {
          input = new Request(
            url.replace(
              /\/api\/pyq\/(?:geography-prelims-authentic|geography-prelims-final|universal-30-year)/,
              "/api/pyq/universal"
            ),
            input
          );
        }
      }

      if (url.includes("/api/pyq") && !url.includes("/api/pyq/pdf")) {
        const u = new URL(url, window.location.origin);
        const path = u.pathname;

        if (
          path === "/api/pyq" ||
          path === "/api/pyq/geography-prelims-authentic" ||
          path === "/api/pyq/geography-prelims-final" ||
          path === "/api/pyq/universal-30-year"
        ) {
          u.pathname = "/api/pyq/universal";
          input = u.toString();
        }
      }
    } catch(e) {
      console.warn("NEXORA PYQ V5 routing warning:", e);
    }

    return originalFetch(input, init);
  };

  console.log("NEXORA UNIVERSAL PYQ FRONTEND ROUTER V5: ACTIVE");
})();


/* NEXORA PYQ LANGUAGE + OCR FINAL DISPLAY GUARD V4 */
(function(){
    if (window.__NEXORA_PYQ_LANGUAGE_GUARD_V4__) return;
    window.__NEXORA_PYQ_LANGUAGE_GUARD_V4__ = true;

    const cleanText = v => String(v || "")
        .replace(/===== PAGE \d+ =====/gi, " ")
        .replace(/\s+/g, " ")
        .trim();

    const hasEnglish = v => /[A-Za-z]{3,}/.test(String(v || ""));
    const hasHindi = v => /[\u0900-\u097F]/.test(String(v || ""));

    window.__NEXORA_FINAL_PYQ_SOURCE_LANGUAGE__ = function(q){
        if (!q) return null;

        const explicit = String(
            q.language ||
            q.lang ||
            q.source_language ||
            q.sourceLanguage ||
            ""
        ).toLowerCase().trim();

        if (explicit === "hindi" || explicit === "hi") return "hindi";
        if (explicit === "english" || explicit === "en") return "english";

        const text = cleanText(
            q.nexora_question ||
            q.question ||
            q.question_raw ||
            q.text ||
            ""
        );

        const hi = hasHindi(text);
        const en = hasEnglish(text);

        if (hi && !en) return "hindi";
        if (en && !hi) return "english";

        return null;
    };

    window.__NEXORA_FINAL_PYQ_LANGUAGE_FILTER__ = function(q, requested){
        if (!q) return null;

        const lang = String(requested || "english").toLowerCase();
        const sourceLang = window.__NEXORA_FINAL_PYQ_SOURCE_LANGUAGE__(q);

        /* Never translate an authentic PYQ. */
        if (lang === "english") {
            if (sourceLang !== "english") return null;
        }

        if (lang === "hindi") {
            if (sourceLang !== "hindi") return null;
        }

        if (lang === "bilingual") {
            if (!sourceLang) return null;
        }

        const question = cleanText(
            q.nexora_question ||
            q.question ||
            q.question_raw ||
            ""
        );

        if (!question) return null;

        /* Reject page contamination and merged question blocks. */
        if (/===== PAGE \d+ =====/i.test(
            String(q.nexora_question || q.question || q.question_raw || "")
        )) return null;

        if (/\bQ\s*\d+\s*[\.:]/i.test(
            question.replace(/^\s*Q\s*\d+\s*[\.:]\s*/i,"")
        )) return null;

        const opts = q.nexora_options || q.options || {};
        const A = cleanText(opts.A || opts.a || "");
        const B = cleanText(opts.B || opts.b || "");
        const C = cleanText(opts.C || opts.c || "");
        const D = cleanText(opts.D || opts.d || "");

        if (A || B || C || D) {
            if (!A || !B || !C || !D) return null;
        }

        const out = Object.assign({}, q);
        out.question = question;
        out.nexora_question = question;
        out.options = {A,B,C,D};
        out.nexora_options = {A,B,C,D};
        out.source_language = sourceLang;

        return out;
    };

    console.log("NEXORA PYQ LANGUAGE + OCR GUARD V4: ACTIVE");
})();

function displayPYQs(data) {

    /*
     * NEXORA FINAL PYQ RENDER TARGET
     * The visible PYQ page uses #pyqResults.
     * Keep #nexoraPyqResults only as a legacy fallback.
     */
    let container =
        document.getElementById("pyqResults") ||
        document.getElementById("nexoraPyqResults");

    if (!container) {
        container = document.createElement("section");
        container.id = "pyqResults";
        container.className = "answer-card";

        const pyqCard =
            document.querySelector(".pyq-test-card");

        if (pyqCard) {
            pyqCard.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    }

    container.innerHTML = "";

    /*
     * Remove stale legacy renderer if it exists separately.
     */
    const legacy =
        document.getElementById("nexoraPyqResults");

    if (legacy && legacy !== container) {
        legacy.innerHTML = "";
    }

    const selectedLanguage =
        String(data.language || "bilingual").toLowerCase();

    const questions =
        Array.isArray(data.questions)
            ? data.questions
            : Array.isArray(data.data)
                ? data.data
                : [];

    const heading =
        document.createElement("h2");

    heading.textContent =
        "📚 UPSC Previous Year Questions";

    container.appendChild(heading);

    if (!questions.length) {

        const empty =
            document.createElement("p");

        empty.textContent =
            data.message ||
            "No verified authentic PYQs available for this selection.";

        container.appendChild(empty);

        if (pyqTestStatus) {
            pyqTestStatus.textContent =
                "No verified authentic PYQs available.";
        }

        return;
    }

    /*
     * FINAL OPTION NORMALIZER
     * - removes exact duplicates
     * - keeps maximum four choices
     * - always renders A/B/C/D
     */
    function finalOptions(primary, hindi) {

        const source =
            Array.isArray(primary)
                ? primary
                : [];

        const seen = new Set();
        const clean = [];

        source.forEach(function(value) {

            const text =
                String(value == null ? "" : value).trim();

            if (!text) return;

            const key =
                text
                    .replace(/^[A-D][.)]\s*/i, "")
                    .trim()
                    .toLowerCase();

            if (!seen.has(key)) {
                seen.add(key);
                clean.push(
                    text.replace(
                        /^[A-D][.)]\s*/i,
                        ""
                    ).trim()
                );
            }

        });

        return clean.slice(0, 4);
    }

    const labels = ["A", "B", "C", "D"];

    questions.forEach(function(q, index) {

        const card =
            document.createElement("div");

        card.className =
            "nexora-pyq-card";

        card.style.marginTop = "20px";
        card.style.padding = "18px";
        card.style.border = "1px solid #ddd";
        card.style.borderRadius = "12px";

        // -------------------------
        // META
        // -------------------------
        const meta =
            document.createElement("p");

        meta.style.fontWeight = "700";

        meta.textContent =
            String(q.year || "") +
            " • " +
            String(q.type || "").toUpperCase() +
            " • " +
            String(
                q.source ||
                "AUTHENTIC UPSC OFFICIAL SOURCE"
            );

        card.appendChild(meta);

        // -------------------------
        // QUESTION
        // -------------------------
        const question =
            document.createElement("h3");

        const englishQuestion =
            String(q.question || "").trim();

        const hindiQuestion =
            String(q.question_hi || "").trim();

        if (
            selectedLanguage === "hindi" &&
            hindiQuestion
        ) {
            question.textContent =
                (index + 1) +
                ". " +
                hindiQuestion;

        } else {
            question.textContent =
                (index + 1) +
                ". " +
                englishQuestion;
        }

        card.appendChild(question);

        // -------------------------
        // BILINGUAL QUESTION
        // -------------------------
        if (
            selectedLanguage === "bilingual" &&
            hindiQuestion
        ) {

            const hi =
                document.createElement("p");

            hi.style.fontWeight = "600";

            hi.textContent =
                "हिंदी: " +
                hindiQuestion;

            card.appendChild(hi);
        }

        // -------------------------
        // ENGLISH OPTIONS
        // -------------------------
        const options =
            finalOptions(
                q.options,
                q.options_hi
            );

        if (options.length) {

            const title =
                document.createElement("strong");

            title.textContent =
                "Options";

            title.style.display =
                "block";

            title.style.marginTop =
                "14px";

            card.appendChild(title);

            const optionBox =
                document.createElement("div");

            optionBox.className =
                "nexora-pyq-options";

            options.forEach(function(option, i) {

                const row =
                    document.createElement("div");

                row.className =
                    "nexora-pyq-option";

                row.style.margin =
                    "8px 0";

                row.style.padding =
                    "8px 10px";

                row.style.border =
                    "1px solid #e5e7eb";

                row.style.borderRadius =
                    "8px";

                row.textContent =
                    labels[i] +
                    ". " +
                    option;

                optionBox.appendChild(row);
            });

            card.appendChild(optionBox);
        }

        // -------------------------
        // HINDI OPTIONS
        // -------------------------
        if (
            selectedLanguage === "bilingual" &&
            Array.isArray(q.options_hi) &&
            q.options_hi.length
        ) {

            const hindiOptions =
                finalOptions(
                    q.options_hi
                );

            if (hindiOptions.length) {

                const title =
                    document.createElement("strong");

                title.textContent =
                    "हिंदी विकल्प";

                title.style.display =
                    "block";

                title.style.marginTop =
                    "14px";

                card.appendChild(title);

                const box =
                    document.createElement("div");

                hindiOptions.forEach(function(option, i) {

                    const row =
                        document.createElement("div");

                    row.style.margin =
                        "8px 0";

                    row.style.padding =
                        "8px 10px";

                    row.style.border =
                        "1px solid #e5e7eb";

                    row.style.borderRadius =
                        "8px";

                    row.textContent =
                        labels[i] +
                        ". " +
                        option;

                    box.appendChild(row);
                });

                card.appendChild(box);
            }
        }

        // -------------------------
        // ANSWER
        // -------------------------
        const answerBox =
            document.createElement("div");

        answerBox.style.marginTop =
            "16px";

        answerBox.style.padding =
            "12px";

        answerBox.style.borderRadius =
            "10px";

        answerBox.style.background =
            "#f5f7fa";

        const answerTitle =
            document.createElement("strong");

        answerTitle.textContent =
            "Correct Answer";

        answerBox.appendChild(answerTitle);

        const answer =
            document.createElement("p");

        let answerValue =
            String(
                q.answer || ""
            ).trim();

        /*
         * Convert numeric/index answers to A/B/C/D
         * without changing the actual question.
         */
        const numericAnswer =
            Number(answerValue);

        if (
            Number.isInteger(numericAnswer) &&
            numericAnswer >= 1 &&
            numericAnswer <= 4
        ) {
            answerValue =
                labels[numericAnswer - 1];
        }

        answer.textContent =
            answerValue ||
            "Answer not available yet.";

        answerBox.appendChild(answer);
        card.appendChild(answerBox);

        // -------------------------
        // EXPLANATION
        // -------------------------
        const explanationValue =
            (
                selectedLanguage === "hindi" ||
                selectedLanguage === "bilingual"
            ) &&
            q.explanation_hi
                ? q.explanation_hi
                : q.explanation;

        if (explanationValue) {

            const explanationBox =
                document.createElement("div");

            explanationBox.style.marginTop =
                "12px";

            const explanationTitle =
                document.createElement("strong");

            explanationTitle.textContent =
                "Explanation";

            explanationBox.appendChild(
                explanationTitle
            );

            const explanation =
                document.createElement("p");

            explanation.textContent =
                explanationValue;

            explanationBox.appendChild(
                explanation
            );

            card.appendChild(
                explanationBox
            );
        }

        // -------------------------
        // SOURCE / NCERT
        // -------------------------
        const details =
            document.createElement("p");

        details.style.marginTop =
            "12px";

        details.style.fontSize =
            "13px";

        details.textContent =
            "Source: " +
            String(
                q.source ||
                "UPSC Official"
            );

        if (
            q.ncert_book ||
            q.ncert_chapter
        ) {
            details.textContent +=
                " | NCERT: " +
                String(q.ncert_book || "-") +
                " → " +
                String(q.ncert_chapter || "-");
        }

        card.appendChild(details);

        container.appendChild(card);
    });

    if (pyqTestStatus) {

        pyqTestStatus.textContent =
            questions.length +
            " verified authentic PYQ(s) loaded successfully.";
    }
}


/* =================================
   NEXORA TEST SERIES ENGINE
================================= */

let activeTestQuestions = [];
let activeTestIndex = 0;
let activeTestScore = 0;

async function startTestSeries() {

    const subject = pyqSubject ? pyqSubject.value : "geography";
    const exam = pyqExam ? pyqExam.value : "upsc";
    const type = pyqType ? pyqType.value : "prelims";
    const language = pyqLanguage ? pyqLanguage.value : "bilingual";
    const year = pyqYear ? pyqYear.value : "";
    const topic = pyqTopic ? pyqTopic.value : "";

    if (pyqTestStatus) {
        pyqTestStatus.textContent = "🧠 Test Series loading...";
    }

    try {
        const response = await fetch(
            "/api/test-series?subject=" + encodeURIComponent(subject) +
            "&exam=" + encodeURIComponent(exam) +
            "&type=" + encodeURIComponent(type) +
            "&language=" + encodeURIComponent(language) +
            "&year=" + encodeURIComponent(year) +
            "&topic=" + encodeURIComponent(topic) +
            "&count=10"
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Test Series could not start.");
        }

        if (!data.questions || data.questions.length === 0) {
            if (pyqTestStatus) {
                pyqTestStatus.textContent =
                    "⚠️ Is selection ke liye Test Series dataset available nahi hai.";
            }
            return;
        }

        activeTestQuestions = data.questions;
        activeTestIndex = 0;
        activeTestScore = 0;

        renderTestQuestion();

    } catch (error) {
        console.error("NEXORA Test Series Error:", error);

        if (pyqTestStatus) {
            pyqTestStatus.textContent =
                "❌ Test Series start nahi ho saki: " + error.message;
        }
    }
}

function renderTestQuestion() {

    const container = document.getElementById("pyqResults");
    if (!container) return;

    const q = activeTestQuestions[activeTestIndex];

    if (!q) {
        finishTestSeries();
        return;
    }

    container.innerHTML = "";

    const card = document.createElement("div");
    card.className = "pyq-question-card";

    const number = document.createElement("div");
    number.className = "answer-label";
    number.textContent =
        "QUESTION " + (activeTestIndex + 1) +
        " / " + activeTestQuestions.length;

    const question = document.createElement("h3");
    question.textContent = q.question || "Question unavailable.";

    card.appendChild(number);
    card.appendChild(question);

    if (Array.isArray(q.options) && q.options.length > 0) {

        q.options.forEach(function(option, optionIndex) {

            const button = document.createElement("button");
            button.type = "button";
            button.className = "main-cta";
            button.style.display = "block";
            button.style.width = "100%";
            button.style.marginTop = "10px";
            button.textContent =
                String.fromCharCode(65 + optionIndex) + ". " + option;

            button.addEventListener("click", function() {

                const correct =
                    String(q.answer || "").trim().toLowerCase();

                const selected =
                    String(option || "").trim().toLowerCase();

                if (selected === correct) {
                    activeTestScore++;
                }

                activeTestIndex++;
                renderTestQuestion();
            });

            card.appendChild(button);
        });

    } else {

        const message = document.createElement("p");
        message.textContent =
            "⚠️ Is question ka MCQ options dataset mein available nahi hai.";
        card.appendChild(message);

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "main-cta";
        nextButton.textContent = "Next Question →";

        nextButton.addEventListener("click", function() {
            activeTestIndex++;
            renderTestQuestion();
        });

        card.appendChild(nextButton);
    }

    container.appendChild(card);

    if (pyqTestStatus) {
        pyqTestStatus.textContent =
            "🧠 Test Series running — Question " +
            (activeTestIndex + 1) +
            " of " + activeTestQuestions.length;
    }
}

function finishTestSeries() {

    const container = document.getElementById("pyqResults");
    if (!container) return;

    const total = activeTestQuestions.length;
    const percentage = total > 0
        ? Math.round((activeTestScore / total) * 100)
        : 0;

    container.innerHTML =
        "<div class=\"pyq-question-card\">" +
        "<h2>🏆 Test Completed</h2>" +
        "<p><strong>Score:</strong> " + activeTestScore +
        " / " + total + "</p>" +
        "<p><strong>Percentage:</strong> " + percentage + "%</p>" +
        "<button type=\"button\" id=\"restartTestSeries\">" +
        "🔄 Start Test Again</button>" +
        "</div>";

    const restart =
        document.getElementById("restartTestSeries");

    if (restart) {
        restart.addEventListener("click", startTestSeries);
    }

    if (pyqTestStatus) {
        pyqTestStatus.textContent =
            "✅ Test completed successfully.";
    }
}

if (testSeriesButton) {
    testSeriesButton.addEventListener("click", startTestSeries);
}

if (pyqButton) {
    pyqButton.addEventListener("click", loadPYQs);
}





/* ============================================================
   NEXORA WRITER / AUTHOR SELECT ENGINE
   ============================================================ */

function getNexoraBookAuthor(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.author ||
        book.writer ||
        book.authorName ||
        book.writerName ||
        book.by ||
        ""
    ).trim();
}

function getNexoraBookTitle(book) {
    if (!book || typeof book !== "object") {
        return "";
    }

    return String(
        book.title ||
        book.bookTitle ||
        book.name ||
        book.book ||
        book.titleEn ||
        book.titleHi ||
        ""
    ).trim();
}


function renderNexoraBooksForAuthor() {
    const authorSelect =
        document.getElementById("shortNotesAuthor");

    const bookSelect =
        document.getElementById("shortNotesBook");

    if (!bookSelect) return;

    const selectedAuthor =
        authorSelect?.value || "";

    const books =
        Array.isArray(window.shortNotesBooks)
            ? window.shortNotesBooks
            : [];

    bookSelect.innerHTML =
        '<option value="">Select Book</option>';

    const seen = new Set();

    books.forEach((book, index) => {
        const title =
            getNexoraBookTitle(book);

        if (!title) return;

        const author =
            getNexoraBookAuthor(book);

        if (
            selectedAuthor &&
            selectedAuthor !== "__custom_author__" &&
            author.toLowerCase() !==
                selectedAuthor.toLowerCase()
        ) {
            return;
        }

        const key =
            title.toLowerCase() +
            "::" +
            author.toLowerCase();

        if (seen.has(key)) return;

        seen.add(key);

        const option =
            document.createElement("option");

        option.value =
            String(
                book.id ??
                book.bookId ??
                book.value ??
                `book-${index}`
            );

        option.textContent =
            title;

        option.dataset.author =
            author;

        try {
            option.dataset.bookObject =
                JSON.stringify(book);
        } catch (_) {}

        bookSelect.appendChild(option);
    });

    const custom =
        document.createElement("option");

    custom.value = "custom";
    custom.textContent =
        "Custom / Other Book";

    bookSelect.appendChild(custom);

    if (
        typeof populateShortNotesChapters ===
        "function"
    ) {
        populateShortNotesChapters();
    }

    if (
        typeof updateShortNotesCustomFields ===
        "function"
    ) {
        updateShortNotesCustomFields();
    }
}

/* ============================================================
   NEXORA_UNIVERSAL_AUTHOR_BOOK_CHAPTER_FINAL
   Writer -> Book -> Chapter cascading system
   ============================================================ */
(function NEXORA_UNIVERSAL_AUTHOR_BOOK_CHAPTER_FINAL() {
    function byId(id) {
        return document.getElementById(id);
    }

    function filterBooksForAuthor() {
        renderUniversalBookList();

        const author =
            byId("shortNotesAuthor");

        if (author && author.value.trim()) {
            author.style.borderColor = "";
        }

        const chapter =
            byId("shortNotesChapter");

        if (chapter) {
            chapter.innerHTML =
                '<option value="">Select Chapter</option>';
        }
    }

    

    document.addEventListener(
        "DOMContentLoaded",
        async function() {
            const author =
                byId("shortNotesAuthor");

            const book =
                byId("shortNotesBook");

            const chapter =
                byId("shortNotesChapter");

            if (chapter) {
                chapter.addEventListener(
                    "change",
                    updateShortNotesCustomFields
                );
            }

            if (
                typeof populateShortNotesBooks ===
                "function"
            ) {
                await populateShortNotesBooks();
            }
        }
    );

    // Public helper for generation/payload code.
    window.getNexoraAuthorBookChapter =
        function() {
            const author =
                byId("shortNotesAuthor");

            const book =
                byId("shortNotesBook");

            const chapter =
                byId("shortNotesChapter");

            const customBook =
                byId("shortNotesCustomBook");

            const customChapter =
                byId("shortNotesCustomChapter");

            const selectedBook =
                book?.selectedOptions?.[0];

            const selectedChapter =
                chapter?.selectedOptions?.[0];

            const authorValue =
                author?.value?.trim() || "";

            const bookValue =
                book?.value || "";

            const chapterValue =
                chapter?.value || "";

            const finalBook =
                bookValue === "custom"
                    ? (
                        customBook?.value?.trim() ||
                        ""
                    )
                    : (
                        selectedBook?.textContent
                            ?.replace(
                                /\s+—\s+[^—]+$/,
                                ""
                            )
                            .trim() ||
                        bookValue
                    );

            const finalChapter =
                chapterValue === "custom"
                    ? (
                        customChapter?.value?.trim() ||
                        ""
                    )
                    : (
                        selectedChapter
                            ?.textContent
                            ?.replace(
                                /^\d+\.\s*/,
                                ""
                            )
                            .trim() ||
                        chapterValue
                    );

            return {
                author: authorValue,
                writer: authorValue,
                book: finalBook,
                bookTitle: finalBook,
                chapter: finalChapter,
                chapterTitle: finalChapter
            };
        };
})();


/* ============================================================
   NEXORA_WRITER_SELECT_EVENTS
   ============================================================ */
(function NEXORA_WRITER_SELECT_EVENTS() {
    document.addEventListener(
        "DOMContentLoaded",
        async function() {

            const author =
                document.getElementById(
                    "shortNotesAuthor"
                );

            const book =
                document.getElementById(
                    "shortNotesBook"
                );

            if (
                typeof populateShortNotesBooks ===
                "function"
            ) {
                await populateShortNotesBooks();
            }

            if (
                typeof populateNexoraAuthorSelect ===
                "function"
            ) {

            }

            if (author) {
                author.addEventListener(
                    "change",
                    function() {

                        if (
                            this.value ===
                            "__custom_author__"
                        ) {
                            const custom =
                                prompt(
                                    "Enter Writer / Author name:"
                                );

                            if (
                                custom &&
                                custom.trim()
                            ) {
                                const value =
                                    custom.trim();

                                const option =
                                    document.createElement(
                                        "option"
                                    );

                                option.value = value;
                                option.textContent =
                                    value;

                                author.insertBefore(
                                    option,
                                    author.lastElementChild
                                );

                                author.value = value;
                            } else {
                                author.value = "";
                            }
                        }

                        renderNexoraBooksForAuthor();
                    }
                );
            }

            if (book) {
                book.addEventListener(
                    "change",
                    function() {
                        populateShortNotesChapters();
                    }
                );
            }
        }
    );
})();


/* ============================================================
   NEXORA STRICT CASCADING SELECTION
   Author -> Book -> Chapter
   No chapter typing.
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.NEXORA_STRICT_CHAPTER_EVENTS) return;
  window.NEXORA_STRICT_CHAPTER_EVENTS = true;

  const bookSelect = document.getElementById("shortNotesBook");
  const chapterSelect = document.getElementById("shortNotesChapter");
  const authorSelect = document.getElementById("shortNotesAuthor");

  if (chapterSelect) {
    chapterSelect.innerHTML =
      '<option value="">Select Chapter</option>';
    chapterSelect.disabled = true;
  }

  if (authorSelect) {
    authorSelect.addEventListener("change", () => {
      setTimeout(() => {
        if (typeof populateShortNotesChapters === "function") {
          populateShortNotesChapters();
        }
      }, 0);
    });
  }
});


/* ============================================================
   NEXORA — NO TYPED BOOK / CHAPTER FLOW
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  if (window.NEXORA_NO_TYPED_BOOKS_FINAL) return;
  window.NEXORA_NO_TYPED_BOOKS_FINAL = true;

  const book = document.getElementById("shortNotesBook");
  const chapter = document.getElementById("shortNotesChapter");

  if (chapter) {
    chapter.setAttribute("required", "required");
  }

  console.log(
    "NEXORA: BOOK SELECT + CHAPTER SELECT ONLY"
  );
});


/* ============================================================
   NEXORA STABLE BOOK -> CHAPTER FLOW
   ============================================================ */
document.addEventListener("DOMContentLoaded", async () => {
  if (window.NEXORA_STABLE_BOOK_CHAPTER_FLOW) return;
  window.NEXORA_STABLE_BOOK_CHAPTER_FLOW = true;

  const bookSelect = document.getElementById("shortNotesBook");
  const chapterSelect = document.getElementById("shortNotesChapter");

  if (!bookSelect) return;

  try {
    await populateShortNotesBooks();
  } catch (error) {
    console.error("NEXORA book initialization error:", error);
  }

  if (chapterSelect) {
    chapterSelect.innerHTML =
      '<option value="">Select Chapter</option>';
    chapterSelect.disabled = true;
  }

  bookSelect.addEventListener("change", async () => {
    const selectedBook =
      bookSelect.options[bookSelect.selectedIndex];

    console.log(
      "NEXORA SELECTED BOOK:",
      bookSelect.value,
      selectedBook?.dataset?.bookTitle || selectedBook?.textContent
    );

    if (!bookSelect.value) {
      if (chapterSelect) {
        chapterSelect.innerHTML =
          '<option value="">Select Chapter</option>';
        chapterSelect.disabled = true;
      }
      return;
    }

    if (typeof populateShortNotesChapters === "function") {
      populateShortNotesChapters();
    }
  });
});


/* NEXORA_STRICT_SELECTION_VALIDATION_V7 */

/* NEXORA_STRICT_SELECTION_VALIDATION_V7 */

function nexoraValidateShortNotesSelection() {

    const author =
        shortNotesAuthor?.value?.trim() || "";

    const book =
        shortNotesBook?.value?.trim() || "";

    const chapter =
        shortNotesChapter?.value?.trim() || "";

    if (!book) {
        return {
            ok: false,
            reason: "BOOK_NOT_SELECTED"
        };
    }

    if (!chapter) {
        return {
            ok: false,
            reason: "CHAPTER_NOT_SELECTED"
        };
    }

    const bookOption =
        shortNotesBook?.selectedOptions?.[0];

    if (
        author &&
        bookOption &&
        String(bookOption.dataset.author || "")
            .trim()
            .toLowerCase() !==
        author.toLowerCase()
    ) {

        return {
            ok: false,
            reason: "AUTHOR_BOOK_MISMATCH"
        };

    }

    return {
        ok: true,
        reason: "VALID"
    };

}


// ============================================================
// NEXORA BOOK -> CHAPTER CASCADE
// ============================================================
if (shortNotesBook) {
    shortNotesBook.addEventListener("change", () => {
        if (shortNotesChapter) {
            shortNotesChapter.innerHTML =
                '<option value="">Select Chapter</option>';
            shortNotesChapter.disabled = true;
        }

        if (typeof populateShortNotesChapters === "function") {
            populateShortNotesChapters();
        }
    });
}







/* NEXORA_BOOK_CHAPTER_CASCADE_V11
 * DISABLED: superseded by the authoritative Short Notes cascade.
 * Kept intact for rollback/reference. It must not attach listeners
 * or rebuild Exam/Class/Subject/Book/Chapter selectors.
 */
(function () {
    "use strict";
    console.log("NEXORA BOOK CHAPTER CASCADE V11: DISABLED");
    window.NEXORARefreshSubjectsV11 = function(){};
    window.NEXORARefreshBooksV11 = function(){};
    window.NEXORARefreshChaptersV11 = function(){};
})();
 
/* NEXORA_CHAPTER_PAYLOAD_NORMALIZER_V14 */

(function () {
    function nexoraV14Text(value) {
        return String(value ?? "").trim();
    }

    function nexoraV14SelectedText(select) {
        if (!select || !select.selectedOptions || !select.selectedOptions[0]) {
            return "";
        }

        return nexoraV14Text(
            select.selectedOptions[0].textContent
        );
    }

    /*
     * Keep the selected chapter's actual text available to backend.
     * This prevents a generated UI chapter ID from being mistaken
     * for a missing chapter.
     */
    window.nexoraNormaliseShortNotesSelectionV14 = function (payload) {
        const data = {
            ...(payload || {})
        };

        const bookEl =
            document.getElementById("shortNotesBook");

        const chapterEl =
            document.getElementById("shortNotesChapter");

        if (!data.bookId && bookEl) {
            data.bookId = nexoraV14Text(bookEl.value);
        }

        if (!data.bookTitle) {
            data.bookTitle =
                nexoraV14SelectedText(bookEl);
        }

        if (!data.chapter && chapterEl) {
            data.chapter = nexoraV14Text(chapterEl.value);
        }

        if (!data.chapterTitle) {
            data.chapterTitle =
                nexoraV14SelectedText(chapterEl);
        }

        return data;
    };
})();


/* NEXORA_UNIVERSAL_PAYLOAD_FINAL_V16 */

window.nexoraBuildUniversalShortNotesPayloadV16 = function () {
    const get = id => document.getElementById(id);

    const exam =
        get("shortNotesExam")?.value ||
        get("exam")?.value ||
        "UPSC";

    const className =
        get("shortNotesClass")?.value ||
        get("classSelect")?.value ||
        get("class")?.value ||
        "";

    const subject =
        get("shortNotesSubject")?.value ||
        get("subjectSelect")?.value ||
        get("subject")?.value ||
        "";

    const book =
        get("shortNotesBook");

    const chapter =
        get("shortNotesChapter");

    const bookId =
        book?.value || "";

    const bookTitle =
        book?.selectedOptions?.[0]?.textContent?.trim() || "";

    const chapterId =
        chapter?.value || "";

    const chapterTitle =
        chapter?.selectedOptions?.[0]?.textContent?.trim() || "";

    return {
        exam,
        className,
        subject,
        bookId,
        bookTitle,
        chapter: chapterId,
        chapterTitle,
        language:
            get("shortNotesLanguage")?.value ||
            get("language")?.value ||
            "english",
        mode:
            get("shortNotesMode")?.value ||
            get("mode")?.value ||
            "exam"
    };
};




/* NEXORA UNIVERSAL CHAPTER SELECT FALLBACK FINAL */

(function () {
    function scalar(v) {
        if (v == null) return "";
        if (typeof v === "string" || typeof v === "number") {
            return String(v).trim();
        }
        if (typeof v === "object") {
            return scalar(
                v.titleEn ||
                v.title ||
                v.name ||
                v.chapterTitle ||
                v.en ||
                v.id ||
                ""
            );
        }
        return String(v).trim();
    }

    function findChapterSelect() {
        return (
            document.querySelector(
                "#chapterSelect"
            ) ||
            document.querySelector(
                "select[name='chapter']"
            ) ||
            document.querySelector(
                "[id*='chapter'][id*='Select']"
            )
        );
    }

    function ensureUniversalChapterOption() {
        const select = findChapterSelect();
        if (!select) return;

        const usable =
            Array.from(select.options || [])
                .filter(function (o) {
                    return scalar(o.value) &&
                        scalar(o.textContent) &&
                        !/select chapter|choose chapter/i.test(
                            scalar(o.textContent)
                        );
                });

        if (usable.length) return;

        const option =
            document.createElement("option");

        option.value =
            "Selected Chapter / Topic";

        option.textContent =
            "Selected Chapter / Topic";

        select.appendChild(option);
        select.disabled = false;
    }

    window.NEXORAEnsureUniversalChapter =
        ensureUniversalChapterOption;

    document.addEventListener(
        "DOMContentLoaded",
        function () {
            setTimeout(
                ensureUniversalChapterOption,
                300
            );
            setTimeout(
                ensureUniversalChapterOption,
                1000
            );
            setTimeout(
                ensureUniversalChapterOption,
                2500
            );
        }
    );

    const observer =
        new MutationObserver(function () {
            ensureUniversalChapterOption();
        });

    observer.observe(
        document.documentElement,
        {
            childList: true,
            subtree: true
        }
    );

    console.log(
        "NEXORA UNIVERSAL CHAPTER SELECT FALLBACK FINAL: ACTIVE"
    );
})();



/* ============================================================
   NEXORA FINAL UNIVERSAL BOOK -> CHAPTER RESOLVER
   NCERT/Class books + Standard books
   Class is NOT required for standard books.
   ============================================================ */
(function () {
  if (window.NEXORA_FINAL_UNIVERSAL_CHAPTER_RESOLVER) return;
  window.NEXORA_FINAL_UNIVERSAL_CHAPTER_RESOLVER = true;

  function getBookSelect() {
    return document.getElementById("shortNotesBook");
  }

  function getChapterSelect() {
    return document.getElementById("shortNotesChapter");
  }

  function cleanArray(value) {
    if (!value) return [];

    if (Array.isArray(value)) return value;

    if (typeof value === "object") {
      return Object.values(value);
    }

    return [];
  }

  function chapterValue(ch, index) {
    if (typeof ch === "string") {
      return ch.trim();
    }

    if (!ch || typeof ch !== "object") return "";

    return String(
      ch.id ||
      ch.slug ||
      ch.key ||
      ch.chapterId ||
      ch.titleEn ||
      ch.title ||
      ch.name ||
      ch.chapterTitle ||
      ch.chapterTitleEn ||
      ch.topic ||
      ch.label ||
      ""
    ).trim();
  }

  function chapterLabel(ch, index) {
    if (typeof ch === "string") {
      return ch.trim();
    }

    if (!ch || typeof ch !== "object") return "";

    return String(
      ch.titleEn ||
      ch.title ||
      ch.name ||
      ch.chapterTitle ||
      ch.chapterTitleEn ||
      ch.topic ||
      ch.label ||
      ch.en ||
      ch.id ||
      ch.slug ||
      ""
    ).trim();
  }

  function extractChapters(book) {
    if (!book || typeof book !== "object") return [];

    const possible = [
      book.chapters,
      book.chapterList,
      book.chapterLists,
      book.standardChapters,
      book.verifiedChapters,
      book.officialChapters,
      book.topics,
      book.chapterData
    ];

    for (const value of possible) {
      const arr = cleanArray(value);
      if (arr.length) return arr;
    }

    return [];
  }

  function sameBook(a, b) {
    if (!a || !b) return false;

    const keys = [
      "id",
      "bookId",
      "value",
      "key",
      "slug",
      "bookKey"
    ];

    for (const key of keys) {
      if (
        a[key] != null &&
        b[key] != null &&
        String(a[key]).trim() === String(b[key]).trim()
      ) {
        return true;
      }
    }

    const at = String(
      a.title || a.titleEn || a.bookTitle || a.name || ""
    ).trim().toLowerCase();

    const bt = String(
      b.title || b.titleEn || b.bookTitle || b.name || ""
    ).trim().toLowerCase();

    return !!at && !!bt && at === bt;
  }

  function findBookInObject(root, selected) {
    if (!root || !selected) return null;

    const selectedValue = String(
      selected.value || ""
    ).trim();

    const selectedTitle = String(
      selected.dataset?.bookTitle ||
      selected.textContent ||
      ""
    )
      .replace(/\s+—\s+.*$/, "")
      .trim()
      .toLowerCase();

    const candidates = [];

    function walk(node, depth) {
      if (!node || depth > 7) return;

      if (Array.isArray(node)) {
        for (const item of node) {
          if (item && typeof item === "object") {
            const id = String(
              item.id ||
              item.bookId ||
              item.value ||
              item.key ||
              item.slug ||
              ""
            ).trim();

            const title = String(
              item.title ||
              item.titleEn ||
              item.bookTitle ||
              item.name ||
              ""
            ).trim().toLowerCase();

            if (
              (selectedValue && id === selectedValue) ||
              (selectedTitle && title === selectedTitle)
            ) {
              candidates.push(item);
            }
          }

          walk(item, depth + 1);
        }
        return;
      }

      if (typeof node !== "object") return;

      const id = String(
        node.id ||
        node.bookId ||
        node.value ||
        node.key ||
        node.slug ||
        ""
      ).trim();

      const title = String(
        node.title ||
        node.titleEn ||
        node.bookTitle ||
        node.name ||
        ""
      ).trim().toLowerCase();

      if (
        (selectedValue && id === selectedValue) ||
        (selectedTitle && title === selectedTitle)
      ) {
        candidates.push(node);
      }

      for (const key of Object.keys(node)) {
        if (
          key === "chapters" ||
          key === "chapterList" ||
          key === "standardChapters" ||
          key === "officialChapters" ||
          key === "topics"
        ) {
          continue;
        }

        walk(node[key], depth + 1);
      }
    }

    walk(root, 0);

    return candidates.length ? candidates[0] : null;
  }

  async function getCatalogueBook(selected) {
    const roots = [];

    if (Array.isArray(window.shortNotesBooks)) {
      roots.push(window.shortNotesBooks);
    }

    if (window.NEXORA_SHORT_NOTES_CATALOGUE) {
      roots.push(window.NEXORA_SHORT_NOTES_CATALOGUE);
    }

    if (window.NEXORA_COMPLETE_CATALOGUE_V5) {
      roots.push(window.NEXORA_COMPLETE_CATALOGUE_V5);
    }

    for (const root of roots) {
      const found = findBookInObject(root, selected);
      if (found) return found;
    }

    const urls = [
      "/api/short-notes/catalogue",
      "/api/short-notes/books",
      "/api/short-notes/manifest"
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          method: "GET",
          cache: "no-store"
        });

        if (!response.ok) continue;

        const data = await response.json();

        const found = findBookInObject(data, selected);

        if (found) {
          console.log(
            "NEXORA FINAL CHAPTER: found book from",
            url
          );
          return found;
        }
      } catch (error) {
        console.warn(
          "NEXORA FINAL CHAPTER catalogue lookup failed:",
          url,
          error
        );
      }
    }

    return null;
  }

  async function finalPopulateShortNotesChapters() {
    const bookSelect = getBookSelect();
    const chapterSelect = getChapterSelect();

    if (!chapterSelect) return;

    chapterSelect.innerHTML =
      '<option value="">Select Chapter</option>';
    chapterSelect.disabled = true;

    if (!bookSelect || !bookSelect.value) {
      return;
    }

    const selectedOption =
      bookSelect.options[bookSelect.selectedIndex];

    if (!selectedOption) return;

    let book = null;

    try {
      if (selectedOption.dataset?.bookObject) {
        book = JSON.parse(
          selectedOption.dataset.bookObject
        );
      }
    } catch (_) {}

    if (!book) {
      const selectedValue = String(
        selectedOption.value || ""
      ).trim();

      const selectedTitle = String(
        selectedOption.dataset?.bookTitle ||
        selectedOption.textContent ||
        ""
      )
        .replace(/\s+—\s+.*$/, "")
        .trim()
        .toLowerCase();

      const localBooks = Array.isArray(window.shortNotesBooks)
        ? window.shortNotesBooks
        : [];

      book = localBooks.find(function (b) {
        if (!b) return false;

        const id = String(
          b.id ||
          b.bookId ||
          b.value ||
          b.key ||
          b.slug ||
          ""
        ).trim();

        const title = String(
          b.title ||
          b.titleEn ||
          b.bookTitle ||
          b.name ||
          ""
        ).trim().toLowerCase();

        return (
          (selectedValue && id === selectedValue) ||
          (selectedTitle && title === selectedTitle)
        );
      }) || null;
    }

    let chapters = extractChapters(book);

    if (!chapters.length) {
      const catalogueBook =
        await getCatalogueBook(selectedOption);

      if (catalogueBook) {
        book = catalogueBook;
        chapters = extractChapters(book);
      }
    }

    /*
       Standard books can be stored in a separate catalogue
       under standardBooks / books / catalogue arrays.
    */
    if (!chapters.length) {
      const roots = [
        window.NEXORA_COMPLETE_CATALOGUE_V5,
        window.NEXORA_SHORT_NOTES_CATALOGUE,
        window.shortNotesBooks
      ];

      for (const root of roots) {
        const found = findBookInObject(
          root,
          selectedOption
        );

        if (found) {
          const arr = extractChapters(found);

          if (arr.length) {
            book = found;
            chapters = arr;
            break;
          }
        }
      }
    }

    const usable = [];

    chapters.forEach(function (chapter, index) {
      const value = chapterValue(chapter, index);
      const label = chapterLabel(chapter, index);

      if (!value || !label) return;

      usable.push({
        value: value,
        label: label
      });
    });

    /*
       Remove duplicate chapters.
    */
    const seen = new Set();

    usable.forEach(function (chapter) {
      const key = (
        chapter.value +
        "|" +
        chapter.label
      ).toLowerCase();

      if (seen.has(key)) return;

      seen.add(key);

      const option =
        document.createElement("option");

      option.value = chapter.value;
      option.textContent = chapter.label;

      chapterSelect.appendChild(option);
    });

    if (seen.size > 0) {
      chapterSelect.disabled = false;

      console.log(
        "NEXORA FINAL CHAPTER READY:",
        selectedOption.textContent,
        "=>",
        seen.size,
        "chapters"
      );
    } else {
      /*
         Do NOT invent fake chapters.
         Keep selection disabled if the manifest/catalogue
         has no official chapter mapping.
      */
      console.warn(
        "NEXORA FINAL CHAPTER: no official chapters found for:",
        selectedOption.textContent
      );
    }
  }

  /*
     Replace the old function with the universal resolver.
  */
  window.populateShortNotesChapters =
    finalPopulateShortNotesChapters;

  /*
     Direct Book -> Chapter event.
  */
  function bindFinalBookChapterEvent() {
    const bookSelect = getBookSelect();

    if (!bookSelect) return;

    if (bookSelect.dataset.nexoraFinalChapterBound === "1") {
      return;
    }

    bookSelect.dataset.nexoraFinalChapterBound = "1";

    bookSelect.addEventListener(
      "change",
      async function () {
        await finalPopulateShortNotesChapters();
      },
      true
    );

    console.log(
      "NEXORA FINAL: Book -> Chapter event bound"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      bindFinalBookChapterEvent
    );
  } else {
    bindFinalBookChapterEvent();
  }

  /*
     Some older code rebuilds the Book select after DOMContentLoaded.
     Rebind safely whenever the select appears/reappears.
  */
  const observer = new MutationObserver(function () {
    bindFinalBookChapterEvent();
  });

  if (document.documentElement) {
    observer.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );
  }

  console.log(
    "NEXORA FINAL UNIVERSAL BOOK -> CHAPTER RESOLVER: ACTIVE"
  );
})();


/* ============================================================
   NEXORA DIRECT CHAPTER API FRONTEND FINAL
   ============================================================ */
(function () {
  if (window.NEXORA_DIRECT_CHAPTER_FRONTEND_FINAL) return;
  window.NEXORA_DIRECT_CHAPTER_FRONTEND_FINAL = true;

  async function loadDirectChapters() {
    const bookSelect =
      document.getElementById("shortNotesBook");

    const chapterSelect =
      document.getElementById("shortNotesChapter");

    if (!bookSelect || !chapterSelect) return;

    if (!bookSelect.value) {
      chapterSelect.innerHTML =
        '<option value="">Select Chapter</option>';
      chapterSelect.disabled = true;
      return;
    }

    const classSelect =
      document.getElementById("shortNotesClass");

    const subjectSelect =
      document.getElementById("shortNotesSubject");

    const selectedBook =
      bookSelect.options[bookSelect.selectedIndex];

    const classValue =
      classSelect?.value || "";

    const subjectValue =
      subjectSelect?.value || "";

    const bookValue =
      bookSelect.value || "";

    const bookTitle =
      selectedBook?.dataset?.bookTitle ||
      selectedBook?.textContent ||
      bookValue;

    chapterSelect.innerHTML =
      '<option value="">Loading Chapters...</option>';

    chapterSelect.disabled = true;

    const params = new URLSearchParams();

    params.set("class", classValue);
    params.set("subject", subjectValue);
    params.set("book", bookValue);

    params.set(
      "bookTitle",
      String(bookTitle).replace(/\s+—\s+.*$/, "").trim()
    );

    try {
      const response = await fetch(
        "/api/short-notes/chapters?" +
        params.toString(),
        {
          method: "GET",
          cache: "no-store"
        }
      );

      if (!response.ok) {
        throw new Error(
          "Chapter API HTTP " + response.status
        );
      }

      const data = await response.json();

      const chapters =
        Array.isArray(data.chapters)
          ? data.chapters
          : [];

      chapterSelect.innerHTML =
        '<option value="">Select Chapter</option>';

      if (chapters.length) {
        chapters.forEach(function (chapter) {
          const option =
            document.createElement("option");

          option.value =
            chapter.value ||
            chapter.id ||
            chapter.title ||
            chapter.label;

          option.textContent =
            chapter.label ||
            chapter.title ||
            chapter.name ||
            option.value;

          chapterSelect.appendChild(option);
        });

        chapterSelect.disabled = false;

        console.log(
          "NEXORA DIRECT CHAPTER SUCCESS:",
          bookTitle,
          "=>",
          chapters.length,
          "chapters"
        );
      } else {
        console.warn(
          "NEXORA DIRECT CHAPTER API returned 0 chapters:",
          {
            classValue,
            subjectValue,
            bookValue,
            bookTitle
          }
        );
      }
    } catch (error) {
      console.error(
        "NEXORA DIRECT CHAPTER ERROR:",
        error
      );

      chapterSelect.innerHTML =
        '<option value="">Select Chapter</option>';

      chapterSelect.disabled = true;
    }
  }

  window.nexoraLoadDirectChapters =
    loadDirectChapters;

  function bind() {
    const book =
      document.getElementById("shortNotesBook");

    if (!book) return;

    if (
      book.dataset.directChapterApiBound === "1"
    ) {
      return;
    }

    book.dataset.directChapterApiBound = "1";

    console.log(
      "NEXORA DIRECT CHAPTER EVENT: ACTIVE"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      bind
    );
  } else {
    bind();
  }

  new MutationObserver(bind).observe(
    document.documentElement,
    {
      childList: true,
      subtree: true
    }
  );
})();

/* ============================================================
   NEXORA AI SEARCH ENGINE — COMPLETE FEATURE PATCH V1
   Features:
   AI Answer + Web + Citations + Source Ranking
   Follow-up + Regenerate + Simple/Expert + Hindi/English
   ============================================================ */

(function NEXORA_AI_SEARCH_ENGINE_V1 () {

    if (window.__NEXORA_AI_SEARCH_ENGINE_V1__) return;
    window.__NEXORA_AI_SEARCH_ENGINE_V1__ = true;

    const $ = id => document.getElementById(id);

    const input = $("searchInput");
    const answer = $("answerText");
    const answerTitleEl = $("answerTitle");
    const details = $("answerDetails");

    if (!input || !answer) {
        console.warn("[NEXORA AI SEARCH] Required search elements not found.");
        return;
    }

    const baseUrl =
        (location.hostname === "localhost" ||
         location.hostname === "127.0.0.1")
            ? "http://localhost:5001"
            : "https://nexora-o8wi.onrender.com";

    let lastQuery = "";
    let lastSources = [];
    let lastLanguage = "auto";
    let lastExplanation = "simple";

    /* ---------------------------------------------------------
       UI
       --------------------------------------------------------- */

    function createControls() {

        if ($("nexoraAISearchControls")) return;

        const box = document.createElement("div");
        box.id = "nexoraAISearchControls";

        box.style.cssText = `
            display:flex;
            flex-wrap:wrap;
            gap:10px;
            align-items:center;
            margin:14px 0;
            padding:12px;
            border:1px solid #e5e7eb;
            border-radius:12px;
            background:#fafafa;
        `;

        box.innerHTML = `
            <label style="font-size:14px;font-weight:600;">
                Language
                <select id="nexoraSearchLanguage"
                    style="margin-left:5px;padding:7px 10px;border-radius:8px;border:1px solid #d1d5db;">
                    <option value="auto">Auto</option>
                    <option value="english">English</option>
                    <option value="hindi">हिंदी</option>
                    <option value="hinglish">Hinglish</option>
                </select>
            </label>

            <label style="font-size:14px;font-weight:600;">
                Explanation
                <select id="nexoraSearchExplanation"
                    style="margin-left:5px;padding:7px 10px;border-radius:8px;border:1px solid #d1d5db;">
                    <option value="simple">Simple</option>
                    <option value="expert">Expert</option>
                </select>
            </label>

            <button id="nexoraRegenerateBtn"
                type="button"
                style="padding:8px 13px;border:0;border-radius:8px;cursor:pointer;">
                Regenerate
            </button>
        `;

        input.parentElement?.insertAdjacentElement("afterend", box);

        $("nexoraSearchLanguage")?.addEventListener("change", e => {
            lastLanguage = e.target.value;
        });

        $("nexoraSearchExplanation")?.addEventListener("change", e => {
            lastExplanation = e.target.value;
        });

        $("nexoraRegenerateBtn")?.addEventListener("click", () => {
            if (!lastQuery) {
                alert("Please search for a topic first.");
                return;
            }

            enhancedSearch(lastQuery, true);
        });
    }

    /* ---------------------------------------------------------
       SOURCE RANKING
       --------------------------------------------------------- */

    function rankSources(sources) {

        if (!Array.isArray(sources)) return [];

        return sources
            .map((source, index) => {

                const url = String(source?.url || "");
                const title = String(source?.title || "");
                const content = String(
                    source?.content ||
                    source?.snippet ||
                    ""
                );

                let score =
                    Number(source?.score || 0);

                const lowerUrl = url.toLowerCase();

                /* Official / high-value domains */
                if (
                    lowerUrl.includes(".gov.in") ||
                    lowerUrl.includes(".gov") ||
                    lowerUrl.includes("upsc.gov.in") ||
                    lowerUrl.includes("ncert.nic.in") ||
                    lowerUrl.includes("epathshala.nic.in")
                ) {
                    score += 10;
                }

                if (
                    lowerUrl.includes("edu") ||
                    lowerUrl.includes("ac.in")
                ) {
                    score += 4;
                }

                if (title.length > 20) score += 1;
                if (content.length > 200) score += 1;

                return {
                    ...source,
                    _nexoraRankScore: score,
                    _nexoraOriginalIndex: index
                };

            })
            .sort((a, b) => {

                if (
                    b._nexoraRankScore !==
                    a._nexoraRankScore
                ) {
                    return (
                        b._nexoraRankScore -
                        a._nexoraRankScore
                    );
                }

                return (
                    a._nexoraOriginalIndex -
                    b._nexoraOriginalIndex
                );
            });
    }

    /* ---------------------------------------------------------
       SOURCE DISPLAY
       --------------------------------------------------------- */


    function displaySmartSources(sources) {

        const sourcesSection =
            document.querySelector(".sources-section");

        if (!sourcesSection) {
            return;
        }

        /*
         * IMPORTANT:
         * Never clear the whole sources-section.
         * The answer/search UI may share this section.
         */

        const oldCards =
            sourcesSection.querySelectorAll(
                ".source-card, .nexora-ai-ranked-source, .nexora-extra-source, .nexora-smart-source-container"
            );

        oldCards.forEach(function(card) {
            card.remove();
        });

        const oldActions =
            sourcesSection.querySelectorAll(
                ".source-actions"
            );

        oldActions.forEach(function(el) {
            el.remove();
        });

        let heading =
            sourcesSection.querySelector(
                ".section-title h2"
            );

        if (!heading) {

            const title =
                document.createElement("div");

            title.className =
                "section-title";

            heading =
                document.createElement("h2");

            heading.textContent =
                "Sources & Evidence";

            title.appendChild(heading);

            sourcesSection.prepend(title);

        } else {

            heading.textContent =
                "Sources & Evidence";
        }

        const container =
            document.createElement("div");

        container.className =
            "nexora-smart-source-container";

        if (!Array.isArray(sources) || sources.length === 0) {

            const empty =
                document.createElement("p");

            empty.textContent =
                "No live web sources were available for this search.";

            container.appendChild(empty);

            sourcesSection.appendChild(container);

            return;
        }

        const sourceGrid =
            document.createElement("div");

        sourceGrid.className =
            "nexora-smart-source-grid";

        sources.slice(0, 2).forEach(function(source, index) {

            const card =
                document.createElement("article");

            card.className =
                "nexora-smart-source";

            const label =
                document.createElement("div");

            label.className =
                "nexora-smart-source-label";

            label.textContent =
                "SOURCE " + (index + 1);

            const title =
                document.createElement("h3");

            title.textContent =
                source.title ||
                "Relevant Web Source";

            card.appendChild(label);
            card.appendChild(title);

            if (source.url) {

                const link =
                    document.createElement("a");

                link.href =
                    source.url;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

                link.textContent =
                    "View source →";

                card.appendChild(link);
            }

            sourceGrid.appendChild(card);
        });

        container.appendChild(sourceGrid);
        sourcesSection.appendChild(container);
    }


    function displayRankedSources(sources) {

        const ranked = rankSources(sources);

        lastSources = ranked;

        const section =
            document.querySelector(".sources-section");

        if (!section) return;

        document
            .querySelectorAll(".nexora-ai-ranked-source")
            .forEach(el => el.remove());

        const heading =
            document.createElement("div");

        heading.className =
            "nexora-ai-ranked-source";

        heading.style.cssText = `
            margin-top:16px;
            padding:12px;
            border-radius:10px;
            background:#f8fafc;
            border:1px solid #e5e7eb;
        `;

        heading.innerHTML = `
            <strong>Sources & Citations</strong>
            <div style="font-size:13px;color:#6b7280;margin-top:4px;">
                Sources are arranged by relevance and available source-quality signals.
            </div>
        `;

        section.appendChild(heading);

        ranked.slice(0, 8).forEach((source, index) => {

            const card =
                document.createElement("div");

            card.className =
                "nexora-ai-ranked-source";

            card.style.cssText = `
                margin-top:8px;
                padding:10px 12px;
                border:1px solid #e5e7eb;
                border-radius:9px;
                background:white;
            `;

            const title =
                source.title ||
                "Web Source";

            const url =
                source.url || "";

            card.innerHTML = `
                <div style="font-weight:700;">
                    [${index + 1}]
                    ${escapeHtml(title)}
                </div>

                ${
                    url
                    ? `
                    <button
                        type="button"
                        class="nexora-source-open"
                        data-url="${escapeAttr(url)}"
                        style="margin-top:7px;border:0;background:none;padding:0;cursor:pointer;text-decoration:underline;">
                        Open source
                    </button>
                    `
                    : ""
                }
            `;

            section.appendChild(card);
        });

        section
            .querySelectorAll(".nexora-source-open")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const url =
                            button.dataset.url;

                        if (url) {
                            window.open(
                                url,
                                "_blank",
                                "noopener,noreferrer"
                            );
                        }
                    }
                );
            });
    }

    function escapeHtml(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }

    /* ---------------------------------------------------------
       FOLLOW-UP QUESTIONS
       --------------------------------------------------------- */

    function displayFollowUps(query) {

        document
            .querySelectorAll(".nexora-followups")
            .forEach(el => el.remove());

        const container =
            document.createElement("div");

        container.className =
            "nexora-followups";

        container.style.cssText = `
            margin-top:18px;
            padding:14px;
            border-radius:12px;
            border:1px solid #e5e7eb;
            background:#fafafa;
        `;



        container
            .querySelectorAll(".nexora-followup-btn")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const q =
                            button.dataset.question;

                        if (!q) return;

                        input.value = q;

                        enhancedSearch(q, false);
                    }
                );
            });
    }

    /* ---------------------------------------------------------
       AI ANSWER
       --------------------------------------------------------- */

    async function getAIAnswer(
        question,
        sources,
        regenerate
    ) {

        const ranked =
            rankSources(sources);

        const sourceContext =
            ranked
                .slice(0, 6)
                .map((source, index) => {

                    return (
                        `[${index + 1}] ` +
                        `Title: ${source.title || ""}\n` +
                        `URL: ${source.url || ""}\n` +
                        `Content: ${(source.content || source.snippet || "").slice(0, 1200)}`
                    );

                })
                .join("\n\n");

        let languageInstruction =
            "Answer naturally in the same language as the user.";

        if (lastLanguage === "english") {
            languageInstruction =
                "Answer completely in clear English.";
        }

        if (lastLanguage === "hindi") {
            languageInstruction =
                "Answer completely in natural Hindi using Devanagari.";
        }

        if (lastLanguage === "hinglish") {
            languageInstruction =
                "Answer in natural Hindi-English Hinglish.";
        }

        const explanationInstruction =
            lastExplanation === "expert"
                ? "Give an expert-level explanation with technical depth, precise terminology and important nuances."
                : "Give a simple, clear explanation that a normal student can understand.";

        const regenerationInstruction =
            regenerate
                ? "This is a regenerated answer. Produce a fresh, independently worded answer and avoid repeating the previous phrasing."
                : "";

        const groundedQuestion = `
User question:
${question}

${languageInstruction}

${explanationInstruction}

${regenerationInstruction}

Use the following web sources as evidence where relevant:

${sourceContext || "No web sources were returned."}

Citation rules:
- Use [1], [2], [3] etc. only when the statement is supported by that numbered source.
- Do not invent citations.
- Do not invent URLs.
- If sources do not support a claim, clearly say that verification is unavailable.
- Do not include a separate raw URL list inside the answer.

Write a clean, synthesized answer in your own words.

STRICT OUTPUT RULES:
- Answer the user's question directly.
- Do NOT copy or reproduce scraped webpage/article text.
- Do NOT output source-page navigation, author names, logos, menus, advertisements, metadata, or article headers.
- Do NOT output lines beginning with Title:, URL:, or Content:.
- Do NOT dump or enumerate the web pages themselves.
- Use the sources only as evidence and synthesize their relevant facts.
- Keep citations like [1], [2] only where useful and supported.
- Start directly with the answer, not with a source list.
- The answer must be readable on both desktop and mobile.

Write a useful direct answer.
        `.trim();

        const response =
            await fetch(
                baseUrl + "/api/ask",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        question:
                            groundedQuestion,
                        userId:
                            typeof getNexoraUserId === "function"
                                ? getNexoraUserId()
                                : null
                    })
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.message ||
                "AI answer failed"
            );
        }

        return data;
    }

    /* ---------------------------------------------------------
       COMPLETE SEARCH
       --------------------------------------------------------- */

    async function enhancedSearch(
        query,
        regenerate = false
    ) {

        query =
            String(query || "").trim();

        if (!query) return;

        lastQuery = query;

        // ============================================================
        // NEXORA DIRECT IMAGE MODE — AUTHORITATIVE QUERY FLAG
        // Image/photo queries use the Home image gallery only.
        // Normal searches keep the existing AI + Sources flow.
        // ============================================================
        const nexoraDirectImageMode =
            typeof nexoraImageQueryIntent === "function" &&
            nexoraImageQueryIntent(query);

        /* NEXORA UNIVERSAL SEARCH:
           every valid user query enters answer/result mode */
        document.body.classList.remove("nexora-search-first");
        document.body.classList.add("nexora-search-results");

        const resultCard =
            document.querySelector(".answer-card");

        if (resultCard) {
            resultCard.style.setProperty(
                "display",
                "block",
                "important"
            );
            resultCard.style.setProperty(
                "visibility",
                "visible",
                "important"
            );
        }

        createControls();

        if (answerTitleEl) {
            answerTitleEl.textContent =
                query;
        }

        answer.textContent =
            "Searching...";

        if (details) {
            details.textContent =
                "Finding relevant information and preparing the answer.";
        }

        const languageSelect =
            $("nexoraSearchLanguage");

        const explanationSelect =
            $("nexoraSearchExplanation");

        if (languageSelect) {
            lastLanguage =
                languageSelect.value;
        }

        if (explanationSelect) {
            lastExplanation =
                explanationSelect.value;
        }

        try {

            /* NEXORA MULTI-SOURCE AI SEARCH */
            const searchResponse =
                await fetch(
                    baseUrl +
                    "/api/search?q=" +
                    encodeURIComponent(query) +
                    "&userId=" +
                    encodeURIComponent(
                        typeof getNexoraUserId === "function"
                            ? getNexoraUserId() || ""
                            : ""
                    )
                );

            const searchData =
                await searchResponse.json();

            // NEXORA DIRECT WEBSITE RESPONSE AUTHORITY — FINAL FLOW
            if (searchData && searchData.directWebsite && searchData.url) {
                console.log("NEXORA DIRECT WEBSITE:", searchData.url);
                window.location.replace(searchData.url);
                return;
            }

            if (!searchResponse.ok || !searchData?.success) {
                throw new Error(
                    searchData?.message ||
                    "NEXORA search failed."
                );
            }

            // ============================================================
            // NEXORA IMAGE QUERY — DIRECT HOME GALLERY AUTHORITY
            // Fetch and render actual images in the final visible result
            // container. Normal searches continue through the existing flow.
            // ============================================================
            if (nexoraDirectImageMode) {
                try {
                    const directImageResponse = await fetch(
                        nexoraImageApiBase() +
                        "/api/image-search?q=" +
                        encodeURIComponent(query)
                    );

                    const directImageData =
                        await directImageResponse.json();

                    nexoraRenderImageResults(
                        directImageData?.images || [],
                        query
                    );

                    console.log(
                        "NEXORA DIRECT IMAGE GALLERY:",
                        Array.isArray(directImageData?.images)
                            ? directImageData.images.length
                            : 0
                    );
                } catch (directImageError) {
                    console.warn(
                        "NEXORA DIRECT IMAGE GALLERY FAILURE:",
                        directImageError?.message || directImageError
                    );

                    nexoraRenderImageResults([], query);
                }
            }

            const sources =
                Array.isArray(searchData.sources)
                    ? searchData.sources
                    : [];

            /*
             * IMPORTANT:
             * /api/search already performs:
             * Tavily multi-source research -> Gemini synthesis.
             *
             * Do NOT call getAIAnswer() again here.
             */
            // ============================================================
            // NEXORA FINAL ANSWER / SOURCES / DIRECT YOUTUBE RENDERER
            // ============================================================
            // ============================================================
            // NEXORA FINAL ANSWER UI — FINAL STABLE RENDERER
            // ============================================================
            /*
             * NEXORA FINAL ANSWER AUTHORITY V1
             * /api/search supplies research sources.
             * Use its synthesized answer when it is genuinely answer-like.
             * If the payload is actually a raw source dump, use the existing
             * grounded AI-answer engine once instead of displaying scraped pages.
             */
            let nexoraRawAnswer = String(searchData.answer || "").trim();

            const nexoraDetectionText =
              String(nexoraRawAnswer || "")
                .replace(/```[\\s\\S]*?```/g, "")
                .trim();

            const sourceDumpSignals = [
              /(^|\\n)\\s*(Title|URL|Content):/im.test(nexoraDetectionText),
              /(^|\\n)\\s*\\d+[.)]\\s+.*(?:Wikipedia|LawRato|YouTube|Search Result|विकिपीडिया|लॉराटो|टेस्टबुक|Eligibility|Recruitment|Papers)/iu.test(nexoraDetectionText),
              /Testbook Logo|Get Started|Skill Academy|Download Solution PDF|View all .* Papers|This question was previously asked|authorImage|मुख्य पृष्ठ|परिचय|विषय सूची|विज्ञापन|कानूनी जानकारी/i.test(nexoraDetectionText),
              (nexoraDetectionText.match(/https?:\/\//gi) || []).length >= 2
            ].filter(Boolean).length;

            const rawAnswerLooksLikeSourceDump =
              sourceDumpSignals >= 1;

            if(
              !nexoraDirectImageMode &&
              (!nexoraRawAnswer || rawAnswerLooksLikeSourceDump) &&
              sources.length
            ){
              try{
                const grounded = await getAIAnswer(
                  query,
                  sources,
                  regenerate
                );

                const groundedAnswer =
                  String(
                    grounded?.answer ||
                    grounded?.data?.answer ||
                    grounded?.response ||
                    ""
                  ).trim();

                if(groundedAnswer){
                  nexoraRawAnswer = groundedAnswer;
                }
              }catch(answerFallbackError){
                console.warn(
                  "[NEXORA ANSWER FALLBACK]",
                  answerFallbackError
                );
              }
            }

            // Remove old AI-generated YouTube/search markdown.
            nexoraRawAnswer = nexoraRawAnswer
              .replace(/\[\*\*.*?YouTube.*?\*\*\]\([^)]*\)/gi,"")
              .replace(/\[Relevant YouTube videos.*?\]\([^)]*\)/gi,"")
              .replace(/https?:\/\/(?:www\.)?youtube\.com\/results\?search_query=[^\s)]+/gi,"")
              .replace(/\n[ \t]*-[ \t]*(?=\n|$)/g,"\n")
              .trim();

            // Remove stale NEXORA UI.
            document.querySelectorAll(
              ".nexora-final-actions,.nexora-final-evidence,.nexora-youtube-panel"
            ).forEach(e=>e.remove());

            function nxEsc(v){
              return String(v ?? "")
                .replace(/&/g,"&amp;")
                .replace(/</g,"&lt;")
                .replace(/>/g,"&gt;")
                .replace(/"/g,"&quot;");
            }

            function nxInline(v){
              let x=nxEsc(v);

              // Unescape AI escaped markdown.
              x=x.replace(/\\([\\`*_[\]().#+\->])/g,"$1");

              // Markdown links.
              x=x.replace(
                /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/gi,
                '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
              );

              // Bold / italic / inline code.
              x=x.replace(/`([^`]+)`/g,
                '<code class="nx-inline-code">$1</code>');
              x=x.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>");
              x=x.replace(/__([^_]+)__/g,"<strong>$1</strong>");
              x=x.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g,"<em>$1</em>");

              return x;
            }

            function nxRender(v){
              let text=String(v ?? "")
                .replace(/\r/g,"")
                .replace(/\\#/g,"#")
                .replace(/\\\./g,".")
                .replace(/\\\*/g,"*")
                .replace(/\\_/g,"_")
                .replace(/\\`/g,"`");

              const lines=text.split("\n");
              let html=[];
              let list=null;
              let code=false;
              let codeLines=[];

              function closeList(){
                if(list){
                  html.push("</"+list+">");
                  list=null;
                }
              }

              function closeCode(){
                if(code){
                  html.push(
                    '<pre class="nx-code-block"><code>'+
                    nxEsc(codeLines.join("\n"))+
                    "</code></pre>"
                  );
                  code=false;
                  codeLines=[];
                }
              }

              for(let line of lines){
                let t=line.trim();

                if(/^```/.test(t)){
                  if(code) closeCode();
                  else { closeList(); code=true; }
                  continue;
                }

                if(code){
                  codeLines.push(line);
                  continue;
                }

                if(!t){
                  closeList();
                  continue;
                }

                let h=t.match(/^#{1,6}\s+(.+)$/);
                if(h){
                  closeList();
                  html.push("<h3>"+nxInline(h[1])+"</h3>");
                  continue;
                }

                let ol=t.match(/^\d+[.)]\s+(.+)$/);
                if(ol){
                  if(list!=="ol"){
                    closeList();
                    html.push("<ol>");
                    list="ol";
                  }
                  html.push("<li>"+nxInline(ol[1])+"</li>");
                  continue;
                }

                let ul=t.match(/^[-*+]\s+(.+)$/);
                if(ul){
                  if(list!=="ul"){
                    closeList();
                    html.push("<ul>");
                    list="ul";
                  }
                  html.push("<li>"+nxInline(ul[1])+"</li>");
                  continue;
                }

                closeList();

                // Python / JS / common code-looking lines get code styling.
                const looksCode =
                  /^(def |class |import |from |const |let |var |function |if\s*\(|for\s*\(|while\s*\(|return |print\s*\(|console\.|#include|public |private |SELECT |INSERT |UPDATE |CREATE )/.test(t) ||
                  /^[{}()[\];]|=>|===|!==|:=/.test(t);

                if(looksCode){
                  html.push('<pre class="nx-code-line"><code>'+
                    nxEsc(t)+'</code></pre>');
                }else{
                  html.push("<p>"+nxInline(t)+"</p>");
                }
              }

              closeList();
              closeCode();
              return html.join("");
            }

            // ============================================================
            // NEXORA DIRECT IMAGE MODE — NO AI ANSWER / SOURCE TEXT
            // ============================================================
            if(nexoraDirectImageMode){
              answer.innerHTML="";
              answer.style.display="none";

              const directGallery =
                document.getElementById("nexoraImageResultsFinal");

              if(directGallery){
                directGallery.style.display="block";
                directGallery.style.visibility="visible";
                directGallery.style.opacity="1";
                directGallery.style.position="relative";
                directGallery.style.zIndex="20";
              }

              console.log(
                "NEXORA DIRECT IMAGE RENDER: AI ANSWER HIDDEN"
              );
            }else{
              answer.style.display="";
              answer.innerHTML=nxRender(nexoraRawAnswer);
            }

            // ============================================================
            // FINAL UI CSS — CODE AUTO HIGHLIGHT STYLE
            // ============================================================
            if(!document.getElementById("nexora-final-ui-css")){
              const st=document.createElement("style");
              st.id="nexora-final-ui-css";
              st.textContent=`
                .nx-code-block,.nx-code-line{
                  margin:12px 0;
                  padding:14px 16px;
                  border-radius:10px;
                  overflow:auto;
                  font-family:Consolas,"Courier New",monospace;
                  font-size:14px;
                  line-height:1.6;
                  background:#111827;
                  color:#f8fafc;
                  border-left:4px solid #f59e0b;
                  white-space:pre-wrap;
                }
                .nx-inline-code{
                  padding:2px 5px;
                  border-radius:4px;
                  background:#fff3cd;
                  color:#b42318;
                  font-family:Consolas,"Courier New",monospace;
                }
                .nexora-final-evidence{
                  display:block!important;
                  margin:22px 0!important;
                  padding:18px!important;
                  border:1px solid #d1d5db!important;
                  border-radius:14px!important;
                  background:#fff!important;
                }
                .nexora-final-evidence a{
                  display:block;
                  font-weight:700;
                  margin-bottom:6px;
                  word-break:break-word;
                }
                .nexora-final-actions{
                  display:flex!important;
                  gap:10px!important;
                  flex-wrap:wrap!important;
                  margin:20px 0!important;
                }
                .nexora-final-actions button,
                .nexora-final-actions a{
                  display:inline-block!important;
                  padding:11px 16px!important;
                  border-radius:10px!important;
                  border:1px solid #d1d5db!important;
                  background:#fff!important;
                  text-decoration:none!important;
                  cursor:pointer!important;
                  font-weight:700!important;
                }
              `;
              document.head.appendChild(st);
            }

            // ============================================================
            // SOURCES & EVIDENCE — BUTTON + ACTUAL SECTION
            // ============================================================
            const sourceData=Array.isArray(searchData.sources)
              ? searchData.sources
              : (Array.isArray(sources)?sources:[]);

            const evidence=document.createElement("section");
            evidence.className="nexora-final-evidence";
            evidence.style.display=nexoraDirectImageMode ? "none" : "block";

            const eh=document.createElement("h3");
            eh.textContent="🔎 Sources & Evidence"; eh.style.display="block";
            evidence.appendChild(eh);

            const usable=sourceData.filter(x=>
              x && /^https?:\/\//i.test(String(x.url||""))
            ).slice(0,8);

            if(usable.length){
              usable.forEach((src,i)=>{
                const box=document.createElement("div");
                box.style.cssText="margin:12px 0;padding:12px;border:1px solid #eee;border-radius:10px";

                const a=document.createElement("a");
                a.href=String(src.url);
                a.target="_blank";
                a.rel="noopener noreferrer";
                a.textContent=(i+1)+". "+String(src.title||src.url);
                box.appendChild(a);

                const ev=String(src.content||src.snippet||"").trim();
                if(ev){
                  const ep=document.createElement("div");
                  ep.textContent=ev.slice(0,700);
                  ep.style.cssText="font-size:14px;line-height:1.5";
                  box.appendChild(ep);
                }

                evidence.appendChild(box);
              });
            }else{
              const ep=document.createElement("p");
              ep.textContent="No source evidence was returned for this answer.";
              evidence.appendChild(ep);
            }

            // ============================================================
            // YOUTUBE — ALL VIDEOS, NOT "BEST"
            // ============================================================
            const actions=document.createElement("div");
            actions.className="nexora-final-actions";
            actions.style.display=nexoraDirectImageMode ? "none" : "flex";

            const sourceButton=document.createElement("button");
            sourceButton.type="button";
            sourceButton.textContent="🔎 Sources & Evidence"; sourceButton.style.display="inline-flex";
            sourceButton.onclick=()=>{
              evidence.scrollIntoView({behavior:"smooth",block:"start"});
            };
            actions.appendChild(sourceButton);

            const youtubeButton=document.createElement("a");
            const ytQuery=String(query||"").trim();
            youtubeButton.href=
              "https://www.youtube.com/results?search_query="+encodeURIComponent(query)+
              encodeURIComponent(ytQuery);
            youtubeButton.target="_blank";
            youtubeButton.rel="noopener noreferrer";
            youtubeButton.textContent="▶ All YouTube Videos"; youtubeButton.style.display="inline-flex";
            actions.appendChild(youtubeButton);

            const host=answer.parentElement||answer;
            host.appendChild(actions);
            host.appendChild(evidence);

            if(details){
              details.textContent=usable.length
                ? "Answer prepared with web sources and evidence by NEXORA AI."
                : "Answer prepared using NEXORA AI.";
            }

            
/* NEXORA FINAL UI VISIBILITY OVERRIDE */
if(!document.getElementById("nexora-final-ui-force-css")){
  const st=document.createElement("style");
  st.id="nexora-final-ui-force-css";
  st.textContent=`
    .nexora-final-actions{display:flex!important;visibility:visible!important;opacity:1!important}
    .nexora-final-actions>*{display:inline-flex!important;visibility:visible!important;opacity:1!important}
    .nexora-final-evidence{display:block!important;visibility:visible!important;opacity:1!important}
    .nx-code{display:block!important;visibility:visible!important}
    .nx-code code{display:block!important;white-space:pre!important}
  `;
  document.head.appendChild(st);
}

            displayFollowUps(query);



        } catch (error) {

            console.error(
                "[NEXORA AI SEARCH]",
                error
            );

            answer.textContent =
                "NEXORA could not complete this search. Please try again.";

            if (details) {
                details.textContent =
                    error.message || "Search error";
            }
        }
    }

    /* ---------------------------------------------------------
       TAKE CONTROL OF EXISTING SEARCH
       --------------------------------------------------------- */

    createControls();

    if (window.__NEXORA_AI_SEARCH_EVENTS__) return;

    window.__NEXORA_AI_SEARCH_EVENTS__ = true;

    /*
     * Capture phase stops the older basic search handler.
     * Existing code is not deleted.
     */

    if (window.searchButton || $("searchButton")) {

        const button =
            window.searchButton ||
            $("searchButton");

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopImmediatePropagation();

                enhancedSearch(
                    input.value.trim(),
                    false
                );

            },
            true
        );
    }

    input.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") return;

            event.preventDefault();
            event.stopImmediatePropagation();

            enhancedSearch(
                input.value.trim(),
                false
            );

        },
        true
    );

    console.log(
        "[NEXORA AI SEARCH] V1 ACTIVE"
    );

})();









/* ============================================================
   NEXORA_UNIVERSAL_STANDARD_BOOK_CHAPTER_FINAL_V2

   NCERT:
   Exam -> Class -> Subject -> Book -> Chapter

   STANDARD BOOK:
   Exam -> Subject -> Book -> Chapter

   Standard books never require Class.
   Only verified catalogue chapters are exposed.
   ============================================================ */
/* NEXORA LEGACY STANDARD BOOK CHAPTER FINAL: DISABLED — V27 AUTHORITY */
(function(){
  "use strict";
  console.log("NEXORA LEGACY STANDARD BOOK CHAPTER FINAL: DISABLED");
})();




/* NEXORA EXAM STANDARD CLASS ROUTING FINAL V1 */
(function NEXORA_EXAM_STANDARD_CLASS_ROUTING_FINAL_V1(){
  "use strict";

  if(window.__NEXORA_EXAM_STANDARD_CLASS_ROUTING__) return;
  window.__NEXORA_EXAM_STANDARD_CLASS_ROUTING__=true;

  console.log("NEXORA: EXAM -> STANDARD/CLASS ROUTING ACTIVE");

  const STANDARD_NAMES=[
    "r.s. aggarwal","rs aggarwal","r s aggarwal","aggarwal",
    "m. laxmikanth","m laxmikanth","laxmikanth",
    "g.c. leong","gc leong","leong",
    "ramesh singh",
    "spectrum","rajiv ahir",
    "r.s. sharma","rs sharma",
    "shankar ias","shankar"
  ];

  function isStandard(o){
    if(!o) return false;
    const x=((o.value||"")+" "+(o.textContent||"")).toLowerCase();
    return STANDARD_NAMES.some(n=>x.includes(n));
  }

  function el(id){
    return document.getElementById(id);
  }

  function controls(){
    return {
      exam:el("shortNotesExam") || el("exam"),
      cls:el("shortNotesClass") || el("class"),
      subject:el("shortNotesSubject") || el("subject"),
      book:el("shortNotesBook") || el("book"),
      chapter:el("shortNotesChapter") || el("chapter")
    };
  }

  function classBox(cls){
    if(!cls) return null;
    return cls.closest(
      ".selector-group,.form-group,.field,.input-group,.control-group,.selection-group,.select-group"
    ) || cls.parentElement;
  }

  function showClass(cls){
    if(!cls) return;
    cls.disabled=false;
    cls.removeAttribute("data-nexora-not-required");
    const box=classBox(cls);
    if(box) box.style.display="";
  }

  function hideClass(cls){
    if(!cls) return;
    cls.value="";
    cls.disabled=true;
    cls.setAttribute("data-nexora-not-required","true");
    const box=classBox(cls);
    if(box) box.style.display="none";
  }

  function showStandardBooks(book){
    if(!book) return;

    [...book.options].forEach(o=>{
      if(isStandard(o)){
        o.hidden=false;
        o.disabled=false;
        o.style.display="";
      }
    });
  }

  function hideStandardBooks(book){
    if(!book) return;

    [...book.options].forEach(o=>{
      if(isStandard(o)){
        o.hidden=true;
        o.disabled=true;
        o.style.display="none";
      }
    });
  }

  function hasClass(cls){
    return !!String(cls?.value||"").trim();
  }

  function hasStandardBook(book){
    const o=book?.options?.[book.selectedIndex];
    return isStandard(o);
  }

  /*
    IMPORTANT:
    Exam selection alone does NOT mean Class selection.
    Therefore standard books remain available after Exam.
  */
  function examChanged(){
    const c=controls();
    if(!c.exam || !c.book) return;

    if(!hasClass(c.cls) && !hasStandardBook(c.book)){
      showStandardBooks(c.book);
    }

    console.log(
      "NEXORA ROUTE:",
      "Exam selected",
      c.exam.value,
      "| Class required only for Class/NCERT route"
    );
  }

  /*
    CLASS ROUTE:
    Once user explicitly selects Class,
    Standard Book route is disabled.
  */
  function classChanged(){
    const c=controls();
    if(!c.cls || !c.book) return;

    if(hasClass(c.cls)){
      const current=c.book.options?.[c.book.selectedIndex];

      if(isStandard(current)){
        c.book.value="";
      }

      hideStandardBooks(c.book);

      console.log(
        "NEXORA ROUTE: CLASS MODE",
        c.cls.value,
        "| Standard Books disabled"
      );
    }else{
      showStandardBooks(c.book);
    }
  }

  /*
    STANDARD BOOK ROUTE:
    Once user chooses a standard book,
    Class is cleared and hidden.
  */
  function bookChanged(){
    const c=controls();
    if(!c.book) return;

    const standard=hasStandardBook(c.book);

    if(standard){
      hideClass(c.cls);

      console.log(
        "NEXORA ROUTE: STANDARD BOOK MODE",
        c.book.options[c.book.selectedIndex]?.textContent,
        "| Class NOT REQUIRED"
      );
    }else{
      showClass(c.cls);

      if(!hasClass(c.cls)){
        showStandardBooks(c.book);
      }
    }
  }

  function bind(){
    const c=controls();

    if(c.exam && !c.exam.dataset.nexoraExamRouteBound){
      c.exam.dataset.nexoraExamRouteBound="1";
      c.exam.addEventListener("change",()=>{
        setTimeout(examChanged,50);
        setTimeout(examChanged,300);
      },true);
    }

    if(c.cls && !c.cls.dataset.nexoraClassRouteBound){
      c.cls.dataset.nexoraClassRouteBound="1";
      c.cls.addEventListener("change",()=>{
        setTimeout(classChanged,50);
        setTimeout(classChanged,300);
      },true);
    }

    if(c.book && !c.book.dataset.nexoraBookRouteBound){
      c.book.dataset.nexoraBookRouteBound="1";
      c.book.addEventListener("change",()=>{
        setTimeout(bookChanged,50);
        setTimeout(bookChanged,300);
      },true);
    }

    /*
      Existing NEXORA book-loader can rebuild the <option> list.
      Re-apply the correct visibility after every rebuild.
    */
    if(c.book && !c.book.dataset.nexoraRouteObserver){
      c.book.dataset.nexoraRouteObserver="1";

      new MutationObserver(()=>{
        const now=controls();

        if(hasStandardBook(now.book)){
          hideClass(now.cls);
          showStandardBooks(now.book);
        }else if(hasClass(now.cls)){
          hideStandardBooks(now.book);
          showClass(now.cls);
        }else{
          /*
            Exam selected but no Class:
            BOTH routes remain available.
            Standard books must NOT disappear.
          */
          showStandardBooks(now.book);
        }
      }).observe(c.book,{childList:true,subtree:true});
    }

    /*
      Initial state:
      If standard book is selected -> no class.
      If class is selected -> no standard book.
      Otherwise both routes are available.
    */
    const now=controls();

    if(hasStandardBook(now.book)){
      hideClass(now.cls);
    }else if(hasClass(now.cls)){
      hideStandardBooks(now.book);
      showClass(now.cls);
    }else{
      showStandardBooks(now.book);
    }
  }

  function start(){
    bind();
    setTimeout(bind,200);
    setTimeout(bind,500);
    setTimeout(bind,1000);
    setTimeout(bind,2000);
    setTimeout(bind,3000);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }

  window.NEXORAExamStandardClassRouting={
    bind,
    examChanged,
    classChanged,
    bookChanged
  };

})();


/* NEXORA FINAL STANDARD BOOK LOADER WITHOUT CLASS V1 */
(function NEXORA_FINAL_STANDARD_BOOK_LOADER_WITHOUT_CLASS_V1(){
  "use strict";

  if(window.__NEXORA_FINAL_STANDARD_BOOK_LOADER__) return;
  window.__NEXORA_FINAL_STANDARD_BOOK_LOADER__=true;

  console.log("NEXORA: STANDARD BOOK LOADER WITHOUT CLASS ACTIVE");

  const STANDARD_NAMES=[
    "r.s. aggarwal","rs aggarwal","r s aggarwal","aggarwal",
    "m. laxmikanth","m laxmikanth","laxmikanth",
    "g.c. leong","gc leong","leong",
    "ramesh singh",
    "spectrum","rajiv ahir",
    "r.s. sharma","rs sharma",
    "shankar ias","shankar"
  ];

  const $=id=>document.getElementById(id);

  function controls(){
    return {
      exam:$("shortNotesExam")||$("exam"),
      cls:$("shortNotesClass")||$("class"),
      subject:$("shortNotesSubject")||$("subject"),
      book:$("shortNotesBook")||$("book"),
      chapter:$("shortNotesChapter")||$("chapter")
    };
  }

  function norm(v){
    return String(v||"").trim().toLowerCase();
  }

  function isStandard(book){
    const x=norm(
      typeof book==="string"
        ? book
        : ((book?.title||book?.name||book?.book||"")+" "+(book?.author||""))
    );
    return STANDARD_NAMES.some(n=>x.includes(n));
  }

  function selectedText(el){
    if(!el) return "";
    const o=el.options?.[el.selectedIndex];
    return norm((o?.text||el.value||""));
  }

  function examMatches(book,exam){
    if(!exam) return true;

    const ex=book?.exams || book?.exam || book?.targets || book?.targetExams;

    if(!ex) return true;

    const list=Array.isArray(ex)?ex:[ex];
    const e=norm(exam);

    return list.some(x=>{
      const a=norm(x);
      return a===e ||
             a.includes(e) ||
             e.includes(a) ||
             (e.includes("nda") && a.includes("nda")) ||
             (e.includes("upsc") && a.includes("upsc")) ||
             (e.includes("ssc") && a.includes("ssc")) ||
             (e.includes("bank") && a.includes("bank")) ||
             (e.includes("railway") && a.includes("railway")) ||
             (e.includes("rrb") && a.includes("rrb")) ||
             (e.includes("defence") && a.includes("defence"));
    });
  }

  function subjectMatches(book,subject){
    if(!subject) return true;

    const subs=book?.subjects || book?.subject || book?.category;

    if(!subs) return true;

    const list=Array.isArray(subs)?subs:[subs];
    const q=norm(subject);

    return list.some(x=>{
      const a=norm(x);
      return a===q ||
             a.includes(q) ||
             q.includes(a) ||
             (q==="mathematics" && /math|quantitative/.test(a)) ||
             (q==="polity" && /polity/.test(a)) ||
             (q==="geography" && /geography/.test(a)) ||
             (q==="history" && /history/.test(a)) ||
             (q==="economy" && /economy/.test(a)) ||
             (q==="environment" && /environment/.test(a));
    });
  }

  function getLibrary(){
    const lib=window.NEXORAStandardBookLibrary;

    if(Array.isArray(lib)) return lib;

    if(lib && Array.isArray(lib.books)) return lib.books;

    if(lib && typeof lib==="object"){
      return Object.values(lib).flatMap(v=>{
        if(Array.isArray(v)) return v;
        if(v && Array.isArray(v.books)) return v.books;
        return [];
      });
    }

    return [];
  }

  function optionAlready(bookEl,title){
    const q=norm(title);
    return [...bookEl.options].some(o=>norm(o.text)===q);
  }

  function addStandardBooks(bookEl,exam,subject){
    if(!bookEl) return 0;

    const library=getLibrary();

    const books=library.filter(b=>
      isStandard(b) &&
      examMatches(b,exam) &&
      subjectMatches(b,subject)
    );

    let added=0;

    books.forEach(b=>{
      const title=
        b.title ||
        b.book ||
        b.name ||
        b.bookTitle ||
        "";

      if(!title) return;

      if(optionAlready(bookEl,title)) return;

      const o=document.createElement("option");
      o.value=b.value || b.id || title;
      o.textContent=title + (b.author ? " — "+b.author : "");

      try{
        o.dataset.book=JSON.stringify(b);
      }catch(e){}

      o.dataset.nexoraStandardBook="true";
      o.dataset.standardReference="true";

      bookEl.appendChild(o);
      added++;
    });

    return added;
  }

  async function loadBackendStandardBooks(bookEl,exam,subject){
    if(!bookEl) return 0;

    try{
      const urls=[
        "/api/short-notes/universal-catalogue?version=standard-final",
        "/api/short-notes/catalogue?version=standard-final",
        "/api/short-notes/manifest"
      ];

      for(const url of urls){
        try{
          const r=await fetch(url,{cache:"no-store"});
          if(!r.ok) continue;

          const data=await r.json();

          let raw=[];

          if(Array.isArray(data)) raw=data;
          else if(Array.isArray(data.books)) raw=data.books;
          else if(Array.isArray(data.catalogue)) raw=data.catalogue;
          else if(data.__nexoraCatalogue) raw=Object.values(data.__nexoraCatalogue);
          else raw=Object.values(data).flatMap(v=>{
            if(Array.isArray(v)) return v;
            if(v && Array.isArray(v.books)) return v.books;
            return [];
          });

          let added=0;

          raw.forEach(b=>{
            if(!isStandard(b)) return;
            if(!examMatches(b,exam)) return;
            if(!subjectMatches(b,subject)) return;

            const title=b.title||b.book||b.name||b.bookTitle||"";
            if(!title || optionAlready(bookEl,title)) return;

            const o=document.createElement("option");
            o.value=b.value||b.id||title;
            o.textContent=title+(b.author?" — "+b.author:"");
            o.dataset.nexoraStandardBook="true";
            o.dataset.standardReference="true";

            try{o.dataset.book=JSON.stringify(b)}catch(e){}

            bookEl.appendChild(o);
            added++;
          });

          if(added) return added;
        }catch(e){}
      }
    }catch(e){}

    return 0;
  }

  async function rebuildStandardBooks(){
    const c=controls();

    if(!c.book) return;

    const exam=selectedText(c.exam);
    const subject=selectedText(c.subject);
    const classValue=String(c.cls?.value||"").trim();

    /*
      CLASS HAS PRIORITY.
      If Class selected, standard books remain unavailable.
    */
    if(classValue){
      [...c.book.options].forEach(o=>{
        if(isStandard(o)){
          o.hidden=true;
          o.disabled=true;
        }
      });
      return;
    }

    /*
      NO CLASS:
      Standard books MUST be available.
    */
    const existingBefore=c.book.options.length;

    addStandardBooks(c.book,exam,subject);

    if(c.book.options.length===existingBefore){
      await loadBackendStandardBooks(c.book,exam,subject);
    }

    /*
      Make standard books visible.
    */
    [...c.book.options].forEach(o=>{
      if(isStandard(o) || o.dataset.nexoraStandardBook==="true"){
        o.hidden=false;
        o.disabled=false;
        o.style.display="";
      }
    });

    console.log(
      "NEXORA STANDARD BOOKS:",
      c.book.options.length-1,
      "| Exam:",exam,
      "| Subject:",subject,
      "| Class:",classValue||"NOT REQUIRED"
    );
  }

  function bind(){
    const c=controls();

    if(c.exam && !c.exam.dataset.nexoraStdLoader){
      c.exam.dataset.nexoraStdLoader="1";
      c.exam.addEventListener("change",()=>{
        setTimeout(rebuildStandardBooks,100);
        setTimeout(rebuildStandardBooks,500);
        setTimeout(rebuildStandardBooks,1200);
      },true);
    }

    if(c.subject && !c.subject.dataset.nexoraStdLoader){
      c.subject.dataset.nexoraStdLoader="1";
      c.subject.addEventListener("change",()=>{
        setTimeout(rebuildStandardBooks,100);
        setTimeout(rebuildStandardBooks,500);
        setTimeout(rebuildStandardBooks,1200);
      },true);
    }

    if(c.cls && !c.cls.dataset.nexoraStdLoader){
      c.cls.dataset.nexoraStdLoader="1";
      c.cls.addEventListener("change",()=>{
        setTimeout(rebuildStandardBooks,100);
        setTimeout(rebuildStandardBooks,500);
      },true);
    }

    if(c.book && !c.book.dataset.nexoraStdLoader){
      c.book.dataset.nexoraStdLoader="1";

      c.book.addEventListener("change",()=>{
        const o=c.book.options?.[c.book.selectedIndex];

        if(isStandard(o)){
          if(c.cls){
            c.cls.value="";
            c.cls.disabled=true;

            const box=c.cls.closest(
              ".selector-group,.form-group,.field,.input-group,.control-group,.selection-group,.select-group"
            ) || c.cls.parentElement;

            if(box) box.style.display="none";
          }

          o.hidden=false;
          o.disabled=false;

          console.log(
            "NEXORA STANDARD BOOK SELECTED:",
            o.textContent,
            "| CLASS NOT REQUIRED"
          );
        }
      },true);
    }

    rebuildStandardBooks();
  }

  function start(){
    bind();

    [300,700,1200,2000,3000].forEach(ms=>{
      setTimeout(()=>{
        bind();
        rebuildStandardBooks();
      },ms);
    });
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }

  window.NEXORAFinalStandardBookLoader={
    rebuild:rebuildStandardBooks
  };

})();




/* ============================================================
   NEXORA ROOT STANDARD BOOK DIRECT LOADER V3
   Exam -> Subject -> Standard Book -> Chapter
   CLASS IS NOT REQUIRED FOR STANDARD BOOKS
   ============================================================ */
(function(){
  "use strict";

  const MARK="NEXORA ROOT STANDARD BOOK DIRECT LOADER V3";

  const BOOKS=[
    ["R.S. Aggarwal — Quantitative Aptitude","Mathematics","NDA, SSC, Banking, Railway, Defence, Police, Teaching, CDS, AFCAT"],
    ["M. Laxmikanth — Indian Polity","Polity","UPSC, State PSC, SSC, Teaching, Defence, Police, NDA, CDS, CAPF"],
    ["G.C. Leong — Certificate Physical and Human Geography","Geography","UPSC, SSC, NDA, Defence, State PSC, CDS, CAPF"],
    ["Ramesh Singh — Indian Economy","Economy","UPSC, State PSC, SSC, Banking, NDA, CDS, CAPF"],
    ["Spectrum — A Brief History of Modern India","History","UPSC, SSC, NDA, State PSC, Defence, CDS, CAPF"],
    ["R.S. Sharma — India's Ancient Past","History","UPSC, SSC, NDA, State PSC, CDS, CAPF"],
    ["Shankar IAS — Environment","Environment","UPSC, State PSC, SSC, NDA, Defence, CDS, CAPF"]
  ];

  const N=x=>String(x||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();

  function selectByWords(words){
    return [...document.querySelectorAll("select")].find(e=>{
      const x=N([
        e.id,e.name,e.getAttribute("aria-label"),
        e.previousElementSibling?.textContent
      ].join(" "));
      return words.some(w=>x.includes(w));
    });
  }

  function exam(){
    return document.getElementById("shortNotesExam") ||
           selectByWords(["exam"]);
  }

  function subject(){
    return document.getElementById("shortNotesSubject") ||
           selectByWords(["subject"]);
  }

  function cls(){
    return document.getElementById("shortNotesClass") ||
           selectByWords(["class"]);
  }

  function book(){
    return document.getElementById("shortNotesBook") ||
           selectByWords(["book"]);
  }

  function chapter(){
    return document.getElementById("shortNotesChapter") ||
           selectByWords(["chapter"]);
  }

  function matches(item,e,sub){
    const subject=N(sub);
    const exam=N(e);

    const sm=subject==="" ||
      N(item[1]).includes(subject) ||
      subject.includes(N(item[1]));

    const em=exam==="" ||
      item[2].split(",").some(x=>{
        const a=N(x);
        return exam.includes(a) || a.includes(exam);
      });

    return sm && em;
  }

  function load(){
    const b=book();
    if(!b) return;

    const e=exam()?.value||"";
    const sub=subject()?.value||"";
    const c=cls()?.value||"";

    /* Class selected = NCERT/class mode.
       Remove only our generated standard options. */
    if(c){
      [...b.options].forEach(o=>{
        if(o.dataset.nexoraRootStandard==="1") o.remove();
      });
      return;
    }

    const list=BOOKS.filter(x=>matches(x,e,sub));

    /* Remove previous generated options only. */
    [...b.options].forEach(o=>{
      if(o.dataset.nexoraRootStandard==="1") o.remove();
    });

    if(!list.length) return;

    const fragment=document.createDocumentFragment();

    for(const item of list){
      const o=document.createElement("option");
      o.value=item[0];
      o.textContent=item[0];
      o.dataset.nexoraRootStandard="1";
      o.dataset.standardBook="true";
      o.dataset.subject=item[1];
      o.dataset.exams=item[2];
      fragment.appendChild(o);
    }

    b.appendChild(fragment);

    console.log(
      MARK,
      "EXAM:",e,
      "SUBJECT:",sub,
      "BOOKS:",list.map(x=>x[0])
    );
  }

  function bind(){
    [exam(),subject(),cls()].forEach(el=>{
      if(!el || el.dataset.nexoraRootStandardBound==="1") return;

      el.dataset.nexoraRootStandardBound="1";

      el.addEventListener("change",()=>{
        if(el===book()) return;
        load();
      });
    });

    load();
  }

  function start(){
    bind();
    console.log(MARK + ": SAFE ONE-TIME MODE");
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }

})();

/* NEXORA FINAL AUTHORITATIVE CLASS STANDARD ROUTER V1 */
(function(){
  if(window.__NEXORA_FINAL_AUTHORITATIVE_ROUTER__) return;
  window.__NEXORA_FINAL_AUTHORITATIVE_ROUTER__=true;

  console.log("NEXORA: FINAL AUTHORITATIVE CLASS/STANDARD ROUTER ACTIVE");

  function get(id){
    return document.getElementById(id);
  }

  function getBookSelect(){
    return get("shortNotesBook") ||
      document.querySelector('select[id*="Book" i], select[id*="book" i]');
  }

  function isStandardBook(option){
    if(!option) return false;

    const text = String(
      option.dataset?.bookTitle ||
      option.dataset?.book ||
      option.textContent ||
      ""
    ).toLowerCase();

    const standardWords = [
      "bipan chandra",
      "spectrum",
      "rajiv ahir",
      "r.s. sharma",
      "satish chandra",
      "standard",
      "reference",
      "lucent",
      "arihant"
    ];

    return standardWords.some(x => text.includes(x));
  }

  function applyRoute(){
    const cls = get("classSelect");
    const book = getBookSelect();

    if(!cls || !book) return;

    const classValue = String(cls.value || "").trim();
    const selected = book.options?.[book.selectedIndex];
    const bookValue = String(book.value || "").trim();
    const standard = isStandardBook(selected);

    if(classValue){
      if(standard){
        book.value = "";
      }

      book.dataset.nexoraRoute = "NCERT";
      cls.dataset.nexoraRoute = "NCERT";

      console.log("NEXORA ROUTE: NCERT / CLASS MODE");
      return;
    }

    if(bookValue && standard){
      cls.value = "";

      book.dataset.nexoraRoute = "STANDARD";
      cls.dataset.nexoraRoute = "STANDARD";

      console.log("NEXORA ROUTE: STANDARD BOOK / CLASS NOT REQUIRED");
      return;
    }

    book.dataset.nexoraRoute = "";
    cls.dataset.nexoraRoute = "";
  }

  function bind(){
    const cls = get("classSelect");
    const book = getBookSelect();

    if(cls && !cls.dataset.finalAuthoritativeBound){
      cls.dataset.finalAuthoritativeBound = "1";

      cls.addEventListener("change", () => {
        if(cls.value){
          const b = getBookSelect();
          if(b) b.value = "";
        }

        setTimeout(applyRoute, 50);
      });
    }

    if(book && !book.dataset.finalAuthoritativeBound){
      book.dataset.finalAuthoritativeBound = "1";

      book.addEventListener("change", () => {
        const selected = book.options?.[book.selectedIndex];

        if(isStandardBook(selected)){
          if(cls) cls.value = "";
        }

        setTimeout(applyRoute, 50);
      });
    }

    applyRoute();
  }

  document.addEventListener("DOMContentLoaded", bind);
  setTimeout(bind, 300);
  setTimeout(bind, 1000);
  setTimeout(bind, 2000);
})();

/* NEXORA FINAL UNIVERSAL BOOK CHAPTER ROUTER V2 */
(function(){
  if(window.__NEXORA_FINAL_UNIVERSAL_BOOK_CHAPTER_ROUTER_V2__) return;
  window.__NEXORA_FINAL_UNIVERSAL_BOOK_CHAPTER_ROUTER_V2__ = true;

  console.log("NEXORA: UNIVERSAL BOOK/CHAPTER ROUTER V2 ACTIVE");

  function el(id){
    return document.getElementById(id);
  }

  function bookSelect(){
    return el("shortNotesBook") ||
      document.querySelector('select[id*="Book" i], select[id*="book" i]');
  }

  function classSelect(){
    return el("classSelect") ||
      document.querySelector('select[id*="class" i]');
  }

  function subjectSelect(){
    return el("shortNotesSubject") ||
      document.querySelector('select[id*="Subject" i], select[id*="subject" i]');
  }

  function chapterSelect(){
    return el("shortNotesChapter") ||
      document.querySelector('select[id*="Chapter" i], select[id*="chapter" i]');
  }

  function selectedBook(){
    const b = bookSelect();
    return b && b.options ? b.options[b.selectedIndex] : null;
  }

  function isStandardBook(option){
    if(!option) return false;

    const d = option.dataset || {};

    const bookClass = String(
      d.class ||
      d.classLabel ||
      d.standardClass ||
      ""
    ).trim();

    const text = String(
      d.bookTitle ||
      d.book ||
      d.title ||
      option.textContent ||
      ""
    ).toLowerCase();

    /*
     * UNIVERSAL RULE:
     * If a book option has no class metadata, it is treated as
     * Standard/Reference mode.
     *
     * NCERT/class books normally carry class metadata.
     */
    if(!bookClass) return true;

    const standardWords = [
      "bipan chandra",
      "spectrum",
      "rajiv ahir",
      "r.s. sharma",
      "satish chandra",
      "lucent",
      "arihant",
      "reference",
      "standard book",
      "standard/reference"
    ];

    return standardWords.some(x => text.includes(x));
  }

  function hideClassForStandard(){
    const cls = classSelect();
    if(!cls) return;

    const wrap =
      cls.closest(".form-group") ||
      cls.closest(".selector-group") ||
      cls.closest(".field") ||
      cls.parentElement;

    if(wrap){
      wrap.dataset.nexoraClassMode = "standard-hidden";
      wrap.style.display = "none";
    }

    cls.dataset.nexoraHiddenForStandard = "1";
    cls.value = "";
  }

  function showClassForNCERT(){
    const cls = classSelect();
    if(!cls) return;

    const wrap =
      cls.closest(".form-group") ||
      cls.closest(".selector-group") ||
      cls.closest(".field") ||
      cls.parentElement;

    if(wrap && wrap.dataset.nexoraClassMode === "standard-hidden"){
      wrap.style.display = "";
      delete wrap.dataset.nexoraClassMode;
    }

    cls.dataset.nexoraHiddenForStandard = "0";
  }

  function applyMode(){
    const cls = classSelect();
    const book = bookSelect();

    if(!cls || !book) return;

    const option = selectedBook();
    const hasBook = String(book.value || "").trim() !== "";
    const standard = hasBook && isStandardBook(option);

    if(standard){
      hideClassForStandard();

      book.dataset.nexoraRoute = "STANDARD";
      cls.dataset.nexoraRoute = "STANDARD";

      console.log("NEXORA ROUTE: STANDARD BOOK -> CLASS NOT REQUIRED");
    }else{
      showClassForNCERT();

      book.dataset.nexoraRoute = "NCERT";
      cls.dataset.nexoraRoute = "NCERT";

      if(cls.value){
        console.log("NEXORA ROUTE: CLASS/NCERT -> STANDARD BOOK DISABLED");
      }
    }
  }

  async function universalLoadChapters(){
    const book = bookSelect();
    const chapter = chapterSelect();
    const subject = subjectSelect();
    const cls = classSelect();

    if(!book || !chapter || !book.value) return;

    const option = selectedBook();
    const standard = isStandardBook(option);

    const params = new URLSearchParams();

    /*
     * STANDARD BOOK:
     * NEVER send class.
     */
    if(!standard && cls && cls.value){
      params.set("class", cls.value);
    }

    if(subject && subject.value){
      params.set("subject", subject.value);
    }

    params.set("book", book.value);

    const title = String(
      option?.dataset?.bookTitle ||
      option?.dataset?.title ||
      option?.textContent ||
      book.value ||
      ""
    ).replace(/\s+—\s+.*$/, "").trim();

    if(title){
      params.set("bookTitle", title);
    }

    chapter.innerHTML = '<option value="">Loading chapters...</option>';
    chapter.disabled = true;

    try{
      const url = "/api/short-notes/chapters?" + params.toString();
      console.log("NEXORA CHAPTER REQUEST:", url);

      const res = await fetch(url);
      const data = await res.json();

      const chapters = Array.isArray(data.chapters)
        ? data.chapters
        : Array.isArray(data.data)
          ? data.data
          : [];

      chapter.innerHTML = "";

      if(!chapters.length){
        chapter.innerHTML = '<option value="">No chapters found</option>';

        /*
         * If a standard book returned nothing, retry once without
         * subject/class restrictions using only book identity.
         */
        if(standard && (subject?.value || cls?.value)){
          try{
            const retry = await fetch(
              "/api/short-notes/chapters?book=" +
              encodeURIComponent(book.value) +
              "&bookTitle=" +
              encodeURIComponent(title)
            );

            const retryData = await retry.json();

            const retryChapters = Array.isArray(retryData.chapters)
              ? retryData.chapters
              : Array.isArray(retryData.data)
                ? retryData.data
                : [];

            if(retryChapters.length){
              chapter.innerHTML = "";
              retryChapters.forEach((item, i) => {
                const value =
                  typeof item === "string"
                    ? item
                    : item.id || item.chapter || item.title || item.name || "";

                const label =
                  typeof item === "string"
                    ? item
                    : item.title || item.chapter || item.name || item.id || "";

                if(value){
                  const opt = document.createElement("option");
                  opt.value = value;
                  opt.textContent = (i + 1) + ". " + label;
                  chapter.appendChild(opt);
                }
              });
            }
          }catch(e){
            console.warn("NEXORA STANDARD BOOK RETRY FAILED:", e);
          }
        }
      }else{
        chapters.forEach((item, i) => {
          const value =
            typeof item === "string"
              ? item
              : item.id || item.chapter || item.title || item.name || "";

          const label =
            typeof item === "string"
              ? item
              : item.title || item.chapter || item.name || item.id || "";

          if(value){
            const opt = document.createElement("option");
            opt.value = value;
            opt.textContent = (i + 1) + ". " + label;
            chapter.appendChild(opt);
          }
        });
      }

      chapter.disabled = false;

      console.log(
        "NEXORA CHAPTERS:",
        chapter.options.length,
        "MODE:",
        standard ? "STANDARD" : "NCERT"
      );

    }catch(err){
      console.error("NEXORA CHAPTER LOAD FAILED:", err);
      chapter.innerHTML = '<option value="">Unable to load chapters</option>';
      chapter.disabled = false;
    }
  }

  function bind(){
    const cls = classSelect();
    const book = bookSelect();

    if(cls && !cls.dataset.nexoraUniversalV2){
      cls.dataset.nexoraUniversalV2 = "1";

      cls.addEventListener("change", function(){
        if(cls.value){
          const b = bookSelect();

          if(b){
            const selected = b.options?.[b.selectedIndex];

            /*
             * Selecting Class means NCERT mode.
             * Clear any Standard/Reference Book.
             */
            if(isStandardBook(selected)){
              b.value = "";
            }
          }
        }

        setTimeout(applyMode, 30);
      });
    }

    if(book && !book.dataset.nexoraUniversalV2){
      book.dataset.nexoraUniversalV2 = "1";

      book.addEventListener("change", function(){
        const selected = book.options?.[book.selectedIndex];

        if(isStandardBook(selected) && book.value){
          /*
           * Standard Book -> Class is automatically cleared.
           */
          const c = classSelect();
          if(c) c.value = "";
        }

        setTimeout(applyMode, 30);
        setTimeout(universalLoadChapters, 80);
        setTimeout(universalLoadChapters, 500);
      });
    }

    applyMode();

    /*
     * If another old loader changes the book/chapter state,
     * our universal controller gets another chance.
     */
    setTimeout(applyMode, 300);
    setTimeout(applyMode, 1000);
    setTimeout(applyMode, 2000);
  }

  document.addEventListener("DOMContentLoaded", bind);
  setTimeout(bind, 300);
  setTimeout(bind, 1000);
  setTimeout(bind, 2000);
})();


/* NEXORA FINAL STANDARD BOOK NO CLASS V3 */
(function(){
  if(window.__NEXORA_STANDARD_BOOK_NO_CLASS_V3__) return;
  window.__NEXORA_STANDARD_BOOK_NO_CLASS_V3__=true;

  function getBook(){
    return document.getElementById('shortNotesBook') ||
      document.querySelector('select[id*="book" i]');
  }

  function getClass(){
    return document.getElementById('classSelect') ||
      document.querySelector('select[id*="class" i]');
  }

  function isStandard(opt){
    if(!opt) return false;
    const d=opt.dataset||{};
    const text=String(
      d.bookTitle||d.title||d.book||opt.textContent||''
    ).toLowerCase();

    const cls=String(
      d.class||d.classLabel||d.standardClass||''
    ).trim();

    if(!cls) return true;

    return [
      'laxmikanth',
      'm. laxmikanth',
      'bipan chandra',
      'spectrum',
      'rajiv ahir',
      'r.s. sharma',
      'g.c. leong',
      'ramesh singh',
      'shankar ias',
      'lucent',
      'arihant',
      'reference',
      'standard book'
    ].some(x=>text.includes(x));
  }

  function classContainer(cls){
    return cls &&
      (cls.closest('.form-group') ||
       cls.closest('.selector-group') ||
       cls.closest('.field') ||
       cls.parentElement);
  }

  function apply(){
    const b=getBook(), c=getClass();
    if(!b||!c) return;

    const opt=b.options?.[b.selectedIndex];
    const hasBook=String(b.value||'').trim()!=='';

    if(hasBook && isStandard(opt)){
      /*
       * STANDARD/REFERENCE BOOK MODE
       * Class is never required.
       */
      c.value='';
      c.removeAttribute('required');

      const container=classContainer(c);
      if(container){
        container.style.display='none';
        container.dataset.nexoraStandardBookHidden='1';
      }

      b.dataset.nexoraMode='STANDARD';
      c.dataset.nexoraMode='STANDARD';

      console.log('NEXORA: STANDARD BOOK -> CLASS NOT REQUIRED');
    }else{
      /*
       * NCERT/CLASS MODE
       */
      const container=classContainer(c);

      if(container && container.dataset.nexoraStandardBookHidden==='1'){
        container.style.display='';
        delete container.dataset.nexoraStandardBookHidden;
      }

      b.dataset.nexoraMode='NCERT';
      c.dataset.nexoraMode='NCERT';

      console.log('NEXORA: NCERT -> CLASS MODE');
    }
  }

  function protectBook(){
    const b=getBook(), c=getClass();
    if(!b) return;

    b.addEventListener('change',function(){
      const selectedValue=b.value;
      const opt=b.options?.[b.selectedIndex];

      if(selectedValue && isStandard(opt)){
        if(c) c.value='';
        apply();

        /*
         * Prevent old loaders from replacing the selected book.
         */
        const keep=selectedValue;
        const keepOpt=opt;

        setTimeout(()=>{
          if(b.value!==keep && [...b.options].some(o=>o.value===keep)){
            b.value=keep;
            if(keepOpt && b.options[b.selectedIndex]!==keepOpt){
              const idx=[...b.options].findIndex(o=>o.value===keep);
              if(idx>=0) b.selectedIndex=idx;
            }
          }
          apply();
        },100);

        setTimeout(()=>{
          if(b.value!==keep && [...b.options].some(o=>o.value===keep)){
            b.value=keep;
          }
          apply();
        },500);

        setTimeout(()=>{
          if(b.value!==keep && [...b.options].some(o=>o.value===keep)){
            b.value=keep;
          }
          apply();
        },1200);
      }else{
        setTimeout(apply,50);
      }
    },true);

    if(c){
      c.addEventListener('change',function(){
        /*
         * If a standard book is already selected,
         * Class selection is ignored and cleared.
         */
        const opt=b.options?.[b.selectedIndex];
        if(b.value && isStandard(opt)){
          c.value='';
          apply();
        }
      },true);
    }

    apply();
  }

  document.addEventListener('DOMContentLoaded',protectBook);
  setTimeout(protectBook,300);
  setTimeout(protectBook,1000);
  setTimeout(protectBook,2000);
})();

/* NEXORA FINAL EXAM BOOK SELECTION GUARD V1 */
(function(){
  if(window.__NEXORA_FINAL_EXAM_BOOK_SELECTION_GUARD_V1__) return;
  window.__NEXORA_FINAL_EXAM_BOOK_SELECTION_GUARD_V1__=true;

  console.log("NEXORA: EXAM -> BOOK SELECTION GUARD ACTIVE");

  let lockedBookValue="";
  let lockedBookTitle="";

  function getBook(){
    return document.getElementById("shortNotesBook") ||
      document.querySelector('select[id*="book" i]');
  }

  function getClass(){
    return document.getElementById("classSelect") ||
      document.querySelector('select[id*="class" i]');
  }

  function isStandard(opt){
    if(!opt) return false;
    const d=opt.dataset||{};
    const text=String(
      d.bookTitle||d.title||d.book||opt.textContent||""
    ).toLowerCase();

    const cls=String(
      d.class||d.classLabel||d.standardClass||""
    ).trim();

    if(!cls) return true;

    return [
      "laxmikanth",
      "bipan chandra",
      "spectrum",
      "rajiv ahir",
      "r.s. sharma",
      "g.c. leong",
      "ramesh singh",
      "shankar ias",
      "lucent",
      "arihant",
      "reference",
      "standard book"
    ].some(x=>text.includes(x));
  }

  function lockCurrentBook(){
    const b=getBook();
    if(!b || !b.value) return;

    const opt=b.options?.[b.selectedIndex];

    if(isStandard(opt)){
      lockedBookValue=b.value;
      lockedBookTitle=String(
        opt?.dataset?.bookTitle ||
        opt?.dataset?.title ||
        opt?.textContent ||
        ""
      ).trim();

      console.log(
        "NEXORA BOOK LOCKED:",
        lockedBookValue,
        lockedBookTitle
      );
    }
  }

  function restoreBook(){
    const b=getBook();
    if(!b || !lockedBookValue) return;

    const options=[...b.options];

    let opt=options.find(o=>o.value===lockedBookValue);

    if(!opt && lockedBookTitle){
      const wanted=lockedBookTitle.toLowerCase();

      opt=options.find(o=>{
        const text=String(
          o.dataset?.bookTitle ||
          o.dataset?.title ||
          o.textContent ||
          ""
        ).toLowerCase();

        return text.includes(wanted) || wanted.includes(text);
      });
    }

    if(opt){
      b.value=opt.value;

      if(b.value!==lockedBookValue){
        const idx=options.indexOf(opt);
        if(idx>=0) b.selectedIndex=idx;
      }

      b.dataset.nexoraLockedBook="1";

      const c=getClass();

      /*
       * Standard book = class is never required.
       */
      if(isStandard(opt) && c){
        c.value="";
        c.removeAttribute("required");

        const wrap=
          c.closest(".form-group") ||
          c.closest(".selector-group") ||
          c.closest(".field") ||
          c.parentElement;

        if(wrap){
          wrap.style.display="none";
          wrap.dataset.nexoraStandardBookHidden="1";
        }
      }

      console.log("NEXORA BOOK RESTORED:",b.value);
    }
  }

  function watchBook(){
    const b=getBook();
    if(!b || b.dataset.nexoraExamGuardBound) return;

    b.dataset.nexoraExamGuardBound="1";

    b.addEventListener("change",function(){
      if(b.value){
        lockCurrentBook();

        setTimeout(restoreBook,50);
        setTimeout(restoreBook,200);
        setTimeout(restoreBook,700);
        setTimeout(restoreBook,1500);
      }
    },true);

    /*
     * Old loaders may rebuild the entire <select>.
     * Observe those changes and restore the selected book.
     */
    const observer=new MutationObserver(()=>{
      if(lockedBookValue){
        setTimeout(restoreBook,20);
        setTimeout(restoreBook,150);
      }
    });

    observer.observe(b,{childList:true,subtree:true});
  }

  function watchExam(){
    const selects=[...document.querySelectorAll("select")];

    selects.forEach(exam=>{
      const text=String(
        exam.id+" "+
        exam.name+" "+
        exam.getAttribute("aria-label")+" "+
        exam.previousElementSibling?.textContent
      ).toLowerCase();

      if(
        text.includes("exam") &&
        !exam.dataset.nexoraExamBookGuard
      ){
        exam.dataset.nexoraExamBookGuard="1";

        exam.addEventListener("change",function(){
          console.log(
            "NEXORA EXAM CHANGED -> PRESERVING BOOK:",
            lockedBookValue
          );

          /*
           * Give existing Exam/Subject loaders time to rebuild.
           * Then restore the previously selected Standard Book.
           */
          setTimeout(restoreBook,50);
          setTimeout(restoreBook,200);
          setTimeout(restoreBook,500);
          setTimeout(restoreBook,1000);
          setTimeout(restoreBook,1800);
        },true);
      }
    });
  }

  function start(){
    watchBook();
    watchExam();

    setTimeout(watchBook,300);
    setTimeout(watchExam,300);
    setTimeout(watchBook,1000);
    setTimeout(watchExam,1000);
    setTimeout(watchBook,2000);
    setTimeout(watchExam,2000);
  }

  document.addEventListener("DOMContentLoaded",start);
  setTimeout(start,300);
  setTimeout(start,1000);
  setTimeout(start,2000);
})();

/* NEXORA FINAL EXAM SUBJECT BOOK LOADER V2 */
(function(){
  if(window.__NEXORA_FINAL_EXAM_SUBJECT_BOOK_LOADER_V2__) return;
  window.__NEXORA_FINAL_EXAM_SUBJECT_BOOK_LOADER_V2__=true;

  console.log("NEXORA: FINAL EXAM -> SUBJECT -> BOOK LOADER V2 ACTIVE");

  function findSelect(type){
    const ids={
      exam:[
        "shortNotesExam",
        "examSelect"
      ],
      subject:[
        "shortNotesSubject",
        "subjectSelect"
      ],
      book:[
        "shortNotesBook",
        "bookSelect"
      ],
      cls:[
        "classSelect"
      ],
      chapter:[
        "shortNotesChapter",
        "chapterSelect"
      ]
    };

    for(const id of (ids[type]||[])){
      const e=document.getElementById(id);
      if(e) return e;
    }

    const all=[...document.querySelectorAll("select")];

    return all.find(e=>{
      const x=String(
        e.id+" "+
        e.name+" "+
        e.getAttribute("aria-label")+" "+
        e.previousElementSibling?.textContent
      ).toLowerCase();

      return type==="exam" ? x.includes("exam") :
             type==="subject" ? x.includes("subject") :
             type==="book" ? x.includes("book") :
             type==="cls" ? x.includes("class") :
             type==="chapter" ? x.includes("chapter") : false;
    });
  }

  function getExam(){return findSelect("exam");}
  function getSubject(){return findSelect("subject");}
  function getBook(){return findSelect("book");}
  function getClass(){return findSelect("cls");}
  function getChapter(){return findSelect("chapter");}

  function isStandardBook(opt){
    if(!opt) return false;

    const d=opt.dataset||{};
    const text=String(
      d.bookTitle||
      d.title||
      d.book||
      opt.textContent||
      ""
    ).toLowerCase();

    const cls=String(
      d.class||
      d.classLabel||
      d.standardClass||
      ""
    ).trim();

    if(!cls) return true;

    return [
      "laxmikanth",
      "m. laxmikanth",
      "bipan chandra",
      "spectrum",
      "rajiv ahir",
      "r.s. sharma",
      "g.c. leong",
      "ramesh singh",
      "shankar ias",
      "lucent",
      "arihant",
      "reference",
      "standard book"
    ].some(x=>text.includes(x));
  }

  function hideClass(){
    const c=getClass();
    if(!c) return;

    c.value="";
    c.removeAttribute("required");

    const wrap=
      c.closest(".form-group")||
      c.closest(".selector-group")||
      c.closest(".field")||
      c.parentElement;

    if(wrap){
      wrap.style.display="none";
      wrap.dataset.nexoraStandardMode="1";
    }
  }

  function showClass(){
    const c=getClass();
    if(!c) return;

    const wrap=
      c.closest(".form-group")||
      c.closest(".selector-group")||
      c.closest(".field")||
      c.parentElement;

    if(wrap && wrap.dataset.nexoraStandardMode==="1"){
      wrap.style.display="";
      delete wrap.dataset.nexoraStandardMode;
    }
  }

  /*
   * Preserve the currently selected book whenever Exam/Subject
   * changes or an old loader rebuilds the options.
   */
  let savedBookValue="";
  let savedBookText="";

  function rememberBook(){
    const b=getBook();
    if(!b || !b.value) return;

    const o=b.options?.[b.selectedIndex];
    if(!o) return;

    savedBookValue=b.value;
    savedBookText=String(
      o.dataset?.bookTitle||
      o.dataset?.title||
      o.textContent||
      ""
    ).trim();

    console.log("NEXORA BOOK MEMORY:",savedBookText);
  }

  function restoreBook(){
    const b=getBook();
    if(!b || !savedBookValue) return;

    let o=[...b.options].find(x=>x.value===savedBookValue);

    if(!o && savedBookText){
      const wanted=savedBookText.toLowerCase();

      o=[...b.options].find(x=>{
        const t=String(
          x.dataset?.bookTitle||
          x.dataset?.title||
          x.textContent||
          ""
        ).toLowerCase();

        return t===wanted ||
          t.includes(wanted) ||
          wanted.includes(t);
      });
    }

    if(o){
      b.value=o.value;

      if(isStandardBook(o)){
        hideClass();
      }else{
        showClass();
      }

      console.log("NEXORA BOOK RESTORED:",o.textContent.trim());
    }
  }

  function protectBook(){
    const b=getBook();
    if(!b || b.dataset.nexoraLoaderV2) return;

    b.dataset.nexoraLoaderV2="1";

    b.addEventListener("change",()=>{
      rememberBook();

      setTimeout(restoreBook,50);
      setTimeout(restoreBook,150);
      setTimeout(restoreBook,400);
      setTimeout(restoreBook,800);
      setTimeout(restoreBook,1500);
    },true);

    const observer=new MutationObserver(()=>{
      if(savedBookValue){
        setTimeout(restoreBook,30);
        setTimeout(restoreBook,150);
      }
    });

    observer.observe(b,{childList:true,subtree:true});
  }

  function protectExamAndSubject(){
    const exam=getExam();
    const subject=getSubject();

    [exam,subject].forEach(sel=>{
      if(!sel || sel.dataset.nexoraLoaderV2) return;

      sel.dataset.nexoraLoaderV2="1";

      sel.addEventListener("change",()=>{
        console.log(
          "NEXORA SELECTION CHANGED:",
          sel.value,
          "BOOK MEMORY:",
          savedBookText
        );

        /*
         * Let the original catalogue loader populate books.
         * Then restore selected Standard Book if it still exists.
         */
        setTimeout(protectBook,100);
        setTimeout(restoreBook,200);
        setTimeout(restoreBook,500);
        setTimeout(restoreBook,1000);
        setTimeout(restoreBook,1800);
      },true);
    });
  }

  function classAndBookRule(){
    const b=getBook();
    const c=getClass();

    if(!b || !c) return;

    const o=b.options?.[b.selectedIndex];

    if(b.value && isStandardBook(o)){
      hideClass();
    }else{
      showClass();
    }
  }

  function start(){
    protectBook();
    protectExamAndSubject();
    classAndBookRule();

    setTimeout(protectBook,300);
    setTimeout(protectExamAndSubject,300);
    setTimeout(classAndBookRule,300);

    setTimeout(protectBook,1000);
    setTimeout(protectExamAndSubject,1000);
    setTimeout(classAndBookRule,1000);

    setTimeout(protectBook,2000);
    setTimeout(protectExamAndSubject,2000);
    setTimeout(classAndBookRule,2000);
  }

  document.addEventListener("DOMContentLoaded",start);
  setTimeout(start,300);
  setTimeout(start,1000);
  setTimeout(start,2000);
})();

/* NEXORA FINAL UNIVERSAL SHORT NOTES FLOW V3 */
(function(){
  if(window.__NEXORA_FINAL_UNIVERSAL_SHORT_NOTES_FLOW_V3__) return;
  window.__NEXORA_FINAL_UNIVERSAL_SHORT_NOTES_FLOW_V3__=true;

  console.log("========================================");
  console.log("NEXORA FINAL UNIVERSAL SHORT NOTES FLOW V3");
  console.log("NCERT: CLASS -> SUBJECT -> BOOK -> CHAPTER");
  console.log("STANDARD: SUBJECT -> BOOK -> CHAPTER");
  console.log("EXAM: OPTIONAL IN BOTH MODES");
  console.log("CLASS: REQUIRED ONLY FOR NCERT");
  console.log("STANDARD BOOK: CLASS NOT REQUIRED");
  console.log("EXAM CHANGE: NO BOOK RESET");
  console.log("========================================");

  const qs=(sels)=>{
    for(const s of sels){
      const e=document.querySelector(s);
      if(e) return e;
    }
    return null;
  };

  function exam(){
    return qs([
      "#shortNotesExam",
      "#examSelect",
      "select[name='exam']"
    ]);
  }

  function cls(){
    return qs([
      "#shortNotesClass",
      "#classSelect",
      "select[name='class']"
    ]);
  }

  function subject(){
    return qs([
      "#shortNotesSubject",
      "#subjectSelect",
      "select[name='subject']"
    ]);
  }

  function book(){
    return qs([
      "#shortNotesBook",
      "#bookSelect",
      "select[name='book']"
    ]);
  }

  function chapter(){
    return qs([
      "#shortNotesChapter",
      "#chapterSelect",
      "select[name='chapter']"
    ]);
  }

  function selectedBook(){
    const b=book();
    if(!b || !b.value) return null;
    return b.options[b.selectedIndex] || null;
  }

  function isNCERT(){
    const b=selectedBook();
    const c=cls();

    if(c && c.value) return true;

    if(!b) return false;

    const text=String(
      b.dataset?.bookTitle ||
      b.dataset?.title ||
      b.textContent ||
      ""
    ).toLowerCase();

    return (
      text.includes("ncert") ||
      text.includes("mathematics") && text.includes("class") ||
      text.includes("science") && text.includes("class") ||
      text.includes("social science") ||
      text.includes("india and the contemporary world") ||
      text.includes("democratic politics") ||
      text.includes("contemporary india")
    );
  }

  function standardSelected(){
    const b=selectedBook();
    if(!b) return false;

    const text=String(
      b.dataset?.bookTitle ||
      b.dataset?.title ||
      b.textContent ||
      ""
    ).toLowerCase();

    return [
      "laxmikanth",
      "m. laxmikanth",
      "bipan chandra",
      "spectrum",
      "rajiv ahir",
      "r.s. sharma",
      "r. s. sharma",
      "g.c. leong",
      "ramesh singh",
      "shankar ias",
      "lucent",
      "arihant",
      "rs aggarwal",
      "r.s. aggarwal"
    ].some(x=>text.includes(x));
  }

  function setRequired(el,on){
    if(!el) return;
    if(on) el.setAttribute("required","required");
    else el.removeAttribute("required");
  }

  function wrapper(el){
    if(!el) return null;
    return (
      el.closest(".form-group") ||
      el.closest(".selector-group") ||
      el.closest(".field") ||
      el.parentElement
    );
  }

  function applyMode(){
    const c=cls();
    const b=book();

    if(!c) return;

    if(standardSelected()){
      c.value="";
      setRequired(c,false);

      const w=wrapper(c);
      if(w) w.style.display="none";

      console.log("NEXORA MODE: STANDARD");
      console.log("CLASS: OPTIONAL / HIDDEN");
      return;
    }

    const w=wrapper(c);
    if(w) w.style.display="";

    /*
     * NCERT mode:
     * Class is required.
     */
    if(isNCERT()){
      setRequired(c,true);
      console.log("NEXORA MODE: NCERT");
      console.log("CLASS: REQUIRED");
    }else{
      setRequired(c,false);
      console.log("NEXORA MODE: UNIVERSAL");
    }
  }

  /*
   * Exam is metadata/filter only.
   * It must NEVER force Class and must NEVER destroy
   * the Subject -> Book -> Chapter flow.
   */
  function examGuard(){
    const e=exam();
    if(!e || e.dataset.nexoraFinalFlow) return;

    e.dataset.nexoraFinalFlow="1";

    e.addEventListener("change",()=>{
      console.log("NEXORA EXAM: OPTIONAL");

      const b=book();
      const oldValue=b?.value || "";

      setTimeout(()=>{
        const bb=book();

        if(bb && oldValue){
          const opt=[...bb.options].find(x=>x.value===oldValue);
          if(opt) bb.value=oldValue;
        }

        applyMode();
      },100);

      setTimeout(applyMode,500);
      setTimeout(applyMode,1200);
    },true);
  }

  function subjectGuard(){
    const sub=subject();
    if(!sub || sub.dataset.nexoraFinalFlow) return;

    sub.dataset.nexoraFinalFlow="1";

    sub.addEventListener("change",()=>{
      console.log("NEXORA SUBJECT: BOOK AVAILABLE");
      setTimeout(applyMode,100);
      setTimeout(applyMode,500);
    },true);
  }

  function bookGuard(){
    const b=book();
    if(!b || b.dataset.nexoraFinalFlow) return;

    b.dataset.nexoraFinalFlow="1";

    b.addEventListener("change",()=>{
      applyMode();

      const ch=chapter();

      /*
       * Do not touch chapter value here.
       * Existing universal chapter loader handles it.
       */
      if(ch){
        setTimeout(()=>{
          if(b.value){
            ch.disabled=false;
          }
        },300);
      }
    },true);

    new MutationObserver(()=>{
      setTimeout(applyMode,50);
    }).observe(b,{childList:true,subtree:true});
  }

  function classGuard(){
    const c=cls();
    if(!c || c.dataset.nexoraFinalFlow) return;

    c.dataset.nexoraFinalFlow="1";

    c.addEventListener("change",()=>{
      if(!c.value) return;

      /*
       * NCERT path:
       * CLASS -> SUBJECT -> BOOK -> CHAPTER
       */
      const b=book();

      if(b){
        b.value="";
      }

      const ch=chapter();
      if(ch){
        ch.value="";
      }

      setRequired(c,true);

      console.log("NEXORA NCERT FLOW: CLASS -> SUBJECT -> BOOK -> CHAPTER");

      setTimeout(applyMode,100);
      setTimeout(applyMode,500);
    },true);
  }

  function boot(){
    examGuard();
    classGuard();
    subjectGuard();
    bookGuard();
    applyMode();
  }

  document.addEventListener("DOMContentLoaded",boot);

  /*
   * Existing Short Notes UI creates/rebuilds selectors dynamically,
   * so reconnect guards after every loader cycle.
   */
  [200,500,1000,2000,3500].forEach(ms=>{
    setTimeout(boot,ms);
  });

})();

/* NEXORA FINAL STANDARD EXAM BOOK CHAPTER FLOW V4 */
(function(){
  if(window.__NEXORA_FINAL_STANDARD_EXAM_BOOK_CHAPTER_V4__) return;
  window.__NEXORA_FINAL_STANDARD_EXAM_BOOK_CHAPTER_V4__=true;

  console.log("========================================");
  console.log("NEXORA STANDARD BOOK FINAL FLOW V4");
  console.log("STANDARD = EXAM -> BOOK -> CHAPTER");
  console.log("CLASS = NOT REQUIRED");
  console.log("NCERT FLOW = UNCHANGED");
  console.log("========================================");

  function get(type){
    const ids={
      exam:["shortNotesExam","examSelect"],
      cls:["shortNotesClass","classSelect"],
      subject:["shortNotesSubject","subjectSelect"],
      book:["shortNotesBook","bookSelect"],
      chapter:["shortNotesChapter","chapterSelect"]
    };

    for(const id of ids[type]||[]){
      const e=document.getElementById(id);
      if(e) return e;
    }

    return [...document.querySelectorAll("select")].find(e=>{
      const t=(
        e.id+" "+
        e.name+" "+
        e.getAttribute("aria-label")+" "+
        e.parentElement?.textContent?.slice(0,120)
      ).toLowerCase();

      return type==="exam" ? t.includes("exam") :
             type==="cls" ? t.includes("class") :
             type==="subject" ? t.includes("subject") :
             type==="book" ? t.includes("book") :
             type==="chapter" ? t.includes("chapter") : false;
    });
  }

  const exam=()=>get("exam");
  const cls=()=>get("cls");
  const subject=()=>get("subject");
  const book=()=>get("book");
  const chapter=()=>get("chapter");

  function classWrapper(){
    const c=cls();
    if(!c) return null;
    return c.closest(".form-group") ||
           c.closest(".selector-group") ||
           c.closest(".field") ||
           c.parentElement;
  }

  function hideClassForStandard(){
    const c=cls();
    if(!c) return;

    c.value="";
    c.removeAttribute("required");

    const w=classWrapper();
    if(w){
      w.style.display="none";
      w.dataset.nexoraStandardExamFlow="1";
    }

    console.log("NEXORA STANDARD: CLASS NOT REQUIRED");
  }

  function restoreClassForNCERT(){
    const w=classWrapper();

    if(w && w.dataset.nexoraStandardExamFlow==="1"){
      w.style.display="";
      delete w.dataset.nexoraStandardExamFlow;
    }

    const c=cls();
    if(c) c.removeAttribute("required");
  }

  function standardText(){
    const b=book();
    if(!b || !b.value) return "";

    const o=b.options[b.selectedIndex];
    return String(
      o?.dataset?.bookTitle ||
      o?.dataset?.title ||
      o?.textContent ||
      ""
    ).toLowerCase();
  }

  function isStandard(){
    const t=standardText();

    if(!t) return false;

    return [
      "laxmikanth",
      "m. laxmikanth",
      "bipan chandra",
      "spectrum",
      "rajiv ahir",
      "r.s. sharma",
      "r. s. sharma",
      "g.c. leong",
      "ramesh singh",
      "shankar ias",
      "lucent",
      "arihant",
      "r.s. aggarwal",
      "rs aggarwal",
      "standard",
      "reference"
    ].some(x=>t.includes(x));
  }

  /*
   * Standard mode starts as soon as the user chooses
   * a standard/reference book.
   */
  function applyBookMode(){
    if(isStandard()){
      hideClassForStandard();
    }else{
      restoreClassForNCERT();
    }
  }

  /*
   * IMPORTANT:
   * When Exam is selected, do NOT force Class.
   * Standard books must remain accessible directly.
   */
  function examFlow(){
    const e=exam();
    if(!e || e.dataset.nexoraStandardV4) return;

    e.dataset.nexoraStandardV4="1";

    e.addEventListener("change",()=>{
      console.log("NEXORA EXAM SELECTED: STANDARD BOOK MODE READY");

      /*
       * Clear Class only for the Standard Book path.
       * Existing NCERT class flow remains available until
       * a standard book is actually selected.
       */
      const b=book();

      if(!b || !b.value){
        hideClassForStandard();
      }

      /*
       * Allow existing book loaders to rebuild the list.
       * Re-apply the standard rule after they finish.
       */
      [100,300,700,1200,2000].forEach(ms=>{
        setTimeout(()=>{
          const bb=book();

          if(bb && bb.value && isStandard()){
            hideClassForStandard();
          }else if(bb && (!bb.value)){
            hideClassForStandard();
          }

          console.log(
            "NEXORA STANDARD FLOW:",
            "EXAM -> BOOK -> CHAPTER"
          );
        },ms);
      });
    },true);
  }

  function bookFlow(){
    const b=book();
    if(!b || b.dataset.nexoraStandardV4) return;

    b.dataset.nexoraStandardV4="1";

    b.addEventListener("change",()=>{
      if(isStandard()){
        hideClassForStandard();

        const ch=chapter();
        if(ch){
          ch.disabled=false;
        }

        console.log("NEXORA STANDARD BOOK SELECTED");
        console.log("FLOW = EXAM -> BOOK -> CHAPTER");
      }else{
        restoreClassForNCERT();
      }
    },true);

    new MutationObserver(()=>{
      setTimeout(applyBookMode,50);
      setTimeout(applyBookMode,250);
    }).observe(b,{childList:true,subtree:true});
  }

  function boot(){
    examFlow();
    bookFlow();
    applyBookMode();
  }

  document.addEventListener("DOMContentLoaded",boot);

  [200,500,1000,2000,3500].forEach(ms=>{
    setTimeout(boot,ms);
  });

})();

/* NEXORA FINAL EXAM STANDARD BOOK DIRECT FLOW V5 */
(function(){
  if(window.__NEXORA_FINAL_EXAM_STANDARD_BOOK_DIRECT_V5__) return;
  window.__NEXORA_FINAL_EXAM_STANDARD_BOOK_DIRECT_V5__=true;

  console.log("========================================");
  console.log("NEXORA FINAL EXAM STANDARD BOOK DIRECT FLOW V5");
  console.log("EXAM -> BOOK -> CHAPTER");
  console.log("NDA/CDS -> EXAM RELEVANT STANDARD BOOKS");
  console.log("CLASS = NOT REQUIRED");
  console.log("BOOK RESET = BLOCKED");
  console.log("NCERT FLOW = PRESERVED");
  console.log("========================================");

  const find=(type)=>{
    const ids={
      exam:["shortNotesExam","examSelect"],
      class:["shortNotesClass","classSelect"],
      subject:["shortNotesSubject","subjectSelect"],
      book:["shortNotesBook","bookSelect"],
      chapter:["shortNotesChapter","chapterSelect"]
    };

    for(const id of ids[type]||[]){
      const e=document.getElementById(id);
      if(e) return e;
    }

    return [...document.querySelectorAll("select")].find(e=>{
      const t=(
        e.id+" "+
        e.name+" "+
        e.getAttribute("aria-label")+" "+
        e.parentElement?.textContent?.slice(0,150)
      ).toLowerCase();

      return type==="exam" ? t.includes("exam") :
             type==="class" ? t.includes("class") :
             type==="subject" ? t.includes("subject") :
             type==="book" ? t.includes("book") :
             type==="chapter" ? t.includes("chapter") : false;
    });
  };

  const exam=()=>find("exam");
  const cls=()=>find("class");
  const subject=()=>find("subject");
  const book=()=>find("book");
  const chapter=()=>find("chapter");

  let selectedBookValue="";
  let selectedBookText="";
  let loading=false;

  const norm=x=>String(x??"")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g," ")
    .trim();

  function isNCERTOption(o){
    const t=norm(
      o?.dataset?.bookTitle ||
      o?.dataset?.title ||
      o?.textContent ||
      ""
    );

    return (
      t.includes("ncert") ||
      t.includes("class 6") ||
      t.includes("class 7") ||
      t.includes("class 8") ||
      t.includes("class 9") ||
      t.includes("class 10") ||
      t.includes("class 11") ||
      t.includes("class 12")
    );
  }

  function isStandardOption(o){
    if(!o) return false;
    if(isNCERTOption(o)) return false;

    const t=norm(
      o.dataset?.bookTitle ||
      o.dataset?.title ||
      o.textContent ||
      ""
    );

    return [
      "laxmikanth",
      "bipan chandra",
      "spectrum",
      "rajiv ahir",
      "r s sharma",
      "g c leong",
      "ramesh singh",
      "shankar ias",
      "lucent",
      "arihant",
      "r s aggarwal",
      "rs aggarwal",
      "certificate physical",
      "indian polity",
      "indian economy",
      "modern india",
      "ancient india",
      "medieval india",
      "environment"
    ].some(x=>t.includes(x));
  }

  function hideClass(){
    const c=cls();
    if(!c) return;

    c.value="";
    c.removeAttribute("required");

    const w=
      c.closest(".form-group") ||
      c.closest(".selector-group") ||
      c.closest(".field") ||
      c.parentElement;

    if(w){
      w.style.display="none";
      w.dataset.nexoraExamStandard="1";
    }
  }

  function remember(){
    const b=book();
    if(!b || !b.value) return;

    const o=b.options[b.selectedIndex];
    if(!o) return;

    selectedBookValue=b.value;
    selectedBookText=String(
      o.dataset?.bookTitle ||
      o.dataset?.title ||
      o.textContent ||
      ""
    ).trim();
  }

  function restore(){
    const b=book();
    if(!b || !selectedBookValue) return;

    let o=[...b.options].find(x=>x.value===selectedBookValue);

    if(!o && selectedBookText){
      const wanted=norm(selectedBookText);

      o=[...b.options].find(x=>{
        const t=norm(
          x.dataset?.bookTitle ||
          x.dataset?.title ||
          x.textContent ||
          ""
        );
        return t===wanted || t.includes(wanted) || wanted.includes(t);
      });
    }

    if(o){
      b.value=o.value;
      console.log("NEXORA BOOK RESTORED:",o.textContent.trim());
    }
  }

  function collectBooks(value){
    const result=[];
    const seen=new Set();

    function walk(x,path=[]){
      if(!x || typeof x!=="object") return;

      if(Array.isArray(x)){
        x.forEach(v=>walk(v,path));
        return;
      }

      const title=
        x.bookTitle ||
        x.bookName ||
        x.title ||
        x.titleEn ||
        x.name;

      const id=
        x.bookId ||
        x.id ||
        x.slug;

      if(title && id){
        const text=norm(
          title+" "+
          (x.author||"")+" "+
          (x.subject||"")+" "+
          (x.exam||"")+" "+
          (x.exams||"")+" "+
          (x.category||"")+" "+
          (x.type||"")+" "+
          (x.mode||"")
        );

        const standard=!(
          text.includes("ncert") ||
          /^class [6-9] /.test(text) ||
          text.includes("class 10 ") ||
          text.includes("class 11 ") ||
          text.includes("class 12 ")
        );

        if(standard){
          const key=String(id)+"|"+String(title);
          if(!seen.has(key)){
            seen.add(key);
            result.push({
              id:String(id),
              title:String(title),
              text
            });
          }
        }
      }

      Object.entries(x).forEach(([k,v])=>{
        if(k!=="chapters") walk(v,path.concat(k));
      });
    }

    return {result,walk};
  }

  async function loadExamBooks(){
    const e=exam();
    const b=book();

    if(!e || !b || !e.value) return;

    const examValue=String(e.value);
    const examText=String(
      e.options[e.selectedIndex]?.textContent ||
      examValue
    );

    const examKey=norm(examText||examValue);

    console.log("NEXORA EXAM BOOK LOADER:",examText);

    remember();

    /*
     * Standard Exam flow never needs Class.
     */
    hideClass();

    loading=true;

    try{
      const urls=[
        "/api/short-notes/universal-catalogue",
        "/api/short-notes/manifest"
      ];

      let data=null;

      for(const url of urls){
        try{
          const r=await fetch(url,{cache:"no-store"});
          if(r.ok){
            data=await r.json();
            if(data) break;
          }
        }catch(err){}
      }

      if(!data){
        loading=false;
        restore();
        return;
      }

      const {result,walk}=collectBooks();
      walk(data);

      /*
       * First try exact exam mapping.
       */
      let matched=result.filter(x=>{
        const t=x.text;

        if(examKey.includes("nda"))
          return t.includes("nda") ||
                 t.includes("national defence academy") ||
                 t.includes("defence") ||
                 t.includes("general ability") ||
                 t.includes("gk");

        if(examKey.includes("cds"))
          return t.includes("cds") ||
                 t.includes("combined defence services") ||
                 t.includes("defence") ||
                 t.includes("general knowledge") ||
                 t.includes("english") ||
                 t.includes("mathematics");

        return t.includes(examKey);
      });

      /*
       * If catalogue does not tag individual books with exam,
       * expose the complete Standard Book catalogue rather than
       * showing an empty Book selector.
       */
      if(!matched.length) matched=result;

      const old=b.value;
      const oldText=selectedBookText;

      const fragment=document.createDocumentFragment();

      const placeholder=document.createElement("option");
      placeholder.value="";
      placeholder.textContent="Select Book";
      fragment.appendChild(placeholder);

      const used=new Set();

      matched.forEach(x=>{
        const key=norm(x.title);
        if(used.has(key)) return;
        used.add(key);

        const o=document.createElement("option");
        o.value=x.id;
        o.textContent=x.title;
        o.dataset.bookTitle=x.title;
        o.dataset.exam=examValue;
        o.dataset.standard="true";

        fragment.appendChild(o);
      });

      /*
       * Replace only when we actually have books.
       */
      if(matched.length){
        b.innerHTML="";
        b.appendChild(fragment);

        /*
         * Restore the previously selected book whenever possible.
         */
        if(old){
          const exact=[...b.options].find(x=>x.value===old);
          if(exact){
            b.value=old;
          }else if(oldText){
            const wanted=norm(oldText);
            const same=[...b.options].find(x=>
              norm(
                x.dataset.bookTitle ||
                x.textContent
              )===wanted
            );
            if(same) b.value=same.value;
          }
        }

        b.disabled=false;

        console.log(
          "NEXORA EXAM BOOKS:",
          matched.length
        );
      }

    }catch(err){
      console.warn("NEXORA EXAM BOOK LOAD:",err.message);
    }

    loading=false;

    hideClass();

    setTimeout(restore,100);
    setTimeout(restore,400);
    setTimeout(restore,900);
  }

  function examGuard(){
    const e=exam();
    if(!e || e.dataset.nexoraExamBookV5) return;

    e.dataset.nexoraExamBookV5="1";

    e.addEventListener("change",()=>{
      loadExamBooks();
    },true);
  }

  function bookGuard(){
    const b=book();
    if(!b || b.dataset.nexoraExamBookV5) return;

    b.dataset.nexoraExamBookV5="1";

    b.addEventListener("change",()=>{
      const o=b.options[b.selectedIndex];

      if(isStandardOption(o) || o?.dataset?.standard==="true"){
        selectedBookValue=b.value;
        selectedBookText=String(
          o.dataset?.bookTitle ||
          o.textContent ||
          ""
        ).trim();

        hideClass();

        const ch=chapter();
        if(ch) ch.disabled=false;

        console.log(
          "NEXORA STANDARD:",
          "EXAM -> BOOK -> CHAPTER"
        );
      }
    },true);

    /*
     * Old loaders may mutate the options after selection.
     * Restore the chosen book instead of returning to Select Book.
     */
    new MutationObserver(()=>{
      if(loading) return;

      setTimeout(()=>{
        if(selectedBookValue){
          restore();
          hideClass();
        }
      },50);

      setTimeout(restore,300);
      setTimeout(restore,800);
    }).observe(b,{childList:true,subtree:true});
  }

  function boot(){
    examGuard();
    bookGuard();
  }

  document.addEventListener("DOMContentLoaded",boot);

  [200,500,1000,2000,3500].forEach(ms=>{
    setTimeout(boot,ms);
  });

})();

/* NEXORA EXAM TO BOOK IMMEDIATE STANDARD FLOW V6 */
(function(){
  if(window.__NEXORA_EXAM_TO_BOOK_IMMEDIATE_V6__) return;
  window.__NEXORA_EXAM_TO_BOOK_IMMEDIATE_V6__=true;

  const $=(ids)=>{
    for(const id of ids){
      const e=document.getElementById(id);
      if(e) return e;
    }
    return null;
  };

  const exam=()=>$(["shortNotesExam","examSelect"]);
  const book=()=>$(["shortNotesBook","bookSelect"]);
  const cls=()=>$(["shortNotesClass","classSelect"]);
  const chapter=()=>$(["shortNotesChapter","chapterSelect"]);

  function classBox(){
    const c=cls();
    return c && (
      c.closest(".form-group") ||
      c.closest(".selector-group") ||
      c.closest(".field") ||
      c.parentElement
    );
  }

  function hideClass(){
    const c=cls();
    if(!c) return;
    c.value="";
    c.removeAttribute("required");
    const w=classBox();
    if(w) w.style.display="none";
  }

  function standardBookText(o){
    return String(
      o?.dataset?.bookTitle ||
      o?.dataset?.title ||
      o?.textContent ||
      ""
    ).toLowerCase();
  }

  function makeBookSelectable(){
    const b=book();
    if(!b) return;

    b.disabled=false;
    b.removeAttribute("disabled");

    /*
     * Important: never replace a populated Book list with
     * Select Book merely because Exam changed.
     */
    if(b.options.length>1){
      const current=b.value;
      if(current){
        const o=[...b.options].find(x=>x.value===current);
        if(o) return;
      }

      const firstReal=[...b.options].find(x=>x.value);
      if(firstReal){
        b.style.display="";
      }
    }

    b.style.visibility="visible";
    b.style.opacity="1";
  }

  let remembered="";
  let rememberedText="";

  function rememberBook(){
    const b=book();
    if(!b || !b.value) return;
    const o=b.options[b.selectedIndex];
    if(!o) return;
    remembered=b.value;
    rememberedText=String(
      o.dataset?.bookTitle ||
      o.textContent ||
      ""
    );
  }

  function restoreBook(){
    const b=book();
    if(!b || !remembered) return;

    let o=[...b.options].find(x=>x.value===remembered);

    if(!o && rememberedText){
      const t=rememberedText.toLowerCase().trim();
      o=[...b.options].find(x=>
        String(x.dataset?.bookTitle||x.textContent||"")
          .toLowerCase().trim()===t
      );
    }

    if(o){
      b.value=o.value;
      hideClass();
      const ch=chapter();
      if(ch) ch.disabled=false;
    }
  }

  function examChange(){
    const e=exam();
    if(!e || e.dataset.examBookImmediateV6) return;

    e.dataset.examBookImmediateV6="1";

    e.addEventListener("change",()=>{
      console.log("NEXORA: EXAM SELECTED -> BOOK");

      /*
       * Standard Exam mode:
       * Class is NOT part of the selection path.
       */
      hideClass();

      /*
       * Do not clear Book here.
       * Give the existing universal book loader time to populate it.
       */
      [0,100,250,500,900,1500,2500].forEach(ms=>{
        setTimeout(()=>{
          makeBookSelectable();
          restoreBook();
        },ms);
      });
    },true);
  }

  function bookChange(){
    const b=book();
    if(!b || b.dataset.examBookImmediateV6) return;

    b.dataset.examBookImmediateV6="1";

    b.addEventListener("change",()=>{
      if(!b.value) return;

      const o=b.options[b.selectedIndex];

      rememberBook();

      /*
       * Once ANY non-NCERT/reference book is selected,
       * Class disappears immediately.
       */
      const text=standardBookText(o);
      const ncert=
        text.includes("ncert") ||
        text.includes("class 6") ||
        text.includes("class 7") ||
        text.includes("class 8") ||
        text.includes("class 9") ||
        text.includes("class 10") ||
        text.includes("class 11") ||
        text.includes("class 12");

      if(!ncert){
        hideClass();

        const ch=chapter();
        if(ch){
          ch.disabled=false;
          ch.removeAttribute("disabled");
        }

        console.log("NEXORA STANDARD FLOW: EXAM -> BOOK -> CHAPTER");
      }
    },true);

    new MutationObserver(()=>{
      setTimeout(makeBookSelectable,30);
      setTimeout(restoreBook,100);
      setTimeout(restoreBook,300);
    }).observe(b,{childList:true,subtree:true});
  }

  function boot(){
    examChange();
    bookChange();
    makeBookSelectable();
  }

  document.addEventListener("DOMContentLoaded",boot);
  [200,500,1000,2000,3500].forEach(ms=>setTimeout(boot,ms));

  console.log("========================================");
  console.log("NEXORA EXAM TO BOOK IMMEDIATE FLOW V6");
  console.log("EXAM -> BOOK = ACTIVE");
  console.log("BOOK SELECT -> CLASS HIDDEN");
  console.log("CHAPTER = ENABLED");
  console.log("NCERT FLOW = PRESERVED");
  console.log("========================================");
})();






/* NEXORA FINAL EXAM BOOK PRESERVE HARD FIX V7 */
(function(){
  if(window.__NEXORA_EXAM_BOOK_HARD_V7) return;
  window.__NEXORA_EXAM_BOOK_HARD_V7=true;

  function getSelects(){
    const all=[...document.querySelectorAll('select')];

    const exam=all.find(x=>{
      const t=x.options?.[0]?.textContent||'';
      return /^Select Exam$/i.test(t.trim());
    });

    const book=all.find(x=>{
      const t=x.options?.[0]?.textContent||'';
      return /^Select Book$/i.test(t.trim());
    });

    const cls=all.find(x=>{
      const t=x.options?.[0]?.textContent||'';
      return /^Select Class$/i.test(t.trim());
    });

    return {exam,book,cls};
  }

  let savedBooks=[];

  function saveBooks(){
    const {book}=getSelects();
    if(!book) return;

    const options=[...book.options].filter(o=>{
      const t=(o.textContent||'').trim();
      return t && !/^Select Book$/i.test(t);
    });

    if(options.length){
      savedBooks=options.map(o=>({
        value:o.value,
        text:o.textContent,
        dataset:{...o.dataset}
      }));
    }
  }

  function hideClass(){
    const {cls,book}=getSelects();
    if(!cls || !book || !book.value) return;

    cls.value='';
    cls.style.display='none';
    cls.hidden=true;

    const wrap=cls.closest(
      '.form-group,.selector-group,.field,.input-group,.control-group'
    );

    if(wrap){
      wrap.style.display='none';
      wrap.hidden=true;
    }
  }

  function restoreBooks(){
    const {book}=getSelects();
    if(!book) return;

    if(!savedBooks.length) saveBooks();

    if(savedBooks.length && book.options.length<=1){
      book.innerHTML='<option value="">Select Book</option>';

      savedBooks.forEach(x=>{
        const o=document.createElement('option');
        o.value=x.value;
        o.textContent=x.text;

        Object.keys(x.dataset||{}).forEach(k=>{
          o.dataset[k]=x.dataset[k];
        });

        book.appendChild(o);
      });
    }

    if(book.options.length>1){
      book.style.display='';
      book.hidden=false;
      book.disabled=false;

      const wrap=book.closest(
        '.form-group,.selector-group,.field,.input-group,.control-group'
      );

      if(wrap){
        wrap.style.display='';
        wrap.hidden=false;
      }
    }
  }

  function bind(){
    const {exam,book}=getSelects();
    if(!exam || !book) return;

    saveBooks();

    if(!exam.__nexoraV7){
      exam.__nexoraV7=true;

      exam.addEventListener('change',function(){
        setTimeout(restoreBooks,0);
        setTimeout(restoreBooks,100);
        setTimeout(restoreBooks,300);
        setTimeout(restoreBooks,700);
        setTimeout(hideClass,800);
      },true);
    }

    if(!book.__nexoraV7){
      book.__nexoraV7=true;

      book.addEventListener('change',function(){
        if(book.value){
          hideClass();
        }
      },true);
    }

    restoreBooks();

    if(book.value){
      hideClass();
    }
  }

  const observer=new MutationObserver(function(){
    bind();

    const {book}=getSelects();
    if(book && book.options.length>1){
      saveBooks();
    }
  });

  function start(){
    bind();
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start,{once:true});
  }else{
    start();
  }

  console.log('NEXORA FINAL EXAM BOOK PRESERVE HARD FIX V7: ACTIVE');
  console.log('EXAM -> BOOK: PRESERVED');
  console.log('BOOK WILL NOT DISAPPEAR AFTER EXAM');
  console.log('STANDARD BOOK -> CLASS HIDDEN');
  console.log('NDA/CDS -> BOOK AVAILABLE');
})();
/* END NEXORA FINAL EXAM BOOK PRESERVE HARD FIX V7 */



/* NEXORA FINAL DIRECT EXAM STANDARD BOOK LOADER V8 */
(function(){
  if(window.__NEXORA_DIRECT_EXAM_BOOK_V8) return;
  window.__NEXORA_DIRECT_EXAM_BOOK_V8=true;

  let examValue="";
  let selectedBook="";
  let standardBooks=[];
  let loading=false;

  function getSelects(){
    const all=[...document.querySelectorAll("select")];

    const exam=all.find(x=>{
      const t=(x.options?.[0]?.textContent||"").trim();
      return /^Select Exam$/i.test(t);
    });

    const book=all.find(x=>{
      const t=(x.options?.[0]?.textContent||"").trim();
      return /^Select Book$/i.test(t);
    });

    const cls=all.find(x=>{
      const t=(x.options?.[0]?.textContent||"").trim();
      return /^Select Class$/i.test(t);
    });

    const subject=all.find(x=>{
      const t=(x.options?.[0]?.textContent||"").trim();
      return /^Select Subject$/i.test(t);
    });

    return {exam,book,cls,subject};
  }

  function titleOf(b){
    return String(
      b.title ||
      b.titleEn ||
      b.name ||
      b.bookName ||
      b.book_title ||
      ""
    ).trim();
  }

  function authorOf(b){
    return String(
      b.author ||
      b.authorName ||
      b.writer ||
      ""
    ).trim();
  }

  function classOf(b){
    return String(
      b.class ||
      b.classLabel ||
      b.standard ||
      b.grade ||
      ""
    ).trim();
  }

  function bookIdOf(b){
    return String(
      b.id ||
      b.bookId ||
      b.key ||
      titleOf(b)
    ).trim();
  }

  function collectBooks(node,out){
    if(!node) return;

    if(Array.isArray(node)){
      node.forEach(x=>collectBooks(x,out));
      return;
    }

    if(typeof node!=="object") return;

    const title=titleOf(node);

    if(title){
      const cls=classOf(node);
      const subject=String(node.subject||"").trim();

      if(!cls && title && !/select book/i.test(title)){
        out.push({
          id:bookIdOf(node),
          title,
          author:authorOf(node),
          subject
        });
      }
    }

    Object.keys(node).forEach(k=>{
      if(k==="books" || k==="catalogue" || k==="classes" || k==="data" || k==="standardBooks"){
        collectBooks(node[k],out);
      }
    });
  }

  async function loadStandardBooks(){
    if(loading) return;
    loading=true;

    try{
      const r=await fetch("/api/short-notes/universal-catalogue",{cache:"no-store"});
      if(!r.ok) throw new Error("catalogue "+r.status);

      const data=await r.json();
      const found=[];
      collectBooks(data,found);

      const seen=new Set();
      standardBooks=found.filter(b=>{
        const key=(b.title+"|"+b.author).toLowerCase();
        if(seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      if(!standardBooks.length){
        standardBooks=[
          {id:"rs-aggarwal",title:"R.S. Aggarwal — Quantitative Aptitude",author:"R.S. Aggarwal"},
          {id:"laxmikanth",title:"M. Laxmikanth — Indian Polity",author:"M. Laxmikanth"},
          {id:"gc-leong",title:"G.C. Leong — Certificate Physical and Human Geography",author:"G.C. Leong"},
          {id:"ramesh-singh",title:"Ramesh Singh — Indian Economy",author:"Ramesh Singh"},
          {id:"spectrum",title:"Spectrum — A Brief History of Modern India",author:"Rajiv Ahir"},
          {id:"rs-sharma",title:"R.S. Sharma — India's Ancient Past",author:"R.S. Sharma"},
          {id:"shankar-ias",title:"Shankar IAS — Environment",author:"Shankar IAS"}
        ];
      }

      populateBook();
    }catch(e){
      console.warn("NEXORA DIRECT EXAM BOOK V8:",e);
    }finally{
      loading=false;
    }
  }

  function populateBook(){
    const {book}=getSelects();
    if(!book) return;

    const old=selectedBook || book.value || "";

    book.innerHTML='<option value="">Select Book</option>';

    standardBooks.forEach(b=>{
      const o=document.createElement("option");
      o.value=b.id;
      o.textContent=b.author
        ? b.title+" — "+b.author
        : b.title;

      o.dataset.bookTitle=b.title;
      o.dataset.bookId=b.id;
      o.dataset.standard="true";

      book.appendChild(o);
    });

    book.style.display="";
    book.hidden=false;
    book.disabled=false;

    if(old && [...book.options].some(o=>o.value===old)){
      book.value=old;
    }
  }

  function hideClass(){
    const {cls,book}=getSelects();
    if(!cls || !book || !book.value) return;

    cls.value="";
    cls.style.display="none";
    cls.hidden=true;

    const wrap=cls.closest(
      ".form-group,.selector-group,.field,.input-group,.control-group"
    );

    if(wrap){
      wrap.style.display="none";
      wrap.hidden=true;
    }
  }

  function examChanged(){
    const {exam,book}=getSelects();
    if(!exam || !book) return;

    examValue=exam.value||"";

    if(examValue){
      selectedBook="";
      loadStandardBooks();
    }
  }

  function bookChanged(){
    const {book}=getSelects();
    if(!book) return;

    if(book.value){
      selectedBook=book.value;
      hideClass();
    }
  }

  function bind(){
    const {exam,book}=getSelects();
    if(!exam || !book) return;

    if(!exam.__directExamBookV8){
      exam.__directExamBookV8=true;
      exam.addEventListener("change",examChanged,true);
    }

    if(!book.__directExamBookV8){
      book.__directExamBookV8=true;
      book.addEventListener("change",bookChanged,true);
    }

    if(exam.value && book.options.length<=1){
      loadStandardBooks();
    }

    if(book.value){
      selectedBook=book.value;
      hideClass();
    }
  }

  const observer=new MutationObserver(()=>{
    bind();

    const {exam,book}=getSelects();

    if(
      exam &&
      exam.value &&
      book &&
      book.options.length<=1 &&
      !loading
    ){
      loadStandardBooks();
    }

    if(book && selectedBook){
      const exists=[...book.options].some(o=>o.value===selectedBook);
      if(!exists && standardBooks.length){
        populateBook();
      }
    }
  });

  function start(){
    bind();
    observer.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }

  console.log("NEXORA FINAL DIRECT EXAM STANDARD BOOK LOADER V8: ACTIVE");
  console.log("EXAM -> BOOK: DIRECT");
  console.log("BOOK RESET: AUTO RESTORE");
  console.log("STANDARD BOOK -> CLASS HIDDEN");
  console.log("CHAPTER FLOW: PRESERVED");
})();
/* END NEXORA FINAL DIRECT EXAM STANDARD BOOK LOADER V8 */



/* NEXORA V9 STANDARD BOOK VISIBILITY CONTROLLER: DISABLED
   V27 is the single authoritative Short Notes selector controller.
   Original controller preserved in git/history and backup.
*/
(function(){
  "use strict";
  console.log("NEXORA V9 STANDARD BOOK VISIBILITY CONTROLLER: DISABLED — V27 AUTHORITY");
})();
/* END NEXORA FINAL STANDARD BOOK CHAPTER VISIBILITY AND VALUE FIX V9 */



/* NEXORA V10 STANDARD BOOK CATALOGUE CONTROLLER: DISABLED
   V27 is the single authoritative Short Notes selector controller.
   Original controller preserved in git/history and backup.
*/
(function(){
  "use strict";
  console.log("NEXORA V10 STANDARD BOOK CATALOGUE CONTROLLER: DISABLED — V27 AUTHORITY");
})();
/* END NEXORA FINAL UNIVERSAL CATALOGUE STANDARD BOOK CHAPTER CONNECTOR V10 */




/* NEXORA STANDARD BOOK FLOW V2: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA STANDARD BOOK FLOW V2: DISABLED");
})();



/* NEXORA FINAL EXAM BOOK CHAPTER DOWNLOAD V2: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA FINAL EXAM BOOK CHAPTER DOWNLOAD V2: DISABLED");
})();





















/* NEXORA AUTO-NCERT CLASS FLOW V4: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA AUTO-NCERT CLASS FLOW V4: DISABLED");
})();


/* NEXORA NCERT CLASS FLOW V5: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA NCERT CLASS FLOW V5: DISABLED");
})();
 /* NEXORA FINAL NCERT CLASS FLOW V5 END */


/* ============================================================
   NEXORA SOURCE-LEVEL NCERT CASCADE V6
   CLASS 6-12:
   EXAM -> CLASS -> SUBJECT -> NCERT BOOK AUTO -> CHAPTER
   STANDARD / COLLEGE / OTHER:
   EXAM -> BOOK -> CHAPTER
   ============================================================ */
(function(){
  'use strict';

  const exam=document.getElementById('shortNotesExam');
  const cls=document.getElementById('shortNotesClass');
  const sub=document.getElementById('shortNotesSubject');
  const book=document.getElementById('shortNotesBook');
  const chap=document.getElementById('shortNotesChapter');

  if(!cls || !sub || !book || !chap) return;

  const NCERT={
    "6":{
      "geography":["The Earth Our Habitat"],
      "history":["Our Pasts-I"],
      "social science":["Social and Political Life-I"],
      "political science":["Social and Political Life-I"],
      "polity":["Social and Political Life-I"],
      "science":["Science"],
      "mathematics":["Mathematics"],
      "english":["Honeysuckle","A Pact with the Sun"],
      "hindi":["Vasant","Durva","Bal Ram Katha"],
      "sanskrit":["Ruchira"]
    },
    "7":{
      "geography":["Our Environment"],
      "history":["Our Pasts-II"],
      "social science":["Social and Political Life-II"],
      "political science":["Social and Political Life-II"],
      "polity":["Social and Political Life-II"],
      "science":["Science"],
      "mathematics":["Mathematics"],
      "english":["Honeycomb","An Alien Hand"],
      "hindi":["Vasant","Durva"],
      "sanskrit":["Ruchira"]
    },
    "8":{
      "geography":["Resources and Development"],
      "history":["Our Pasts-III"],
      "social science":["Social and Political Life-III"],
      "political science":["Social and Political Life-III"],
      "polity":["Social and Political Life-III"],
      "science":["Science"],
      "mathematics":["Mathematics"],
      "english":["Honeydew","It So Happened"],
      "hindi":["Vasant","Durva"],
      "sanskrit":["Ruchira"]
    },
    "9":{
      "geography":["Contemporary India-I"],
      "history":["India and the Contemporary World-I"],
      "social science":["Democratic Politics-I"],
      "political science":["Democratic Politics-I"],
      "polity":["Democratic Politics-I"],
      "economics":["Economics"],
      "science":["Science"],
      "mathematics":["Mathematics"],
      "english":["Beehive","Moments"],
      "hindi":["Kshitij","Sparsh"],
      "sanskrit":["Shemushi"]
    },
    "10":{
      "geography":["Contemporary India-II"],
      "history":["India and the Contemporary World-II"],
      "social science":["Democratic Politics-II"],
      "political science":["Democratic Politics-II"],
      "polity":["Democratic Politics-II"],
      "economics":["Understanding Economic Development"],
      "science":["Science"],
      "mathematics":["Mathematics"],
      "english":["First Flight","Footprints Without Feet"],
      "hindi":["Kshitij","Sparsh"],
      "sanskrit":["Shemushi"]
    },
    "11":{
      "geography":["Fundamentals of Physical Geography","India: Physical Environment"],
      "history":["Themes in World History"],
      "political science":["Indian Constitution at Work","Political Theory"],
      "polity":["Indian Constitution at Work","Political Theory"],
      "economics":["Indian Economic Development","Statistics for Economics"],
      "science":["Physics","Chemistry","Biology"],
      "mathematics":["Mathematics"],
      "english":["Hornbill","Snapshots"]
    },
    "12":{
      "geography":["Fundamentals of Human Geography","India: People and Economy"],
      "history":["Themes in Indian History"],
      "political science":["Contemporary World Politics","Politics in India Since Independence"],
      "polity":["Contemporary World Politics","Politics in India Since Independence"],
      "economics":["Introductory Macroeconomics","Introductory Microeconomics"],
      "science":["Physics","Chemistry","Biology"],
      "mathematics":["Mathematics"],
      "english":["Flamingo","Vistas"]
    }
  };

  function norm(v){
    return String(v||'').toLowerCase()
      .replace(/[–—]/g,'-')
      .replace(/\s+/g,' ')
      .trim();
  }

  function classNumber(){
    const v=norm(cls.value);
    const t=norm(cls.options[cls.selectedIndex]?.textContent);
    const m=(v+' '+t).match(/\b(6|7|8|9|10|11|12)\b/);
    return m ? m[1] : null;
  }

  function subjectKey(){
    return norm(
      sub.value ||
      sub.options[sub.selectedIndex]?.textContent ||
      ''
    );
  }

  function isClassFlow(){
    return !!classNumber();
  }

  function findNcertBook(){
    const c=classNumber();
    const sk=subjectKey();
    if(!c) return null;

    const wanted=NCERT[c]?.[sk] || [];
    const options=[...book.options];

    /* Exact known NCERT title match first. */
    for(const w of wanted){
      const nw=norm(w);
      const hit=options.find(o=>{
        const x=norm(o.textContent);
        return x===nw || x.includes(nw);
      });
      if(hit) return hit;
    }

    /* Existing catalogue may prefix author/class metadata. */
    for(const w of wanted){
      const nw=norm(w);
      const hit=options.find(o=>{
        const x=norm(o.textContent);
        return x.includes(nw);
      });
      if(hit) return hit;
    }

    return null;
  }

  function hideBook(){
    book.style.display='none';
    book.disabled=true;
    book.setAttribute('data-nexora-auto-ncert','true');

    let parent=book.parentElement;
    for(let i=0;i<4 && parent;i++){
      const text=norm(parent.textContent);
      if(text.includes('select book')){
        parent.style.display='none';
        break;
      }
      parent=parent.parentElement;
    }
  }

  function showBook(){
    book.style.display='';
    book.disabled=false;
    book.removeAttribute('data-nexora-auto-ncert');

    let parent=book.parentElement;
    for(let i=0;i<4 && parent;i++){
      const text=norm(parent.textContent);
      if(text.includes('select book')){
        parent.style.display='';
        break;
      }
      parent=parent.parentElement;
    }
  }

  function triggerBookCascade(){
    const selected=findNcertBook();

    if(!selected){
      console.warn(
        'NEXORA NCERT: catalogue book not found for',
        classNumber(),
        subjectKey()
      );
      hideBook();
      return;
    }

    /*
     * IMPORTANT:
     * Set the REAL catalogue book internally.
     * This is what fixes the old problem where
     * "India: A Comprehensive Geography" was being used
     * for Class 6 Geography.
     */
    book.value=selected.value;

    /* Existing NEXORA catalogue handler now receives the
       correct NCERT book and populates its real chapters. */
    book.dispatchEvent(new Event('change',{bubbles:true}));

    hideBook();

    setTimeout(()=>{
      if(isClassFlow()){
        book.value=selected.value;
        hideBook();
      }
    },100);

    setTimeout(()=>{
      if(isClassFlow()){
        book.value=selected.value;
        hideBook();
      }
    },350);

    setTimeout(()=>{
      if(isClassFlow()){
        book.value=selected.value;
        hideBook();
      }
    },800);
  }

  function apply(){
    if(isClassFlow()){
      triggerBookCascade();
    }else{
      showBook();
    }
  }

  cls.addEventListener('change',()=>setTimeout(apply,20));
  sub.addEventListener('change',()=>setTimeout(apply,20));
  if(exam) exam.addEventListener('change',()=>setTimeout(apply,80));

  /* Prevent later catalogue/UI rebuilds from exposing Book
     during Class 6-12 flow. */
  const observer=new MutationObserver(()=>{
    if(isClassFlow()) hideBook();
  });
  observer.observe(document.body,{childList:true,subtree:true});

  /* Only hide the unwanted duplicate button. */
  function cleanDuplicate(){
    document.querySelectorAll('button,a').forEach(el=>{
      const t=norm(el.textContent);
      if(t.includes('create short notes pdf')){
        el.style.display='none';
      }
    });
  }

  cleanDuplicate();
  setTimeout(cleanDuplicate,300);
  setTimeout(cleanDuplicate,900);
  setTimeout(apply,150);

  console.log('NEXORA SOURCE-LEVEL NCERT CASCADE V6: ACTIVE');
})();
 /* NEXORA SOURCE-LEVEL NCERT CASCADE V6 END */


/* NEXORA DUAL BOOK FLOW V7: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA DUAL BOOK FLOW V7: DISABLED");
})();
 /* NEXORA FINAL DUAL BOOK FLOW V7 END */




/* NEXORA CLASS SUBJECT BOOK CHAPTER FILTER V8: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA CLASS SUBJECT BOOK CHAPTER FILTER V8: DISABLED");
})();





/* NEXORA REAL EXAM SUBJECT BOOK CHAPTER FLOW V14: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA REAL EXAM SUBJECT BOOK CHAPTER FLOW V14: DISABLED");
})();

/* NEXORA SUBJECT VISIBILITY FINAL V15 */
(function(){
  function showSubject(){
    const subject=document.getElementById("shortNotesSubject");
    if(!subject) return;

    subject.disabled=false;
    subject.removeAttribute("disabled");
    subject.hidden=false;

    subject.style.display="block";
    subject.style.visibility="visible";
    subject.style.opacity="1";
    subject.style.pointerEvents="auto";

    const parent=subject.closest(
      ".short-notes-field,.selector-field,.form-group,.selection-group"
    );

    if(parent){
      parent.hidden=false;
      parent.style.display="";
      parent.style.visibility="visible";
      parent.style.opacity="1";
    }

    console.log("NEXORA V15: SUBJECT VISIBLE");
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",showSubject);
  }else{
    showSubject();
  }

  setTimeout(showSubject,300);
  setTimeout(showSubject,1000);
  setTimeout(showSubject,2000);
})();

/* NEXORA UNIVERSAL SUBJECT POPULATOR V16 */
(function(){
  "use strict";

  async function initUniversalSubjects(){
    const exam=document.getElementById("shortNotesExam");
    const subject=document.getElementById("shortNotesSubject");
    const book=document.getElementById("shortNotesBook");
    const chapter=document.getElementById("shortNotesChapter");

    if(!subject){
      setTimeout(initUniversalSubjects,500);
      return;
    }

    subject.disabled=false;
    subject.hidden=false;
    subject.style.display="";
    subject.style.visibility="visible";

    function norm(v){
      return String(v??"")
        .toLowerCase()
        .replace(/&/g,"and")
        .replace(/[^a-z0-9]+/g," ")
        .trim();
    }

    function walk(node,out){
      if(!node) return;

      if(Array.isArray(node)){
        node.forEach(x=>walk(x,out));
        return;
      }

      if(typeof node!=="object") return;

      const sv=
        node.subject ??
        node.subjectName ??
        node.subject_name ??
        node.category ??
        "";

      if(sv){
        String(sv)
          .split(/[,;|]/)
          .map(x=>x.trim())
          .filter(Boolean)
          .forEach(x=>out.push(x));
      }

      Object.values(node).forEach(v=>{
        if(v && typeof v==="object") walk(v,out);
      });
    }

    try{
      const response=await fetch(
        "/api/short-notes/universal-catalogue?ts="+Date.now(),
        {cache:"no-store"}
      );

      if(!response.ok) throw new Error("Catalogue HTTP "+response.status);

      const data=await response.json();

      const subjects=[];
      walk(data,subjects);

      // Preserve any valid subjects already supplied by the page.
      Array.from(subject.options||[]).forEach(o=>{
        const v=String(o.value||o.textContent||"").trim();
        if(v && !/^select\b/i.test(v)) subjects.push(v);
      });

      const unique=[];
      const seen=new Set();

      subjects.forEach(v=>{
        const key=norm(v);
        if(!key || /^select\b/.test(key)) return;
        if(seen.has(key)) return;
        seen.add(key);
        unique.push(v);
      });

      // Standard NEXORA subjects are retained when catalogue metadata
      // uses alternate wording.
      const standard=[
        "Geography",
        "History",
        "Polity",
        "Economy",
        "Environment",
        "Science",
        "Biology",
        "Physics",
        "Chemistry",
        "Mathematics",
        "English",
        "Hindi",
        "Other"
      ];

      standard.forEach(v=>{
        const key=norm(v);
        if(!seen.has(key)){
          seen.add(key);
          unique.push(v);
        }
      });

      unique.sort((a,b)=>a.localeCompare(b));

      subject.innerHTML='<option value="">Select Subject</option>';

      unique.forEach(v=>{
        const o=document.createElement("option");
        o.value=v;
        o.textContent=v;
        subject.appendChild(o);
      });

      subject.disabled=false;

      // Subject -> Books
      subject.addEventListener("change",async function(){
        const selected=String(subject.value||"").trim();

        if(!selected){
          if(book){
            book.innerHTML='<option value="">Select Book</option>';
            book.disabled=true;
          }
          if(chapter){
            chapter.innerHTML='<option value="">Select Chapter</option>';
            chapter.disabled=true;
          }
          return;
        }

        if(book){
          book.disabled=false;
          book.dispatchEvent(new Event("change",{bubbles:true}));
        }
      });

      console.log(
        "NEXORA V16 SUBJECTS:",
        unique.length,
        unique
      );

    }catch(err){
      console.error("NEXORA V16 SUBJECT ERROR:",err);

      // Emergency fallback so Subject can NEVER remain empty.
      const fallback=[
        "Geography","History","Polity","Economy",
        "Environment","Science","Biology","Physics",
        "Chemistry","Mathematics","English","Hindi","Other"
      ];

      subject.innerHTML='<option value="">Select Subject</option>';

      fallback.forEach(v=>{
        const o=document.createElement("option");
        o.value=v;
        o.textContent=v;
        subject.appendChild(o);
      });

      subject.disabled=false;
    }
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",initUniversalSubjects);
  }else{
    initUniversalSubjects();
  }
})();


/* NEXORA FINAL EXAM SUBJECT BOOK CHAPTER ROUTER V21: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA FINAL EXAM SUBJECT BOOK CHAPTER ROUTER V21: DISABLED");
})();


/* NEXORA FINAL CLEAN SUBJECT BOOK FLOW V22: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA FINAL CLEAN SUBJECT BOOK FLOW V22: DISABLED");
})();








/* NEXORA UNIVERSAL SHORT NOTES FLOW V26: DISABLED
   V27 is the sole authoritative selector controller.
   V26 Book/Chapter change handlers were conflicting with V27.
*/
(function(){
  "use strict";
  console.log("NEXORA UNIVERSAL SHORT NOTES FLOW V26: DISABLED");
})();



/* ============================================================
   NEXORA FINAL EXAM SUBJECT BOOK AUTO CLASS V27
   FLOW: EXAM -> SUBJECT -> BOOK -> AUTO CLASS -> CHAPTER -> DOWNLOAD
   CLASS: VISIBLE INITIALLY, AUTOMATIC AFTER BOOK
   SUBJECT: NEVER RESET
   BOOK: REAL CATALOGUE ONLY
   CHAPTER: EXACT SELECTED BOOK
   ============================================================ */
(function(){
  "use strict";

  const V27="NEXORA FINAL EXAM SUBJECT BOOK AUTO CLASS V27";

  function start(){
    const exam=document.getElementById("shortNotesExam");
    const cls=document.getElementById("shortNotesClass");
    const subject=document.getElementById("shortNotesSubject");
    const book=document.getElementById("shortNotesBook");
    const chapter=document.getElementById("shortNotesChapter");

    if(!exam || !cls || !subject || !book || !chapter) return;

    /* REMOVE ONLY OLD SELECTOR EVENT LISTENERS BY REPLACING THE SELECTS.
       This prevents older controllers from resetting Subject/Book/Class. */
    function clean(id){
      const old=document.getElementById(id);
      if(!old) return null;
      const fresh=old.cloneNode(true);
      old.replaceWith(fresh);
      return fresh;
    }

    const E=clean("shortNotesExam");
    const C=clean("shortNotesClass");
    const S=clean("shortNotesSubject");
    const B=clean("shortNotesBook");
    const H=clean("shortNotesChapter");

    if(!E || !C || !S || !B || !H) return;

    /* ========================================================
       STANDARD BOOK FIRST
       FLOW: EXAM -> SUBJECT -> STANDARD BOOK -> CHAPTER -> DOWNLOAD
       Class is NOT a user-required selector in Standard Book mode.
       It remains available internally for catalogue resolution.
       ======================================================== */
    const classWrap=
      C.closest(".form-group") ||
      C.closest(".selector-group") ||
      C.parentElement;

    if(classWrap){
      classWrap.style.display="none";
      classWrap.hidden=true;
      classWrap.setAttribute("hidden","hidden");
      classWrap.classList.add("short-notes-hidden");
    }

    C.style.display="none";
    C.hidden=true;
    C.setAttribute("hidden","hidden");

    let catalogue=null;
    let records=[];
    let selectedBookRecord=null;

    const subjects=[
      "Art And Culture","Biology","Chemistry","Culture","Economics",
      "English","Environment","Geography","History","Mathematics",
      "Physics","Political Science","Political Science / Polity",
      "Polity","Hindi","Science","Other"
    ];

    function norm(v){
      return String(v||"").trim().toLowerCase()
        .replace(/&/g,"and")
        .replace(/[^a-z0-9]+/g," ");
    }

    function clearSelect(el,placeholder){
      el.innerHTML="";
      const o=document.createElement("option");
      o.value="";
      o.textContent=placeholder;
      el.appendChild(o);
    }

    function addOption(el,value,text){
      if(!value) return;
      const o=document.createElement("option");
      o.value=value;
      o.textContent=text || value;
      el.appendChild(o);
    }

    function walk(x,path,examHint,classHint,subjectHint){
      if(!x) return;

      if(Array.isArray(x)){
        x.forEach(v=>walk(v,path,examHint,classHint,subjectHint));
        return;
      }

      if(typeof x!=="object") return;

      const currentExam=x.exam||x.examName||x.exams||examHint;
      const currentClass=x.class||x.className||x.standard||x.grade||classHint;
      const currentSubject=x.subject||x.subjectName||subjectHint;

      const id=x.id||x.bookId;
      const title=x.title||x.book||x.bookTitle||x.name;
      const author=x.author||x.writer||x.publisher||"";

      const chapters=
        x.chapters ||
        x.chapterList ||
        x.chapterTitles ||
        x.contents ||
        [];

      if(id && title && Array.isArray(chapters)){
        records.push({
          id:String(id),
          title:String(title),
          author:String(author||""),
          chapters:chapters,
          exam:currentExam,
          class:currentClass,
          subject:currentSubject
        });
      }

      Object.keys(x).forEach(k=>{
        if(["chapters","chapterList","chapterTitles","contents"].includes(k)) return;

        let e=currentExam,c=currentClass,sub=currentSubject;
        const nk=norm(k);

        if(/^class\s*(6|7|8|9|10|11|12)$/i.test(k) || /^class(6|7|8|9|10|11|12)$/i.test(k)){
          c=k.replace(/^class/i,"Class ").replace(/\s+/g," ").trim();
        }

        if(subjects.some(z=>norm(z)===nk)) sub=k;

        walk(x[k],path.concat(k),e,c,sub);
      });
    }

    function className(v){
      const n=norm(v);
      if(n.includes("class 6")||n==="6") return "Class 6";
      if(n.includes("class 7")||n==="7") return "Class 7";
      if(n.includes("class 8")||n==="8") return "Class 8";
      if(n.includes("class 9")||n==="9") return "Class 9";
      if(n.includes("class 10")||n==="10") return "Class 10";
      if(n.includes("class 11")||n==="11") return "Class 11";
      if(n.includes("class 12")||n==="12") return "Class 12";
      if(n.includes("graduation")) return "Graduation / College";
      if(n.includes("college")) return "Graduation / College";
      if(n.includes("other")) return "Other";
      return "";
    }

    function subjectMatch(r,want){
      const a=norm(r.subject);
      const b=norm(want);
      if(a===b || a.includes(b) || b.includes(a)) return true;

      const aliases={
        "political science / polity":["political science","polity"],
        "political science":["political science","polity"],
        "polity":["political science","polity"],
        "economics":["economy","economics"],
        "economy":["economy","economics"],
        "history":["history"],
        "geography":["geography"],
        "chemistry":["chemistry"],
        "physics":["physics"],
        "biology":["biology"],
        "mathematics":["mathematics","math"],
        "environment":["environment"],
        "english":["english"],
        "hindi":["hindi"]
      };

      const list=aliases[b]||[b];
      const text=norm((r.title||"")+" "+(r.author||"")+" "+(r.subject||""));
      return list.some(z=>text.includes(z));
    }

    function uniqueRecords(arr){
      const seen=new Set();
      return arr.filter(r=>{
        const key=norm(r.id)+"|"+norm(r.title);
        if(seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    async function loadCatalogue(){
      try{
        const res=await fetch("/api/short-notes/universal-catalogue",{cache:"no-store"});
        const data=await res.json();
        catalogue=data;
        records=[];
        walk(data,[],null,null,null);
        records=uniqueRecords(records);
      }catch(err){
        console.error(V27+" catalogue error",err);
      }
    }

    function populateSubjects(){
      const old=S.value;
      clearSelect(S,"Select Subject");

      const found=new Map();

      records.forEach(r=>{
        if(r.subject){
          const key=norm(r.subject);
          if(!found.has(key)) found.set(key,r.subject);
        }
      });

      subjects.forEach(x=>{
        if(!found.has(norm(x))) found.set(norm(x),x);
      });

      Array.from(found.values()).sort().forEach(x=>addOption(S,x,x));

      if(old){
        const op=Array.from(S.options).find(o=>norm(o.value)===norm(old));
        if(op) S.value=op.value;
      }
    }

    function populateBooks(){
      const wantSubject=S.value;
      const wantExam=E.value;

      clearSelect(B,"Select Book");
      clearSelect(H,"Select Chapter");
      selectedBookRecord=null;

      if(!wantSubject) return;

      let filtered=records.filter(r=>subjectMatch(r,wantSubject));

      /* Exam is used when catalogue has explicit exam metadata.
         If a real book has no exam metadata, keep it instead of
         incorrectly hiding a valid standard book. */
      if(wantExam){
        const examNorm=norm(wantExam);
        const withExam=filtered.filter(r=>{
          if(!r.exam) return false;
          const raw=Array.isArray(r.exam)?r.exam.join(" "):String(r.exam);
          return norm(raw).includes(examNorm) || examNorm.includes(norm(raw));
        });

        if(withExam.length) filtered=withExam;
      }

      filtered=uniqueRecords(filtered);

      filtered.sort((a,b)=>
        String(a.title).localeCompare(String(b.title)) ||
        String(a.author).localeCompare(String(b.author))
      );

      filtered.forEach(r=>{
        addOption(
          B,
          r.id,
          r.title+(r.author ? " — "+r.author : "")
        );
      });

      if(!filtered.length){
        const o=document.createElement("option");
        o.value="";
        o.textContent="No book found for selected Subject";
        B.appendChild(o);
      }
    }

    function findRecord(id){
      return records.find(r=>String(r.id)===String(id))||null;
    }

    function populateChapters(){
      const r=findRecord(B.value);
      selectedBookRecord=r;

      clearSelect(H,"Select Chapter");

      if(!r) return;

      const cls=className(r.class);
      if(cls){
        const op=Array.from(C.options).find(o=>norm(o.value)===norm(cls));
        if(op){
          C.value=op.value;
        }else{
          addOption(C,cls,cls);
          C.value=cls;
        }
      }

      /* ========================================================
         STANDARD BOOK MODE
         EXAM -> SUBJECT -> BOOK -> AUTO HIDE CLASS -> CHAPTER
         Class is hidden ONLY after a real book is selected.
         Chapter is explicitly made visible and enabled.
         ======================================================== */
      if(classWrap){
        classWrap.style.display="none";
        classWrap.hidden=true;
        classWrap.setAttribute("hidden","hidden");
      }

      C.style.display="none";
      C.hidden=true;
      C.setAttribute("hidden","hidden");

      const chapterWrap=
        H.closest(".form-group") ||
        H.closest(".selector-group") ||
        H.closest(".field") ||
        H.parentElement;

      if(chapterWrap){
        chapterWrap.style.display="";
        chapterWrap.hidden=false;
        chapterWrap.removeAttribute("hidden");
        chapterWrap.classList.remove("hidden","d-none","short-notes-hidden");
      }

      H.style.display="";
      H.hidden=false;
      H.removeAttribute("hidden");
      H.disabled=false;

      let chapters=Array.isArray(r.chapters)?r.chapters:[];

      chapters=chapters.map(x=>{
        if(typeof x==="string") return x;
        return x.title||x.name||x.chapter||"";
      }).filter(Boolean);

      const seen=new Set();
      chapters=chapters.filter(x=>{
        const k=norm(x);
        if(seen.has(k)) return false;
        seen.add(k);
        return true;
      });

      chapters.forEach((x,i)=>addOption(H,x,x));

      if(!chapters.length){
        const o=document.createElement("option");
        o.value="";
        o.textContent="No chapters found";
        H.appendChild(o);
      }
    }

    /* AUTHORITATIVE FLOW */
    E.addEventListener("change",()=>{
      /* Never reset Subject on Exam selection */
      populateBooks();
    },true);

    S.addEventListener("change",()=>{
      /* Subject remains selected; only Book depends on Subject */
      populateBooks();
    },true);

    B.addEventListener("change",()=>{
      /* Book never resets Subject */
      if(S.value) populateChapters();
    },true);

    H.addEventListener("change",()=>{
      /* Keep all selections intact */
    },true);

    loadCatalogue().then(()=>{
      populateSubjects();

      /* Initial state: CLASS VISIBLE */
      if(classWrap){
        classWrap.style.display="";
        classWrap.hidden=false;
        classWrap.removeAttribute("hidden");
      }
      C.style.display="";
      C.hidden=false;
      C.removeAttribute("hidden");

      /* If existing selections are present, respect them */
      if(S.value) populateBooks();
      if(B.value) populateChapters();
    });

    window.NEXORA_SHORT_NOTES_V27={
      exam:E,
      class:C,
      subject:S,
      book:B,
      chapter:H,
      records:()=>records,
      reload:async()=>{
        await loadCatalogue();
        populateSubjects();
        populateBooks();
      }
    };

    console.log("========================================");
    console.log(V27);
    console.log("FLOW: EXAM -> SUBJECT -> BOOK -> AUTO CLASS -> CHAPTER -> DOWNLOAD");
    console.log("CLASS: VISIBLE INITIALLY");
    console.log("CLASS: AUTOMATIC AFTER BOOK");
    console.log("SUBJECT RESET: BLOCKED");
    console.log("BOOK: REAL CATALOGUE ONLY");
    console.log("CHAPTERS: EXACT BOOK");
    console.log("========================================");
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }
})();

/* NEXORA FINAL SHORT NOTES FLOW V42: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA FINAL SHORT NOTES FLOW V42: DISABLED");
})();




/* NEXORA FINAL EXACT FLOW V1: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA FINAL EXACT FLOW V1: DISABLED");
})();




/* ============================================================
   /* NEXORA FINAL AUTHORITATIVE FLOW V2: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   This protection layer caused competing Book/DOM restoration.
*/
(function(){
  "use strict";
  console.log("NEXORA FINAL AUTHORITATIVE FLOW V2: DISABLED");
})();




/* ============================================================
   /* NEXORA FINAL BOOK CAPTURE LOCK BREAKER V3: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   This protection layer caused competing Book/DOM restoration.
*/
(function(){
  "use strict";
  console.log("NEXORA FINAL BOOK CAPTURE LOCK BREAKER V3: DISABLED");
})();



/* NEXORA CLEAN UNIVERSAL SELECTOR FLOW: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   Existing catalogue, chapter data, rendering and download systems preserved.
*/
(function(){
  "use strict";
  console.log("NEXORA CLEAN UNIVERSAL SELECTOR FLOW: DISABLED");
})();


/* /* NEXORA AUTHORITATIVE BOOK SELECTION GUARD V1: DISABLED
   V27 is the sole authoritative Short Notes selector controller.
   This protection layer caused competing Book/DOM restoration.
*/
(function(){
  "use strict";
  console.log("NEXORA AUTHORITATIVE BOOK SELECTION GUARD V1: DISABLED");
})();


/* NEXORA FINAL AUTHENTIC GEOGRAPHY PRELIMS CONNECTOR V1 */
(function(){
  if(window.__NEXORA_FINAL_GEO_PYQ_CONNECTOR__) return;
  window.__NEXORA_FINAL_GEO_PYQ_CONNECTOR__=true;

  const originalFetch=window.fetch;

  window.fetch=async function(input,init){
    try{
      const url=typeof input==="string"
        ? input
        : (input && input.url ? input.url : "");

      if(
        url.includes("/api/pyq") &&
        /geography/i.test(url) &&
        /upsc/i.test(url) &&
        /prelims/i.test(url)
      ){
        const params=new URLSearchParams(
          url.includes("?") ? url.split("?")[1] : ""
        );

        const year=params.get("year");

        const localUrl=
          "/backend/data/pyq/collector/universal-official-pdfs/authentic-question-dataset/upsc-cse-geography-prelims-authentic.json";

        const localResponse=await originalFetch(localUrl);

        if(localResponse.ok){
          const localData=await localResponse.json();
          let questions=Array.isArray(localData.questions)
            ? localData.questions.slice()
            : [];

          if(year && year!=="all"){
            questions=questions.filter(q=>String(q.year)===String(year));
          }

          questions=questions.filter(q=>
            q &&
            q.verified===true &&
            q.ai_generated!==true &&
            q.fake_pyq!==true &&
            q.fabricated_year!==true &&
            q.subject==="Geography" &&
            q.stage==="Prelims" &&
            q.paper==="General Studies Paper-I"
          );

          return new Response(JSON.stringify({
            success:true,
            total:questions.length,
            questions:questions.length,
            data:questions,
            language:params.get("language")||"english",
            source:"AUTHENTIC UPSC OFFICIAL QUESTION PAPERS",
            officialOnly:true,
            fakePYQs:0,
            aiGeneratedPYQs:0,
            years:[...new Set(questions.map(q=>q.year))].sort()
          }),{
            status:200,
            headers:{"Content-Type":"application/json"}
          });
        }
      }
    }catch(e){
      console.warn("NEXORA GEO CONNECTOR:",e);
    }

    return originalFetch.apply(this,arguments);
  };

  console.log("NEXORA FINAL AUTHENTIC GEOGRAPHY PRELIMS CONNECTOR: ACTIVE");
})();






(function(){
  const oldFetch = window.fetch;
  window.fetch = async function(input, init){
    const url = typeof input === "string" ? input : (input && input.url) || "";

    if (/\/api\/pyq(?:\?|$)/i.test(url)) {
      const u = new URL(url, window.location.origin);
      const exam = (u.searchParams.get("exam") || "").toLowerCase();
      const subject = (u.searchParams.get("subject") || "").toLowerCase();
      const type = (u.searchParams.get("type") || "").toLowerCase();

      if (exam.includes("upsc") && subject === "geography" && type === "prelims") {
        const cleanUrl = "/api/pyq/universal";
        const clean = await oldFetch(cleanUrl, init);
        if (clean.ok) return clean;
      }
    }

    return oldFetch(input, init);
  };
})();


/* NEXORA FINAL AUTHENTIC GEOGRAPHY SOURCE V3 */
(function(){
  const __nexoraOriginalFetch = window.fetch.bind(window);
  window.fetch = async function(input, init){
    const url = typeof input === "string" ? input : (input && input.url) || "";
    const isGeo =
      /\/api\/pyq(?:[/?]|$)/i.test(url) &&
      /(?:exam=upsc|exam=upsc%20cse|upsc)/i.test(url) &&
      /(?:subject=geography|geography)/i.test(url) &&
      /(?:type=prelims|prelims)/i.test(url);

    if (isGeo) {
      const clean = "backend/data/pyq/collector/universal-official-pdfs/authentic-question-dataset/upsc-cse-geography-prelims-source.json";
      try {
        const r = await __nexoraOriginalFetch(clean, init);
        if (r.ok) return r;
      } catch(e) {}
    }
    return __nexoraOriginalFetch(input, init);
  };
})();


/* NEXORA UNIVERSAL PYQ FETCH BRIDGE V4 */
(function(){
  const originalFetch = window.fetch.bind(window);

  window.fetch = async function(input, init){
    const rawUrl =
      typeof input === "string"
        ? input
        : ((input && input.url) || "");

    if (/\/api\/pyq(?:[/?]|$)/i.test(rawUrl)) {
      try {
        const u = new URL(rawUrl, window.location.origin);

        // Preserve existing query parameters.
        u.pathname = "/api/pyq/universal";

        const universalUrl = u.toString();

        console.log(
          "NEXORA UNIVERSAL PYQ:",
          universalUrl
        );

        return originalFetch(universalUrl, init);
      } catch(e) {
        console.warn(
          "NEXORA universal PYQ bridge fallback:",
          e
        );
      }
    }

    return originalFetch(input, init);
  };
})();



/* NEXORA FINAL UNIVERSAL PYQ ONLINE PDF FRONTEND V1 */
(() => {
  const OLD_FETCH=window.fetch;
  let lastPYQQuery={};
  let lastPYQData=null;

  window.fetch=function(input,init){
    const url=typeof input==="string"?input:(input&&input.url)||"";
    return OLD_FETCH.apply(this,arguments).then(async response=>{
      try {
        if (url.includes("/api/pyq") || url.includes("pyq")) {
          const clone=response.clone();
          const data=await clone.json();
          if (data && (Array.isArray(data.questions)||Array.isArray(data.data))) {
            lastPYQData=data;
            try {
              const u=new URL(url,location.origin);
              lastPYQQuery=Object.fromEntries(u.searchParams.entries());
            } catch(e) {}
            setTimeout(NEXORA_ADD_PYQ_DOWNLOAD_BUTTON,100);
          }
        }
      } catch(e) {}
      return response;
    });
  };

  function NEXORA_ADD_PYQ_DOWNLOAD_BUTTON(){
    if(document.getElementById("nexora-final-pyq-download")) return;

    const rows=lastPYQData && (lastPYQData.questions||lastPYQData.data||[]);
    if(!Array.isArray(rows) || !rows.length) return;

    const b=document.createElement("button");
    b.id="nexora-final-pyq-download";
    b.type="button";
    b.textContent="⬇ Download PDF";
    b.style.cssText=[
      "position:fixed","right:24px","bottom:24px","z-index:999999",
      "padding:13px 20px","border:0","border-radius:10px",
      "background:#b00000","color:#fff","font-size:15px",
      "font-weight:700","cursor:pointer","box-shadow:0 5px 20px rgba(0,0,0,.25)"
    ].join(";");

    b.onclick=()=>{
      const p=new URLSearchParams();
      Object.entries(lastPYQQuery||{}).forEach(([k,v])=>{
        if(v!==undefined && v!==null && v!=="") p.set(k,v);
      });

      // Preserve the currently loaded selection when the old API was used.
      if(!p.has("subject")) {
        const active=(document.querySelector("[data-subject].active,[data-subject][aria-selected='true']")||{}).dataset;
        if(active && active.subject) p.set("subject",active.subject);
      }

      window.open("/api/pyq/download-pdf?"+p.toString(),"_blank");
    };

    document.body.appendChild(b);
  }

  // Make the authoritative online endpoint available to existing UI code.
  const bridge=window.fetch;
  window.fetch=function(input,init){
    let url=typeof input==="string"?input:(input&&input.url)||"";
    if(url.includes("/api/pyq/universal") || url.includes("/api/pyq?")) {
      try {
        const u=new URL(url,location.origin);
        const q=u.searchParams;
        const target=new URL("/api/pyq/final-online",location.origin);
        q.forEach((v,k)=>target.searchParams.set(k,v));
        input=target.toString();
      } catch(e) {}
    }
    return bridge.call(this,input,init);
  };
})();
/* END NEXORA FINAL UNIVERSAL PYQ ONLINE PDF FRONTEND V1 */


/* NEXORA UNIVERSAL AUTHENTIC MASTER UI CONNECT V1 */
(function(){
  const MASTER="/api/pyq/universal-authentic-master";

  function nexoraUniversalPYQUrl(params){
    const p=new URLSearchParams();
    if(params && params.exam) p.set("exam",params.exam);
    if(params && params.subject) p.set("subject",params.subject);
    if(params && params.year) p.set("year",params.year);
    return MASTER+"?"+p.toString();
  }

  window.NEXORAUniversalAuthenticPYQ={
    url:nexoraUniversalPYQUrl,
    fetch: async function(params={}){
      const r=await fetch(nexoraUniversalPYQUrl(params));
      if(!r.ok) throw new Error("Universal authentic PYQ request failed");
      const d=await r.json();
      if(!d || d.success===false) throw new Error(d?.message||"PYQ data unavailable");
      return d;
    }
  };

  const originalFetch=window.fetch.bind(window);
  window.fetch=function(input,init){
    try{
      const u=typeof input==="string" ? input : input?.url;
      if(u){
        const parsed=new URL(u,location.origin);
        const path=parsed.pathname;
        if(path==="/api/pyq/final-online" ||
           path==="/api/pyq/final-geography" ||
           path==="/api/pyq/geography-authentic"){
          const target=new URL(MASTER,location.origin);
          ["exam","subject","year"].forEach(k=>{
            const v=parsed.searchParams.get(k);
            if(v) target.searchParams.set(k,v);
          });
          return originalFetch(target.toString(),init);
        }
      }
    }catch(e){}
    return originalFetch(input,init);
  };

  console.log("NEXORA UNIVERSAL AUTHENTIC MASTER UI CONNECT V1: ACTIVE");
})();



/* NEXORA UNIVERSAL AUTHENTIC MASTER DIRECT RENDER FIX V1 */
(function(){
  const MASTER="/api/pyq/universal-authentic-master";

  async function loadUniversalAuthenticPYQ(params={}){
    const p=new URLSearchParams();

    if(params.exam) p.set("exam",params.exam);
    if(params.subject) p.set("subject",params.subject);
    if(params.year && params.year!=="all" && params.year!=="All Years"){
      p.set("year",params.year);
    }

    const url=MASTER+(p.toString() ? "?"+p.toString() : "");
    const r=await window.fetch(url,{cache:"no-store"});

    if(!r.ok){
      throw new Error("Universal authentic PYQ request failed: HTTP "+r.status);
    }

    const d=await r.json();

    if(!d || d.success===false){
      throw new Error(d?.message || "Universal authentic PYQ data unavailable");
    }

    console.log(
      "NEXORA UNIVERSAL AUTHENTIC MASTER DIRECT:",
      "TOTAL="+(Array.isArray(d.questions)?d.questions.length:0),
      "AI="+(d.ai_generated_questions||0),
      "FAKE="+(d.fake_pyqs||0)
    );

    return d;
  }

  window.NEXORA_LOAD_UNIVERSAL_AUTHENTIC_PYQ=loadUniversalAuthenticPYQ;

  const oldFetch=window.fetch.bind(window);

  window.fetch=async function(input,init){
    try{
      const raw=typeof input==="string"
        ? input
        : (input && input.url) || "";

      if(raw){
        const u=new URL(raw,location.origin);
        const path=u.pathname;

        if(
          path==="/api/pyq/final-online" ||
          path==="/api/pyq/final-geography" ||
          path==="/api/pyq/geography-authentic" ||
          path==="/api/pyq/universal"
        ){
          const target=new URL(MASTER,location.origin);

          ["exam","subject","year"].forEach(k=>{
            const v=u.searchParams.get(k);
            if(v && v!=="all" && v!=="All Years"){
              target.searchParams.set(k,v);
            }
          });

          console.log(
            "NEXORA PYQ ROUTE REDIRECT:",
            path,
            "->",
            target.pathname+target.search
          );

          return oldFetch(target.toString(),init);
        }
      }
    }catch(e){
      console.warn("NEXORA PYQ redirect warning:",e);
    }

    return oldFetch(input,init);
  };

  console.log(
    "NEXORA UNIVERSAL AUTHENTIC MASTER DIRECT RENDER FIX V1: ACTIVE"
  );
})();



/* NEXORA MASTER API FETCH LOCK V1 */
(function(){
  if (window.__NEXORA_MASTER_API_LOCK_V1__) return;
  window.__NEXORA_MASTER_API_LOCK_V1__ = true;

  const nativeFetch = window.fetch.bind(window);

  window.fetch = function(input, init){
    try {
      const raw =
        typeof input === "string"
          ? input
          : (input && input.url) || "";

      const u = new URL(raw, window.location.origin);

      /*
       * NEVER redirect the canonical universal authentic master.
       * It must reach the backend unchanged.
       */
      if (u.pathname === "/api/pyq/universal-authentic-master") {
        return nativeFetch(input, init);
      }
    } catch(e) {}

    return nativeFetch(input, init);
  };

  console.log("NEXORA MASTER API FETCH LOCK V1: ACTIVE");
})();


/* NEXORA FINAL LEGACY UNIVERSAL TO MASTER ROUTER V1 */
(function(){
  if (window.__NEXORA_FINAL_LEGACY_UNIVERSAL_MASTER_V1__) return;
  window.__NEXORA_FINAL_LEGACY_UNIVERSAL_MASTER_V1__ = true;

  const previousFetch = window.fetch.bind(window);

  window.fetch = function(input, init){
    try {
      const raw =
        typeof input === "string"
          ? input
          : (input && input.url) || "";

      const u = new URL(raw, window.location.origin);

      if (u.pathname === "/api/pyq/universal") {
        u.pathname = "/api/pyq/universal-authentic-master";

        if (typeof input === "string") {
          input = u.toString();
        } else {
          input = new Request(u.toString(), input);
        }

        console.log(
          "NEXORA FINAL PYQ ROUTER: LEGACY UNIVERSAL -> AUTHENTIC MASTER",
          u.toString()
        );
      }
    } catch (e) {
      console.warn("NEXORA FINAL PYQ ROUTER WARNING:", e);
    }

    return previousFetch(input, init);
  };

  console.log(
    "NEXORA FINAL LEGACY UNIVERSAL TO MASTER ROUTER V1: ACTIVE"
  );
})();


/* NEXORA FINAL PYQ MASTER AUTOLOAD V1 */
(function(){
  if (window.__NEXORA_FINAL_PYQ_MASTER_AUTOLOAD_V1__) return;
  window.__NEXORA_FINAL_PYQ_MASTER_AUTOLOAD_V1__ = true;

  async function nexoraFinalPYQLoad(){
    try {
      const subjectEl =
        document.getElementById("pyqSubject") ||
        document.querySelector('[name="pyqSubject"]');

      const examEl =
        document.getElementById("pyqExam") ||
        document.querySelector('[name="pyqExam"]');

      const typeEl =
        document.getElementById("pyqType") ||
        document.querySelector('[name="pyqType"]');

      const yearEl =
        document.getElementById("pyqYear") ||
        document.querySelector('[name="pyqYear"]');

      const subjectRaw = subjectEl ? subjectEl.value : "geography";
      const examRaw = examEl ? examEl.value : "upsc";
      const typeRaw = typeEl ? typeEl.value : "prelims";
      const yearRaw = yearEl ? yearEl.value : "all";

      const subjectMap = {
        geography: "Geography",
        polity: "Polity",
        history: "History",
        economy: "Economy",
        environment: "Environment",
        "science & technology": "Science & Technology",
        science: "Science & Technology",
        current_affairs: "Current Affairs"
      };

      const examMap = {
        upsc: "UPSC CSE",
        "upsc cse": "UPSC CSE",
        ssc: "SSC",
        jee: "JEE",
        neet: "NEET",
        college: "College / University",
        university: "College / University"
      };

      const subject =
        subjectMap[String(subjectRaw || "").toLowerCase()] ||
        subjectRaw ||
        "Geography";

      const exam =
        examMap[String(examRaw || "").toLowerCase()] ||
        examRaw ||
        "UPSC CSE";

      const url =
        "/api/pyq/universal-authentic-master?subject=" +
        encodeURIComponent(subject);

      console.log(
        "NEXORA FINAL PYQ MASTER AUTOLOAD:",
        url
      );

      const response = await fetch(url, {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("MASTER HTTP " + response.status);
      }

      const payload = await response.json();

      let questions = Array.isArray(payload.questions)
        ? payload.questions
        : [];

      questions = questions.filter(function(q){
        return q &&
          q.official_source === true &&
          q.verified_source === true &&
          q.question_verified === true &&
          q.ai_generated !== true &&
          q.fake_pyq !== true;
      });

      const wantedExam = String(exam).toLowerCase();

      if (
        examRaw &&
        !["", "all", "all exams"].includes(
          String(examRaw).toLowerCase()
        )
      ) {
        questions = questions.filter(function(q){
          const qe = String(q.exam || "").toLowerCase();

          return qe === wantedExam ||
            (
              wantedExam === "upsc cse" &&
              (
                qe === "upsc cse" ||
                qe === "upsc civil services examination" ||
                qe === "upsc"
              )
            );
        });
      }

      if (
        typeRaw &&
        !["", "all"].includes(String(typeRaw).toLowerCase())
      ) {
        const wantedType =
          String(typeRaw).toLowerCase();

        questions = questions.filter(function(q){
          return String(q.type || "").toLowerCase() === wantedType;
        });
      }

      if (
        yearRaw &&
        !["", "all", "all years"].includes(
          String(yearRaw).toLowerCase()
        )
      ) {
        const wantedYear = Number(yearRaw);

        questions = questions.filter(function(q){
          return Number(q.year) === wantedYear;
        });
      }

      const finalData = {
        success: true,
        official_source_only: true,
        ai_generated_questions: 0,
        fake_pyqs: 0,
        fabricated_missing_years: false,
        total: questions.length,
        questions: questions
      };

      console.log(
        "NEXORA FINAL PYQ MASTER RESULT:",
        questions.length
      );

      if (typeof window.displayPYQs === "function") {
        window.displayPYQs(finalData);
      } else {
        const container =
          document.getElementById("pyqResults");

        if (container) {
          if (!questions.length) {
            container.innerHTML =
              "<div>No verified authentic PYQs available for this selection.</div>";
          } else {
            container.innerHTML =
              questions.map(function(q, i){
                const opts = Array.isArray(q.options)
                  ? q.options
                  : [];

                return (
                  '<div class="pyq-card">' +
                    '<h3>Q' + (i + 1) +
                    '. ' +
                    String(q.question || "") +
                    '</h3>' +
                    opts.map(function(o, j){
                      return (
                        '<div class="pyq-option">' +
                        String.fromCharCode(65 + j) +
                        '. ' +
                        String(o || "") +
                        '</div>'
                      );
                    }).join("") +
                    '<div class="pyq-source">' +
                    String(q.exam || "") +
                    ' • ' +
                    String(q.year || "") +
                    '</div>' +
                  '</div>'
                );
              }).join("");
          }
        }
      }

    } catch (e) {
      console.error(
        "NEXORA FINAL PYQ MASTER AUTOLOAD ERROR:",
        e
      );
    }
  }

  window.NEXORAFinalPYQMasterLoad =
    nexoraFinalPYQLoad;

  document.addEventListener(
    "DOMContentLoaded",
    function(){
      setTimeout(nexoraFinalPYQLoad, 700);
    }
  );

  document.addEventListener(
    "click",
    function(e){
      const t = e.target;

      if (
        t &&
        (
          t.id === "pyqButton" ||
          t.closest("#pyqButton") ||
          (
            t.textContent &&
            t.textContent.includes("Previous Year Questions")
          )
        )
      ) {
        setTimeout(
          nexoraFinalPYQLoad,
          100
        );
      }
    },
    true
  );

  console.log(
    "NEXORA FINAL PYQ MASTER AUTOLOAD V1: ACTIVE"
  );
})();


/* NEXORA PYQ FINAL VISIBLE MASTER OVERRIDE V1 */
(function(){
  if(window.__NEXORA_PYQ_FINAL_VISIBLE_MASTER_V1__) return;
  window.__NEXORA_PYQ_FINAL_VISIBLE_MASTER_V1__=true;

  async function FINAL_PYQ_MASTER_RENDER(){
    try{
      const box=document.getElementById("pyqResults");
      if(!box) return;

      const subjectEl=document.getElementById("pyqSubject");
      const examEl=document.getElementById("pyqExam");
      const typeEl=document.getElementById("pyqType");
      const yearEl=document.getElementById("pyqYear");

      const subject=(subjectEl && subjectEl.value) || "geography";
      const exam=(examEl && examEl.value) || "upsc";
      const type=(typeEl && typeEl.value) || "prelims";
      const year=(yearEl && yearEl.value) || "all";

      const subjectMap={
        geography:"Geography",
        polity:"Polity",
        history:"History",
        economy:"Economy",
        environment:"Environment",
        science:"Science & Technology",
        "science-technology":"Science & Technology",
        "science & technology":"Science & Technology",
        current_affairs:"Current Affairs"
      };

      const subjectName=
        subjectMap[String(subject).toLowerCase()] || subject;

      const r=await fetch(
        "/api/pyq/universal-authentic-master?subject="+
        encodeURIComponent(subjectName),
        {cache:"no-store"}
      );

      const d=await r.json();

      let qs=Array.isArray(d.questions)?d.questions:[];

      qs=qs.filter(q =>
        q &&
        q.official_source===true &&
        q.verified_source===true &&
        q.question_verified===true &&
        q.ai_generated!==true &&
        q.fake_pyq!==true
      );

      const examText=String(exam).toLowerCase();

      if(!["","all","all exams"].includes(examText)){
        qs=qs.filter(q=>{
          const e=String(q.exam||"").toLowerCase();
          return e===examText ||
            (examText.includes("upsc") &&
             (e==="upsc" ||
              e==="upsc cse" ||
              e==="upsc civil services examination"));
        });
      }

      const typeText=String(type).toLowerCase();

      if(!["","all"].includes(typeText)){
        qs=qs.filter(q =>
          String(q.type||"").toLowerCase()===typeText
        );
      }

      const yearText=String(year).toLowerCase();

      if(!["","all","all years"].includes(yearText)){
        qs=qs.filter(q =>
          String(q.year||"")===yearText
        );
      }

      console.log(
        "NEXORA PYQ FINAL VISIBLE MASTER RESULT:",
        qs.length
      );

      if(!qs.length){
        box.innerHTML=
          '<div style="padding:20px;font-size:18px;">' +
          'No verified authentic PYQs available for this selection.'+
          '</div>';
        return;
      }

      box.innerHTML=qs.map((q,i)=>{
        const opts=Array.isArray(q.options)?q.options:[];

        return `
          <div class="pyq-card" style="margin:16px 0;padding:18px;border:1px solid #ddd;border-radius:12px;">
            <div style="font-weight:700;margin-bottom:10px;">
              Q${i+1}. ${String(q.question||"")}
            </div>

            ${opts.map((o,j)=>`
              <div style="margin:7px 0;">
                <b>${String.fromCharCode(65+j)}.</b>
                ${String(o||"")}
              </div>
            `).join("")}

            <div style="margin-top:12px;font-size:13px;">
              ${String(q.exam||"")} • ${String(q.year||"")} • ${String(q.type||"")}
            </div>
          </div>
        `;
      }).join("");

      console.log(
        "NEXORA PYQ FINAL VISIBLE MASTER: RENDERED",
        qs.length
      );

    }catch(e){
      console.error(
        "NEXORA PYQ FINAL VISIBLE MASTER ERROR:",
        e
      );
    }
  }

  window.NEXORA_FINAL_PYQ_RENDER=FINAL_PYQ_MASTER_RENDER;

  function boot(){
    setTimeout(FINAL_PYQ_MASTER_RENDER,500);
    setTimeout(FINAL_PYQ_MASTER_RENDER,1500);
    setTimeout(FINAL_PYQ_MASTER_RENDER,3000);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",boot);
  }else{
    boot();
  }

  document.addEventListener("click",function(e){
    const el=e.target;
    if(
      el &&
      (
        el.id==="pyqButton" ||
        (el.closest && el.closest("#pyqButton")) ||
        (
          el.textContent &&
          el.textContent.includes("Previous Year Questions")
        )
      )
    ){
      setTimeout(FINAL_PYQ_MASTER_RENDER,100);
    }
  },true);

  console.log(
    "NEXORA PYQ FINAL VISIBLE MASTER OVERRIDE V1: ACTIVE"
  );
})();


/* NEXORA PYQ FINAL FILTER OVERRIDE V2 */
(function(){
  if(window.__NEXORA_PYQ_FINAL_FILTER_OVERRIDE_V2__) return;
  window.__NEXORA_PYQ_FINAL_FILTER_OVERRIDE_V2__=true;

  async function FINAL_PYQ_FILTER_V2(){
    try{
      const box=document.getElementById("pyqResults");
      if(!box) return;

      const subjectEl=document.getElementById("pyqSubject");
      const examEl=document.getElementById("pyqExam");
      const typeEl=document.getElementById("pyqType");
      const yearEl=document.getElementById("pyqYear");

      const subjectRaw=(subjectEl && subjectEl.value)||"geography";
      const examRaw=(examEl && examEl.value)||"upsc";
      const typeRaw=(typeEl && typeEl.value)||"prelims";
      const yearRaw=(yearEl && yearEl.value)||"all";

      const subjectMap={
        geography:"Geography",
        polity:"Polity",
        history:"History",
        economy:"Economy",
        environment:"Environment",
        science:"Science & Technology",
        "science-technology":"Science & Technology",
        "science & technology":"Science & Technology",
        current_affairs:"Current Affairs"
      };

      const subjectName=
        subjectMap[String(subjectRaw).toLowerCase()]||subjectRaw;

      const masterUrl =
        "/api/pyq/universal-authentic-master?subject=" +
        encodeURIComponent(subjectName);

      const data = await new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();

        xhr.open("GET", masterUrl, true);
        xhr.setRequestHeader("Accept","application/json");
        xhr.setRequestHeader("Cache-Control","no-cache");

        xhr.onload=function(){
          if(xhr.status >= 200 && xhr.status < 300){
            try{
              resolve(JSON.parse(xhr.responseText));
            }catch(e){
              reject(new Error("MASTER JSON PARSE ERROR"));
            }
          }else{
            reject(new Error("MASTER HTTP "+xhr.status));
          }
        };

        xhr.onerror=function(){
          reject(new Error("MASTER XHR NETWORK ERROR"));
        };

        xhr.send();
      });

      let qs=Array.isArray(data.questions)?data.questions:[];

      const authenticBefore=qs.length;

      qs=qs.filter(q =>
        q &&
        q.official_source===true &&
        q.verified_source===true &&
        q.question_verified===true &&
        q.ai_generated!==true &&
        q.fake_pyq!==true
      );

      const norm=v =>
        String(v||"")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g,"");

      const wantedExam=norm(examRaw);
      const wantedType=norm(typeRaw);
      const wantedYear=String(yearRaw||"").toLowerCase();

      if(!["","all","allexams"].includes(wantedExam)){
        qs=qs.filter(q=>{
          const e=norm(q.exam);

          if(wantedExam.includes("upsc")){
            return e.includes("upsc");
          }

          return e===wantedExam ||
                 e.includes(wantedExam) ||
                 wantedExam.includes(e);
        });
      }

      if(!["","all"].includes(wantedType)){
        qs=qs.filter(q=>{
          const t=norm(q.type);

          return t===wantedType ||
                 t.includes(wantedType) ||
                 wantedType.includes(t);
        });
      }

      if(!["","all","allyears"].includes(wantedYear)){
        qs=qs.filter(q =>
          String(q.year||"")===wantedYear
        );
      }

      console.log(
        "NEXORA PYQ FILTER V2:",
        "MASTER=",authenticBefore,
        "AUTHENTIC=",qs.length,
        "SUBJECT=",subjectName,
        "EXAM=",examRaw,
        "TYPE=",typeRaw,
        "YEAR=",yearRaw
      );

      if(!qs.length){
        console.warn(
          "NEXORA PYQ FILTER V2: ZERO AFTER FILTER"
        );
        return;
      }

      box.innerHTML=qs.map((q,i)=>{
        const opts=Array.isArray(q.options)?q.options:[];

        return `
          <div class="pyq-card" style="margin:16px 0;padding:18px;border:1px solid #ddd;border-radius:12px;">
            <div style="font-weight:700;margin-bottom:10px;">
              Q${i+1}. ${String(q.question||"")}
            </div>
            ${opts.map((o,j)=>`
              <div style="margin:7px 0;">
                <b>${String.fromCharCode(65+j)}.</b>
                ${String(o||"")}
              </div>
            `).join("")}
            <div style="margin-top:12px;font-size:13px;">
              ${String(q.exam||"")} • ${String(q.year||"")} • ${String(q.type||"")}
            </div>
          </div>
        `;
      }).join("");

      console.log(
        "NEXORA PYQ FILTER V2: RENDERED",
        qs.length
      );

    }catch(e){
      console.error(
        "NEXORA PYQ FILTER V2 ERROR:",
        e
      );
    }
  }

  window.NEXORA_FINAL_PYQ_FILTER_V2=
    FINAL_PYQ_FILTER_V2;

  if(document.readyState==="loading"){
    document.addEventListener(
      "DOMContentLoaded",
      function(){
        setTimeout(FINAL_PYQ_FILTER_V2,1200);
      }
    );
  }else{
    setTimeout(FINAL_PYQ_FILTER_V2,1200);
  }

  document.addEventListener("click",function(e){
    const t=e.target;

    if(
      t &&
      (
        t.id==="pyqButton" ||
        (t.closest && t.closest("#pyqButton")) ||
        (
          t.textContent &&
          t.textContent.includes("Previous Year Questions")
        )
      )
    ){
      setTimeout(FINAL_PYQ_FILTER_V2,300);
    }
  },true);

  console.log(
    "NEXORA PYQ FINAL FILTER OVERRIDE V2: ACTIVE"
  );
})();


/* NEXORA PYQ DISPLAY LANGUAGE DEDUPE V1 */
(function(){
  if(window.__NEXORA_PYQ_DISPLAY_LANGUAGE_DEDUPE_V1__) return;
  window.__NEXORA_PYQ_DISPLAY_LANGUAGE_DEDUPE_V1__=true;

  const originalDisplayPYQs=window.displayPYQs;

  if(typeof originalDisplayPYQs!=="function"){
    console.warn("NEXORA PYQ DISPLAY LANGUAGE: renderer not ready");
    return;
  }

  window.displayPYQs=function(data){
    try{
      if(data && Array.isArray(data.questions)){
        const languageEl=document.getElementById("pyqLanguage");
        const languageRaw=
          languageEl ? String(languageEl.value||"").toLowerCase() : "";

        let qs=data.questions.slice();

        /* DISPLAY-ONLY DEDUPE.
           Authentic master is NOT modified. */
        const seenIds=new Set();

        qs=qs.filter(q=>{
          const id=String(q && q.id || "").trim();

          if(!id) return true;

          if(seenIds.has(id)) return false;

          seenIds.add(id);
          return true;
        });

        /*
         * Master language is currently null for these records.
         * Therefore do NOT invent/overwrite source metadata.
         * The selected UI language remains the presentation choice.
         */
        data={
          ...data,
          questions:qs,
          total:qs.length
        };

        console.log(
          "NEXORA PYQ DISPLAY:",
          "MASTER_PRESERVED",
          "VISIBLE_AFTER_ID_DEDUPE=",qs.length,
          "LANGUAGE_SELECTOR=",languageRaw||"english"
        );
      }
    }catch(e){
      console.warn("NEXORA PYQ DISPLAY NORMALIZATION:",e);
    }

    return originalDisplayPYQs(data);
  };

  console.log(
    "NEXORA PYQ DISPLAY LANGUAGE DEDUPE V1: ACTIVE"
  );
})();



/* NEXORA FINAL PYQ DISPLAY QUALITY GATE V1 */
(function(){
  if(window.__NEXORA_PYQ_DISPLAY_QUALITY_GATE_V1__) return;
  window.__NEXORA_PYQ_DISPLAY_QUALITY_GATE_V1__=true;

  function clean(v){
    return String(v==null?"":v).replace(/\s+/g," ").trim();
  }

  window.__NEXORA_PYQ_IS_DISPLAYABLE__=function(q){
    if(!q) return false;

    const stem=clean(q.nexora_question || q.question || q.question_raw);
    const opts=q.nexora_options || q.options || {};

    const A=clean(opts.A || opts.a);
    const B=clean(opts.B || opts.b);
    const C=clean(opts.C || opts.c);
    const D=clean(opts.D || opts.d);

    /* MCQ must contain all four authentic embedded options. */
    if(!A || !B || !C || !D) return false;

    /* Never display extracted PDF page markers. */
    if(/={3,}\s*PAGE\s+\d+/i.test(stem)) return false;

    /* Reject records where multiple numbered questions were merged. */
    if(/\bQ\s*\d+\s*[\.:]/i.test(stem.slice(20))) return false;

    /* Reject obviously empty/corrupt stems. */
    if(stem.length < 25) return false;

    return true;
  };

  console.log("NEXORA FINAL PYQ DISPLAY QUALITY GATE V1: ACTIVE");
})();


/* NEXORA FINAL UNIVERSAL PYQ LANGUAGE CONTROLLER V2 */
(function(){
  if(window.__NEXORA_FINAL_PYQ_LANGUAGE_V2__) return;
  window.__NEXORA_FINAL_PYQ_LANGUAGE_V2__=true;

  const clean=v=>String(v==null?"":v).trim();

  function cleanSourceText(q){
    return clean(
      q.nexora_question ||
      q.question ||
      q.question_raw ||
      q.text ||
      ""
    ).replace(/===== PAGE \d+ =====/gi," ").replace(/\s+/g," ").trim();
  }

  function qualityGate(q){
    if(!q) return false;

    const raw=String(
      q.nexora_question ||
      q.question ||
      q.question_raw ||
      q.text ||
      ""
    );

    const text=cleanSourceText(q);

    if(!text) return false;

    /* PDF/OCR contamination */
    if(/===== PAGE\s*\d+\s*=====/i.test(raw)) return false;
    if(/\bXDTG-S-DNK\b/i.test(raw)) return false;
    if(/\bPAGE\s*\d+\b/i.test(raw)) return false;

    /* Multiple independent questions merged into one record */
    const qCount=(text.match(/\bQ\s*\d+\s*[\.:]/gi)||[]).length;
    if(qCount>1) return false;

    const examCount=(text.match(/UPSC\s+CSE/gi)||[]).length;
    if(examCount>1) return false;

    /* Directions/passages from another question block */
    if(/Directions for the following/i.test(text) && qCount>0) return false;

    const opts=q.nexora_options || q.options || {};
    const A=clean(opts.A || opts.a);
    const B=clean(opts.B || opts.b);
    const C=clean(opts.C || opts.c);
    const D=clean(opts.D || opts.d);

    if(!A || !B || !C || !D) return false;

    return true;
  }

  function sourceLanguage(q){
    if(!q) return null;

    const explicit=clean(
      q.language ||
      q.lang ||
      q.source_language ||
      q.sourceLanguage ||
      q.medium ||
      ""
    ).toLowerCase();

    if(explicit.includes("bilingual") || explicit.includes("both"))
      return "bilingual";

    if(explicit==="hindi" || explicit==="hi" || explicit==="hin")
      return "hindi";

    if(explicit==="english" || explicit==="en" || explicit==="eng")
      return "english";

    const text=clean(
      q.nexora_question ||
      q.question ||
      q.question_raw ||
      q.text ||
      ""
    );

    const hi=/[\u0900-\u097F]/.test(text);
    const en=/[A-Za-z]{3,}/.test(text);

    if(hi && en) return "bilingual";
    if(hi) return "hindi";
    if(en) return "english";

    return null;
  }

  function getSelectedLanguage(){
    const ids=[
      "pyqLanguage",
      "pyqLanguageSelect",
      "pyqLang",
      "language",
      "languageSelect"
    ];

    for(const id of ids){
      const el=document.getElementById(id);
      if(el && el.value){
        const v=String(el.value).trim().toLowerCase();

        if(v.includes("hindi") || v==="hi" || v==="hin")
          return "hindi";

        if(v.includes("bilingual") || v.includes("both"))
          return "bilingual";

        if(v.includes("english") || v==="en" || v==="eng")
          return "english";
      }
    }

    return "english";
  }

  window.__NEXORA_GET_PYQ_LANGUAGE__=getSelectedLanguage;

  window.__NEXORA_APPLY_PYQ_LANGUAGE__=function(q){
    if(!q) return null;

    if(!qualityGate(q)) return null;

    const requested=getSelectedLanguage();
    const source=sourceLanguage(q);

    if(!source) return null;

    /*
     * SOURCE-ONLY GUARANTEE:
     * No translation, rewriting, generation or language conversion.
     */

    if(requested==="english" && source!=="english" && source!=="bilingual")
      return null;

    if(requested==="hindi" && source!=="hindi" && source!=="bilingual")
      return null;

    if(requested==="bilingual" && source!=="bilingual")
      return null;

    const baseQuestion=clean(
      q.nexora_question ||
      q.question ||
      q.question_raw ||
      q.text ||
      ""
    );

    const hiQuestion=clean(
      q.nexora_question_hi ||
      q.question_hi ||
      q.hindi_question ||
      ""
    );

    const baseOptions=q.nexora_options || q.options || {};
    const hiOptions=q.nexora_options_hi || q.options_hi || {};

    const options={
      A:clean(baseOptions.A || baseOptions.a),
      B:clean(baseOptions.B || baseOptions.b),
      C:clean(baseOptions.C || baseOptions.c),
      D:clean(baseOptions.D || baseOptions.d)
    };

    const optionsHi={
      A:clean(hiOptions.A || hiOptions.a),
      B:clean(hiOptions.B || hiOptions.b),
      C:clean(hiOptions.C || hiOptions.c),
      D:clean(hiOptions.D || hiOptions.d)
    };

    const validOptions=["A","B","C","D"].every(k=>options[k]);

    if(!baseQuestion || !validOptions) return null;

    if(requested==="hindi"){
      /*
       * For source-Hindi records where separate *_hi fields do not exist,
       * use the original source question/options exactly as supplied.
       */
      return {
        ...q,
        displayLanguage:"hindi",
        question:source==="hindi" ? baseQuestion : (hiQuestion || baseQuestion),
        options:source==="hindi" ? options : (Object.values(optionsHi).every(Boolean) ? optionsHi : options)
      };
    }

    if(requested==="bilingual"){
      return {
        ...q,
        displayLanguage:"bilingual",
        question:baseQuestion,
        question_hi:hiQuestion || (source==="bilingual" ? baseQuestion : ""),
        options:options,
        options_hi:Object.values(optionsHi).every(Boolean) ? optionsHi : options
      };
    }

    return {
      ...q,
      displayLanguage:"english",
      question:baseQuestion,
      options:options
    };
  };

  console.log("NEXORA FINAL UNIVERSAL PYQ LANGUAGE CONTROLLER V2: ACTIVE");
})();


/* NEXORA FINAL SINGLE PYQ RENDERER V6 */
(function(){
    if (window.__NEXORA_SINGLE_PYQ_RENDERER_V6__) return;
    window.__NEXORA_SINGLE_PYQ_RENDERER_V6__ = true;

    const originalDisplay = window.displayPYQs;

    if (typeof originalDisplay !== "function") {
        console.warn("NEXORA FINAL PYQ RENDERER: displayPYQs unavailable");
        return;
    }

    window.displayPYQs = function(data){
        const requested =
            window.__NEXORA_GET_PYQ_LANGUAGE__
                ? window.__NEXORA_GET_PYQ_LANGUAGE__()
                : "english";

        let list = [];

        if (Array.isArray(data)) {
            list = data;
        } else if (data && Array.isArray(data.questions)) {
            list = data.questions;
        } else if (data && Array.isArray(data.data)) {
            list = data.data;
        }

        const applyLanguage = window.__NEXORA_APPLY_PYQ_LANGUAGE__;

        if (typeof applyLanguage === "function") {
            list = list
                .map(function(q){
                    return applyLanguage(q);
                })
                .filter(Boolean);
        }

        const finalData = Array.isArray(data)
            ? list
            : Object.assign({}, data || {}, {
                questions: list,
                data: list,
                language: requested
            });

        console.log(
            "NEXORA FINAL SINGLE PYQ RENDERER V6:",
            "LANGUAGE=", requested,
            "VISIBLE=", list.length,
            "SOURCE_ONLY=YES",
            "AI_TRANSLATION=0"
        );

        return originalDisplay(finalData);
    };
})();




/* NEXORA FINAL NOTES FLOW V1 - DISABLED
   V27 is the single authoritative Short Notes selector controller.
   V1 previously created a second change/MutationObserver controller
   which conflicted with V9/V10/V27 and could lock the page.
*/
(function(){
  "use strict";
  window.NEXORA_NOTES_FINAL_FLOW = false;
  console.log("NEXORA FINAL NOTES FLOW V1: DISABLED");
  console.log("NEXORA AUTHORITATIVE SHORT NOTES CONTROLLER: V27");
})();


/* ============================================================
   NEXORA STANDARD BOOK DOWNLOAD BUTTON VISIBILITY BRIDGE V1
   BOOK -> CHAPTER -> DOWNLOAD
   Do NOT reset Class/Subject/Book.
   ============================================================ */
(function(){
  "use strict";

  const MARK="NEXORA STANDARD BOOK DOWNLOAD BUTTON VISIBILITY BRIDGE V1";

  function reveal(){
    const chapter=document.getElementById("shortNotesChapter");
    const button=document.getElementById("shortNotesButton");

    if(!chapter || !button) return;

    const selected=
      chapter.value &&
      chapter.value.trim() &&
      chapter.value.trim().toLowerCase()!=="no chapters found";

    if(!selected) return;

    /* Button itself */
    button.style.display="inline-flex";
    button.style.visibility="visible";
    button.style.opacity="1";
    button.hidden=false;
    button.removeAttribute("hidden");
    button.disabled=false;

    /* Reveal only the button's own UI wrapper */
    const wrap=
      button.closest(".form-group") ||
      button.closest(".selector-group") ||
      button.closest(".field") ||
      button.parentElement;

    if(wrap){
      wrap.style.display="";
      wrap.style.visibility="visible";
      wrap.style.opacity="1";
      wrap.hidden=false;
      wrap.removeAttribute("hidden");
      wrap.classList.remove("hidden","d-none","short-notes-hidden");
    }

    console.log(MARK+": DOWNLOAD VISIBLE");
  }

  function bind(){
    const chapter=document.getElementById("shortNotesChapter");
    if(!chapter) return;

    if(chapter.dataset.nexoraDownloadBridge==="1"){
      reveal();
      return;
    }

    chapter.dataset.nexoraDownloadBridge="1";
    chapter.addEventListener("change",reveal,true);
    reveal();
  }

  function start(){
    bind();
    setTimeout(bind,300);
    setTimeout(reveal,600);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }

  window.NEXORA_STANDARD_BOOK_DOWNLOAD_BUTTON= {reveal};
})();


/* ============================================================
   NEXORA STANDARD BOOK CLASS VALIDATION BRIDGE V1
   STANDARD BOOK -> CHAPTER -> DOWNLOAD
   Class is NOT required from the user in Standard Book mode.
   NCERT/Class flow remains unchanged.
   ============================================================ */
(function(){
  "use strict";

  const MARK="NEXORA STANDARD BOOK CLASS VALIDATION BRIDGE V1";

  function patch(){
    const book=document.getElementById("shortNotesBook");
    const cls=document.getElementById("shortNotesClass");
    if(!book || !cls) return;

    /*
      Preserve the auto-resolved Class internally after Standard
      Book selection. The user does not have to select it manually.
    */
    if(book.value){
      const opt=book.options[book.selectedIndex];
      const text=String(opt?.textContent||"").toLowerCase();

      const standard =
        opt?.dataset?.standard === "true" ||
        opt?.dataset?.bookType === "standard" ||
        text.includes("ncert") === false;

      if(standard && cls.dataset.nexoraAutoClassRequired !== "1"){
        cls.dataset.nexoraStandardBookMode="1";
      }
    }

    console.log(MARK+": ACTIVE");
  }

  function start(){
    patch();

    const book=document.getElementById("shortNotesBook");
    if(book && book.dataset.nexoraStandardValidation==="1") return;

    if(book){
      book.dataset.nexoraStandardValidation="1";
      book.addEventListener("change",()=>{
        if(book.value){
          const cls=document.getElementById("shortNotesClass");
          if(cls) cls.dataset.nexoraStandardBookMode="1";
        }
        patch();
      },true);
    }
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }
})();




/* NEXORA NEET/JEE FINAL BOOK CHANGE GUARD V1 */
(function(){
  if(window.__NEXORA_NEET_JEE_BOOK_CHANGE_GUARD__) return;
  window.__NEXORA_NEET_JEE_BOOK_CHANGE_GUARD__=true;

  const exam=document.getElementById("shortNotesExam");
  const subject=document.getElementById("shortNotesSubject");
  const book=document.getElementById("shortNotesBook");
  const chapter=document.getElementById("shortNotesChapter");

  if(!exam || !book) return;

  function norm(v){
    return String(v||"").trim().toLowerCase().replace(/\s+/g," ");
  }

  function clear(el,placeholder){
    if(!el) return;
    el.innerHTML="";
    const o=document.createElement("option");
    o.value="";
    o.textContent=placeholder;
    el.appendChild(o);
    el.value="";
  }

  async function refresh(){
    const e=norm(exam.value);

    clear(book,"Select Book");
    clear(chapter,"Select Chapter");

    /*
     * NEET UG must never retain an old UPSC book.
     * Existing subject is preserved so Biology/Chemistry/Physics
     * can be selected normally; the book list is rebuilt from
     * the authoritative catalogue.
     */
    if(typeof window.NEXORA_SHORT_NOTES_V27?.reload==="function"){
      try{
        await window.NEXORA_SHORT_NOTES_V27.reload();
      }catch(_){}
    }

    console.log(
      "NEXORA EXAM BOOK GUARD:",
      exam.value,
      "-> BOOK RESET + CATALOGUE REFRESH"
    );
  }

  exam.addEventListener("change",refresh,true);

  console.log("NEXORA NEET/JEE FINAL BOOK CHANGE GUARD V1: ACTIVE");
})();


/* NEXORA EXAM SUBJECT BOOK AUTHORITATIVE V1 */
(function(){
  if(window.__NEXORA_EXAM_SUBJECT_BOOK_V1)return;
  window.__NEXORA_EXAM_SUBJECT_BOOK_V1=true;
  const exam=document.getElementById('examSelect');
  const subject=document.getElementById('subjectSelect');
  const book=document.getElementById('bookSelect');

  const originalSubjects=Array.from(subject.options).map(o=>({value:o.value,text:o.text}));
  const norm=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,' ');
  const rules=[
    [/jee/i,['Physics','Chemistry','Mathematics','Maths']],
    [/neet/i,['Physics','Chemistry','Biology']],
    [/upsc|civil services|ias/i,['General Studies','Geography','History','Polity','Economy','Environment','Science & Technology']],
    [/nda/i,['Mathematics','General Ability Test','English','General Knowledge']],
    [/ssc/i,['Quantitative Aptitude','Reasoning','English','General Awareness']],
    [/bank|ibps|sbi|clerk|po/i,['Quantitative Aptitude','Reasoning','English','General Awareness','Computer']],
    [/railway|rrb/i,['Mathematics','Reasoning','General Awareness','General Science']],
    [/cat/i,['Quantitative Aptitude','Verbal Ability','Logical Reasoning','Data Interpretation']],
    [/cuet/i,['English','General Test','Mathematics','Physics','Chemistry','Biology','History','Political Science','Economics','Geography']],
    [/school|cbse|icse|ncert/i,['English','Hindi','Mathematics','Science','Social Science','Physics','Chemistry','Biology','History','Geography','Political Science','Economics']]
  ];

  function rebuildSubjects(){
    const ev=exam.value||exam.options[exam.selectedIndex]?.text||'';
    const n=norm(ev);
    let allowed=null;
    for(const [rx,list] of rules){if(rx.test(n)){allowed=list;break;}}
    const old=subject.value;
    subject.innerHTML='';
    const placeholder=document.createElement('option');
    placeholder.value='';
    placeholder.textContent='Select Subject';
    subject.appendChild(placeholder);
    const source=originalSubjects.filter(x=>x.value!==''&&norm(x.text)!=='select subject');
    const matched=allowed
      ? source.filter(x=>allowed.some(a=>norm(x.text).includes(norm(a))||norm(a).includes(norm(x.text))))
      : source;
    const finalOptions=matched.length?matched:source;
    finalOptions.forEach(x=>{const o=document.createElement('option');o.value=x.value;o.textContent=x.text;subject.appendChild(o);});
    if(old && finalOptions.some(x=>x.value===old)){subject.value=old;}
    else if(finalOptions.length===1){subject.value=finalOptions[0].value;}
    subject.dispatchEvent(new Event('change',{bubbles:true}));
    setTimeout(()=>{subject.dispatchEvent(new Event('input',{bubbles:true}));},0);
    console.log('NEXORA AUTO SUBJECT:',ev,'=>',subject.value||'MULTI-SUBJECT');
  }

  exam.addEventListener('change',()=>setTimeout(rebuildSubjects,0),true);
  subject.addEventListener('change',()=>{
    setTimeout(()=>{
      book.value='';
      book.dispatchEvent(new Event('change',{bubbles:true}));
      console.log('NEXORA AUTO BOOK ROUTE: EXAM=',exam.value,'SUBJECT=',subject.value);
    },50);
  },true);

  if(exam.value) setTimeout(rebuildSubjects,100);
  console.log('NEXORA EXAM SUBJECT BOOK AUTHORITATIVE V1: ACTIVE');
})();/* NEXORA NEET UG SUBJECT GUARD FINAL V2 */
(function () {
  if (window.__NEXORA_NEET_UG_SUBJECT_FINAL_V2__) return;
  window.__NEXORA_NEET_UG_SUBJECT_FINAL_V2__ = true;

  const exam = document.getElementById('examSelect');
  const subject = document.getElementById('subjectSelect');

  if (!exam || !subject) return;

  function isNEETUG() {
    const value = String(exam.value || '').toLowerCase();
    const text = String(
      exam.options[exam.selectedIndex]
        ? exam.options[exam.selectedIndex].text
        : ''
    ).toLowerCase();

    return value.indexOf('neet') >= 0 && text.indexOf('neet') >= 0;
  }

  function applyNEETSubjects() {
    if (!isNEETUG()) return;

    const allowed = [
      'physics',
      'chemistry',
      'biology'
    ];

    const options = Array.from(subject.options);
    let selected = '';

    options.forEach(function (option) {
      if (!option.value) return;

      const text = String(option.text || '').toLowerCase().trim();
      const keep = allowed.some(function (name) {
        return text === name || text.indexOf(name) >= 0;
      });

      option.hidden = !keep;

      if (keep && !selected) {
        selected = option.value;
      }
    });

    if (
      subject.value &&
      !allowed.some(function (name) {
        const current = String(
          subject.options[subject.selectedIndex]
            ? subject.options[subject.selectedIndex].text
            : ''
        ).toLowerCase();

        return current === name || current.indexOf(name) >= 0;
      })
    ) {
      subject.value = '';
    }

    subject.dispatchEvent(new Event('change', { bubbles: true }));

    console.log(
      'NEXORA NEET UG SUBJECT GUARD FINAL V2: Physics / Chemistry / Biology ONLY'
    );
  }

  exam.addEventListener('change', function () {
    setTimeout(applyNEETSubjects, 100);
    setTimeout(applyNEETSubjects, 500);
    setTimeout(applyNEETSubjects, 1000);
  }, true);

  setTimeout(applyNEETSubjects, 300);
})();


/* NEXORA CLEAN EXAM -> SUBJECT -> BOOK FLOW V1 */
(function(){
  "use strict";

  const examEl=document.getElementById("examSelect");
  const subjectEl=document.getElementById("subjectSelect");
  const bookEl=document.getElementById("bookSelect");
  if(!examEl || !subjectEl || !bookEl) return;

  const MAP={
    "jee main":["physics","chemistry","mathematics"],
    "jee mains":["physics","chemistry","mathematics"],
    "jee advanced":["physics","chemistry","mathematics"],
    "neet ug":["physics","chemistry","biology"],
    "neet":["physics","chemistry","biology"],
    "nda":["mathematics","general ability","english","physics","chemistry","history","geography","polity","economy","science"],
    "upsc":["history","geography","polity","economy","environment","science","current affairs"],
    "ssc":["english","mathematics","reasoning","general awareness"],
    "banking":["quantitative aptitude","reasoning","english","general awareness"],
    "ibps":["quantitative aptitude","reasoning","english","general awareness"],
    "cat":["quantitative aptitude","data interpretation","logical reasoning","verbal ability"],
    "gate":["computer science","mathematics","engineering"]
  };

  function norm(v){
    return String(v||"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
  }

  function examKey(){
    return norm(examEl.value || examEl.options[examEl.selectedIndex]?.text);
  }

  function subjectKey(){
    return norm(subjectEl.value || subjectEl.options[subjectEl.selectedIndex]?.text);
  }

  function rebuildSubjects(){
    const key=examKey();
    const allowed=MAP[key];
    if(!allowed) return;

    const current=subjectEl.value;
    let first=null;
    let count=0;

    Array.from(subjectEl.options).forEach(o=>{
      if(!o.value) return;
      const t=norm(o.text+" "+o.value);
      const ok=allowed.some(x=>t===x || t.includes(x) || x.includes(t));
      o.hidden=!ok;
      o.disabled=!ok;
      if(ok){
        count++;
        if(!first) first=o;
      }
    });

    if(current && Array.from(subjectEl.options).some(o=>o.value===current && !o.disabled)){
      subjectEl.value=current;
    }else if(first){
      subjectEl.value=first.value;
    }

    subjectEl.dispatchEvent(new Event("change",{bubbles:true}));
  }

  function rebuildBooks(){
    /*
      Do NOT rebuild/remove catalogue options here.
      Existing NEXORA catalogue/chapter engine remains authoritative.
      This only clears a stale book selection when subject changes.
    */
    if(bookEl.value){
      const selected=bookEl.options[bookEl.selectedIndex];
      if(selected && selected.disabled) bookEl.value="";
    }
  }

  let busy=false;
  function apply(){
    if(busy) return;
    busy=true;
    try{
      rebuildSubjects();
      rebuildBooks();
    }finally{
      busy=false;
    }
  }

  examEl.addEventListener("change",apply,false);
  subjectEl.addEventListener("change",rebuildBooks,false);

  console.log("NEXORA CLEAN EXAM SUBJECT BOOK FLOW V1: ACTIVE");
})();


/* ============================================================
   NEXORA REAL ANSWER ACTIONS — FINAL 20261001
   Runs AFTER the active answer renderer.
   ============================================================ */
(function NEXORA_REAL_ANSWER_ACTIONS(){
  "use strict";

  function install(){
    const section=document.getElementById("nexoraAnswerSection");
    const answer=document.getElementById("answerText");
    if(!section || !answer) return;

    section.style.setProperty("display","block","important");

    let actions=document.getElementById("nexoraRealAnswerActions");

    if(!actions){
      actions=document.createElement("div");
      actions.id="nexoraRealAnswerActions";
      actions.style.cssText=
        "display:flex!important;gap:12px!important;flex-wrap:wrap!important;"+
        "margin:20px 0!important;visibility:visible!important;opacity:1!important;"+
        "position:relative!important;z-index:999999!important;";

      const source=document.createElement("a");
      source.id="nexoraRealSourcesButton";
      source.href="#nexoraRealEvidence";
      source.textContent="🔎 Sources & Evidence";
      source.style.cssText=
        "display:inline-flex!important;padding:12px 18px!important;"+
        "border:1px solid #999!important;border-radius:10px!important;"+
        "background:#fff!important;color:#111!important;font-weight:700!important;"+
        "text-decoration:none!important;cursor:pointer!important;";

      const youtube=document.createElement("a");
      youtube.id="nexoraRealYoutubeButton";

      let q="";
      const input=document.querySelector(
        'input[name="q"],input[type="search"],#searchInput'
      );
      if(input) q=input.value.trim();

      if(!q){
        const title=document.getElementById("answerTitle");
        if(title) q=title.textContent.trim();
      }

      if(!q) q="what is python";

      youtube.href=
        "https://www.youtube.com/results?search_query="+encodeURIComponent(query)+
        encodeURIComponent(q);
      youtube.target="_blank";
      youtube.rel="noopener";
      youtube.textContent="▶ All YouTube Videos";
      youtube.style.cssText=
        "display:inline-flex!important;padding:12px 18px!important;"+
        "border:1px solid #999!important;border-radius:10px!important;"+
        "background:#fff!important;color:#111!important;font-weight:700!important;"+
        "text-decoration:none!important;cursor:pointer!important;";

      actions.appendChild(source);
      actions.appendChild(youtube);

      answer.parentNode.insertBefore(actions,answer.nextSibling);
    }

    let evidence=document.getElementById("nexoraRealEvidence");

    if(!evidence){
      evidence=document.createElement("div");
      evidence.id="nexoraRealEvidence";
      evidence.style.cssText=
        "display:block!important;visibility:visible!important;opacity:1!important;"+
        "margin:18px 0!important;padding:18px!important;"+
        "border:1px solid #ddd!important;border-radius:12px!important;"+
        "background:#fafafa!important;";

      evidence.innerHTML=
        '<h3 style="margin-top:0">🔎 Sources &amp; Evidence</h3>'+
        '<p>NEXORA web-search sources and evidence.</p>';

      actions.parentNode.insertBefore(evidence,actions.nextSibling);
    }
  }

  install();
  setTimeout(install,300);
  setTimeout(install,1000);
  setTimeout(install,2000);
  setInterval(install,1000);

})();

/* NEXORA_BODY_LEVEL_SOURCE_YOUTUBE_FINAL_20261001 */
(function(){
"use strict";
function NX_FINAL_UI(){
  if(!document.body) return;

  let bar=document.getElementById("nxFinalActionBar");
  if(!bar){
    bar=document.createElement("div");
    bar.id="nxFinalActionBar";
    bar.innerHTML=
      '<a id="nxFinalSources" href="#nxFinalEvidence">🔎 Sources &amp; Evidence</a>'+
      '<a id="nxFinalYoutube" target="_blank" rel="noopener">▶ All YouTube Videos</a>';
    document.body.appendChild(bar);
  }

  let q="";
  const inp=document.querySelector('input[name="q"],input[type="search"],#searchInput');
  if(inp) q=(inp.value||"").trim();
  if(!q){
    const t=document.getElementById("answerTitle");
    if(t) q=(t.textContent||"").trim();
  }
  if(!q) q="what is python";

  const y=document.getElementById("nxFinalYoutube");
  if(y) y.href="https://www.youtube.com/results?search_query="+encodeURIComponent(query)+encodeURIComponent(q);

  if(!document.getElementById("nxFinalEvidence")){
    const e=document.createElement("div");
    e.id="nxFinalEvidence";
    e.innerHTML=
      "<h3>🔎 Sources &amp; Evidence</h3>"+
      "<p>NEXORA web-search sources and evidence will appear here when available.</p>";
    document.body.appendChild(e);
  }
}
const css=document.createElement("style");
css.textContent=`
#nxFinalActionBar{
 position:fixed!important;left:50%!important;bottom:22px!important;
 transform:translateX(-50%)!important;z-index:2147483647!important;
 display:flex!important;gap:12px!important;align-items:center!important;
 background:#fff!important;padding:10px!important;border-radius:14px!important;
 box-shadow:0 8px 30px rgba(0,0,0,.22)!important;
}
#nxFinalActionBar a{
 display:inline-flex!important;align-items:center!important;
 padding:12px 18px!important;border:1px solid #bbb!important;
 border-radius:10px!important;background:#fff!important;color:#111!important;
 font:700 15px Arial,sans-serif!important;text-decoration:none!important;
 cursor:pointer!important;white-space:nowrap!important;
}
#nxFinalEvidence{
 display:block!important;visibility:visible!important;opacity:1!important;
 margin:24px auto!important;padding:20px!important;max-width:900px!important;
 border:1px solid #ddd!important;border-radius:14px!important;
 background:#fafafa!important;color:#111!important;
 font-family:Arial,sans-serif!important;
}
`;
document.head.appendChild(css);
NX_FINAL_UI();
setTimeout(NX_FINAL_UI,300);
setTimeout(NX_FINAL_UI,1000);
setTimeout(NX_FINAL_UI,2000);
setInterval(NX_FINAL_UI,1000);
new MutationObserver(NX_FINAL_UI).observe(document.documentElement,{childList:true,subtree:true});
})();


/* ============================================================
   NEXORA_RENDERER_ROOT_FIX_20261001
   Directly cleans the ACTIVE rendered answer.
   ============================================================ */
(function(){
"use strict";

function NEXORA_ROOT_RENDER_FIX(){
  const section=document.getElementById("nexoraAnswerSection");
  if(!section) return;

  /* Remove the old renderer's Best Video block wherever it exists */
  section.querySelectorAll("*").forEach(function(el){
    const t=(el.textContent||"").trim();
    if(t==="▶ Best YouTube Video" || t==="Best YouTube Video"){
      const box=el.closest("div,section,article") || el;
      if(box && box!==section) box.remove();
    }
  });

  /* Remove raw YouTube markdown left by the answer */
  section.innerHTML=section.innerHTML
    .replace(/\[([^\]]*YouTube[^\]]*)\]\((https?:\/\/[^)]+)\)/gi,
      '<a href="$2" target="_blank" rel="noopener">$1</a>');

  /* Add the final controls exactly once */
  if(!document.getElementById("nexoraRootFinalControls")){
    const answer=document.getElementById("answerText");
    if(!answer) return;

    const bar=document.createElement("div");
    bar.id="nexoraRootFinalControls";
    bar.style.cssText=
      "display:flex;gap:12px;flex-wrap:wrap;margin:22px 0;"+
      "position:relative;z-index:999999;";

    const src=document.createElement("a");
    src.href="#nexoraRootEvidence";
    src.textContent="🔎 Sources & Evidence";
    src.style.cssText=
      "display:inline-flex;padding:12px 18px;border:1px solid #aaa;"+
      "border-radius:10px;background:#fff;color:#111;font-weight:700;"+
      "text-decoration:none;cursor:pointer;";

    const yt=document.createElement("a");
    const input=document.querySelector(
      'input[name="q"],input[type="search"],#searchInput'
    );
    const q=input && input.value ? input.value.trim() : "what is java";
    yt.href="https://www.youtube.com/results?search_query="+encodeURIComponent(q);
    yt.target="_blank";
    yt.rel="noopener";
    yt.textContent="▶ All YouTube Videos";
    yt.style.cssText=src.style.cssText;

    bar.appendChild(src);
    bar.appendChild(yt);
    answer.parentNode.insertBefore(bar,answer.nextSibling);

    const ev=document.createElement("div");
    ev.id="nexoraRootEvidence";
    ev.style.cssText=
      "display:block;margin:18px 0;padding:18px;border:1px solid #ddd;"+
      "border-radius:12px;background:#fafafa;color:#111;";
    ev.innerHTML=
      "<h3>🔎 Sources &amp; Evidence</h3>"+
      "<p>NEXORA web-search sources and evidence.</p>";
    bar.parentNode.insertBefore(ev,bar.nextSibling);
  }
}

setTimeout(NEXORA_ROOT_RENDER_FIX,100);
setTimeout(NEXORA_ROOT_RENDER_FIX,500);
setTimeout(NEXORA_ROOT_RENDER_FIX,1500);
setInterval(NEXORA_ROOT_RENDER_FIX,1000);
})();



/* NEXORA NCERT FINAL AUTHORITATIVE FLOW V1
   NCERT ONLY:
   EXAM -> SUBJECT -> CLASS -> BOOK -> CHAPTER -> DOWNLOAD
   STANDARD BOOK FLOW IS NOT MODIFIED.
*/
(function(){
  "use strict";

  const examEl=document.getElementById("examSelect");
  const subjectEl=document.getElementById("subjectSelect");
  const classEl=document.getElementById("classSelect");
  const bookEl=document.getElementById("shortNotesBook") ||
               document.getElementById("bookSelect");
  const chapterEl=document.getElementById("shortNotesChapter") ||
                  document.getElementById("chapterSelect");

  if(!examEl || !subjectEl || !classEl || !bookEl || !chapterEl){
    console.log("NEXORA NCERT FINAL FLOW: REQUIRED ELEMENTS NOT FOUND");
    return;
  }

  let ncertCatalogue=[];
  let ncertLoaded=false;

  function text(v){
    return String(v ?? "").trim();
  }

  function norm(v){
    return text(v).toLowerCase()
      .replace(/[–—]/g,"-")
      .replace(/\s+/g," ");
  }

  function isNCERT(){
    return /ncert/i.test(text(examEl.value)) ||
           /ncert/i.test(
             examEl.options[examEl.selectedIndex]?.textContent || ""
           );
  }

  function clearSelect(el,label){
    if(!el) return;
    el.innerHTML="";
    const o=document.createElement("option");
    o.value="";
    o.textContent=label;
    el.appendChild(o);
    el.value="";
  }

  function addOption(el,value,label,book){
    const o=document.createElement("option");
    o.value=text(value);
    o.textContent=text(label);
    if(book){
      o.dataset.bookId=text(book.id || book.bookId || "");
      o.dataset.bookTitle=text(
        book.title || book.bookTitle || book.name || ""
      );
      o.dataset.nexoraBookTitle=o.dataset.bookTitle;
      o.dataset.nexoraClass=text(
        book.class || book.className || book.classLevel || ""
      );
      o.dataset.nexoraSubject=text(book.subject || "");
      o.dataset.nexoraExam=text(book.exam || "");
    }
    el.appendChild(o);
  }

  function flatten(value,out=[]){
    if(Array.isArray(value)){
      value.forEach(x=>flatten(x,out));
      return out;
    }
    if(value && typeof value==="object"){
      const looksLikeBook =
        value.title || value.bookTitle || value.name ||
        value.book || value.chapters || value.chapterList;

      if(looksLikeBook) out.push(value);

      Object.keys(value).forEach(k=>{
        if(!["chapters","chapterList","chapterTitles"].includes(k)){
          const v=value[k];
          if(v && typeof v==="object") flatten(v,out);
        }
      });
    }
    return out;
  }

  function uniqueBooks(arr){
    const m=new Map();
    arr.forEach(b=>{
      const title=text(b.title || b.bookTitle || b.name || b.book);
      const cls=text(b.class || b.className || b.classLevel || b.grade);
      const sub=text(b.subject || b.subjectName);
      const id=text(b.id || b.bookId);
      if(!title) return;
      const key=norm(id || title+"|"+cls+"|"+sub);
      if(!m.has(key)) m.set(key,b);
    });
    return [...m.values()];
  }

  function bookTitle(b){
    return text(b.title || b.bookTitle || b.name || b.book);
  }

  function bookClass(b){
    return text(b.class || b.className || b.classLevel || b.grade);
  }

  function bookSubject(b){
    return text(b.subject || b.subjectName);
  }

  function chaptersOf(b){
    let c=b.chapters || b.chapterList || b.chapterTitles || b.contents || [];
    if(!Array.isArray(c)) return [];
    return c.map(x=>{
      if(typeof x==="string") return x.trim();
      return text(x.title || x.name || x.chapter || x.label);
    }).filter(Boolean);
  }

  async function loadCatalogue(){
    if(ncertLoaded) return;

    const urls=[
      "/api/short-notes/universal-catalogue?ts="+Date.now(),
      "/api/short-notes/catalogue?ts="+Date.now(),
      "/api/short-notes/manifest?ts="+Date.now()
    ];

    for(const url of urls){
      try{
        const r=await fetch(url,{cache:"no-store"});
        if(!r.ok) continue;
        const data=await r.json();
        const found=uniqueBooks(flatten(data));
        if(found.length){
          ncertCatalogue=found;
          ncertLoaded=true;
          console.log(
            "NEXORA NCERT FINAL CATALOGUE:",
            ncertCatalogue.length,
            "BOOKS"
          );
          return;
        }
      }catch(e){}
    }

    ncertCatalogue=[];
    ncertLoaded=true;
    console.log("NEXORA NCERT FINAL CATALOGUE: EMPTY");
  }

  function selectedClass(){
    return text(classEl.value) ||
      text(classEl.options[classEl.selectedIndex]?.textContent);
  }

  function selectedSubject(){
    return text(subjectEl.value) ||
      text(subjectEl.options[subjectEl.selectedIndex]?.textContent);
  }

  function findNCERTBooks(){
    const cls=norm(selectedClass());
    const sub=norm(selectedSubject());

    return ncertCatalogue.filter(b=>{
      const bc=norm(bookClass(b));
      const bs=norm(bookSubject(b));
      const title=norm(bookTitle(b));

      const classMatch =
        !cls ||
        bc===cls ||
        bc.includes(cls) ||
        cls.includes(bc);

      const subjectMatch =
        !sub ||
        bs===sub ||
        bs.includes(sub) ||
        sub.includes(bs) ||
        (sub.includes("math") && /math|ganita|गणित/.test(title)) ||
        (sub.includes("geography") && /geography|भूगोल/.test(title)) ||
        (sub.includes("history") && /history|इतिहास/.test(title)) ||
        (sub.includes("science") && /science|विज्ञान/.test(title));

      return classMatch && subjectMatch;
    });
  }

  function populateNCERTBooks(){
    if(!isNCERT()) return;

    const cls=selectedClass();
    const sub=selectedSubject();

    if(!cls){
      clearSelect(bookEl,"Select Class First");
      clearSelect(chapterEl,"Select Chapter");
      chapterEl.disabled=true;
      return;
    }

    const books=findNCERTBooks();

    clearSelect(bookEl,"Select Book");
    clearSelect(chapterEl,"Select Chapter");
    chapterEl.disabled=true;

    books.forEach(b=>{
      addOption(
        bookEl,
        b.id || b.bookId || bookTitle(b),
        bookTitle(b),
        b
      );
    });

    bookEl.disabled=false;

    console.log(
      "NEXORA NCERT FLOW:",
      "SUBJECT=",sub,
      "CLASS=",cls,
      "BOOKS=",books.length
    );
  }

  function populateNCERTChapters(){
    if(!isNCERT()) return;

    const opt=bookEl.options[bookEl.selectedIndex];
    if(!opt || !bookEl.value){
      clearSelect(chapterEl,"Select Chapter");
      chapterEl.disabled=true;
      return;
    }

    const title=norm(
      opt.dataset.bookTitle ||
      opt.textContent ||
      bookEl.value
    );

    const cls=norm(selectedClass());
    const sub=norm(selectedSubject());

    let b=ncertCatalogue.find(x=>{
      const t=norm(bookTitle(x));
      const c=norm(bookClass(x));
      return t===title &&
        (!cls || c===cls || c.includes(cls) || cls.includes(c));
    });

    if(!b){
      b=ncertCatalogue.find(x=>norm(bookTitle(x))===title);
    }

    let chapters=chaptersOf(b || {});

    /* Ganita Prakash Class 6 authoritative NCERT chapters */
    if(
      /ganita.?prakash|गणित.?प्रकाश/i.test(title) &&
      /6|class ?6|कक्षा ?6/i.test(cls)
    ){
      chapters=[
        "Patterns in Mathematics",
        "Lines and Angles",
        "Number Play",
        "Data Handling and Presentation",
        "Prime Time",
        "Perimeter and Area",
        "Fractions",
        "Playing with Constructions",
        "Symmetry",
        "The Other Side of Zero"
      ];
    }

    clearSelect(chapterEl,"Select Chapter");

    chapters.forEach((c,i)=>{
      addOption(chapterEl,String(i+1),c);
    });

    chapterEl.disabled=chapters.length===0;

    console.log(
      "NEXORA NCERT CHAPTER FLOW:",
      title,
      "CLASS=",selectedClass(),
      "CHAPTERS=",chapters.length
    );
  }

  function preserveNCERTClass(){
    if(!isNCERT()) return;

    classEl.dataset.nexoraNCERTClass=text(classEl.value);
    classEl.dataset.nexoraNCERTClassLabel=
      text(classEl.options[classEl.selectedIndex]?.textContent);

    classEl.style.display="";
    classEl.hidden=false;
    classEl.disabled=false;
    classEl.removeAttribute("hidden");
  }

  examEl.addEventListener("change",async function(){
    if(!isNCERT()) return;

    preserveNCERTClass();
    await loadCatalogue();
    populateNCERTBooks();
  },true);

  subjectEl.addEventListener("change",async function(){
    if(!isNCERT()) return;

    preserveNCERTClass();
    await loadCatalogue();
    populateNCERTBooks();
  },true);

  classEl.addEventListener("change",async function(){
    if(!isNCERT()) return;

    preserveNCERTClass();
    await loadCatalogue();
    populateNCERTBooks();
  },true);

  bookEl.addEventListener("change",function(){
    if(!isNCERT()) return;

    preserveNCERTClass();
    populateNCERTChapters();
  },true);

  chapterEl.addEventListener("change",function(){
    if(!isNCERT()) return;

    preserveNCERTClass();
  },true);

  if(isNCERT()){
    preserveNCERTClass();
  }

  console.log("NEXORA NCERT FINAL AUTHORITATIVE FLOW V1: ACTIVE");
})();



/* NEXORA NCERT CLASS + PDF STATE FINAL V2 */
(function(){
  "use strict";

  function nxIsNCERT(){
    const e=document.getElementById("examSelect");
    const v=((e&&e.value)||"")+" "+((e&&e.options[e.selectedIndex]?.text)||"");
    return /ncert/i.test(v);
  }

  function nxClassEl(){
    return document.getElementById("classSelect") ||
           document.getElementById("shortNotesClass") ||
           document.querySelector('[name="className"]');
  }

  function nxRememberClass(){
    if(!nxIsNCERT()) return;
    const c=nxClassEl();
    if(!c || !c.value || /^(other|select|choose|--)/i.test(c.value)) return;

    window.NEXORA_NCERT_CLASS=c.value;
    window.NEXORA_NCERT_CLASS_TEXT=
      c.options && c.selectedIndex>=0
      ? (c.options[c.selectedIndex].text || c.value)
      : c.value;

    try{
      localStorage.setItem("NEXORA_NCERT_CLASS",c.value);
      localStorage.setItem("NEXORA_NCERT_CLASS_TEXT",window.NEXORA_NCERT_CLASS_TEXT);
    }catch(_){}

    document.documentElement.dataset.nexoraNcertClass=c.value;
    document.documentElement.dataset.nexoraNcertClassText=window.NEXORA_NCERT_CLASS_TEXT;
  }

  function nxRestoreClass(){
    if(!nxIsNCERT()) return;
    const c=nxClassEl();
    if(!c) return;

    const remembered=
      window.NEXORA_NCERT_CLASS ||
      document.documentElement.dataset.nexoraNcertClass ||
      (function(){try{return localStorage.getItem("NEXORA_NCERT_CLASS")||""}catch(_){return ""}})();

    if(!remembered) return;

    const opt=[...c.options].find(o=>String(o.value)===String(remembered));
    if(opt){
      c.value=remembered;
      c.disabled=false;
      c.style.display="";
      c.dataset.nexoraNCERTClass=remembered;
    }
  }

  function nxInstall(){
    if(!nxIsNCERT()) return;
    nxRestoreClass();
    nxRememberClass();
  }

  ["change","input"].forEach(ev=>{
    document.addEventListener(ev,e=>{
      const c=nxClassEl();
      if(c && (e.target===c || e.target.closest?.("#classSelect,#shortNotesClass"))){
        nxRememberClass();
      }

      if(nxIsNCERT() &&
         (e.target?.id==="shortNotesBook" ||
          e.target?.id==="bookSelect" ||
          e.target?.id==="shortNotesChapter" ||
          e.target?.id==="chapterSelect")){
        setTimeout(nxRestoreClass,0);
        setTimeout(nxRestoreClass,50);
        setTimeout(nxRestoreClass,200);
      }
    },true);
  });

  document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(nxInstall,0);
    setTimeout(nxInstall,100);
    setTimeout(nxInstall,500);
  });

  const oldFetch=window.fetch;
  window.fetch=function(input,init){
    try{
      if(nxIsNCERT() && init && init.body && typeof init.body==="string"){
        const url=String(input||"");
        if(/\/api\/short-notes/i.test(url)){
          const body=JSON.parse(init.body);
          const c=nxClassEl();

          const cls=
            (c && c.value && !/^(other|select|choose|--)/i.test(c.value) ? c.value : "") ||
            window.NEXORA_NCERT_CLASS ||
            document.documentElement.dataset.nexoraNcertClass ||
            (function(){try{return localStorage.getItem("NEXORA_NCERT_CLASS")||""}catch(_){return ""}})();

          if(cls){
            body.className=cls;
            body.class=cls;
            body.classLevel=cls;
            body.educationClass=cls;
            init.body=JSON.stringify(body);
            console.log("NEXORA NCERT FINAL PDF CLASS:",cls);
          }
        }
      }
    }catch(err){
      console.warn("NEXORA NCERT CLASS BRIDGE:",err.message);
    }
    return oldFetch.apply(this,arguments);
  };
})();


/* NEXORA NCERT CLASS LOCK V3 */
(function(){
  "use strict";

  function ncert(){
    const e=document.getElementById("examSelect");
    const t=((e?.value||"")+" "+(e?.options?.[e.selectedIndex]?.text||""));
    return /ncert/i.test(t);
  }

  function cls(){
    return document.getElementById("classSelect") ||
           document.getElementById("shortNotesClass");
  }

  function valid(v){
    return v && !/^(other|select|choose|--|select class|class)$/i.test(String(v).trim());
  }

  function save(){
    if(!ncert()) return;
    const c=cls();
    if(!c || !valid(c.value)) return;

    window.NEXORA_LOCKED_NCERT_CLASS=c.value;
    window.NEXORA_LOCKED_NCERT_CLASS_TEXT=
      c.options?.[c.selectedIndex]?.text || c.value;

    try{
      sessionStorage.setItem("NEXORA_LOCKED_NCERT_CLASS",c.value);
      sessionStorage.setItem(
        "NEXORA_LOCKED_NCERT_CLASS_TEXT",
        window.NEXORA_LOCKED_NCERT_CLASS_TEXT
      );
    }catch(_){}
  }

  function restore(){
    if(!ncert()) return;
    const c=cls();
    if(!c) return;

    let v=window.NEXORA_LOCKED_NCERT_CLASS;

    if(!valid(v)){
      try{
        v=sessionStorage.getItem("NEXORA_LOCKED_NCERT_CLASS")||"";
      }catch(_){}
    }

    if(!valid(v)) return;

    const option=[...c.options].find(o=>String(o.value)===String(v));

    if(option){
      c.value=v;
      c.disabled=false;
      c.style.display="";
      c.hidden=false;
      c.dataset.nexoraLockedClass=v;

      if(c.value!==v){
        c.selectedIndex=[...c.options].indexOf(option);
      }
    }
  }

  function lock(){
    if(!ncert()) return;
    save();
    restore();
  }

  document.addEventListener("change",e=>{
    if(!ncert()) return;

    const id=e.target?.id||"";

    if(id==="classSelect" || id==="shortNotesClass"){
      save();
      restore();
      return;
    }

    if(
      id==="subjectSelect" ||
      id==="shortNotesSubject" ||
      id==="bookSelect" ||
      id==="shortNotesBook" ||
      id==="shortNotesChapter" ||
      id==="chapterSelect"
    ){
      setTimeout(lock,0);
      setTimeout(lock,100);
      setTimeout(lock,300);
      setTimeout(lock,700);
      setTimeout(lock,1200);
      setTimeout(lock,2000);
    }
  },true);

  const observer=new MutationObserver(()=>{
    if(ncert()) restore();
  });

  function start(){
    lock();
    observer.observe(document.body,{
      subtree:true,
      childList:true,
      attributes:true,
      attributeFilter:["style","disabled","hidden"]
    });
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",start,{once:true});
  }else{
    start();
  }

  setInterval(()=>{
    if(ncert()) restore();
  },1000);

  console.log("NEXORA NCERT CLASS LOCK V3: ACTIVE");
})();

/* NEXORA NCERT UI TEXT FINAL V1 */
(function(){
  "use strict";

  function isNCERT(){
    const e=document.getElementById("examSelect");
    return /ncert/i.test(
      ((e?.value||"")+" "+(e?.options?.[e.selectedIndex]?.text||""))
    );
  }

  function text(){
    if(!isNCERT()) return;

    const c=document.getElementById("classSelect") ||
            document.getElementById("shortNotesClass");
    const s=document.getElementById("subjectSelect") ||
            document.getElementById("shortNotesSubject");
    const b=document.getElementById("bookSelect") ||
            document.getElementById("shortNotesBook");
    const ch=document.getElementById("chapterSelect") ||
              document.getElementById("shortNotesChapter");

    const cv=c?.options?.[c.selectedIndex]?.text || c?.value || "";
    const sv=s?.options?.[s.selectedIndex]?.text || s?.value || "";
    const bv=b?.options?.[b.selectedIndex]?.text || b?.value || "";
    const chv=ch?.options?.[ch.selectedIndex]?.text || ch?.value || "";

    const nodes=[...document.querySelectorAll("h1,h2,h3,p,div,span,label")];

    nodes.forEach(n=>{
      const t=(n.textContent||"").trim();

      if(
        /Select Class, Subject, Book and Chapter to generate structured/i.test(t) ||
        /Select Class, Subject, Book and Chapter/i.test(t)
      ){
        n.textContent = "Select Class, Subject, Book and Chapter";
      }
    });

    const heading=[...document.querySelectorAll("h1,h2,h3")]
      .find(n=>/Create Professional Short Notes/i.test(n.textContent||""));

    if(heading){
      let info=heading.parentElement?.querySelector(".nexora-ncert-selection-info");

      if(!info){
        info=document.createElement("div");
        info.className="nexora-ncert-selection-info";
        info.style.cssText="margin:8px 0 14px;font-weight:600;";
        heading.parentElement?.insertBefore(info,heading.nextSibling);
      }

      const parts=[];
      if(/^class\s*\d+/i.test(cv) || /^\d+$/i.test(cv)) parts.push(cv);
      if(sv && !/select|choose/i.test(sv)) parts.push(sv);
      if(bv && !/select|choose/i.test(bv)) parts.push(bv);
      if(chv && !/select|choose/i.test(chv)) parts.push(chv);

      info.textContent=parts.length
        ? "NCERT: "+parts.join(" → ")
        : "NCERT: Select Class → Subject → Book → Chapter";
    }
  }

  document.addEventListener("change",()=>{
    if(isNCERT()){
      setTimeout(text,0);
      setTimeout(text,100);
      setTimeout(text,500);
    }
  },true);

  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",text,{once:true});
  else
    text();

  console.log("NEXORA NCERT UI TEXT FINAL V1: ACTIVE");
})();

/* ============================================================
   NEXORA SHORT NOTES BOOK/CHAPTER FINAL RECOVERY V1
   Fixes NCERT Book/Chapter blank/reset without replacing
   Standard Book flow.
   ============================================================ */
(function () {
    "use strict";

    function el(id) {
        return document.getElementById(id);
    }

    function txt(v) {
        return String(v ?? "").trim();
    }

    function isNCERT() {
        const exam = el("shortNotesExam");
        return /ncert/i.test(
            txt(exam?.value) + " " +
            txt(exam?.selectedOptions?.[0]?.textContent)
        );
    }

    function classKey(v) {
        const m = txt(v).toLowerCase().match(/(?:class\s*)?(\d{1,2})/);
        return m ? "class" + m[1] : txt(v).toLowerCase();
    }

    function canonical(v) {
        let x = txt(v).toLowerCase()
            .replace(/[_-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        if (x === "maths") x = "mathematics";
        if (x === "economy") x = "economics";
        if (x === "computer science") x = "computer";

        return x;
    }

    async function getCatalogue() {
        const base =
            window.location.protocol === "file:"
                ? "http://localhost:5001"
                : window.location.origin;

        const urls = [
            base + "/api/short-notes/catalogue?version=11",
            base + "/api/short-notes/universal-catalogue"
        ];

        for (const url of urls) {
            try {
                const r = await fetch(url, { cache: "no-store" });
                if (!r.ok) continue;

                const d = await r.json();

                if (d?.classes && typeof d.classes === "object")
                    return d.classes;

                if (d?.catalogue?.classes)
                    return d.catalogue.classes;

                if (d?.data?.classes)
                    return d.data.classes;

                if (d?.catalogue && typeof d.catalogue === "object")
                    return d.catalogue;
            } catch (e) {}
        }

        return {};
    }

    async function recoverBooks() {
        if (!isNCERT()) return;

        const cls = el("shortNotesClass");
        const sub = el("shortNotesSubject");
        const book = el("shortNotesBook");
        const chapter = el("shortNotesChapter");

        if (!cls || !sub || !book || !chapter) return;

        const classValue = txt(cls.value);
        const subjectValue = txt(sub.value);

        if (!classValue || !subjectValue) {
            book.innerHTML = '<option value="">Select Book</option>';
            chapter.innerHTML = '<option value="">Select Chapter</option>';
            book.disabled = true;
            chapter.disabled = true;
            return;
        }

        const catalogue = await getCatalogue();
        const key = classKey(classValue);
        const data = catalogue[key] || {};

        let subjectData = data[subjectValue];

        if (!subjectData) {
            const wanted = canonical(subjectValue);
            const found = Object.keys(data).find(
                k => canonical(k) === wanted
            );
            if (found) subjectData = data[found];
        }

        if (!subjectData) {
            console.warn("NEXORA FINAL RECOVERY: subject not found", key, subjectValue);
            return;
        }

        let books = Array.isArray(subjectData.books)
            ? subjectData.books
            : [];

        if (!books.length && (
            subjectData.title ||
            subjectData.titleEn ||
            subjectData.name
        )) {
            books = [subjectData];
        }

        const oldBook = txt(book.value);

        book.innerHTML = '<option value="">Select Book</option>';
        chapter.innerHTML = '<option value="">Select Chapter</option>';
        chapter.disabled = true;

        const seen = new Set();

        books.forEach((item, i) => {
            if (!item) return;

            const title = txt(
                item.titleEn ||
                item.title ||
                item.name ||
                item.titleHi
            );

            if (!title) return;

            const id = txt(item.id) || (
                "book-" +
                title.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")
            );

            const k = id.toLowerCase() + "|" + title.toLowerCase();

            if (seen.has(k)) return;
            seen.add(k);

            const o = document.createElement("option");
            o.value = id;
            o.textContent = title;
            o.dataset.book = JSON.stringify(item);
            book.appendChild(o);
        });

        book.disabled = book.options.length <= 1;

        if (oldBook && [...book.options].some(o => o.value === oldBook)) {
            book.value = oldBook;
        }

        console.log(
            "NEXORA FINAL RECOVERY BOOKS:",
            [...book.options].slice(1).map(o => o.textContent)
        );

        if (book.value) {
            await recoverChapters();
        }
    }

    async function recoverChapters() {
        if (!isNCERT()) return;

        const cls = el("shortNotesClass");
        const sub = el("shortNotesSubject");
        const book = el("shortNotesBook");
        const chapter = el("shortNotesChapter");

        if (!cls || !sub || !book || !chapter || !book.value) return;

        const catalogue = await getCatalogue();
        const key = classKey(cls.value);
        const data = catalogue[key] || {};

        let subjectData = data[sub.value];

        if (!subjectData) {
            const wanted = canonical(sub.value);
            const found = Object.keys(data).find(
                k => canonical(k) === wanted
            );
            if (found) subjectData = data[found];
        }

        const selected = (subjectData?.books || []).find(
            b => txt(b?.id) === txt(book.value)
        ) || (() => {
            const opt = book.selectedOptions?.[0];
            try { return JSON.parse(opt?.dataset?.book || "null"); }
            catch (_) { return null; }
        })();

        const raw = Array.isArray(selected?.chapters)
            ? selected.chapters
            : [];

        chapter.innerHTML = '<option value="">Select Chapter</option>';

        const seen = new Set();

        raw.forEach((item, i) => {
            const title = txt(
                typeof item === "string"
                    ? item
                    : (
                        item?.titleEn ||
                        item?.title ||
                        item?.name ||
                        item?.titleHi
                    )
            );

            if (!title || seen.has(title.toLowerCase())) return;
            seen.add(title.toLowerCase());

            const o = document.createElement("option");
            o.value = txt(item?.id) ||
                book.value + "-chapter-" + (i + 1);
            o.textContent = title;
            chapter.appendChild(o);
        });

        chapter.disabled = chapter.options.length <= 1;

        console.log(
            "NEXORA FINAL RECOVERY CHAPTERS:",
            [...chapter.options].slice(1).map(o => o.textContent)
        );
    }

    function schedule() {
        setTimeout(() => {
            recoverBooks().catch(console.error);
        }, 120);
    }

    function scheduleChapters() {
        setTimeout(() => {
            recoverChapters().catch(console.error);
        }, 120);
    }

    function init() {
        const cls = el("shortNotesClass");
        const sub = el("shortNotesSubject");
        const book = el("shortNotesBook");

        if (cls) cls.addEventListener("change", schedule, false);
        if (sub) sub.addEventListener("change", schedule, false);
        if (book) book.addEventListener("change", scheduleChapters, false);

        if (isNCERT()) schedule();

        console.log("NEXORA BOOK/CHAPTER FINAL RECOVERY: ACTIVE");
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();

/* ============================================================
   NEXORA SHORT NOTES SINGLE AUTHORITATIVE CASCADE V20
   ONE controller for NCERT + STANDARD BOOK
   ============================================================ */
(function () {
    "use strict";

    const $ = id => document.getElementById(id);
    const text = v => String(v ?? "").trim();

    const exam = () => $("shortNotesExam");
    const cls = () => $("shortNotesClass");
    const subject = () => $("shortNotesSubject");
    const book = () => $("shortNotesBook");
    const chapter = () => $("shortNotesChapter");

    function selectedText(el) {
        return text(el?.selectedOptions?.[0]?.textContent);
    }

    function isNCERT() {
        const e = exam();
        return /ncert/i.test(
            text(e?.value) + " " + selectedText(e)
        );
    }

    function reset(el, label, disabled = true) {
        if (!el) return;
        el.innerHTML = "";
        const o = document.createElement("option");
        o.value = "";
        o.textContent = label;
        o.selected = true;
        el.appendChild(o);
        el.disabled = disabled;
    }

    function add(el, value, label, data) {
        if (!el || !value || !label) return;
        const o = document.createElement("option");
        o.value = String(value);
        o.textContent = String(label);
        if (data) o.dataset.book = JSON.stringify(data);
        el.appendChild(o);
    }

    function norm(v) {
        return text(v)
            .toLowerCase()
            .replace(/[_-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function classKey(v) {
        const m = norm(v).match(/(?:class\s*)?(\d{1,2})/);
        return m ? "class" + m[1] : norm(v);
    }

    function subjectKey(v) {
        let x = norm(v);
        if (x === "maths") x = "mathematics";
        if (x === "economy") x = "economics";
        if (x === "computer science") x = "computer";
        return x;
    }

    async function fetchJSON(url) {
        try {
            const r = await fetch(url, {cache:"no-store"});
            if (!r.ok) return null;
            return await r.json();
        } catch (_) {
            return null;
        }
    }

    function unwrap(data) {
        if (!data || typeof data !== "object") return {};

        if (data.classes && typeof data.classes === "object")
            return data.classes;

        if (data.catalogue && typeof data.catalogue === "object") {
            if (data.catalogue.classes)
                return data.catalogue.classes;
            return data.catalogue;
        }

        if (data.data && typeof data.data === "object") {
            if (data.data.classes)
                return data.data.classes;
            return data.data;
        }

        return data;
    }

    function findSubject(tree, wanted) {
        if (!tree || typeof tree !== "object") return null;

        const direct = tree[wanted];
        if (direct) return direct;

        const w = subjectKey(wanted);

        for (const k of Object.keys(tree)) {
            if (subjectKey(k) === w)
                return tree[k];
        }

        return null;
    }

    function extractBooks(node) {
        if (!node || typeof node !== "object") return [];

        if (Array.isArray(node.books))
            return node.books;

        if (
            node.book &&
            typeof node.book === "object"
        ) {
            return [node.book];
        }

        if (
            node.title ||
            node.titleEn ||
            node.name
        ) {
            return [node];
        }

        return [];
    }

    function bookTitle(b) {
        return text(
            b?.titleEn ||
            b?.title ||
            b?.name ||
            b?.bookTitle ||
            b?.book_name ||
            b?.titleHi
        );
    }

    function bookId(b, i) {
        return text(
            b?.id ||
            b?.bookId ||
            b?.book_id
        ) || (
            "book-" +
            bookTitle(b)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-") +
            "-" + i
        );
    }

    function chaptersOf(b) {
        if (!b || typeof b !== "object") return [];

        const raw =
            b.chapters ||
            b.chapterList ||
            b.topics ||
            b.chapter_list ||
            [];

        if (Array.isArray(raw)) return raw;

        if (raw && typeof raw === "object")
            return Object.values(raw);

        return [];
    }

    function chapterTitle(c) {
        return text(
            typeof c === "string"
                ? c
                : (
                    c?.titleEn ||
                    c?.title ||
                    c?.name ||
                    c?.titleHi ||
                    c?.chapterTitle
                )
        );
    }

    async function getData() {
        const base =
            location.protocol === "file:"
                ? "http://localhost:5001"
                : location.origin;

        const urls = [
            base + "/api/short-notes/universal-catalogue?ts=" + Date.now(),
            base + "/api/short-notes/catalogue?ts=" + Date.now()
        ];

        for (const u of urls) {
            const d = await fetchJSON(u);
            if (d) return unwrap(d);
        }

        return {};
    }

    async function rebuildBooks() {
        const s = subject();
        const b = book();
        const c = chapter();

        if (!s || !b || !c) return;

        reset(b, "Select Book");
        reset(c, "Select Chapter");

        const data = await getData();

        let subjectData = null;

        if (isNCERT()) {
            const cl = cls();
            const key = classKey(cl?.value);

            subjectData =
                findSubject(
                    data[key] || {},
                    s.value
                );
        }

        if (!subjectData) {
            subjectData =
                findSubject(data, s.value);
        }

        if (!subjectData) {
            /* Search one level deeper for universal catalogue */
            for (const k of Object.keys(data || {})) {
                const bucket = data[k];
                const found = findSubject(bucket, s.value);
                if (found) {
                    subjectData = found;
                    break;
                }
            }
        }

        let books = extractBooks(subjectData);

        /* Fallback to existing authoritative loader */
        if (!books.length &&
            typeof window.NEXORARefreshBooksV11 === "function") {
            try {
                await window.NEXORARefreshBooksV11();
                if (b.options.length > 1) {
                    b.disabled = false;
                    return;
                }
            } catch (_) {}
        }

        const seen = new Set();

        books.forEach((item, i) => {
            const title = bookTitle(item);
            if (!title) return;

            const id = bookId(item, i);
            const key = id.toLowerCase() + "|" + title.toLowerCase();

            if (seen.has(key)) return;
            seen.add(key);

            add(b, id, title, item);
        });

        b.disabled = b.options.length <= 1;

        console.log(
            "NEXORA V20 BOOKS:",
            [...b.options].slice(1).map(x => x.textContent)
        );
    }

    async function rebuildChapters() {
        const b = book();
        const c = chapter();

        if (!b || !c || !b.value) {
            if (c) reset(c, "Select Chapter");
            return;
        }

        reset(c, "Select Chapter");

        let selected = null;

        const opt = b.selectedOptions?.[0];

        if (opt?.dataset?.book) {
            try {
                selected = JSON.parse(opt.dataset.book);
            } catch (_) {}
        }

        if (!selected) {
            const data = await getData();

            function search(node) {
                if (!node || typeof node !== "object") return null;

                const books = extractBooks(node);

                for (const x of books) {
                    if (
                        text(x?.id) === text(b.value) ||
                        text(x?.bookId) === text(b.value)
                    ) return x;
                }

                for (const k of Object.keys(node)) {
                    const found = search(node[k]);
                    if (found) return found;
                }

                return null;
            }

            selected = search(data);
        }

        const raw = chaptersOf(selected);
        const seen = new Set();

        raw.forEach((x, i) => {
            const title = chapterTitle(x);
            if (!title) return;

            const key = title.toLowerCase();
            if (seen.has(key)) return;
            seen.add(key);

            const id =
                text(x?.id) ||
                text(x?.chapterId) ||
                b.value + "-chapter-" + (i + 1);

            add(c, id, title);
        });

        c.disabled = c.options.length <= 1;

        console.log(
            "NEXORA V20 CHAPTERS:",
            [...c.options].slice(1).map(x => x.textContent)
        );
    }

    function install() {
        const c1 = cls();
        const s = subject();
        const b = book();

        if (!s || !b) return;

        /*
         * Capture phase + stopImmediatePropagation:
         * old competing Book/Chapter controllers cannot reset
         * the authoritative selectors after this controller runs.
         */
        if (c1) {
            c1.addEventListener("change", e => {
                if (isNCERT()) {
                    e.stopImmediatePropagation();
                    setTimeout(rebuildBooks, 80);
                }
            }, true);
        }

        s.addEventListener("change", e => {
            e.stopImmediatePropagation();
            setTimeout(rebuildBooks, 80);
        }, true);

        b.addEventListener("change", e => {
            e.stopImmediatePropagation();
            setTimeout(rebuildChapters, 80);
        }, true);

        setTimeout(() => {
            if (s.value) rebuildBooks();
        }, 250);

        console.log(
            "NEXORA V20 SINGLE CASCADE: ACTIVE"
        );
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            install,
            {once:true}
        );
    } else {
        install();
    }
})();

/* ============================================================
   NEXORA BOOK/CHAPTER BRUTE FORCE FINAL V30
   Finds books anywhere inside the authoritative catalogue.
   ============================================================ */
(function(){
"use strict";

const G=id=>document.getElementById(id);
const T=v=>String(v??"").trim();
const N=v=>T(v).toLowerCase().replace(/[_-]+/g," ").replace(/\s+/g," ").trim();

function ncert(){
 const e=G("shortNotesExam");
 return /ncert/i.test(T(e?.value)+" "+T(e?.selectedOptions?.[0]?.textContent));
}

function ck(v){
 const m=N(v).match(/(?:class\s*)?(\d{1,2})/);
 return m?"class"+m[1]:N(v);
}

function sk(v){
 let x=N(v);
 if(x==="maths")x="mathematics";
 if(x==="economy")x="economics";
 if(x==="computer science")x="computer";
 return x;
}

async function api(){
 const base=location.protocol==="file:"?"http://localhost:5001":location.origin;
 for(const u of [
   base+"/api/short-notes/universal-catalogue?ts="+Date.now(),
   base+"/api/short-notes/catalogue?ts="+Date.now()
 ]){
   try{
     const r=await fetch(u,{cache:"no-store"});
     if(!r.ok)continue;
     const d=await r.json();
     return d?.classes||d?.catalogue?.classes||d?.catalogue||d?.data?.classes||d?.data||d;
   }catch(e){}
 }
 return {};
}

function books(x){
 if(!x||typeof x!=="object")return [];
 if(Array.isArray(x.books))return x.books;
 if(Array.isArray(x.book))return x.book;
 if(x.book&&typeof x.book==="object")return [x.book];
 if(x.title||x.titleEn||x.name)return [x];
 return [];
}

function title(x){
 return T(x?.titleEn||x?.title||x?.name||x?.bookTitle||x?.titleHi);
}

function chapters(x){
 if(!x||typeof x!=="object")return [];
 const a=x.chapters||x.chapterList||x.topics||x.chapter_list;
 return Array.isArray(a)?a:(a&&typeof a==="object"?Object.values(a):[]);
}

function ctitle(x){
 return T(typeof x==="string"?x:(x?.titleEn||x?.title||x?.name||x?.titleHi||x?.chapterTitle));
}

/* recursively locate subject data containing books */
function findSubject(root,wanted){
 const target=sk(wanted);
 let result=null;

 function walk(x,depth){
   if(result||depth>12||!x||typeof x!=="object")return;
   if(Array.isArray(x)){
     for(const v of x)walk(v,depth+1);
     return;
   }

   for(const k of Object.keys(x)){
     const v=x[k];
     if(sk(k)===target){
       const b=books(v);
       if(b.length){result=v;return;}
     }
     walk(v,depth+1);
     if(result)return;
   }
 }
 walk(root,0);
 return result;
}

/* recursively locate selected book */
function findBook(root,id,ttl){
 let result=null;
 function walk(x,depth){
   if(result||depth>15||!x||typeof x!=="object")return;
   if(Array.isArray(x)){
     for(const v of x)walk(v,depth+1);
     return;
   }

   const b=books(x);
   for(const item of b){
     const iid=T(item?.id||item?.bookId||item?.book_id);
     const it=title(item);
     if((id&&iid===id)||(ttl&&N(it)===N(ttl))){
       result=item;return;
     }
   }

   for(const k of Object.keys(x)){
     walk(x[k],depth+1);
     if(result)return;
   }
 }
 walk(root,0);
 return result;
}

async function rebuildBooks(){
 const s=G("shortNotesSubject"),b=G("shortNotesBook"),c=G("shortNotesChapter");
 if(!s||!b||!c||!T(s.value))return;

 const old=T(b.value);
 b.innerHTML='<option value="">Select Book</option>';
 c.innerHTML='<option value="">Select Chapter</option>';
 b.disabled=true;c.disabled=true;

 const data=await api();
 let source=null;

 if(ncert()){
   const cl=G("shortNotesClass");
   const classData=data?.[ck(cl?.value)];
   source=findSubject(classData||data,s.value);
 }

 if(!source)source=findSubject(data,s.value);

 let list=books(source);

 /* final global scan for subject-specific book arrays */
 if(!list.length){
   function scan(x){
     if(list.length||!x||typeof x!=="object")return;
     if(Array.isArray(x)){
       for(const v of x)scan(v);
       return;
     }
     for(const k of Object.keys(x)){
       if(sk(k)===sk(s.value)){
         const q=books(x[k]);
         if(q.length){list=q;return;}
       }
       scan(x[k]);
       if(list.length)return;
     }
   }
   scan(data);
 }

 const seen=new Set();
 list.forEach((item,i)=>{
   const tt=title(item);
   if(!tt)return;
   const id=T(item?.id||item?.bookId||item?.book_id)||
     "book-"+tt.toLowerCase().replace(/[^a-z0-9]+/g,"-")+"-"+i;
   const key=id+"|"+N(tt);
   if(seen.has(key))return;
   seen.add(key);

   const o=document.createElement("option");
   o.value=id;
   o.textContent=tt;
   o.dataset.book=JSON.stringify(item);
   b.appendChild(o);
 });

 b.disabled=b.options.length<=1;

 if(old&&[...b.options].some(o=>o.value===old))b.value=old;

 console.log("NEXORA V30 BOOKS:",[...b.options].slice(1).map(o=>o.textContent));

 if(b.value)await rebuildChapters();
}

async function rebuildChapters(){
 const b=G("shortNotesBook"),c=G("shortNotesChapter");
 if(!b||!c||!b.value)return;

 c.innerHTML='<option value="">Select Chapter</option>';

 let item=null;
 const opt=b.selectedOptions?.[0];

 try{if(opt?.dataset?.book)item=JSON.parse(opt.dataset.book)}catch(e){}

 if(!item){
   const data=await api();
   item=findBook(data,b.value,T(opt?.textContent));
 }

 const list=chapters(item);
 const seen=new Set();

 list.forEach((x,i)=>{
   const tt=ctitle(x);
   if(!tt||seen.has(N(tt)))return;
   seen.add(N(tt));
   const o=document.createElement("option");
   o.value=T(x?.id||x?.chapterId)||b.value+"-chapter-"+(i+1);
   o.textContent=tt;
   c.appendChild(o);
 });

 c.disabled=c.options.length<=1;
 console.log("NEXORA V30 CHAPTERS:",[...c.options].slice(1).map(o=>o.textContent));
}

function install(){
 const s=G("shortNotesSubject"),b=G("shortNotesBook"),c=G("shortNotesChapter"),cl=G("shortNotesClass");
 if(!s||!b)return;

 const run=()=>setTimeout(()=>rebuildBooks().catch(console.error),150);
 const runC=()=>setTimeout(()=>rebuildChapters().catch(console.error),150);

 if(cl)cl.addEventListener("change",run,true);
 s.addEventListener("change",run,true);
 b.addEventListener("change",e=>{e.stopImmediatePropagation();runC()},true);

 setTimeout(run,500);
 console.log("NEXORA V30 BRUTE FORCE BOOK/CHAPTER: ACTIVE");
}

if(document.readyState==="loading")
 document.addEventListener("DOMContentLoaded",install,{once:true});
else install();

})();

/* ============================================================
   NEXORA SHORT NOTES BOOK/CHAPTER DIRECT DATA AUTHORITY V31
   SOURCE: /api/short-notes/universal-catalogue -> books[]
   STANDARD: Exam + Subject -> Standard Books
   NCERT: Exam + Subject + Class -> NCERT Books
   ============================================================ */
(function NEXORA_SHORT_NOTES_DIRECT_BOOK_AUTHORITY_V31(){
  'use strict';

  const exam = document.getElementById('shortNotesExam');
  const cls = document.getElementById('shortNotesClass');
  const subject = document.getElementById('shortNotesSubject');
  const book = document.getElementById('shortNotesBook');
  const chapter = document.getElementById('shortNotesChapter');

  if(!exam || !subject || !book || !chapter) return;

  let allBooks = [];
  let loaded = false;

  const norm = v => String(v || '').trim().toLowerCase()
    .replace(/&/g,'and').replace(/[^a-z0-9]+/g,'');

  const isClassVisible = () => {
    if(!cls) return false;
    const st = getComputedStyle(cls);
    return st.display !== 'none' &&
           st.visibility !== 'hidden' &&
           cls.offsetParent !== null;
  };

  const subjectMatch = (a,b) => {
    const x = norm(a), y = norm(b);
    if(!x || !y) return false;
    if(x === y) return true;
    const aliases = {
      geography:['geography'],
      history:['history'],
      polity:['polity','politicalscience'],
      economics:['economy','economics'],
      economy:['economy','economics'],
      science:['science'],
      mathematics:['mathematics','maths','math'],
      physics:['physics'],
      chemistry:['chemistry'],
      biology:['biology'],
      english:['english'],
      hindi:['hindi'],
      culture:['culture','artandculture'],
      artandculture:['artandculture','culture']
    };
    return (aliases[x] || [x]).includes(y) ||
           (aliases[y] || [y]).includes(x);
  };

  async function loadData(){
    if(loaded && allBooks.length) return;
    try{
      const r = await fetch('/api/short-notes/universal-catalogue?direct=v31&_='+Date.now(), {
        cache:'no-store'
      });
      const d = await r.json();
      allBooks = Array.isArray(d.books) ? d.books : [];
      loaded = true;
      console.log('NEXORA V31 DIRECT BOOK DATA:', allBooks.length);
    }catch(e){
      console.error('NEXORA V31 BOOK API ERROR:', e);
      return;
    }
  }

  function clearSelect(el, text){
    if(!el) return;
    el.innerHTML = '';
    const o = document.createElement('option');
    o.value = '';
    o.textContent = text;
    el.appendChild(o);
  }

  function populateBooks(){
    if(!subject.value) return;

    const nc = isClassVisible() && cls && cls.value;
    const selectedClass = nc ? norm(cls.value) : '';

    let books = allBooks.filter(b =>
      b &&
      subjectMatch(b.subject, subject.value)
    );

    if(nc){
      books = books.filter(b =>
        norm(b.kind) === 'ncert' &&
        norm(b.class) === selectedClass
      );
    }else{
      books = books.filter(b =>
        norm(b.kind) !== 'ncert'
      );
    }

    const seen = new Set();
    books = books.filter(b => {
      const k = String(b.id || b.title || '').toLowerCase();
      if(seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    clearSelect(book, books.length ? 'Select Book' : 'No books available');
    clearSelect(chapter, 'Select Chapter');

    books.forEach(b => {
      const o = document.createElement('option');
      o.value = b.id || b.title;
      o.textContent = b.author
        ? `${b.title} — ${b.author}`
        : b.title;
      o.dataset.bookId = b.id || '';
      o.dataset.bookTitle = b.title || '';
      o.dataset.chapters = JSON.stringify(Array.isArray(b.chapters) ? b.chapters : []);
      book.appendChild(o);
    });

    book.disabled = books.length === 0;

    console.log(
      'NEXORA V31 BOOKS:',
      nc ? 'NCERT' : 'STANDARD',
      'CLASS=', selectedClass,
      'SUBJECT=', subject.value,
      'COUNT=', books.length
    );
  }

  function populateChapters(){
    const opt = book.options[book.selectedIndex];
    if(!opt || !opt.value) {
      clearSelect(chapter, 'Select Chapter');
      chapter.disabled = true;
      return;
    }

    let chapters = [];
    try{
      chapters = JSON.parse(opt.dataset.chapters || '[]');
    }catch(e){}

    clearSelect(chapter, chapters.length ? 'Select Chapter' : 'No chapters available');

    chapters.forEach((c,i) => {
      const o = document.createElement('option');
      o.value = c;
      o.textContent = `${i+1}. ${c}`;
      chapter.appendChild(o);
    });

    chapter.disabled = chapters.length === 0;
  }

  async function refreshBooks(){
    await loadData();
    setTimeout(populateBooks, 0);
    setTimeout(populateBooks, 250);
    setTimeout(populateBooks, 700);
  }

  async function refreshChapters(){
    await loadData();
    setTimeout(populateChapters, 0);
    setTimeout(populateChapters, 300);
  }

  subject.addEventListener('change', refreshBooks, true);
  if(cls) cls.addEventListener('change', refreshBooks, true);
  book.addEventListener('change', refreshChapters, true);

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(refreshBooks, 500);
  });

  window.NEXORA_SHORT_NOTES_DIRECT_BOOK_V31 = {
    refreshBooks,
    refreshChapters,
    getBooks: () => allBooks
  };

  console.log('NEXORA SHORT NOTES DIRECT BOOK AUTHORITY V31: ACTIVE');
})();

/* ============================================================
   NEXORA SHORT NOTES FORCE BOOK AUTHORITY V32
   Beats legacy reset/listener conflicts by polling final DOM state.
   ============================================================ */
(function NEXORA_SHORT_NOTES_FORCE_BOOK_V32(){
  'use strict';

  const E = document.getElementById('shortNotesExam');
  const C = document.getElementById('shortNotesClass');
  const S = document.getElementById('shortNotesSubject');
  const B = document.getElementById('shortNotesBook');
  const H = document.getElementById('shortNotesChapter');

  if(!E || !S || !B || !H) return;

  let data = [];
  let lastKey = '';

  const n = v => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g,'');

  const subjectOK = (a,b) => {
    const x=n(a), y=n(b);
    if(!x || !y) return false;
    if(x===y) return true;
    const m={
      economy:['economy','economics'],
      economics:['economy','economics'],
      polity:['polity','politicalscience'],
      politicalscience:['polity','politicalscience'],
      culture:['culture','artandculture'],
      artandculture:['culture','artandculture'],
      maths:['mathematics','maths','math'],
      mathematics:['mathematics','maths','math']
    };
    return (m[x]||[x]).includes(y)||(m[y]||[y]).includes(x);
  };

  async function getData(){
    try{
      const r=await fetch('/api/short-notes/universal-catalogue?force=v32&_='+Date.now(),{cache:'no-store'});
      const d=await r.json();
      if(Array.isArray(d.books)) data=d.books;
    }catch(e){
      console.error('V32 API:',e);
    }
  }

  function setBooks(){
    if(!S.value || !data.length) return;

    const classValue=C ? n(C.value) : '';

    let list=data.filter(b=>b && subjectOK(b.subject,S.value));

    if(classValue){
      list=list.filter(b=>n(b.kind)==='ncert' && n(b.class)===classValue);
    }else{
      list=list.filter(b=>n(b.kind)!=='ncert');
    }

    const seen=new Set();
    list=list.filter(b=>{
      const k=n(b.id||b.title);
      if(seen.has(k)) return false;
      seen.add(k);
      return true;
    });

    const wanted=B.value;

    B.innerHTML='<option value="">Select Book</option>';

    list.forEach(b=>{
      const o=document.createElement('option');
      o.value=b.id||b.title;
      o.textContent=b.author ? b.title+' — '+b.author : b.title;
      o.dataset.chapters=JSON.stringify(b.chapters||[]);
      B.appendChild(o);
    });

    if(wanted && [...B.options].some(o=>o.value===wanted))
      B.value=wanted;

    B.disabled=list.length===0;

    if(!B.value){
      H.innerHTML='<option value="">Select Chapter</option>';
      H.disabled=true;
    }

    console.log('V32 FINAL BOOK:',list.length,'CLASS:',classValue,'SUBJECT:',S.value);
  }

  function setChapters(){
    const o=B.options[B.selectedIndex];
    if(!o || !o.value) return;

    let ch=[];
    try{ch=JSON.parse(o.dataset.chapters||'[]')}catch(e){}

    const old=H.value;
    H.innerHTML='<option value="">Select Chapter</option>';

    ch.forEach((x,i)=>{
      const q=document.createElement('option');
      q.value=x;
      q.textContent=(i+1)+'. '+x;
      H.appendChild(q);
    });

    if(old && [...H.options].some(x=>x.value===old)) H.value=old;
    H.disabled=ch.length===0;
  }

  async function force(){
    if(!data.length) await getData();

    const key=[
      E.value,
      C ? C.value : '',
      S.value,
      B.value
    ].join('|');

    if(key!==lastKey){
      lastKey=key;
      setBooks();
      setChapters();
    }else if(B.options.length<=1 && S.value){
      setBooks();
    }else if(B.value && H.options.length<=1){
      setChapters();
    }
  }

  getData().then(force);

  /* Independent of all previous change listeners */
  setInterval(force,500);

  console.log('NEXORA SHORT NOTES FORCE BOOK AUTHORITY V32: ACTIVE');
})();

/* ============================================================
   NEXORA SOURCE FINAL LOCK V4
   ALWAYS REBUILDS UI FROM TITLE + URL ONLY
   AI SOURCE CONTEXT IS UNTOUCHED
   ============================================================ */
(function NEXORA_SOURCE_FINAL_LOCK_V4(){
  if(window.__NEXORA_SOURCE_FINAL_LOCK_V4__) return;
  window.__NEXORA_SOURCE_FINAL_LOCK_V4__=true;

  function clean(){
    try{
      document.querySelectorAll(".sources-section").forEach(function(section){

        const links=[...section.querySelectorAll("a[href]")]
          .filter(function(a){
            const u=(a.href||"").toLowerCase();
            return u && !u.includes("youtube.com/results");
          })
          .map(function(a){
            return {
              href:a.href,
              text:(a.textContent||a.innerText||"").replace(/\s+/g," ").trim()
            };
          })
          .filter(function(x){ return x.href; });

        if(!links.length) return;

        const old=section.querySelector(".nexora-source-final-v4");
        if(old) return;

        const frag=document.createDocumentFragment();

        const heading=document.createElement("div");
        heading.className="section-title";
        const h2=document.createElement("h2");
        h2.textContent="Sources & Evidence";
        heading.appendChild(h2);
        frag.appendChild(heading);

        const box=document.createElement("div");
        box.className="nexora-source-final-v4";

        links.forEach(function(item,index){
          const row=document.createElement("div");
          row.style.cssText="margin:10px 0;padding:8px 0;";

          const a=document.createElement("a");
          a.href=item.href;
          a.target="_blank";
          a.rel="noopener noreferrer";
          a.textContent=item.text || ("Source "+(index+1));
          a.style.cssText="font-weight:700;text-decoration:underline;cursor:pointer;";

          row.appendChild(a);
          box.appendChild(row);
        });

        frag.appendChild(box);

        section.replaceChildren(frag);
      });
    }catch(e){
      console.warn("NEXORA SOURCE FINAL LOCK V4:",e);
    }
  }

  clean();

  new MutationObserver(function(){
    document.querySelectorAll(".sources-section .nexora-source-final-v4")
      .forEach(function(box){
        const section=box.closest(".sources-section");
        if(section && section.children.length>2){
          const links=[...section.querySelectorAll("a[href]")]
            .filter(a=>!(a.href||"").toLowerCase().includes("youtube.com/results"));
          if(links.length){
            section.querySelectorAll(":scope > *:not(.section-title):not(.nexora-source-final-v4)")
              .forEach(el=>el.remove());
          }
        }
      });
  }).observe(document.body,{childList:true,subtree:true});

  setInterval(function(){
    document.querySelectorAll(".sources-section .nexora-source-final-v4")
      .forEach(function(box){
        const section=box.closest(".sources-section");
        if(!section) return;
        section.querySelectorAll(":scope > *:not(.section-title):not(.nexora-source-final-v4)")
          .forEach(function(el){ el.remove(); });
      });
  },500);
})();




// NEXORA DIRECT WEBSITE OPEN FINAL
(function(){
  if(window.__NEXORA_DIRECT_WEBSITE_FINAL__) return;
  window.__NEXORA_DIRECT_WEBSITE_FINAL__=true;

  const DIRECT_WEBSITES=[
    {keys:["flipkart"],url:"https://www.flipkart.com/"},
    {keys:["amazon"],url:"https://www.amazon.in/"},
    {keys:["google"],url:"https://www.google.com/"},
    {keys:["youtube"],url:"https://www.youtube.com/"},
    {keys:["facebook"],url:"https://www.facebook.com/"},
    {keys:["instagram"],url:"https://www.instagram.com/"},
    {keys:["wikipedia"],url:"https://www.wikipedia.org/"},
    {keys:["linkedin"],url:"https://www.linkedin.com/"},
    {keys:["github"],url:"https://github.com/"},
    {keys:["gmail"],url:"https://mail.google.com/"},
    {keys:["whatsapp"],url:"https://web.whatsapp.com/"},
    {keys:["sarkari result","sarkariresult"],url:"https://www.sarkariresult.com/"}
  ];

  function nexoraDirectWebsite(q){
    const x=String(q||"").trim().toLowerCase()
      .replace(/[?!.]+$/g,"")
      .replace(/\s+/g," ");

    if(!x) return null;

    for(const item of DIRECT_WEBSITES){
      for(const key of item.keys){
        if(x===key || x.startsWith(key+" ")){
          // Sarkari Result queries such as:
          // "sarkari result 2026", "sarkariresult 2026"
          // are treated as direct website intent.
          if(key==="sarkari result" || key==="sarkariresult"){
            if(/\bsarkari\s*result\b|\bsarkariresult\b/.test(x))
              return item.url;
          }

          // Brand-name queries open the official site directly.
          // Do not hijack ordinary questions containing the brand.
          const remainder=x.slice(key.length).trim();
          if(!remainder ||
             /^(website|official|site|login|app|india|com|\.com)$/i.test(remainder)){
            return item.url;
          }
        }
      }
    }

    return null;
  }

  window.NEXORA_DIRECT_WEBSITE=nexoraDirectWebsite;

  document.addEventListener("submit",function(e){
    const form=e.target;
    if(!form || !form.matches("#nexoraSearchForm")) return;

    const input=form.querySelector("input[name='q'],#nexoraSearchInput,input[type='search']");
    if(!input) return;

    const url=nexoraDirectWebsite(input.value);
    if(!url) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    console.log("NEXORA DIRECT WEBSITE:",input.value,"=>",url);

    window.location.href=url;
  },true);

  document.addEventListener("click",function(e){
    const btn=e.target.closest("#nexoraSearchButton,button[type='submit'],input[type='submit']");
    if(!btn) return;

    const form=btn.closest("#nexoraSearchForm");
    if(!form) return;

    const input=form.querySelector("input[name='q'],#nexoraSearchInput,input[type='search']");
    if(!input) return;

    const url=nexoraDirectWebsite(input.value);
    if(!url) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    console.log("NEXORA DIRECT WEBSITE:",input.value,"=>",url);
    window.location.href=url;
  },true);

  console.log("NEXORA DIRECT WEBSITE INTENT: ACTIVE");
})();

/* ============================================================
   NEXORA DIRECT WEBSITE AUTHORITY V3
   WEBSITE INTENT -> OPEN OFFICIAL SITE DIRECTLY
   NORMAL SEARCH -> PRESERVED
   ============================================================ */
(function(){
  if(window.__NEXORA_DIRECT_WEBSITE_V3__) return;
  window.__NEXORA_DIRECT_WEBSITE_V3__=true;

  const sites=[
    ["sarkari result","https://www.sarkariresult.com/"],
    ["sarkariresult","https://www.sarkariresult.com/"],
    ["flipkart","https://www.flipkart.com/"],
    ["amazon india","https://www.amazon.in/"],
    ["amazon","https://www.amazon.in/"],
    ["youtube","https://www.youtube.com/"],
    ["google","https://www.google.com/"],
    ["facebook","https://www.facebook.com/"],
    ["instagram","https://www.instagram.com/"],
    ["wikipedia","https://www.wikipedia.org/"],
    ["linkedin","https://www.linkedin.com/"],
    ["github","https://github.com/"],
    ["gmail","https://mail.google.com/"],
    ["whatsapp","https://web.whatsapp.com/"]
  ];

  function directUrl(raw){
    let q=String(raw||"")
      .trim()
      .toLowerCase()
      .replace(/\s+/g," ")
      .replace(/[?!.,]+$/,"");

    if(!q) return null;

    for(const [name,url] of sites){
      if(q===name) return url;

      const rest=q.slice(name.length).trim();

      if(
        rest &&
        (
          /^20\d{2}$/.test(rest) ||
          /^(website|official|site|login|app|india)$/.test(rest)
        )
      ){
        return url;
      }
    }

    return null;
  }

  function getInput(form){
    return form?.querySelector(
      "input[name='q'],#nexoraSearchInput,#searchInput,input[type='search']"
    );
  }

  function intercept(e){
    const form=
      e.target?.closest?.("#nexoraSearchForm") ||
      (e.target?.matches?.("#nexoraSearchForm") ? e.target : null);

    if(!form) return;

    const input=getInput(form);
    if(!input) return;

    const url=directUrl(input.value);
    if(!url) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    console.log(
      "NEXORA DIRECT WEBSITE V3:",
      input.value,
      "=>",
      url
    );

    window.location.assign(url);
  }

  document.addEventListener("submit",intercept,true);

  document.addEventListener("click",function(e){
    const btn=e.target?.closest?.(
      "#nexoraSearchButton,#nexoraSearchForm button[type='submit'],#nexoraSearchForm input[type='submit']"
    );

    if(!btn) return;

    const form=btn.closest("#nexoraSearchForm");
    if(!form) return;

    const input=getInput(form);
    if(!input) return;

    const url=directUrl(input.value);
    if(!url) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    console.log(
      "NEXORA DIRECT WEBSITE V3:",
      input.value,
      "=>",
      url
    );

    window.location.assign(url);
  },true);

  window.NEXORA_DIRECT_WEBSITE=directUrl;

  console.log("NEXORA DIRECT WEBSITE AUTHORITY V3: ACTIVE");
})();
