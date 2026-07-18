import { OfficialMfcLab } from "./official-mfc-lab";

const data = {
  title: "第9章 消息映射与命令传递",
  label: "第四篇 · 消息与命令",
  color: "#b91c1c",
  soft: "#fef2f2",
  chain: [
    "分类输入消息",
    "定位消息表",
    "匹配签名条目",
    "调用处理函数",
    "沿目标链续传",
    "更新命令UI",
  ],
  concepts: [
    "第9章 消息映射与命令传递",
    "到底要解决什么",
    "消息分类",
    "万流归宗Command Target（CCmdTarget）",
    "三个奇怪的宏，一张巨大的网",
    "DECLARE_MESSAGE_MAP宏",
    "消息映射网的形成：BEGIN…/ON…/END…宏",
    "米诺托斯（Minotauros）与西修斯（Theseus）",
    "二万五千里长征——消息的传递",
    "直线上溯（一般Windows消息）",
    "拐弯上溯（WM_COMMAND命令消息）",
    "罗塞达碑石：AfxSig_xx的奥秘",
    "Scribble Step2：UI对象的变化",
    "改变菜单",
    "改变工具栏",
    "利用ClassWizard连接命令项识别码与命令处理函数",
    "维护UI对象状态（UPDATE_COMMAND_UI）",
    "本章回顾",
  ],
} as const;

export function Mfc09MessageMapCommandRoutingMapLab() {
  return <OfficialMfcLab {...data} view="map" />;
}

export function Mfc09MessageMapCommandRoutingExperimentLab() {
  return <OfficialMfcLab {...data} view="experiment" />;
}

export function Mfc09MessageMapCommandRoutingEvidenceLab() {
  return <OfficialMfcLab {...data} view="evidence" />;
}
