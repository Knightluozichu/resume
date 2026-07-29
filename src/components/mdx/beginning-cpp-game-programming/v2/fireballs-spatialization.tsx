"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-20",
  title: "第 20 章：火球与声音空间化",
  focus:
    "让 Fireball 事件通过 SoundEngine 设置声源位置，并由 SFML listener、距离和衰减产生可解释的空间听感",
  invariant:
    "声源和 listener 使用同一世界坐标系，SoundBuffer 生命周期覆盖播放，HUD 音效不被错误空间化",
  fault:
    "把屏幕像素位置直接当世界声源位置，相机移动时听感漂移但火球逻辑位置未变",
  evidence:
    "Fireball 世界坐标、listener position/direction、minDistance、attenuation、SoundBuffer 地址和播放状态",
  concepts: [
    "声音空间化（spatialization）",
    "sfml 音频（sfml audio）",
    "声音引擎（soundengine）",
    "火球（fireballs）",
    "hud 类（hud class）",
  ],
  zones: [
    {
      label: "世界事件",
      detail: "Fireball 生成、运动、碰撞与生命周期",
    },
    {
      label: "音频空间",
      detail: "listener、声源位置、距离和衰减",
    },
    {
      label: "非空间界面",
      detail: "HUD 类、菜单提示与固定反馈",
    },
  ],
  trace: ["生成火球", "提交世界位置", "设置 listener", "播放声源", "检查衰减"],
  scenarios: [
    {
      label: "火球接近玩家",
      input: "火球沿世界 x 轴接近固定 listener",
      expected: "声源距离变化可追踪，听感按配置变化且不依赖相机像素",
    },
    {
      label: "HUD 提示音",
      input: "触发不属于世界位置的升级界面提示",
      expected: "使用非空间或相对 listener 的播放策略，不因玩家坐标衰减",
    },
  ],
} satisfies CppGameBuildModel;

export function FireballsSpatializationPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function FireballsSpatializationFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function FireballsSpatializationFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
