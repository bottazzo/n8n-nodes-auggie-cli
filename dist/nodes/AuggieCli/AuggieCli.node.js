"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuggieCli = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const child_process_1 = require("child_process");
class AuggieCli {
    constructor() {
        this.description = {
            displayName: 'Auggie CLI',
            name: 'auggieCli',
            icon: 'file:auggie.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["prompt"]}}',
            description: 'Use Auggie CLI to execute AI-powered coding tasks with powerful agentic capabilities',
            defaults: {
                name: 'Auggie CLI',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Execute',
                            value: 'execute',
                            description: 'Execute a command with Auggie CLI',
                            action: 'Execute a command with auggie cli',
                        },
                    ],
                    default: 'execute',
                },
                {
                    displayName: 'Prompt',
                    name: 'prompt',
                    type: 'string',
                    typeOptions: {
                        rows: 4,
                    },
                    default: '',
                    description: 'The prompt or instruction to send to Auggie CLI',
                    required: true,
                    placeholder: 'e.g., "Create a Python function to parse CSV files"',
                    hint: 'Use expressions like {{$json.prompt}} to use data from previous nodes',
                },
                {
                    displayName: 'Project Path',
                    name: 'projectPath',
                    type: 'string',
                    default: '',
                    description: 'The directory path where Auggie CLI should run (e.g., /path/to/project). If empty, uses the current working directory.',
                    placeholder: '/home/user/projects/my-app',
                    hint: 'This sets the working directory for Auggie CLI, allowing it to access files and run commands in the specified project location',
                },
                {
                    displayName: 'Output Mode',
                    name: 'outputMode',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Print',
                            value: 'print',
                            description: 'Print mode - execute once and return output',
                        },
                        {
                            name: 'Quiet',
                            value: 'quiet',
                            description: 'Quiet mode - only return final output without steps',
                        },
                        {
                            name: 'Compact',
                            value: 'compact',
                            description: 'Compact mode - output tool calls, results, and final response as one line each',
                        },
                    ],
                    default: 'print',
                    description: 'Choose how Auggie CLI should execute the command',
                },
                {
                    displayName: 'Model',
                    name: 'model',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Claude Sonnet 4.5 (Default)',
                            value: 'sonnet-4.5',
                            description: 'Claude Sonnet 4.5 by Anthropic - Latest and most capable model',
                        },
                        {
                            name: 'Claude Sonnet 4',
                            value: 'sonnet-4',
                            description: 'Claude Sonnet 4 by Anthropic - Powerful reasoning and code understanding',
                        },
                        {
                            name: 'GPT-5',
                            value: 'gpt-5',
                            description: 'GPT-5 by OpenAI - Latest OpenAI model with advanced capabilities',
                        },
                    ],
                    default: 'sonnet-4.5',
                    description: 'Choose the AI model to use for processing',
                },
                {
                    displayName: 'Timeout',
                    name: 'timeout',
                    type: 'number',
                    default: 300,
                    description: 'Maximum time to wait for completion (in seconds) before aborting',
                },
                {
                    displayName: 'Additional Options',
                    name: 'additionalOptions',
                    type: 'collection',
                    placeholder: 'Add Option',
                    default: {},
                    options: [
                        {
                            displayName: 'Debug Mode',
                            name: 'debug',
                            type: 'boolean',
                            default: false,
                            description: 'Whether to enable debug logging',
                        },
                        {
                            displayName: 'Custom Arguments',
                            name: 'customArgs',
                            type: 'string',
                            default: '',
                            description: 'Additional command line arguments to pass to Auggie CLI',
                            placeholder: '--verbose --config /path/to/config',
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            let timeout = 300;
            try {
                const prompt = this.getNodeParameter('prompt', itemIndex);
                timeout = this.getNodeParameter('timeout', itemIndex);
                const projectPath = this.getNodeParameter('projectPath', itemIndex);
                const outputMode = this.getNodeParameter('outputMode', itemIndex);
                const model = this.getNodeParameter('model', itemIndex);
                const additionalOptions = this.getNodeParameter('additionalOptions', itemIndex);
                if (!prompt || prompt.trim() === '') {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Prompt is required and cannot be empty', {
                        itemIndex,
                    });
                }
                if (additionalOptions.debug) {
                    this.logger.debug('Starting Auggie CLI execution', {
                        itemIndex,
                        prompt: prompt.substring(0, 100) + '...',
                        timeout: `${timeout}s`,
                        outputMode,
                        model,
                        projectPath: projectPath || 'current directory',
                    });
                }
                const args = [];
                if (outputMode === 'print') {
                    args.push('--print');
                }
                else if (outputMode === 'quiet') {
                    args.push('--quiet');
                }
                else if (outputMode === 'compact') {
                    args.push('--compact');
                }
                if (model && model !== 'sonnet-4.5') {
                    args.push('--model', model);
                }
                if (additionalOptions.customArgs && additionalOptions.customArgs.trim()) {
                    const customArgs = additionalOptions.customArgs.trim().split(/\s+/);
                    args.push(...customArgs);
                }
                args.push(prompt);
                const cwd = projectPath && projectPath.trim() !== '' ? projectPath.trim() : process.cwd();
                if (additionalOptions.debug) {
                    this.logger.debug('Executing Auggie CLI command', {
                        command: 'auggie',
                        args,
                        cwd,
                    });
                }
                const startTime = Date.now();
                const result = await executeAuggieCli(args, cwd, timeout, additionalOptions.debug);
                const duration = Date.now() - startTime;
                if (additionalOptions.debug) {
                    this.logger.debug('Auggie CLI execution completed', {
                        durationMs: duration,
                        success: result.success,
                        outputLength: result.output.length,
                    });
                }
                returnData.push({
                    json: {
                        result: result.output,
                        success: result.success,
                        duration_ms: duration,
                        command: `auggie ${args.join(' ')}`,
                        exitCode: result.exitCode,
                        error: result.error || null,
                    },
                    pairedItem: { item: itemIndex },
                });
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                const isTimeout = error instanceof Error && error.message.includes('timeout');
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: errorMessage,
                            errorType: isTimeout ? 'timeout' : 'execution_error',
                            errorDetails: error instanceof Error ? error.stack : undefined,
                            itemIndex,
                        },
                        pairedItem: itemIndex,
                    });
                    continue;
                }
                const userFriendlyMessage = isTimeout
                    ? `Operation timed out after ${timeout} seconds. Consider increasing the timeout.`
                    : `Auggie CLI execution failed: ${errorMessage}`;
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), userFriendlyMessage, {
                    itemIndex,
                    description: errorMessage,
                });
            }
        }
        return [returnData];
    }
}
exports.AuggieCli = AuggieCli;
async function executeAuggieCli(args, cwd, timeout, debug) {
    return new Promise((resolve, reject) => {
        var _a, _b;
        const timeoutMs = timeout * 1000;
        let output = '';
        let errorOutput = '';
        const processedArgs = [...args];
        if (processedArgs.length > 0) {
            const lastArgIndex = processedArgs.length - 1;
            const lastArg = processedArgs[lastArgIndex];
            if (lastArg.includes(' ') && !lastArg.startsWith('"')) {
                processedArgs[lastArgIndex] = `"${lastArg.replace(/"/g, '\\"')}"`;
            }
        }
        const child = (0, child_process_1.spawn)('auggie', processedArgs, {
            cwd,
            stdio: ['pipe', 'pipe', 'pipe'],
            shell: true,
        });
        const timeoutId = setTimeout(() => {
            child.kill('SIGTERM');
            reject(new Error(`Auggie CLI execution timed out after ${timeout} seconds`));
        }, timeoutMs);
        (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            const chunk = data.toString();
            output += chunk;
            if (debug) {
                console.log('Auggie stdout:', chunk);
            }
        });
        (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
            const chunk = data.toString();
            errorOutput += chunk;
            if (debug) {
                console.error('Auggie stderr:', chunk);
            }
        });
        child.on('close', (code) => {
            clearTimeout(timeoutId);
            const success = code === 0;
            const finalOutput = output || errorOutput;
            resolve({
                output: finalOutput,
                success,
                exitCode: code || 0,
                error: success ? undefined : errorOutput || 'Process failed with no error output',
            });
        });
        child.on('error', (error) => {
            clearTimeout(timeoutId);
            reject(new Error(`Failed to start Auggie CLI: ${error.message}`));
        });
    });
}
//# sourceMappingURL=AuggieCli.node.js.map