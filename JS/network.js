/*
Name: Jessica Hussain
Last Updated: 11/06/2026
Project: Briar & Bone
Assignment: Project: Grand Opening
Purpose: Display the current page's connection information and
save its launch time for display on the next visit.
*/

// Display connection information from the current page URL.
const currentLocation = window.location;

document.getElementById("network-host").textContent =
    currentLocation.hostname || "Not available — open through a local server";

let currentPort = currentLocation.port;

if (currentPort === "") {
    if (currentLocation.protocol === "http:") {
        currentPort = "80 (default)";
    } else if (currentLocation.protocol === "https:") {
        currentPort = "443 (default)";
    } else {
        currentPort = "Not applicable";
    }
}

document.getElementById("network-port").textContent = currentPort;

document.getElementById("network-protocol").textContent =
    currentLocation.protocol;

// Show the previous launch before saving this launch.
const LAST_LAUNCH_KEY = "briarAndBoneLastNetworkLaunch";
const lastLaunchDisplay =
    document.getElementById("network-last-launch");

try {
    const previousLaunch = localStorage.getItem(LAST_LAUNCH_KEY);
    const previousDate = previousLaunch
        ? new Date(previousLaunch)
        : null;

    if (previousDate && !Number.isNaN(previousDate.getTime())) {
        lastLaunchDisplay.textContent = previousDate.toLocaleString();
    } else {
        lastLaunchDisplay.textContent =
            "First visit — no previous launch recorded.";
    }

    localStorage.setItem(
        LAST_LAUNCH_KEY,
        new Date().toISOString()
    );
} catch (error) {
    lastLaunchDisplay.textContent =
        "Launch history is unavailable because browser storage could not be accessed.";

    console.error("Could not access launch history:", error);
}