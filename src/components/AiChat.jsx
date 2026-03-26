import { useState } from "react";
import axios from "axios";
import { BsStars, BsSend } from "react-icons/bs";

function AiChat({ currentWeatherData, t, lang }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const MODEL_NAME = "llama-3.3-70b-versatile";

  const fetchGroqResponse = async (systemMessage, userMessage) => {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: MODEL_NAME,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 300,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data.choices[0].message.content;
  };

  const generateSummary = async () => {
    if (!currentWeatherData || !currentWeatherData.name) return;
    setIsSummaryLoading(true);
    setSummary("");

    try {
      const systemPrompt = `You are a charismatic AI meteorologist. YOU MUST REPLY STRICTLY IN THE LANGUAGE CODE: '${lang}'.`;
      const userPrompt = `
        Current weather in ${currentWeatherData.name}: ${JSON.stringify(currentWeatherData)}.
        Based on this data, write ONE short, creative, and useful paragraph (max 3 sentences). 
        Give advice on what to wear or what to do today. Use 1-2 emojis.
      `;
      const textResponse = await fetchGroqResponse(systemPrompt, userPrompt);
      setSummary(textResponse);
    } catch (error) {
      console.error("Groq Error:", error);
      setSummary("Error loading AI forecast.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const askAi = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setAnswer("");

    try {
      const systemPrompt = `
        You are an AI weather assistant. YOU MUST REPLY STRICTLY IN THE LANGUAGE CODE: '${lang}'.
        Answer ONLY questions related to weather, clothing advice, or outdoor activities.
        Current weather data in ${currentWeatherData.name}: ${JSON.stringify(currentWeatherData)}.
      `;
      const textResponse = await fetchGroqResponse(systemPrompt, question);
      setAnswer(textResponse);
      setQuestion("");
    } catch (error) {
      console.error("Groq Error:", error);
      setAnswer("Oops, connection to the AI center lost.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mt-6 bg-white/20 dark:bg-[#1e1e1e] backdrop-blur-md dark:backdrop-blur-none rounded-2xl p-6 shadow-xl dark:shadow-2xl border border-white/10 dark:border-white/5 text-white transition-colors duration-500">
      <h3 className="text-xl font-medium mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          ✨ {t("aiTitle") || "AI Analysis"}
        </span>

        {!summary && !isSummaryLoading && (
          <button
            onClick={generateSummary}
            className="flex items-center gap-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-blue-400/50 hover:border-blue-400 bg-blue-400/10 hover:bg-blue-400/20 rounded-full transition-all duration-300 active:scale-95 shadow-sm"
          >
            <BsStars size={12} className="text-blue-400" />
            {t("generateForecast") || "Generate Forecast"}
          </button>
        )}
      </h3>

      <div className="mb-6">
        {isSummaryLoading ? (
          <p className="text-gray-200 animate-pulse border-l-4 border-blue-400 pl-4 font-light italic">
            {t("analyzing") || "Analyzing..."}
          </p>
        ) : summary ? (
          <div className="border-l-4 border-blue-400 bg-blue-900/20 dark:bg-blue-900/30 rounded-r-lg overflow-hidden">
            <p className="text-lg leading-relaxed py-3 px-5 break-words drop-shadow-sm font-medium">
              {summary}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-300 dark:text-gray-400 italic">
            {t("aiPlaceholder") ||
              "Click the button above for AI weather insights."}
          </p>
        )}
      </div>

      <div className="border-t border-white/20 dark:border-white/10 my-4"></div>

      {answer && (
        <div className="mb-4 p-4 bg-black/20 dark:bg-[#252525] rounded-xl text-gray-100 italic border border-white/5 animate-fade-in break-words">
          "{answer}"
        </div>
      )}

      <div className="flex gap-2 sm:gap-4 bg-white/5 dark:bg-black/20 p-2 rounded-xl border border-white/10">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAi()}
          placeholder={t("askPlaceholder") || "Ask a question..."}
          className="flex-1 min-w-0 px-3 py-2 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
        />

        <button
          onClick={askAi}
          disabled={isLoading || !question.trim()}
          className="flex items-center justify-center gap-2 px-3 sm:px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 font-bold text-xs uppercase tracking-widest disabled:opacity-30 active:scale-95 whitespace-nowrap"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              {t("ask") || "Ask"}
              <BsSend size={12} className="text-gray-400" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default AiChat;
