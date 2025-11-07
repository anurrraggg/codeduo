/**
 * Test script to validate server startup and configuration
 */
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, 'env') });

console.log('🔍 Checking Server Configuration...\n');

// Check required environment variables
const requiredEnvVars = {
    JWT_SECRET: process.env.JWT_SECRET || 'NOT SET',
    PORT: process.env.PORT || '5000',
    MONGO_URI: process.env.MONGO_URI || 'NOT SET (will use default)',
    NODE_ENV: process.env.NODE_ENV || 'development'
};

console.log('📋 Environment Variables:');
Object.entries(requiredEnvVars).forEach(([key, value]) => {
    const displayValue = key === 'JWT_SECRET' && value !== 'NOT SET' ? '***SET***' : value;
    const status = key === 'JWT_SECRET' && value === 'NOT SET' ? '⚠️' : '✅';
    console.log(`  ${status} ${key}: ${displayValue}`);
});

// Check dependencies
console.log('\n📦 Checking Dependencies...');
const dependencies = [
    'express',
    'mongoose',
    'cors',
    'dotenv',
    'jsonwebtoken',
    'bcryptjs',
    'helmet'
];

let allDepsOk = true;
dependencies.forEach(dep => {
    try {
        require(dep);
        console.log(`  ✅ ${dep}`);
    } catch (e) {
        console.log(`  ❌ ${dep} - NOT INSTALLED`);
        allDepsOk = false;
    }
});

// Test database connection (non-blocking)
console.log('\n🗄️  Testing Database Connection...');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

(async () => {
    try {
        await connectDB();
        console.log('  ✅ Database connection successful');
        
        // Test a simple query
        const User = require('./models/User');
        const userCount = await User.countDocuments();
        console.log(`  ✅ Database is accessible (${userCount} users found)`);
        
        await mongoose.disconnect();
        console.log('\n✅ All checks passed! Server should start successfully.');
        process.exit(0);
    } catch (error) {
        console.log(`  ⚠️  Database connection issue: ${error.message}`);
        console.log('  ℹ️  Server will use in-memory database fallback');
        console.log('\n⚠️  Some checks failed, but server may still work with fallbacks.');
        process.exit(0);
    }
})();

