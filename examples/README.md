# Auggie CLI Node Examples

This directory contains example configurations and use cases for the Auggie CLI n8n node.

## Basic Configuration Examples

### 1. Simple Code Analysis
```json
{
  "operation": "execute",
  "prompt": "Analyze this codebase and suggest improvements",
  "projectPath": "/path/to/your/project",
  "outputMode": "print"
}
```

### 2. Bug Fix Generation
```json
{
  "operation": "execute",
  "prompt": "Fix the bug described in this GitHub issue: {{$json.issue_description}}",
  "projectPath": "{{$json.repository_path}}",
  "outputMode": "print",
  "additionalOptions": {
    "debug": true,
    "customArgs": "--verbose"
  }
}
```

### 3. Documentation Generation
```json
{
  "operation": "execute",
  "prompt": "Generate comprehensive documentation for this API, including examples and best practices",
  "projectPath": "/path/to/api/project",
  "outputMode": "quiet"
}
```

### 4. Database Query Generation
```json
{
  "operation": "execute",
  "prompt": "Create a SQL query to {{$json.user_request}} based on the database schema in this project",
  "projectPath": "/path/to/database/project",
  "outputMode": "quiet",
  "additionalOptions": {
    "customArgs": "--focus database"
  }
}
```

### 5. Code Review
```json
{
  "operation": "execute",
  "prompt": "Review this pull request and provide feedback on code quality, security, and best practices: {{$json.pr_diff}}",
  "projectPath": "{{$json.project_path}}",
  "outputMode": "print",
  "timeout": 600
}
```

## Advanced Use Cases

### Customer Support Automation
```json
{
  "operation": "execute",
  "prompt": "Customer Issue: {{$json.customer_issue}}\n\nSteps to reproduce: {{$json.reproduction_steps}}\n\nAnalyze this issue, identify the root cause, and provide a fix with test cases.",
  "projectPath": "{{$json.project_path}}",
  "outputMode": "print",
  "additionalOptions": {
    "debug": true,
    "customArgs": "--priority high --include-tests"
  }
}
```

### Performance Optimization
```json
{
  "operation": "execute",
  "prompt": "Analyze the performance bottlenecks in this application and provide specific optimization recommendations with code examples",
  "projectPath": "/path/to/app",
  "outputMode": "print",
  "timeout": 900,
  "additionalOptions": {
    "customArgs": "--focus performance --include-benchmarks"
  }
}
```

### Security Audit
```json
{
  "operation": "execute",
  "prompt": "Perform a comprehensive security audit of this codebase, identifying vulnerabilities and providing remediation steps",
  "projectPath": "/path/to/secure/project",
  "outputMode": "print",
  "timeout": 1200,
  "additionalOptions": {
    "debug": true,
    "customArgs": "--security-scan --include-dependencies"
  }
}
```

## Integration Patterns

### GitHub Webhook Integration
Use with GitHub webhooks to automatically analyze pull requests:

1. **Webhook Trigger** → receives GitHub PR event
2. **Auggie CLI Node** → analyzes the changes
3. **GitHub API Node** → posts review comments
4. **Slack Node** → notifies team

### Scheduled Code Health Checks
Daily/weekly automated code health monitoring:

1. **Schedule Trigger** → runs daily at 9 AM
2. **Auggie CLI Node** → analyzes codebase health
3. **Email Node** → sends report to team
4. **Database Node** → stores metrics for tracking

### Error Monitoring Integration
Automatic issue resolution from error logs:

1. **Error Monitoring Webhook** → receives error alert
2. **Auggie CLI Node** → analyzes error and suggests fix
3. **GitHub API Node** → creates issue or PR
4. **Slack Node** → notifies developers

## Tips for Best Results

### 1. Use Specific Project Paths
Always specify the exact project directory for better context:
```json
{
  "projectPath": "/home/user/projects/my-specific-app"
}
```

### 2. Craft Detailed Prompts
The more specific your prompt, the better the results:
```json
{
  "prompt": "Analyze the authentication module in src/auth/ and suggest improvements for security and performance, focusing on JWT token handling and rate limiting"
}
```

### 3. Choose Appropriate Output Modes
- **Interactive**: For manual debugging and exploration
- **Print**: For automation and workflow chaining
- **Quiet**: For clean results without intermediate steps

### 4. Set Reasonable Timeouts
Complex analysis may take longer:
```json
{
  "timeout": 600  // 10 minutes for complex analysis
}
```

### 5. Use Debug Mode for Troubleshooting
Enable debug mode when setting up new workflows:
```json
{
  "additionalOptions": {
    "debug": true
  }
}
```

## Common Workflow Patterns

### Pattern 1: Code → Analyze → Report → Notify
```
Manual/Schedule Trigger → Auggie CLI → Format Results → Send Email/Slack
```

### Pattern 2: Issue → Fix → Test → Deploy
```
GitHub Webhook → Auggie CLI → Create PR → Run Tests → Deploy
```

### Pattern 3: Monitor → Detect → Resolve → Track
```
Error Webhook → Auggie CLI → Create Fix → Update Tracking → Notify
```

## Troubleshooting

### Common Issues

1. **"Command not found: auggie"**
   - Ensure Auggie CLI is installed globally: `npm install -g @augmentcode/auggie`
   - Verify PATH includes npm global bin directory

2. **"Authentication failed"**
   - Run `auggie login` on the n8n server
   - Ensure valid Augment account credentials

3. **"Timeout exceeded"**
   - Increase timeout value for complex operations
   - Check if project path is accessible
   - Verify Auggie CLI is responding

4. **"Project not found"**
   - Verify project path exists and is accessible
   - Check file permissions
   - Use absolute paths when possible

### Debug Mode Output
Enable debug mode to see detailed execution logs:
```json
{
  "additionalOptions": {
    "debug": true
  }
}
```

This will show:
- Command being executed
- Working directory
- Execution time
- Output length
- Success/failure status
