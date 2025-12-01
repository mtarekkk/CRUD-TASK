let title=document.querySelector('#title');
let price=document.querySelector('#price');
let taxes=document.querySelector('#taxes');
let ads=document.querySelector('#ads');
let discounts=document.querySelector('#discounts');
let total=document.querySelector('#total');
let count=document.querySelector('#count');
let category=document.querySelector('#category');
let submit=document.querySelector('#submit');
let tbody=document.querySelector('#tbody');
let deleteAll=document.querySelector('#deleteAll');
let search=document.querySelector('#search');
let mood='create';
let temp;
//Get Total

function getTotal(){
    if(price.value != 0){
        let result = (+price.value + +taxes.value + +ads.value) - +discounts.value;
        total.innerHTML = result;
        total.style.background = "green";
        total.style.color = "white";
    } else {
        total.innerHTML = '';
        total.style.background = "red";
        total.style.color = "white";
    }
}


//Create

let data;
if (localStorage.product != null) {
    data = JSON.parse(localStorage.product);
} else {
    data = [];
}
submit.onclick = function() {

    let dataobj = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discounts: discounts.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    if(title.value!='' &&price.value!=''&&category.value!=''){
    if(mood==='create'){
        if(count.value>1){
        for(let i=0;i<count.value;i++){
            data.push(dataobj);
        }
    }
    else{
        data.push(dataobj);
    }
    }
    else {
        data[temp] = dataobj;
        mood = "create"; 
        submit.innerHTML = "Create"; 
    }
    localStorage.setItem("product", JSON.stringify(data));

    console.log(data);
    clearData();
    showData(); 
}
};

//clear

function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discounts.value='';
    total.value='';
    count.value='';
    category.value='';
    total.style.background = "red";
    total.style.color = "white";
    total.innerHTML=``;
}

//Read

function showData(){
    let table='';
    for(let i=0;i<data.length;i++){
        table+=`
        <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discounts}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>
        `;
    }
    tbody.innerHTML=table;
    if(data.length>0){
        deleteAll.innerHTML=`<button onclick="deleteAlll()" id="deleteee" class="block w-full mt-2 rounded-[15px] p-2 outline-0 border-0 cursor-pointer bg-[#470053] hover:bg-[#780f8b]">Delete All(${data.length})</button>`;
    }
    else{
        deleteAll.innerHTML=``;
    }
}
showData();


//Delete item

function deleteData(i){
    data.splice(i,1);
localStorage.setItem("product", JSON.stringify(data));
    showData();
}


//deleteAll

function deleteAlll(){
    localStorage.clear();
    data.splice(0);
    showData();
}

//Update data

function updateData(i){
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discounts.value=data[i].discounts;
    category.value=data[i].category;
    submit.innerHTML='Update';
    mood='update';
    temp=i;
    getTotal();
}

//search

let searchMood='title';
function getSearchMood(moodType){
    searchMood = moodType;
    search.placeholder = "Search by " + moodType;
    search.focus();
}
function searchData(value){
    let table='';

    for(let i=0;i<data.length;i++){
        if(searchMood == 'title' && data[i].title.includes(value)){
            table+=`
            <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discounts}</td>
                <td>${data[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
        }
        else if(searchMood == 'category' && data[i].category.includes(value)){
            table+=`
            <tr>
                <td>${i}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discounts}</td>
                <td>${data[i].category}</td>
                <td><button onclick="updateData(${i})">Update</button></td>
                <td><button onclick="deleteData(${i})">Delete</button></td>
            </tr>`;
        }
    }

    tbody.innerHTML = table;
}
