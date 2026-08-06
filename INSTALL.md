# Installation Guide

Install path for **chrome-web-store-asset-generator** across mainstream AI agents.

Replace `YOUR_USERNAME` with the GitHub repository owner after publishing.

---

## Quick install (recommended)

### skills CLI — all agents

```bash
npx skills add YOUR_USERNAME/chrome-web-store-asset-generator \
  --skill chrome-web-store-asset-generator \
  -g -y
```

List before installing:

```bash
npx skills add YOUR_USERNAME/chrome-web-store-asset-generator --list
```

### GitHub CLI

```bash
gh skill install YOUR_USERNAME/chrome-web-store-asset-generator chrome-web-store-asset-generator \
  --agent cursor --scope user
```

Supported `--agent` values include: `cursor`, `claude-code`, `codex`, `github-copilot`, `gemini`, `opencode`, and more.

---

## Install paths by agent

| Agent | CLI flag | User scope directory | Project scope directory |
|-------|----------|----------------------|-------------------------|
| Cursor | `cursor` | `~/.cursor/skills/` | `.cursor/skills/` or `.agents/skills/` |
| Claude Code | `claude-code` | `~/.claude/skills/` | `.claude/skills/` |
| Codex | `codex` | `~/.codex/skills/` | `.agents/skills/` |
| GitHub Copilot | `github-copilot` | agent-specific | `.agents/skills/` |
| Gemini CLI | `gemini` | agent-specific | `.agents/skills/` |

Skill folder name after install: `chrome-web-store-asset-generator/`

Required file: `SKILL.md` with YAML frontmatter (`name`, `description`).

---

## Shell installer (manual symlink)

From a cloned repository:

```bash
./scripts/install.sh cursor      # ~/.cursor/skills/
./scripts/install.sh claude        # ~/.claude/skills/
./scripts/install.sh codex         # ~/.codex/skills/
./scripts/install.sh agents        # ~/.agents/skills/
./scripts/install.sh all           # all of the above
```

Project-local install:

```bash
./scripts/install.sh cursor-project   # .cursor/skills/ in current repo
./scripts/install.sh agents-project   # .agents/skills/ in current repo
```

---

## Codex skill-installer

```bash
python3 "$CODEX_HOME/skills/.system/skill-installer/scripts/install-skill-from-github.py" \
  --repo YOUR_USERNAME/chrome-web-store-asset-generator \
  --path skills/chrome-web-store-asset-generator
```

---

## Verify installation

1. Restart your agent or start a new chat session.
2. Attach the skill or type `/chrome-web-store-asset-generator`.
3. The agent should describe the 7-phase workflow (context audit → asset intake → copy proposal → …).

Cursor: confirm `~/.cursor/skills/chrome-web-store-asset-generator/SKILL.md` exists.

Claude Code: confirm `~/.claude/skills/chrome-web-store-asset-generator/SKILL.md` exists.

---

## Uninstall

```bash
npx skills remove chrome-web-store-asset-generator -g   # if installed via skills CLI
rm -rf ~/.cursor/skills/chrome-web-store-asset-generator
rm -rf ~/.claude/skills/chrome-web-store-asset-generator
rm -rf ~/.codex/skills/chrome-web-store-asset-generator
```

---

## Publish checklist (maintainers)

- [ ] `skills/chrome-web-store-asset-generator/SKILL.md` frontmatter valid
- [ ] No real product names or local paths in committed skill files
- [ ] Showcase images in `docs/images/showcase/` depict the **skill workflow** (not a sample extension product)
- [ ] README install commands use correct `YOUR_USERNAME/repo` slug
- [ ] Tag release for `gh skill install …@v1.0.0` pinning
