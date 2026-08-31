function setQuestion(question) {
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = question;
        searchInput.focus();
    }
}

async function performSearch() {
    if (localStorage.getItem("nexoraLoggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    const searchInput = document.getElementById("searchInput");
    const askButton = document.querySelector(".ask-btn");

    if (!searchInput) {
        alert("Search input not found.");
        return;
    }

    const question = searchInput.value.trim();

    if (!question) {
        alert("Please enter a question first.");
        searchInput.focus();
        return;
    }

    if (askButton) {
        askButton.disabled = true;
        askButton.textContent = "Thinking...";
    }

    let result = document.getElementById("searchResult");

    if (!result) {
        result = document.createElement("div");
        result.id = "searchResult";

        result.style.maxWidth = "900px";
        result.style.margin = "30px auto";
        result.style.padding = "25px";
        result.style.borderRadius = "16px";
        result.style.background = "#ffffff";
        result.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
        result.style.lineHeight = "1.6";

        const searchContainer =
            document.querySelector(".search-container");

        if (searchContainer) {
            searchContainer.appendChild(result);
        } else {
            document.body.appendChild(result);
        }
    }

    result.innerHTML = `
        <h2>🧠 NEXORA AI is thinking...</h2>
        <p>Researching web sources and generating an evidence-based answer.</p>
    `;

    try {

        const response = await fetch("/api/ask", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question, userId: localStorage.getItem("nexoraUserId")
            })

        });

        if (!response.ok) {
            throw new Error(
                "Server returned HTTP " + response.status
            );
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(
                data.message || "NEXORA request failed."
            );
        }

        const sources = data.sources || [];

        result.innerHTML = `
            <div style="
                padding:20px;
                border-radius:14px;
                background:#f7f9fc;
                margin-bottom:20px;
            ">

                <h2>🧠 NEXORA AI ANSWER</h2>

                <p>
                    <strong>Question:</strong>
                    ${escapeHTML(data.question)}
                </p>

                <div style="
                    margin-top:20px;
                    padding:20px;
                    border-radius:12px;
                    background:white;
                    border:1px solid #e5e7eb;
                ">

                    <h3>Answer</h3>

                    <p style="white-space:pre-wrap;">
                        ${escapeHTML(data.answer || "No answer generated.")}
                    </p>

                </div>

                <div style="
                    margin-top:20px;
                    padding:12px;
                    border-radius:10px;
                    background:#eef6ff;
                ">

                    <strong>✓ Web-Grounded Answer</strong>

                    <br>

                    Model:
                    ${escapeHTML(data.model || "NEXORA AI")}

                    <br>

                    Sources Checked:
                    ${sources.length}

                </div>

            </div>

            <div>

                <h2>🔎 Sources & Evidence</h2>

                ${
                    sources.length === 0
                    ? "<p>No sources found.</p>"
                    : sources.map((source, index) => `

                        <div style="
                            margin:15px 0;
                            padding:18px;
                            border:1px solid #ddd;
                            border-radius:12px;
                            background:white;
                        ">

                            <strong>
                                SOURCE ${index + 1}
                            </strong>

                            <h3>
                                ${escapeHTML(source.title || "Untitled")}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    source.content || ""
                                ).substring(0, 700)}
                            </p>

                            <p>
                                <strong>Quality:</strong>
                                ${escapeHTML(
                                    source.quality || "Unknown"
                                )}
                            </p>

                            <a
                                href="${escapeAttribute(source.url || "#")}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open Source →
                            </a>

                        </div>

                    `).join("")
                }

            </div>
        `;

        result.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (error) {

        console.error("NEXORA Error:", error);

        result.innerHTML = `
            <div style="
                padding:20px;
                border-radius:12px;
                background:#fff1f1;
                border:1px solid #ffcccc;
            ">

                <h2>❌ NEXORA Search Failed</h2>

                <p>
                    ${escapeHTML(error.message)}
                </p>

            </div>
        `;

    } finally {

        if (askButton) {
            askButton.disabled = false;
            askButton.textContent = "Ask NEXORA";
        }

    }
}


function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/"/g, "&quot;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;");
}


function goToLogin() {

    window.location.href = "login.html";

}


function startVoiceSearch() {

    alert(
        "Voice Search will be connected in a future version."
    );

}