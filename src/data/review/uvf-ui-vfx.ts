import type { ReviewQuestion } from "./types";

export const uvfUiVfxQuestions: ReviewQuestion[] = [
  {
    id: "uvf-ui-vfx-1",
    chapter: "uvf-ui-vfx",
    level: 1,
    question: `在 UGUI 上播放粒子特效，ParticleSystem Renderer 的 Render Mode 应该设为什么？`,
    answer: `应设为 Render Mode = Screen Space Overlay 或 Screen Space Camera（取决于 Canvas 类型），或者将粒子放在 Canvas 下的子物体上。在 URP 中，需要用 Canvas Renderer 兼容的渲染方式。如果用 Screen Space - Overlay Canvas，粒子需要使用专门的 UI 粒子方案（如 UI Particle 包或 TextMeshPro 的粒子扩展），因为标准 ParticleSystem 不会渲染在 Overlay Canvas 上。最简单的方案是 Canvas 用 Screen Space - Camera，粒子正常渲染即可被相机捕获。`,
    tags: ["UGUI", "粒子UI", "Render Mode", "Canvas"],
  },
  {
    id: "uvf-ui-vfx-2",
    chapter: "uvf-ui-vfx",
    level: 2,
    question: `DOTween 在 UI 特效中常用来做什么？举三个典型用例并说明缓动函数的选择。`,
    answer: `1）按钮点击反馈：\`transform.DOScale(0.9f, 0.1f).SetEase(Ease.OutQuad)\` 然后回弹，用 OutQuad 让缩小快速开始然后减速；2）面板滑入：\`rectTransform.DOAnchorPos(Vector2.zero, 0.3f).SetEase(Ease.OutBack)\`，用 OutBack 让面板滑入后轻微回弹，有弹性感；3）金币飞出：\`transform.DOMove(targetPos, 0.5f).SetEase(Ease.InQuad)\`，用 InQuad 让金币先慢后快飞向目标，模拟惯性。选择原则：UI 反馈用 Out 系列（快速到达后减速，感觉灵敏），弹出用 OutBack（有弹性），消失用 In 系列（先慢后快加速离开）。`,
    tags: ["DOTween", "UI动效", "缓动函数"],
  },
  {
    id: "uvf-ui-vfx-3",
    chapter: "uvf-ui-vfx",
    level: 3,
    question: `如何实现伤害飘字效果？如何用对象池管理大量飘字避免 GC？`,
    answer: `1）飘字预制体：TextMeshPro 文本 + DOTween 动画（向上飘+渐隐+缩放）；2）对象池：预创建20个飘字对象，\`Queue<TextMeshProUGUI> pool\`，需要时 Dequeue 取出设位置和文字，播放动画，动画完成后 SetActive(false) 并 Enqueue 回收；3）代码：\`public void ShowDamage(Vector3 worldPos, int dmg) { var text = pool.Dequeue(); text.text = dmg.ToString(); text.transform.position = Camera.main.WorldToScreenPoint(worldPos); text.gameObject.SetActive(true); text.transform.DOMoveY(text.transform.position.y + 80, 0.8f).SetEase(Ease.OutQuad).OnComplete(() => { text.gameObject.SetActive(false); pool.Enqueue(text); }); text.DOFade(0, 0.8f); }\`。暴击用红色大字号+震荡动画，普通伤害用白色标准字号。`,
    tags: ["伤害飘字", "对象池", "TextMeshPro", "代码实现"],
  },
  {
    id: "uvf-ui-vfx-4",
    chapter: "uvf-ui-vfx",
    level: 4,
    question: `设计一个「抽卡开箱」UI 特效全流程，如何组合 UGUI 动画+粒子+屏幕反馈达到最佳体验？`,
    answer: `1）点击开箱：按钮 DOTween 缩放反馈（0.1s）+ 播放开箱音效；2）箱子打开动画：箱子盖 DOTween 旋转打开（0.3s OutBack），同时喷射光芒粒子（Burst 30个，Additive 混合，向上发散）；3）光芒爆发：全屏闪白（UI Image alpha 从1到0渐变0.2s）+ 屏幕轻微震屏（Camera DoShake 0.2s）；4）结果展示：光芒消散后，卡牌从中心弹出（DOScale 0→1，0.4s OutBack），周围环绕金色粒子（持续发射 Rate=10/s）；5）稀有度反馈：如果是SSR，额外叠加金色光柱粒子+彩虹边框+震屏加倍+特殊音效。时间线编排：0s点击→0.1s开箱→0.4s闪白→0.6s震屏→0.8s卡牌弹出→1.2s粒子环绕→持续展示。关键：每个阶段无缝衔接，音效与视觉同步，稀有度越高反馈越强烈。`,
    tags: ["抽卡特效", "UI综合", "开箱", "体验设计"],
  },
];
