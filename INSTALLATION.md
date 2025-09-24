# Installation Guide - n8n-nodes-auggie-cli

This guide will help you install and configure the Auggie CLI node for n8n.

## Prerequisites

### 1. Node.js and npm
Ensure you have Node.js 20.15 or later installed:
```bash
node --version  # Should be 20.15 or higher
npm --version
```

### 2. Auggie CLI
The Auggie CLI must be installed globally on your n8n server:
```bash
npm install -g @augmentcode/auggie
```

### 3. Augment Account
You need an active Augment account. Sign up at [augmentcode.com](https://augmentcode.com) if you don't have one.

### 4. Authentication
Authenticate Auggie CLI with your Augment account:
```bash
auggie login
```
Follow the prompts to complete authentication.

## Installation Methods

### Method 1: Via n8n Community Nodes (Recommended)

1. **Open n8n**: Navigate to your n8n instance
2. **Go to Settings**: Click on "Settings" in the left sidebar
3. **Community Nodes**: Click on "Community Nodes"
4. **Install Node**: Click "Install a community node"
5. **Enter Package Name**: Type `n8n-nodes-auggie-cli`
6. **Install**: Click "Install"
7. **Restart**: Restart n8n when prompted

### Method 2: Manual Installation

#### For Self-Hosted n8n
```bash
# Navigate to your n8n nodes directory
cd ~/.n8n/nodes

# Install the package
npm install n8n-nodes-auggie-cli

# Restart n8n
```

#### For Docker Installation
Add the package to your Docker environment:

```bash
docker run -it --rm \
  -p 5678:5678 \
  -e N8N_COMMUNITY_NODE_PACKAGES=n8n-nodes-auggie-cli \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Note**: For Docker, you'll also need to ensure Auggie CLI is installed inside the container.

### Method 3: Development Installation

If you want to install from source or contribute to development:

```bash
# Clone the repository
git clone https://github.com/yourusername/n8n-nodes-auggie-cli.git
cd n8n-nodes-auggie-cli

# Install dependencies
npm install

# Build the project
npm run build

# Link for development (optional)
npm link

# In your n8n nodes directory
cd ~/.n8n/nodes
npm link n8n-nodes-auggie-cli
```

## Docker Setup with Auggie CLI

If you're using Docker, you'll need a custom Dockerfile to include Auggie CLI:

```dockerfile
FROM n8nio/n8n:latest

# Switch to root to install packages
USER root

# Install Node.js 22 (required for Auggie CLI)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs

# Install Auggie CLI globally
RUN npm install -g @augmentcode/auggie

# Install the n8n node
RUN npm install -g n8n-nodes-auggie-cli

# Switch back to node user
USER node

# Set environment variable for community nodes
ENV N8N_COMMUNITY_NODE_PACKAGES=n8n-nodes-auggie-cli
```

Build and run:
```bash
docker build -t n8n-with-auggie .
docker run -it --rm -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8n-with-auggie
```

## Verification

### 1. Check n8n Node Availability
1. Open n8n
2. Create a new workflow
3. Click "Add node"
4. Search for "Auggie CLI"
5. The node should appear in the search results

### 2. Test Auggie CLI Access
Create a simple test workflow:
1. Add a "Manual Trigger" node
2. Add an "Auggie CLI" node
3. Configure the Auggie CLI node:
   - **Prompt**: "Hello, can you help me?"
   - **Output Mode**: "Print"
4. Execute the workflow
5. Check the output for a response from Auggie

### 3. Verify Authentication
If you get authentication errors:
```bash
# On your n8n server, run:
auggie login

# Test the CLI directly:
auggie "Hello, test message"
```

## Troubleshooting

### Common Issues

#### "Command not found: auggie"
**Solution**: Install Auggie CLI globally
```bash
npm install -g @augmentcode/auggie
```

#### "Authentication failed"
**Solution**: Login to Auggie CLI
```bash
auggie login
```

#### "Node not found in n8n"
**Solutions**:
1. Restart n8n after installation
2. Check that the package is installed in the correct directory
3. Verify the package name is correct: `n8n-nodes-auggie-cli`

#### "Permission denied" errors
**Solution**: Check file permissions and ensure n8n has access to the Auggie CLI binary

#### Docker: "auggie command not found"
**Solution**: Ensure Auggie CLI is installed inside the Docker container, not just on the host

### Debug Mode

Enable debug mode in the Auggie CLI node to get detailed execution logs:
1. In the node configuration, expand "Additional Options"
2. Enable "Debug Mode"
3. Check the n8n logs for detailed output

### Log Locations

- **n8n logs**: Check your n8n instance logs for error messages
- **Auggie CLI logs**: Run `auggie --help` to see available logging options
- **Node.js logs**: Check Node.js error logs if the node fails to load

## Configuration

### Environment Variables

You can set these environment variables for additional configuration:

```bash
# Set custom Auggie CLI path (if not in PATH)
export AUGGIE_CLI_PATH=/custom/path/to/auggie

# Set default project path
export AUGGIE_DEFAULT_PROJECT_PATH=/path/to/default/project

# Enable debug mode by default
export AUGGIE_DEBUG=true
```

### Project-Specific Configuration

For better results, always specify a project path in your workflows:
- Use absolute paths: `/home/user/projects/my-app`
- Ensure the path is accessible to the n8n process
- The directory should contain your project files for context

## Next Steps

1. **Read the Documentation**: Check the main README.md for usage examples
2. **Try the Examples**: Look at the examples/ directory for sample configurations
3. **Import Workflow Templates**: Use the workflow templates in workflow-templates/
4. **Join the Community**: Report issues and contribute on GitHub

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review the main README.md
3. Check the GitHub issues page
4. Create a new issue with detailed information about your setup

---

**Happy automating with Auggie CLI and n8n!** 🚀
