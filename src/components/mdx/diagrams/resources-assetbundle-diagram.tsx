/**
 * <ResourcesAssetBundleDiagram>：Resources 文件夹陷阱 vs AssetBundle 按需加载。
 */

type ResourcesMode = "resources" | "assetbundle" | "compare";

export function ResourcesAssetBundleDiagram({
  mode = "compare",
}: {
  mode?: ResourcesMode;
}) {
  const showResources = mode === "resources" || mode === "compare";
  const showBundle = mode === "assetbundle" || mode === "compare";

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 280"
          role="img"
          aria-label="Resources 文件夹在构建时全部打进包内且启动时索引，无法卸载；AssetBundle 按包按需加载与卸载"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Resources vs AssetBundle
          </text>

          {showResources && (
            <g>
              <text
                x="160"
                y="56"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                Resources/
              </text>
              <rect
                x="40"
                y="68"
                width="240"
                height="100"
                rx="8"
                fill="var(--bg)"
                stroke="var(--danger)"
                strokeWidth="1.5"
              />
              <text
                x="160"
                y="92"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                构建期：全部打进 Player
              </text>
              <text
                x="160"
                y="112"
                textAnchor="middle"
                fontSize="10"
                fill="var(--danger)"
              >
                启动时：生成资源索引表
              </text>
              <text
                x="160"
                y="132"
                textAnchor="middle"
                fontSize="10"
                fill="var(--danger)"
              >
                Resources.Load → 无法卸载
              </text>
              <text
                x="160"
                y="152"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                包体↑ 启动内存↑ 隐藏依赖难查
              </text>
            </g>
          )}

          {showBundle && (
            <g>
              <text
                x="480"
                y="56"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                AssetBundle
              </text>
              <rect
                x="360"
                y="68"
                width="240"
                height="100"
                rx="8"
                fill="var(--bg-elevated)"
                stroke="var(--success)"
                strokeWidth="2"
              />
              <text
                x="480"
                y="92"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                构建期：按包输出 .bundle
              </text>
              <text
                x="480"
                y="112"
                textAnchor="middle"
                fontSize="10"
                fill="var(--success)"
              >
                运行时：LoadFromFileAsync
              </text>
              <text
                x="480"
                y="132"
                textAnchor="middle"
                fontSize="10"
                fill="var(--success)"
              >
                Unload(false/true) 可释放
              </text>
              <text
                x="480"
                y="152"
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-secondary)"
              >
                按需下载 · 热更 · 内存可控
              </text>
            </g>
          )}

          {mode === "compare" && (
            <path
              d="M300 118 l40 0"
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#arrow-rab)"
            />
          )}

          <defs>
            <marker
              id="arrow-rab"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* Trap callouts */}
          <rect
            x="48"
            y="188"
            width="544"
            height="72"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
          />
          <text
            x="320"
            y="212"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Resources 三大陷阱
          </text>
          <text
            x="320"
            y="232"
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            ① 文件夹越大启动越慢 ② 字符串路径无编译期检查 ③ 卸载不了 → 内存只涨不降
          </text>
          <text
            x="320"
            y="252"
            textAnchor="middle"
            fontSize="10"
            fill="var(--accent)"
          >
            现代项目：Addressables 或 AssetBundle；Resources 仅极少量启动必需资源
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Resources 全量进包且无法卸载；AssetBundle（或 Addressables）支持按需加载、依赖管理与释放。
      </figcaption>
    </figure>
  );
}
