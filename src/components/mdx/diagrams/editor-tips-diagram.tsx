/**
 * <EditorTipsDiagram>：Unity Editor 快捷键与工作流效率示意图。
 *
 * 展示四组核心操作：播放控制、场景导航、全局搜索、Layout 保存——每组配快捷方式提示。
 * 用四列卡片布局，底部总结"肌肉记忆 = 生产力"。
 */

export function EditorTipsDiagram() {
  const groups = [
    {
      title: "播放控制",
      icon: "▶",
      tips: [
        { key: "Ctrl/⌘ P", desc: "Play / Stop" },
        { key: "Ctrl/⌘ Shift P", desc: "Pause / Resume" },
        { key: "Ctrl/⌘ Alt P", desc: "逐帧步进" },
      ],
    },
    {
      title: "场景导航",
      icon: "👁",
      tips: [
        { key: "F", desc: "聚焦选中物体" },
        { key: "右键 + 滚轮", desc: "Perspective/Iso 切换" },
        { key: "Ctrl/⌘ Tab", desc: "Scene ↔ Game 切换" },
      ],
    },
    {
      title: "全局搜索",
      icon: "🔍",
      tips: [
        { key: "Ctrl/⌘ K", desc: "Search 万能搜索" },
        { key: "Ctrl/⌘ T", desc: "Project 资源搜索" },
        { key: "Ctrl/⌘ F (Hierarchy)", desc: "场景物体搜索" },
      ],
    },
    {
      title: "工作区",
      icon: "💾",
      tips: [
        { key: "Save Layout", desc: "存调试/编码布局" },
        { key: "Maximize on Play", desc: "运行时自动最大化" },
        { key: "Playmode Tint", desc: "染色标识运行态" },
      ],
    },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div
              key={g.title}
              className="rounded-md border border-border bg-bg p-3"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">{g.icon}</span>
                <span className="text-sm font-semibold text-accent">
                  {g.title}
                </span>
              </div>
              <ul className="space-y-1.5">
                {g.tips.map((t) => (
                  <li key={t.key} className="text-xs leading-relaxed">
                    <code className="rounded bg-bg-elevated px-1 py-0.5 text-[11px] font-medium text-accent">
                      {t.key}
                    </code>
                    <span className="ml-1.5 text-secondary">{t.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-secondary">
          四组快捷键覆盖 90% 的日常操作——把菜单栏从工作流中淘汰。
        </p>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Unity Editor 核心快捷键速览：播放控制、场景导航、全局搜索、工作区管理。
      </figcaption>
    </figure>
  );
}
