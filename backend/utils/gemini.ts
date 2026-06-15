interface GeminiResponse {
    error?: {
        message: string;
    };
    candidates?: Array<{
        content?: {
            parts?: Array<{
                text?: string;
            }>;
        };
    }>;
}

export const generateGeminiResponse = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            }
        );

        const data = (await response.json()) as GeminiResponse;

        if (data.error) {
            console.log("Gemini API error:", data.error.message);
            return "Sorry, I'm having trouble responding right now.";
        }

        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        return text || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.log("Error calling Gemini API:", (error as Error).message);
        return "Sorry, something went wrong while contacting Gemini.";
    }
};