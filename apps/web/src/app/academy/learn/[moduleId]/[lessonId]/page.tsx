"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Course curriculum data (same as dashboard)
const curriculum = [
  {
    id: "module-0",
    number: 0,
    title: "Welcome & Setup",
    lessons: [
      { id: "0.1", title: "Welcome to AI Launchpad", duration: "5 min" },
      { id: "0.2", title: "Your Learning Environment", duration: "5 min" },
      { id: "0.3", title: "Prerequisites Check", duration: "5 min" },
    ],
  },
  {
    id: "module-1",
    number: 1,
    title: "Foundations",
    lessons: [
      { id: "1.1", title: "The AI Readiness Audit", duration: "15 min" },
      { id: "1.2", title: "Account Setup Marathon", duration: "20 min" },
      { id: "1.3", title: "Understanding the Launchpad Stack", duration: "10 min" },
    ],
  },
  {
    id: "module-2",
    number: 2,
    title: "Claude Code Mastery",
    lessons: [
      { id: "2.1", title: "Installing Claude Code", duration: "15 min" },
      { id: "2.2", title: "Your First Claude Code Session", duration: "20 min" },
      { id: "2.3", title: "Prompting for Business Tasks", duration: "25 min" },
      { id: "2.4", title: "Configuring Claude Code Settings", duration: "15 min" },
      { id: "2.5", title: "Advanced Claude Code Features", duration: "15 min" },
    ],
  },
  {
    id: "module-3",
    number: 3,
    title: "MCP Server Deep Dive",
    lessons: [
      { id: "3.1", title: "What Are MCP Servers?", duration: "10 min" },
      { id: "3.2", title: "Installing Your First MCP Server", duration: "20 min" },
      { id: "3.3", title: "Connecting Google Services", duration: "20 min" },
      { id: "3.4", title: "Connecting GitHub", duration: "15 min" },
      { id: "3.5", title: "Troubleshooting MCP Connections", duration: "10 min" },
    ],
  },
  {
    id: "module-4",
    number: 4,
    title: "Skills & Plugins",
    lessons: [
      { id: "4.1", title: "Understanding Skills", duration: "10 min" },
      { id: "4.2", title: "Installing the Superpowers Plugin", duration: "15 min" },
      { id: "4.3", title: "Installing Industry Skills", duration: "15 min" },
      { id: "4.4", title: "Creating Your First Custom Skill", duration: "20 min" },
    ],
  },
  {
    id: "module-5",
    number: 5,
    title: "Automation Engines",
    lessons: [
      { id: "5.1", title: "Automation Strategy", duration: "10 min" },
      { id: "5.2", title: "n8n Installation & Setup", duration: "20 min" },
      { id: "5.3", title: "Building n8n Workflows", duration: "25 min" },
      { id: "5.4", title: "Zapier Essentials", duration: "20 min" },
      { id: "5.5", title: "Connecting Automations to Claude", duration: "15 min" },
    ],
  },
  {
    id: "module-6",
    number: 6,
    title: "Cloud Deployment",
    lessons: [
      { id: "6.1", title: "AWS Fundamentals for AI", duration: "15 min" },
      { id: "6.2", title: "Deploying with AWS Amplify", duration: "20 min" },
      { id: "6.3", title: "Google Cloud for AI Workloads", duration: "15 min" },
      { id: "6.4", title: "Cost Management & Optimization", duration: "10 min" },
    ],
  },
  {
    id: "module-7",
    number: 7,
    title: "Security & Responsible AI",
    lessons: [
      { id: "7.1", title: "Credential Security", duration: "15 min" },
      { id: "7.2", title: "Access Control & Auditing", duration: "10 min" },
      { id: "7.3", title: "Responsible AI Principles", duration: "15 min" },
      { id: "7.4", title: "Documentation & Handoff", duration: "5 min" },
    ],
  },
  {
    id: "module-8",
    number: 8,
    title: "Your First Agent Workflow",
    lessons: [
      { id: "8.1", title: "Capstone Project Overview", duration: "5 min" },
      { id: "8.2", title: "Building the Client Onboarding Agent", duration: "40 min" },
      { id: "8.3", title: "Testing & Refinement", duration: "10 min" },
      { id: "8.4", title: "Certification & Next Steps", duration: "5 min" },
    ],
  },
];

