#!/bin/bash

# Diagnosis script for blank page issue
# Run this in your project root: bash diagnose.sh

echo "🔍 NeuroFlow AI - Diagnostics"
echo "=============================="
echo ""

# Check Node.js version
echo "✓ Node.js version:"
node --version
echo ""

# Check npm version
echo "✓ npm version:"
npm --version
echo ""

# Check if node_modules exists
echo "✓ Checking node_modules..."
if [ -d "node_modules" ]; then
    echo "  ✅ node_modules EXISTS"
else
    echo "  ❌ node_modules MISSING - Run: npm install --legacy-peer-deps"
fi
echo ""

# Check critical files
echo "✓ Checking critical files..."
files=("app/page.tsx" "app/layout.tsx" "app/globals.css" "next.config.js" "tailwind.config.js" "package.json")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file MISSING"
    fi
done
echo ""

# Check for TypeScript config files (should NOT exist)
echo "✓ Checking TypeScript config files (should be deleted)..."
if [ -f "next.config.ts" ]; then
    echo "  ❌ next.config.ts exists (DELETE THIS: rm next.config.ts)"
else
    echo "  ✅ next.config.ts removed ✓"
fi

if [ -f "tailwind.config.ts" ]; then
    echo "  ❌ tailwind.config.ts exists (DELETE THIS: rm tailwind.config.ts)"
else
    echo "  ✅ tailwind.config.ts removed ✓"
fi
echo ""

# Check if dependencies are installed
echo "✓ Checking dependencies..."
packages=("next" "react" "framer-motion" "tailwindcss")
for pkg in "${packages[@]}"; do
    if npm list "$pkg" > /dev/null 2>&1; then
        version=$(npm list "$pkg" 2>/dev/null | grep "$pkg@" | head -n1 | sed 's/.*@//' | cut -d' ' -f1)
        echo "  ✅ $pkg@$version"
    else
        echo "  ❌ $pkg NOT INSTALLED - Run: npm install --legacy-peer-deps"
    fi
done
echo ""

# Summary
echo "=============================="
echo "📋 Summary:"
echo ""
echo "If you see ❌ marks, run:"
echo ""
echo "  npm install --legacy-peer-deps"
echo "  rm -rf .next"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "If still blank, open DevTools (F12) → Console"
echo "and send me the error messages."