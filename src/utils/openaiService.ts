
interface HearingTestData {
  gender: string;
  ageCategory: string;
  answers: string[];
  leftEarScore: number;
  rightEarScore: number;
}

export const generateHearingResults = async (data: HearingTestData, apiKey: string) => {
  const prompt = `
You are a hearing health professional providing results for an online hearing screening test. Based on the following information, provide a comprehensive hearing assessment:

User Information:
- Gender: ${data.gender}
- Age Category: ${data.ageCategory}
- Left Ear Score: ${data.leftEarScore}/20
- Right Ear Score: ${data.rightEarScore}/20
- Questionnaire Responses: ${data.answers.join(', ')}

Please provide:
1. Overall hearing assessment based on the scores and demographic information
2. Specific interpretation for each ear using this scale:
   - 18-20: Normal hearing
   - 15-17: Mild hearing loss
   - 10-14: Moderate hearing loss
   - 5-9: Severe hearing loss
   - 0-4: Profound hearing loss
3. Age and gender-related considerations
4. Personalized recommendations
5. When to seek professional help

Format your response as a JSON object with the following structure:
{
  "overallAssessment": "string",
  "leftEarInterpretation": "string",
  "rightEarInterpretation": "string",
  "ageGenderConsiderations": "string",
  "recommendations": ["string"],
  "seekProfessionalHelp": "boolean",
  "professionalHelpReason": "string"
}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return {
        overallAssessment: content,
        leftEarInterpretation: `Score: ${data.leftEarScore}/20`,
        rightEarInterpretation: `Score: ${data.rightEarScore}/20`,
        ageGenderConsiderations: "Individual factors considered",
        recommendations: ["Consult with a hearing professional"],
        seekProfessionalHelp: data.leftEarScore < 15 || data.rightEarScore < 15,
        professionalHelpReason: "Based on your test results"
      };
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};
