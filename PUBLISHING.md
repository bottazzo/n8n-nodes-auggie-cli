# Publishing Guide - n8n-nodes-auggie-cli

This guide explains how to publish the n8n-nodes-auggie-cli package to npm and make it available as a community node.

## Prerequisites

### 1. npm Account
- Create an account at [npmjs.com](https://npmjs.com)
- Verify your email address
- Set up two-factor authentication (recommended)

### 2. npm CLI Authentication
```bash
npm login
# Enter your npm credentials
```

### 3. Package Preparation
Ensure your package.json has the correct information:
- Update `name` if needed (must be unique on npm)
- Update `author` information
- Update `repository` URLs
- Update `homepage` and `bugs` URLs
- Verify `version` (start with 0.1.0)

## Pre-Publication Checklist

### ✅ Code Quality
- [ ] Project builds successfully: `npm run build`
- [ ] No TypeScript errors
- [ ] Code is properly formatted: `npm run format`
- [ ] All files are included in the build

### ✅ Package Configuration
- [ ] `package.json` has correct metadata
- [ ] `files` array includes only necessary files
- [ ] `n8n` configuration is correct
- [ ] Dependencies are properly listed
- [ ] License is specified

### ✅ Documentation
- [ ] README.md is comprehensive
- [ ] INSTALLATION.md provides clear setup instructions
- [ ] Examples are included and tested
- [ ] Workflow templates are provided

### ✅ Testing
- [ ] Manual testing with n8n instance
- [ ] Different configuration options tested
- [ ] Error handling verified
- [ ] Timeout behavior confirmed

## Publication Steps

### Step 1: Final Build
```bash
# Clean and rebuild
npm run build

# Verify build output
ls -la dist/
```

### Step 2: Version Management
```bash
# For first release
npm version 0.1.0

# For subsequent releases
npm version patch   # 0.1.0 -> 0.1.1
npm version minor   # 0.1.0 -> 0.2.0
npm version major   # 0.1.0 -> 1.0.0
```

### Step 3: Publish to npm
```bash
# Dry run to see what would be published
npm publish --dry-run

# Actual publication
npm publish

# For scoped packages (if using @yourname/n8n-nodes-auggie-cli)
npm publish --access public
```

### Step 4: Verify Publication
```bash
# Check if package is available
npm view n8n-nodes-auggie-cli

# Test installation
npm install n8n-nodes-auggie-cli
```

## Post-Publication

### 1. GitHub Release
Create a GitHub release:
1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Tag version: `v0.1.0`
4. Release title: `v0.1.0 - Initial Release`
5. Description: Include changelog and features
6. Attach any relevant files

### 2. Update Documentation
- Update README with npm installation instructions
- Add badges for npm version and downloads
- Update any version-specific documentation

### 3. Community Announcement
Consider announcing on:
- n8n Community Forum
- n8n Discord
- Reddit r/n8n
- Your social media channels

## Version Management

### Semantic Versioning
Follow [semver](https://semver.org/) principles:
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

### Release Types
- **Alpha**: `0.1.0-alpha.1` - Early development
- **Beta**: `0.1.0-beta.1` - Feature complete, testing
- **Release Candidate**: `0.1.0-rc.1` - Final testing
- **Stable**: `0.1.0` - Production ready

## Maintenance

### Regular Updates
- Monitor for Auggie CLI updates
- Update dependencies regularly
- Address user feedback and issues
- Improve documentation based on user questions

### Security
- Monitor for security vulnerabilities
- Update dependencies with security patches
- Follow npm security best practices

## Troubleshooting Publication

### Common Issues

#### "Package name already exists"
```bash
# Use a scoped package name
npm init --scope=@yourusername
# Then update package.json name to @yourusername/n8n-nodes-auggie-cli
```

#### "Authentication failed"
```bash
# Re-login to npm
npm logout
npm login
```

#### "Files not included in package"
```bash
# Check what files will be included
npm pack --dry-run

# Update files array in package.json if needed
```

#### "n8n doesn't recognize the node"
- Verify `n8n` configuration in package.json
- Check that main file path is correct
- Ensure node class is exported properly

### Validation Commands
```bash
# Check package contents
npm pack
tar -tzf n8n-nodes-auggie-cli-*.tgz

# Validate package.json
npm run build
node -e "console.log(require('./package.json'))"

# Test local installation
npm pack
npm install ./n8n-nodes-auggie-cli-*.tgz
```

## Example package.json Updates

### Before Publishing
```json
{
  "name": "n8n-nodes-auggie-cli",
  "version": "0.1.0",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/n8n-nodes-auggie-cli.git"
  },
  "homepage": "https://github.com/yourusername/n8n-nodes-auggie-cli#readme",
  "bugs": {
    "url": "https://github.com/yourusername/n8n-nodes-auggie-cli/issues"
  }
}
```

### After Publishing
Add badges to README:
```markdown
[![npm version](https://badge.fury.io/js/n8n-nodes-auggie-cli.svg)](https://badge.fury.io/js/n8n-nodes-auggie-cli)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-auggie-cli.svg)](https://npmjs.com/package/n8n-nodes-auggie-cli)
```

## Continuous Integration

Consider setting up GitHub Actions for:
- Automated testing
- Automated publishing on tag creation
- Dependency updates
- Security scanning

Example GitHub Action for publishing:
```yaml
name: Publish to npm
on:
  push:
    tags:
      - 'v*'
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Support and Maintenance

### User Support
- Monitor GitHub issues
- Respond to questions promptly
- Provide clear reproduction steps for bugs
- Maintain good documentation

### Long-term Maintenance
- Keep dependencies updated
- Monitor Auggie CLI changes
- Adapt to n8n API changes
- Consider feature requests from community

---

**Ready to share your node with the n8n community!** 🚀

Remember: Publishing is just the beginning. Great community nodes are maintained and improved over time based on user feedback.
