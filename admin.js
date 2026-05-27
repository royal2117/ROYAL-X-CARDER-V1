import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD6VJR5ReojIepsK7ApxDGC02WzpKB9SuQ",
  authDomain: "royal-x-carder.firebaseapp.com",
  projectId: "royal-x-carder",
  databaseURL: "https://royal-x-carder-default-rtdb.firebaseio.com",
  storageBucket: "royal-x-carder.firebasestorage.app",
  messagingSenderId: "334284089387",
  appId: "1:334284089387:web:ca67bd718b6964b86c626e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const adminRequests = document.getElementById("adminRequests");

let total = 0, pending = 0, approved = 0, rejected = 0;

onValue(ref(db,"payments"),(snapshot)=>{

  adminRequests.innerHTML = "";

  total = 0; pending = 0; approved = 0; rejected = 0;

  snapshot.forEach((child)=>{

    const data = child.val();
    const key = child.key;

    total++;

    if(data.status === "pending") pending++;
    if(data.status === "completed") approved++;
    if(data.status === "rejected") rejected++;

    adminRequests.innerHTML += `

    <div class="item">

      <h3>${data.status.toUpperCase()}</h3>

      <p>₹${data.amount}</p>
      <p>UTR: ${data.utr}</p>
      <p>${data.time}</p>

      <img src="${data.screenshot}" style="width:100%; border-radius:10px;">

      <button class="approve" onclick="approve('${key}',${data.amount})">APPROVE</button>

      <button class="reject" onclick="reject('${key}')">REJECT</button>

    </div>

    `;
  });

  document.getElementById("totalRequests").innerText = total;
  document.getElementById("pendingCount").innerText = pending;
  document.getElementById("approvedCount").innerText = approved;
  document.getElementById("rejectedCount").innerText = rejected;

});

window.approve = function(key,amount){

  update(ref(db,"payments/"+key),{
    status:"completed"
  });

};

window.reject = function(key){

  update(ref(db,"payments/"+key),{
    status:"rejected"
  });

};