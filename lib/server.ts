import {env} from 'cloudflare:workers';
export const bindings=()=>env as unknown as {DB:D1Database;MEDIA:R2Bucket;ADMIN_PASSWORD?:string};
export async function authorized(r:Request){const secret=bindings().ADMIN_PASSWORD;if(!secret)return false;const key=r.headers.get('X-Admin-Key')||'';if(key.length>256)return false;const enc=new TextEncoder();const [a,b]=await Promise.all([crypto.subtle.digest('SHA-256',enc.encode(secret)),crypto.subtle.digest('SHA-256',enc.encode(key))]);let diff=0;const x=new Uint8Array(a),y=new Uint8Array(b);for(let i=0;i<x.length;i++)diff|=x[i]^y[i];return diff===0;}
export const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export function sameOrigin(r:Request){const origin=r.headers.get('Origin');return !origin||origin===new URL(r.url).origin;}
export const validImage=(s:unknown):s is string=>typeof s==='string'&&(s==='/ocean.png'||/^\/api\/media\/[a-f0-9-]+$/.test(s));
