import sys, os, json, numpy as np, soundfile as sf, sherpa_onnx
M=sys.argv[1]
L=[(0.4,7.0,"مدیر صاحب، هنوز هم حاضری، فیس و نتایج شاگردان را روی کاغذ حساب می‌کنید؟"),
(7.3,14.8,"فیس‌ها گم می‌شوند، ساختن شُقه روزها وقت می‌گیرد، و والدین بی‌خبر می‌مانند."),
(15.3,20.8,"حالا یک راه ساده وجود دارد: سیستم هوشمند مدیریت مکتب."),
(21.2,25.6,"حاضری شاگردان را با یک کلیک ثبت کنید."),
(26.0,30.4,"فیس هر شاگرد و بدهکاران را فوری ببینید."),
(30.8,35.2,"نتایج و شُقه را در چند دقیقه آماده و چاپ کنید."),
(35.6,40.0,"برای والدین پیام بفرستید تا همیشه در جریان باشند."),
(40.4,44.8,"معاش استادان و حساب مالی مکتب، همه در یک جا."),
(45.3,48.6,"کار کمتر، نظم بیشتر، و والدینِ راضی."),
(48.8,51.8,"مکتب شما، امروزی و حرفه‌ای."),
(52.6,58.8,"همین حالا پیام بدهید و نمایش رایگان سیستم را ببینید.")]
onnx=[f for f in os.listdir(M) if f.endswith('.onnx')][0]
tts=sherpa_onnx.OfflineTts(sherpa_onnx.OfflineTtsConfig(model=sherpa_onnx.OfflineTtsModelConfig(vits=sherpa_onnx.OfflineTtsVitsModelConfig(
 model=f"{M}/{onnx}",tokens=f"{M}/tokens.txt",data_dir=f"{M}/espeak-ng-data",noise_scale=0.6,noise_scale_w=0.9),num_threads=4)))
TOTAL=60.0; out=None; caps=[]
for a,b,txt in L:
    sp=1.0
    while True:
        g=tts.generate(txt,sid=0,speed=sp); s=np.array(g.samples); sr=g.sample_rate
        # trim silence
        nz=np.where(np.abs(s)>0.01)[0]; s=s[max(0,nz[0]-200):nz[-1]+800]
        d=len(s)/sr
        if d<=b-a or sp>=1.35: break
        sp=round(sp+0.05,2)
    if out is None: out=np.zeros(int(TOTAL*sr))
    j=int(a*sr); out[j:j+len(s)]+=s[:len(out)-j]
    caps.append([a,round(a+d+0.25,2),txt]); print(f"{a:5.1f} d={d:.2f} win={b-a:.2f} sp={sp}")
sf.write('vo_raw.wav',out,sr); json.dump(caps,open('caps.json','w'),ensure_ascii=False)
