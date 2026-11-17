import numpy as np, wave
SR=44100; D=60.0; N=int(SR*D); rng=np.random.default_rng(11)
M=np.zeros((N,2)); FX=np.zeros((N,2))
def T(d): return np.arange(int(d*SR))/SR
def mtof(m): return 440*2**((m-69)/12)
def add(buf,sig,st,pan=0.,g=1.):
    i=int(st*SR)
    if i>=N: return
    j=min(N,i+len(sig)); s=sig[:j-i]*g
    buf[i:j,0]+=s*(1-max(pan,0)); buf[i:j,1]+=s*(1+min(pan,0))
def pluck(f,d=.6,v=.2):
    t=T(d); return (np.sin(2*np.pi*f*t)+.4*np.sin(4*np.pi*f*t)*np.exp(-t*9)+.15*np.sin(6*np.pi*f*t)*np.exp(-t*14))*np.exp(-t*5)*(1-np.exp(-t*400))*v
def pad(f,d,v=.05):
    t=T(d); e=np.minimum(1,t/.5)*np.minimum(1,(d-t)/.5)
    return sum(np.sin(2*np.pi*f*k*t+p) for k,p in [(1,0),(1.004,1),(.996,2)])/3*e*v
def kick(v=.8):
    t=T(.35); f=48+120*np.exp(-t*30); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*8)*v
def clap(v=.25):
    t=T(.2); n=np.diff(rng.standard_normal(len(t)+1)); e=np.exp(-t*25)
    for o in (0,.01,.02): e+=np.exp(-np.clip(t-o,0,None)*140)*(t>=o)*.5
    return n*e*v
def hat(v=.06):
    t=T(.05); return np.diff(rng.standard_normal(len(t)+1))*np.exp(-t*90)*v
def bass(m,d,v=.35):
    t=T(d); e=np.minimum(1,(d-t)/.03)*(1-np.exp(-t*300)); f=mtof(m)
    return (np.sin(2*np.pi*f*t)+.25*np.tanh(2*np.sin(2*np.pi*f*t)))*e*v
# --- part A: tense 0-15 (Am F Dm E), 96 bpm
b=60/96; bar=4*b
progA=[[57,60,64],[53,57,60],[50,53,57],[52,56,59]]; bA=[45,41,38,40]
t0=0; k=0
while t0<15:
    c=progA[k%4]
    for m in c: add(M,pad(mtof(m),min(bar+.4,15.3-t0),.05),t0)
    for q in range(8):
        tt=t0+q*b/2
        if tt<15: add(M,bass(bA[k%4],b/2*.9,.22),tt)
    t0+=bar; k+=1
for i in range(int(15/.5)):  # clock tick
    t=T(.03); add(FX,np.sin(2*np.pi*(2400 if i%2 else 1800)*t)*np.exp(-t*200)*.12,i*.5,.4)
# --- part B: upbeat 15-60 (C G Am F), 112 bpm
b=60/112; bar=4*b
progB=[[60,64,67],[59,62,67],[57,60,64],[57,60,65]]; bB=[36,43,45,41]
start=15.0; k=0; t0=start
arp=[0,1,2,1,0,2,1,2]
while t0<59.5:
    c=progB[k%4]; big= t0>=52
    for m in c: add(M,pad(mtof(m+12),bar+.4,.035),t0)
    for q in range(4):
        tt=t0+q*b
        if tt>=59.6: break
        add(M,kick(.7 if not big else .85),tt)
        if q%2: add(M,clap(.22),tt)
        add(M,hat(),tt+b/2,.3)
        add(M,bass(bB[k%4],b*.45),tt); add(M,bass(bB[k%4]+12,b*.4,.18),tt+b/2)
    for q in range(8):
        tt=t0+q*b/2
        if tt<59.6: add(M,pluck(mtof(c[arp[q]]+12+(12 if big and q%4==3 else 0)),.5,.09),tt,.25*np.sin(q))
    t0+=bar; k+=1
# final hit
for m in [48,60,64,67,72]: add(M,pluck(mtof(m),2.0,.18),59.0)
# --- SFX
def pop(v=.35):
    t=T(.12); f=500+900*np.exp(-t*40); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*30)*v
def ding(f=1568,v=.18):
    t=T(.6); return (np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*2.01*t))*np.exp(-t*7)*v
def whoosh(d=.55,v=.35):
    t=T(d); n=rng.standard_normal(len(t)); o=np.zeros_like(n); a=0; cut=np.sin(np.linspace(0,np.pi,len(t)))*.35+.02
    for i in range(len(n)): a+=cut[i]*(n[i]-a); o[i]=a
    return o*np.sin(np.linspace(0,np.pi,len(t)))*v
def ring(st):
    for r in range(2):
        t=T(.35); s=(np.sin(2*np.pi*1300*t)*np.sign(np.sin(2*np.pi*20*t))*.5+.5*np.sin(2*np.pi*1600*t))*.06
        add(FX,s,st+r*.5,-.3)
def thump(v=.6):
    t=T(.3); f=60+80*np.exp(-t*20); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*12)*v+rng.standard_normal(len(t))*np.exp(-t*40)*.15
for s in (14.8,20.6,44.4,51.6): add(FX,whoosh(),s)
for i in range(4): add(FX,pop(),7.6+i*1.4)
ring(9.6); ring(11.2)
add(FX,ding(1760,.2),17.6)
for i in range(5): add(FX,ding(1318 if i==3 else 1568,.14),22+i*.45)
for i in range(5): add(FX,pop(.2),26.4+i*.4)
add(FX,thump(),33.6)
for i in range(3): add(FX,ding(1975,.12),36.2+i)
add(FX,ding(1568,.12),42.8)
for i,f in enumerate([1568,1976,2349,3136]): add(FX,ding(f,.1),45.4+i*.12)
add(FX,pop(.3),54.2)
def save(name,x):
    x=x/np.abs(x).max()*.9; w=wave.open(name,'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x*32767).astype('<i2').tobytes()); w.close()
M=np.apply_along_axis(lambda x: np.convolve(x,np.ones(4)/4,'same'),0,M)
t=np.arange(N)/SR; M*=np.minimum(1,(D-t)/0.8)[:,None]
save('music.wav',M); save('fx.wav',FX)
