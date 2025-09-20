// Service Worker for Canvas Dashboard Extension

const GEMINI_API_KEY = "AIzaSyB5jUso9XI15a4Q4bgmhPphL5N4yfqoTl0"; // safer: use chrome.storage.local or ask user input
//const CANVAS_TOKEN = "YOUR_CANVAS_TOKEN"; // same deal, don’t hardcode long-term
const CANVAS_API = "https://YOURCANVAS.instructure.com/api/v1";

// Fetch assignments from Canvas
// // Load assignments from a local JSON file bundled with the extension
async function fetchAssignments() {
  const url = chrome.runtime.getURL("prunertest.json"); // put your file in /extension root
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load assignments.json");
  }
  const data = await response.json();
  console.log(data)
  return data;
}

// Call Gemini API to analyze assignments
async function analyzeAssignments(assignments) {
  //console.log(assignments)
  const prompt = `
    You are an academic advisor. Your task is to analyze a list of student assignments, provide a detailed priority rating for each on a scale of 1 to 10 (10 being highest priority), and then sort the input list in order of highest priority first.

    Here is the JSON data containing all assignments:

    JSON:
    ${JSON.stringify(assignments, null, 2)}

    Based on the provided data, analyze each assignment and rate its priority. Your analysis should consider the following factors:
    1.  Urgency: How soon is the due date?
    2.  Impact: How much does the assignment contribute to the overall grade (percentage_of_grade)?
    3. Difficulty: How challenging is the assignment based on its description and type?

    Return a JSON object including each assignment with its original fields and a new field called "priority_rating" with your determined score. These elements should be sorted in descending order by priority_rating.
    `;
    console.log(prompt)

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  console.log(text)
  let analyzed = JSON.parse(text);

// if it’s an object, convert to array of values
  if (!Array.isArray(analyzed)) {
    analyzed = Object.values(analyzed);
  }
  console.log(analyzed)
  return analyzed;

}

// Store analyzed assignments
async function updateAnalyzedAssignments() {
  try {
    const assignments = await fetchAssignments();
    const analyzed = await analyzeAssignments(assignments);
    await chrome.storage.local.set({ analyzedAssignments: analyzed });
    console.log("Updated analyzed assignments");
  } catch (err) {
    console.error("Error updating assignments:", err);
  }
}

// Format for tasks
function assignmentToTask(assignment) {
  return {
    id: assignment.id,
    title: assignment.name || "Untitled",
    priority:
      assignment.priority_rating >= 8
        ? "high"
        : assignment.priority_rating >= 5
        ? "medium"
        : "low",
    dueDate: assignment.due_at
      ? new Date(assignment.due_at).toLocaleDateString()
      : "No due date"
  };
}

// Convert analyzed assignments from storage into task objects
async function getTasks() {
  // Await the storage fetch
  const result = await chrome.storage.local.get("analyzedAssignments");

  let analyzedAssignments = result.analyzedAssignments[0] || [];

  // Ensure it's always an array
  if (!Array.isArray(analyzedAssignments)) {
    analyzedAssignments = Object.values(analyzedAssignments);
  }

  const tasks = analyzedAssignments.map(assignmentToTask);
  console.log("tasks", tasks);
  return tasks;
}

// Handle messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getTasks") {
    getTasks().then(tasks => sendResponse({ tasks }));
    return true; // async
  }
  if (request.action === "refreshAssignments") {
    updateAnalyzedAssignments().then(() => sendResponse({ ok: true }));
    return true;
  }
});

// Install / activate
self.addEventListener("install", () => {
  console.log("Canvas Dashboard Service Worker installed");
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  console.log("Canvas Dashboard Service Worker activated");
  event.waitUntil(
    (async () => {
      await updateAnalyzedAssignments(); // auto-refresh when activated
      await clients.claim();
    })()
  );
});
