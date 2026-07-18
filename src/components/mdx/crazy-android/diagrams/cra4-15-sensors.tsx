import { OfficialCra4BookLab } from "./official-cra4-book-lab";

const nodes = [
  "第15章 传感器应用开发",
  "15.1 利用Android的传感器",
  "15.2 Android的常用传感器",
  "15.2.1 方向传感器",
  "15.2.2 陀螺仪传感器",
  "15.2.3 磁场传感器",
  "15.2.4 重力传感器",
  "15.2.5 线性加速度传感器",
  "15.2.6 温度传感器",
  "15.2.7 光传感器",
  "15.2.8 湿度传感器",
  "15.2.9 压力传感器",
  "15.2.10 心率传感器",
  "15.2.11 离身检查传感器",
  "15.3 传感器应用案例",
  "实例：指南针",
  "实例：水平仪",
  "15.4 本章小结"
];

export function CraLifecycleLab() { return <OfficialCra4BookLab mode="lifecycle" unitTitle="第15章 传感器应用开发" focus="枚举并采样方向、陀螺仪、磁场、重力、加速度、环境与心率传感器，完成指南针和水平仪" nodes={nodes} />; }
export function CraFailureLab() { return <OfficialCra4BookLab mode="failure" unitTitle="第15章 传感器应用开发" focus="枚举并采样方向、陀螺仪、磁场、重力、加速度、环境与心率传感器，完成指南针和水平仪" nodes={nodes} />; }
export function CraEvidenceLab() { return <OfficialCra4BookLab mode="evidence" unitTitle="第15章 传感器应用开发" focus="传感器能力表、采样率、坐标变换、滤波结果、注册/注销和设备差异记录" nodes={nodes} />; }
