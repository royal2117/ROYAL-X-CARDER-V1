// FIREBASE IMPORTS

import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getDatabase,
ref,
push,
set

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// FIREBASE CONFIG

const firebaseConfig = {

  apiKey: "AIzaSyD6VJR5ReojIepsK7ApxDGC02WzpKB9SuQ",

  authDomain: "royal-x-carder.firebaseapp.com",

  projectId: "royal-x-carder",

  databaseURL:
  "https://royal-x-carder-default-rtdb.firebaseio.com",

  storageBucket: "royal-x-carder.firebasestorage.app",

  messagingSenderId: "334284089387",

  appId:
  "1:334284089387:web:ca67bd718b6964b86c626e"

};

// INIT

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

// GLOBAL FUNCTION

window.sendTopupRequest = function(
amount,
utr,
image
){

  const paymentRef =
  push(ref(db,"payments"));

  set(paymentRef,{

    amount:amount,

    utr:utr,

    screenshot:image,

    status:"pending",

    time:new Date().toLocaleString()

  });

};