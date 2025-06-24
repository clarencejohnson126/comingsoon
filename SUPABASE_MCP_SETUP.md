# 🚀 Supabase MCP Setup Guide

## What is Supabase MCP?

The Supabase Model Context Protocol (MCP) allows AI assistants like Claude Code to directly interact with your Supabase database using natural language. This means you can:

- 📊 Query your database with natural language
- 🔍 Search Supabase documentation 
- 🏗️ Generate TypeScript types from your schema
- 📝 Apply database migrations
- 📋 List and manage projects

## 🛠️ Installation Requirements

### Prerequisites
- ✅ Node.js (you have this)
- ✅ Supabase account (you have this) 
- ✅ Your project: `eoahpwciwttfavzpqfnz.supabase.co`

### No Additional Installation Needed!
The MCP server uses `npx` so it downloads automatically when needed.

## 🔑 Step 1: Generate Personal Access Token

1. **Go to Supabase Account Settings**
   ```
   https://app.supabase.com/account/tokens
   ```

2. **Create New Token**
   - Click **"Generate new token"**
   - Name: `Claude Code MCP Server`
   - Scopes: Select all (or at minimum: `projects:read`, `organizations:read`)
   - Click **"Generate token"**

3. **Copy the Token**
   - Copy the token immediately (starts with `sbp_`)
   - You won't be able to see it again!

## 🔧 Step 2: Configure MCP

1. **Update the MCP configuration file** (already created for you):
   ```
   .claude/mcp.json
   ```

2. **Replace the placeholder** with your actual token:
   ```json
   {
     "mcpServers": {
       "supabase": {
         "command": "npx",
         "args": [
           "-y",
           "@supabase/mcp-server-supabase@latest",
           "--read-only",
           "--project-ref=eoahpwciwttfavzpqfnz"
         ],
         "env": {
           "SUPABASE_ACCESS_TOKEN": "sbp_your_actual_token_here"
         }
       }
     }
   }
   ```

## 🎯 Step 3: Test MCP Integration

Once configured, you can ask Claude Code to:

### Query Your Database
```
"Show me all emails in the blacklist_signups table"
"How many users signed up today?"
"What's the email workflow status for recent signups?"
```

### Generate Types
```
"Generate TypeScript types for my Supabase schema"
"Create interfaces for the blacklist_signups table"
```

### Search Documentation
```
"How do I set up real-time subscriptions in Supabase?"
"Show me Supabase Edge Functions documentation"
```

## 🔒 Security Features

### Read-Only Mode
The configuration uses `--read-only` flag which:
- ✅ Allows SELECT queries
- ❌ Prevents INSERT/UPDATE/DELETE
- ✅ Safe for AI interactions
- ❌ Can't accidentally modify data

### Project Scoped
The configuration uses `--project-ref` which:
- ✅ Only accesses your specific project
- ❌ Can't access other Supabase projects
- ✅ Maintains data isolation

## 🚀 Available MCP Tools

Once configured, these tools become available:

| Tool | Description |
|------|-------------|
| `search_docs` | Search Supabase documentation |
| `generate_typescript_types` | Generate TS types from schema |
| `list_projects` | List your Supabase projects |
| `apply_migration` | Apply SQL migrations (if not read-only) |
| `execute_sql` | Run SQL queries |

## 🎉 Example Usage

After setup, you can ask Claude Code:

```
"Show me the schema for my blacklist_signups table"
"How many people joined the blacklist today?"
"Generate TypeScript interfaces for all my tables"
"Search the docs for Edge Functions examples"
```

## 🐛 Troubleshooting

### Token Issues
- Make sure token starts with `sbp_`
- Check token has correct permissions
- Regenerate if needed

### Connection Issues
- Verify project ref: `eoahpwciwttfavzpqfnz`
- Check Node.js is installed
- Restart Claude Code after configuration

### Permission Issues
- Ensure read permissions on your project
- Check if you're the project owner
- Verify organization access

## 🔄 Windows Users

If you're on Windows, you might need to modify the command:

```json
{
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@supabase/mcp-server-supabase@latest", ...]
}
```

## ✅ Verification

Test your setup by asking Claude Code:
```
"Can you connect to my Supabase project and show me the tables?"
```

If successful, you'll see your database schema and can start querying with natural language! 🎉

---

**Your MCP Configuration File**: `.claude/mcp.json`
**Your Project**: `eoahpwciwttfavzpqfnz.supabase.co`
**Next**: Add your personal access token and start querying!