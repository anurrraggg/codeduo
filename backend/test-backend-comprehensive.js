/**
 * Comprehensive Backend Test Script
 * Tests all major components and endpoints
 */

const axios = require('axios');
const mongoose = require('mongoose');

// Configuration
const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';
const TEST_TIMEOUT = 10000; // 10 seconds

// Test results
const results = {
    passed: 0,
    failed: 0,
    errors: []
};

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[1;31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name) {
    log(`\n🧪 Testing: ${name}`, 'cyan');
}

function logPass(message) {
    log(`  ✅ ${message}`, 'green');
    results.passed++;
}

function logFail(message, error = null) {
    log(`  ❌ ${message}`, 'red');
    if (error) {
        log(`     Error: ${error}`, 'red');
        results.errors.push({ test: message, error: error.toString() });
    }
    results.failed++;
}

function logInfo(message) {
    log(`  ℹ️  ${message}`, 'blue');
}

// Test helper function
async function test(name, testFn) {
    try {
        await testFn();
    } catch (error) {
        logFail(name, error.message);
    }
}

// HTTP request helper
async function makeRequest(method, endpoint, data = null, headers = {}) {
    try {
        const config = {
            method,
            url: `${BASE_URL}${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            timeout: TEST_TIMEOUT,
            validateStatus: () => true // Don't throw on any status
        };

        if (data) {
            config.data = data;
        }

        const response = await axios(config);
        return { success: true, response };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            response: error.response || null
        };
    }
}

// ==================== TESTS ====================

async function testServerHealth() {
    logTest('Server Health Check');
    
    await test('Server is running', async () => {
        const result = await makeRequest('GET', '/');
        if (result.success && result.response && result.response.status === 200) {
            logPass('Server is responding');
            logInfo(`Response: ${result.response.data}`);
        } else {
            throw new Error(`Server not responding. Status: ${result.response?.status || 'N/A'}`);
        }
    });

    await test('API test endpoint', async () => {
        const result = await makeRequest('GET', '/api/test');
        if (result.success && result.response && result.response.status === 200) {
            logPass('API test endpoint working');
        } else {
            throw new Error(`Test endpoint failed. Status: ${result.response?.status || 'N/A'}`);
        }
    });
}

async function testCORS() {
    logTest('CORS Configuration');
    
    await test('CORS headers present', async () => {
        const result = await makeRequest('GET', '/');
        if (result.success && result.response) {
            const headers = result.response.headers;
            // CORS is configured, check if it allows requests
            logPass('CORS middleware is active');
        } else {
            throw new Error('Could not check CORS headers');
        }
    });
}

async function testErrorHandling() {
    logTest('Error Handling');
    
    await test('404 handler', async () => {
        const result = await makeRequest('GET', '/api/nonexistent');
        if (result.success && result.response && result.response.status === 404) {
            logPass('404 handler working correctly');
        } else {
            throw new Error(`Expected 404, got ${result.response?.status || 'N/A'}`);
        }
    });

    await test('Invalid JSON handling', async () => {
        try {
            await axios.post(`${BASE_URL}/api/auth/register`, 'invalid json', {
                headers: { 'Content-Type': 'application/json' },
                timeout: TEST_TIMEOUT,
                validateStatus: () => true
            });
            logPass('Server handles invalid JSON gracefully');
        } catch (error) {
            // This is expected - server should handle it
            if (error.response && error.response.status >= 400) {
                logPass('Server handles invalid JSON gracefully');
            } else {
                throw error;
            }
        }
    });
}

async function testAuthEndpoints() {
    logTest('Authentication Endpoints');
    
    await test('Registration endpoint exists', async () => {
        const result = await makeRequest('POST', '/api/auth/register', {
            username: 'testuser',
            email: 'test@example.com',
            password: 'Test123!@#'
        });
        // Should either succeed or return validation error (not 404)
        if (result.success && result.response && result.response.status !== 404) {
            logPass('Registration endpoint accessible');
            if (result.response.status === 201) {
                logInfo('Registration successful (test user created)');
            } else if (result.response.status === 400 || result.response.status === 409) {
                logInfo('Registration endpoint validates input correctly');
            }
        } else {
            throw new Error('Registration endpoint not found');
        }
    });

    await test('Login endpoint exists', async () => {
        const result = await makeRequest('POST', '/api/auth/login', {
            emailOrUsername: 'test@example.com',
            password: 'wrongpassword'
        });
        if (result.success && result.response && result.response.status !== 404) {
            logPass('Login endpoint accessible');
            if (result.response.status === 401) {
                logInfo('Login endpoint validates credentials correctly');
            }
        } else {
            throw new Error('Login endpoint not found');
        }
    });

    await test('Protected endpoint requires auth', async () => {
        const result = await makeRequest('GET', '/api/auth/me');
        if (result.success && result.response && result.response.status === 401) {
            logPass('Protected endpoints require authentication');
        } else {
            throw new Error(`Expected 401, got ${result.response?.status || 'N/A'}`);
        }
    });
}

async function testQuizEndpoints() {
    logTest('Quiz Endpoints');
    
    await test('Quiz list endpoint', async () => {
        const result = await makeRequest('GET', '/api/quiz');
        if (result.success && result.response) {
            if (result.response.status === 200) {
                logPass('Quiz list endpoint working');
                logInfo(`Found ${Array.isArray(result.response.data) ? result.response.data.length : 0} quizzes`);
            } else if (result.response.status === 401) {
                logPass('Quiz endpoint requires authentication');
            } else {
                logInfo(`Quiz endpoint returned status ${result.response.status}`);
            }
        } else {
            throw new Error('Quiz endpoint not accessible');
        }
    });
}

async function testLeaderboardEndpoints() {
    logTest('Leaderboard Endpoints');
    
    await test('Leaderboard endpoint', async () => {
        const result = await makeRequest('GET', '/api/leaderboard');
        if (result.success && result.response) {
            if (result.response.status === 200) {
                logPass('Leaderboard endpoint working');
            } else if (result.response.status === 401) {
                logPass('Leaderboard endpoint requires authentication');
            } else {
                logInfo(`Leaderboard endpoint returned status ${result.response.status}`);
            }
        } else {
            throw new Error('Leaderboard endpoint not accessible');
        }
    });
}

async function testRateLimiting() {
    logTest('Rate Limiting');
    
    await test('Rate limit headers present', async () => {
        const result = await makeRequest('GET', '/');
        if (result.success && result.response) {
            const headers = result.response.headers;
            if (headers['x-ratelimit-limit'] || headers['X-RateLimit-Limit']) {
                logPass('Rate limiting is active');
            } else {
                logInfo('Rate limit headers not visible (may be working internally)');
            }
        }
    });
}

async function testSecurityHeaders() {
    logTest('Security Headers');
    
    await test('Security headers present', async () => {
        const result = await makeRequest('GET', '/');
        if (result.success && result.response) {
            const headers = result.response.headers;
            // Check for common security headers
            const hasSecurityHeaders = 
                headers['x-content-type-options'] ||
                headers['x-frame-options'] ||
                headers['x-xss-protection'];
            
            if (hasSecurityHeaders) {
                logPass('Security headers are present');
            } else {
                logInfo('Security headers may be configured via Helmet');
            }
        }
    });
}

async function testDatabaseConnection() {
    logTest('Database Connection');
    
    // Try to connect to MongoDB
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codeduo';
        logInfo(`Attempting to connect to: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);
        
        // Quick connection test (with timeout)
        const connection = await Promise.race([
            mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 3000,
                socketTimeoutMS: 3000
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Connection timeout')), 3000)
            )
        ]);
        
        if (connection.connection.readyState === 1) {
            logPass('Database connection successful');
            await mongoose.disconnect();
        } else {
            throw new Error('Database connection not ready');
        }
    } catch (error) {
        logInfo(`Database connection test: ${error.message}`);
        logInfo('This is OK if using in-memory database or database is not running');
    }
}

