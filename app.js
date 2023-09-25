  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import {
     getDatabase,
     ref,
     set,
     push,
     onChildAdded,
     update,
     remove
     } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDfJRqh5e2vQ73UuI0DBLt2fRI4HRi1_No",
    authDomain: "crud-924c2.firebaseapp.com",
    databaseURL: "https://crud-924c2-default-rtdb.firebaseio.com",
    projectId: "crud-924c2",
    storageBucket: "crud-924c2.appspot.com",
    messagingSenderId: "148221360716",
    appId: "1:148221360716:web:a753489f01719952a1d2e9",
    measurementId: "G-VLJ0BGMD3P"
  };

  // Initialize Firebase
  var app = initializeApp(firebaseConfig);
  var DATABASE = getDatabase(app);
  var dataList = [];

  var firstName = document.getElementById('inputFirstName4');
 var lastName = document.getElementById('inputLastName4');
 var email = document.getElementById('inputEmail4');
 var address = document.getElementById('inputAddress');
 var address2 = document.getElementById('inputAddress2');
 var city = document.getElementById('inputCity');
 var state = document.getElementById('inputState');
 var age = document.getElementById('inputAge');
 var table = document.getElementById("table")
// var flexRadioDefault = document.getElementsByName('flexRadioDefault');

  window.sendingDataToDatabase = function(){

    var selectedGender;
    var radios = document.getElementsByName('flexRadioDefault');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        selectedGender = radios[i].value;
        break;
      }
    }

    var userData = {
      uFirstName:firstName.value.trim(),
      uLastName:lastName.value.trim(),
      uEmail:email.value.trim(),
      uAddress:address.value.trim(),
      uAddress2:address2.value.trim(),
      uCity:city.value.trim(),
      uState:state.value,
      uAge:age.value.trim(),
      // uflexRadioDefault:flexRadioDefault.value
      uGender:selectedGender
    }
    var referkey = ref(DATABASE)
    var rendomId = push(referkey).key;
    userData.id = rendomId;
    var reference = ref(DATABASE,`user data/${userData.id}`);
    set(reference,userData)
    // console.log(userData)
  };
  function gettingDataFromDatabase (){
    var refe = ref(DATABASE,'user data')
    onChildAdded(refe, function(data){
      render(data.val());
    });
  }
  window.onload = gettingDataFromDatabase();

  function render(data){
    if(data || data == " "){
      dataList.push(data)
      var p = document.createElement('p')
      p.innerHTML = 'Please fill out these inputs'
    }
    table.innerHTML = '';
    var thead = document.createElement('thead')
    // thead.toLUpperCase()
    thead.innerHTML = `
    <tr class="px-3">
    <th>S.No</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
    <th>Address</th>
    <th>Address2</th>
    <th>Gender</th>
    <th>State</th>
    <th>City</th>
    <th>Id</th>
  </tr>
    `
    table.appendChild(thead);
    var tbody = document.createElement('tbody')
    for(var i = 0; i<dataList.length; i++){
      var thead = document.getElementById('thead')
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataList[i].uFirstName}</td>
          <td>${dataList[i].uLastName}</td>
          <td>${dataList[i].uEmail}</td>
          <td>${dataList[i].uAddress}</td>
          <td>${dataList[i].uAddress2}</td>
          <td>${dataList[i].uGender}</td>
          <td>${dataList[i].uState}</td>
          <td>${dataList[i].uCity}</td>
          <td>${dataList[i].id}</td>
          <td><button onclick="editData(${i},'${dataList[i].id}')">Edit</button></td>
          <td><button onclick="deleteData(${i},'${dataList[i].id}')">Delete</button></td>

        </tr>
    </Table>
      `
      table.appendChild(tbody)
    }
  }

  window.editData = function(index, id){
    // console.log("qwertyui")
    dataList[index] = prompt("Add ");
    var reference = ref(DATABASE,`user data/${id}`);
    update(reference)
    render()
  }


window.deleteData = function(index,id){
  dataList.splice(index,1);
  var reference = ref(DATABASE,`user data/${id}`);
  remove(reference);
  render()
}

// // ... Existing code ...

// window.deleteAllData = function(index, id) {
//   // Clear the dataList array
//   dataList = [];

//   // Clear the table contents
//   table.innerHTML = '';

//   // Remove data from the database
//   var reference = ref(DATABASE, 'user data');
//   remove(reference);

//   // Render the empty table
//   render();
// };

// ... Rest of your code ...
//           <td><button onclick="deleteAllData(${i},'${dataList[i].id}')">DeleteAll</button></td>