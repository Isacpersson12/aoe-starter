
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import RSSParser from 'rss-parser';
import { nanoid } from 'nanoid';

const root = process.cwd();
const feedsPath = path.join(root, 'feeds.yml');
const outDir = path.join(root, 'src', 'opps');
const dataStorePath = path.join(root, 'data', 'index.json');

const parser = new RSSParser({
  timeout: 10000,
  headers: { 'user-agent': 'aoe-bot/1.0 (+https://example.com)' }
});

function safe(v, def='') { return (v===undefined || v===null) ? def : String(v); }

function ensureDir(p){ fs.mkdirSync(p, { recursive: true }); }

function loadJSON(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf-8')); }
  catch { return fallback; }
}

function saveJSON(p, obj) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(obj, null, 2));
}

function fm(obj){
  // naive front-matter builder
  const keys = Object.keys(obj);
  const lines = ['---'];
  for(const k of keys){
    let v = obj[k];
    if(Array.isArray(v)){
      lines.push(`${k}:`);
      for(const it of v){ lines.push(`  - ${String(it).replace(/\n/g, ' ')}`); }
    } else {
      lines.push(`${k}: "${String(v).replace(/"/g, '\"')}"`);
    }
  }
  lines.push('---\n');
  return lines.join('\n');
}

// try to extract a deadline-like date from text using a regex provided per-feed
function extractDeadline(text, regexStr){
  if(!regexStr) return "";
  try{
    const re = new RegExp(regexStr, 'i');
    const m = String(text||'').match(re);
    if(m && m[1]) return m[1];
  } catch(e){}
  return "";
}

async function run(){
  ensureDir(outDir);
  const feeds = YAML.parse(fs.readFileSync(feedsPath, 'utf-8'));
  const store = loadJSON(dataStorePath, { seen: {} });
  let newCount = 0;

  for(const feed of feeds){
    const { name, url, country='EU', discipline='Mixed', deadline_regex } = feed;
    if(!url){ console.warn('Missing url for feed', name); continue; }
    console.log('Fetching', name, url);
    try{
      const res = await parser.parseURL(url);
      for(const item of res.items || []){
        const link = item.link || item.guid || item.id;
        if(!link) continue;
        const key = link.trim();
        if(store.seen[key]) continue; // dedupe

        const deadline = extractDeadline(`${item.title} ${item.contentSnippet||item.content||''}`, deadline_regex);
        const id = nanoid(8);
        const front = {
          title: safe(item.title, 'Untitled'),
          country, discipline,
          deadline: safe(deadline),
          source: safe(link),
          credits: []
        };
        const body = safe(item.contentSnippet || item.content || res.title || '');
        const md = fm(front) + body + "\n";
        const outFile = path.join(outDir, `${id}.md`);
        fs.writeFileSync(outFile, md, 'utf-8');
        store.seen[key] = { id, added_at: new Date().toISOString(), feed: name };
        newCount++;
      }
    }catch(e){
      console.error('Feed error', name, url, e.message);
    }
  }

  saveJSON(dataStorePath, store);
  console.log(`New items: ${newCount}`);
}

run().catch(err=>{
  console.error(err);
  process.exit(1);
});
