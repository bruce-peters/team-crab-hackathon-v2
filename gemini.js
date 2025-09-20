const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: "AIzaSyB5jUso9XI15a4Q4bgmhPphL5N4yfqoTl0"});

async function analyzeAssignments() {
    // Read the large JSON file
    //const assignmentsPath = './pruned_for_all.json';
    const assignmentsPath = './prunertest.json';
    const assignmentsData = fs.readFileSync(assignmentsPath, 'utf-8');

    // Create a detailed prompt
    const prompt = `
    You are an academic advisor. Your task is to analyze a list of student assignments, provide a detailed priority rating for each on a scale of 1 to 10 (10 being highest priority), and then sort the input list in order of highest priority first.

    Here is the JSON data containing all assignments:

    JSON:
    ${assignmentsData}

    Based on the provided data, analyze each assignment and rate its priority. Your analysis should consider the following factors:
    1.  Urgency: How soon is the due date?
    2.  Impact: How much does the assignment contribute to the overall grade (percentage_of_grade)?
    3. Difficulty: How challenging is the assignment based on its description and type?

    Return a JSON object including each assignment with its original fields and a new field called "priority_rating" with your determined score. These elements should be sorted in descending order by priority_rating.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{
                role: 'user',
                parts: [{ text: prompt }]
            }],
            // --- The FIX is right here ---
            config: {
                responseMimeType: 'application/json'
            }
        });

        // The response text is a JSON string, so you can parse it
        const jsonString = response.text;

        if (jsonString) {
            const jsonOutput = JSON.parse(jsonString);
            console.log(jsonOutput);

            // background.js
            chrome.storage.local.set({ analyzedAssignments: jsonOutput }, () => {
            console.log("Assignments stored!");
            });
        } else {
            console.error("Gemini API response text was empty or undefined.");
        }

    } catch (error) {
        console.error('Error with Gemini API call:', error);
    }
}

analyzeAssignments();
