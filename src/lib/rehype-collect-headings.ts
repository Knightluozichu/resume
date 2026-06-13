import GithubSlugger from "github-slugger";
import type { Element, Root, Text } from "hast";
import { visit } from "unist-util-visit";

/**
 * 本页 TOC 的一个标题项（h2/h3）。可序列化，供右栏 client 组件渲染 + 滚动高亮。
 */
export interface TocHeading {
  /** 2 = h2 | 3 = h3 */
  depth: 2 | 3;
  /** 纯文本（去标签）*/
  text: string;
  /** 锚点 id（与 rehype-slug 给 <h2 id> 写入的一致） */
  id: string;
}

/**
 * rehype 插件（HEL-21）：从「正文 markdown 直接产生」的 h2/h3 收集 TOC。
 *
 * 关键约束：**排除自定义组件容器内部的标题**。HEL-20 的 <Objectives>/<Exercises>
 * 等组件在 React 端硬编码了「学习目标」「练习」这类 h2，它们根本不在 MDX 源里，
 * 故不会出现在本 AST——天然被排除。但作者也可能在 MDX 里把 `## 小节` 写进
 * <Callout>/<CodeTabs> 等组件标签内部；这类标题在 rehype 阶段是某个
 * `mdxJsxFlowElement` 的后代节点。本插件只采集**文档根直系**（不被任何
 * mdxJsxFlowElement 包裹）的 h2/h3，从而把组件内标题一并排除。
 *
 * 同时给采集到的标题写 id（与 rehype-slug 算法一致，用同一 GithubSlugger），
 * 不依赖插件顺序：即便本插件先于 rehype-slug 运行，id 也已正确写入；rehype-slug
 * 见到已存在 id 不会覆盖。slugger 实例每次编译新建，保证同名标题去重计数从 0 起。
 *
 * 用法：作为 factory 传入 rehypePlugins，把外部传入的 headings 数组就地填充。
 */
export function rehypeCollectHeadings(headings: TocHeading[]) {
  return (tree: Root) => {
    const slugger = new GithubSlugger();

    visit(tree, "element", (node: Element, _index, parent) => {
      const tag = node.tagName;
      if (tag !== "h2" && tag !== "h3") return;

      // 仅采集文档根直系标题：父节点必须是 root（被任何自定义组件
      // mdxJsxFlowElement 包裹的标题，其 parent 不是 root，跳过）。
      if (!parent || parent.type !== "root") return;

      const text = toText(node).trim();
      if (!text) return;

      const props = (node.properties ??= {});
      // 与 rehype-slug 行为一致：尊重作者已写的 id，否则按文本 slug 生成
      let id = typeof props.id === "string" ? props.id : "";
      if (!id) {
        id = slugger.slug(text);
        props.id = id;
      } else {
        // 让 slugger 记录已占用的 id，避免后续重复
        slugger.slug(id);
      }

      headings.push({ depth: tag === "h2" ? 2 : 3, text, id });
    });
  };
}

/** 取 element 的可见纯文本（递归拼接 Text 节点） */
function toText(node: Element): string {
  let out = "";
  visit(node, "text", (t: Text) => {
    out += t.value;
  });
  return out;
}