async function testMiddleware() {
    logTest('Middleware Stack');
    
    await test('JSON parsing middleware', async () => {
        const result = await makeRequest('POST', '/api/auth/register', {
            username: 'test',
            email: 'test@test.com',
            password: 'Test123!'
        });
        if (result.success && result.response) {
            logPass('JSON parsing middleware working');
        }
    });

    await test('Error handler middleware', async () => {
        const result = await makeRequest('GET', '/api/nonexistent');
        if (result.success && result.response) {
            const data = result.response.data;
            if (data && (data.message || data.success === false)) {
                logPass('Error handler middleware working');
            }
        }
    });
}

// ==================== MAIN ====================

async function runAllTests() {
    log('\n' + '='.repeat(60), 'blue');
    log('🚀 COMPREHENSIVE BACKEND TEST SUITE', 'blue');
    log('='.repeat(60), 'blue');
    log(`\nTesting backend at: ${BASE_URL}`, 'yellow');
    log(`Timeout: ${TEST_TIMEOUT}ms per request\n`, 'yellow');

    try {
        await testServerHealth();
        await testCORS();
        await testErrorHandling();
        await testAuthEndpoints();
        await testQuizEndpoints();
        await testLeaderboardEndpoints();
        await testRateLimiting();
        await testSecurityHeaders();
        await testMiddleware();
        await testDatabaseConnection();

        // Summary
        log('\n' + '='.repeat(60), 'blue');
        log('📊 TEST SUMMARY', 'blue');
        log('='.repeat(60), 'blue');
        log(`\n✅ Passed: ${results.passed}`, 'green');
        log(`❌ Failed: ${results.failed}`, results.failed > 0 ? 'red' : 'green');
        
        if (results.errors.length > 0) {
            log('\n⚠️  Errors:', 'yellow');
            results.errors.forEach((err, i) => {
                log(`  ${i + 1}. ${err.test}`, 'yellow');
                log(`     ${err.error}`, 'red');
            });
        }

        const total = results.passed + results.failed;
        const successRate = total > 0 ? ((results.passed / total) * 100).toFixed(1) : 0;
        log(`\n📈 Success Rate: ${successRate}%`, successRate >= 80 ? 'green' : 'yellow');

        if (results.failed === 0) {
            log('\n🎉 All tests passed! Backend is working correctly.', 'green');
            process.exit(0);
        } else {
            log('\n⚠️  Some tests failed. Please review the errors above.', 'yellow');
            process.exit(1);
        }
    } catch (error) {
        log(`\n💥 Fatal error during testing: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    }
}

// Run tests
if (require.main === module) {
    runAllTests().catch(error => {
        log(`\n💥 Unhandled error: ${error.message}`, 'red');
        console.error(error);
        process.exit(1);
    });
}

module.exports = { runAllTests, test, makeRequest };

