/**
 * 术语锚点 slug：把术语文本（中英混排）转成稳定 id，供 <Term> 跳转锚点与
 * <GlossaryItem> 词条 id 共用——两侧用同一纯函数算，保证一一对齐、无共享状态。
 *
 * 为何不用 github-slugger：那是有状态的去重计数器（同名标题加 -1/-2），用于正文标题；
 * 术语—词条是显式的「文本→唯一锚」映射，需要的是确定性纯函数，同一术语永远同一 id。
 *
 * 规则：小写 → 去首尾空白 → 空白/下划线转连字符 → 仅保留中日韩、字母数字、连字符
 * （中文术语如「光栅化」直接保留为锚，浏览器锚点支持非 ASCII）→ 合并连字符。
 * 前缀 term- 隔离命名空间，避免与正文标题 slug 撞 id。
 */
export function termSlug(term: string): string {
  const body = term
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    // 保留 中日韩统一表意文字 / 拉丁字母 / 数字 / 连字符，其余丢弃
    .replace(/[^一-龥a-z0-9-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `term-${body}`;
}
