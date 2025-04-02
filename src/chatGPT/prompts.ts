const AnalyzeResumePrompt = (resumeText: string) => `
Act as a hiring manager and analyze the resume of a candidate for a software engineering position.
Resume:
"""
${resumeText}
"""

Provide a structured review, highlighting the strengths and weaknesses of the candidate.
Your response should be a json object with the following structure:
{
  "general_review": "General review of the resume",
  "strengths": ["List of strengths"],
  "weaknesses": ["List of weaknesses"]
 "word_limit": "Each response field should be limited to 500 characters"
}
`;

const GrammarCheckPrompt = (resumeText: string) => `
You are a language model AI assistant. A user has asked you to check the grammar of the following text:
"""
${resumeText}
"""
`;

export default {
  AnalyzeResumePrompt,
  GrammarCheckPrompt,
};
