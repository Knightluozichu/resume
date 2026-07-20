import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-20-program-loading",
  title: "第20章 加载程序",
  concepts: [
    "第20章 加载程序",
    "20.1 加载ELF段",
    "20.2 动态链接过程",
    "20.3 动态加载",
    "20.4 GNU ld的链接",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "ELF段映射与加载台",
    boundary: "program headers → mmap/protection → dynamic linker → entry",
    axisA: {
      label: "加载阶段",
      levels: ["映射", "重定位", "入口转移"],
    },
    axisB: {
      label: "观察方式",
      levels: ["readelf", "LD_DEBUG", "进程映射"],
    },
    fault: "用节表解释运行期映射或忽略W^X权限",
    invariant: "PT_LOAD范围、权限、动态依赖和入口地址与运行映射一致",
    probe: "readelf -l -d app\nLD_DEBUG=libs,reloc ./app\ncat /proc/PID/maps",
    signal: "程序头、加载器轨迹与映射权限",
    artifact: "加载过程时间线",
    trap: "加载器主要消费程序头而不是调试用节名",
    practiceMode: "code",
    task: "第20章 加载程序固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变加载阶段或观察方式。",
  },
} as const;

export function Crc20ProgramLoadingMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc20ProgramLoadingExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc20ProgramLoadingEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
