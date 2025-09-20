(function () {
  // Look for existing dashboard div
  const dashboardDiv = document.querySelector(
    "div[id*='dashboard'], div[class*='dashboard'], #dashboard",
  );

  // Inject the CSS file using chrome.runtime.getURL for extension resources
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = chrome.runtime.getURL("dist/dashboard-main.css");
  document.head.appendChild(link);

  if (dashboardDiv) {
    // Create container for React dashboard
    const dashboardContainer = document.createElement("div");
    dashboardContainer.id = "canvas-dashboard-extension";
    dashboardContainer.style.position = "relative";

    // Insert the container inside the dashboard div
    dashboardDiv.prepend(dashboardContainer);

    // Load and mount the React dashboard
    if (window.mountCanvasDashboard) {
      window.mountCanvasDashboard(dashboardContainer);
    } else {
      // Fallback if React bundle hasn't loaded yet
      dashboardContainer.innerHTML =
        '<div style="background: #4a76b2; color: white; padding: 10px; text-align: center;">Loading Canvas Dashboard...</div>';
    }
  } else {
    // Fallback: create our own dashboard container if no dashboard div exists
    const dashboardContainer = document.createElement("div");
    dashboardContainer.id = "canvas-dashboard-extension";
    dashboardContainer.style.position = "relative";

    // Insert the container above the main content
    const target = document.querySelector("body");
    if (target) {
      target.insertBefore(dashboardContainer, target.firstChild);

      // Load and mount the React dashboard
      if (window.mountCanvasDashboard) {
        window.mountCanvasDashboard(dashboardContainer);
      } else {
        // Fallback if React bundle hasn't loaded yet
        dashboardContainer.innerHTML =
          '<div style="background: #4a76b2; color: white; padding: 10px; text-align: center;">Loading Canvas Dashboard...</div>';
      }
    }
  }
})();
