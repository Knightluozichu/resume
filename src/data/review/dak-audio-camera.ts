import type { ReviewQuestion } from "./types";

export const dakAudioCameraQuestions: ReviewQuestion[] = [
  {
    id: "dak-audio-1",
    chapter: "dak-audio-camera",
    level: 1,
    question: "AudioFlinger的音频管线架构是什么？播放和录制流程分别是什么？",
    answer: "AudioFlinger音频管线分五层：App层（AudioTrack播放/AudioRecord录制，Java API写入读取PCM数据）→ Framework层（AudioSystem/AudioManager，音频策略管理路由选择/音量控制/焦点管理）→ Native层（AudioFlinger核心混音引擎，运行在mediaserver进程，负责多路混音/音量控制/音效处理/重采样/缓冲管理）→ HAL层（Audio HAL厂商实现对接ALSA/TinyAlsa）→ Linux内核（ALSA驱动，DAC数模转换播放/ADC模数转换录制）。播放流程：①App创建AudioTrack指定采样率/声道/格式；②AudioTrack通过Binder连接AudioFlinger；③AudioFlinger创建播放轨道TrackBase并分配ashmem共享内存；④App写入PCM数据到共享内存；⑤AudioFlinger的MixerThread从所有活跃Track读取PCM混音、音量调整、音效处理、重采样；⑥混音后数据写入Audio HAL→ALSA→DAC→扬声器。录制流程：麦克风→ADC→ALSA→Audio HAL→AudioFlinger→共享内存→App读取。关键设计：共享内存传输PCM流避免拷贝，Binder只传控制命令。",
    tags: ["AudioFlinger", "音频管线", "MixerThread", "混音", "PCM", "ashmem"],
  },
  {
    id: "dak-audio-2",
    chapter: "dak-audio-camera",
    level: 2,
    question: "Camera2 API的Pipeline模型是什么？核心概念有哪些？",
    answer: "Camera2 API相比Camera1采用Pipeline（管线）模型设计。核心概念：①CameraManager——摄像头管理器，openCamera(cameraId, stateCallback, handler)打开指定摄像头获取CameraDevice，支持多摄像头查询切换；②CameraDevice——代表打开的摄像头设备，createCaptureSession(outputSurfaces)建立捕获会话绑定输出Surface，createCaptureRequest(template)创建捕获请求构建器；③CaptureSession——捕获会话管理帧捕获Pipeline，setRepeatingRequest(request)持续捕获帧到预览Surface（实时预览），capture(request)单次捕获高分辨率帧（拍照）；④CaptureRequest——捕获请求定义捕获参数如目标Surface、自动对焦模式（CONTROL_AF_MODE）、自动曝光、闪光灯等，通过builder.set()设置；⑤ImageReader——通过Surface接收帧数据，newInstance(width,height,ImageFormat.JPEG,maxImages)创建，onImageAvailable回调通知新帧到达。完整流程：CameraManager打开CameraDevice→配置CaptureSession绑定预览Surface→setRepeatingRequest持续预览→拍照时capture单次捕获到ImageReader的Surface→onImageAvailable处理帧。帧数据通过共享内存传输，控制命令通过Binder传输。Camera HAL 3.0支持3A（自动对焦/曝光/白平衡）、RAW格式、多输出Surface。",
    tags: ["Camera2", "Pipeline模型", "CameraManager", "CameraDevice", "CaptureSession", "ImageReader"],
  },
  {
    id: "dak-audio-3",
    chapter: "dak-audio-camera",
    level: 2,
    question: "音频与摄像头服务有哪些共同的设计模式？为什么用共享内存传输大数据？",
    answer: "五个共同设计模式：①C/S架构——Client（App进程）通过Binder跨进程调用Server（mediaserver进程中的AudioFlinger/CameraService），App不直接操作硬件；②分层解耦——App→Framework→Native Service→HAL→Kernel五层，HAL屏蔽厂商硬件差异（Audio HAL对接ALSA/Camera HAL 3.0对接V4L2），统一接口规范；③控制面与数据面分离——控制命令（开始/停止/参数设置等小数据）通过Binder传输，数据传输（PCM流/摄像头帧等大数据）通过共享内存传输；④权限管控——录音需RECORD_AUDIO权限、拍照需CAMERA权限，Server端通过Binder.getCallingUid()校验调用方权限，内核层记录UID/PID不可伪造；⑤mediaserver进程隔离——AudioFlinger+CameraService+MediaPlayerService运行在独立mediaserver进程，与system_server隔离，崩溃不影响系统。为什么用共享内存：Binder虽一次拷贝，但对持续大数据流（PCM每秒约176KB、摄像头帧每帧数MB）仍有开销。共享内存（ashmem/ION）初始设置时App和mediaserver映射同一块物理内存，之后App写入mediaserver直接读取，无需任何拷贝（零拷贝）。Binder只传少量控制命令，避免大流量数据拷贝开销。",
    tags: ["C/S架构", "分层解耦", "共享内存", "控制面数据面分离", "mediaserver"],
  },
  {
    id: "dak-audio-4",
    chapter: "dak-audio-camera",
    level: 3,
    question: "mediaserver进程为什么独立于system_server？音频焦点如何管理？",
    answer: "mediaserver独立于system_server的原因：①稳定性隔离——AudioFlinger/CameraService/MediaPlayerService等媒体服务直接操作硬件，更容易因驱动问题或资源竞争崩溃。独立进程后媒体服务崩溃只需重启mediaserver，不影响system_server和其他系统服务，如果运行在system_server中崩溃会导致整个系统重启；②资源隔离——媒体服务需大量内存（音视频缓冲区）和CPU（编解码），独立进程便于资源管理和优先级调度，避免与系统核心服务竞争；③安全隔离——媒体服务直接访问硬件（麦克风/摄像头），独立进程限制权限范围减少安全风险。音频焦点管理：多App可能同时请求播放音频，Android通过音频焦点（Audio Focus）机制协调。①请求焦点——App播放前调用AudioManager.requestAudioFocus(request, streamType, durationHint)，durationHint有AUDIOFOCUS_GAIN（长期获取）、AUDIOFOCUS_GAIN_TRANSIENT（短暂）、AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK（短暂允许其他降低音量继续）；②焦点回调——获得焦点onAudioFocusChange(AUDIOFOCUS_GAIN)可播放，失去焦点按类型处理：AUDIOFOCUS_LOSS（永久失去停止播放释放资源）、AUDIOFOCUS_LOSS_TRANSIENT（短暂失去暂停等待恢复）、AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK（可降低音量继续）；③策略管理——AudioFlinger和AudioPolicyService共同管理焦点策略，如电话来电强制获取焦点暂停音乐、导航语音降低音乐音量播放。",
    tags: ["mediaserver", "进程隔离", "音频焦点", "AudioFocus", "AudioPolicyService"],
  },
];
