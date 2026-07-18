import { OfficialFla3BookLab } from "./official-fla3-book-lab";

const nodes = [
  "第9章 丰富你的程序，运用手机多媒体",
  "9.1 将程序运行到手机上",
  "9.2 使用通知",
  "9.3 调用摄像头和相册",
  "9.4 播放多媒体文件",
  "9.5 Kotlin课堂：使用infix函数构建更可读的语法",
  "9.6 Git时间：版本控制工具进阶",
  "9.7 小结与点评"
];

export function FlaLifecycleLab() { return <OfficialFla3BookLab mode="lifecycle" unitTitle="第9章 丰富你的程序，运用手机多媒体" focus="覆盖真机运行、通知渠道、相机与相册URI、多媒体播放生命周期、infix可读性和Git进阶" nodes={nodes} />; }
export function FlaStateLab() { return <OfficialFla3BookLab mode="state" unitTitle="第9章 丰富你的程序，运用手机多媒体" focus="从相机和相册获取图片并播放音视频，切换前后台、拒绝权限、旋转和中断播放验证状态与资源释放" nodes={nodes} />; }
export function FlaEvidenceLab() { return <OfficialFla3BookLab mode="evidence" unitTitle="第9章 丰富你的程序，运用手机多媒体" focus="媒体权限与URI流、通知渠道矩阵、播放器状态机、真机兼容与资源释放测试" nodes={nodes} />; }
