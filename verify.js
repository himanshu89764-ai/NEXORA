const verifyInput =
    document.getElementById("verifyInput");

const verifyButton =
    document.getElementById("verifyButton");

const verificationStatus =
    document.getElementById("verificationStatus");

const claimTitle =
    document.getElementById("claimTitle");

const claimText =
    document.getElementById("claimText");

const sourceOneTitle =
    document.getElementById("sourceOneTitle");

const sourceOneText =
    document.getElementById("sourceOneText");

const sourceOneStatus =
    document.getElementById("sourceOneStatus");

const sourceTwoTitle =
    document.getElementById("sourceTwoTitle");

const sourceTwoText =
    document.getElementById("sourceTwoText");

const sourceTwoStatus =
    document.getElementById("sourceTwoStatus");

const sourceThreeTitle =
    document.getElementById("sourceThreeTitle");

const sourceThreeText =
    document.getElementById("sourceThreeText");

const sourceThreeStatus =
    document.getElementById("sourceThreeStatus");

const summaryTitle =
    document.getElementById("summaryTitle");

const summaryText =
    document.getElementById("summaryText");


// =================================
// VERIFY BUTTON
// =================================

verifyButton.addEventListener(
    "click",
    performVerification
);


// =================================
// ENTER KEY
// =================================

verifyInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            performVerification();
        }

    }
);


// =================================
// MAIN VERIFICATION
// =================================

async function performVerification() {

    const claim =
        verifyInput.value.trim();


    if (claim === "") {

        alert(
            "Please enter a topic to verify."
        );

        verifyInput.focus();

        return;

    }


    // =================================
    // LOADING STATE
    // =================================

    verificationStatus.textContent =
        "NEXORA is verifying...";

    claimTitle.textContent =
        claim;

    claimText.textContent =
        "Searching real web sources and comparing evidence...";

    summaryTitle.textContent =
        "Verification in progress";

    summaryText.textContent =
        "NEXORA is searching Tavily and asking Qwen to compare the evidence.";


    resetSource(
        sourceOneTitle,
        sourceOneText,
        sourceOneStatus
    );

    resetSource(
        sourceTwoTitle,
        sourceTwoText,
        sourceTwoStatus
    );

    resetSource(
        sourceThreeTitle,
        sourceThreeText,
        sourceThreeStatus
    );


    try {

        // =================================
        // CALL NEXORA BACKEND
        // =================================

        const response =
            await fetch(
                (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://nexora-o8wi.onrender.com") + "/api/verify",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        claim: claim
                    })

                }
            );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Verification failed."
            );

        }


        // =================================
        // VERIFICATION STATUS
        // =================================

        verificationStatus.textContent =
            data.status ||
            "Needs Review";


        // =================================
        // CLAIM
        // =================================

        claimTitle.textContent =
            data.claim ||
            claim;

        claimText.textContent =
            "NEXORA compared real web sources and generated an evidence-based assessment.";


        // =================================
        // SOURCES
        // =================================

        const sources =
            data.sources || [];
            const sourceThreeCard =
    document.getElementById("sourceThreeCard");

if (sourceThreeCard) {
    sourceThreeCard.style.display =
        sources[2] ? "" : "none";
}


        updateSource(
            sources[0],
            sourceOneTitle,
            sourceOneText,
            sourceOneStatus
        );


        updateSource(
            sources[1],
            sourceTwoTitle,
            sourceTwoText,
            sourceTwoStatus
        );


        updateSource(
            sources[2],
            sourceThreeTitle,
            sourceThreeText,
            sourceThreeStatus
        );


        // =================================
        // SUMMARY
        // =================================

        summaryTitle.textContent =
            "NEXORA Verification Result: " +
            (data.status || "Needs Review");


        let summary =
            data.verification ||
            "No verification explanation was returned.";


        // Add source statistics

        if (data.confidence) {

            summary +=
                "\n\nConfidence: " +
                data.confidence;

        }


        if (
            typeof data.averageSourceQuality ===
            "number"
        ) {

            summary +=
                "\nAverage Source Quality: " +
                data.averageSourceQuality +
                "/100";

        }


        summary +=
            "\nSources Compared: " +
            (data.sourceCount || sources.length);


        summaryText.textContent =
            summary;


        // =================================
        // COUNT
        // =================================

        let verifyCount =
            parseInt(
                localStorage.getItem(
                    "nexoraVerifyCount"
                )
            ) || 0;


        verifyCount++;


        localStorage.setItem(
            "nexoraVerifyCount",
            verifyCount
        );


    } catch (error) {

        console.error(
            "NEXORA Verification Error:",
            error
        );


        verificationStatus.textContent =
            "Verification Error";


        claimText.textContent =
            "NEXORA could not complete the verification.";


        summaryTitle.textContent =
            "Verification failed";


        summaryText.textContent =
            error.message ||
            "Please make sure the NEXORA backend is running.";

    }

}


// =================================
// RESET SOURCE
// =================================

function resetSource(
    titleElement,
    textElement,
    statusElement
) {

    titleElement.textContent =
        "Searching...";

    textElement.textContent =
        "Waiting for source information.";

    statusElement.textContent =
        "Checking";

}


// =================================
// UPDATE SOURCE CARD
// =================================

function updateSource(
    source,
    titleElement,
    textElement,
    statusElement
) {

    if (!source) {

        titleElement.textContent =
            "No source available.";

        textElement.textContent =
            "NEXORA did not receive another source.";

        statusElement.textContent =
            "Not Available";

        return;

    }


    // =================================
    // SOURCE TITLE
    // =================================

    titleElement.textContent =
        source.title ||
        "Web Source";


    // =================================
    // SOURCE INFORMATION
    // =================================

    const sourceType =
        source.sourceType ||
        "General Web";


    const quality =
        source.quality ||
        "Unknown";


    const qualityScore =
        typeof source.qualityScore ===
        "number"
            ? source.qualityScore
            : "N/A";


    const relevanceScore =
        typeof source.relevanceScore ===
        "number"
            ? Math.round(
                source.relevanceScore * 100
            )
            : null;


    // =================================
    // CREATE SOURCE DETAILS
    // =================================

    let details =
        "";


    details +=
        "Type: " +
        sourceType +
        "\n";


    details +=
        "Quality: " +
        quality +
        "\n";


    details +=
        "Quality Score: " +
        qualityScore +
        "/100";


    if (
        relevanceScore !== null
    ) {

        details +=
            "\nRelevance: " +
            relevanceScore +
            "%";

    }


    details +=
        "\n\n";


    details +=
        source.content ||
        "Source information unavailable.";


    textElement.textContent =
        details;


    // =================================
    // STATUS
    // =================================

    statusElement.textContent =
        "✓ " +
        sourceType +
        " • " +
        qualityScore +
        "/100";


    // =================================
    // CLICKABLE SOURCE
    // =================================

    if (
        source.url &&
        /^https?:\/\//i.test(source.url)
    ) {

        let existingLink =
            statusElement.parentElement
                .querySelector(
                    ".nexora-source-link"
                );


        if (!existingLink) {

            existingLink =
                document.createElement(
                    "a"
                );

            existingLink.className =
                "nexora-source-link";

            existingLink.textContent =
                "Open Source ↗️";

            existingLink.target =
                "_blank";

            existingLink.rel =
                "noopener noreferrer";


            existingLink.style.display =
                "inline-block";

            existingLink.style.marginTop =
                "8px";

            existingLink.style.textDecoration =
                "none";


            statusElement.parentElement
                .appendChild(
                    existingLink
                );

        }


        existingLink.href =
            source.url;

    }

}