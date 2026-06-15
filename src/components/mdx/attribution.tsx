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

const CN_BASE = "https://learnopengl-cn.github.io/";
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

export function Attribution({
  sourceUrl,
  adaptedFrom,
  adaptedUrl,
}: {
  sourceUrl: string;
  adaptedFrom?: string;
  adaptedUrl?: string;
}) {
  const cnUrl = sourceUrl?.trim();
  // 非 LearnOpenGL 改编源（如 Unity 文档）：显示改编声明
  if (!cnUrl && adaptedFrom && adaptedUrl) {
    return (
      <footer
        aria-label="改编声明"
        className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
      >
        <p className="mb-2 font-semibold text-primary">改编声明</p>
        <p>
          本文为改编重写，改编自{" "}
          <a href={adaptedUrl} target="_blank" rel="noopener noreferrer nofollow">
            {adaptedFrom}
          </a>
          。
        </p>
        <p className="mt-2">
          本改编版为教学目的进行重述与补充，不声称替代阅读原作。原文版权归原作者所有。
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
