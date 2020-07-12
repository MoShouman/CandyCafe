$(document).ready(function(){
  /* Welcome section */

  var windowheight = $(window).height();
  var headerHeight = $('header').innerHeight();
  var divHeight = windowheight - headerHeight;
  $('#welcome').height(divHeight)
  $('#overlay').height(divHeight)
  
  
  $('#cart-btn').click(function(){
    $('.cart').toggle(100,function(){
        $('.cart').width('275px')
    });
})

  /* Welcome section */
  
  /* drinks section */
      
  //all drinks
  var drinks = [
    item1={
        id : 0,
        name:'Cappuccino',
        price: 12.19,
        img:'imgs/cappuccino.jpg'
      },
      item2={
          id : 1,
          name:'Americano',
          price: 19.11,
          img:'imgs/Americano.jpg'
      },
      item3={
          id : 2,
          name:'Espresso',
          price: 22.9,
          img:'imgs/Espresso.png'
      },
      item4={
          id : 3,
          name:'Macchiato',
          price: 17.15,
          img:'imgs/Macchiato.jpg'
      },
      item5={
          id : 4,
          name:'Mocha',
          price: 15,
          img:'imgs/Mocha.jpg'
      },
      item6={
          id : 5,
          name:'Coffee Latte',
          price: 16,
          img:'imgs/CoffeeLatte.jpg'
      },
      item7={
          id : 6,
          name:'Piccolo Latte',
          price: 30,
          img:'imgs/PiccoloLatte.jpg'
      },
      item8={
          id : 7,
          name:'Ristretto',
          price: 32,
          img:'imgs/Ristretto.jpg'
      },
      item9={
          id : 8,
          name:'Affogato',
          price: 19,
          img:'imgs/Affogato.jpg'
      }
  ]

  //Cart array which contains all drinks that user select used it for get 
  //total size and make it as flag for know the number of elements

  let Cart = []

  let cart_btn_price = $('#cart-btn').children()

  let cart_price = document.querySelector('.cart .total').childNodes

  let gridDiv = $('#grid');

  let cartDiv =  $('.cart .upper')

  let totalPrice = 0;

  // class for creating div for each drink in the drinks array

  class drink{
      constructor(name,price,img,id){
        
        var drinkDiv,drinkImg,drinkInfo,drinkH3,drinkSpan1,drinkSpan2,drinkBtn,drinkIcon;

        drinkDiv = document.createElement("div");
        $(drinkDiv).attr({id:'drink'});
        $(drinkDiv).attr({"drinkID":id});
        
        drinkImg = document.createElement('img');
        $(drinkImg).attr("src",img)
        
         drinkInfo = document.createElement("div");
        $(drinkInfo).addClass('info');
        
         drinkH3 = document.createElement('h3');
        $(drinkH3).text(name)
        
         drinkSpan1 = document.createElement('span');
         drinkSpan2 = document.createElement('span');
        $(drinkSpan1).text('$')
        $(drinkSpan2).text(price)

         drinkBtn = document.createElement('button')
         $(drinkBtn).addClass('div-right')
        
         drinkIcon = document.createElement('i')
        $(drinkIcon).addClass('fas');
        $(drinkIcon).addClass('fa-shopping-cart');
        
        $(drinkInfo).append(drinkH3,drinkSpan1,drinkSpan2,drinkBtn);
        $(drinkBtn).append(drinkIcon);
        $(drinkDiv).append(drinkImg,drinkInfo);
        gridDiv.append(drinkDiv);
      }
  }
  
  class selectedDrink{
    constructor(name,price,img){
      
        var selectDrinkDiv,selectDrinkImg,selectDrinkP,selectDrinkSpan1,selectDrinkSpan2,selectDrinkIcon;

        selectDrinkDiv = document.createElement("div");
        $(selectDrinkDiv).attr({class:'cart-item'});
        
        selectDrinkImg = document.createElement('img');
        $(selectDrinkImg).attr("src",img)
        
        selectDrinkP = document.createElement("div");
        $(selectDrinkP).text(name)

        selectDrinkSpan1 = document.createElement('span');
        selectDrinkSpan2 = document.createElement('span');
        $(selectDrinkSpan1).text('$')
        $(selectDrinkSpan2).text(price)
        
        selectDrinkIcon = document.createElement('i')
        $(selectDrinkIcon).addClass('fa');
        $(selectDrinkIcon).addClass('fa-trash');
        $(selectDrinkDiv).append(selectDrinkImg,selectDrinkP,selectDrinkSpan1,selectDrinkSpan2,selectDrinkIcon);
        cartDiv.append(selectDrinkDiv);
        
        console.log(Cart, totalPrice)

        //delete selected drinks from the cart
        let parent = selectDrinkIcon.parentElement.parentElement
        let childContainer = selectDrinkIcon.parentElement
        let childPrice = parseFloat( selectDrinkIcon.parentElement.childNodes[3].textContent)
        
        selectDrinkIcon.addEventListener('click',()=>{
            parent.removeChild(childContainer)
            totalPrice -=  childPrice
            cart_btn_price[1].textContent = '$'+ totalPrice.toFixed(2)
            cart_price[3].textContent = '$'+ totalPrice.toFixed(2)
            console.log(Cart, totalPrice)
            Cart.pop()
            if(!Cart.length){
                resetCart()
            }
        })
    }
}
  
    
    // displaying all drinks 
    drinks.forEach(element => {
        new drink(element.name,element.price,element.img)
    });

    
    //adding selected drinks to the cart
    let btns = document.querySelectorAll('.info button')

    btns.forEach((btn)=>{
        btn.addEventListener('click',() =>{      
            let parent = btn.parentElement.parentElement;
            let drinkImgSrc = parent.childNodes[0].src 
            let drinkInfo = parent.childNodes[1] 
            let drinkName =  drinkInfo.childNodes[0].textContent
            let drinkPrice = drinkInfo.childNodes[2].textContent
            let SelectedDrink = {
                src:drinkImgSrc,
                name:drinkName,
                price:drinkPrice
            }

            //push the selected drink to the cart
            Cart.push(drinkPrice)

            //get total price and show it on the cart button
            totalPrice += parseFloat(drinkPrice)

            cart_btn_price[1].textContent = '$'+ totalPrice.toFixed(2)

            //show the total price in the cart
            cart_price[3].textContent = '$'+ totalPrice.toFixed(2)

            new selectedDrink(SelectedDrink.name,SelectedDrink.price,SelectedDrink.src)

        })
    })
   
    //remove total price and items in cartBtn and Cart from 
    function resetCart(){
    cartUpper.innerHTML = "";
    cart_btn_price[1].textContent = '$0.0';
    cart_price[3].innerHTML = '$0.0';
    Cart = []
    totalPrice = 0;
    }
  

    //delete all drink selected 
    let clearAllBtn = document.querySelector('#deleteAll')
    let cartUpper = document.querySelector('.cart .upper')
    clearAllBtn.addEventListener('click',()=>resetCart())

});

/* drinks section */