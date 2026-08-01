import { NextRequest, NextResponse } from 'next/server';
import { readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Data directory path
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  
  if (!existsSync(LEADS_FILE)) {
    await writeFile(LEADS_FILE, JSON.stringify([], null, 2));
  }
}

export async function GET(request: NextRequest) {
  try {
    await ensureDataDir();
    const leads = JSON.parse(await readFile(LEADS_FILE, 'utf8'));
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error getting leads:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}