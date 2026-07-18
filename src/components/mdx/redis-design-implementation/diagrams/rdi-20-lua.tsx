import { OfficialRedisDesignLab } from "./official-redis-design-lab";

const config = {
  unitTitle: "第20章 Lua脚本",
  focus:
    "检查Lua环境初始化、伪客户端、EVAL/EVALSHA、脚本缓存、管理命令与复制传播",
  invariant:
    "脚本在服务器中原子执行，Redis与Lua类型转换稳定，缓存摘要和复制传播对应同一脚本",
  artifact: "Lua环境图、脚本执行轨迹、缓存命中实验、超时与复制验证",
  nodes: [
    "创建并修改Lua环境",
    "Lua环境协作组件",
    "EVAL命令的实现",
    "EVALSHA命令的实现",
    "脚本管理命令的实现",
    "脚本复制",
    "重点回顾",
    "参考资料",
  ],
};

export function Rdi20LuaStructureLab() {
  return <OfficialRedisDesignLab {...config} mode="structure" />;
}

export function Rdi20LuaTraceLab() {
  return <OfficialRedisDesignLab {...config} mode="trace" />;
}

export function Rdi20LuaEvidenceLab() {
  return <OfficialRedisDesignLab {...config} mode="evidence" />;
}
