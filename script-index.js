const easyCountElement = document.getElementById("eas");
const mediumCountElement = document.getElementById("med");
const hardCountElement = document.getElementById("har");
const solvedCountElement = document.getElementById("sol");
const contestRatingElement = document.getElementById("con");
const globalRankElement = document.getElementById("glo");
const fetchingGif = document.getElementById("fetchingGif");
const user = document.getElementById("username");

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(nameEQ) == 0) return cookie.substring(nameEQ.length, cookie.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const userDataCookie = getCookie('userData');

if (!userDataCookie) {
    window.location.href = 'login.html';
} else {
    const userData = JSON.parse(userDataCookie);
    const leetcodeUsername = userData.leetcodeUsername;
    fetchUserData(leetcodeUsername);
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    deleteCookie('userData');
    window.location.href = 'login.html';
});

async function fetchUserData(leetcodeUsername) {
    fetchingGif.style.display = "block"; // Show fetching GIF
    try {
        const response = await fetch(`https://competeapi.vercel.app/user/leetcode/${leetcodeUsername}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const username = data.data?.matchedUser?.username || "N/A";
        const easyCount = data.data?.matchedUser?.submitStats?.acSubmissionNum?.find(item => item.difficulty === "Easy")?.count || 0;
        const mediumCount = data.data?.matchedUser?.submitStats?.acSubmissionNum?.find(item => item.difficulty === "Medium")?.count || 0;
        const hardCount = data.data?.matchedUser?.submitStats?.acSubmissionNum?.find(item => item.difficulty === "Hard")?.count || 0;
        const contestRating = data.data?.userContestRanking?.rating || "N/A";
        const globalRank = data.data?.userContestRanking?.globalRanking || "N/A";
        const solvedCount = easyCount + mediumCount + hardCount;

        easyCountElement.innerText = easyCount;
        mediumCountElement.innerText = mediumCount;
        hardCountElement.innerText = hardCount;
        contestRatingElement.innerText = contestRating;
        globalRankElement.innerText = globalRank;
        solvedCountElement.innerText= solvedCount;
        user.innerText= username;

    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        fetchingGif.style.display = "none"; // Hide fetching GIF after fetching
    }
}
