/**
 * <CqrCategoryMap>：辅图——「代码质量与重构全书 10 章分类全景图」。
 *
 * 三列布局：
 *  左列「代码质量入门」（紫 accent）：学习地图、整洁代码
 *  中列「整洁代码」（绿 success）：命名、函数、注释与格式、错误处理、测试、类
 *  右列「重构手法」（黄 warning）：代码异味、重构手法、总复习
 *
 * 每章用圆角矩形表示，用不同颜色区分三大类。
 *
 * 视觉：全部 DESIGN token；无裸 hex；无 shadow。
 * Server component（无 "use client"）。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const COL_W = 200;
const CARD_H = 48;
const CARD_GAP = 8;
const CARD_START_Y = 108;

const COL1_X = 40;
const COL2_X = 260;
const COL3_X = 480;

interface ChapterCard {
  num: string;
  title: string;
  desc: string;
}

const col1: ChapterCard[] = [
  { num: "Ch 1", title: "学习地图", desc: "全书导航与路线" },
  { num: "Ch 2", title: "整洁代码", desc: "价值与核心原则" },
];

const col2: ChapterCard[] = [
  { num: "Ch 3", title: "命名", desc: "名副其实" },
  { num: "Ch 4", title: "函数", desc: "短小纯粹" },
  { num: "Ch 5", title: "注释与格式", desc: "解释为什么" },
  { num: "Ch 6", title: "错误处理", desc: "优雅地失败" },
  { num: "Ch 7", title: "测试", desc: "三 A 法则" },
  { num: "Ch 8", title: "类", desc: "高内聚低耦合" },
];

const col3: ChapterCard[] = [
  { num: "Ch 9", title: "代码异味", desc: "识别坏味道" },
  { num: "Ch 10", title: "重构手法", desc: "安全小步" },
  { num: "总复习", title: "综合实战", desc: "融会贯通" },
];

function cardY(index: number): number {
  return CARD_START_Y + index * (CARD_H + CARD_GAP);
}

export function CqrCategoryMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="代码质量与重构全书 10 章分类全景图。三列布局：左列代码质量入门（紫色），包含学习地图和整洁代码两章；中列整洁代码（绿色），包含命名、函数、注释与格式、错误处理、测试、类六章；右列重构手法（黄色），包含代码异味、重构手法、总复习三章。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            代码质量与重构：10 章分类全景
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            入门 → 整洁代码 → 重构手法，循序渐进
          </text>

          {/* 列标题 */}
          <text x={COL1_X + COL_W / 2} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">
            代码质量入门
          </text>
          <text x={COL2_X + COL_W / 2} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">
            整洁代码
          </text>
          <text x={COL3_X + COL_W / 2} y={88} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">
            重构手法
          </text>

          {/* 列1 卡片 —— 代码质量入门 */}
          {col1.map((ch, i) => (
            <g key={`col1-${i}`}>
              <rect
                x={COL1_X}
                y={cardY(i)}
                width={COL_W}
                height={CARD_H}
                rx="8"
                fill="var(--accent)"
                fillOpacity="0.1"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              <text x={COL1_X + 12} y={cardY(i) + 22} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {ch.title}
              </text>
              <text x={COL1_X + COL_W - 12} y={cardY(i) + 22} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--accent)">
                {ch.num}
              </text>
              <text x={COL1_X + 12} y={cardY(i) + 39} fontSize="11" fill="var(--text-secondary)">
                {ch.desc}
              </text>
            </g>
          ))}

          {/* 列2 卡片 —— 整洁代码 */}
          {col2.map((ch, i) => (
            <g key={`col2-${i}`}>
              <rect
                x={COL2_X}
                y={cardY(i)}
                width={COL_W}
                height={CARD_H}
                rx="8"
                fill="var(--success)"
                fillOpacity="0.08"
                stroke="var(--success)"
                strokeWidth="1.5"
              />
              <text x={COL2_X + 12} y={cardY(i) + 22} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {ch.title}
              </text>
              <text x={COL2_X + COL_W - 12} y={cardY(i) + 22} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--success)">
                {ch.num}
              </text>
              <text x={COL2_X + 12} y={cardY(i) + 39} fontSize="11" fill="var(--text-secondary)">
                {ch.desc}
              </text>
            </g>
          ))}

          {/* 列3 卡片 —— 重构手法 */}
          {col3.map((ch, i) => (
            <g key={`col3-${i}`}>
              <rect
                x={COL3_X}
                y={cardY(i)}
                width={COL_W}
                height={CARD_H}
                rx="8"
                fill="var(--warning)"
                fillOpacity="0.08"
                stroke="var(--warning)"
                strokeWidth="1.5"
              />
              <text x={COL3_X + 12} y={cardY(i) + 22} fontSize="13" fontWeight="600" fill="var(--text-primary)">
                {ch.title}
              </text>
              <text x={COL3_X + COL_W - 12} y={cardY(i) + 22} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--warning)">
                {ch.num}
              </text>
              <text x={COL3_X + 12} y={cardY(i) + 39} fontSize="11" fill="var(--text-secondary)">
                {ch.desc}
              </text>
            </g>
          ))}

          {/* 底部总结 */}
          <line x1={40} y1={452} x2={VIEW_W - 40} y2={452} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={476} textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">
            先建立质量意识 → 写出整洁代码 → 学会安全重构
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书分为三大板块：代码质量入门建立意识，整洁代码讲授命名、函数、注释、错误处理、测试与类的具体规范，
        重构手法教你识别代码异味并用安全小步的手法改善设计。
      </figcaption>
    </figure>
  );
}
