#!/bin/bash

# NeuroLearn GitHub Repository Setup Script
# This script helps you create and push the repository to GitHub

echo "🚀 NeuroLearn GitHub Repository Setup"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: Please run this script from the NeuroLearn project root directory"
    exit 1
fi

echo "📋 Current project status:"
echo "- Project files: ✅ Found"
echo "- Git repository: $(git rev-parse --is-inside-work-tree 2>/dev/null && echo '✅ Initialized' || echo '❌ Not initialized')"
echo "- Commits: $(git rev-list --count HEAD 2>/dev/null || echo '0') commits"
echo ""

# Get GitHub username
echo "🔧 GitHub Repository Setup"
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ Error: GitHub username is required"
    exit 1
fi

# Repository details
REPO_NAME="neurolearn"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo ""
echo "📊 Repository Details:"
echo "- Username: $GITHUB_USERNAME"
echo "- Repository: $REPO_NAME"
echo "- URL: $REPO_URL"
echo ""

# Check if remote already exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "⚠️  Git remote 'origin' already exists:"
    git remote get-url origin
    echo ""
    read -p "Do you want to update it? (y/n): " UPDATE_REMOTE
    if [[ $UPDATE_REMOTE =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
        echo "✅ Remote updated to: $REPO_URL"
    fi
else
    git remote add origin "$REPO_URL"
    echo "✅ Added remote: $REPO_URL"
fi

echo ""
echo "🚀 Ready to push to GitHub!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com and create a new repository named 'neurolearn'"
echo "   - DON'T initialize with README, .gitignore, or license (we already have these)"
echo "   - You can make it private or public"
echo ""
echo "2. After creating the repository, press Enter to push..."
read -p "Press Enter when you've created the GitHub repository..."

echo ""
echo "📤 Pushing to GitHub..."

# Ensure we're on main branch
git branch -M main

# Push to GitHub
if git push -u origin main; then
    echo ""
    echo "🎉 SUCCESS! Your NeuroLearn repository has been created on GitHub!"
    echo ""
    echo "📚 Repository URL: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo ""
    echo "🔄 For future commits, use these commands:"
    echo "   git add ."
    echo "   git commit -m 'your commit message'"
    echo "   git push"
    echo ""
    echo "📋 What's included in your repository:"
    echo "   ✅ Complete microservices architecture"
    echo "   ✅ Authentication service with COPPA/FERPA compliance"
    echo "   ✅ Docker configuration for development"
    echo "   ✅ Database schema for educational data"
    echo "   ✅ CI/CD pipeline with accessibility testing"
    echo "   ✅ Comprehensive documentation"
    echo "   ✅ Issue templates for bug reports and features"
    echo ""
    echo "🎯 Next development steps:"
    echo "   1. Complete the authentication service implementation"
    echo "   2. Build the student learning interface"
    echo "   3. Implement AI adaptation features"
    echo "   4. Add accessibility framework"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to push to GitHub"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "1. Make sure you created the repository on GitHub first"
    echo "2. Check that the repository name is exactly 'neurolearn'"
    echo "3. Verify your GitHub username is correct: $GITHUB_USERNAME"
    echo "4. Try running: git push -u origin main"
    echo ""
fi

echo "🌟 Welcome to NeuroLearn development!"
