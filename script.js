const defaultMenuItems = [
  {id:1,name:"Classic Margherita",category:"pizza",price:179,tag:"Crowd favourite",desc:"Tomato, mozzarella and fresh basil.",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Garden Veggie Pizza",category:"pizza",price:229,tag:"Fresh & colourful",desc:"A colourful mix of veggies and cheese.",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Cheesy Crunch Burger",category:"burger",price:149,tag:"Big bite energy",desc:"A crispy patty, cheese and house-style sauce.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Classic Veg Burger",category:"burger",price:119,tag:"The classic",desc:"A satisfying veggie patty with fresh crunch.",image:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Golden French Fries",category:"sides",price:89,tag:"Perfect sidekick",desc:"Golden, crispy and made for sharing.",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Loaded Nachos",category:"sides",price:139,tag:"Snack o'clock",desc:"Crunchy nachos with a cheesy topping.",image:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Iced Coffee",category:"drinks",price:99,tag:"Cool & creamy",desc:"A chilled coffee break, any time of day.",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Strawberry Cooler",category:"drinks",price:89,tag:"Berry refreshing",desc:"A fruity, refreshing sip for sunny days.",image:"https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80"}
  ,
  {id:9,name:"Paneer Tikka Pizza",category:"pizza",price:249,tag:"Spicy favourite",desc:"Paneer, peppers, onion and a smoky tikka-style sauce.",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80"},
  {id:10,name:"Double Cheese Pizza",category:"pizza",price:269,tag:"Extra cheesy",desc:"A golden cheesy layer on a classic tomato base.",image:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=700&q=80"},
  {id:11,name:"Crispy Paneer Burger",category:"burger",price:169,tag:"Veg special",desc:"Crunchy paneer, lettuce and creamy house sauce.",image:"https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80"},
  {id:12,name:"BBQ Cheese Burger",category:"burger",price:189,tag:"Smoky & rich",desc:"A satisfying burger with cheese and smoky BBQ flavour.",image:"https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=80"},
  {id:13,name:"Peri Peri Fries",category:"sides",price:109,tag:"A little kick",desc:"Crispy fries tossed in a bold peri-peri seasoning.",image:"https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=700&q=80"},
  {id:14,name:"Cheese Garlic Bread",category:"sides",price:129,tag:"Cheesy comfort",desc:"Toasted garlic bread with a melty cheese topping.",image:"https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=700&q=80"},
  {id:15,name:"Chocolate Frappe",category:"drinks",price:139,tag:"Sweet treat",desc:"A chilled chocolate coffee-style treat for a little indulgence.",image:"https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80"},
  {id:16,name:"Lemon Mint Cooler",category:"drinks",price:89,tag:"Fresh & zesty",desc:"A refreshing lemon and mint-inspired cooler.",image:"https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=700&q=80" }
];
const MENU_KEY = "sipSliceMenuV3", CART_KEY = "sipSliceCartV2";
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const grid = $("#menuGrid"), toast = $("#toast");
let toastTimer, activeCategory = "all", menuItems = loadMenu(), cart = loadCart(), selectedAdminId = null;
function safeRead(key, fallback) { try { const value=localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
function isValidItem(item) { return item && Number.isFinite(Number(item.id)) && typeof item.name === "string" && item.name.trim() && ["pizza","burger","sides","drinks"].includes(item.category) && Number.isFinite(Number(item.price)) && Number(item.price)>=0 && typeof item.desc === "string"; }
function loadMenu() { const saved=safeRead(MENU_KEY,null); return Array.isArray(saved) && saved.every(isValidItem) ? saved : defaultMenuItems.map(item=>({...item})); }
function loadCart() { const saved=safeRead(CART_KEY,{}); return saved && typeof saved==="object" && !Array.isArray(saved) ? saved : {}; }
function escapeHtml(value) { return String(value??"").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function safeImage(url) { try { const parsed=new URL(String(url||"")); return parsed.protocol==="https:" ? parsed.href : ""; } catch { return ""; } }
function money(amount) { return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(amount)||0); }
function persistMenu() { try { localStorage.setItem(MENU_KEY,JSON.stringify(menuItems)); } catch { showToast("Browser storage is full. Export a menu backup."); } }
function persistCart() { try { localStorage.setItem(CART_KEY,JSON.stringify(cart)); } catch {} }
function showToast(message) { toast.textContent=message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2800); }
function renderMenu() {
  const items=menuItems.filter(item=>activeCategory==="all"||item.category===activeCategory);
  $("#menuCount").textContent=`${items.length} ${items.length===1?"favourite":"favourites"}`;
  grid.innerHTML=items.map((item,index)=>{const img=safeImage(item.image);return `<article class="menu-card" style="animation-delay:${Math.min(index,8)*35}ms"><div class="menu-image">${img?`<img src="${escapeHtml(img)}" alt="${escapeHtml(item.name)}" loading="lazy">`:""}<span class="menu-tag">${escapeHtml(item.tag||"Made with care")}</span></div><div class="menu-info"><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.desc)}</p><div class="menu-card-bottom"><span class="price">${money(item.price)}</span><button class="add-button" data-add="${Number(item.id)}" type="button">Add to bag +</button></div></div></article>`;}).join("");
  if(!items.length) grid.innerHTML='<p class="disclaimer">No items in this category yet. Check back soon.</p>';
}
function cartDetails() { return menuItems.filter(item=>Number(cart[item.id])>0).map(item=>({...item,quantity:Math.min(99,Math.max(1,Number(cart[item.id])||1))})); }
function renderCart() {
  const items=cartDetails(), count=items.reduce((sum,item)=>sum+item.quantity,0);
  $("#cartCount").textContent=count>99?"99+":String(count);
  $("#cartItems").innerHTML=items.map(item=>{const img=safeImage(item.image);return `<article class="cart-row"><img src="${escapeHtml(img)}" alt="" loading="lazy"><div><h3>${escapeHtml(item.name)}</h3><small>${money(item.price)} each</small><div class="quantity-control"><button type="button" data-qty="${item.id}" data-delta="-1" aria-label="Remove one">−</button><span>${item.quantity}</span><button type="button" data-qty="${item.id}" data-delta="1" aria-label="Add one">+</button></div></div><span class="cart-row-total">${money(item.price*item.quantity)}</span></article>`;}).join("");
  $("#cartEmpty").classList.toggle("hidden",items.length>0); $("#cartCheckout").classList.toggle("hidden",items.length===0);
  $("#cartTotal").textContent=money(items.reduce((sum,item)=>sum+item.price*item.quantity,0));
}
function openOverlay(id) { const overlay=document.getElementById(id); overlay.classList.add("open"); overlay.setAttribute("aria-hidden","false"); document.body.classList.add("locked"); }
function closeOverlay(id) { const overlay=document.getElementById(id); overlay.classList.remove("open"); overlay.setAttribute("aria-hidden","true"); if(!$(".overlay.open")) document.body.classList.remove("locked"); }
function updateCart(id,delta) { const item=menuItems.find(entry=>entry.id===Number(id)); if(!item)return; const next=(Number(cart[item.id])||0)+Number(delta); if(next<=0)delete cart[item.id];else cart[item.id]=Math.min(99,next); persistCart();renderCart();if(delta>0)showToast(`${item.name} added to your bag.`); }
function checkoutWhatsApp() {
  const items=cartDetails(); if(!items.length)return showToast("Your bag is empty — add something from the menu first.");
  const config=window.restaurantConfig||{}, number=String(config.whatsapp||"").replace(/\D/g,"");
  if(!number||number.length<10||String(config.whatsapp).includes("["))return showToast("Add your WhatsApp number in config.js before enabling checkout.");
  const name=$("#customerName").value.trim(), type=$("#orderType").value, notes=$("#orderNotes").value.trim(), subtotal=items.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const lines=items.map(item=>`• ${item.name} × ${item.quantity} — ${money(item.price*item.quantity)}`);
  const message=[`Hi ${config.name||"Sip & Slice"}! I'd like to place an order.`,name?`Name: ${name}`:"",`Preference: ${type}`,"",...lines,"",`Subtotal: ${money(subtotal)}`,notes?`Notes: ${notes}`:"","Please confirm availability and the final total. Thank you!"].filter(Boolean).join("\n");
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`,"_blank","noopener,noreferrer");
}
function renderAdminList() { $("#adminItemList").innerHTML=menuItems.map(item=>`<button type="button" class="admin-item-choice ${item.id===selectedAdminId?"active":""}" data-edit-item="${item.id}"><span>${escapeHtml(item.name)}</span><span>${money(item.price)}</span></button>`).join(""); }
function fillAdminForm(item) { $("#adminItemId").value=item?item.id:"";$("#adminName").value=item?.name||"";$("#adminCategory").value=item?.category||"pizza";$("#adminPrice").value=item?.price??"";$("#adminTag").value=item?.tag||"";$("#adminDescription").value=item?.desc||"";$("#adminImage").value=item?.image||"";$("#deleteItemButton").classList.toggle("hidden",!item); }
function selectAdminItem(id) { selectedAdminId=id==null?null:Number(id);fillAdminForm(menuItems.find(item=>item.id===selectedAdminId)||null);renderAdminList(); }
function normaliseMenu(data) {
  if(!Array.isArray(data)||!data.length||data.length>200)throw new Error("Use a JSON array with 1–200 menu items.");
  const items=data.map((raw,index)=>{const item={id:Number(raw?.id)||index+1,name:String(raw?.name||"").trim().slice(0,80),category:String(raw?.category||"pizza"),price:Number(raw?.price),tag:String(raw?.tag||"Made with care").trim().slice(0,40),desc:String(raw?.desc||"").trim().slice(0,180),image:safeImage(raw?.image||"")};if(!item.name||!["pizza","burger","sides","drinks"].includes(item.category)||!Number.isFinite(item.price)||item.price<0||!item.desc)throw new Error(`Item ${index+1} has invalid fields.`);return item;});
  const used=new Set();let nextId=Math.max(0,...items.map(item=>item.id))+1;for(const item of items){if(used.has(item.id))item.id=nextId++;used.add(item.id);}return items;
}
function importMenu(data) { try{menuItems=normaliseMenu(data);persistMenu();renderMenu();renderCart();selectAdminItem(menuItems[0]?.id??null);showToast("Menu imported on this device.");}catch(error){showToast(error.message||"Could not import this menu.");} }
function exportMenu() { const blob=new Blob([JSON.stringify(menuItems,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download="sip-and-slice-menu.json";link.click();URL.revokeObjectURL(url);showToast("Menu backup exported."); }

$$(".category-tab").forEach(button=>button.addEventListener("click",()=>{$$(".category-tab").forEach(tab=>tab.classList.remove("active"));button.classList.add("active");activeCategory=button.dataset.category;renderMenu();}));
grid.addEventListener("click",event=>{const button=event.target.closest("[data-add]");if(button)updateCart(button.dataset.add,1);});
$("#cartOpen").addEventListener("click",()=>{renderCart();openOverlay("cartOverlay");});$("#checkoutButton").addEventListener("click",checkoutWhatsApp);
$("#cartItems").addEventListener("click",event=>{const button=event.target.closest("[data-qty]");if(button)updateCart(button.dataset.qty,Number(button.dataset.delta));});
$$("[data-close]").forEach(button=>button.addEventListener("click",()=>closeOverlay(button.dataset.close)));
$$(".overlay").forEach(overlay=>overlay.addEventListener("click",event=>{if(event.target===overlay)closeOverlay(overlay.id);}));
document.addEventListener("keydown",event=>{if(event.key==="Escape")$$(".overlay.open").forEach(overlay=>closeOverlay(overlay.id));});
$("#adminOpen").addEventListener("click",()=>{selectAdminItem(menuItems[0]?.id??null);openOverlay("adminOverlay");});
$("#adminItemList").addEventListener("click",event=>{const button=event.target.closest("[data-edit-item]");if(button)selectAdminItem(Number(button.dataset.editItem));});
$("#newItemButton").addEventListener("click",()=>selectAdminItem(null));
$("#adminForm").addEventListener("submit",event=>{event.preventDefault();const name=$("#adminName").value.trim(),price=Number($("#adminPrice").value),desc=$("#adminDescription").value.trim(),imageValue=$("#adminImage").value.trim(),image=imageValue?safeImage(imageValue):"";if(!name||!desc||!Number.isFinite(price)||price<0||price>100000)return showToast("Check the item name, description and price.");if(imageValue&&!image)return showToast("Image URL must start with https://");const existingId=Number($("#adminItemId").value),id=existingId||Math.max(0,...menuItems.map(item=>item.id))+1,item={id,name,category:$("#adminCategory").value,price,tag:$("#adminTag").value.trim()||"Made with care",desc,image},index=menuItems.findIndex(entry=>entry.id===id);if(index>=0)menuItems[index]=item;else menuItems.push(item);selectedAdminId=id;persistMenu();renderMenu();renderCart();renderAdminList();fillAdminForm(item);showToast("Saved on this device only.");});
$("#deleteItemButton").addEventListener("click",()=>{const id=Number($("#adminItemId").value);if(!id||!menuItems.some(item=>item.id===id))return;if(!confirm("Delete this menu item from this browser?"))return;menuItems=menuItems.filter(item=>item.id!==id);delete cart[id];persistMenu();persistCart();renderMenu();renderCart();selectAdminItem(menuItems[0]?.id??null);showToast("Item removed from this device.");});
$("#exportMenuButton").addEventListener("click",exportMenu);$("#importMenuButton").addEventListener("click",()=>{try{importMenu(JSON.parse($("#importMenuText").value));}catch{showToast("Paste valid JSON menu data first.");}});
$("#importMenuFile").addEventListener("change",async event=>{const file=event.target.files?.[0];if(!file)return;try{importMenu(JSON.parse(await file.text()));}catch{showToast("That file isn't valid menu JSON.");}event.target.value="";});
$("#resetMenuButton").addEventListener("click",()=>{if(!confirm("Reset this browser to the original sample menu? This removes local menu edits."))return;menuItems=defaultMenuItems.map(item=>({...item}));cart={};persistMenu();persistCart();renderMenu();renderCart();selectAdminItem(menuItems[0]?.id??null);showToast("Sample menu restored on this device.");});

const config=window.restaurantConfig||{};if(config.address)$("#addressText").textContent=config.address;if(config.googleMaps&&/^https:\/\//.test(config.googleMaps))$("#mapLink").href=config.googleMaps;
if(config.openingHours){const hours=Object.values(config.openingHours);$("#hoursText").textContent=hours.length&&hours.every(day=>day===hours[0])?hours[0]:"Contact us for today's opening hours.";}
const contact=$("#contactLink");if(config.phone&&config.phone!=="[PHONE]"&&!String(config.phone).includes("["))contact.href=`tel:${String(config.phone).replace(/[^+\d]/g,"")}`;else if(config.email&&config.email!=="[EMAIL]"&&!String(config.email).includes("["))contact.href=`mailto:${config.email}`;else contact.addEventListener("click",event=>{event.preventDefault();showToast("Add your phone number or email in config.js to enable contact.");});
[["instagram","Instagram"],["facebook","Facebook"],["youtube","YouTube"]].forEach(([key,label])=>{const url=config[key];if(url&&/^https:\/\//.test(url)&&!url.includes("[")){const link=document.createElement("a");link.href=url;link.target="_blank";link.rel="noopener noreferrer";link.textContent=label;$("#socialLinks").appendChild(link);}});
$("#year").textContent=new Date().getFullYear();const menuToggle=$("#menuToggle"),navLinks=$("#navLinks");menuToggle.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");menuToggle.textContent=open?"×":"☰";});
$$(".nav-links a").forEach(link=>link.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open navigation");menuToggle.textContent="☰";}));
renderMenu();renderCart();

/* Supabase session integration */
(async function initSipSliceAuth() {
  const SUPABASE_URL = "https://nweserlwmosyivcmpsgs.supabase.co";
  const SUPABASE_KEY = "sb_publishable_0NYZrXDYFhAq-JWjJikiTw_3d39m3sj";

  if (!window.supabase?.createClient) {
    console.warn("Supabase SDK is missing. Authentication UI was not updated.");
    return;
  }

  const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  // Update the navigation login link when a user is signed in.
  const authLink = document.querySelector(
    '#navLinks a[href="auth.html"]'
  );

  async function updateAuthLink(session) {
    if (!authLink) return;

    if (session?.user) {
      const name =
        session.user.user_metadata?.full_name ||
        session.user.email ||
        "My account";

      authLink.textContent = name + " · Log out";
      authLink.href = "#logout";
      authLink.setAttribute("aria-label", "Log out of Sip & Slice");

      authLink.onclick = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
          "Are you sure you want to log out?"
        );

        if (!confirmed) return;

        const { error } = await client.auth.signOut();

        if (error) {
          alert("Could not log out. Please try again.");
          console.error(error);
          return;
        }

        window.location.href = "auth.html";
      };
    } else {
      authLink.textContent = "Log in / Sign up ↗";
      authLink.href = "auth.html";
      authLink.removeAttribute("aria-label");
      authLink.onclick = null;
    }
  }

  const { data, error } = await client.auth.getSession();

  if (error) {
    console.error("Could not retrieve the Supabase session:", error);
    return;
  }

  await updateAuthLink(data.session);

  client.auth.onAuthStateChange((_event, session) => {
    updateAuthLink(session);
  });
})();
    
