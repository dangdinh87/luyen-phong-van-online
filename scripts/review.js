#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DATA_DIR = path.join(__dirname, '../app/interview/data');

function scanFiles() {
  return fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.ts'));
}

async function prompt(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('--- IT Interview Q&A CLI ---');
  const files = scanFiles();

  if (files.length === 0) {
    console.log('No data files found in', DATA_DIR);
    process.exit(1);
  }

  console.log('\nAvailable files:');
  files.forEach((f, i) => console.log(`${i + 1}. ${f}`));

  const fileIdxStr = await prompt('\nSelect a file to review (enter number, or q to quit): ');
  if (fileIdxStr.toLowerCase() === 'q') return process.exit(0);

  const fileIdx = parseInt(fileIdxStr, 10) - 1;
  if (isNaN(fileIdx) || fileIdx < 0 || fileIdx >= files.length) {
    console.log('Invalid selection.');
    process.exit(1);
  }

  const selectedFile = files[fileIdx];
  const filePath = path.join(DATA_DIR, selectedFile);
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\nAnalyzing ${selectedFile}...`);
  // Simple regex to find items
  const itemRegex = /\{\s*id:\s*(\d+),\s*category:.*?\}(?=\s*,|\s*$)/gs;
  let matches = [...content.matchAll(itemRegex)];

  console.log(`Found ${matches.length} questions in this file.`);

  while (true) {
    const action = await prompt('\nAction: [v]iew all IDs, [s]earch by ID, [a]dd new (basic outline), [q]uit: ');

    if (action.toLowerCase() === 'q') {
       break;
    } else if (action.toLowerCase() === 'v') {
       const ids = matches.map(m => m[1]);
       console.log('IDs in file:', ids.join(', '));
    } else if (action.toLowerCase() === 's') {
       const idToSearch = await prompt('Enter ID to search: ');
       const match = matches.find(m => m[1] === idToSearch);
       if (match) {
         console.log('\n--- Item Content ---');
         console.log(match[0]);
         console.log('--------------------\n');
         console.log('To edit this item, please open the file directly in your IDE.');
       } else {
         console.log('ID not found in this file.');
       }
    } else if (action.toLowerCase() === 'a') {
        console.log('To add an item, append a new block to the file manually to ensure type safety. Here is a template:');
        console.log(`  { id: NEW_ID, category: "...", subcategory: "...", level: "beginner", q: "...", a: "..." },`);
    } else {
        console.log('Invalid action.');
    }
  }

  rl.close();
}

main().catch(console.error);
