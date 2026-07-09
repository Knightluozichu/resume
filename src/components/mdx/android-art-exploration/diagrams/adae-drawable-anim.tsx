/**
 * <AdaeDrawableAnimDiagram>：Drawable种类与动画体系图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function AdaeDrawableAnimDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Drawable种类与动画体系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Drawable 种类与动画体系
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Drawable 是「可绘制对象」抽象；动画分 View 动画与属性动画
          </text>

          {/* 左面板：Drawable 种类 */}
          <rect x="30" y="62" width="340" height="430" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="200" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">常见 Drawable 种类</text>

          <rect x="50" y="100" width="300" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="200" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">BitmapDrawable</text>
          <text x="60" y="142" fontSize="11" fill="var(--text-secondary)">位图 + 平铺/拉伸模式</text>

          <rect x="50" y="164" width="300" height="56" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="200" y="186" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">ShapeDrawable</text>
          <text x="60" y="206" fontSize="11" fill="var(--text-secondary)">纯色/渐变/圆角/描边</text>

          <rect x="50" y="228" width="300" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="200" y="250" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">LayerDrawable</text>
          <text x="60" y="270" fontSize="11" fill="var(--text-secondary)">多层叠加（如带阴影按钮）</text>

          <rect x="50" y="292" width="300" height="56" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="200" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">StateListDrawable</text>
          <text x="60" y="334" fontSize="11" fill="var(--text-secondary)">按状态切换（selector pressed/selected）</text>

          <rect x="50" y="356" width="300" height="56" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="200" y="378" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">LevelListDrawable</text>
          <text x="60" y="398" fontSize="11" fill="var(--text-secondary)">按 level 切换（电量/进度）</text>

          <rect x="50" y="420" width="300" height="56" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="200" y="442" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">InsetDrawable / ClipDrawable</text>
          <text x="60" y="462" fontSize="11" fill="var(--text-secondary)">内边距裁剪 / 按比例裁剪</text>

          {/* 右面板：动画体系 */}
          <rect x="390" y="62" width="320" height="430" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="550" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">动画体系</text>

          <rect x="410" y="100" width="280" height="120" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="550" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">View 动画（补间 Tween）</text>
          <text x="420" y="144" fontSize="11" fill="var(--text-secondary)">AlphaAnimation 透明度</text>
          <text x="420" y="162" fontSize="11" fill="var(--text-secondary)">TranslateAnimation 平移</text>
          <text x="420" y="180" fontSize="11" fill="var(--text-secondary)">RotateAnimation 旋转</text>
          <text x="420" y="198" fontSize="11" fill="var(--text-secondary)">ScaleAnimation 缩放</text>
          <text x="420" y="216" fontSize="11" fill="var(--text-tertiary)">仅视觉变化，不改变真实属性</text>

          <rect x="410" y="232" width="280" height="86" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="550" y="254" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">帧动画（Frame）</text>
          <text x="420" y="276" fontSize="11" fill="var(--text-secondary)">AnimationDrawable 逐帧播放</text>
          <text x="420" y="294" fontSize="11" fill="var(--text-secondary)">类似 GIF，资源占用高</text>
          <text x="420" y="312" fontSize="11" fill="var(--text-tertiary)">适合短而精的序列</text>

          <rect x="410" y="330" width="280" height="146" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="550" y="352" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">属性动画（Property Animator）</text>
          <text x="420" y="374" fontSize="11" fill="var(--text-secondary)">ValueAnimator 数值渐变</text>
          <text x="420" y="392" fontSize="11" fill="var(--text-secondary)">ObjectAnimator 自动赋值</text>
          <text x="420" y="410" fontSize="11" fill="var(--text-secondary)">AnimatorSet 组合编排</text>
          <text x="420" y="428" fontSize="11" fill="var(--text-secondary)">TypeEvaluator 自定义估值</text>
          <text x="420" y="446" fontSize="11" fill="var(--text-secondary)">Interpolator 控制节奏</text>
          <text x="420" y="464" fontSize="11" fill="var(--text-tertiary)">真实改变属性，可交互，3.0+</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Drawable六大种类（Bitmap/Shape/Layer/StateList/LevelList/Inset）与动画三大体系（View补间/帧/属性动画）
      </figcaption>
    </figure>
  );
}
