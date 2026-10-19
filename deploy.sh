#!/usr/bin/env bash
# 原子发布：构建 → 独立 release → 候选端口冒烟 → 原子切换 → 公网复检 → 自动回滚。
set -euo pipefail
cd "$(dirname "$0")"
REMOTE_STATE=NOT_STARTED
DEPLOY_PHASE=arguments
interrupt_retain() {
  local reason="$1" code="$2"
  REMOTE_STATE=UNKNOWN_REMOTE_STATE
  # No remote command from an interruption handler; never invoke normal EXIT cleanup.
  trap '' TERM INT USR1
  trap - EXIT
  printf 'UNKNOWN_REMOTE_STATE reason=%s phase=%s release=%s; retain all possibly created releases; reconcile before any retry/delete/publish\n' "$reason" "$DEPLOY_PHASE" "${RELEASE_ID:-UNALLOCATED}" >&2
  if [[ -n "${CONTENT_EVIDENCE:-}" && -d "$CONTENT_EVIDENCE" ]]; then
    (set -C; printf '{"state":"UNKNOWN_REMOTE_STATE","reason":"%s","phase":"%s","release":"%s","exit":%s}\n' "$reason" "$DEPLOY_PHASE" "${RELEASE_ID:-UNALLOCATED}" "$code" > "$CONTENT_EVIDENCE/interrupt.json") || :
  fi
  exit "$code"
}
# Keep child status before conditional branches can normalize it to 1.
retain_uncertain() {
  local code="$1"
  case "$code" in
    124|130|137|143|255) interrupt_retain "UNCONFIRMED_EXIT_$code" "$code" ;;
  esac
}
# Also cover failures before the release cleanup trap is armed (including upload).
trap 'retain_uncertain "$?"' EXIT
trap 'interrupt_retain TERM 143' TERM
trap 'interrupt_retain INT 130' INT
trap 'interrupt_retain DEADLINE 124' USR1

SKIP_BUILD=false
ALLOW_INCOMPLETE=false
SKIP_VISUAL=false
BOOK_SLUG=""
while (( $# > 0 )); do
  case "$1" in
    --skip-build) SKIP_BUILD=true ;;
    --allow-incomplete) ALLOW_INCOMPLETE=true ;;
    --skip-visual) SKIP_VISUAL=true ;;
    --book)
      BOOK_SLUG="${2:-}"
      shift
      [[ -n "$BOOK_SLUG" ]] || { echo "✗ --book 缺少 slug" >&2; exit 2; }
      ;;
    -h|--help)
      echo "用法：./deploy.sh [--skip-build] [--allow-incomplete] [--skip-visual] --book <book-slug>"
      exit 0
      ;;
    *) echo "✗ 未知参数：$1" >&2; exit 2 ;;
  esac
  shift
