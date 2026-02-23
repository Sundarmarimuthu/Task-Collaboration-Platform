import { Priority, Status } from '../types.js';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_MODEL = 'google/gemini-flash-1.5';

/**
 * Calls OpenRouter to parse a natural-language task description into structured task data.
 * Falls back to a mock response when no API key is configured.
 */
export const parseTaskFromString = async (prompt) => {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        // Mock response for development without an API key
        console.log('No OPENROUTER_API_KEY set — using mock response.');
        await new Promise((res) => setTimeout(res, 1000));
        return {
            title: `Mocked Task: ${prompt.slice(0, 30)}...`,
            assignee: 'Mock User',
            dueDate: new Date().toISOString().split('T')[0],
            priority: Priority.Medium,
            status: Status.ToDo,
        };
    }

    const systemPrompt = `You are a task management assistant. Parse the user's input and return ONLY a valid JSON object (no markdown, no explanation) with these fields:
- "title" (string, required): concise task title
- "priority" (string, required): one of "${Priority.Low}", "${Priority.Medium}", "${Priority.High}", "${Priority.Urgent}" — default "${Priority.Medium}"
- "status" (string, required): one of "${Status.ToDo}", "${Status.InProgress}", "${Status.Done}" — default "${Status.ToDo}"
- "assignee" (string or null): person assigned to the task
- "dueDate" (string or null): due date in YYYY-MM-DD format

Today's date is ${new Date().toDateString()}.`;

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
                'HTTP-Referer': 'https://intellitask-ai.app',
                'X-Title': 'IntelliTask AI',
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Parse this task: "${prompt}"` },
                ],
                response_format: { type: 'json_object' },
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`OpenRouter API error ${response.status}: ${errorBody}`);
        }

        const data = await response.json();
        const jsonString = data.choices?.[0]?.message?.content?.trim();

        if (!jsonString) {
            throw new Error('OpenRouter returned an empty response.');
        }

        const parsed = JSON.parse(jsonString);

        return {
            title: parsed.title || 'Untitled Task',
            assignee: parsed.assignee || undefined,
            dueDate: parsed.dueDate || undefined,
            priority: Object.values(Priority).includes(parsed.priority)
                ? parsed.priority
                : Priority.Medium,
            status: Object.values(Status).includes(parsed.status)
                ? parsed.status
                : Status.ToDo,
        };
    } catch (error) {
        console.error('Error calling OpenRouter API:', error);
        throw new Error('Failed to create task using AI. Please check the console for details.');
    }
};
