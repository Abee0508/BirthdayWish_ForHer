import { put } from '@vercel/blob';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', // Increase limit for file uploads
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { filename, content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ error: 'Filename and content are required' });
  }

  // Vercel Blob expects a Buffer, so we convert the base64 string
  const fileBuffer = Buffer.from(content.split(',')[1], 'base64');

  const blob = await put(filename, fileBuffer, {
    access: 'public',
  });

  return res.status(200).json(blob);
}