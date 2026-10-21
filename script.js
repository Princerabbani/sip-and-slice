const menuItems = [
  {id:1,name:"Classic Margherita",category:"pizza",price:179,tag:"Crowd favourite",desc:"Tomato, mozzarella and fresh basil.",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Garden Veggie Pizza",category:"pizza",price:229,tag:"Fresh & colourful",desc:"A colourful mix of veggies and cheese.",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Cheesy Crunch Burger",category:"burger",price:149,tag:"Big bite energy",desc:"A crispy patty, cheese and house-style sauce.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Classic Veg Burger",category:"burger",price:119,tag:"The classic",desc:"A satisfying veggie patty with fresh crunch.",image:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Golden French Fries",category:"sides",price:89,tag:"Perfect sidekick",desc:"Golden, crispy and made for sharing.",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Loaded Nachos",category:"sides",price:139,tag:"Snack o'clock",desc:"Crunchy nachos with a cheesy topping.",image:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Iced Coffee",category:"drinks",price:99,tag:"Cool & creamy",desc:"A chilled coffee break, any time of day.",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Strawberry Cooler",category:"drinks",price:89,tag:"Berry refreshing",desc:"A fruity, refreshing sip for sunny days.",image:"https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80"}
];
const grid = document.getElementById('menuGrid');
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2800)}
function renderMenu(category='all'){
  const items=menuItems.filter(item=>category==='all'||item.category===category);
  grid.innerHTML=items.map(item=>`<article class="menu-card"><div class="menu-image"><img src="${item.image}" alt="${item.name}" loading="lazy"><span class="menu-tag">${item.tag}</span></div><div class="menu-info"><h3>${item.name}</h3><p>${item.desc}</p><div class="menu-card-bottom"><span class="price">₹${item.price}</span><button class="add-button" data-item="${item.id}" type="button">Add to order +</button></div></div></article>`).join('');
}
document.querySelectorAll('.category-tab').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.category-tab').forEach(b=>b.classList.remove('active'));button.classList.add('active');renderMenu(button.dataset.category)}));
grid.addEventListener('click',event=>{const button=event.target.closest('[data-item]');if(!button)return;const item=menuItems.find(product=>product.id===Number(button.dataset.item));const config=window.restaurantConfig||{};const number=String(config.whatsapp||'').replace(/\D/g,'');if(number&&number!=='') {const message=`Hi ${config.name||'Sip & Slice'}! I'd like to order: ${item.name} (₹${item.price}). Please confirm availability.`;window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,'_blank','noopener')}else{showToast(`Added ${item.name} to your selection. Add your WhatsApp number in config.js to enable ordering.`)}});
const config=window.restaurantConfig||{};
if(config.address)document.getElementById('addressText').textContent=config.address;
if(config.googleMaps&&config.googleMaps.startsWith('http'))document.getElementById('mapLink').href=config.googleMaps;
if(config.openingHours){const days=Object.values(config.openingHours);const allSame=days.length&&days.every(day=>day===days[0]);document.getElementById('hoursText').textContent=allSame?days[0]:'See our daily opening hours by contacting us.'}
const contactLink=document.getElementById('contactLink');
if(config.phone&&config.phone!=='[PHONE]'){contactLink.href=`tel:${String(config.phone).replace(/[^+\d]/g,'')}`}else if(config.email&&config.email!=='[EMAIL]'){contactLink.href=`mailto:${config.email}`}else{contactLink.addEventListener('click',event=>{event.preventDefault();showToast('Add your phone number or email in config.js to enable contact.')})}
const socials=document.getElementById('socialLinks');
[['instagram','Instagram'],['facebook','Facebook'],['youtube','YouTube']].forEach(([key,label])=>{const url=config[key];if(url&&url.startsWith('http')){const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;socials.appendChild(a)}});
document.getElementById('year').textContent=new Date().getFullYear();
const menuToggle=document.getElementById('menuToggle');const navLinks=document.getElementById('navLinks');
menuToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuToggle.textContent=open?'×':'☰'});
navLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navLinks.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');menuToggle.textContent='☰'}));
renderMenu();
