/**
 * <ShaderDemo>：M4 桥接占位（chapter-spec §五 交互 Demo）。
 *
 * !!! 本组件是占位壳，禁止 import three / @react-three/*（硬规则 6：three 必须可 code-split，
 * 禁止进公共/教程渲染路径）。当前只渲染 DESIGN 「交互 Demo 容器」气质的卡片，
 * 内显「交互演示即将上线（M4）」。
 *
 * 卡片气质（DESIGN.md §组件气质速查 / §间距与布局）：
 *  - --bg-elevated 底 + 1px border + 12px 圆角（rounded-card）
 *  - 左上角「⚡ 交互 Demo」标签（accent 小面积）
 *
 * 接受 vert/frag/uniforms 等 props 以便 .mdx 现在就能按最终 API 书写，占位期忽略其值。
 *
 * ========================== M4 替换点 ==========================
 * M4 实装时，把本文件替换为：用 next/dynamic + ssr:false 懒加载真正的
 * <ShaderCanvas>（WebGL/R3F），保留同名 props（vert/frag/uniforms），
 * 并补齐：猜一猜引导留白、uniform 控件（≤5）、重置按钮、骨架屏、WebGL2 兜底。
 * three 相关 import 只允许出现在被懒加载的子模块里，不得进入本占位/公共 layout。
 * =============================================================
 */
export function ShaderDemo({
  vert: _vert,
  frag: _frag,
  uniforms: _uniforms,
}: {
  vert?: string;
  frag?: string;
  uniforms?: Record<string, unknown>;
}) {
  return (
    <div className="mdx-shader-demo my-6 rounded-card border border-border bg-elevated p-6">
      {/* 左上角「⚡ 交互 Demo」标签：accent 小面积 */}
      <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
        <span aria-hidden="true">⚡</span>
        交互 Demo
      </span>
      <div className="flex min-h-40 items-center justify-center text-center">
        <p className="text-sm text-secondary">交互演示即将上线（M4）</p>
      </div>
    </div>
  );
}
