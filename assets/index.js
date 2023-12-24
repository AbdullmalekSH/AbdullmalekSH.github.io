//****** Products Data */ 

let products = document.getElementById("products");

let productsData = [
  {
    id: 1,
    name: "براد سامسونج بابين",
    discription: `
    الحجم 800 لتر
    تكنولوجيا ™SpaceMax
    يدوم طويلاً بتوفير في الطاقة يصل إلى
    50
    مح وِّل رقمي
    تبريد شامل
    `,
    price: 6500000,
    img: "images/2.jpg"
  },
  {
    id: 2,
    name: "مكيف 2 طن LG",
    discription: `
    تكنولوجيا تبريد بالبلازما
    توزيع الحرارة في كامل الغرفة والقدرة على توليد الحرارة في الشتاء
    `,
    price: 2500000,
    img: "images/1.jpg"
  },
  {
    id: 3,
    name: "فرن كهربائي LG",
    discription: `
    العرض 80 سم
    حرارة عالية تصل ل360 درجة
    جودة عالية
    مع ساعة رقمية
    كفالة ذهبية سنة كاملة
    `,
    price: 1500000,
    img: "images/3.jpg"
  },
  {
    id: 4,
    name: "براد سامسونج",
    discription: `
    تكنولوجيا ™SpaceMax
    محوِّل رقمي
    تجميد يدوم 24 ساعة
    تبريد شامل
    `,
    price: 4500000,
    img: "images/2.png"
  },
  {
    id: 5,
    name: "شاشة LG",
    discription: `
    43 بوصة
    شاشة oled
    ألوان عالية الجودة
    مضاد للإنعكاس
    `,
    price: 8000000,
    img: "images/5.jpg"
  },
  {
    id: 6,
    name: "طباخ بخار كهربائي",
    discription: `
    مزود بدرج خاص للشوي
    مع حوض كبير ليتسع كمية أكبر
    كفالة سنة كاملة
    `,
    price: 900000,
    img: "images/4.jpg"
  },
  {
    id: 7,
    name: "غسالة سامسونج",
    discription: `
    11 كيلو
    43 برنامج
    1400 دورة في الدقيقة
    `,
    price: 4000000,
    img: "images/6.png"
  },
  {
    id: 8,
    name: "براد سامسونج بابين",
    discription: `
    الحجم 800 لتر
    تكنولوجيا ™SpaceMax
    يدوم طويلاً بتوفير في الطاقة يصل إلى
    50
    مح وِّل رقمي
    تبريد شامل
    `,
    price: 6500000,
    img: "images/2.png"
  },
  {
    id: 9,
    name: "براد سامسونج بابين",
    discription: `
    الحجم 800 لتر
    تكنولوجيا ™SpaceMax
    يدوم طويلاً بتوفير في الطاقة يصل إلى
    50
    مح وِّل رقمي
    تبريد شامل
    `,
    price: 6500000,
    img: "images/2.png"
  },
  {
    id: 10,
    name: "براد سامسونج بابين",
    discription: `
    الحجم 800 لتر
    تكنولوجيا ™SpaceMax
    يدوم طويلاً بتوفير في الطاقة يصل إلى
    50
    مح وِّل رقمي
    تبريد شامل
    `,
    price: 6500000,
    img: "images/2.png"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//****** Products Section */ 

let generateProducts = () => {
  return (
    products.innerHTML = productsData.map((product) => {
    let search = cart.find((a) => a.id === product.id) || [];
    return (
      `
      <div class="item" id="product-id-${product.id}">
        <img class="itemImg" src="assets/${product.img}" alt="${product.name}">
        <div class="details">
          <h3>${product.name}</h3>
          <p>${product.discription}</p>
          <div class="priceAndQuantity">
            <h2>${product.price} ل.س</h2>
            <div class="buttons">
              <span onclick="decrement(${product.id})" class="material-symbols-outlined remove">
                remove
              </span>
              <div id="${product.id}" class="quantity">
                ${search.quantity === undefined ? 0: search.quantity}
              </div>
              <span onclick="increment(${product.id})" class="material-symbols-outlined add">
                add
              </span>
            </div>
          </div>
        </div>
      </div>
      `
    );
  }).join(""));
};

generateProducts();

let increment = (id) => {
  let productSelected = id;

  let search = cart.find((a) => a.id === productSelected);

  if(search === undefined){
    cart.push({
      id: productSelected,
      quantity: 1
    });
  } else {
    search.quantity += 1;
  }

  update(productSelected);

  localStorage.setItem("cart", JSON.stringify(cart));
  
  generateCart()
};

let decrement = (id) => {
  let productSelected = id;
  let search = cart.find((a) => a.id === productSelected);

  if(search === undefined) return;
  else if(search.quantity === 0) return;
  else {
    search.quantity -= 1;
  }

  update(productSelected);

  cart = cart.filter((i) => i.quantity !== 0);

  localStorage.setItem("cart", JSON.stringify(cart));
  generateCart()
};

let update = (id) => {
  let search = cart.find((a) => a.id === id);
  document.getElementById(id).innerHTML = search.quantity;
  calculation();
};

let calculation = () => {
  let cartCal = document.getElementById("cartCount");
  cartCal.innerHTML = cart.map((a) => a.quantity).reduce((x, y) => x+y, 0)
};

calculation()
//****** Cart Section */ 

let label = document.getElementById("label");
let shoppingCart = document.getElementById("cartList");

let hideButtons = () => {
  let buttons = document.querySelectorAll(".cartButtons");
  buttons.forEach(button => {
    button.style.display = "none";
  });
};

let showButtons = () => {
  let buttons = document.querySelectorAll(".cartButtons");
  buttons.forEach(button => {
    button.style.display = "inline-block";
  });
};

let generateCart = () => {
  if(cart.length !== 0){
      showButtons();
      shoppingCart.innerHTML = `
        <tr>
          <th>أسم المنتج</th>
          <th>السعر</th>
          <th>العدد</th>
          <th>السعر الإجمالي</th>
        </tr>
        ` + cart.map((x) => {
        let search = productsData.find((y) => y.id === x.id);
        return `
              <tr>
                <td>${search.name}</td>
                <td>${search.price} ل.س</td>
                <td>
                <span onclick="decrement(${x.id})" class="material-symbols-outlined remove">
                  remove
                </span>
                <div id="${x.id}" class="quantity">${x.quantity}</div>
                <span onclick="increment(${x.id})" class="material-symbols-outlined add">
                  add
                </span>
                </td>
                <td>${x.quantity * search.price} ل.س</td>
              </tr>
              `
      }).join("") +
      `<tr>
        <td colspan="3">الضريبة 5%</td>
        <td>
          ${totalPrice() * 0.05} ل.س
        </td>
      </tr>
      <tr>
        <td colspan="3">المجموع النهائي</td>
        <td>
          ${totalPrice() + totalPrice() * 0.05} ل.س
        </td>
      </tr>`
  } else {
    hideButtons();
    shoppingCart.innerHTML = `
      <h2>السلة فارغة</h2>
    `;
  }
}

let totalPrice = () => {
  if(cart.length !== 0){
    let price = cart.map((x) => {
      let search = productsData.find((y) => y.id === x.id) || [];
      return x.quantity * search.price;
    }).reduce((x, y) => x+y, 0)
    return price
  } else return
}

let clearCart = () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  generateProducts();
  calculation();
  generateCart();
}

generateCart()

//****** Form Section*/ 

let form_toggled = false;

let showForm = () => {
  document.getElementById('userForm').style.display = "block";
  form_toggled = true;
}

let closeForm = () => {
  document.getElementById('userForm').style.display = "none";
  form_toggled = false;
}

let validateName = () => {
  const input = document.getElementById('name');
  const pattern = /^[\u0600-\u06FF\s]+$/;
  let val = input.value.search(pattern);
  if (val != 0) {
    alert("الأسم المدخل غير صحيح يرجى إدخال حروف عربية فقط");
    input.focus();
    input.select();
    return false;
  } else
    return true;
}

let validateNumber = () => {
  const input = document.getElementById('number');
  const patern = /^\d{10}$/;
  let val = input.value.search(patern);
  if (val != 0) {
    alert("الرقم المدخل خاطئ يرجى إتباع النمط التالي 000-000-0000");
    input.focus();
    input.select();
    return false;
  } else {
    number_network()
    return true;
  }
}

let number_network = () => {
  const input = document.getElementById('number');
  let net_type = document.getElementById('net');
  const mtnnumbers = ['094', '095', '096'];
  const firs_num = input.value.substring(0, 3);
  if(mtnnumbers.includes(firs_num)){
    net_type.innerText = "MTN";
  } else {
    net_type.innerText = "Syriatel";
  }
}
        
let validateEmail = () => { 
  const input = document.getElementById('email');
  const patern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let val = input.value.search(patern);
  if (val != 0) {
    alert("الإيميل المدخل خاطئ يرجى إدخال الأيميل بالشكل التالي example@email.com");
    input.focus();
    input.select();
    return false;
  } else {
    return true;
  }
}

let validateId = () => {
  const input = document.getElementById('cardId');
  const patern = /^\d{11}$/;
  let val = input.value.search(patern);
  if (val != 0) {
    alert("الرقم الوطني المدخل خاطئ");
    input.focus();
    input.select();
    return false;
  } else {
    city();
    return true;
  }
}

let city = () => {
  const input = document.getElementById('cardId');
  let city = document.getElementById('city_num');
  const first_num = input.value.substring(0, 2);
            
  if(first_num == '01'){
    city.innerText = "دمشق";
  } else if(first_num == '02'){
    city.innerText = "حلب";
  } else if(first_num == '03'){
    city.innerText = "ريف دمشق";
  } else if(first_num == '04'){
    city.innerText = "حمص";
  } else if(first_num == '05'){
    city.innerText = "حماه";
  } else if(first_num == '06'){
    city.innerText = "اللاذقية";
  } else if(first_num == '07'){
    city.innerText = "ادلب";
  } else if(first_num == '08'){
    city.innerText = "الحسكة";
  } else if(first_num == '09'){
    city.innerText = "دير الزور";
  } else if(first_num == '10'){
    city.innerText = "طرطوس";
  } else if(first_num == '11'){
    city.innerText = "الرقة";
  } else if(first_num == '12'){
    city.innerText = "درعا";
  } else if(first_num == '13'){
    city.innerText = "السويداء";
  } else if(first_num == '14'){
    city.innerText = "القنيطرة";
  } else {
    alert("رقم المحافطة غير صحيح")
    false
  }
}

let validateBirthdate = () => {
  const input = document.getElementById('birthdate').value;
  let selectedDate = new Date(input);
  if (isNaN(selectedDate.getTime())) {
    alert("التاريخ المدخل خاطئ");
    input.focus();
    input.select();
    return false;
  } else {
    return true;
  }
}

let generateCaptcha = () => {
  var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
  var i;
  for (i=0;i<4;i++){
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
  }
  var code = a + '' + b + '' + '' + c + '' + d;
  document.getElementById("mainCaptcha").value = code
}

let CheckValidCaptcha = () => {
  var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
  var string2 = removeSpaces(document.getElementById('txtInput').value);
  if (string1 == string2){
    document.getElementById('success').innerHTML = "Form is validated Successfully";
    return true;
  } else {       
    document.getElementById('error').innerHTML = "Please enter a valid captcha."; 
    return false;         
  }
}

let removeSpaces = (string) => {
  return string.split(' ').join('');
}

let finish_form = () => {
  if(validateName() && validateNumber() && validateEmail() && validateId() && validateBirthdate() && CheckValidCaptcha()){
    let info = [{
      name: document.getElementById('name'),
      number: document.getElementById('number'),
      email: document.getElementById('email'),
      card_id: document.getElementById('cardId'),
      birthdate: document.getElementById('birthdate')
    }]
    localStorage.setItem("info", JSON.stringify(info));
    closeForm();
    alert('السعر النهائي بالليرة السورية:'+ (totalPrice() + totalPrice() * 0.05));
  }
}