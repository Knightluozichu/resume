import type { ReactNode } from "react";

/** Ch11 四张模式图共用：固定 720 画布 + 移动端横向滚动，避免手机把 SVG 硬缩到不可读。 */
export const PATTERN_DIAGRAM_VIEW_W = 720;

/** DESIGN.md：卡片圆角 12px、控件圆角 8px。 */
export const PATTERN_RADIUS_CARD = 12;
export const PATTERN_RADIUS_CONTROL = 8;

/** DESIGN.md 字阶：正文 16px；较小说明贴近 12.8px。 */
export const PATTERN_FONT_TITLE = 16;
export const PATTERN_FONT_TEXT = 12.8;

type PatternDiagramViewportProps = {
  children: ReactNode;
};

export function PatternDiagramViewport({
  children,
}: PatternDiagramViewportProps) {
  return (
    <>
      <div
        className="overflow-x-auto pb-2 touch-pan-x"
        tabIndex={0}
        aria-label="图解可横向滚动"
      >
        <div className="mx-auto w-[720px] max-w-full min-w-[720px] sm:min-w-0">
          {children}
        </div>
      </div>
      <p className="mt-2 text-center text-[12.8px] text-secondary sm:hidden">
        手机可左右滑动查看全图
      </p>
    </>
  );
}
