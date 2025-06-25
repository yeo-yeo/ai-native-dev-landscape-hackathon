"use client";

import { useEffect, useState } from "react";

const PLACEHOLDER_SUGGESTIONS = [
  "I'm trying to build a recipe generator",
  "I'm trying to build a chatbot",
  "I'm trying to build a social media platform",
  "I'm trying to build a e-commerce platform",
  "I'm trying to build a blog",
  "I'm trying to build a portfolio website",
  "I'm trying to build a landing page",
  "I'm trying to build a product",
  "I'm trying to build a SaaS",
  "I'm trying to build a mobile app",
  "I'm trying to build a desktop app",
  "I'm trying to build a game",
];

export default function Chatathon() {
  const [placeholder, setPlaceholder] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPlaceholder(PLACEHOLDER_SUGGESTIONS[Math.floor(Math.random() * PLACEHOLDER_SUGGESTIONS.length)]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse("");

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      setResponse(data.response);
    } catch (error) {
      console.error('Chat error:', error);
      setResponse('Sorry, something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <div className="space-y-4">
        <h2 className="heading-m">👋 What are you trying to do?</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="body-sm lg:body w-full border border-gray-300 rounded-md p-2"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            {isLoading ? 'Getting suggestions...' : 'Get AI Suggestions'}
          </button>
        </form>

        {response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md border">
            <h3 className="font-semibold mb-2">AI Suggestions:</h3>
            <p className="body-sm text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </section>
  );
}