"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

import "highlight.js/styles/atom-one-dark.css";

interface MarkdownProps {
  content?: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownProps) {
  if (!content) return <></>;

  return (
    <article
      className={cn(
        "prose md:prose-lg prose-slate dark:prose-invert max-w-6xl mx-auto text-justify prose-pre:p-0 prose-pre:bg-transparent p",
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
                <CopyButton code={children} />
                <pre className="p-4 overflow-x-auto bg-transparent! m-0!">
                  {children}
                </pre>
              </div>
            );
          },
          code({ node, inline, className, children, ...props }: any) {
            const isInline = !className?.includes("hljs");

            if (isInline) {
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

function CopyButton({ code }: { code: any }) {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    const extractText = (node: any): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extractText).join("");
      if (node?.props?.children) return extractText(node.props.children);
      return "";
    };

    const text = extractText(code).replace(/\n$/, "");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-white/10"
        onClick={onCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
