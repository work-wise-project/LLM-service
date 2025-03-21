const AnalizeResumePropmt = `
Act as a hiring manager and analyze the resume of a candidate for a software engineering position.
The resume is for a candidate named John Doe, who has 5 years of experience in software engineering. /// עוד אינפורמציה על הבנאדם (תכלס כנראה כתוב בקורות חיים אז אולי לא צריך)
Response in the form of a structured review, highlighting the strengths and weaknesses of the candidate.
Your response should be a json object with the following structure:
{
  "general_review": "General review of the resume",
  "strengths": ["List of strengths"],
  "weaknesses": ["List of weaknesses"]
  מה שאנחנו עוד רוצים
  להגביל אותו בתשובה, שלא תהיה שום תשובה עם יותר מ- 500 תווים לדוגמא
}
`;

const GrammerCheckPropmt = `
You are a language model AI assistant. A user has asked you to check the grammar of the following text:
...
`;

export default {
  AnalizeResumePropmt,
  GrammerCheckPropmt,
};
