// time.js - Fetch and update the UTC time every second

function updateTime() {
  const timeElement = document.getElementById("utc-time");
  if (timeElement) {
    const now = new Date();
    timeElement.textContent = "Current UTC Time: " + now.toUTCString();
  }
}

// Update the time every second
setInterval(updateTime, 1000);

// Run immediately when the page loads
document.addEventListener("DOMContentLoaded", updateTime);
