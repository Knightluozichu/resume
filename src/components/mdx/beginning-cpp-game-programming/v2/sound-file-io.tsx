"use client";

import { CppGameBuildLab, type CppGameBuildModel } from "./cpp-game-build-lab";

const model = {
  unitId: "bcgp3-14",
  title: "第 14 章：音效、文件 I/O 与完成 Zombie Arena",
  focus:
    "把最高分文件 I/O、SoundBuffer/Sound 生命周期、升级、新波次与重启组织成可失败且可恢复的提交",
  invariant:
    "高分文件只在完整解析后替换内存状态，SoundBuffer 在 Sound 播放期间存活，重启清空本局瞬态状态",
  fault: "直接覆盖高分文件后写入中断，下一次启动读取到半条数据并当作合法分数",
  evidence:
    "临时文件内容、解析结果、替换动作、音频缓冲地址、播放事件和重启前后状态快照",
  concepts: [
    "文件 io（file i/o）",
    "保存和加载最高分（saving and loading the high score）",
    "音效（sound effects）",
    "升级（level up）",
    "重启游戏（restarting the game）",
  ],
  zones: [
    {
      label: "持久化",
      detail: "读取、验证、临时写入与原子替换",
    },
    {
      label: "音频反馈",
      detail: "SoundBuffer 所有权、Sound 与触发事件",
    },
    {
      label: "回合推进",
      detail: "升级、新波次、死亡与重启",
    },
  ],
  trace: ["读取并验证", "更新游戏状态", "触发声音", "写临时文件", "提交或回滚"],
  scenarios: [
    {
      label: "保存新高分",
      input: "本局分数高于已验证的磁盘高分",
      expected: "完整新值先写临时文件，成功后再替换旧文件",
    },
    {
      label: "损坏存档启动",
      input: "高分文件包含非数字或不完整内容",
      expected: "程序报告并采用安全默认值，不让解析失败污染游戏状态",
    },
  ],
} satisfies CppGameBuildModel;

export function SoundFileIoPipelineLab() {
  return <CppGameBuildLab model={model} view="pipeline" />;
}

export function SoundFileIoFrameLab() {
  return <CppGameBuildLab model={model} view="frame" />;
}

export function SoundFileIoFaultLab() {
  return <CppGameBuildLab model={model} view="fault" />;
}
