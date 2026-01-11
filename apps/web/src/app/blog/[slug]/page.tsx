import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/data/posts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Support Forge Blog",
    };
  }

  return {
    title: `${post.title} | Support Forge Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.featuredImage ? [post.featuredImage] : ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Simple markdown-to-JSX renderer for trusted content only
// Note: This content comes from our static posts.ts file, not user input
function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      if (text.trim()) {
        elements.push(
          <p key={elements.length} className="text-text-secondary leading-relaxed mb-4">
            {renderInlineElements(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={elements.length} className="text-text-secondary my-4 pl-6 list-disc space-y-2">
          {listItems.map((item, i) => (
            <li key={i}>{renderInlineElements(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const renderInlineElements = (text: string): React.ReactNode => {
    // Split by patterns and render inline elements
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyCounter = 0;

    while (remaining.length > 0) {
      // Check for bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Check for inline code
      const codeMatch = remaining.match(/`([^`]+)`/);
      // Check for links
      const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

      // Find the earliest match
      const matches = [
        boldMatch ? { type: "bold", match: boldMatch, index: boldMatch.index! } : null,
        codeMatch ? { type: "code", match: codeMatch, index: codeMatch.index! } : null,
        linkMatch ? { type: "link", match: linkMatch, index: linkMatch.index! } : null,
      ].filter(Boolean).sort((a, b) => a!.index - b!.index);

      if (matches.length === 0) {
        parts.push(remaining);
        break;
      }

      const first = matches[0]!;

      // Add text before the match
      if (first.index > 0) {
        parts.push(remaining.slice(0, first.index));
      }

      // Add the formatted element
      if (first.type === "bold") {
        parts.push(
          <strong key={keyCounter++} className="text-text-primary font-semibold">
            {first.match[1]}
          </strong>
        );
      } else if (first.type === "code") {
        parts.push(
          <code key={keyCounter++} className="bg-surface px-1.5 py-0.5 rounded text-accent text-sm">
            {first.match[1]}
          </code>
        );
      } else if (first.type === "link") {
        parts.push(
          <Link key={keyCounter++} href={first.match[2]} className="text-accent hover:underline">
            {first.match[1]}
          </Link>
        );
      }

      remaining = remaining.slice(first.index + first.match[0].length);
    }

    return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={elements.length} className="bg-surface border border-border-subtle rounded-lg p-4 overflow-x-auto my-6">
            <code className="text-sm text-text-secondary">{codeBlockContent.join("\n")}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Headers
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-text-primary mt-12 mb-4">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-text-primary mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    // List items
    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.slice(2));
      continue;
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      elements.push(
        <blockquote key={elements.length} className="border-l-4 border-accent pl-4 italic text-text-secondary my-6">
          {renderInlineElements(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    // Regular text
    currentParagraph.push(line);
  }

  flushParagraph();
  flushList();

  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // If post is coming soon or draft, show a preview page
  if (post.status !== "published") {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <article className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>

            {/* Coming Soon Badge */}
            <div className="mb-6">
              <span className="px-4 py-2 text-sm font-medium bg-accent/20 text-accent rounded-full">
                Coming Soon
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-text-secondary mb-8">{post.excerpt}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm text-text-muted bg-surface border border-border-subtle rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Notify CTA */}
            <div className="bg-surface border border-border-subtle rounded-2xl p-8 mt-12">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Want to be notified when this article is published?
              </h2>
              <p className="text-text-secondary mb-6">
                Get in touch and we&apos;ll let you know as soon as it&apos;s ready.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all"
              >
                Contact Us
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm text-accent bg-accent/10 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-text-secondary">
              <span>{formatDate(post.date)}</span>
              <span className="w-1 h-1 rounded-full bg-text-muted" />
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="mb-16">
            {renderMarkdownContent(post.content)}
          </div>

          {/* Author Section */}
          <div className="border-t border-b border-border-subtle py-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent text-xl font-semibold">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-semibold text-text-primary">
                  {post.author.name}
                </div>
                <div className="text-text-secondary text-sm">
                  {post.author.role}
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={
                      relatedPost.status === "published"
                        ? `/blog/${relatedPost.slug}`
                        : "#"
                    }
                    className={`group block bg-surface border border-border-subtle rounded-xl p-4 transition-all ${
                      relatedPost.status === "published"
                        ? "hover:border-accent/50"
                        : "opacity-75 cursor-default"
                    }`}
                  >
                    {relatedPost.status === "coming-soon" && (
                      <span className="inline-block px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded mb-2">
                        Coming Soon
                      </span>
                    )}
                    <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-text-secondary text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-accent/10 via-background to-accent/10 border border-border-subtle rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-text-secondary mb-6">
              Let&apos;s discuss how AI and automation can help you work smarter.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all"
            >
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
