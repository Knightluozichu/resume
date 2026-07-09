import type { ReviewQuestion } from "./types";

export const davMediaAudioQuestions: ReviewQuestion[] = [
  {
    id: "dav-ma-1",
    chapter: "dav-media-audio",
    level: 1,
    question: "Android媒体框架的C/S架构是什么？mediaserver进程包含哪些服务？",
    answer: "C/S架构：Client（App进程）用MediaPlayer/AudioTrack等Java API→JNI→Native库→Binder跨进程调用mediaserver。mediaserver由init.rc启动，承载MediaPlayerService（媒体播放，StagefrightPlayer/NuPlayer）、AudioFlinger（音频混音，注册为media.audio）、CameraService（摄像头）。所有服务通过addService注册到ServiceManager。mediaserver独立于system_server，崩溃只影响媒体不影响系统。",
    tags: ["C/S架构", "mediaserver", "MediaPlayerService", "AudioFlinger", "CameraService"],
  },
  {
    id: "dav-ma-2",
    chapter: "dav-media-audio",
    level: 2,
    question: "AudioFlinger的混音管线如何工作？音频数据如何在进程间传输？",
    answer: "App创建AudioTrack→Binder调用AudioFlinger.createTrack()在MixerThread中创建Track+分配ashmem共享内存。App write()写入PCM到共享Buffer。MixerThread循环：遍历mActiveTracks读取各Track数据→AudioMixer混音（重采样/音量调节/格式转换）→写入mOutput→Audio HAL→ALSA驱动→扬声器。进程间传输用ashmem共享内存（App和mediaserver mmap同一物理页），零拷贝避免Binder大数据开销。",
    tags: ["AudioFlinger", "MixerThread", "AudioMixer", "ashmem", "零拷贝"],
  },
  {
    id: "dav-ma-3",
    chapter: "dav-media-audio",
    level: 2,
    question: "MediaPlayer的播放流程是什么？Stagefright引擎如何工作？",
    answer: "MediaPlayer C/S架构：Java层→JNI→Native MediaPlayer→Binder→mediaserver的MediaPlayerService→StagefrightPlayer。流程：setDataSource→prepare（MediaExtractor解复用分离音视频ES流→MediaDecoder基于OpenMAX初始化解码器）→start（解码线程持续解码→音频PCM写入AudioTrack→视频YUV写入Surface→PTS音视频同步）。Stagefright：DataSource→MediaExtractor（MPEG4/MP3/WAV）→MediaDecoder（OpenMAX硬件/软件）→输出。",
    tags: ["MediaPlayer", "Stagefright", "MediaExtractor", "MediaDecoder", "OpenMAX"],
  },
  {
    id: "dav-ma-4",
    chapter: "dav-media-audio",
    level: 1,
    question: "AudioTrack的两种模式有什么区别？音频流类型的作用是什么？",
    answer: "MODE_STATIC：一次性写入全部数据再播放，适合短音效，延迟低但占内存。MODE_STREAM：边播边写，适合长音频，内存占用小但有延迟。音频流类型（STREAM_MUSIC/RING/VOICE_CALL/ALARM等）决定：①混音策略（独立音量控制和路由，通话优先级最高）；②音量路由（音量键根据当前焦点流类型调节对应音量）；③输出设备（通话路由听筒，音乐路由扬声器/耳机）。",
    tags: ["AudioTrack", "MODE_STATIC", "MODE_STREAM", "音频流类型", "音量路由"],
  },
];
