"use client";

import {
  Children,
  isValidElement,
  useId,
  useState,
  type ReactNode,
} from "react";

import { termSlug } from "@/lib/term-slug";

/**
 * 从 children 递归提取术语纯文本：拼接所有字符串/数字叶子并规整空白。
 * 必须递归的原因——prettier 会把行内 <Term> 重排成块级（术语文本前后留空行），
 * MDX 随即把内部文本当段落包进 <p>，于是 children 是一个 <p> 元素而非字符串。
 * 只看顶层会拿到空串导致锚点为空，故须下钻到元素的 props.children 取文本。
 */
function extractText(node: ReactNode): string {
  let out = "";
  Children.forEach(node, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      out += child;
    } else if (isValidElement(child)) {
      out += extractText((child.props as { children?: ReactNode }).children);
    }
  });
  return out.replace(/\s+/g, " ").trim();
}

/**
 * <Term def="一句话释义" id?>术语</Term>：正文行内术语高亮 + 悬浮/聚焦即懂的 tooltip
 * （chapter-spec §三 术语首现）。每个高亮术语同时在章末 <Glossary> 有对应词条（§十）。
 *
 * 为何 client：tooltip 显隐是真交互（hover / focus / 触摸点击切换 / Esc 关闭），
 * 符合「client 只用在真需交互处」。它是叶子壳，不会把整页变 client。
 *
 * 无障碍：
 *  - 高亮文本是 <button>（可 Tab 聚焦、键盘可达），aria-describedby 关联 tooltip
 *  - tooltip role="tooltip"，hover 与 focus 都显示；Esc 关闭；再次点击/失焦收起
 *  - cursor-help 提示「悬浮看释义」
 *
 * 锚点：点术语跳到章末对应 Glossary 词条（按术语文本 termSlug 或显式 id 关联）。
 *  - 单击切换 tooltip；术语左侧另给一个小「↡」锚链接负责跳转，避免点高亮即跳走。
 *
 * tooltip 定位：绝对定位贴术语下方（居中），溢出靠 max-width + 自动换行兜住；
 * 不引 floating 库（DESIGN「简单稳妥」）。reduced-motion 下淡入动画自动降为瞬时
 * （--duration-hover 在 globals.css 已对 reduced-motion 置 0，这里只动 opacity）。
 *
 * 颜色/间距/圆角/动效全部走 DESIGN token（硬规则 5）。
 */
export function Term({
  def,
  id,
  children,
}: {
  /** 一句话释义（tooltip 内容） */
  def: string;
  /** 可选：显式锚点 id（默认按术语文本 termSlug 生成，与 GlossaryItem 对齐） */
  id?: string;
  /** 高亮的术语文本 */
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  // 锚点目标：显式 id 优先（GlossaryItem 同样接受 id 覆盖），否则按术语文本生成。
  // 术语文本从 children 递归提取——prettier 多行重排后 children 含空白，不能只判 string。
  const termText = extractText(children);
  const anchor = id ?? termSlug(termText);

  return (
    <span className="mdx-term relative inline-block">
      <button
        type="button"
        aria-describedby={open ? tipId : undefined}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        // 行内高亮：accent 虚线下划线 + cursor-help，不撑行高（baseline 对齐、无 padding）
        className="cursor-help border-0 bg-transparent p-0 font-[inherit] text-accent underline decoration-accent decoration-dashed underline-offset-4 transition-colors duration-(--duration-hover) ease-standard hover:text-primary"
      >
        {children}
      </button>

      {/* 章末词条锚链接：小箭头，跳到 Glossary 对应词条 */}
      <a
        href={`#${anchor}`}
        aria-label={`跳到名词解释：${termText}`}
        className="ml-0.5 align-super text-[0.7em] text-secondary no-underline transition-colors duration-(--duration-hover) ease-standard hover:text-accent"
      >
        ↡
      </a>

      {/* tooltip：贴术语下方居中，hover/focus 显示；只动 opacity（reduced-motion 安全） */}
      <span
        id={tipId}
        role="tooltip"
        hidden={!open}
        className="absolute top-full left-1/2 z-10 mt-2 w-max max-w-xs -translate-x-1/2 rounded-control border border-border bg-elevated px-3 py-2 text-xs leading-relaxed whitespace-normal text-primary"
      >
        {def}
      </span>
    </span>
  );
}
