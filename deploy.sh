#!/usr/bin/env bash
# remuse 部署脚本：本地 build → 组装 standalone → rsync → pm2 reload
# 用法：./deploy.sh
# 连接参数从 local.env 读取（永不进 git）；SSH 走密钥认证，脚本不含任何明文密钥。
set -euo pipefail
cd "$(dirname "$0")"

# ---- 读取连接参数 ----
if [[ ! -f local.env ]]; then
  echo "✗ 缺少 local.env" >&2
  exit 1
fi
# shellcheck disable=SC1091
source local.env
SSH_KEY="${DEPLOY_SSH_KEY:-$HOME/.ssh/id_rsa}"
SSH_PORT="${SERVER_SSH_PORT:-22}"
SSH_HOST="${SERVER_SSH_USERNAME:-root}@${SERVER_PUBLIC_IP:?local.env 缺少 SERVER_PUBLIC_IP}"
SSH_OPTS=(-i "$SSH_KEY" -p "$SSH_PORT" -o BatchMode=yes)
APP_DIR="/var/www/remuse"

echo "==> [1/6] 本地构建 (next build, standalone)"
pnpm build

echo "==> [2/6] 构建期生成 pagefind 站内搜索索引 → public/pagefind"
# 必须在 build 之后（要吃 .next/server/app 的 SSG HTML）、组装 standalone 之前
# （索引落在 public/pagefind，由下一步的 `cp -r public` 一并带入 standalone）。
# 脚本：扁平 SSG HTML → URL 树 staging → pagefind 索引（见 scripts/build-search-index.mjs）。
node scripts/build-search-index.mjs

echo "==> [3/6] 组装 standalone 产物（并入 static 与 public，含 pagefind 索引）"
# next build 每次重建 .next，standalone 为全新目录；静态资源与 public 需手动并入。
# public/pagefind 即上一步生成的搜索索引，随 public 一起进 standalone → 上线后静态服务 /pagefind/*。
cp -r .next/static .next/standalone/.next/
if [[ -d public ]]; then
  cp -r public .next/standalone/
fi

echo "==> [4/6] 同步 pm2 配置"
rsync -az -e "ssh ${SSH_OPTS[*]}" deploy/ecosystem.config.cjs "${SSH_HOST}:${APP_DIR}/"

echo "==> [5/6] 同步应用产物到 ${APP_DIR}/current/"
rsync -az --delete -e "ssh ${SSH_OPTS[*]}" .next/standalone/ "${SSH_HOST}:${APP_DIR}/current/"

echo "==> [6/6] pm2 startOrReload（幂等：无则启，有则热重载）"
ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "cd '$APP_DIR' && pm2 startOrReload ecosystem.config.cjs --update-env && pm2 save --force >/dev/null"

echo "==> 自检：内部端口健康检查"
CODE=$(ssh "${SSH_OPTS[@]}" "$SSH_HOST" \
  "curl -fsS -o /dev/null -w '%{http_code}' --max-time 10 http://127.0.0.1:3100/ || echo FAIL")
if [[ "$CODE" == "200" ]]; then
  echo "✓ 部署成功 — http://127.0.0.1:3100/ 返回 200"
else
  echo "✗ 健康检查失败（返回 $CODE）。排查：ssh \$SSH_HOST 'pm2 logs remuse --lines 50'" >&2
  exit 1
fi
