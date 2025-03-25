// app/providers.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import PostHogPageView from "./PostHogPageView"

import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
      posthog.init("phc_S8tHJaPxa5ORnP0RVyyTaJHeCcft6XMqfjx9ZlJWvkO", {
        api_host: "https://us.i.posthog.com",
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually,
        capture_pageleave: true, // Enable pageleave capture
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      })
  }, [])

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  )
}