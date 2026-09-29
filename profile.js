// ================================
// GET SAVED USER
// ================================

const savedUser =
    localStorage.getItem("nexoraUser");


// ================================
// PROFILE ELEMENTS
// ================================

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const accountName =
    document.getElementById("accountName");

const accountEmail =
    document.getElementById("accountEmail");


// ================================
// SHOW USER INFORMATION
// ================================

if (savedUser) {

    const user =
        JSON.parse(savedUser);


    if (profileName) {

        profileName.textContent =
            user.name;

    }


    if (profileEmail) {

        profileEmail.textContent =
            user.email;

    }


    if (accountName) {

        accountName.textContent =
            user.name;

    }


    if (accountEmail) {

        accountEmail.textContent =
            user.email;

    }

}


// ================================
// DEMO STATISTICS
// ================================

const searchCount =
    document.getElementById("searchCount");

const verifyCount =
    document.getElementById("verifyCount");

const roadmapCount =
    document.getElementById("roadmapCount");

const learningProgress =
    document.getElementById("learningProgress");


if (searchCount) {

    searchCount.textContent =
        localStorage.getItem("nexoraSearchCount") || "0";

}


if (verifyCount) {

    verifyCount.textContent =
        localStorage.getItem("nexoraVerifyCount") || "0";

}


if (roadmapCount) {

    roadmapCount.textContent =
        localStorage.getItem("nexoraRoadmapCount") || "0";

}


if (learningProgress) {

    learningProgress.textContent =
        localStorage.getItem("nexoraLearningProgress") || "0%";

}
// ================================
// RECENT SEARCH HISTORY
// ================================

const searchHistoryList =
    document.getElementById("searchHistoryList");

const savedHistory =
    JSON.parse(
        localStorage.getItem("nexoraSearchHistory")
    ) || [];


// ================================
// SHOW SEARCH HISTORY
// ================================

if (searchHistoryList) {

    searchHistoryList.innerHTML = "";


    if (savedHistory.length === 0) {

        searchHistoryList.innerHTML =
            "<p>No searches yet.</p>";

    } else {

        savedHistory.forEach(function (search, index) {

            const historyItem =
                document.createElement("div");

            historyItem.className =
                "history-item";


            historyItem.innerHTML =

                "<span>" +
                (index + 1) +
                "</span>" +

                "<p>" +
                search +
                "</p>";


            searchHistoryList.appendChild(
                historyItem
            );

        });

    }

}