#!/bin/bash

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: The Sacred Drop Leaderboard"

# Instructions for connecting to a remote repository
echo ""
echo "Git repository initialized!"
echo ""
echo "To connect to a remote repository, run the following commands:"
echo "  git remote add origin <repository-url>"
echo "  git push -u origin main"
echo ""
echo "Replace <repository-url> with your GitHub, GitLab, or Bitbucket repository URL." 