function Distort(e,t){this.source=e,this.distort=t,this.getValue=function(e,t){return this.source.getValue(e+this.distort.getValue(e,t),t)}}function ImprovedNoise(e){var t=function(e){return e*e*e*(e*(6*e-15)+10)},n=function(e,t,n){return t+e*(n-t)},r=function(e,t,n,r){var a=(e&=15)<8?t:n,i=4>e?n:12!=e&&14!=e?r:t
return(0==(1&e)?a:-a)+(0==(2&e)?i:-i)}
this.p=[]
for(var a=0;256>a;a++)this.p[a]=a
for(var a=0;256>a;a++){var i=Math.round(e*(256-a))+a,s=this.p[a]
this.p[a]=this.p[i],this.p[i]=s,this.p[a+256]=this.p[a]}this.getValue=function(e,a){var i=0,s=a,o=e,u=255&Math.floor(e),l=255&Math.floor(a),c=255&Math.floor(0)
o-=Math.floor(o),s-=Math.floor(s),i=0-Math.floor(0)
var h=t(o),_=t(s),f=t(i),d=this.p[u]+l,p=this.p[d]+c
return d=this.p[d+1]+c,u=this.p[u+1]+l,l=this.p[u]+c,u=this.p[u+1]+c,n(f,n(_,n(h,r(this.p[p],o,s,i),r(this.p[l],o-1,s,i)),n(h,r(this.p[d],o,s-1,i),r(this.p[u],o-1,s-1,i))),n(_,n(h,r(this.p[p+1],o,s,i-1),r(this.p[l+1],o-1,s,i-1)),n(h,r(this.p[d+1],o,s-1,i-1),r(this.p[u+1],o-1,s-1,i-1))))}}function PerlinNoise(e,t){for(var n=[],t=8,r=0;8>r;++r)n[r]=new ImprovedNoise(e)
this.getValue=function(e,r){for(var a=0,i=1,s=0;t>s;s++)a+=n[s].getValue(e*i,r*i)/i,i/=2
return a}}function Random(e){this._seed=e%2147483647,this._seed<=0&&(this._seed+=2147483646)}function startGeneration(e){var t=new RandomLevel,n=e.worldSize,r=e.worldSize,a=64
t.createLevel(e.seed,n,r,a)}Random.prototype.next=function(){return this._seed=16807*this._seed%2147483647},Random.prototype.nextInt=function(e){return Math.floor(this.nextFloat()*e)},Random.prototype.nextFloat=function(e,t){return(this.next()-1)/2147483646}
var RandomLevel=function(){var e={string:"",percent:0,tiles:null}
this.createLevel=function(t,n,r,a){var i=new Random(t)
this.xSize=n,this.ySize=64,this.zSize=r,this.random=i.nextFloat(),this.tiles=[],this.fillQueue=[],this.grow=function(t){for(var n=this.xSize,r=this.zSize,a=this.ySize,i=new PerlinNoise(this.random,8),s=new PerlinNoise(this.random,8),o=0;n>o;++o){e.percent=100*o/(this.xSize-1),self.postMessage(e)
for(var u=0;r>u;++u){var l,c,h=i.getValue(o,u)>8,_=s.getValue(o,u)>12,f=parseInt(((l=parseInt(t[o+u*n],10))*this.zSize+u)*this.xSize+o,10)
if(7==(c=255&parseInt(this.tiles[((l+1)*this.zSize+u)*this.xSize+o],10))&&a/2-1>=l&&_&&(this.tiles[f]=12),0==c){var d=1
a/2-1>=l&&h&&(d=11),this.tiles[f]=d}}}},this.melt=function(){for(var t=0,n=this.xSize*this.zSize*this.ySize/1e4,r=0;n>r;++r){r%100==0&&(e.percent=100*r/(n-1),self.postMessage(e))
var a=16,s=i.nextInt(this.xSize),o=i.nextInt(this.ySize/2-4)+a,u=i.nextInt(this.zSize)
0==this.tiles[(o*this.zSize+u)*this.xSize+s]&&(++t,this.floodFill(s,o,u,0,17))}},this.plant=function(t){for(var n=this.xSize,r=this.xSize*this.zSize/4e3,a=0;r>a;++a){e.percent=100*a/(r-1),self.postMessage(e)
for(var s=i.nextInt(this.xSize),o=i.nextInt(this.zSize),u=0;20>u;++u)for(var l=s,c=o,h=0;20>h;++h)if(l+=i.nextInt(6)-i.nextInt(6),c+=i.nextInt(6)-i.nextInt(6),l>=0&&c>=0&&l<this.xSize&&c<this.zSize){var _,f,d,p=t[l+c*n]+1,v=i.nextInt(3)+4,m=!0
for(_=p;p+1+v>=_;++_){var g=1
for(_>=p+1+v-2&&(g=2),f=l-g;l+g>=f&&m;++f)for(d=c-g;c+g>=d&&m;++d)f>=0&&_>=0&&d>=0&&f<this.xSize&&_<this.ySize&&d<this.zSize?0!=(255&this.tiles[(_*this.zSize+d)*this.xSize+f])&&(m=!1):m=!1}if(m&&(_=(p*this.zSize+c)*this.xSize+l,1==(255&this.tiles[((p-1)*this.zSize+c)*this.xSize+l])&&p<this.ySize-v-1)){for(this.tiles[_-1*this.xSize*this.zSize]=3,f=p-3+v;p+v>=f;++f){d=f-(p+v)
for(var y=parseInt(1-d/2,10),C=l-y;l+y>=C;++C)for(var S=parseInt(C-l,10),k=c-y;c+y>=k;++k){var I=parseInt(k-c,10);(Math.abs(S)!=y||Math.abs(I)!=y||0!=i.nextInt(2)&&0!=d)&&(this.tiles[(f*this.zSize+k)*this.xSize+C]=14)}}for(f=0;v>f;++f)this.tiles[_+f*this.xSize*this.zSize]=13}}}},this.placeOre=function(t,n,r,a){a=this.xSize
for(var s=this.zSize,o=this.ySize,u=a*s*o/256/64*n/100,l=0;u>l;++l){e.percent=100*l/(u-1)/4+100*r/4,self.postMessage(e)
for(var c=i.nextFloat()*a,h=i.nextFloat()*o,_=i.nextFloat()*s,f=parseInt(75*(i.nextFloat()+i.nextFloat())*n/100,10),d=3.141592653589793*i.nextFloat()*2,p=0,v=3.141592653589793*i.nextFloat()*2,m=0,g=0;f>g;++g){c+=Math.sin(d)*Math.cos(v),_+=Math.cos(d)*Math.cos(v),h+=Math.sin(v),d+=.2*p,p=(p*=.9)+(i.nextFloat()-i.nextFloat()),v=.5*(v+.5*m),m=(m*=.9)+(i.nextFloat()-i.nextFloat())
for(var y=Math.sin(3.141592653589793*g/f)*n/100+1,C=Math.round(c-y);C<=Math.round(c+y);++C)for(var S=Math.round(h-y);S<=Math.round(h+y);++S)for(var k=Math.round(_-y);k<=Math.round(_+y);++k){var I=C-c,b=S-h,T=k-_
if(y*y>I*I+b*b*2+T*T&&C>=1&&S>=1&&k>=1&&C<this.xSize-1&&S<this.ySize-1&&k<this.zSize-1){var G=parseInt((S*this.zSize+k)*this.xSize+C,10)
2==this.tiles[G]&&(this.tiles[G]=t)}}}}},this.floodFill=function(e,t,r,i,s){for(var o=1,u=1;n>1<<o;)o++
for(;a>1<<u;)u++
var l=this.zSize-1,c=this.xSize-1,h=1
this.fillQueue[0]=((t<<u)+r<<o)+e
for(var _=0,f=this.xSize*this.zSize;h>0;){--h
var d=this.fillQueue[h],p=d>>o&l,v=d>>o+u,m=0,g=0
for(g=m=d&c;m>0&&0==this.tiles[d-1];--d)--m
for(;g<this.xSize&&0==this.tiles[d+g-m];)++g
var y=d>>o&l,C=d>>o+u;(y!=p||C!=v)&&console.log("hoooly fuck")
var S=!1,k=!1,I=!1
for(_+=g-m,m=m;g>m;++m){this.tiles[d]=s
var b
if(p>0&&((b=0==this.tiles[d-this.xSize])&&!S&&(this.fillQueue[h++]=d-this.xSize),S=b),p<this.zSize-1&&((b=0==this.tiles[d+this.xSize])&&!k&&(this.fillQueue[h++]=d+this.xSize),k=b),v>0){var T=this.tiles[d-f]
17==s&&7==T&&(this.tiles[d-f]=2),(b=0==T)&&!I&&(this.fillQueue[h++]=d-f),I=b}++d}}return _},e.string="Raising.."
var s,o,u=new Distort(new PerlinNoise(this.random,8),new PerlinNoise(this.random,8)),l=new Distort(new PerlinNoise(this.random,8),new PerlinNoise(this.random,8)),c=new PerlinNoise(this.random,8),h=[],_=1.3
for(s=0;n>s;++s)for(e.percent=100*s/(n-1),self.postMessage(e),o=0;r>o;++o){var f=u.getValue(s*_,o*_)/8-8,d=l.getValue(s*_,o*_)/6+6
c.getValue(s,o)/8>0&&(d=f)
var p;(p=Math.max(f,d)/2)<0&&(p*=.8),h[s+o*n]=p}e.string="Eroding.."
var v=h
l=new Distort(new PerlinNoise(this.random,8),new PerlinNoise(this.random,8))
var m,g,y,C,S=new Distort(new PerlinNoise(this.random,8),new PerlinNoise(this.random,8))
for(m=0;n>m;++m)for(e.percent=100*m/(n-1),self.postMessage(e),g=0;r>g;++g){var k=l.getValue(m<<1,g<<1)/8
y=S.getValue(m<<1,g<<1)>0?1:0,k>2&&(C=((v[m+g*n]-y)/2<<1)+y,v[m+g*n]=C)}e.string="Soiling..",v=h
var I=this.xSize,b=this.zSize
m=this.ySize
var T,G,A=new PerlinNoise(this.random,8)
for(s=0;I>s;++s)for(e.percent=100*s/(n-1),self.postMessage(e),o=0;b>o;++o)for(y=A.getValue(s,o)/24-4,T=(C=v[s+o*I]+m/2)+y,v[s+o*I]=Math.max(C,T),G=0;m>G;++G){var x=(G*r+o)*n+s,R=0
C>=G&&(R=3),T>=G&&(R=2),this.tiles[x]=R}for(e.string="Carving..",b=this.xSize,m=this.zSize,g=this.ySize,s=b*m*g/256/64,o=0;s>o;++o){e.percent=100*o/(s-1)/4,self.postMessage(e)
var E=i.nextFloat()*b,P=i.nextFloat()*g,M=i.nextFloat()*m
G=75*(i.nextFloat()+i.nextFloat())
for(var w=3.141592653589793*i.nextFloat()*2,O=0,D=3.141592653589793*i.nextFloat()*2,L=0,B=0;G>B;++B)if(E+=Math.sin(w)*Math.cos(D),M+=Math.cos(w)*Math.cos(D),P+=Math.sin(D),w+=.2*O,O=(O*=.9)+(i.nextFloat()-i.nextFloat()),D=.5*(D+.5*L),L=(L*=.9)+(i.nextFloat()-i.nextFloat()),i.nextFloat()>=.3)for(var F=E+4*i.nextFloat()-2,N=P+4*i.nextFloat()-2,H=M+4*i.nextFloat()-2,U=2.5*Math.sin(3.141592653589793*B/G)+1,W=parseInt(F-U,10);W<=parseInt(F+U,10);++W)for(var V=parseInt(N-U,10);V<=parseInt(N+U,10);++V)for(var j=H-U;H+U>=j;++j){var Y=W-F,X=V-N,z=j-H
if(U*U>Y*Y+X*X*2+z*z&&W>=1&&V>=1&&j>=1&&n-1>W&&a-1>V&&r-1>j){var K=parseInt((V*r+j)*n+W,10)
2==this.tiles[K]&&(this.tiles[K]=0)}}}this.placeOre(20,90,1,4),this.placeOre(19,70,2,4),this.placeOre(18,50,3,4),e.string="Watering.."
var J=(i.nextFloat(),0)
s=7
var q=29
for(n>=256&&(q=92),n>=512&&(q=219),o=0;n>o;++o)J=J+this.floodFill(o,a/2-1+q,0,0,s)+this.floodFill(o,a/2-1,r-1+q,0,s)
for(o=0;r>o;++o)J=J+this.floodFill(0,a/2-1+q,o,0,s)+this.floodFill(n-1,a/2-1+q,o,0,s)
for(o=n*r/200,y=0;o>y;++y)y%100==0&&(e.percent=100*y/(o-1),self.postMessage(e)),C=i.nextInt(n),T=a/2-1-i.nextInt(3)+q,G=i.nextInt(r),0==this.tiles[(T*r+G)*n+C]&&(J+=this.floodFill(C,T,G,0,s))
e.percent=100,self.postMessage(e),e.string="Melting..",this.melt(),e.string="Growing..",this.grow(h),e.string="Planting..",this.plant(h),e.tiles=this.tiles,e.string="",self.postMessage(e)}}
self.addEventListener("message",function(e){startGeneration(e.data)},!1)
