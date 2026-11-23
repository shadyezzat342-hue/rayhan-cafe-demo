const MENU=[
{id:1,c:'قهوة',n:'إسبريسو مزدوج',d:'حبوب برازيلية محمصة محليًا',p:45,},
{id:2,c:'قهوة',n:'لاتيه بالكراميل',d:'حليب مخفوق مع صوص كراميل منزلي',p:70,},
{id:3,c:'قهوة',n:'قهوة تركي',d:'تُقدم مع قطعة راحة',p:40,},
{id:4,c:'قهوة',n:'آيس سبانش لاتيه',d:'مثلجة بحليب مكثف',p:80,},
{id:5,c:'مأكولات',n:'شكشوكة بالجبنة',d:'بيض بصلصة الطماطم والفلفل مع عيش بلدي',p:95,},
{id:6,c:'مأكولات',n:'ساندويتش حلوم مشوي',d:'حلوم وجرجير وطماطم على خبز صاج',p:85,},
{id:7,c:'مأكولات',n:'مكرونة ألفريدو بالدجاج',d:'صوص كريمي وجبنة بارميزان',p:130,},
{id:8,c:'مأكولات',n:'سلطة سيزر',d:'دجاج مشوي وخبز محمص',p:90,},
{id:9,c:'حلويات',n:'كنافة بالمانجو',d:'كنافة مقرمشة مع كريمة ومانجو',p:75,},
{id:10,c:'حلويات',n:'تشيز كيك التوت',d:'قطعة كبيرة بصوص التوت',p:85,},
{id:11,c:'حلويات',n:'أم علي',d:'بالمكسرات في طبق فخار',p:65,},
{id:12,c:'مشروبات',n:'ليموناضة بالنعناع',d:'عصير طازج',p:50,}];
const IC={'cup': '<svg width="62" height="62" viewBox="0 0 64 64" fill="none" stroke="#1f4d3a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 26h30v14a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12z M44 30h6a6 6 0 0 1 0 14h-6 M22 8c-3 4 3 6 0 10 M32 8c-3 4 3 6 0 10"/></svg>', 'plate': '<svg width="62" height="62" viewBox="0 0 64 64" fill="none" stroke="#1f4d3a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="34" r="20"/><circle cx="32" cy="34" r="12"/><path d="M8 10v14M12 10v14M16 10v14M8 24h8M12 24v30 M56 10c-5 4-5 16 0 18v26"/></svg>', 'cake': '<svg width="62" height="62" viewBox="0 0 64 64" fill="none" stroke="#1f4d3a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10 34h44v20H10z M10 44c8 6 14-4 22 2s14-4 22 0 M32 34V20 M32 12c-3 3-3 5 0 8 3-3 3-5 0-8"/></svg>', 'glass': '<svg width="62" height="62" viewBox="0 0 64 64" fill="none" stroke="#1f4d3a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10h32l-4 44H20z M18 26h28 M38 4l-6 22"/></svg>'};const CI={'قهوة':'cup','مأكولات':'plate','حلويات':'cake','مشروبات':'glass'};
const money=n=>n.toLocaleString('ar-EG')+' ج.م';
let cart=JSON.parse(localStorage.getItem('cart')||'{}');
const save=()=>{localStorage.setItem('cart',JSON.stringify(cart));render()};
function toast(t){const x=document.getElementById('toast');x.textContent=t;x.style.display='block';setTimeout(()=>x.style.display='none',2600)}
function render(){
 const el=document.getElementById('items');if(!el)return;
 const ids=Object.keys(cart);let tot=0,cnt=0;
 el.innerHTML=ids.length?ids.map(i=>{const m=MENU.find(x=>x.id==i),q=cart[i];tot+=m.p*q;cnt+=q;
  return `<div class="it"><span>${m.n}<br><small>${money(m.p)}</small></span><span><button onclick="chg(${i},1)">+</button> ${q.toLocaleString('ar-EG')} <button onclick="chg(${i},-1)">−</button></span></div>`}).join(''):'<p style="color:#7a6d5e">السلة فاضية</p>';
 document.getElementById('tot').textContent=money(tot);
 document.querySelectorAll('.cnt').forEach(c=>c.textContent=cnt.toLocaleString('ar-EG'));
}
function chg(i,d){cart[i]=(cart[i]||0)+d;if(cart[i]<=0)delete cart[i];save()}
function toggleCart(){document.getElementById('drawer').classList.toggle('open')}
function checkout(){if(!Object.keys(cart).length)return toast('أضف أصنافًا أولًا');
 const n=document.getElementById('cname').value,a=document.getElementById('caddr').value;
 if(!n||!a)return toast('اكتب الاسم والعنوان');
 cart={};save();toggleCart();toast('تم استلام الطلب (تجريبي). لم يُرسل أي شيء فعليًا.')}
function menu(cat){
 const g=document.getElementById('menu');if(!g)return;
 g.innerHTML=MENU.filter(m=>cat==='الكل'||m.c===cat).map(m=>`<div class="card"><div class="im">${IC[CI[m.c]]}</div><div class="bd"><h3>${m.n}</h3><p>${m.d}</p><div class="row"><span class="price">${money(m.p)}</span><button class="add" onclick="chg(${m.id},1)">أضف</button></div></div></div>`).join('');
 document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.textContent===cat));
}
const chrome=(on)=>{
 document.getElementById('top').innerHTML=`<div class="demo">موقع تجريبي (Demo) لمطعم افتراضي. الأسعار والبيانات للعرض فقط.</div><header><div class="nav"><a class="logo" href="index.html">ريحان كافيه</a><nav>${[['index.html','الرئيسية'],['menu.html','القائمة والطلب'],['booking.html','حجز طاولة']].map(([h,t])=>`<a href="${h}" class="${h===on?'on':''}">${t}</a>`).join('')}</nav><button class="cartbtn" onclick="toggleCart()">السلة (<span class="cnt">٠</span>)</button></div></header>
 <aside class="drawer" id="drawer"><h3>سلة الطلب</h3><div id="items"></div><div class="tot"><span>الإجمالي</span><span id="tot"></span></div><form onsubmit="return false"><label>الاسم<input id="cname"></label><label>العنوان<input id="caddr"></label><button class="btn" onclick="checkout()">إتمام الطلب</button></form></aside><div class="toast" id="toast"></div>`;
 document.getElementById('foot').innerHTML='<div class="wrap">© ريحان كافيه (مشروع تجريبي للعرض) · واجهة أمامية فقط بدون خادم</div>';
 render();
};
