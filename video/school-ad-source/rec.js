const { chromium } = require(process.env.PW);
const { spawn } = require('child_process');
(async()=>{
 const [html,out,fps,dur]=[process.argv[2],process.argv[3],+process.argv[4],+process.argv[5]];
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+html); await p.evaluate(()=>document.fonts.ready);
 const ff=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
 const N=Math.round(fps*dur);
 for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/fps); const buf=await p.screenshot({type:'jpeg',quality:95});
   if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r)); if(i%300==0) console.log('frame',i);}
 ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await b.close(); console.log('done');
})();
