require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const {
    extractResumeText
} = require("./resume-parser");

const {
    createCandidateProfile,
    startInterview,
    generateNextTurn,
    evaluateInterview
} = require("./interview-engine");

const app = express();

const PORT = process.env.INTERVIEW_PORT || 5100;

app.use(cors());
app.use(express.static(path.join(__dirname, "..", "frontend")));
app.use(express.json({ limit: "2mb" }));

// ============================================
// UPLOAD CONFIGURATION
// ============================================

const uploadDir = path.join(__dirname, "..", "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {
        const safeName = file.originalname
            .replace(/[^a-zA-Z0-9._-]/g, "_");

        cb(
            null,
            `${Date.now()}-${safeName}`
        );
    }
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {
        const allowed = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only PDF and DOCX resumes are supported."
                )
            );
        }
    }
});

// ============================================
// HEALTH CHECK
// ============================================

app.get("/api/interview/health", (req, res) => {
    res.json({
        success: true,
        service: "NEXORA Interview Engine",
        status: "running",
        port: PORT
    });
});

// ============================================
// RESUME UPLOAD + PROFILE CREATION
// ============================================

app.post(
    "/api/interview/upload-resume",
    upload.single("resume"),
    async (req, res) => {

        let uploadedFile = null;

        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: "Resume file is required."
                });
            }

            uploadedFile = req.file.path;

            const mode =
                req.body.mode || "placement";

            const language =
                req.body.language || "English";

            const targetRole =
                req.body.targetRole || "";

            // Extract resume text
            const resume = await extractResumeText(
                uploadedFile
            );

            // Create AI candidate profile
            const candidateProfile =
                await createCandidateProfile({
                    resumeText: resume.text,
                    mode,
                    language,
                    targetRole
                });

            res.json({
                success: true,

                resume: {
                    fileName: resume.fileName,
                    fileType: resume.fileType,
                    characterCount: resume.characterCount
                },

                candidateProfile
            });

        } catch (error) {

            console.error(
                "Interview Resume Error:",
                error
            );

            res.status(500).json({
                success: false,
                error: error.message
            });

        } finally {

            // Delete uploaded resume after processing.
            // We don't need to keep the original file
            // on the server for the current prototype.

            if (
                uploadedFile &&
                fs.existsSync(uploadedFile)
            ) {
                try {
                    fs.unlinkSync(uploadedFile);
                } catch (deleteError) {
                    console.error(
                        "Resume cleanup error:",
                        deleteError.message
                    );
                }
            }
        }
    }
);

// ============================================
// START INTERVIEW
// ============================================

app.post(
    "/api/interview/start",
    async (req, res) => {

        try {

            const {
                candidateProfile = {},
                mode = "placement",
                language = "English",
                targetRole = "",
                interviewerStyle = "professional"
            } = req.body;

            const firstTurn =
                await startInterview({
                    candidateProfile,
                    mode,
                    language,
                    targetRole,
                    interviewerStyle
                });

            res.json({
                success: true,
                interview: firstTurn
            });

        } catch (error) {

            console.error(
                "Interview Start Error:",
                error
            );

            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
);

// ============================================
// NEXT INTERVIEW TURN
// ============================================

app.post(
    "/api/interview/answer",
    async (req, res) => {

        try {

            const {
                candidateProfile = {},
                mode = "placement",
                language = "English",
                targetRole = "",
                history = [],
                userAnswer = ""
            } = req.body;

            if (!userAnswer.trim()) {
                return res.status(400).json({
                    success: false,
                    error: "Candidate answer is required."
                });
            }

            const nextTurn =
                await generateNextTurn({
                    candidateProfile,
                    mode,
                    language,
                    targetRole,
                    history,
                    userAnswer
                });

            res.json({
                success: true,
                interview: nextTurn
            });

        } catch (error) {

            console.error(
                "Interview Answer Error:",
                error
            );

            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
);

// ============================================
// FINAL EVALUATION
// ============================================

app.post(
    "/api/interview/evaluate",
    async (req, res) => {

        try {

            const {
                candidateProfile = {},
                mode = "placement",
                language = "English",
                transcript = []
            } = req.body;

            if (
                !Array.isArray(transcript) ||
                transcript.length === 0
            ) {
                return res.status(400).json({
                    success: false,
                    error: "Interview transcript is required."
                });
            }

            const evaluation =
                await evaluateInterview({
                    candidateProfile,
                    mode,
                    language,
                    transcript
                });

            res.json({
                success: true,
                evaluation
            });

        } catch (error) {

            console.error(
                "Interview Evaluation Error:",
                error
            );

            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
);

// ============================================
// ERROR HANDLER
// ============================================

app.use((error, req, res, next) => {

    console.error(
        "Interview Server Error:",
        error
    );

    res.status(500).json({
        success: false,
        error: error.message || "Internal server error."
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {

    console.log("");
    console.log("========================================");
    console.log(" NEXORA INTERVIEW SERVER");
    console.log("========================================");
    console.log(` Interview API: http://localhost:${PORT}`);
    console.log(" Status: RUNNING");
    console.log("========================================");
    console.log("");

});
