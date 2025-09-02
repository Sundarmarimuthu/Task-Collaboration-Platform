
import { GoogleGenAI, Type } from "@google/genai";
import { Task, Priority, Status } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY_HERE" });

const taskSchema = {
  type: Type.OBJECT,
  properties: {
    title: { 
      type: Type.STRING,
      description: 'The concise title or main objective of the task.' 
    },
    assignee: { 
      type: Type.STRING, 
      description: "The name of the person assigned to the task. Default to null if not specified."
    },
    dueDate: { 
      type: Type.STRING, 
      description: "The due date in YYYY-MM-DD format. Default to null if not specified." 
    },
    priority: {
      type: Type.STRING,
      description: `The priority level of the task. Must be one of: '${Priority.Low}', '${Priority.Medium}', '${Priority.High}', or '${Priority.Urgent}'. Default to '${Priority.Medium}'.`,
      enum: [Priority.Low, Priority.Medium, Priority.High, Priority.Urgent]
    },
    status: {
      type: Type.STRING,
      description: `The current status of the task. Must be one of: '${Status.ToDo}', '${Status.InProgress}', or '${Status.Done}'. Default to '${Status.ToDo}'.`,
      enum: [Status.ToDo, Status.InProgress, Status.Done]
    }
  },
  required: ["title", "status", "priority"],
};

type ParsedTask = Omit<Task, 'id' | 'status'> & { status: string };

export const parseTaskFromString = async (prompt: string): Promise<ParsedTask> => {
    if (!process.env.API_KEY) {
        // Mock response for development without an API key
        console.log("Mocking Gemini API call.");
        await new Promise(res => setTimeout(res, 1000));
        return {
            title: `Mocked Task: ${prompt.slice(0, 30)}...`,
            assignee: 'Mock User',
            dueDate: new Date().toISOString().split('T')[0],
            priority: Priority.Medium,
            status: Status.ToDo,
        };
    }
    
  try {
    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Parse the following text to create a task. Extract the title, assignee, due date, priority, and status. Today's date is ${new Date().toDateString()}. \n\nUser input: "${prompt}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: taskSchema,
        },
    });

    const jsonString = result.text.trim();
    if (!jsonString) {
      throw new Error("API returned an empty response.");
    }
    
    const parsedData = JSON.parse(jsonString);

    // Validate and format the data
    const finalTask: ParsedTask = {
        title: parsedData.title || "Untitled Task",
        assignee: parsedData.assignee || undefined,
        dueDate: parsedData.dueDate || undefined,
        priority: Object.values(Priority).includes(parsedData.priority) ? parsedData.priority : Priority.Medium,
        status: Object.values(Status).includes(parsedData.status) ? parsedData.status : Status.ToDo,
    };
    
    return finalTask;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to create task using AI. Please check the console for details.");
  }
};
