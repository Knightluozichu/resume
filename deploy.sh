#!/usr/bin/env bash
# 原子发布：构建 → 独立 release → 候选端口冒烟 → 原子切换 → 公网复检 → 自动回滚。
set -euo pipefail
cd "$(dirname "$0")"

SKIP_BUILD=false
BOOK_SLUG=""
while (( $# > 0 )); do
  case "$1" in
    --skip-build) SKIP_BUILD=true ;;
    --book)
      BOOK_SLUG="${2:-}"
      shift
      [[ -n "$BOOK_SLUG" ]] || { echo "✗ --book 缺少 slug" >&2; exit 2; }
      ;;
    -h|--help)
      echo "用法：./deploy.sh [--skip-build] --book <book-slug>"
      exit 0
      ;;
    *) echo "✗ 未知参数：$1" >&2; exit 2 ;;
  esac
  shift
done
[[ -n "$BOOK_SLUG" ]] || { echo "✗ 必须指定 --book" >&2; exit 2; }
[[ "$BOOK_SLUG" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "✗ 非法 book slug" >&2; exit 2; }

[[ -f local.env ]] || { echo "✗ 缺少 local.env" >&2; exit 1; }
# shellcheck disable=SC1091
source local.env
DEPLOY_KEY="${DEPLOY_SSH_KEY:-${HOME}/.ssh/id_rsa}"
SSH_PORT="${SERVER_SSH_PORT:-22}"
SSH_HOST="${SERVER_SSH_USERNAME:-root}@${SERVER_PUBLIC_IP:?local.env 缺少 SERVER_PUBLIC_IP}"
SSH_OPTS=(-i "$DEPLOY_KEY" -p "$SSH_PORT" -o BatchMode=yes)
APP_DIR="/var/www/remuse"
CANDIDATE_PORT="${DEPLOY_CANDIDATE_PORT:-3199}"
# remuse 由 blog 子域反代到 3100；SSL_CERT_DOMAIN 是同机其他服务的证书元数据，
# 不能据此推断本站入口。需要覆盖时显式设置 DEPLOY_PUBLIC_URL。
PUBLIC_URL="${DEPLOY_PUBLIC_URL:-https://blog.${DNS_DOMAIN:?local.env 缺少 DNS_DOMAIN 或 DEPLOY_PUBLIC_URL}}"
COMMIT_SHA="$(git rev-parse HEAD)"
RELEASE_ID="release-$(date -u +%Y%m%dT%H%M%SZ)-${COMMIT_SHA:0:12}"
RELEASE_DIR="${APP_DIR}/releases/${RELEASE_ID}"

# 在耗时构建和远端切换前确认整本书已经通过门禁，避免发布完成后才发现
# 本地台账不可登记。
node scripts/mark-book-published.mjs --check --book "$BOOK_SLUG"

SMOKE_PATHS=("/")
while IFS= read -r smoke_path; do
  [[ -n "$smoke_path" ]] && SMOKE_PATHS+=("$smoke_path")
done < <(node scripts/release-smoke-paths.mjs --book "$BOOK_SLUG")

if [[ "$SKIP_BUILD" == "true" ]]; then
  for artifact in .next/BUILD_ID .next/standalone/server.js .next/static; do
    [[ -e "$artifact" ]] || { echo "✗ --skip-build 缺少构建产物：$artifact" >&2; exit 1; }
  done
  echo "==> [1/9] 复用已验证构建"
else
  echo "==> [1/9] 全量生产构建"
  pnpm build
fi

echo "==> [2/9] 生成站内搜索索引"
node scripts/build-search-index.mjs

echo "==> [3/9] 组装 standalone release"
mkdir -p .next/standalone/.next
rm -rf .next/standalone/.next/static .next/standalone/public
cp -R .next/static .next/standalone/.next/static
[[ ! -d public ]] || cp -R public .next/standalone/public

echo "==> [4/9] 上传独立 release：${RELEASE_ID}"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" "mkdir -p '$RELEASE_DIR' '$APP_DIR/releases'"
# release 目录保持独立，但与 current 中未变化的大文件使用硬链接，避免每本书
# 都重新上传数 GB 的 node_modules；后续原子切换不会修改旧 release 内容。
REMOTE_LINK_DEST="$(ssh "${SSH_OPTS[@]}" "$SSH_HOST" "
  latest=\$(ls -1dt '$APP_DIR'/releases/release-* 2>/dev/null | grep -v '$RELEASE_DIR' | head -n 1 || true)
  if [ -n \"\$latest\" ]; then printf '%s' \"\$latest\"; else printf '%s' '$APP_DIR/current'; fi
")"
rsync -az --delete --link-dest="$REMOTE_LINK_DEST" -e "ssh ${SSH_OPTS[*]}" .next/standalone/ "$SSH_HOST:$RELEASE_DIR/"
rsync -az -e "ssh ${SSH_OPTS[*]}" deploy/ecosystem.config.cjs "$SSH_HOST:$APP_DIR/"

CANDIDATE_NAME="remuse-candidate-${COMMIT_SHA:0:12}"
CANDIDATE_STARTED=false
CURRENT_SWITCHED=false
PREVIOUS_TARGET=""
RELEASE_SUCCESS=false
ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "pm2 delete '$CANDIDATE_NAME' >/dev/null 2>&1 || true; cd '$RELEASE_DIR' && PORT='$CANDIDATE_PORT' HOSTNAME=127.0.0.1 pm2 start server.js --name '$CANDIDATE_NAME' --cwd '$RELEASE_DIR' --update-env >/dev/null"
CANDIDATE_STARTED=true
cleanup_candidate() {
  if [[ "${CANDIDATE_STARTED:-false}" == "true" ]]; then
    ssh "${SSH_OPTS[@]}" "$SSH_HOST" "pm2 delete '$CANDIDATE_NAME' >/dev/null 2>&1 || true" || true
    CANDIDATE_STARTED=false
  fi
}
cleanup_failed_release() {
  cleanup_candidate
  if [[ "${RELEASE_SUCCESS:-false}" != "true" ]]; then
    local release_can_be_removed=true
    if [[ "${CURRENT_SWITCHED:-false}" == "true" ]]; then
      release_can_be_removed=false
      if [[ -n "${PREVIOUS_TARGET:-}" ]] && ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
        "rm -f '$APP_DIR/current.rollback' && ln -s '$PREVIOUS_TARGET' '$APP_DIR/current.rollback' && mv -Tf '$APP_DIR/current.rollback' '$APP_DIR/current' && cd '$APP_DIR' && pm2 startOrReload ecosystem.config.cjs --update-env >/dev/null && pm2 save --force >/dev/null"; then
        CURRENT_SWITCHED=false
        release_can_be_removed=true
        echo "↩ 已回滚到：${PREVIOUS_TARGET}" >&2
      else
        echo "✗ 自动回滚失败；为避免 current 断链，保留 release：${RELEASE_DIR}" >&2
      fi
    fi
    if [[ "$release_can_be_removed" == "true" ]]; then
      ssh "${SSH_OPTS[@]}" "$SSH_HOST" "rm -rf -- '$RELEASE_DIR'" || true
    fi
  fi
}
trap cleanup_failed_release EXIT

check_remote_routes() {
  local port="$1"
  local route
  for route in "${SMOKE_PATHS[@]}"; do
    ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
      "curl -fsS -o /dev/null --max-time 15 'http://127.0.0.1:${port}${route}'" || return 1
  done
}

wait_for_candidate() {
  local attempt
  for attempt in {1..20}; do
    if ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
      "curl -fsS -o /dev/null --max-time 3 'http://127.0.0.1:${CANDIDATE_PORT}/'"; then
      return 0
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
ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "rm -f '$APP_DIR/current.next' && ln -s '$RELEASE_DIR' '$APP_DIR/current.next' && mv -Tf '$APP_DIR/current.next' '$APP_DIR/current'"
CURRENT_SWITCHED=true

rollback() {
  echo "✗ 发布复检失败，将由退出清理器回滚到：${PREVIOUS_TARGET}" >&2
  exit 1
}

echo "==> [7/9] reload PM2 并检查内部端口"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "cd '$APP_DIR' && pm2 startOrReload ecosystem.config.cjs --update-env >/dev/null && pm2 save --force >/dev/null"
check_remote_routes 3100 || rollback

echo "==> [8/9] 公网复检"
for route in "${SMOKE_PATHS[@]}"; do
  curl -fsS -o /dev/null --max-time 20 "${PUBLIC_URL%/}${route}" || rollback
done
curl -fsS -o /dev/null --max-time 20 "${PUBLIC_URL%/}${STATIC_ROUTE}" || rollback

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
node scripts/mark-book-published.mjs --book "$BOOK_SLUG" --release "$RELEASE_ID" --commit "$COMMIT_SHA"
RELEASE_SUCCESS=true
trap - EXIT
echo "✓ 发布成功：book=${BOOK_SLUG} commit=${COMMIT_SHA} release=${RELEASE_ID} url=${PUBLIC_URL}"
