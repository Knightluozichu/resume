import type { ReviewQuestion } from "./types";

/** Unity Timeline 复习题 */
export const uanTimelineQuestions: ReviewQuestion[] = [
  {
    id: "uan-timeline-1",
    chapter: "uan-timeline",
    level: 1,
    question: "Timeline 和 Animator 的区别是什么？分别适合什么场景？",
    answer: "Animator 是状态机——根据参数交互式切换动画（走/跑/跳），适合玩家控制的实时角色动画。Timeline 是线性时间线——按时间编排多个轨道（动画/音频/特效/信号）同步播放，适合非交互的过场动画/剧情序列。简言之：Animator 是「玩家驱动」（交互），Timeline 是「导演驱动」（线性）。",
    tags: ["Timeline", "Animator", "对比"],
  },
  {
    id: "uan-timeline-2",
    chapter: "uan-timeline",
    level: 2,
    question: "Timeline 有哪些常用的 Track 类型？",
    answer: "Animation Track（动画轨道，播放角色/物体动画）、Activation Track（激活轨道，控制 GameObject 的激活/禁用）、Audio Track（音频轨道，播放 BGM/音效）、Signal Track（信号轨道，在特定时间点发送信号触发代码）、Control Track（控制轨道，控制粒子/Timeline 嵌套）、Playable Track（自定义轨道，用代码扩展）。多轨道同步播放实现复杂场景编排。",
    tags: ["Track", "类型"],
  },
  {
    id: "uan-timeline-3",
    chapter: "uan-timeline",
    level: 3,
    question: "Timeline 的 Signal（信号）系统如何工作？与 Animation Event 有什么区别？",
    answer: "Signal：在 Signal Track 的特定时间点放置 Signal Emitter，播放到该时间点时触发 Signal Receiver 上的回调方法。区别：1)Signal 是 Timeline 级别的——在整个过场时间线上精确定位；Animation Event 是 Clip 级别的——在单个动画片段的关键帧上触发。2)Signal 可以触发场景中任何对象的回调；Animation Event 只触发动画所在对象的组件方法。3)Signal 支持参数传递；Animation Event 也支持但参数类型有限。选择：过场动画用 Signal，角色动作用 Animation Event。",
    tags: ["Signal", "AnimationEvent", "对比"],
  },
  {
    id: "uan-timeline-4",
    chapter: "uan-timeline",
    level: 4,
    question: "设计一个过场动画：角色A走到中央→角色B出现→对话→特效→镜头切换→结束，如何用 Timeline 实现？",
    answer: "1)Animation Track A：0~3 秒角色A走路动画到中央，3~8 秒待机；2)Activation Track：3 秒激活角色B（B 出现）；3)Animation Track B：3~8 秒角色B动画；4)Audio Track：0~3 秒脚步声，3~8 秒对话语音，5 秒特效音效；5)Signal Track：3 秒 Signal「B出现」（触发对话UI显示），5 秒 Signal「特效」（触发粒子系统），8 秒 Signal「结束」（切回游戏控制）；6)Cinemachine Track：0~3 秒跟随A，3 秒切到双人全景，5 秒推进到特效特写。Timeline 信号接收器在代码中注册回调：receiver.AddReaction("B出现", ShowDialogueUI)。效果：多轨道同步编排，动画/音频/特效/镜头精确配合。",
    tags: ["过场动画", "综合", "Timeline"],
  },
];
