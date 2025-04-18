/**
 * Script to run all visualization applications together
 * 
 * This script updates the package.json files of the individual apps
 * to run on specific ports, then starts all applications in parallel.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Application configurations
const apps = [
  {
    name: 'algorithm-visualizer-hub',
    port: 3000,
    directory: path.resolve(__dirname),
    isRequired: true
  },
  {
    name: 'maxflow',
    port: 3001,
    directory: path.resolve(__dirname, '..', 'maxflow'),
    isRequired: false
  },
  {
    name: 'maximum-matching-graph',
    port: 3002,
    directory: path.resolve(__dirname, '..', 'maximum-matching-graph'),
    isRequired: false
  }
];

// Function to check if app directory exists and is valid
function checkAppDirectory(app) {
  try {
    if (!fs.existsSync(app.directory)) {
      console.warn(`Warning: Directory for ${app.name} does not exist at ${app.directory}`);
      return false;
    }
    
    const packageJsonPath = path.join(app.directory, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      console.warn(`Warning: package.json for ${app.name} does not exist at ${packageJsonPath}`);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error checking directory for ${app.name}:`, error);
    return false;
  }
}

// Function to update package.json scripts for specific ports
function updatePackageJson(app) {
  const packageJsonPath = path.join(app.directory, 'package.json');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Update the start script to use the specific port
    if (packageJson.scripts && packageJson.scripts.start) {
      // For Windows systems, use 'set PORT='
      // For Unix/Linux/Mac, it would be 'PORT='
      const isWindows = process.platform === 'win32';
      const portPrefix = isWindows ? 'set PORT=' : 'PORT=';
      
      if (packageJson.scripts.start.includes('react-scripts')) {
        packageJson.scripts.start = `${portPrefix}${app.port} && react-scripts start`;
      }
    }
    
    // Write the updated package.json back to file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    
    console.log(`Updated ${app.name} to run on port ${app.port}`);
    return true;
  } catch (error) {
    console.error(`Error updating package.json for ${app.name}:`, error);
    return false;
  }
}

// Function to start an application
function startApp(app) {
  console.log(`Starting ${app.name} on port ${app.port}...`);
  
  const process = exec('npm start', { cwd: app.directory });
  
  process.stdout.on('data', (data) => {
    console.log(`[${app.name}] ${data}`);
  });
  
  process.stderr.on('data', (data) => {
    console.error(`[${app.name}] ${data}`);
  });
  
  process.on('exit', (code) => {
    if (code !== 0) {
      console.error(`[${app.name}] exited with code ${code}`);
      if (app.isRequired) {
        console.error(`Required application ${app.name} failed to start. Exiting.`);
        process.exit(1);
      }
    }
  });
  
  return process;
}

// Main execution
console.log('Setting up visualization apps...');

// Check app directories
const validApps = apps.filter(app => {
  const isValid = checkAppDirectory(app);
  if (!isValid && app.isRequired) {
    console.error(`Required application ${app.name} is not available. Exiting.`);
    process.exit(1);
  }
  return isValid;
});

console.log(`\nFound ${validApps.length} valid applications out of ${apps.length}`);
validApps.forEach(app => {
  console.log(`- ${app.name} (Port: ${app.port})`);
});

// Update package.json files for each valid app
console.log('\nUpdating application configurations...');
validApps.forEach(updatePackageJson);

console.log('\nStarting applications...');
console.log('Note: Even if some applications fail to start, the hub will still run');
console.log('      and display helpful messages for missing applications.\n');

// Start all applications
const processes = validApps.map(startApp);

// Display access information
setTimeout(() => {
  console.log('\n===================================================');
  console.log(' HOW TO ACCESS THE APPLICATIONS');
  console.log('===================================================');
  console.log('Main Hub: http://localhost:3000');
  console.log('\nApplication status:');
  validApps.forEach(app => {
    console.log(`- ${app.name}: http://localhost:${app.port}`);
  });
  console.log('\nPress Ctrl+C to stop all applications');
  console.log('===================================================\n');
}, 5000);

// Handle script termination
process.on('SIGINT', () => {
  console.log('\nStopping all applications...');
  processes.forEach(process => {
    process.kill();
  });
  console.log('All applications stopped.');
  process.exit();
}); 