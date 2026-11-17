#!/usr/bin/env bash
set -e

echo "🚀 Starting OperateServices deployment..."

# Navigate to script directory
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --include=dev

echo "🔨 Building Next.js..."
npm run build

echo "♻️ Reloading PM2 process..."
pm2 reload ecosystem.config.cjs --update-env || pm2 start ecosystem.config.cjs

echo "💾 Saving PM2 process list..."
pm2 save

echo "✅ OperateServices successfully deployed!"
