import fs from 'node:fs';
import assert from 'node:assert/strict';
const key=fs.readFileSync('.dev.vars','utf8').trim().split('=')[1];
const base='http://localhost:3000';
async function call(action,data={},password=key){const r=await fetch(base+'/api/content',{method:'POST',headers:{'Content-Type':'application/json','X-Admin-Key':password},body:JSON.stringify({action,...data})});return [r.status,await r.json()];}
assert.equal((await call('login',{},'wrong'))[0],401);
assert.equal((await call('login'))[0],200);
const fd=new FormData();fd.append('file',new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aP1sAAAAASUVORK5CYII=','base64')],{type:'image/png'}),'ocean.png');
const ur=await fetch(base+'/api/media',{method:'POST',headers:{'X-Admin-Key':key},body:fd});assert.equal(ur.status,200);const {url}=await ur.json();assert.equal((await fetch(base+url)).status,200);
const [status,p]=await call('post',{caption:'Integration test',image:url});assert.equal(status,200);
let content=await (await fetch(base+'/api/content')).json();assert(content.posts.some(x=>x.id===p.id));
assert.equal((await call('edit',{id:p.id,caption:'Edited test',image:url}))[0],200);
content=await (await fetch(base+'/api/content')).json();assert.equal(content.posts.find(x=>x.id===p.id).caption,'Edited test');
assert.equal((await call('profile',{bio:'สวัสดีค่า มิร่าเอง ♡ ชอบทะเล อนิเมะ และการเขียนโค้ด ยินดีที่ได้รู้จักนะ!',avatar:'/ocean.png',cover:'/ocean.png'}))[0],200);
assert.equal((await call('log',{text:'Integration test log'}))[0],200);
assert.equal((await call('delete',{id:p.id}))[0],200);
assert.equal((await call('post',{caption:'',image:'javascript:bad'}))[0],400);
const bad=new FormData();bad.append('file',new Blob(['not an image'],{type:'image/png'}),'fake.png');assert.equal((await fetch(base+'/api/media',{method:'POST',headers:{'X-Admin-Key':key},body:bad})).status,400);
console.log('PASS: login protection, image upload/read, create/edit/delete, persistence read-back, profile, updates, invalid inputs');

