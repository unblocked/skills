#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const repositoryRoot = process.cwd();
const errors = [];

async function readJson(relativePath) {
  try {
    return JSON.parse(await fs.readFile(path.join(repositoryRoot, relativePath), "utf8"));
  } catch (error) {
    errors.push(`${relativePath}: ${error.message}`);
    return null;
  }
}

function readFrontmatter(content) {
  const match = content.replaceAll("\r\n", "\n").match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    return null;
  }

  const fields = new Map();
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator > 0) {
      fields.set(line.slice(0, separator).trim(), line.slice(separator + 1).trim());
    }
  }
  return fields;
}

async function validateSkills() {
  const skillsDirectory = path.join(repositoryRoot, "skills");
  const entries = await fs.readdir(skillsDirectory, { withFileTypes: true });
  const skillDirectories = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    try {
      await fs.access(path.join(skillsDirectory, entry.name, "SKILL.md"));
      skillDirectories.push(entry);
    } catch {
      continue;
    }
  }

  if (skillDirectories.length === 0) {
    errors.push("skills: no skill directories found");
  }

  for (const entry of skillDirectories) {
    const relativePath = path.join("skills", entry.name, "SKILL.md");
    const content = await fs.readFile(path.join(repositoryRoot, relativePath), "utf8");

    const frontmatter = readFrontmatter(content);
    if (!frontmatter) {
      errors.push(`${relativePath}: YAML frontmatter is missing`);
      continue;
    }
    for (const field of ["name", "description"]) {
      if (!frontmatter.get(field)) {
        errors.push(`${relativePath}: frontmatter field ${field} is missing`);
      }
    }
  }
}

const manifest = await readJson(".cursor-plugin/plugin.json");
const mcp = await readJson("mcp.json");

if (manifest) {
  if (!/^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(manifest.name ?? "")) {
    errors.push(".cursor-plugin/plugin.json: name must be lowercase kebab-case");
  }
  if (manifest.skills !== "skills") {
    errors.push('.cursor-plugin/plugin.json: skills must reference "skills"');
  }
  if (manifest.mcpServers !== "mcp.json") {
    errors.push('.cursor-plugin/plugin.json: mcpServers must reference "mcp.json"');
  }
}

if (mcp?.mcpServers?.unblocked?.url !== "https://getunblocked.com/api/mcpsse") {
  errors.push("mcp.json: Unblocked MCP URL is missing or incorrect");
}

await validateSkills();

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Cursor plugin validation passed.");
