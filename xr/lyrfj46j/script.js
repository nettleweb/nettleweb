/**
 * Pong code taken from http://codegolf.stackexchange.com/questions/10713/pong-in-the-shortest-code
 * to demonstrate responsive canvas
 */

c=document.getElementById('c').getContext('2d')
c.fillStyle="#FFF"
c.font="60px monospace"
w=s=1
p=q=a=b=0
m=n=190
x=300;y=235
u=-5;v=3
setInterval(function(){if(w&&!s)return;s=0
c.clearRect(0,0,640,480)
for(i=5;i<480;i+=20)c.fillRect(318,i,4,10)
m+=p;n+=q
m=m<0?0:m;m=m>380?380:m
n=n<0?0:n;n=n>380?380:n
x+=u;y+=v
if(y<=0){y=0;v=-v}
if(y>=470){y=470;v=-v}
if(x<=40&&x>=20&&y<m+110&&y>m-10){u=-u+0.2;v+=(y-m-45)/20}
if(x<=610&&x>=590&&y<n+110&&y>n-10){u=-u-0.2;v+=(y-n-45)/20}
if(x<-10){b++;x=360;y=235;u=5;w=1}
if(x>640){a++;x=280;y=235;u=-5;w=1}
c.fillText(a+" "+b,266,60)
c.fillRect(20,m,20,100)
c.fillRect(600,n,20,100)
c.fillRect(x,y,10,10)},30)
document.onkeydown=function(e){k=(e||window.event).keyCode;w=w?0:k=='27'?1:0;p=k=='65'?5:k=='81'?-5:p;q=k=='40'?5:k=='38'?-5:q;}
document.onkeyup=function(e){k=(e||window.event).keyCode;p=k=='65'||k=='81'?0:p;q=k=='38'||k=='40'?0:q}


/* Variable index:
a -> left player score
b -> right player score
c -> context
e -> event
i -> counter for dashed line
k -> keycode
m -> left paddle y
n -> right paddle y
p -> left paddle y velocity
q -> right paddle y velocity
s -> is start of game
u -> ball x velocity
v -> ball y velocity
w -> game is waiting (paused)
x -> ball x
y -> ball y
*/