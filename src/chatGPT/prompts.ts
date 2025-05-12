const AnalyzeResumePrompt = (resumeText: string) => `
Act as a hiring manager and analyze the resume of a candidate for a software engineering position.
Resume:
"""
${resumeText}
"""
Provide a structured review, highlighting the strengths and weaknesses of the candidate.
Your response should be a json object with the following structure and each response in the field should be limited to 500 characters:
{
  "general_review": "General review of the resume",
  "strengths": ["List of strengths"],
  "weaknesses": ["List of weaknesses"]
}
Respond with ONLY the raw JSON. Do not include any explanation, backticks, or formatting — just the JSON object.
`;

const GrammarCheckPrompt = (resumeText: string) => `
You are a language model AI assistant. A user has asked you to check the grammar of the following resume text.
Please return only the **corrections and suggestions**, in plain text, not the full resume.
Use bullet points if helpful, and separate items with newline characters. Do NOT return HTML or Markdown.
"""
${resumeText}
"""
`;

const InterviewPreparationPrompt = (jobLink: string) => `
 You are an expert career coach helping prepare a candidate for an interview.

Please analyze the following job description and provide:
1. A concise description of the company (100 words max)
2. A clear summary of the role and its responsibilities (150 words max)
3. A list of potential interview questions (5 questions max) that the candidate should prepare for, based on the job description.

Job link:
${jobLink}

Format your response as a JSON object with the following structure:
{
  "company_description": "Your description of the company here...",
  "role_description": "Your description of the role here..."
  "material_links": ["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"],
}

Respond with ONLY the raw JSON. Do not include any explanation, backticks, or formatting — just the JSON object.
`;

export default {
    AnalyzeResumePrompt,
    GrammarCheckPrompt,
    InterviewPreparationPrompt,
};
