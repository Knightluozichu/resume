import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const props = {
  "unitId": "rdi-20-lua",
  "unitTitle": "第20章 Lua脚本",
  "concepts": [
    "创建并修改Lua环境",
    "Lua环境协作组件",
    "EVAL命令的实现",
    "EVALSHA命令的实现",
    "脚本管理命令的实现",
    "脚本复制",
    "重点回顾",
    "参考资料"
  ],
  "stages": [
    "冻结3.0基线",
    "定位结构入口",
    "执行单变量变更",
    "注入边界故障",
    "恢复并对账"
  ],
  "focuses": [
    "创建并修改Lua环境",
    "Lua环境协作组件",
    "EVAL命令的实现",
    "EVALSHA命令的实现",
    "脚本管理命令的实现",
    "脚本复制"
  ],
  "model": {
    "studio": "Lua脚本缓存与传播台",
    "axisA": {
      "label": "调用方式",
      "levels": [
        "EVAL",
        "EVALSHA命中",
        "EVALSHA未命中"
      ]
    },
    "axisB": {
      "label": "脚本状态",
      "levels": [
        "短脚本",
        "长运行",
        "复制传播"
      ]
    },
    "fault": "让脚本执行阻塞事件循环却误判为并发，或缓存摘要与传播脚本不一致",
    "command": "rg 'evalGenericCommand|scriptCommand|scriptingInit' src/scripting.c",
    "practiceMode": "simulation",
    "outcomes": {
      "signal": "Lua脚本缓存与传播台一致率",
      "risk": "脚本状态分叉风险",
      "evidence": "四级证据闭环度"
    },
    "invariant": "脚本在服务器中原子执行，Redis与Lua类型转换稳定，缓存摘要和复制传播对应同一脚本",
    "task": "交付Lua环境图、脚本执行轨迹、缓存命中实验、超时与复制验证，并让未参与者用同一输入独立复现。",
    "riskEffects": [
      1,
      -1
    ]
  }
} as const;

export function Rdi20LuaStructureLab() {
  return <OfficialRedisDesignLab {...props} mode="structure" />;
}

export function Rdi20LuaTraceLab() {
  return <OfficialRedisDesignLab {...props} mode="trace" />;
}

export function Rdi20LuaEvidenceLab() {
  return <OfficialRedisDesignLab {...props} mode="evidence" />;
}
