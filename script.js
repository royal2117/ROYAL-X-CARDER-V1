let balance = localStorage.getItem("balance") || 0;

let purchaseCounts = {};

document.getElementById("balance").innerText = `₹${balance}`;

// SIDEBAR

function openMenu(){
  document.getElementById("sidebar").classList.add("active");
}

function closeMenu(){
  document.getElementById("sidebar").classList.remove("active");
}

// WALLET POPUP

function openWallet(){
  document.getElementById("walletPopup").style.display = "flex";
}

function closeWallet(){
  document.getElementById("walletPopup").style.display = "none";
}

// BUY CARD

function buyCard(price){

  const notification = document.getElementById("notification");

  if(balance >= price){

    balance -= price;
    localStorage.setItem("balance", balance);

    document.getElementById("balance").innerText = `₹${balance}`;

    notification.innerText = "✅ Purchase Successful";

setTimeout(()=>{

  openCardPage();

},1500);

    notification.style.background = "#00c853";

    // CARD NAME

    let cardName = "";

    if(price == 399){
      cardName = "Bronze Card";
    }

    if(price == 799){
      cardName = "Silver Card";
    }

    if(price == 1299){
      cardName = "Golden Card";
    }

    if(price == 1999){
      cardName = "Platinum Card";
    }

    if(price == 4999){
      cardName = "Diamond Card";
    }

    if(price == 10000){
      cardName = "Premium Card";
    }

    // DATE

    const date = new Date().toLocaleString();

    // PURCHASE ITEM

// PURCHASE COUNT

if(!purchaseCounts[cardName]){

  purchaseCounts[cardName] = 0;

}

purchaseCounts[cardName]++;

    const purchasedList =
    document.getElementById("purchasedList");

    document.getElementById("emptyPurchase")
.style.display = "none";

purchasedList.innerHTML += `

      <div class="purchase-item">

       <h3>
${cardName}

<span style="color:#00bfff;">
x${purchaseCounts[cardName]}
</span>

</h3>

        <p>Price : ₹${price}</p>

        <p>${date}</p>

      </div>

    `;

    // TRANSACTION ITEM

    const transactionList =
    document.getElementById("transactionList");

    transactionList.innerHTML += `

      <div class="purchase-item">

        <h3>Purchase Successful</h3>

        <p>${cardName}</p>

        <p>Debited : ₹${price}</p>

        <p>${date}</p>

      </div>

    `;

  }else{

    notification.innerText =
    "❌ Insufficient Funds. Please Top Up";

    notification.style.background = "#ff1744";

  }

  notification.classList.add("show");

  setTimeout(()=>{
    notification.classList.remove("show");
  },3000);

}

// FAKE TOPUP SYSTEM

document.querySelector(".submit-btn").addEventListener("click",()=>{

  const amountInput = document.querySelectorAll("input")[0];

  const amount = Number(amountInput.value);

const utr =
document.getElementById("utr").value;

const screenshot =
document.getElementById("screenshot").files[0];

// VALIDATIONS

if(!amount || amount <= 0){

  showNotification(
    "❌ Please Enter Valid Amount",
    "#ff1744"
  );

  return;
}

if(!utr || utr.length < 6){

  showNotification(
    "❌ Please Enter Valid UTR Number", 
    "#ff1744"
  );

  return;
}

if(!screenshot){

  showNotification(
    "❌ Please Upload Payment Screenshot",
    "#ff1744"
  );

  return;
}

  if(amount > 0){

// IMAGE FILE

const file =
document.getElementById("screenshot")
.files[0];

if(file){

  const reader = new FileReader();

  reader.onload = function(){

  sendTopupRequest(
    amount,
    utr,
    reader.result
  );

  // TRANSACTION HISTORY

  const transactionList =
  document.getElementById("transactionList");

  transactionList.innerHTML += `

  <div class="purchase-item">

    <h3 style="color:orange;">
      🟡 Payment Pending
    </h3>

    <p>Amount : ₹${amount}</p>

    <p>UTR : ${utr}</p>

    <p>${new Date().toLocaleString()}</p>

  </div>

  `;

  // SUCCESS MESSAGE

  closeWallet();

  showNotification(
  "✅ Payment Sent For Review\n⏳ Wait 15-20 Min For Admin Approval\n💰 Balance Will Be Auto Added",
  "#00c853"
);

  amountInput.value = "";

};

reader.readAsDataURL(file);

}


    document.getElementById("balance").innerText = `₹${balance}`;

    closeWallet();

    const notification = document.getElementById("notification");

    notification.innerText =
"✅ Payment Sent For Review\n⏳ Wait 15-20 Min For Admin Approval\n💰 Balance Will Be Auto Added";

    notification.style.background = "#00c853";

    notification.classList.add("show");

    setTimeout(()=>{
      notification.classList.remove("show");
    },3000);

    amountInput.value = "";

  }

});

// PAGE SYSTEM

function showHome(){

  document.getElementById("homePage").style.display = "block";

  document.getElementById("purchasedPage").style.display = "none";

  document.getElementById("transactionPage").style.display = "none";

  closeMenu();
}

function showPurchased(){

  document.getElementById("homePage").style.display = "none";

  document.getElementById("purchasedPage").style.display = "block";

  document.getElementById("transactionPage").style.display = "none";

  closeMenu();
}

function showTransactions(){

  document.getElementById("homePage").style.display = "none";

  document.getElementById("purchasedPage").style.display = "none";

  document.getElementById("transactionPage").style.display = "block";

  closeMenu();
}

// LIVE TIME

function updateTime(){

  const now = new Date();

  const time =
  now.toLocaleTimeString();

  document.getElementById("liveTime")
  .innerText = time;
}

setInterval(updateTime,1000);

updateTime();

// CARD PAGE

function openCardPage(){

  document.getElementById("cardPage")
  .style.display = "flex";
}

function closeCardPage(){

  document.getElementById("cardPage")
  .style.display = "none";
}

// NOTIFICATION FUNCTION

function showNotification(text,color){

  const notification =
  document.getElementById("notification");

  notification.innerText = text;

  notification.style.background = color;

  notification.classList.add("show");

  setTimeout(()=>{

    notification.classList.remove("show");

  },3000);

}