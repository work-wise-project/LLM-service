import { InterviewPreparation } from '../types/preperation';

const AnalyzeResumePrompt = (resumeText: string) => `
Act as a hiring manager and analyze the resume of a candidate for a software engineering position.
Resume:
"""
${resumeText}
"""
Provide a structured review, highlighting the strengths and weaknesses of the candidate.
You are to return only a raw JSON object, with absolutely no markdown, no backticks, no explanation, and no escaped characters like \n. Imagine this is being pasted directly into a .json file — it must be valid JSON only.

Each string field should be no longer than 500 characters.

Structure:
{
"general_review": "General review of the resume",
"strengths": ["List of strengths"],
"weaknesses": ["List of weaknesses"]
}

Again, output only the plain JSON object — no code block, no formatting, no surrounding text.
If you add backticks, markdown, or escaped newline characters, the response will be rejected by the parser. Do not add them under any circumstances.
`;

const GrammarCheckPrompt = (resumeText: string) => `
You are a language model AI assistant. A user has asked you to check the grammar of the following resume text.
Please return only the **corrections and suggestions**, in plain text, not the full resume.
Use bullet points if helpful, and separate items with newline characters. Do NOT return HTML or Markdown.
"""
${resumeText}
"""
`;

const hasInfo = ({
    resumeText,
    skillsList,
    education,
    workExperience,
    pointsToImprove,
    prevMaterialLinks,
}: Omit<InterviewPreparation, 'jobLink'>) =>
    resumeText ||
    skillsList?.length ||
    education?.length ||
    workExperience?.length ||
    pointsToImprove?.length ||
    prevMaterialLinks?.length;

const SearchQueryPrompt = ({ jobLink, ...optionalInfo }: InterviewPreparation) => `
You are helping a software engineer prepare for a specific job interview.

You will receive:
- A job description
- The candidate’s background (resume, skills, education, experience) - may be partial
- Optionally, known weaknesses or improvement points from a previous interview

Your goal is to generate **up to 5 highly focused, practical Google search queries** that will return relevant preparation resources.

**Your top priority**:
Identify any **gaps** between the job requirements and the candidate’s experience (e.g., missing tools, unfamiliar frameworks, weak topics from past interviews), and generate queries that **specifically target** those gaps.

Your second priority:
Cover any **broader topics** that are relevant to the role but not already well-covered by the candidate’s background.

Make sure you adress both the top priority and the second priority, but keep prioritization in mind.

 Objectives:
1. Address the most critical experience gaps or weak areas **first**.
2. Cover broader topics only if they’re relevant to the role and not already well-covered by the candidate.
3. Limit the total number of queries to **5 or fewer** .

🔧 Query writing tips:
- Make each query sound like a natural, useful Google search.
- Prioritize clarity and relevance. Example: 'node.js async patterns interview prep' is better than '"backend node.js async design pattern system"'.
- Avoid stacking quoted terms or long keyword lists.
- If needed, use high-signal domains (e.g. 'site:leetcode.com', 'site:aws.amazon.com', 'site:youtube.com') — but only when they improve relevance.
- Do **not** hallucinate or create imaginary technologies or company-specific terminology.

Inputs:

Job Description:
${jobLink}

${
    hasInfo(optionalInfo)
        ? `Candidate info:

${optionalInfo.resumeText ? `Resume: ${optionalInfo.resumeText}` : ''}

${optionalInfo.skillsList?.length ? 'Skills: ' + optionalInfo.skillsList : ''}
${optionalInfo.education?.length ? 'Education: ' + optionalInfo.education : ''}
${optionalInfo.workExperience?.length ? 'Work Experience: ' + optionalInfo.workExperience : ''}
${
    optionalInfo.pointsToImprove?.length
        ? 'Points to Improve (from latest interview): ' + optionalInfo.pointsToImprove
        : ''
}
`
        : ''
}

Output:
Return a JSON array of up to 5 search queries:
Format your response as a JSON object with the following structure:

["search query 1", "search query 2", "search query 3", "search query 4", "search query 5"]

Respond with ONLY the raw JSON. Do not include any explanation, backticks, or formatting — just the JSON object.

`;

const InterviewPreparationPrompt = ({
    jobLink,
    listOfLinksWithTitlesAndSnippets,
    ...optionalInfo
}: InterviewPreparation & { listOfLinksWithTitlesAndSnippets: string[] }) => `
You are helping a software engineer prepare for a job interview.

You have the job description, the candidate's background, and a list of real links retrieved from a Google search. Your task is to create a **personalized interview preparation plan**, tailored to both the job requirements and the candidate’s experience.

Use the links provided — do not invent or hallucinate new ones.

Inputs:

Job link:
${jobLink}

${
    hasInfo(optionalInfo)
        ? `Candidate info:

${optionalInfo.resumeText ? `Resume: ${optionalInfo.resumeText}` : ''}

