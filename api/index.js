import { web } from '../src/app/web.js';

export default function handler(req, res) {
  return web(req, res);
}