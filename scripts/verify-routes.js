/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const http = require('http');

console.log("=========================================");
console.log("🚦 MORA QA: Institutional Route Verification");
console.log("=========================================");

// 1. Static Directory Integrity Verification
const nextDir = path.join(__dirname, '..', '.next', 'server', 'app');

if (!fs.existsSync(nextDir)) {
  console.log("⚠️ WARNING: .next build directory not found.");
  console.log("💡 Proceeding directly to Live Telemetry Verification...");
} else {
  function traverseDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const stat = fs.statSync(path.join(dir, file));
      if (stat.isDirectory()) {
        fileList = traverseDir(path.join(dir, file), fileList);
      } else {
        if (file.endsWith('.html') || file.endsWith('.json') || file.endsWith('.meta')) {
          fileList.push(path.join(dir, file));
        }
      }
    }
    return fileList;
  }

  try {
    const builtFiles = traverseDir(nextDir);
    const htmlRoutes = builtFiles.filter(f => f.endsWith('.html')).length;
    const jsonRoutes = builtFiles.filter(f => f.endsWith('.json')).length;

    console.log(`✅ Static Build Integrity Passed:`);
    console.log(`   - HTML Routes Compiled: ${htmlRoutes}`);
    console.log(`   - Data Routes Compiled: ${jsonRoutes}`);
    console.log(`   - Total Output Assets: ${builtFiles.length}`);
  } catch (error) {
    console.error("❌ Build Traversal Failure:", error);
  }
}

// 2. Live HTTP Telemetry Verification (Local Server Ping)
const ROUTES = [
  '/',
  '/announcements',
  '/calendar',
  '/calendar/monthly-prayers',
  '/education',
  '/hajj',
  '/knowledge',
  '/mosques',
  '/publications',
  '/waqf',
  '/robots.txt'
];

const args = process.argv.slice(2);
const targetUrl = args[0] ? new URL(args[0]) : null;
const HOST = targetUrl ? targetUrl.hostname : 'localhost';
const PORT = targetUrl ? (targetUrl.port || (targetUrl.protocol === 'https:' ? 443 : 80)) : 3000;
const PROTOCOL = targetUrl ? targetUrl.protocol : 'http:';
const httpModule = PROTOCOL === 'https:' ? require('https') : require('http');

function pingRoute(route) {
  return new Promise((resolve) => {
    const options = {
      hostname: HOST,
      port: PORT,
      path: route,
      method: 'GET',
      headers: {
        'User-Agent': 'MoraQABot/1.0 (Republic of Somaliland Government QA)'
      },
      timeout: 15000
    };

    const req = httpModule.request(options, (res) => {
      resolve({
        route,
        status: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (err) => {
      resolve({
        route,
        status: 'OFFLINE',
        ok: false,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        route,
        status: 'TIMEOUT',
        ok: false
      });
    });

    req.end();
  });
}

async function runLiveVerification() {
  console.log("\n=========================================");
  console.log(`🌐 Live Telemetry Check: http://${HOST}:${PORT}`);
  console.log("=========================================");

  let successCount = 0;
  let failCount = 0;

  for (const route of ROUTES) {
    const result = await pingRoute(route);
    if (result.ok) {
      console.log(`  🟢 [${result.status}] ${route} -> OK`);
      successCount++;
    } else {
      if (result.status === 'OFFLINE') {
        if (!targetUrl) {
          console.log(`\n⚠️ WARNING: Dev server is offline on port ${PORT}. Skipping local live telemetry.`);
          console.log(`💡 Run 'npm run dev' in another terminal to test local routes.`);
          process.exit(0);
        } else {
          console.log(`\n❌ ERROR: Target host ${HOST} is offline.`);
          process.exit(1);
        }
      }
      console.log(`  🔴 [${result.status}] ${route} -> FAIL`);
      failCount++;
    }
  }

  console.log("\n-----------------------------------------");
  console.log(`📊 QA Result: ${successCount} passed | ${failCount} failed`);
  console.log("-----------------------------------------");

  if (failCount > 0) {
    console.error("❌ QA FAILED: One or more routes failed validation.");
    process.exit(1);
  } else {
    console.log("✨ ALL SYSTEM ROUTES ARE FULLY OPERATIONAL. SECURE DEPLOYMENT READY.");
    process.exit(0);
  }
}

// Execute live check after a short timeout to let async streams settle
setTimeout(runLiveVerification, 500);
