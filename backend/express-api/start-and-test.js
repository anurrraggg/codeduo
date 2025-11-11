/**
 * Script to start server and run comprehensive tests
 */
const { spawn } = require('child_process');
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
const MAX_WAIT_TIME = 30000; // 30 seconds
const CHECK_INTERVAL = 1000; // 1 second

// Set environment variables
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key-for-dry-run';
process.env.PORT = process.env.PORT || '5000';

console.log('🚀 Starting backend server...\n');

// Start the server
const server = spawn('node', ['server.js'], {
    cwd: __dirname,
    env: { ...process.env, JWT_SECRET: process.env.JWT_SECRET, PORT: process.env.PORT },
    stdio: ['ignore', 'pipe', 'pipe']
});

let serverOutput = '';
let serverError = '';

server.stdout.on('data', (data) => {
    const output = data.toString();
    serverOutput += output;
    process.stdout.write(output);
});

server.stderr.on('data', (data) => {
    const error = data.toString();
    serverError += error;
    process.stderr.write(error);
});

// Wait for server to be ready
async function waitForServer() {
    const startTime = Date.now();
    
    while (Date.now() - startTime < MAX_WAIT_TIME) {
        try {
            const response = await axios.get(BASE_URL, { timeout: 2000 });
            if (response.status === 200) {
                console.log('\n✅ Server is ready!\n');
                return true;
            }
        } catch (error) {
            // Server not ready yet, continue waiting
        }
        await new Promise(resolve => setTimeout(resolve, CHECK_INTERVAL));
    }
    
    console.log('\n❌ Server did not start within timeout period');
    return false;
}

// Run tests
async function runTests() {
    console.log('🧪 Running comprehensive backend tests...\n');
    
    try {
        const { runAllTests } = require('./test-backend-comprehensive');
        process.env.TEST_URL = BASE_URL;
        await runAllTests();
    } catch (error) {
        console.error('❌ Test execution error:', error.message);
    } finally {
        // Cleanup
        console.log('\n🛑 Stopping server...');
        server.kill();
        process.exit(0);
    }
}

// Main execution
(async () => {
    const serverReady = await waitForServer();
    
    if (serverReady) {
        await runTests();
    } else {
        console.error('\n❌ Failed to start server. Output:', serverOutput);
        console.error('Errors:', serverError);
        server.kill();
        process.exit(1);
    }
})();

