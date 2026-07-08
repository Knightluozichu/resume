import type { ReviewQuestion } from "./types";

/** UI 动画 复习题 */
export const uidAnimationsQuestions: ReviewQuestion[] = [
  {
    id: "uid-animations-1",
    chapter: "uid-animations",
    level: 1,
    question: "Unity UI 动画有哪四种常见方案？",
    answer: "Animator（状态机驱动，可视化编辑）、DOTween（第三方链式API，性能优秀）、LeanTween（轻量级链式调用，已停止维护）、手动Lerp（在Update中线性插值，零依赖）。日常 UI 动画首选 DOTween。",
    tags: ["动画方案", "对比"],
  },
  {
    id: "uid-animations-2",
    chapter: "uid-animations",
    level: 2,
    question: "DOTween 的链式 API 如何实现淡入效果？",
    answer: "canvasGroup.DOFade(1f, 0.3f).SetEase(Ease.OutQuad).OnComplete(() => { /* 完成 */ })。DOFade 修改 CanvasGroup 的 alpha 从当前值到 1，0.3 秒完成，使用 OutQuad 缓动（开始快后慢），OnComplete 注册完成回调。SetEase 控制缓动曲线，常用 OutQuad（自然减速）和 OutBack（轻微回弹）。",
    tags: ["DOTween", "淡入"],
  },
  {
    id: "uid-animations-3",
    chapter: "uid-animations",
    level: 3,
    question: "为什么 UI 动画推荐用 DOTween 而不是 Animator？",
    answer: "1)性能：Animator 每帧执行状态机评估和动画采样，开销大于 DOTween 的直接属性插值；2)代码量：DOTween 一行代码完成（transform.DOLocalMove(pos, 0.3f)），Animator 需创建动画片段/控制器/参数；3)灵活性：DOTween 可运行时动态设置目标值和时长，Animator 需预制作；4)GC：DOTween 用对象池复用 tween，Animator 每次播放可能有分配。Animator 仅在需要复杂状态机（多状态切换+混合）时才有优势。",
    tags: ["DOTween", "Animator", "性能"],
  },
  {
    id: "uid-animations-4",
    chapter: "uid-animations",
    level: 4,
    question: "设计一个弹窗系统，要求弹窗有缩放弹出+淡入效果，关闭时反向播放，如何实现？",
    answer: "1)弹窗根节点挂 CanvasGroup（控制 alpha），子节点挂 RectTransform（控制缩放）；2)打开时：canvasGroup.alpha=0, transform.localScale=Vector3.zero，然后 DOTween.Sequence().Append(canvasGroup.DOFade(1, 0.2f)).Join(transform.DOScale(1, 0.3f).SetEase(Ease.OutBack))；3)关闭时：反向播放——Sequence().Append(canvasGroup.DOFade(0, 0.2f)).Join(transform.DOScale(0.8f, 0.2f).SetEase(Ease.InQuad)).OnComplete(() => gameObject.SetActive(false))；4)用 Sequence 管理动画顺序，SetUpdate(true) 确保不受 Time.timeScale 影响（暂停时弹窗仍可动画）；5)关闭前 Kill 已有 tween 避免冲突。",
    tags: ["弹窗系统", "Sequence", "综合"],
  },
];
