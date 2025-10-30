// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true
// });

// Mock responses for demo purposes
const mockResponses: { [key: string]: string[] } = {
  'birthday': ['Send invitations', 'Order cake', 'Decorate venue', 'Prepare party games', 'Buy party supplies'],
  'vacation': ['Book flights', 'Reserve hotel', 'Plan itinerary', 'Pack bags', 'Get travel insurance'],
  'interview': ['Research company', 'Prepare answers to common questions', 'Practice coding problems', 'Prepare questions to ask', 'Choose appropriate outfit'],
  'website': ['Design mockups', 'Set up domain and hosting', 'Build frontend', 'Add content', 'Test and deploy'],
  'move': ['Find new apartment', 'Hire movers', 'Pack belongings', 'Update address', 'Set up utilities'],
};

function getMockSuggestions(taskText: string): string[] {
  const lowerTask = taskText.toLowerCase();
  
  // Check if task contains any keywords
  for (const [key, suggestions] of Object.entries(mockResponses)) {
    if (lowerTask.includes(key)) {
      return suggestions;
    }
  }
  
  // Default generic breakdown
  return [
    `Research about ${taskText}`,
    `Create a plan for ${taskText}`,
    `Execute main steps for ${taskText}`,
    `Review and finalize ${taskText}`,
  ];
}

export async function breakdownTask(taskText: string): Promise<string[]> {
  // Use mock for demo (comment this out when you have OpenAI credits)
  return getMockSuggestions(taskText);
  
  // Uncomment below when you have OpenAI credits:
  /*
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that breaks down tasks into smaller, actionable subtasks. Return only a JSON array of strings, nothing else."
        },
        {
          role: "user",
          content: `Break down this task into 3-5 smaller, actionable subtasks: "${taskText}". Return only a JSON array of strings.`
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const content = response.choices[0].message.content;
    if (!content) return [];
    
    const subtasks = JSON.parse(content);
    return Array.isArray(subtasks) ? subtasks : [];
  } catch (error) {
    console.error('Error breaking down task:', error);
    return [];
  }
  */
}