import type { ReviewQuestion } from "./types";

export const uctAudioSystemQuestions: ReviewQuestion[] = [
  {
    id: "uct-audio-system-1",
    chapter: "uct-audio-system",
    level: 1,
    question: `Unity 音频系统三要素是什么？各自的作用？`,
    answer: `AudioSource（播放器/喇叭）挂在 GameObject 上播放 AudioClip。AudioListener（接收器/耳朵）通常挂在主相机上接收声音，场景中只能有一个。AudioClip（音频文件）是 mp3/wav/ogg 格式的音频资源。三要素缺一不可。`,
    tags: ["AudioSource", "AudioListener", "AudioClip"],
  },
  {
    id: "uct-audio-system-2",
    chapter: "uct-audio-system",
    level: 2,
    question: `AudioMixer 分轨有什么用？怎么实现音量控制？`,
    answer: `分轨独立控制 BGM/音效/语音音量，互不影响。实现：1）创建 AudioMixer，建 Master→BGM/SFX/Voice 分组；2）AudioSource 的 Output 连到对应组；3）暴露参数（Expose Parameters）暴露音量；4）用 mixer.SetFloat 设置分贝值（0~1 映射到 -80~0dB）。UI 滑块控制暴露参数。`,
    tags: ["AudioMixer", "分轨", "音量控制"],
  },
  {
    id: "uct-audio-system-3",
    chapter: "uct-audio-system",
    level: 3,
    question: `为什么高频音效播放要用对象池？怎么实现？`,
    answer: `每次 new GameObject+Destroy 播放音效在托管堆+原生堆分配内存，高频操作（连发射击）触发 GC 卡顿。对象池方案：1）预创建 N 个 AudioSource 放 List；2）Play 时遍历找空闲（!isPlaying）的播放；3）全忙时轮询打断最旧的；4）3D 音效设 spatialBlend=1 并跟随物体。零 GC 分配。`,
    tags: ["音频对象池", "性能优化"],
  },
  {
    id: "uct-audio-system-4",
    chapter: "uct-audio-system",
    level: 4,
    question: `完整设计一个游戏音频系统，包括 BGM 切换、音效池、3D 空间音效。`,
    answer: `架构：1）AudioManager（DontDestroyOnLoad 单例）管理一切；2）AudioMixer 分 Master/BGM/SFX/Voice 四轨，暴露音量参数；3）BGM 播放器 2 个 AudioSource 交叉淡入淡出切换；4）SFX 对象池 16 个 AudioSource 轮询复用，3D 音效 spatialBlend=1+minDistance/maxDistance；5）UI 滑块控制四轨音量；6）短音效 Decompress On Load 预解压无延迟，BGM Streaming 省内存；7）AudioListener 挂主相机。`,
    tags: ["音频系统", "综合"],
  },
];
