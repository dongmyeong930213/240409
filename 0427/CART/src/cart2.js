// let label = document.getElementById('label');
// let shooppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem('data')) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount")
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let generateCartItems = () => {
  let label = document.getElementById('label');
  let shooppingCart = document.getElementById('shopping-cart');

  if (basket.length !== 0) {
    return (shooppingCart.innerHTML = basket.map((x) => {
        let { id , item } = x;
        let search = shopItemsData.find((y)=> y.id === id) || [];
        return `
        <div class="cart-item">
            <img width="100" src=${search.img} alt="" />
            <div class="details">
              <div class="title-price-x">
                  <h4 class="title-price">
                    <p>${search.name}</p>
                    <p class="cart-item-price">$ ${search.price}</p>
                  </h4>
                  <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
              <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>
              <h3>$ ${item * search.price}</h3>
            </div>
      </div>
      `
    }).join(""))
  } else {
    shooppingCart.innerHTML = "";
    label.innerHTML = `
        <h2> Cart is empty </h2>
        <a href="index.html">
        <button class="HomeBtn"> Back to home </button>
        </a>
        `;
  }
}

generateCartItems();


let increment = (id)=>{
    let selectedItem = id;
    let search = basket.find( (x)=>x.id === selectedItem.id)
    if(search === undefined){
        basket.push({
            id:selectedItem.id,
            item:1,
        })
    } else {
        search.item +=1;
    }
    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket))

}



let decrement = (id)=>{
    let selectedItem = id;
    let search = basket.find( (x)=>x.id === selectedItem.id);
    if (search === undefined) return
    else if ( search.item ==0) return
    else {
        search.item -=1;
    }
    update(selectedItem.id);
    //감소해서 원하는 아이템의 갯수가 0이면 로컬스토리지에 저장이 필요하지않다.
    basket = basket.filter((x)=>x.item !==0)
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket))
    
}

let clearCart = ()=>{
    basket=[];
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    TotalAmount();
}

let update = (id)=>{
    let search = basket.find ((x)=> x.id ===id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
}

let removeItem = (id)=>{
    let selectedItem = id;
    // basket에서 사고자 하는 아이템만 다시 basket에 저장
    basket = basket.filter((x)=> x.id !== selectedItem.id)
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(basket))
}

let TotalAmount = ()=>{
    if(basket.length !==0){
        let Amount = basket.map( (x)=>{
            let {item, id} =x;
            let search = shopItemsData.find((y)=>y.id ===id) || []
            return item*search.price

        }).reduce((x, y)=> x + y , 0);
        label.innerHTML = `
        <h2> Total Bill : $ ${Amount} </h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll"> Clear Cart</button>
        `;
    } else return;
}