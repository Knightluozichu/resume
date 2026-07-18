import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = [
  "附录C 比特币系统的编程接口",
  "C.1 比特币RESTAPI接口的启动",
  "C.1.1 快速启动一个RESTAPI的调用实例",
  "C.1.2 RESTAPI的请求参数和返回结果",
  "C.2 通过API接口发起交易",
  "C.3 本章小结",
] as const;

export function BdpAppendixCBitcoinApisFlowLab() {
  return (
    <OfficialBdpBookLab
      title="附录C 比特币系统的编程接口"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function BdpAppendixCBitcoinApisExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="附录C 比特币系统的编程接口"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function BdpAppendixCBitcoinApisEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="附录C 比特币系统的编程接口"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
