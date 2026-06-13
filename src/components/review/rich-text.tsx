"use client";

import { Fragment } from "react";
import katex from "katex";

/**
 * <RichText>：把复习题库里的「轻富文本」字符串渲染成行内代码 + KaTeX 数学 + 纯文本。
 *
 * 题库（src/data/review/*）答案/问题用两种行内标记：
 *  - 行内代码：`code`（反引号）→ <code>，与正文同款 token 样式（等宽、--code-bg 轻底、控件圆角）；
 *  - 行内数学：$...$ → KaTeX（renderToString，displayMode:false）。
 * 其余为纯文本，原样输出；换行交给外层容器的 whitespace-pre-line 处理（本组件不插 <br>，
 * 让纯文本段保留 \n，由 CSS 折行）。
 *
 * SSR 安全：katex.renderToString 是纯字符串渲染、不依赖 window/DOM，可在渲染期（含 SSR）直接跑；
 * 本组件仅被 ssr:false 的复习卡片树用到，运行在 client。
 *
 * 安全：dangerouslySetInnerHTML 只用于注入 KaTeX 自身生成的 HTML，输入来自仓库内可信题库
 * （编译进包的常量），非用户输入；KaTeX 以 throwOnError:false 容错，坏公式降级为红色源码文本而非抛错。
 */

/** 同时匹配「行内代码 `...`」与「行内数学 $...$」；分别捕获到组 1 / 组 2。 */
const TOKEN_RE = /`([^`]+)`|\$([^$]+)\$/g;

type RichTextProps = {
  text: string;
};

export function RichText({ text }: RichTextProps) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(TOKEN_RE)) {
    const start = match.index ?? 0;

    // 标记之前的纯文本原样输出（\n 由外层 whitespace-pre-line 折行）。
    if (start > lastIndex) {
      nodes.push(
        <Fragment key={key++}>{text.slice(lastIndex, start)}</Fragment>,
      );
    }

    const code = match[1];
    const math = match[2];

    if (code !== undefined) {
      // 行内代码：复刻 globals.css `.prose :not(pre) > code` 的 token（/review 不在 .prose 下，
      // 故用 Tailwind token 类直接还原：等宽 / --code-bg 轻底 / 控件圆角，无裸 hex）。
      nodes.push(
        <code
          key={key++}
          className="rounded-control bg-code px-1.5 py-0.5 font-mono text-[0.875em] text-primary"
        >
          {code}
        </code>,
      );
    } else if (math !== undefined) {
      const html = katex.renderToString(math, {
        throwOnError: false,
        displayMode: false,
      });
      nodes.push(
        <span key={key++} dangerouslySetInnerHTML={{ __html: html }} />,
      );
    }

    lastIndex = start + match[0].length;
  }

  // 收尾：最后一个标记之后的纯文本。
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{nodes}</>;
}
