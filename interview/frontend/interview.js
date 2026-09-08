const API_BASE = "http://localhost:5000";

function speakInterviewer(text) {
    if (!("speechSynthesis" in window)) {
        console.warn("Browser Text-to-Speech unavailable.");
        return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voices = window.speechSynthesis.getVoices();

    const preferredVoice =
        voices.find(v => v.lang === "en-IN") ||
        voices.find(v => v.lang.startsWith("en-IN")) ||
        voices.find(v => v.lang === "en-US") ||
        voices.find(v => v.lang.startsWith("en"));

    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    utterance.lang = preferredVoice?.lang || "en-IN";
    utterance.rate = 0.88;
    utterance.pitch = 0.95;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
}



const micButton = document.getElementById("micButton");
const stopButton = document.getElementById("stopButton");
const nextButton = document.getElementById("nextButton");
const speakButton = document.getElementById("speakButton");
const startInterviewButton = document.getElementById("startInterviewButton");
const interviewSetup = document.getElementById("interviewSetup");
const interviewRoom = document.getElementById("interviewRoom");

const transcriptBox = document.getElementById("transcript");
const statusText = document.getElementById("statusText");
const recordingIndicator = document.getElementById("recordingIndicator");
const interviewerMessage = document.getElementById("interviewerMessage");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = null;
let finalTranscript = "";
let isListening = false;

let interviewHistory = [];

const candidateProfile = {
    name: "Himanshu",
    skills: [
        "HTML",
        "CSS",
        "JavaScript"
    ],
    projects: [
        "NEXORA"
    ]
};

const interviewConfig = {
    mode: "placement",
    language: "English",
    targetRole: "Web Developer",
    interviewerStyle: "professional"
};


/* ============================================
   SPEECH RECOGNITION
============================================ */

if (!SpeechRecognition) {

    statusText.textContent =
        "Speech recognition unavailable";

    micButton.disabled = true;

    transcriptBox.textContent =
        "Speech recognition is not supported in this browser. Please use Google Chrome.";

} else {

    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";


    recognition.onstart = function () {

        isListening = true;

        statusText.textContent = "Listening";

        recordingIndicator.innerHTML = `
            <span class="recording-active"></span>
            <span>Recording</span>
        `;

        micButton.disabled = true;
        stopButton.disabled = false;
        nextButton.disabled = true;
    };


    recognition.onresult = function (event) {

        let interimTranscript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;

            if (event.results[i].isFinal) {

                finalTranscript += transcript + " ";

            } else {

                interimTranscript += transcript;
            }
        }

        transcriptBox.textContent =
            (
                finalTranscript +
                interimTranscript
            ).trim() || "Listening...";
    };


    recognition.onerror = function (event) {

        console.error(
            "Speech recognition error:",
            event.error
        );

        isListening = false;

        statusText.textContent =
            `Microphone error: ${event.error}`;

        micButton.disabled = false;
        stopButton.disabled = true;
    };


    recognition.onend = function () {

        if (isListening) {

            try {
                recognition.start();
            } catch (error) {
                console.warn(
                    "Recognition restart:",
                    error.message
                );
            }

        } else {

            statusText.textContent =
                "Answer captured";

            micButton.disabled = false;
            stopButton.disabled = true;

            if (finalTranscript.trim()) {
                nextButton.disabled = false;
            }
        }
    };
}


/* ============================================
   START MICROPHONE
============================================ */

speakButton.addEventListener("click", function () {
    speakInterviewer(interviewerMessage.textContent);
});

micButton.addEventListener("click", function () {

    if (!recognition) {
        return;
    }

    finalTranscript = "";

    transcriptBox.textContent =
        "Listening...";

    try {
        recognition.start();
    } catch (error) {
        console.error(
            "Microphone start error:",
            error
        );
    }
});


/* ============================================
   STOP MICROPHONE
============================================ */

stopButton.addEventListener("click", function () {

    if (!recognition) {
        return;
    }

    isListening = false;

    recognition.stop();

    statusText.textContent =
        "Processing answer...";
});


/* ============================================
   SUBMIT ANSWER → BACKEND
============================================ */

nextButton.addEventListener("click", async function () {

    const answer = finalTranscript.trim();

    if (!answer) {
        return;
    }

    nextButton.disabled = true;

    statusText.textContent =
        "Interviewer is thinking...";


    interviewHistory.push({
        role: "candidate",
        message: answer
    });


    try {

        const response = await fetch(
            `${API_BASE}/api/interview/answer`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    candidateProfile,
                    ...interviewConfig,
                    history: interviewHistory,
                    userAnswer: answer
                })
            }
        );


        const data = await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.error ||
                "Interview API request failed."
            );
        }


        const interview =
            data.interview;


        interviewerMessage.textContent =
            interview.interviewerMessage;

        setTimeout(() => {
            speakInterviewer(interview.interviewerMessage);
        }, 300);

        interviewHistory.push({
            role: "interviewer",
            message: interview.interviewerMessage
        });


        document.getElementById(
            "questionNumber"
        ).textContent =
            String(
                interviewHistory.filter(
                    item =>
                        item.role === "interviewer"
                ).length
            ).padStart(2, "0");


        transcriptBox.textContent =
            "Your next answer will appear here...";


        finalTranscript = "";

        statusText.textContent =
            "Ready";

        nextButton.disabled = true;


    } catch (error) {

        console.error(
            "Interview API error:",
            error
        );

        statusText.textContent =
            "Interview engine unavailable";

        interviewerMessage.textContent =
            "The interview engine could not generate the next question. Please try again.";

        nextButton.disabled = false;
    }
});


