"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Enrollment {
  id: string;
  courseType: string;
  courseName: string;
  status: string;
  enrolledAt: string;
  progress: Record<string, { completed: string[]; percentage: number }> | null;
}

// Course curriculum data
const curriculum = [
  {
    id: "module-0",
    number: 0,
    title: "Welcome & Setup",
    duration: "15 min",
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
    subtitle: "LANDSCAPE Phase",
    duration: "45 min",
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
    subtitle: "ARCHITECT Phase",
    duration: "90 min",
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
    subtitle: "UNLOCK Phase",
    duration: "75 min",
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
    subtitle: "NETWORK Phase",
    duration: "60 min",
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
    subtitle: "CONFIGURE Phase",
    duration: "90 min",
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
    subtitle: "CONFIGURE Phase",
    duration: "60 min",
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
    subtitle: "HARDEN Phase",
    duration: "45 min",
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
    subtitle: "CAPSTONE",
    duration: "60 min",
    lessons: [
      { id: "8.1", title: "Capstone Project Overview", duration: "5 min" },
      { id: "8.2", title: "Building the Client Onboarding Agent", duration: "40 min" },
      { id: "8.3", title: "Testing & Refinement", duration: "10 min" },
      { id: "8.4", title: "Certification & Next Steps", duration: "5 min" },
    ],
  },
];

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
      <div
        className="h-full bg-accent transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedModule, setExpandedModule] = useState<string | null>("module-0");

  useEffect(() => {
    async function checkEnrollment() {
      try {
        const email = session?.user?.email || "";
        const res = await fetch(`/api/academy/enrollment?email=${encodeURIComponent(email)}`);
        const data = await res.json();

        if (data.enrolled) {
          setEnrollment(data.enrollment);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      } finally {
        setLoading(false);
      }
    }

    if (status !== "loading") {
      checkEnrollment();
    }
  }, [session, status]);

  // Calculate overall progress
  const calculateOverallProgress = () => {
    if (!enrollment?.progress) return 0;
    const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
    const completedLessons = Object.values(enrollment.progress).reduce(
      (acc, m) => acc + (m.completed?.length || 0),
      0
    );
    return Math.round((completedLessons / totalLessons) * 100);
  };

  const getModuleProgress = (moduleId: string) => {
    if (!enrollment?.progress?.[moduleId]) return 0;
    const module = curriculum.find((m) => m.id === moduleId);
    if (!module) return 0;
    const completed = enrollment.progress[moduleId].completed?.length || 0;
    return Math.round((completed / module.lessons.length) * 100);
  };

  const isLessonCompleted = (moduleId: string, lessonId: string) => {
    return enrollment?.progress?.[moduleId]?.completed?.includes(lessonId) || false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-surface rounded w-1/3"></div>
            <div className="h-4 bg-surface rounded w-1/2"></div>
            <div className="h-64 bg-surface rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-2xl mx-auto text-center pt-20">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Course Access Required</h1>
          <p className="text-text-secondary mb-8">
            You need to enroll in the AI Academy to access the course content.
          </p>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium transition-all"
          >
            View Enrollment Options
          </Link>
        </div>
      </div>
    );
  }

  const overallProgress = calculateOverallProgress();

  // Find next incomplete lesson
  const findNextLesson = () => {
    for (const module of curriculum) {
      for (const lesson of module.lessons) {
        if (!isLessonCompleted(module.id, lesson.id)) {
          return { moduleId: module.id, lessonId: lesson.id, title: lesson.title };
        }
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Welcome back, {session?.user?.name?.split(" ")[0] || "Student"}!
            </h1>
            <p className="text-text-secondary">
              {enrollment.courseName} • Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {nextLesson && (
              <Link
                href={`/academy/learn/${nextLesson.moduleId}/${nextLesson.lessonId}`}
                className="p-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-3 group-hover:bg-white/30 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M8 6L18 12L8 18V6Z" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm mb-0.5">Continue Learning</h3>
                <p className="text-white/70 text-xs truncate">{nextLesson.title}</p>
              </Link>
            )}

            <Link
              href="/academy/resources/templates"
              className="p-4 bg-surface border border-border-subtle rounded-xl hover:border-accent transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M8 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14C15.1046 21 16 20.1046 16 19V16" stroke="currentColor" strokeWidth="1.5"/>
                  <rect x="8" y="1" width="13" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M11 6H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M20 18L20.5 19.5L22 20L20.5 20.5L20 22L19.5 20.5L18 20L19.5 19.5L20 18Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-0.5">Templates</h3>
              <p className="text-text-muted text-xs">Download resources</p>
            </Link>

            <Link
              href="/academy/resources/config"
              className="p-4 bg-surface border border-border-subtle rounded-xl hover:border-accent transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M8 6L3 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 6L21 12L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
                  <path d="M12 9.5V14.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="font-semibold text-sm mb-0.5">Config Files</h3>
              <p className="text-text-muted text-xs">MCP & code samples</p>
            </Link>

            {enrollment.courseType === "liveTutoring" ? (
              <a
                href="mailto:support@support-forge.com?subject=Schedule%20Tutoring%20Session"
                className="p-4 bg-surface border border-border-subtle rounded-xl hover:border-accent transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9 4V2M15 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="15" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm mb-0.5">Schedule Tutoring</h3>
                <p className="text-text-muted text-xs">Book 1-on-1 session</p>
              </a>
            ) : (
              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-surface border border-border-subtle rounded-xl hover:border-accent transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center mb-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <h3 className="font-semibold text-sm mb-0.5">Community</h3>
                <p className="text-text-muted text-xs">Join Discord</p>
              </a>
            )}
          </div>

          {/* Progress Overview */}
          <div className="bg-surface border border-border-subtle rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Your Progress</h2>
              <span className="text-accent font-bold">{overallProgress}%</span>
            </div>
            <ProgressBar percentage={overallProgress} />
            <div className="mt-4 flex gap-8 text-sm text-text-secondary">
              <div>
                <span className="text-text-primary font-medium">
                  {Object.values(enrollment.progress || {}).reduce(
                    (acc, m) => acc + (m.completed?.length || 0),
                    0
                  )}
                </span>{" "}
                of {curriculum.reduce((acc, m) => acc + m.lessons.length, 0)} lessons completed
              </div>
              <div>
                <span className="text-text-primary font-medium">~9 hours</span> total content
              </div>
            </div>
          </div>

          {/* Course Modules */}
          <div className="space-y-4">
            {curriculum.map((module) => {
              const moduleProgress = getModuleProgress(module.id);
              const isExpanded = expandedModule === module.id;

              return (
                <div
                  key={module.id}
                  className="bg-surface border border-border-subtle rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                    className="w-full p-6 text-left flex items-center gap-4 hover:bg-background/50 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                        moduleProgress === 100
                          ? "bg-green-500/10 text-green-500"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {moduleProgress === 100 ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        module.number
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{module.title}</h3>
                        {module.subtitle && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                            {module.subtitle}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                        <span>{module.lessons.length} lessons</span>
                        <span>{module.duration}</span>
                        <span>{moduleProgress}% complete</span>
                      </div>
                    </div>
                    <svg
                      className={`w-5 h-5 text-text-muted transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-border-subtle">
                      {module.lessons.map((lesson, idx) => {
                        const completed = isLessonCompleted(module.id, lesson.id);
                        return (
                          <Link
                            key={lesson.id}
                            href={`/academy/learn/${module.id}/${lesson.id}`}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-background/50 transition-colors border-b border-border-subtle last:border-b-0"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                completed
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-surface border border-border-subtle text-text-muted"
                              }`}
                            >
                              {completed ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                idx + 1
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{lesson.title}</p>
                            </div>
                            <span className="text-text-muted text-sm">{lesson.duration}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Resources Section */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Course Resources</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/academy/resources/templates"
                className="p-6 bg-surface border border-border-subtle rounded-xl hover:border-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Templates</h3>
                <p className="text-text-secondary text-sm">Download worksheets and templates</p>
              </Link>

              <Link
                href="/academy/resources/config"
                className="p-6 bg-surface border border-border-subtle rounded-xl hover:border-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Config Files</h3>
                <p className="text-text-secondary text-sm">MCP configs and code samples</p>
              </Link>

              <a
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-surface border border-border-subtle rounded-xl hover:border-accent transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-1">Community</h3>
                <p className="text-text-secondary text-sm">Join the Discord community</p>
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}
