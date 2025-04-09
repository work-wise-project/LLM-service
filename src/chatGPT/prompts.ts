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

export default {
  AnalyzeResumePrompt,
  GrammarCheckPrompt,
};
