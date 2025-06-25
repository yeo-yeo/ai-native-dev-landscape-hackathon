"use client";

import { useEffect, useState } from "react";

const PLACEHOLDER_SUGGESTIONS = [
  "I'm trying to build a recipe generator that suggests meals based on ingredients in my fridge",
  "I'm trying to build a chatbot for mental health support",
  "I'm trying to build a social platform for connecting local musicians",
  "I'm trying to build an e-commerce site for vintage clothing with AI styling recommendations",
  "I'm trying to build a blog that automatically generates technical tutorials",
  "I'm trying to build a portfolio website with AI-powered project descriptions",
  "I'm trying to build a landing page with dynamic personalization",
  "I'm trying to build a SaaS tool for automated video editing",
  "I'm trying to build a mobile app for plant identification and care",
  "I'm trying to build a desktop app for AI-assisted music composition",
  "I'm trying to build a browser extension for summarizing articles",
  "I'm trying to build an educational game teaching coding concepts",
];

interface ChatathonProps {
  onSearch?: (value: string) => void;
}

export default function Chatathon({ onSearch }: ChatathonProps) {
  const [placeholder, setPlaceholder] = useState("");
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'filter' | 'ask'>('filter');

  useEffect(() => {
    setPlaceholder(PLACEHOLDER_SUGGESTIONS[Math.floor(Math.random() * PLACEHOLDER_SUGGESTIONS.length)]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // If in filter mode, call the search function immediately
    if (mode === 'filter' && onSearch) {
      onSearch(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (mode === 'filter') {
      // Filter mode - just trigger search
      if (onSearch) {
        onSearch(input);
      }
      return;
    }

    // Ask mode - call LLM
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
            onChange={handleInputChange}
            placeholder={mode === 'filter' ? 'Search tools...' : placeholder}
            className="body-sm lg:body w-full border border-gray-300 rounded-md p-2"
            disabled={isLoading}
          />
          
          {/* Mode Toggle */}
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => {
                setMode('filter');
                if (onSearch && input.trim()) {
                  onSearch(input); // Apply current input as filter when switching to filter mode
                }
              }}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                mode === 'filter' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Filter
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('ask');
                if (onSearch) {
                  onSearch(''); // Reset filter when switching to ask mode
                }
              }}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                mode === 'ask' 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ask
            </button>
          </div>
          
          {mode === 'ask' && (
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-4 py-2 bg-black text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
            >
              {isLoading ? 'Getting suggestions...' : 'Get AI Suggestions'}
            </button>
          )}
        </form>

        {mode === 'ask' && response && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md border">
            <h3 className="font-semibold mb-2">AI Suggestions:</h3>
            <p className="body-sm text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </section>
  );
}