"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

const QUEUE_POOL = ["INCR counter", "SET user:1 admin", "LPUSH queue x", "HSET h f v", "DECR counter", "DEL temp:1"];

export function RdiTransactionLab() {
  const [queue, setQueue] = useState<string[]>([]);
  const [inMulti, setInMulti] = useState(false);
  const [watchedKey, setWatchedKey] = useState("counter");
  const [keyVersion, setKeyVersion] = useState(1);
  const [executed, setExecuted] = useState<string[]>([]);
  const [aborted, setAborted] = useState(false);
  const [nextCmd, setNextCmd] = useState(0);
  const [log, setLog] = useState<string[]>([
    "事务：MULTI 后命令入队不执行；EXEC 一次性顺序执行。WATCH 监视键，被改则放弃。",
  ]);

  const beginMulti = useCallback(() => {
    setInMulti(true);
    setAborted(false);
    setLog((prev) => [...prev, "MULTI：进入事务模式，后续命令只入队不执行。"]);
  }, []);

  const enqueue = useCallback(() => {
    if (!inMulti) return;
    const cmd = QUEUE_POOL[nextCmd % QUEUE_POOL.length];
    setNextCmd((p) => p + 1);
    setQueue((prev) => [...prev, cmd]);
    setLog((prev) => [...prev, `入队 "${cmd}"（等待 EXEC 执行）。`]);
  }, [inMulti, nextCmd]);

  const modifyWatched = useCallback(() => {
    setKeyVersion((p) => p + 1);
    setLog((prev) => [...prev, `⚠️ 其他客户端修改了 WATCH 的键 "${watchedKey}"（version ${keyVersion}→${keyVersion + 1}）。`]);
  }, [watchedKey, keyVersion]);

  const exec = useCallback(() => {
    if (!inMulti) return;
    if (keyVersion > 1) {
      setAborted(true);
      setInMulti(false);
      setLog((prev) => [...prev, `EXEC：检测到 WATCH 键 "${watchedKey}" 已被修改，事务整体放弃（乐观锁）。`]);
      return;
    }
    setExecuted((prev) => [...prev, ...queue]);
    setLog((prev) => [...prev, `EXEC：顺序执行 ${queue.length} 条命令，全部成功。`]);
    setQueue([]);
    setInMulti(false);
  }, [inMulti, queue, keyVersion, watchedKey]);

  const reset = useCallback(() => {
    setQueue([]);
    setInMulti(false);
    setWatchedKey("counter");
    setKeyVersion(1);
    setExecuted([]);
    setAborted(false);
    setNextCmd(0);
    setLog(["事务：MULTI 后命令入队不执行；EXEC 一次性顺序执行。WATCH 监视键，被改则放弃。"]);
  }, []);

  const viewW = 820;
  const viewH = 340;
  const boxW = 200;
  const boxH = 42;
  const startY = 110;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ MULTI / EXEC / WATCH 事务机制</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="事务机制">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            命令队列 + WATCH 乐观锁（状态：{inMulti ? "MULTI 中" : aborted ? "❌ 已放弃" : "空闲"}）
          </text>

          {/* WATCH 面板 */}
          <rect x={40} y={70} width={300} height={44} rx={8} fill={C.elevated} stroke={keyVersion > 1 ? C.danger : C.border} strokeWidth={1.5} />
          <text x={56} y={88} fontSize={11} fontWeight={600} fill={C.primary}>WATCH {watchedKey}</text>
          <text x={56} y={105} fontSize={11} fill={keyVersion > 1 ? C.danger : C.secondary}>
            version = {keyVersion} {keyVersion > 1 ? "（已被其他客户端修改！）" : "（未被修改）"}
          </text>

          {/* 命令队列 */}
          <text x={40} y={150} fontSize={11} fill={C.secondary} fontWeight={600}>
            命令队列（{queue.length} 条）
          </text>
          {queue.slice(0, 6).map((cmd, i) => (
            <rect key={i} x={40} y={156 + i * 30} width={240} height={26} rx={4} fill={C.accent} opacity={0.15} stroke={C.accent} strokeWidth={1} />
          ))}
          {queue.slice(0, 6).map((cmd, i) => (
            <text key={`t${i}`} x={52} y={174 + i * 30} fontSize={11} fill={C.primary} fontFamily="monospace">{cmd}</text>
          ))}
          {queue.length === 0 && (
            <text x={40} y={176} fontSize={11} fill={C.secondary}>空（MULTI 后入队的命令在这里等待）</text>
          )}

          {/* 执行结果 */}
          <text x={420} y={150} fontSize={11} fill={C.secondary} fontWeight={600}>
            EXEC 结果
          </text>
          <rect x={420} y={156} width={360} height={Math.max(60, executed.length * 24 + 12)} rx={6} fill={C.bg} stroke={C.border} strokeWidth={1} />
          {executed.length === 0 ? (
            <text x={432} y={180} fontSize={11} fill={C.secondary}>
              {aborted ? "❌ 事务放弃：WATCH 键被修改" : "尚未执行"}
            </text>
          ) : (
            executed.slice(-6).map((cmd, i) => (
              <text key={`e${i}`} x={432} y={180 + i * 24} fontSize={11} fill={C.success} fontFamily="monospace">
                ✓ {cmd}
              </text>
            ))
          )}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={beginMulti}
            disabled={inMulti}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10 disabled:opacity-40"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            MULTI
          </button>
          <button
            onClick={enqueue}
            disabled={!inMulti}
            className="rounded-control border border-success px-3 py-1.5 text-xs font-medium transition-colors hover:bg-success/10 disabled:opacity-40"
            style={{ color: C.success, borderColor: C.success }}
          >
            入队命令
          </button>
          <button
            onClick={modifyWatched}
            className="rounded-control border border-danger px-3 py-1.5 text-xs font-medium transition-colors hover:bg-danger/10"
            style={{ color: C.danger, borderColor: C.danger }}
          >
            模拟其他客户端改 WATCH 键
          </button>
          <button
            onClick={exec}
            disabled={!inMulti}
            className="rounded-control border border-warning px-3 py-1.5 text-xs font-medium transition-colors hover:bg-warning/10 disabled:opacity-40"
            style={{ color: C.warning, borderColor: C.warning }}
          >
            EXEC
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 说明 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs leading-relaxed" style={{ color: C.secondary }}>
            Redis 事务不支持回滚：EXEC 时某条命令失败，其余命令照常执行。WATCH 实现乐观锁——EXEC 前检查被监视键版本，被修改则整体放弃，客户端重试即可。多命令原子性要求高时优先用 Lua 脚本。
          </div>
        </div>

        {/* 日志 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>操作日志</div>
          <ol className="flex flex-col gap-1 text-xs" style={{ color: C.secondary }}>
            {log.map((line, i) => (
              <li key={i} className="leading-relaxed">
                <span className="mr-1 font-mono" style={{ color: C.accent }}>{i + 1}.</span>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}