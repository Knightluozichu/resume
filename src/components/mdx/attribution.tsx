/**
 * <Attribution sourceUrl={...}>：CC BY-NC 4.0 出处声明（chapter-spec §九，硬规则 4）。
 *
 * Server Component。固定四要素、统一渲染、禁手写变体：
 *  1. learnopengl.com 原文链接
 *  2. learnopengl-cn.github.io 中文译版链接
 *  3. 「CC BY-NC 4.0」声明
 *  4. 「本文为改编重写」声明
 *
 * sourceUrl 来自章节 frontmatter，指向 learnopengl-cn.github.io 对应译文页（中文译版要素）。
 * 原文链接由译版 URL 的章节路径映射回 learnopengl.com 同名页；映射失败时回退到站点首页，
 * 保证「原文链接」要素始终存在（绝不缺要素）。
 *
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）。
 */

const EN_HOME = "https://learnopengl.com/";
const LICENSE_NAME = "CC BY-NC 4.0";
const LICENSE_URL = "https://creativecommons.org/licenses/by-nc/4.0/";

/**
 * 由中文译版 URL 推导 learnopengl.com 原文 URL。
 * CN 站路径形如 /01 Getting started/04 Hello Triangle/，去掉序号前缀后即原站 /Getting-started/Hello-Triangle/。
 * 任何解析异常都回退到 EN_HOME，保证「原文链接」要素不缺失。
 */
function toEnglishUrl(sourceUrl: string): string {
  try {
    const u = new URL(sourceUrl);
    const segments = decodeURIComponent(u.pathname)
      .split("/")
      .filter(Boolean)
      // 去掉「01 」「04 」这类序号前缀
      .map((s) => s.replace(/^\d+\s+/, "").trim())
      // 空格转连字符（learnopengl.com 路径用连字符）
      .map((s) => s.replace(/\s+/g, "-"));
    if (segments.length === 0) return EN_HOME;
    return EN_HOME + segments.join("/");
  } catch {
    return EN_HOME;
  }
}

export interface AttributionProps {
  sourceUrl?: string;
  /** 非 LearnOpenGL 改编：书名或出处标题 */
  adaptedFrom?: string;
  /** 原作链接（如 Packt 图书页） */
  adaptedUrl?: string;
}

export function Attribution({
  sourceUrl = "",
  adaptedFrom,
  adaptedUrl,
}: AttributionProps) {
  const cnUrl = sourceUrl?.trim();

  if (adaptedFrom?.trim()) {
    const title = adaptedFrom.trim();
    const url = adaptedUrl?.trim();
    return (
      <footer
        aria-label="出处声明"
        className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
      >
        <p className="mb-2 font-semibold text-primary">出处声明</p>
        <p>
          本文为改编重写，参考{" "}
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer nofollow">
              {title}
            </a>
          ) : (
            title
          )}
          。教学结构与表述经 remuse 重写，非逐字翻译。
        </p>
        <p className="mt-2">
          原作版权归原出版社及作者所有；本站改编内容仅供学习交流，请勿用于商业用途。
        </p>
      </footer>
    );
  }

  // 原创内容（无出处 URL）：显示通用原创声明
  if (!cnUrl) {
    return (
      <footer
        aria-label="原创声明"
        className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
      >
        <p className="mb-2 font-semibold text-primary">原创声明</p>
        <p>本章为 remuse 原创教学内容，未改编自外部来源。</p>
      </footer>
    );
  }
  const enUrl = toEnglishUrl(cnUrl);

  return (
    <footer
      aria-label="出处声明"
      className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
    >
      <p className="mb-2 font-semibold text-primary">出处声明</p>
      <p>
        本文为改编重写，改编自 LearnOpenGL。原文：
        <a href={enUrl} target="_blank" rel="noopener noreferrer nofollow">
          learnopengl.com
        </a>
        ；中文译版：
        <a href={cnUrl} target="_blank" rel="noopener noreferrer nofollow">
          learnopengl-cn.github.io
        </a>
        。
      </p>
      <p className="mt-2">
        原作及译作以{" "}
        <a
          href={LICENSE_URL}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {LICENSE_NAME}
        </a>{" "}
        协议授权，本改编版同样遵循该协议（署名—非商业性使用）。
      </p>
    </footer>
  );
}
