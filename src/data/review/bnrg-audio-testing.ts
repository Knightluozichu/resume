/** 复习题库 · 音频播放与单元测试（bnrg-audio-testing）。Big Nerd Ranch Guide 第 20 章。 */

import type { ReviewQuestion } from "./types";

export const bnrgAudioTestingQuestions: ReviewQuestion[] = [
  {
    id: "bnrg-at-1",
    chapter: "bnrg-audio-testing",
    level: 1,
    question: "MediaPlayer 和 SoundPool 各适合什么音频场景？",
    answer:
      "MediaPlayer：长音频（音乐、播客），流式播放，占用资源多。SoundPool：短音效（按钮音、游戏音效），预加载到内存，低延迟重复播放。",
    tags: ["MediaPlayer", "SoundPool"],
  },
  {
    id: "bnrg-at-2",
    chapter: "bnrg-audio-testing",
    level: 1,
    question: "JUnit 单元测试运行在哪个进程/线程？能直接测试 Android 框架类吗？",
    answer:
      "运行在本地 JVM（开发机），不在 Android 设备上。不能直接测试依赖 Android SDK 的类（如 Context、View）——需 Robolectric 或 instrumented test（androidTest）在设备/模拟器上跑。",
    tags: ["JUnit", "单元测试"],
  },
  {
    id: "bnrg-at-3",
    chapter: "bnrg-audio-testing",
    level: 2,
    question: "为什么 MediaPlayer 用完必须 release()？不 release 会怎样？",
    answer:
      "MediaPlayer 持有 native 层音频资源和文件句柄。不 release 导致内存泄漏、AudioFocus 冲突、后续无法播放。在 onStop/onDestroy 或不再播放时 release 并重置引用。",
    tags: ["MediaPlayer", "release"],
  },
  {
    id: "bnrg-at-4",
    chapter: "bnrg-audio-testing",
    level: 2,
    question: "测试纯 Kotlin 业务逻辑（如日期格式化函数）应放在 test 还是 androidTest？",
    answer:
      "test（本地单元测试）——不依赖 Android 框架，运行快，CI 友好。androidTest 仅用于需要 Context、UI、真实 SQLite 或设备 API 的测试。",
    tags: ["test", "androidTest"],
  },
  {
    id: "bnrg-at-5",
    chapter: "bnrg-audio-testing",
    level: 3,
    question: "旋转屏幕后音乐从头播放，最可能的原因和修复思路？",
    answer:
      "MediaPlayer 存在 Activity 成员变量里，旋转销毁 Activity 时 player 被 release 或未保存进度。修复：把播放状态和 MediaPlayer 放 ViewModel 或 Service；或用 exoPlayer + 生命周期感知；保存 playbackPosition 到 savedInstanceState。",
    tags: ["旋转", "状态"],
  },
];

export default bnrgAudioTestingQuestions;
