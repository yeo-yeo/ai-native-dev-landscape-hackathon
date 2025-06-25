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

  useEffect(() => {
    setPlaceholder(PLACEHOLDER_SUGGESTIONS[Math.floor(Math.random() * PLACEHOLDER_SUGGESTIONS.length)]);
  }, []);

  return (
    <section>
      <div>
        <h2 className="heading-m">👋 What are you trying to do?</h2>
        <input
          type="text"
          placeholder={placeholder}
          className="body-sm lg:body w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </section>
  );
}