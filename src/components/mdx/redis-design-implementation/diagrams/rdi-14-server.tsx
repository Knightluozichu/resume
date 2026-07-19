import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-14-server",
  "unitTitle": "第14章 服务器",
  "concepts": [
    "命令请求的执行过程",
    "serverCron函数",
    "初始化服务器",
    "重点回顾"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "命令请求的执行过程",
    "serverCron函数",
    "初始化服务器",
    "恢复不变量",
    "结构字段",
    "控制流"
  ],
  "model": {
    "studio": "命令执行与serverCron时序台",
    "axisA": {
      "label": "请求阶段",
      "levels": [
        "解析",
        "预检查",
        "命令调用"
      ]
    },
    "axisB": {
      "label": "服务器状态",
      "levels": [
        "正常",
        "载入或只读",
        "后台任务"
      ]
    },
    "fault": "绕过预执行检查直接调用命令，或初始化失败后继续接受请求",
    "command": "rg 'processCommand|call|serverCron|initServer' src/server.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "命令执行与serverCron时序台一致率",
      "risk": "服务器状态分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "命令查找、权限与状态检查先于执行，统计和传播围绕同一调用，初始化失败不留下半可用服务",
    "task": "交付命令执行时序、serverCron职责表、启动阶段日志与失败注入，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi14ServerStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi14ServerTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi14ServerEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
