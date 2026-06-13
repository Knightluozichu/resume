"use client";

import { useEffect, useState } from "react";

import { type TocHeading } from "@/lib/rehype-collect-headings";

/**
 * 右栏「本页目录」（client 组件，HEL-21）。
 *
 * headings 由 page 在编译期经 rehypeCollectHeadings 从正文 h2/h3 提取
 * （已排除自定义组件内部标题），作为可序列化 props 传入。本组件只做两件需 client 的事：
 *  1. 锚点点击平滑跳转（靠 <a href="#id">，CSS scroll-margin-top 让标题避开 sticky 顶栏）
 *  2. 滚动高亮当前节（IntersectionObserver 观察各标题，取最靠上的可见标题为 active）
 *
 * lg 以下隐藏（沿用布局断点，由父容器控制）。
 * 颜色/间距/动效全部走 DESIGN token（硬规则 5）。
 */
export function PageToc({ headings }: { headings: TocHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    // 记录每个标题当前是否在视口命中区内；每次变化后取「文档顺序最靠前的命中项」为 active。
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const firstActive = headings.find((h) => visible.get(h.id));
        if (firstActive) setActiveId(firstActive.id);
      },
      // 顶部留出与 sticky 顶栏(top-12=48px)相当的盲区，命中区集中在视口上半部分，
      // 让「正在读的那节」而非刚滚出顶部的节被高亮。
      { rootMargin: "-48px 0px -66% 0px", threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="本页目录">
      <h2 className="px-2 text-xs font-medium text-secondary">本页目录</h2>
      <ul className="mt-2 flex flex-col gap-1 text-xs">
        {headings.map((h) => {
          const active = activeId === h.id;
          return (
            <li key={h.id} className={h.depth === 3 ? "pl-3" : undefined}>
              <a
                href={`#${h.id}`}
                aria-current={active ? "location" : undefined}
                className={`block rounded-control px-2 py-1 transition-colors duration-(--duration-hover) ease-standard ${
                  active ? "text-accent" : "text-secondary hover:text-primary"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
