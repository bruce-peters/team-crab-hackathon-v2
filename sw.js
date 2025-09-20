// Service Worker for Canvas Dashboard Extension
// Provides tasks via a nondescript service worker function

const TASKS = [
  { id: 1, title: "Review assignment feedback", priority: "high", dueDate: "Today" },
  { id: 2, title: "Complete Module 3 quiz", priority: "medium", dueDate: "Tomorrow" },
  { id: 3, title: "Submit research paper", priority: "high", dueDate: "Friday" },
  { id: 4, title: "Read chapter 7", priority: "low", dueDate: "Next week" },
  { id: 5, title: "Join study group meeting", priority: "medium", dueDate: "Thursday" }
];

// Nondescript service worker function that provides tasks
function getTasks() {
  return TASKS.filter(task => Math.random() > 0.3); // Randomly filter some tasks
}

// Handle messages from content script or other parts of the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTasks') {
    const tasks = getTasks();
    sendResponse({ tasks });
  }
  return true; // Keep message channel open for async response
});

// Service worker installation
self.addEventListener('install', (event) => {
  console.log('Canvas Dashboard Service Worker installed');
  self.skipWaiting();
});

// Service worker activation
self.addEventListener('activate', (event) => {
  console.log('Canvas Dashboard Service Worker activated');
  event.waitUntil(clients.claim());
});