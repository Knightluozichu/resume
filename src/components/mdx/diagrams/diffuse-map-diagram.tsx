/**
 * <DiffuseMapDiagram>：「光照贴图」§3「漫反射贴图」小节核心掰碎图（HEL-53，C 实战型）。
 *
 * 把「常量漫反射色 → 逐片段从贴图采样」这件事画清楚，左右两栏对照：
 *  ①左栏「材质章的做法」：material.diffuse 是一个常量 vec3，整块物体共用同一个底色，
 *    于是木箱不管哪个部位都是同一种颜色——画成一整块纯色方块。
 *  ②右栏「本章的做法」：material.diffuse 换成一张漫反射贴图（sampler2D），每个片段拿自己的
 *    UV 去图里采样，于是不同部位有各自的底色（木纹 / 铁边各不相同）——画成带纹样的方块。
 *  中间一条紫箭头标「texture(material.diffuse, TexCoords).rgb 逐片段取色」。
 *
 * 一句话语义：漫反射贴图就是把「整块一个色」升级成「每个片段从图里查自己的色」。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--border/--bg/--bg-elevated/
 * --text-primary/--text-secondary），无阴影、rx 圆角（硬规则 5）。贴图用矢量「示意纹样」
 * （木纹竖条 + 一圈铁边）纯示意，呼应「木箱」例子。
 */

export function DiffuseMapDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 660 330"
          role="img"
          aria-label="漫反射贴图的作用，分两栏对照。左栏「常量做法」：材质的漫反射色是一个固定的 vec3 颜色，整块物体共用同一个底色，画成一整块纯色方块。右栏「贴图做法」：把漫反射色换成一张漫反射贴图，每个片段用自己的纹理坐标去图里采样，于是不同部位有各自的底色，比如木箱的木头部分是木纹色、钢边部分是另一种色，画成带纹样的方块。中间箭头表示用 texture 函数按纹理坐标逐片段取色。结论：漫反射贴图把整块一个色升级成每个片段从图里查自己的色。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          <defs>
            {/* 木纹竖条纹样：示意漫反射贴图里「木头部分」的纹理 */}
            <pattern
              id="diffuse-wood"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <rect width="16" height="16" fill="var(--bg)" />
              <rect width="5" height="16" fill="var(--border)" />
              <rect x="9" width="2" height="16" fill="var(--border)" />
            </pattern>
          </defs>

          {/* ============ 左栏：常量 vec3 → 整块一个色 ============ */}
          <text
            x="165"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            材质章：常量 diffuse
          </text>

          {/* 一整块纯色方块（accent 浅填，示意整块共用一个底色） */}
          <rect
            x="75"
            y="60"
            width="180"
            height="180"
            fill="var(--accent)"
            opacity="0.30"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="165"
            y="156"
            textAnchor="middle"
            fontSize="12"
            fill="var(--text-primary)"
          >
            整块同一个底色
          </text>

          <text
            x="165"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            vec3 diffuse
          </text>
          <text
            x="165"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            一个固定颜色，到处一样
          </text>

          {/* ============ 中：texture() 逐片段取色 ============ */}
          <line
            x1="270"
            y1="150"
            x2="386"
            y2="150"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
          <path d="M386 150 l-12 -6 l0 12 z" fill="var(--accent)" />
          <text
            x="328"
            y="132"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            换成贴图
          </text>
          <text
            x="328"
            y="172"
            textAnchor="middle"
            fontSize="10"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            texture(.., uv)
          </text>

          {/* ============ 右栏：sampler2D → 逐片段从图采样 ============ */}
          <text
            x="500"
            y="30"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            本章：漫反射贴图
          </text>

          {/* 带纹样的方块：中央木纹区 + 四周一圈「铁边」（accent 描边示意另一种材质） */}
          <rect
            x="410"
            y="60"
            width="180"
            height="180"
            fill="url(#diffuse-wood)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {/* 一圈铁边：用 accent 粗描边的内框示意「钢边部分是另一种底色」 */}
          <rect
            x="410"
            y="60"
            width="180"
            height="180"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="10"
            opacity="0.55"
          />
          <text
            x="500"
            y="150"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-primary)"
          >
            木纹部位
          </text>
          <text
            x="500"
            y="78"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            铁边部位
          </text>

          <text
            x="500"
            y="266"
            textAnchor="middle"
            fontSize="12"
            fontFamily="monospace"
            fill="var(--text-secondary)"
          >
            sampler2D diffuse
          </text>
          <text
            x="500"
            y="290"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            每个片段查自己的色
          </text>

          {/* —— 底部一句话总括 —— */}
          <text
            x="330"
            y="320"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            漫反射贴图 = 把「整块一个底色」升级成「每个片段从图里查自己的底色」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        漫反射贴图把材质里那个常量的漫反射色，换成一张图：每个片段拿自己的 UV
        去图里采样取色（<code>texture(material.diffuse, TexCoords).rgb</code>
        ），于是木箱的木头部位、钢边部位能有各自的底色，不再整块一个颜色。
      </figcaption>
    </figure>
  );
}
