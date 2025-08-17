#!/bin/bash

# One-click GitHub repository creation for NeuroLearn
echo "🚀 Creating NeuroLearn repository on GitHub..."

# Open GitHub create repository page with pre-filled data
echo "📋 Opening GitHub repository creation page..."
open "https://github.com/new?name=neurolearn&description=AI-powered+educational+platform+for+neurodiverse+students&visibility=public"

echo ""
echo "🎯 Repository settings (will be pre-filled):"
echo "   - Name: neurolearn"
echo "   - Description: AI-powered educational platform for neurodiverse students"
echo "   - Visibility: Public (you can change to private)"
echo "   - ❌ DON'T check 'Add a README file'"
echo "   - ❌ DON'T check 'Add .gitignore'"
echo "   - ❌ DON'T check 'Choose a license'"
echo ""

echo "⏳ Waiting 10 seconds for repository creation..."
sleep 10

echo "📤 Pushing your code to GitHub..."
if git push -u origin main 2>/dev/null; then
    echo ""
    echo "🎉 SUCCESS! Your NeuroLearn repository is live!"
    echo "🔗 Repository: https://github.com/jpranav0802/neurolearn"
    echo ""
    echo "🎊 What's now on GitHub:"
    echo "   ✅ Complete NeuroLearn platform code"
    echo "   ✅ Authentication service with COPPA/FERPA compliance"
    echo "   ✅ Docker configuration"
    echo "   ✅ Database schema"
    echo "   ✅ CI/CD pipeline"
    echo "   ✅ Documentation and contribution guides"
    echo ""
    echo "🔄 For future changes, just run:"
    echo "   git add ."
    echo "   git commit -m 'your message'"
    echo "   git push"
else
    echo ""
    echo "⏳ Repository might still be creating. Trying again in 5 seconds..."
    sleep 5
    if git push -u origin main; then
        echo "🎉 SUCCESS! Repository created and code pushed!"
    else
        echo "❌ Please create the repository manually at the opened page, then run:"
        echo "   git push -u origin main"
    fi
fi
