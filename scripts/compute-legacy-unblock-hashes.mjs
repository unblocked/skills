#!/usr/bin/env node
/**
 * Walks the git history of this skills repo, finds every commit where the
 * `skills/unblock/` directory existed (across all branches), reads the tree at
 * that path for each commit, and emits the sha256 hash using the same algorithm
 * as `computeSkillHash` in `frontend/shared/skills/install/SkillsInstaller.ts`
 * (relative path + NUL + file content + NUL, paths sorted).
 *
 * Output: deduplicated array of hashes, one per line, plus a TypeScript-ready
 * snippet for pasting into LegacySkillsCleaner's LEGACY_SKILL_HASHES.
 *
 * Usage:
 *   node scripts/compute-legacy-unblock-hashes.mjs [skillPath]
 *
 * Default skillPath is `skills/unblock`.
 */

import crypto from 'crypto';
import { execFileSync } from 'child_process';
import path from 'path';

const SKILL_PATH = process.argv[2] ?? 'skills/unblock';

function git(args, opts = {}) {
    return execFileSync('git', args, { encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024, ...opts });
}

function computeSkillHash(files) {
    const hash = crypto.createHash('sha256');
    const sortedPaths = Object.keys(files).sort();
    for (const filePath of sortedPaths) {
        hash.update(filePath);
        hash.update('\0');
        hash.update(files[filePath]);
        hash.update('\0');
    }
    return hash.digest('hex');
}

/**
 * Returns all commits across every ref that touch the skill path.
 * Includes renames via --follow isn't useful for a directory, so we just gather
 * every commit that has at least one file under SKILL_PATH in its tree.
 */
function listCommits() {
    const out = git(['log', '--all', '--format=%H', '--', SKILL_PATH]);
    return out.split('\n').filter(Boolean);
}

/**
 * Reads every blob under SKILL_PATH at a given commit into { relativePath: content }.
 * Returns null when the directory doesn't exist at that commit.
 */
function readTreeAtCommit(sha) {
    let listing;
    try {
        listing = git(['ls-tree', '-r', '-z', sha, '--', SKILL_PATH]);
    } catch {
        return null;
    }
    if (listing.length === 0) return null;

    const files = {};
    // Each entry: "<mode> <type> <sha>\t<path>\0"
    for (const entry of listing.split('\0')) {
        if (!entry) continue;
        const [meta, filePath] = entry.split('\t');
        const [mode, type, blobSha] = meta.split(' ');
        if (type !== 'blob') continue;
        // Skip symlinks and gitlinks
        if (mode === '120000' || mode === '160000') continue;

        const content = git(['cat-file', '-p', blobSha]);
        const relativePath = path.relative(SKILL_PATH, filePath).replace(/\\/g, '/');
        files[relativePath] = content;
    }
    return Object.keys(files).length === 0 ? null : files;
}

const commits = listCommits();
console.error(`Scanning ${commits.length} commits that touched ${SKILL_PATH}...`);

const hashToCommits = new Map();

for (const sha of commits) {
    const files = readTreeAtCommit(sha);
    if (!files) continue;
    const hash = computeSkillHash(files);
    if (!hashToCommits.has(hash)) hashToCommits.set(hash, []);
    hashToCommits.get(hash).push(sha);
}

const uniqueHashes = [...hashToCommits.keys()].sort();

console.error(`Found ${uniqueHashes.length} distinct hash(es).`);
console.error();

for (const hash of uniqueHashes) {
    const shas = hashToCommits.get(hash);
    console.error(`  ${hash}  (${shas.length} commit${shas.length === 1 ? '' : 's'}, e.g. ${shas[0].slice(0, 7)})`);
}

console.error();
console.error('Paste-ready snippet:');
console.log('unblock: [');
for (const hash of uniqueHashes) {
    console.log(`    '${hash}',`);
}
console.log('],');
