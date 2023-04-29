const menuButton = document.getElementById('menu-btn');
const checkoutButton = document.getElementById('checkout-btn');
const menuPage = document.getElementsByClassName('menu-page');
const checkoutPage = document.getElementsByClassName('checkout-page');
const takingOrder = document.getElementsByClassName('taking-order');
const preparingOrder = document.getElementsByClassName('preparing-order');
const payingOrder = document.getElementsByClassName('pay-order');
const thankYou = document.getElementsByClassName('thank-you');
const billCont = document.getElementsByClassName('bill-cont');
let totalPrice = 0;
const total = document.getElementById('total');
let receivedOrders = [];
menuButton.addEventListener('click', ()=>{
    menuPage[0].style.display = 'block';
    checkoutPage[0].style.display = 'none';
    takingOrder[0].style.display = 'none';
    preparingOrder[0].style.display = 'none';
    payingOrder[0].style.display = 'none';
    thankYou[0].style.display = 'none';
});
checkoutButton.addEventListener('click', ()=>{
    menuPage[0].style.display = 'none';
    checkoutPage[0].style.display = 'block';
    takingOrder[0].style.display = 'none';
    preparingOrder[0].style.display = 'none';
    payingOrder[0].style.display = 'none';
    thankYou[0].style.display = 'none';
});
async function getMenu() {
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian";
    const response = await fetch(url);
    const data = await response.json();
    // let jsonData = await result.then((response) => response.json())
    // let data = await jsonData.then((data) => console.log(data));
    // console.log(data);
    appendDataToUI(data.meals);
    // console.log(data);
    /*{strMeal: 'Baingan Bharta', 
    strMealThumb: 'https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg', 
    idMeal: '52807'} */ 
}
getMenu();
function appendDataToUI(data) {
    data.forEach(element => {
        const grid = document.getElementsByClassName('menu-grid');
        const divContainer = document.createElement('div');
        divContainer.id = 'item-cont';
        const image = document.createElement('img');
        const item = document.createElement('p');
        const price = document.createElement('p');
        const btn = document.createElement('button');
        btn.id = 'btn';
        image.src = element.strMealThumb;
        image.alt = 'item-image';
        item.innerText = element.strMeal;
        price.innerText = 'Rs. 200';
        btn.innerText = 'Add Item';
        divContainer.appendChild(image);
        divContainer.appendChild(item);
        divContainer.appendChild(price);
        divContainer.appendChild(btn);
        grid[0].appendChild(divContainer);
        btn.addEventListener('click',()=>addItem(element));
    });
}
function addItem(element) {
    receivedOrders.push(element);
    const priceOfItem = 200;
    totalPrice += priceOfItem;
    total.innerText = 'Rs. '+totalPrice;
    const grid = document.getElementById('items');
    const divContainer = document.createElement('div');
    divContainer.id = 'item-cont';
    const image = document.createElement('img');
    const item = document.createElement('p');
    const price = document.createElement('p');
    const btn = document.createElement('button');
    btn.id = 'btn';
    image.src = element.strMealThumb;
    image.alt = 'item-image';
    item.innerText = element.strMeal;
    price.innerText = 'Rs. '+priceOfItem;
    btn.innerText = 'Remove Item';
    divContainer.appendChild(image);
    divContainer.appendChild(item);
    divContainer.appendChild(price);
    divContainer.appendChild(btn);
    grid.appendChild(divContainer);
    billCont[0].style.display = 'flex';
    btn.addEventListener('click',()=>{
        grid.removeChild(divContainer);
        totalPrice -= priceOfItem;
        total.innerText = 'Rs. '+totalPrice;
        if(grid.childElementCount==0) {
            billCont[0].style.display = 'none';
        }
        let index = receivedOrders.indexOf(element);
        if (index !== -1) {
            receivedOrders.splice(index, 1);
        }
    });
}
const confirmOrder = document.getElementById('confirm-btn');
confirmOrder.addEventListener('click',async function(){
    let orderPromise = await takeOrder();
    console.log(orderPromise);
    let prepPromise = await orderPrep();
    console.log(prepPromise);
    let payPromise = await payOrder();
    console.log(payPromise);
    thankyouFunc();
});
function takeOrder() {
    checkoutPage[0].style.display = 'none';
    takingOrder[0].style.display = 'block';
    preparingOrder[0].style.display = 'none';
    payingOrder[0].style.display = 'none';
    thankYou[0].style.display = 'none';
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(receivedOrders);
        },2500);
    });
}


function orderPrep() {
    takingOrder[0].style.display = 'none';
    preparingOrder[0].style.display = 'block';
    payingOrder[0].style.display = 'none';
    thankYou[0].style.display = 'none';
    let orderStatus = {
        order_status:true,
        paid:false
    }
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(orderStatus);
        },1500);
    });
}

function payOrder() {
    takingOrder[0].style.display = 'none';
    preparingOrder[0].style.display = 'none';
    payingOrder[0].style.display = 'block';
    thankYou[0].style.display = 'none';
    let orderStatus = {
        order_status:true,
        paid:true
    }
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(orderStatus);
        },1000);
    });
}

function thankyouFunc() {
    takingOrder[0].style.display = 'none';
    preparingOrder[0].style.display = 'none';
    payingOrder[0].style.display = 'none';
    thankYou[0].style.display = 'block';
    setTimeout(()=>{alert('Thankyou for eating with us today!');},1000);
    const ordersGrid = document.getElementById('items');
    ordersGrid.innerHTML = '';
    billCont[0].style.display = 'none';
    receivedOrders = [];
    totalPrice = 0;
}