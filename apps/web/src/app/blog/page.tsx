import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog | Support Forge",
  description:
    "Insights on AI, automation, and IT from the Support Forge team. Practical guides, tutorials, and strategies for modern businesses.",
  keywords: [
    "AI blog",
    "automation tutorials",
    "IT consulting insights",
    "n8n guides",
    "business automation",
    "AI for small business",
  ],
  openGraph: {
    title: "Blog | Support Forge",
    description:
      "Insights on AI, automation, and IT from the Support Forge team.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/blog",
  },
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6">
            <span className="text-accent">Blog</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Insights on AI, automation, and IT. Practical guides and strategies
            to help your business work smarter.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group relative bg-surface border border-border-subtle rounded-2xl overflow-hidden hover:border-accent/50 transition-all hover:shadow-lg hover:shadow-accent/5"
              >
                {/* Coming Soon Badge */}
                {post.status === "coming-soon" && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs text-text-muted bg-background rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
                    {post.status === "published" ? (
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    ) : (
                      post.title
                    )}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-text-muted pt-4 border-t border-border-subtle">
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Hover Overlay for Coming Soon */}
                {post.status === "coming-soon" && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-accent text-white rounded-lg font-medium">
                      Coming Soon
                    </span>
                  </div>
                )}

                {/* Link Overlay for Published */}
                {post.status === "published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="absolute inset-0"
                    aria-label={`Read ${post.title}`}
                  />
                )}
              </article>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                No posts yet
              </h3>
              <p className="text-text-secondary">
                Check back soon for insights on AI, automation, and IT.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-accent/10 via-background to-accent/10 border border-border-subtle rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
              Stay Updated
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Get notified when we publish new articles. No spam, just practical
              insights on AI and automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                href="/contact"
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