// Placeholder lesson content (will be replaced with actual content)
const lessonContent: Record<string, { videoUrl?: string; content: string }> = {
  "0.1": {
    content: `
# Welcome to AI Launchpad

Welcome to the AI Launchpad Academy! This course will transform how you work with AI.

## What You'll Learn

In this course, you'll master:
- **Claude Code** - Your AI-powered coding assistant
- **MCP Servers** - Connect AI to your tools
- **Custom Skills** - Build specialized AI capabilities
- **Automation** - Create powerful workflows with n8n and Zapier
- **Cloud Deployment** - Deploy AI solutions professionally
- **Security** - Keep your AI implementations safe

## The LAUNCH Method

We use the LAUNCH method to guide your learning:
- **L**andscape - Assess your AI readiness
- **A**rchitect - Design your AI stack
- **U**nlock - Connect powerful integrations
- **N**etwork - Build your skill library
- **C**onfigure - Set up automation
- **H**arden - Secure and document

Let's get started!
    `,
  },
  "0.2": {
    content: `
# Your Learning Environment

Before diving into the content, let's set up your learning environment.

## What You'll Need

1. **A Computer** - Windows, Mac, or Linux
2. **VS Code** - Our recommended code editor
3. **Node.js** - JavaScript runtime (v18+)
4. **Git** - Version control
5. **A Terminal** - Command line access

## Recommended Setup

### VS Code Extensions
- Claude Code extension
- ESLint
- Prettier
- GitLens

### Browser Extensions
- Claude.ai sidebar (optional)
- JSON Viewer

## Course Materials

All downloadable resources are available in the Resources section of your dashboard.

Download the **Course Workbook** to track your progress and take notes.
    `,
  },
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const moduleId = params.moduleId as string;
  const lessonId = params.lessonId as string;

  // Find current module and lesson
  const currentModule = curriculum.find((m) => m.id === moduleId);
  const currentLessonIndex = currentModule?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  const currentLesson = currentModule?.lessons[currentLessonIndex];

  // Find next and previous lessons
  const getAdjacentLesson = (direction: "next" | "prev") => {
    if (!currentModule) return null;

    if (direction === "next") {
      if (currentLessonIndex < currentModule.lessons.length - 1) {
        return {
          moduleId,
          lesson: currentModule.lessons[currentLessonIndex + 1],
        };
      }
      const nextModuleIndex = curriculum.findIndex((m) => m.id === moduleId) + 1;
      if (nextModuleIndex < curriculum.length) {
        return {
          moduleId: curriculum[nextModuleIndex].id,
          lesson: curriculum[nextModuleIndex].lessons[0],
        };
      }
    } else {
      if (currentLessonIndex > 0) {
        return {
          moduleId,
          lesson: currentModule.lessons[currentLessonIndex - 1],
        };
      }
      const prevModuleIndex = curriculum.findIndex((m) => m.id === moduleId) - 1;
      if (prevModuleIndex >= 0) {
        const prevModule = curriculum[prevModuleIndex];
        return {
          moduleId: prevModule.id,
          lesson: prevModule.lessons[prevModule.lessons.length - 1],
        };
      }
    }
    return null;
  };

  const nextLesson = getAdjacentLesson("next");
  const prevLesson = getAdjacentLesson("prev");

  useEffect(() => {
    async function checkEnrollment() {
      try {
        const email = session?.user?.email || "";
        const res = await fetch(`/api/academy/enrollment?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        setEnrolled(data.enrolled);

        if (data.enrolled && data.enrollment?.progress?.[moduleId]?.completed?.includes(lessonId)) {
          setCompleted(true);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
        setEnrolled(false);
      }
    }

    if (status !== "loading") {
      checkEnrollment();
    }
  }, [session, status, moduleId, lessonId]);

  const markComplete = async () => {
    setSaving(true);
    try {
      const email = session?.user?.email || "";
      await fetch("/api/academy/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId,
          lessonId,
          completed: true,
          email,
        }),
      });
      setCompleted(true);
    } catch (error) {
      console.error("Error marking complete:", error);
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || enrolled === null) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-surface rounded w-1/3"></div>
              <div className="aspect-video bg-surface rounded"></div>
              <div className="h-4 bg-surface rounded w-full"></div>
              <div className="h-4 bg-surface rounded w-3/4"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!enrolled) {
    router.push("/academy");
    return null;
  }

  if (!currentModule || !currentLesson) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
            <Link href="/academy/dashboard" className="text-accent hover:underline">
              Return to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const content = lessonContent[lessonId] || {
    content: `
# ${currentLesson.title}

This lesson content is being prepared. Check back soon!

In the meantime, you can:
- Review the previous lessons
- Download the course materials
- Join the community discussion
    `,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
            <Link href="/academy/dashboard" className="hover:text-accent">
              Dashboard
            </Link>
            <span>/</span>
            <span>{currentModule.title}</span>
            <span>/</span>
            <span className="text-text-primary">{currentLesson.title}</span>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Video Player Placeholder */}
              <div className="aspect-video bg-surface border border-border-subtle rounded-xl mb-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-text-secondary">Video content coming soon</p>
                  <p className="text-text-muted text-sm mt-1">{currentLesson.duration}</p>
                </div>
              </div>

              {/* Lesson Title */}
              <h1
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {currentLesson.title}
              </h1>

              {/* Lesson Content */}
              <div className="prose prose-invert max-w-none">
                {content.content.split("\n").map((line, i) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h1 key={i} className="text-2xl font-bold mt-8 mb-4">
                        {line.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (line.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-semibold mt-6 mb-3">
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (line.startsWith("### ")) {
                    return (
                      <h3 key={i} className="text-lg font-medium mt-4 mb-2">
                        {line.replace("### ", "")}
                      </h3>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <li key={i} className="ml-4 text-text-secondary">
                        {line.replace("- ", "")}
                      </li>
                    );
                  }
                  if (line.match(/^\d+\. /)) {
                    return (
                      <li key={i} className="ml-4 text-text-secondary list-decimal">
                        {line.replace(/^\d+\. /, "")}
                      </li>
                    );
                  }
                  if (line.trim() === "") {
                    return <br key={i} />;
                  }
                  return (
                    <p key={i} className="text-text-secondary mb-2">
                      {line}
                    </p>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="mt-12 pt-8 border-t border-border-subtle">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {prevLesson && (
                      <Link
                        href={`/academy/learn/${prevLesson.moduleId}/${prevLesson.lesson.id}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border-subtle hover:border-accent transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </Link>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {!completed ? (
                      <button
                        onClick={markComplete}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-colors disabled:opacity-50"
                      >
                        {saving ? (
                          "Saving..."
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Mark Complete
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 px-6 py-2 rounded-lg bg-green-500/10 text-green-500 font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Completed
                      </span>
                    )}

                    {nextLesson && (
                      <Link
                        href={`/academy/learn/${nextLesson.moduleId}/${nextLesson.lesson.id}`}
                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-surface border border-border-subtle hover:border-accent transition-colors"
                      >
                        Next
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-surface border border-border-subtle rounded-xl p-4">
                  <h3 className="font-semibold mb-4">{currentModule.title}</h3>
                  <ul className="space-y-2">
                    {currentModule.lessons.map((lesson, idx) => {
                      const isActive = lesson.id === lessonId;
                      return (
                        <li key={lesson.id}>
                          <Link
                            href={`/academy/learn/${moduleId}/${lesson.id}`}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                              isActive
                                ? "bg-accent/10 text-accent"
                                : "text-text-secondary hover:bg-background hover:text-text-primary"
                            }`}
                          >
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                isActive ? "bg-accent text-white" : "bg-surface"
                              }`}
                            >
                              {idx + 1}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <Link
                  href="/academy/dashboard"
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-border-subtle hover:border-accent transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
