(function () {
    // Create container for React dashboard
    const dashboardContainer = document.createElement("div");
    dashboardContainer.id = "canvas-dashboard-extension";
    dashboardContainer.style.zIndex = "9999";
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
            dashboardContainer.innerHTML = '<div style="background: #4a76b2; color: white; padding: 10px; text-align: center;">Loading Canvas Dashboard...</div>';
        }
    }
})();