${optionalInfo.skillsList?.length ? 'Skills: ' + optionalInfo.skillsList : ''}
${optionalInfo.education?.length ? 'Education: ' + optionalInfo.education : ''}
${optionalInfo.workExperience?.length ? 'Work Experience: ' + optionalInfo.workExperience : ''}
${
    optionalInfo.pointsToImprove?.length
        ? 'Points to Improve (from latest interview): ' + optionalInfo.pointsToImprove
        : ''
}
${
    optionalInfo.prevMaterialLinks?.length
        ? 'Previously Suggested Material Links: ' + optionalInfo.prevMaterialLinks
        : ''
}

`
        : ''
}

Retrieved Links:
${listOfLinksWithTitlesAndSnippets}

Instructions:
1. Read the job description and understand the company and role.
2. Use the candidate’s resume, skills, and experience to detect any **gaps or areas for improvement**.
3. From the retrieved links, choose **up to 10** that:
   - Are **most relevant** to the role and the candidate’s prep needs.
   - Help **fill specific experience gaps or reinforce essential topics**.
   - Come from **reputable, stable sources** (LeetCode, official docs, Coursera, YouTube official channels, AWS, etc.).
   - Are **free** or openly accessible (avoid paywalls).
4. Pay attention to the previous material links provided by the candidate. Try to avoid repeating them unless they are still highly relevant.

4. Summarize:
   - The company (max 100 words).
   - The role and responsibilities (max 150 words).
   - A **personalized, curated list** of up to 10 **preparation materials**.


Output format requirements:
- Do **not** include explanations after links.
- Only write each item like this: "Title: URL"
- Do **not** use Markdown, bullet points, or backticks.

Format your response as a JSON object with the following structure:
{
  "company_info": "Your description of the company here...",
  "job_info": "Your description of the role here...",
  "material_links": ["Link 1 description: Link 1", "Link 2 description: Link 2", "Link 3 description: Link 3", "Link 4 description: Link 4", "Link 5 description: Link 5", "Link 6 description: Link 6", "Link 7 description: Link 7", "Link 8 description: Link 8", "Link 9 description: Link 9", "Link 10 description:Link 10"]
}

Respond with ONLY the raw JSON. Do not include any explanation, backticks, or formatting — just the JSON object.
`;

const InterviewAnalysisSystemInstruction = `
You're an expert interview coach.
Inputs:
1. A transcript of the current job interview. Each entry includes:
   - time: Timestamp of the dialogue.
   - speaker: Who is speaking.
   - text: The sentence spoken.
   - confidence: The speech-to-text confidence score.
2. A history of the candidate’s previous interview feedbacks (points_to_improve and points_to_preserve, each with optional timestamps and trends).
3. A list of the candidate’s known skills (e.g., technologies and subjects).

Your task is to analyze the candidate's performance in the current interview and extract:
1. points_to_improve: Specific behaviors, gaps in technical knowledge, communication issues, or soft skills that could be improved to make the candidate more effective in technical interviews.
2. points_to_preserve: Specific strengths in technical knowledge, clear explanations, or effective communication practices that the candidate should continue using in future interviews.

For each point, provide:
- text: The feedback itself, written in second person.
- timestamp: The time the issue or strength was observed in the transcript.
- trend: A short comment indicating if the point is recurring, improved, regressed, or new — based on past interviews and the user’s known skills.

When analyzing the interview:
- Compare current performance to previous feedback to detect repeated patterns or improvements. ONLY IF YOU HAVE PREVIOUS FEEDBACK.
- Don't repeat points that have already been identified in previous interviews unless they are still relevant.
- Don't repeat points word for word from previous interviews.
- Don't invent new points that are not supported by the transcript.
- Reinforce strengths already identified in the user's skill profile if they appear again.
- Prioritize timestamps where the issue or strength is most clearly evident.
- Be specific and concise.
- Give 5 points to improve and 5 points to preserve, if available.

Focus on the following areas:
- Technical Skills & Knowledge: Evaluate the candidate’s understanding of technologies, problem-solving skills, and ability to explain concepts clearly.
- Soft Skills: Assess teamwork, adaptability, curiosity, and initiative.
- Communication: Evaluate clarity, organization, tone, and responsiveness in answers.

Use only the transcript and the provided context. Do not infer anything based on appearance, body language, or non-verbal cues.

Expected Output Format (JSON):
{
  "points_to_improve": [
    {
      "text": "...",
      "timestamp": "...",
      "trend": "..."
    }
  ],
  "points_to_preserve": [
    {
      "text": "...",
      "timestamp": "...",
      "trend": "..."
    }
  ]
}`;

export default {
    AnalyzeResumePrompt,
    GrammarCheckPrompt,
    InterviewPreparationPrompt,
    InterviewAnalysisSystemInstruction,
    SearchQueryPrompt,
};
