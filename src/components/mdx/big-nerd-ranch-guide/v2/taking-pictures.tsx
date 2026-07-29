"use client";

import { AndroidStateLab, type AndroidStateModel } from "./android-state-lab";

const model = {
  unitId: "taking-pictures",
  title: "使用intent拍照",
  task: "用 FileProvider URI 委托相机写入照片并按目标尺寸解码显示",
  owner: "CrimeRepository、FileProvider、相机应用与 ImageView",
  state: "文件 URI、临时权限、照片字节、方向和解码尺寸",
  event: "拍照、取消、旋转、返回及照片加载",
  invariant: "只接受非空可解码文件，授权在任务结束后不继续扩大",
  fault: "把 file URI 暴露给外部相机或全尺寸解码导致权限异常与 OOM",
  evidence: "URI grant、结果码、文件大小、EXIF、采样率和内存轨迹",
  concepts: [
    "16. Taking Pictures with Intents",
    "A Place for Your Photo",
    "File Storage",
    "Using a Camera Intent",
    "Scaling and Displaying Bitmaps",
    "Declaring Features",
    "Challenge: Detail Display",
    "Challenge: Efficient Thumbnail Load",
  ],
  transitions: [
    {
      action: "冻结入口：16. Taking Pictures with Intents",
      state:
        "记录CrimeRepository、FileProvider、相机应用与 ImageView的初始文件 URI、临时权限、照片字节、方向和解码尺寸",
      evidence:
        "URI grant、结果码、文件大小、EXIF、采样率和内存轨迹中的“16. Taking Pictures with Intents”轨迹",
    },
    {
      action: "触发事件：File Storage",
      state:
        "以“拍照、取消、旋转、返回及照片加载”改变文件 URI、临时权限、照片字节、方向和解码尺寸",
      evidence:
        "URI grant、结果码、文件大小、EXIF、采样率和内存轨迹中的“File Storage”轨迹",
    },
    {
      action: "提交状态：Using a Camera Intent",
      state:
        "只由CrimeRepository、FileProvider、相机应用与 ImageView提交新状态",
      evidence:
        "URI grant、结果码、文件大小、EXIF、采样率和内存轨迹中的“Using a Camera Intent”轨迹",
    },
    {
      action: "重建边界：Declaring Features",
      state: "在销毁、取消或重建后拒绝旧所有者回调",
      evidence:
        "URI grant、结果码、文件大小、EXIF、采样率和内存轨迹中的“Declaring Features”轨迹",
    },
    {
      action: "核对交付：Challenge: Efficient Thumbnail Load",
      state: "以“只接受非空可解码文件，授权在任务结束后不继续扩大”判断通过",
      evidence: "URI grant、结果码、文件大小、EXIF、采样率和内存轨迹",
    },
  ],
  scenarios: [
    {
      label: "正常任务",
      input:
        "固定 SDK、设备配置和初始状态，触发“拍照、取消、旋转、返回及照片加载”",
      expected:
        "由CrimeRepository、FileProvider、相机应用与 ImageView提交文件 URI、临时权限、照片字节、方向和解码尺寸，并持续满足“只接受非空可解码文件，授权在任务结束后不继续扩大”",
    },
    {
      label: "边界恢复",
      input:
        "保持正常输入不变，仅注入“把 file URI 暴露给外部相机或全尺寸解码导致权限异常与 OOM”",
      expected:
        "找到首个状态分岔，撤销后以URI grant、结果码、文件大小、EXIF、采样率和内存轨迹证明同输入恢复",
    },
  ],
} satisfies AndroidStateModel;

export function TakingPicturesContractLab() {
  return <AndroidStateLab model={model} view="contract" />;
}

export function TakingPicturesLifecycleLab() {
  return <AndroidStateLab model={model} view="lifecycle" />;
}

export function TakingPicturesFaultLab() {
  return <AndroidStateLab model={model} view="fault" />;
}
