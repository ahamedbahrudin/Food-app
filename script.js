const products=[
  {id:1,name:"Pizza",price:250,category:"Pizza"},
  {id:2,name:"Cheese Burger",price:150,category:"Burger"},
  {id:3,name:"Chicken Burger",price:180,category:"Burger"},
  {id:4,name:"Chocolate Cake",price:200,category:"Desserts"},
  {id:5,name:"Ice Cream",price:100,category:"Desserts"},
  {id:6,name:"Pasta",price:170,category:"Italian"}
];

let cart=[];

const productGrid=document.getElementById("productGrid");
const cartPanel=document.getElementById("cartPanel");
const cartItemsDiv=document.getElementById("cartItems");
const cartCount=document.getElementById("cartCount");
const cartTotal=document.getElementById("cartTotal");
const openCartBtn=document.getElementById("openCartBtn");
const checkoutBtn=document.getElementById("checkoutBtn");
const checkoutModal=document.getElementById("checkoutModal");
const closeCheckout=document.getElementById("closeCheckout");
const checkoutForm=document.getElementById("checkoutForm");
const categoriesDiv=document.getElementById("categories");
const searchInput=document.getElementById("searchInput");

function renderCategories(){
  const cats=["All",...new Set(products.map(p=>p.category))];
  categoriesDiv.innerHTML="";
  cats.forEach(c=>{
    const btn=document.createElement("button");
    btn.textContent=c;
    btn.onclick=()=>filterCategory(c,btn);
    categoriesDiv.appendChild(btn);
  });
}

function filterCategory(cat,btn){
  document.querySelectorAll(".categories button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(cat==="All"?products:products.filter(p=>p.category===cat));
}

function renderProducts(list=products){
  productGrid.innerHTML="";
  list.forEach(p=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`<div class='thumb'>${p.name}</div>
      <h4>${p.name}</h4>
      <p>₹${p.price}</p>
      <div class='qty'>
        <button onclick='addToCart(${p.id})'>Add</button>
      </div>`;
    productGrid.appendChild(card);
  });
}

function addToCart(id){
  const item=cart.find(c=>c.id===id);
  if(item){item.qty++;}
  else{cart.push({id,qty:1});}
  updateCart();
}

function changeQty(id,delta){
  const item=cart.find(c=>c.id===id);
  if(item){
    item.qty+=delta;
    if(item.qty<=0) cart=cart.filter(c=>c.id!==id);
  }
  updateCart();
}

function updateCart(){
  cartItemsDiv.innerHTML="";
  let total=0,count=0;
  cart.forEach(c=>{
    const prod=products.find(p=>p.id===c.id);
    total+=prod.price*c.qty;
    count+=c.qty;
    const div=document.createElement("div");
    div.className="cart-item";
    div.innerHTML=`<span>${prod.name}</span>
                   <div class='qty'>
                     <button onclick='changeQty(${c.id},-1)'>-</button>
                     ${c.qty}
                     <button onclick='changeQty(${c.id},1)'>+</button>
                   </div>
                   <span>₹${prod.price*c.qty}</span>`;
    cartItemsDiv.appendChild(div);
  });
  cartCount.textContent=count;
  cartTotal.textContent=total;
}

openCartBtn.onclick=()=>{cartPanel.style.display=cartPanel.style.display==='block'?'none':'block';};

checkoutBtn.onclick=()=>{checkoutModal.style.display='flex';};
closeCheckout.onclick=()=>{checkoutModal.style.display='none';};

checkoutForm.onsubmit=(e)=>{
  e.preventDefault();
  alert("Order placed successfully! 🎉");
  cart=[];
  updateCart();
  checkoutModal.style.display='none';
  cartPanel.style.display='none';
};

searchInput.addEventListener("input",()=>{
  const query=searchInput.value.toLowerCase();
  const filtered=products.filter(p=>p.name.toLowerCase().includes(query));
  renderProducts(filtered);
});

// init
renderCategories();
filterCategory("All",categoriesDiv.querySelector("button"));
