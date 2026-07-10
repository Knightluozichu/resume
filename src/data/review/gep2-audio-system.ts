import type { ReviewQuestion } from "./types";

export const gep2AudioSystemQuestions: ReviewQuestion[] = [
  {
    id: "gep2-audio-system-1",
    chapter: "gep2-audio-system",
    level: 1,
    question: `音频系统从声源到输出经过哪几层？`,
    answer:
      `声源（Emitter，如脚步/枪声/音乐）→ 3D 空间化（距离衰减、声像 Panning、多普勒/遮挡）→ 混音总线（SFX/Music/Voice 分总线汇入 Master 主总线）→ 输出（DAC 到扬声器）。3D 化只对音效做，音乐和语音通常走非空间化总线。`,
    tags: ["音频管线", "声源", "混音"],
  },
  {
    id: "gep2-audio-system-2",
    chapter: "gep2-audio-system",
    level: 2,
    question: `3D 音频的距离衰减为什么常用「近场不放大、远场渐隐」？`,
    answer:
      `现实里声音随距离衰减，但若简单用 1/distance，声源贴脸时音量会趋向无穷大刺耳。所以设一个「近场半径」：距离小于它时音量封顶不放大（避免近场爆音）；距离大于它时按曲线（线性或对数）渐隐到 0。这样既符合远场衰减的听感，又防止声源靠近听众时音量失控。`,
    tags: ["距离衰减", "近场", "音量"],
  },
  {
    id: "gep2-audio-system-3",
    chapter: "gep2-audio-system",
    level: 3,
    question: `混音为什么要分总线（SFX/Music/Voice/Master）？`,
    answer:
      `分总线让不同类别音量可独立调节（玩家调音乐音量不影响语音）、便于统一施加效果（如 Music 总线加压缩）、并支持闪避（Ducking：语音出现时自动压低音乐）。Master 主总线做最终压限和响度归一，防止多声源叠加削波。若所有声源直接混到一路，这些独立控制和效果都无法实现，混音师也无法平衡各类声音。`,
    tags: ["混音总线", "闪避", "压限"],
  },
  {
    id: "gep2-audio-system-4",
    chapter: "gep2-audio-system",
    level: 4,
    question:
      `为什么背景音乐和语音通常不做 3D 空间化？综合分析空间化的适用边界。`,
    answer:
      `3D 空间化（Panning+衰减+HRTF）模拟「声音从空间某点传来」，适合音效（枪声、脚步）以提供方位信息。但音乐是「非场景内」的伴奏，听众不在场景里，给它加空间化会让歌手像在场景里绕头跑，听感诡异且音量随距离忽大忽小。语音（如旁白、UI 提示）同理，需要清晰稳定，不应受空间位置影响。空间化的适用边界是「场景内、有明确位置的声源」；非场景内或需要稳定清晰度的声音走非空间化总线。这是「真实感」与「可用性」的权衡。`,
    tags: ["空间化边界", "综合", "音乐语音"],
  },
];
