#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
DASHBOARD_DIR="$ROOT_DIR/dashboard"
PORT=3000

say() {
  printf "[HTMLCraft] %s\n" "$1"
}

fail() {
  printf "[HTMLCraft] 错误：%s\n" "$1" >&2
  exit 1
}

command -v node >/dev/null 2>&1 || fail "未检测到 Node.js，请先安装 Node.js。"
command -v npm >/dev/null 2>&1 || fail "未检测到 npm，请先安装 npm。"
command -v python3 >/dev/null 2>&1 || say "未检测到 python3，dashboard 可启动，但部分审计脚本可能不可用。"

[ -d "$DASHBOARD_DIR" ] || fail "未找到 dashboard 目录。请把本脚本放在 htmlcraft 项目根目录。"
[ -f "$DASHBOARD_DIR/package.json" ] || fail "未找到 dashboard/package.json。"
[ -f "$DASHBOARD_DIR/server.js" ] || fail "未找到 dashboard/server.js。"

if [ ! -d "$DASHBOARD_DIR/node_modules" ]; then
  say "首次运行，正在安装 dashboard 依赖..."
  (cd "$DASHBOARD_DIR" && npm install)
else
  say "检测到 node_modules，跳过依赖安装。"
fi

if lsof -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  say "端口 $PORT 已被占用。下面是占用进程："
  lsof -iTCP:"$PORT" -sTCP:LISTEN || true
  fail "请先关闭占用 $PORT 的进程，或改 dashboard/server.js 的端口。"
fi

say "启动本地仪表盘..."
say "项目根目录：$ROOT_DIR"
say "访问地址：http://localhost:$PORT"

cd "$DASHBOARD_DIR"
node server.js --open