/* ============================================
   INITIAL UI
============================================ */

document.getElementById(
    "candidateName"
).textContent = candidateProfile.name;

document.getElementById(
    "modeText"
).textContent = interviewConfig.mode;

document.getElementById(
    "roleText"
).textContent = interviewConfig.targetRole;

document.getElementById(
    "languageText"
).textContent = interviewConfig.language;


/* ============================================
   LOAD FIRST QUESTION
============================================ */

async function loadFirstQuestion() {

    statusText.textContent =
        "Preparing interview...";

    try {

        const response = await fetch(
            `${API_BASE}/api/interview/start`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    candidateProfile,
                    ...interviewConfig
                })
            }
        );


        const data = await response.json();


        if (!response.ok || !data.success) {
            throw new Error(
                data.error ||
                "Could not start interview."
            );
        }


        const interview =
            data.interview;


        interviewerMessage.textContent =
            interview.interviewerMessage;

        setTimeout(() => {
            speakInterviewer(interview.interviewerMessage);
        }, 300);


        interviewHistory.push({
            role: "interviewer",
            message: interview.interviewerMessage
        });


        statusText.textContent =
            "Ready";


    } catch (error) {

        console.error(
            "Interview start error:",
            error
        );

        /*
         * Gemini quota may currently be exhausted.
         * The UI remains usable even when the AI brain
         * is temporarily unavailable.
         */

        statusText.textContent =
            "Ready for interview";

        interviewerMessage.textContent =
            "Welcome. Please introduce yourself and tell me about your background.";
    }
}



/* ============================================
   START INTERVIEW BUTTON
============================================ */

startInterviewButton.addEventListener("click", async function () {

    startInterviewButton.disabled = true;
    startInterviewButton.textContent = "Preparing Interview...";
    statusText.textContent = "Preparing interview...";

    try {

        const response = await fetch(
            `${API_BASE}/api/interview/start`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    candidateProfile,
                    ...interviewConfig
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.error ||
                "Could not start interview."
            );
        }

        const interview = data.interview;

        interviewSetup.style.display = "none";
        interviewRoom.style.display = "";

        interviewerMessage.textContent =
            interview.interviewerMessage;

        interviewHistory = [];

        interviewHistory.push({
            role: "interviewer",
            message: interview.interviewerMessage
        });

        document.getElementById(
            "questionNumber"
        ).textContent = "01";

        statusText.textContent = "Ready";

        setTimeout(() => {
            speakInterviewer(
                interview.interviewerMessage
            );
        }, 300);

    } catch (error) {

        console.error(
            "Interview start error:",
            error
        );

        statusText.textContent =
            "Could not start interview";

        startInterviewButton.disabled = false;
        startInterviewButton.textContent =
            "🎙️ Start Interview";

    }

});


/* ============================================
   CANDIDATE WEBCAM
============================================ */

const candidateVideo =
    document.getElementById("candidateVideo");

const cameraStatus =
    document.getElementById("cameraStatus");

let candidateStream = null;

async function startCandidateCamera() {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        cameraStatus.textContent =
            "Camera unavailable";

        return;
    }

    try {

        candidateStream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user"
                },
                audio: false
            });

        candidateVideo.srcObject =
            candidateStream;

        cameraStatus.textContent =
            "● Camera live";

    } catch (error) {

        console.error(
            "Candidate camera error:",
            error
        );

        cameraStatus.textContent =
            "Camera permission required";
    }
}

startInterviewButton.addEventListener(
    "click",
    function () {
        startCandidateCamera();
    },
    { once: true }
);


/* ============================================
   TALKING AVATAR CONTROL
============================================ */

let talkingAnimationTimer = null;

function startTalkingAnimation() {
    const panel = document.querySelector(".interviewer-panel");
    const mouth = document.querySelector(".talking-mouth");

    if (!panel) return;

    panel.classList.add("is-speaking");

    if (talkingAnimationTimer) {
        clearInterval(talkingAnimationTimer);
    }

    let open = false;

    talkingAnimationTimer = setInterval(() => {
        open = !open;

        if (mouth) {
            mouth.classList.toggle("mouth-open", open);
        }
    }, 140);
}

function stopTalkingAnimation() {
    const panel = document.querySelector(".interviewer-panel");
    const mouth = document.querySelector(".talking-mouth");

    if (talkingAnimationTimer) {
        clearInterval(talkingAnimationTimer);
        talkingAnimationTimer = null;
    }

    if (panel) {
        panel.classList.remove("is-speaking");
    }

    if (mouth) {
        mouth.classList.remove("mouth-open");
    }
}

/* Replace speech function with talking-avatar version */
const originalSpeakInterviewer = speakInterviewer;

speakInterviewer = function(text) {
    startTalkingAnimation();

    const safetyTimer = setTimeout(() => {
        stopTalkingAnimation();
    }, Math.max(8000, String(text).length * 90));

    originalSpeakInterviewer(text);

    const checkSpeech = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
            clearInterval(checkSpeech);
            clearTimeout(safetyTimer);
            stopTalkingAnimation();
        }
    }, 150);
};
