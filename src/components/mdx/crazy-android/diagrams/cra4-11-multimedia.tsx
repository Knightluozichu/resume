import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第11章 多媒体应用开发",
  "11.1 音频和视频的播放",
  "11.1.1 Android 9增强的MediaPlayer",
  "11.1.2 音乐特效控制",
  "实例：音乐的示波器、均衡、重低音和音场",
  "11.1.3 使用VolumeShaper控制声音效果",
  "11.1.4 使用SoundPool播放音效",
  "11.1.5 使用VideoView播放视频",
  "11.1.6 使用MediaPlayer和SurfaceView播放视频",
  "11.2 使用MediaRecorder录制音频",
  "实例：录制音乐",
  "11.3 控制摄像头拍照",
  "11.3.1 Android 9改进的Camera v2",
  "实例：拍照时自动对焦",
  "11.3.2 录制视频短片",
  "实例：录制生活短片",
  "11.4 屏幕捕捉",
  "11.5 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第11章 多媒体应用开发" focus="围绕MediaPlayer、SoundPool、VideoView、MediaRecorder、Camera2与屏幕捕捉管理媒体资源" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第11章 多媒体应用开发" focus="围绕MediaPlayer、SoundPool、VideoView、MediaRecorder、Camera2与屏幕捕捉管理媒体资源" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第11章 多媒体应用开发" focus="媒体状态机、音视频样本、录制权限、Camera会话和异常释放测试" nodes={nodes} />; }
