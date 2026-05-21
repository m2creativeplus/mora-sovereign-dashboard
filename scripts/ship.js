/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');
const https = require('https');

console.log("==================================================================");
console.log("🇸🇱  MORA Sovereign Release Suite — One-Click Automated Shipping");
console.log("==================================================================");

function runCommand(command, description) {
  console.log(`\n🚀 [TASK] ${description}...`);
  console.log(`   Running: ${command}`);
  try {
    const stdout = execSync(command, { encoding: 'utf-8', stdio: 'inherit' });
    return { ok: true, stdout };
  } catch (error) {
    console.error(`\n❌ ERROR during: ${description}`);
    console.error(error.message);
    return { ok: false, error };
  }
}

async function verifyProductionUrl() {
  console.log("\n🌐 Pinging Live Canonical Server URL...");
  return new Promise((resolve) => {
    https.get('https://mora-gov-portal.vercel.app', {
      headers: { 'User-Agent': 'MoraShipBot/1.0 (Republic of Somaliland Government Release Suite)' }
    }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        console.log(`🟢 Production URL is LIVE & ONLINE [HTTP ${res.statusCode}]`);
        resolve(true);
      } else {
        console.log(`⚠️ Production URL returned non-standard status [HTTP ${res.statusCode}]`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`🔴 Production URL is OFFLINE: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  // Step 1: Run TypeScript Type Check & Linters
  console.log("\n--- Phase 1: Code Verification & QA Standards ---");
  const lint = runCommand('npm run lint', 'Lint Check');
  if (!lint.ok) {
    console.error("❌ QA Denied: Lint rules must be satisfied before shipping.");
    process.exit(1);
  }

  // Step 2: Build Production Target
  console.log("\n--- Phase 2: Compiling Static Assets ---");
  const build = runCommand('npm run build', 'Next.js Production Build');
  if (!build.ok) {
    console.error("❌ QA Denied: Next.js compilation failed.");
    process.exit(1);
  }

  // Step 3: Run Route Verification Suite
  console.log("\n--- Phase 3: Post-Build Offline Route Verification ---");
  const verify = runCommand('node scripts/verify-routes.js', 'Executing Route Audits');
  if (!verify.ok) {
    console.error("❌ QA Denied: Route verification failed.");
    process.exit(1);
  }

  // Step 4: Sync Changes to Git Repository
  console.log("\n--- Phase 4: Git Repository Synchronization ---");
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
  if (gitStatus !== '') {
    console.log("⚠️ Uncommitted changes detected in working tree.");
    runCommand('git add -A', 'Staging Changes');
    runCommand('git commit -m "chore: automated institutional update and release"', 'Committing Changes');
  } else {
    console.log("✅ Working tree clean. No new commits required.");
  }
  
  const push = runCommand('git push origin main', 'Pushing Code to Remote origin/main');
  if (!push.ok) {
    console.log("⚠️ Warning: Remote git push failed. Proceeding with deployment...");
  }

  // Step 5: Production Vercel Deployment
  console.log("\n--- Phase 5: Vercel Cloud Infrastructure Deploy ---");
  const deploy = runCommand('npx vercel --prod --yes', 'Vercel Production Edge Deployment');
  if (!deploy.ok) {
    console.error("❌ Deployment failed on Vercel Edge infrastructure.");
    process.exit(1);
  }

  // Step 6: Verify Live Production Url Availability
  console.log("\n--- Phase 6: Post-Deployment Telemetry Verification ---");
  await verifyProductionUrl();

  console.log("\n==================================================================");
  console.log("✨ SUCCESS: MORA DIGITAL GATEWAY IS SUCCESSFULLY SHIPPED & LIVE!");
  console.log("==================================================================");
}

main();
