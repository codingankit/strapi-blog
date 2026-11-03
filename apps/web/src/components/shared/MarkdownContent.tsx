import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";
import { CodeCopyButton } from "./CodeCopyButton";

import "highlight.js/styles/atom-one-dark.css";

interface MarkdownProps {
  content?: string;
  className?: string;
}

// Runs on the server, so the copy button only receives a plain string.
function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    return extractText((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

/**
 * Server component: react-markdown, remark-gfm and highlight.js stay out of
 * the client bundle. Only the copy button hydrates.
 */
export function MarkdownContent({ content, className }: MarkdownProps) {
  if (!content) return null;

  return (
    <article
      className={cn(
        "prose md:prose-lg prose-slate dark:prose-invert max-w-6xl mx-auto text-justify prose-pre:p-0 prose-pre:bg-transparent",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre({ children }) {
            return (
              <div className="relative group my-6 overflow-hidden rounded-lg border border-[#181a1f] shadow-2xl bg-[#282c34] dark:bg-[#21252b]">
                <CodeCopyButton text={extractText(children).replace(/\n$/, "")} />
                <pre className="p-4 overflow-x-auto bg-transparent! m-0!">
                  {children}
                </pre>
              </div>
            );
          },
          code({ className, children, ...props }: React.ComponentPropsWithoutRef<"code">) {
            const isBlock =
              /language-|hljs/.test(className ?? "") ||
              extractText(children).includes("\n");

            if (!isBlock) {
              return (
                <code
                  className="bg-muted px-1.5 py-0.5 rounded-md font-mono font-medium text-foreground/90 before:content-none after:content-none"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
