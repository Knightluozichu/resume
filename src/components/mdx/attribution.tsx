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
  /** 授权改编所依据的许可证名称。 */
  licenseName?: string;
  /** 许可证全文或摘要链接。 */
  licenseUrl?: string;
  /** v2 来源模式；旧章不传时按 URL 保守推断。 */
  mode?: "licensed-adaptation" | "independent-rewrite" | "original";
  /** independent-rewrite 模式下显示的参考书名。 */
  workTitle?: string;
  /** v2 独立重写实际使用的来源层级。 */
  sourceBasis?: "full-text" | "authorized-sample" | "outline-only";
}

export function Attribution({
  sourceUrl = "",
  adaptedFrom,
  adaptedUrl,
  licenseName,
  licenseUrl,
  mode,
  workTitle,
  sourceBasis = "outline-only",
}: AttributionProps) {
  const cnUrl = sourceUrl?.trim();

  const sourceHost = (() => {
    if (!cnUrl) return false;
    try {
      return new URL(cnUrl).hostname;
    } catch {
      return false;
    }
  })();
  const isLearnOpenGL =
    sourceHost === "learnopengl.com" ||
    sourceHost === "learnopengl-cn.github.io";
  const isOfficialEnglish = sourceHost === "learnopengl.com";
  const resolvedMode =
    mode ??
    (adaptedFrom?.trim() || (cnUrl && !isLearnOpenGL)
      ? "independent-rewrite"
      : isLearnOpenGL
        ? "licensed-adaptation"
        : "original");

  if (resolvedMode === "independent-rewrite") {
    const title =
      adaptedFrom?.trim() || workTitle?.trim() || "本章所列参考资料";
    const url = adaptedUrl?.trim() || cnUrl;
    const basisText =
      sourceBasis === "full-text"
        ? "公开完整正文核定章节范围、事实坐标与时代语境"
        : sourceBasis === "authorized-sample"
          ? "合法公开试读核定可见范围，并以目录限定未公开部分"
          : "权威目录界定学习范围";
    return (
      <footer
        aria-label="资料与写作方式声明"
        className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
      >
        <p className="mb-2 font-semibold text-primary">资料与写作方式声明</p>
        <p>
          本章以
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer nofollow">
              {title}
            </a>
          ) : (
            title
          )}
          的{basisText}
          ，并结合正文列出的技术资料独立重写；不宣称复现原书正文，也不沿用原作表述。
        </p>
        <p className="mt-2">
          原作版权归作者与出版社所有；本站原创教学结构与表述仅供学习交流。
        </p>
      </footer>
    );
  }

  if (resolvedMode === "original") {
    return (
      <footer
        aria-label="原创声明"
        className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
      >
        <p className="mb-2 font-semibold text-primary">原创声明</p>
        <p>
          本章为 remuse 原创教学内容；引用资料均在正文或参考链接中单独标明。
        </p>
      </footer>
    );
  }

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
          {licenseName ? (
            <>
              本改编遵循{" "}
              {licenseUrl ? (
                <a
                  href={licenseUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  {licenseName}
                </a>
              ) : (
                licenseName
              )}
              ；已标注来源与改动，且仅供非商业学习交流。
            </>
          ) : (
            "原作版权归原出版社及作者所有；本站改编内容仅供学习交流，请勿用于商业用途。"
          )}
        </p>
      </footer>
    );
  }

  // 兼容旧的 licensed-adaptation 数据：无 URL 时不能伪造授权来源。
  if (!cnUrl) {
    return (
      <footer
        aria-label="原创声明"
        className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
      >
        <p className="mb-2 font-semibold text-primary">原创声明</p>
        <p>本章缺少可核查的授权来源，不能按授权改编内容发布。</p>
      </footer>
    );
  }
  const enUrl = isOfficialEnglish ? cnUrl : toEnglishUrl(cnUrl);

  return (
    <footer
      aria-label="出处声明"
      className="mdx-attribution my-8 rounded-card border border-border bg-elevated p-6 text-xs text-secondary"
    >
      <p className="mb-2 font-semibold text-primary">出处声明</p>
      <p>
        本文为改编重写，改编自 Joey de Vries 的 LearnOpenGL。原文：
        <a href={enUrl} target="_blank" rel="noopener noreferrer nofollow">
          learnopengl.com
        </a>
        {isOfficialEnglish ? null : (
          <>
            ；中文译版：
            <a href={cnUrl} target="_blank" rel="noopener noreferrer nofollow">
              learnopengl-cn.github.io
            </a>
          </>
        )}
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