done
[[ -n "$BOOK_SLUG" ]] || { echo "✗ 必须指定 --book" >&2; exit 2; }
[[ "$BOOK_SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "✗ 非法 book slug" >&2; exit 2; }
if [[ "$SKIP_VISUAL" == "true" && "$ALLOW_INCOMPLETE" != "true" ]]; then
  echo "✗ --skip-visual 只允许与 --allow-incomplete 一起使用" >&2
  exit 2
fi

[[ -f local.env ]] || { echo "✗ 缺少 local.env" >&2; exit 1; }
# shellcheck disable=SC1091
source local.env
DEPLOY_KEY="${DEPLOY_SSH_KEY:-${HOME}/.ssh/id_rsa}"
SSH_PORT="${SERVER_SSH_PORT:-22}"
SSH_HOST="${SERVER_SSH_USERNAME:-root}@${SERVER_PUBLIC_IP:?local.env 缺少 SERVER_PUBLIC_IP}"
SSH_OPTS=(-i "$DEPLOY_KEY" -p "$SSH_PORT" -o BatchMode=yes
  -o ConnectTimeout=10 -o ConnectionAttempts=1
  -o ServerAliveInterval=15 -o ServerAliveCountMax=2)
APP_DIR="/var/www/remuse"
CANDIDATE_PORT="${DEPLOY_CANDIDATE_PORT:-3199}"
# remuse 由 blog 子域反代到 3100；SSL_CERT_DOMAIN 是同机其他服务的证书元数据，
# 不能据此推断本站入口。需要覆盖时显式设置 DEPLOY_PUBLIC_URL。
PUBLIC_URL="${DEPLOY_PUBLIC_URL:-https://blog.${DNS_DOMAIN:?local.env 缺少 DNS_DOMAIN 或 DEPLOY_PUBLIC_URL}}"
COMMIT_SHA="$(git rev-parse HEAD)"
RELEASE_NONCE="$(node -e 'process.stdout.write(require("node:crypto").randomUUID())')"
[[ "$RELEASE_NONCE" =~ ^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$ ]] || { echo "✗ 非法 release nonce" >&2; exit 1; }
RELEASE_ID="release-$(date -u +%Y%m%dT%H%M%SZ)-${COMMIT_SHA:0:12}-${RELEASE_NONCE}"
RELEASE_DIR="${APP_DIR}/releases/${RELEASE_ID}"

DEPLOY_PHASE=gates
# 在耗时构建和远端切换前跑完整发布门禁（P0 方案 F）：
#  invariants（白名单/ledger/内容一致）→ audit --check（实时）→ visual（渲染+hash）
#  → tsc → internal-links。任一失败即停，杜绝“状态过期越狱”。
if [[ "$ALLOW_INCOMPLETE" == "true" ]]; then
  if [[ "$SKIP_VISUAL" == "true" ]]; then
    echo "⚠ 按用户明确授权，以部分上架模式发布 ${BOOK_SLUG}：本次复用已通过的视觉结果，执行内容/工程/远端检查，不伪造整书 published 状态。"
  else
    echo "⚠ 按用户明确授权，以部分上架模式发布 ${BOOK_SLUG}：不跳过内容/视觉/工程检查，不伪造整书 published 状态。"
  fi
  GATE_ARGS=(--book "$BOOK_SLUG" --allow-incomplete)
  [[ "$SKIP_VISUAL" == "true" ]] && GATE_ARGS+=(--skip-visual)
  node scripts/pre-publish-gate.mjs "${GATE_ARGS[@]}"
else
  node scripts/pre-publish-gate.mjs --book "$BOOK_SLUG"
  # 门禁通过后，再把书标记为可发布（check 模式验证 ledger 已更新到 passed）
  node scripts/mark-book-published.mjs --check --book "$BOOK_SLUG"
fi

# Assignment preserves the generator's actual exit status (process substitution does not).
SMOKE_OUTPUT="$(node scripts/release-smoke-paths.mjs --book "$BOOK_SLUG")"
[[ -n "$SMOKE_OUTPUT" ]] || { echo "✗ 冒烟路径为空" >&2; exit 1; }
SMOKE_PATHS=("/")
while IFS= read -r smoke_path; do
  [[ -n "$smoke_path" ]] && SMOKE_PATHS+=("$smoke_path")
done <<< "$SMOKE_OUTPUT"

# Prebuild proof: bind reviewed source BEFORE a fresh build, recheck after assembly.
# Required explicit reviewed inputs; no response-derived expectations or automatic approval.
: "${REMUSE_CONTENT_SPEC:?reviewed source expectation spec required}"
: "${REMUSE_CONTENT_SPEC_SHA256:?reviewed spec SHA256 required}"
: "${REMUSE_CONTENT_CHECKER_SHA256:?reviewed checker SHA256 required}"
: "${REMUSE_CONTENT_EVIDENCE_DIR:?new evidence parent required}"
CONTENT_EVIDENCE="${REMUSE_CONTENT_EVIDENCE_DIR}/${RELEASE_ID}"
mkdir -- "$CONTENT_EVIDENCE" # exclusive, never replace earlier contract/evidence
CONTENT_ARGS=(--project "$PWD" --spec "$REMUSE_CONTENT_SPEC"
  --spec-sha256 "$REMUSE_CONTENT_SPEC_SHA256" --checker-sha256 "$REMUSE_CONTENT_CHECKER_SHA256"
  --release "$RELEASE_ID" --commit "$COMMIT_SHA" --book "$BOOK_SLUG"
  --contract "$CONTENT_EVIDENCE/contract.json"
  --build-input "$CONTENT_EVIDENCE/build-input.json")
for route in "${SMOKE_PATHS[@]}"; do CONTENT_ARGS+=(--smoke-path "$route"); done
[[ "$SKIP_BUILD" != "true" ]] || { echo "✗ 正文证明禁止无凭据 --skip-build" >&2; exit 2; }
CONTENT_INPUT_SHA="$(python3 -B scripts/verify-release-content.py bind "${CONTENT_ARGS[@]}" \
  --report "$CONTENT_EVIDENCE/prebuild.json")"
[[ "$CONTENT_INPUT_SHA" =~ ^[0-9a-f]{64}$ ]] || { echo "✗ 无效构建前输入 SHA" >&2; exit 1; }
CONTENT_ARGS+=(--build-input-sha256 "$CONTENT_INPUT_SHA")

if [[ "$SKIP_BUILD" == "true" ]]; then
  for artifact in .next/BUILD_ID .next/standalone/server.js .next/static; do
    [[ -e "$artifact" ]] || { echo "✗ --skip-build 缺少构建产物：$artifact" >&2; exit 1; }
  done
  echo "==> [1/9] 复用已验证构建"
else
  echo "==> [1/9] 全量生产构建"
  DEPLOY_PHASE=build
  pnpm build
fi

echo "==> [2/9] 生成站内搜索索引"
DEPLOY_PHASE=search
node scripts/build-search-index.mjs --output-path .next/pagefind

echo "==> [3/9] 组装 standalone release"
mkdir -p .next/standalone/.next
rm -rf .next/standalone/.next/static .next/standalone/public
cp -R .next/static .next/standalone/.next/static
[[ ! -d public ]] || cp -R public .next/standalone/public
[[ ! -e .next/standalone/public/pagefind && ! -L .next/standalone/public/pagefind ]] || { echo "Unexpected assembled pagefind" >&2; exit 1; }
cp -R .next/pagefind .next/standalone/public/pagefind

DEPLOY_PHASE=prepare
CONTENT_CONTRACT_SHA="$(python3 -B scripts/verify-release-content.py prepare "${CONTENT_ARGS[@]}" \
  --report "$CONTENT_EVIDENCE/prepare.json")"
[[ "$CONTENT_CONTRACT_SHA" =~ ^[0-9a-f]{64}$ ]] || { echo "✗ 无效正文合同 SHA" >&2; exit 1; }

DEPLOY_PHASE=upload
REMOTE_STATE=POSSIBLY_CREATED
echo "==> [4/9] 上传独立 release：${RELEASE_ID}"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" "mkdir -p '$APP_DIR/releases' && mkdir -- '$RELEASE_DIR'"
# release 目录保持独立，但与 current 中未变化的大文件使用硬链接，避免每本书
# 都重新上传数 GB 的 node_modules；后续原子切换不会修改旧 release 内容。
REMOTE_LINK_DEST="$(ssh "${SSH_OPTS[@]}" "$SSH_HOST" "
  latest=\$(ls -1dt '$APP_DIR'/releases/release-* 2>/dev/null | grep -v '$RELEASE_DIR' | head -n 1 || true)
  if [ -n \"\$latest\" ]; then printf '%s' \"\$latest\"; else printf '%s' '$APP_DIR/current'; fi
")"
rsync -az --delete --link-dest="$REMOTE_LINK_DEST" -e "ssh ${SSH_OPTS[*]}" .next/standalone/ "$SSH_HOST:$RELEASE_DIR/"
rsync -az -e "ssh ${SSH_OPTS[*]}" deploy/ecosystem.config.cjs "$SSH_HOST:$APP_DIR/"

CANDIDATE_NAME="remuse-candidate-${RELEASE_ID}"
CANDIDATE_STARTED=false
CURRENT_SWITCHED=false
SWITCH_UNCONFIRMED=false
PREVIOUS_TARGET=""
RELEASE_SUCCESS=false
CANDIDATE_CLEANUP_UNCONFIRMED=false
cleanup_candidate() {
  [[ "$REMOTE_STATE" != "UNKNOWN_REMOTE_STATE" ]] || return 1
  DEPLOY_PHASE=cleanup
  # Do not retry an ambiguous cleanup from the EXIT trap. Retain for reconciliation.
  [[ "$CANDIDATE_CLEANUP_UNCONFIRMED" != "true" ]] || return 1
  if [[ "${CANDIDATE_STARTED:-false}" == "true" ]]; then
    # The marker exists only after a successful collision check in our exclusive release.
    # On uncertain SSH/PM2 state, retain the release rather than deleting a live cwd.
    if ssh "${SSH_OPTS[@]}" "$SSH_HOST" "
      set -eu
      [ -f '$RELEASE_DIR/.candidate-owned' ] || { echo 'Missing ownership marker; retain release' >&2; exit 1; }
      inventory=\$(pm2 jlist)
      candidate_id=\$(printf '%s' \"\$inventory\" | node -e '
        const fs = require(\"node:fs\");
        const [name, cwd] = process.argv.slice(1);
        const rows = JSON.parse(fs.readFileSync(0, \"utf8\"));
        if (!Array.isArray(rows)) throw Error(\"Invalid PM2 inventory\");
        const matches = rows.filter(p => p.name === name);
        if (matches.length === 0) throw Error(\"Candidate missing; cleanup unconfirmed, retain release\");
        const p = matches[0];
        if (matches.length !== 1 || p.pm2_env?.pm_cwd !== cwd ||
            p.pm2_env?.pm_exec_path !== cwd + \"/server.js\" ||
            !Number.isSafeInteger(p.pm_id) || p.pm_id < 0)
          throw Error(\"Candidate identity mismatch; retain release\");
        const referencesRelease = q => [q.pm2_env?.pm_cwd, q.pm2_env?.pm_exec_path]
          .some(v => typeof v === \"string\" && (v === cwd || v.startsWith(cwd + \"/\")));
        if (rows.some(q => q !== p && referencesRelease(q)))
          throw Error(\"Other process references release; retain release\");
        console.log(p.pm_id);
      ' '$CANDIDATE_NAME' '$RELEASE_DIR')
      [ -n \"\$candidate_id\" ] || exit 1
      pm2 delete \"\$candidate_id\" >/dev/null
      inventory=\$(pm2 jlist)
      printf '%s' \"\$inventory\" | node -e '
        const fs = require(\"node:fs\");
        const [name, cwd, id] = process.argv.slice(1);
        const rows = JSON.parse(fs.readFileSync(0, \"utf8\"));
        if (!Array.isArray(rows) || rows.some(p => p.name === name || String(p.pm_id) === id ||
            [p.pm2_env?.pm_cwd, p.pm2_env?.pm_exec_path].some(v =>
              typeof v === \"string\" && (v === cwd || v.startsWith(cwd + \"/\")))))
          throw Error(\"Candidate removal unconfirmed; retain release\");
      ' '$CANDIDATE_NAME' '$RELEASE_DIR' \"\$candidate_id\"
    "; then
      CANDIDATE_STARTED=false
    else
      local failure="$?"
      retain_uncertain "$failure"
      CANDIDATE_CLEANUP_UNCONFIRMED=true
      echo "✗ 候选清理未确认；保留 release：${RELEASE_DIR}" >&2
      return 1
    fi
  fi
}
cleanup_failed_release() {
  local failure="$?"
  retain_uncertain "$failure"
  [[ "$REMOTE_STATE" != "UNKNOWN_REMOTE_STATE" ]] || return 1
  local candidate_cleaned=true
  cleanup_candidate || candidate_cleaned=false
  if [[ "${RELEASE_SUCCESS:-false}" != "true" ]]; then
    local release_can_be_removed=true
    if [[ "${SWITCH_UNCONFIRMED:-false}" == "true" ]]; then
      # SSH failure is not proof that the remote mv did not commit. No blind rollback/retry.
      release_can_be_removed=false
      echo "✗ current 切换未确认；保留 release 待核实：${RELEASE_DIR}" >&2
    elif [[ "${CURRENT_SWITCHED:-false}" == "true" ]]; then
      release_can_be_removed=false
      DEPLOY_PHASE=rollback
      if [[ -n "${PREVIOUS_TARGET:-}" ]] && ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
        "rm -f '$APP_DIR/current.rollback' && ln -s '$PREVIOUS_TARGET' '$APP_DIR/current.rollback' && mv -Tf '$APP_DIR/current.rollback' '$APP_DIR/current' && cd '$APP_DIR' && pm2 startOrReload ecosystem.config.cjs --update-env >/dev/null && pm2 save --force >/dev/null"; then
        CURRENT_SWITCHED=false
        release_can_be_removed=true
        echo "↩ 已回滚到：${PREVIOUS_TARGET}" >&2
      else
        local rollback_failure="$?"
        retain_uncertain "$rollback_failure"
        echo "✗ 自动回滚失败；为避免 current 断链，保留 release：${RELEASE_DIR}" >&2
      fi
    fi
    if [[ "$release_can_be_removed" == "true" && "$candidate_cleaned" == "true" ]]; then
      # Acknowledged rollback alone is insufficient: recheck the canonical live target
      # immediately before removal in the same remote command. Unknown => retain.
      if ssh "${SSH_OPTS[@]}" "$SSH_HOST" "
        set -eu
        current_target=\$(readlink -f '$APP_DIR/current')
        release_target=\$(readlink -f '$RELEASE_DIR')
        [ -n \"\$current_target\" ] && [ -d \"\$current_target\" ] || exit 1
        [ -n \"\$release_target\" ] && [ -d \"\$release_target\" ] || exit 1
        case \"\$current_target/\" in \"\$release_target/\"*) echo 'Live current references release; retain' >&2; exit 1 ;; esac
        rm -rf -- '$RELEASE_DIR'
      "; then
        : # removal acknowledged; no retry
      else
        local removal_failure="$?"
        retain_uncertain "$removal_failure"
        echo "✗ release 删除未确认；不得重试，需核实：${RELEASE_DIR}" >&2
      fi
    fi
  fi
}
trap cleanup_failed_release EXIT

# Arm cleanup before startup, including a partial PM2 start followed by SSH failure.
CANDIDATE_STARTED=true
DEPLOY_PHASE=start
ssh "${SSH_OPTS[@]}" "$SSH_HOST" "
  set -eu
  inventory=\$(pm2 jlist)
  printf '%s' \"\$inventory\" | node -e '
    const fs = require(\"node:fs\");
    const [name] = process.argv.slice(1);
    const rows = JSON.parse(fs.readFileSync(0, \"utf8\"));
    if (!Array.isArray(rows) || rows.some(p => p.name === name))
      throw Error(\"Candidate name collision or invalid PM2 inventory\");
  ' '$CANDIDATE_NAME'
  : > '$RELEASE_DIR/.candidate-owned'
  cd '$RELEASE_DIR'
  PORT='$CANDIDATE_PORT' HOSTNAME=127.0.0.1 pm2 start server.js --name '$CANDIDATE_NAME' --cwd '$RELEASE_DIR' --update-env >/dev/null
"

check_remote_routes() {
  local port="$1"
  local route
  for route in "${SMOKE_PATHS[@]}"; do
    ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
      "curl -fsS -o /dev/null --max-time 15 'http://127.0.0.1:${port}${route}'" || {
        local failure="$?"
        retain_uncertain "$failure"
        return "$failure"
      }
  done
}

wait_for_candidate() {
  local attempt
  for attempt in {1..20}; do
    if ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
      "curl -fsS -o /dev/null --max-time 3 'http://127.0.0.1:${CANDIDATE_PORT}/'"; then
      return 0
    else
      local failure="$?"
      retain_uncertain "$failure" # never retry uncertain readiness
    fi
    sleep 1
  done
  return 1
}

echo "==> [5/9] 候选端口检查（首页、首/中/末章、静态资源）"
wait_for_candidate
check_remote_routes "$CANDIDATE_PORT"
STATIC_ASSET="$(ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "find '$RELEASE_DIR/.next/static' -type f | head -n 1")"
[[ "$STATIC_ASSET" == "$RELEASE_DIR"/* ]] || { echo "✗ 候选 release 缺少静态资源" >&2; exit 1; }
STATIC_ROUTE="/_next/static/${STATIC_ASSET#"$RELEASE_DIR/.next/static/"}"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "curl -fsS -o /dev/null --max-time 15 'http://127.0.0.1:${CANDIDATE_PORT}${STATIC_ROUTE}'"
cleanup_candidate

echo "==> [6/9] 原子切换 current"
PREVIOUS_TARGET="$(ssh "${SSH_OPTS[@]}" "$SSH_HOST" "
  set -eu
  if [ -L '$APP_DIR/current' ]; then
    readlink -f '$APP_DIR/current'
  elif [ -d '$APP_DIR/current' ]; then
    legacy='$APP_DIR/releases/legacy-$(date -u +%Y%m%dT%H%M%SZ)'
    mv '$APP_DIR/current' \"\$legacy\"
    printf '%s\\n' \"\$legacy\"
  fi
")"
# Arm uncertainty BEFORE any mutating switch request; a lost acknowledgement retains release.
DEPLOY_PHASE=switch
SWITCH_UNCONFIRMED=true
ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "rm -f '$APP_DIR/current.next' && ln -s '$RELEASE_DIR' '$APP_DIR/current.next' && mv -Tf '$APP_DIR/current.next' '$APP_DIR/current'"
CURRENT_SWITCHED=true
SWITCH_UNCONFIRMED=false

rollback() {
  local failure="$?" # first operation: status of internal/public/checker caller
  retain_uncertain "$failure"
  echo "✗ 发布复检失败，将由退出清理器回滚到：${PREVIOUS_TARGET}" >&2
  exit 1
}

DEPLOY_PHASE=reload
echo "==> [7/9] reload PM2 并检查内部端口"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "cd '$APP_DIR' && pm2 startOrReload ecosystem.config.cjs --update-env >/dev/null && pm2 save --force >/dev/null"
check_remote_routes 3100 || rollback

DEPLOY_PHASE=public-proof
echo "==> [8/9] 公网复检"
for route in "${SMOKE_PATHS[@]}"; do
  curl -fsS -o /dev/null --max-time 20 "${PUBLIC_URL%/}${route}" || rollback
done
curl -fsS -o /dev/null --max-time 20 "${PUBLIC_URL%/}${STATIC_ROUTE}" || rollback

# Existing public smoke remains above; substantive content/assets are additionally required.
# Ordinary mismatch follows guarded rollback; uncertain child exit retains before any rollback.
python3 -B scripts/verify-release-content.py verify "${CONTENT_ARGS[@]}" \
  --contract-sha256 "$CONTENT_CONTRACT_SHA" --origin "$PUBLIC_URL" \
  --report "$CONTENT_EVIDENCE/public-verification.json" || rollback

[[ "$REMOTE_STATE" != "UNKNOWN_REMOTE_STATE" ]] || interrupt_retain UNKNOWN 125
DEPLOY_PHASE=success-prune
echo "==> [9/9] 标记成功并仅保留最近 3 个成功 release"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" "
  set -eu
  touch '$RELEASE_DIR/.successful'
  kept=0
  for dir in \$(ls -1dt '$APP_DIR'/releases/release-* 2>/dev/null || true); do
    [ -f \"\$dir/.successful\" ] || continue
    kept=\$((kept + 1))
    if [ \"\$kept\" -gt 3 ]; then
      case \"\$dir\" in '$APP_DIR'/releases/release-*) rm -rf -- \"\$dir\" ;; esac
    fi
  done
"
if [[ "$ALLOW_INCOMPLETE" == "true" ]]; then
  echo "⚠ 部分上架完成：保留 publication ledger 的 passed 状态，等待剩余章节完成后再标记整书 published。"
else
  [[ "$REMOTE_STATE" != "UNKNOWN_REMOTE_STATE" ]] || interrupt_retain UNKNOWN 125
  DEPLOY_PHASE=publication
  node scripts/mark-book-published.mjs --book "$BOOK_SLUG" --release "$RELEASE_ID" --commit "$COMMIT_SHA"
fi
RELEASE_SUCCESS=true
trap - EXIT
echo "✓ 发布成功：book=${BOOK_SLUG} commit=${COMMIT_SHA} release=${RELEASE_ID} url=${PUBLIC_URL}"
