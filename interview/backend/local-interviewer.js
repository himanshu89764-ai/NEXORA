function getNextQuestion({
    mode = "placement",
    targetRole = "",
    history = [],
    userAnswer = ""
}) {
    const answer = (userAnswer || "").toLowerCase();
    const interviewerCount = history.filter(
        x => x.role === "interviewer"
    ).length;

    const role = targetRole || "this role";

    // Q1: Introduction
    if (interviewerCount === 0) {
        return `Thank you. Could you briefly walk me through your background and your experience relevant to ${role}?`;
    }

    // Q2: Follow the candidate's own answer
    if (interviewerCount === 1) {
        if (
            answer.includes("nexora") ||
            answer.includes("project") ||
            answer.includes("website") ||
            answer.includes("application") ||
            answer.includes("app")
        ) {
            return "You mentioned a project. What exactly was your role in that project, and what was the most important contribution you made?";
        }

        if (
            answer.includes("javascript") ||
            answer.includes("html") ||
            answer.includes("css") ||
            answer.includes("coding") ||
            answer.includes("programming")
        ) {
            return "You mentioned your technical skills. Can you describe a real situation where you used those skills to solve a problem?";
        }

        if (
            answer.includes("experience") ||
            answer.includes("job") ||
            answer.includes("internship")
        ) {
            return "Tell me about one challenging situation from your experience and how you handled it.";
        }

        return "You mentioned your background. Which experience or skill do you think is most relevant to this role, and why?";
    }

    // Q3: Technical depth based on previous answer
    if (interviewerCount === 2) {
        if (
            answer.includes("javascript") ||
            answer.includes("frontend") ||
            answer.includes("web") ||
            answer.includes("html") ||
            answer.includes("css")
        ) {
            return "Let's go deeper into that. What was one difficult technical problem you faced while building a web application, and how did you solve it?";
        }

        if (
            answer.includes("database") ||
            answer.includes("sql") ||
            answer.includes("sqlite")
        ) {
            return "You mentioned databases. How would you design a database for an application that needs to store users, interviews, and their results?";
        }

        if (
            answer.includes("api") ||
            answer.includes("backend") ||
            answer.includes("node")
        ) {
            return "You mentioned backend development. How would you design and secure an API used by thousands of users?";
        }

        return "Let's go a little deeper. Tell me about a technical problem you faced in a project and how you solved it.";
    }

    // Q4: Problem solving
    if (interviewerCount === 3) {
        return "Suppose I give you a task you have never done before and the deadline is short. Walk me through exactly how you would approach it.";
    }

    // Q5: Handling weakness / learning
    if (interviewerCount === 4) {
        return "What is one technical area you are currently improving, and what are you doing to improve it?";
    }

    // Q6: Pressure / behavioural follow-up
    if (interviewerCount === 5) {
        if (
            answer.includes("team") ||
            answer.includes("teamwork") ||
            answer.includes("collaborat")
        ) {
            return "Tell me about a disagreement you had while working with someone. How did you resolve it?";
        }

        return "Tell me about a time when something did not go according to your plan. What did you do next?";
    }

    // Q7: Role fit
    if (interviewerCount === 6) {
        return `Why do you think you would be a good fit for ${role}?`;
    }

    // Q8+: Continue dynamically
    if (answer.includes("why")) {
        return "That's interesting. Can you give me a concrete example to support that answer?";
    }

    if (
        answer.includes("yes") ||
        answer.includes("no") ||
        answer.length < 40
    ) {
        return "Could you elaborate on that and give me a specific example from your experience?";
    }

    return "Thank you. Based on what you just said, what would you do differently if you had to handle that situation again?";
}

module.exports = {
    getNextQuestion
};
