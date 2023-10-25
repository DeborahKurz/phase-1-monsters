const forwardBtn = document.getElementById("forward");
const backBtn = document.getElementById("back");

let pageNumb = 1;

forwardBtn.addEventListener("click", ()=>{
    deleteOldMonsters();
    pageNumb++;
    fetchMonsters(pageNumb);
});

backBtn.addEventListener("click", ()=>{
    deleteOldMonsters();
    pageNumb--;
    fetchMonsters(pageNumb);
});

function deleteOldMonsters(){
    const oldMonstersObj = document.querySelectorAll(".monsters");
    for(let item of oldMonstersObj){
        item.remove();
    };
};

fetchMonsters(1);

function fetchMonsters(num){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${num}`)
    .then(res=>res.json())
    .then(monstersArray => renderMonsters(monstersArray))
    .catch(error => console.log(error));
};

function renderMonsters(monstersArray){
    const monstersContainer = document.getElementById('monster-container');
    monstersArray.forEach(monsterObj => {
        const monsterDiv = document.createElement("div");
        monsterDiv.className = "monsters";
        monstersContainer.appendChild(monsterDiv);

        const monsterName = document.createElement("h2");
        const monsterAge = document.createElement("h4");
        const monsterBio = document.createElement("p");

        monsterName.innerText = monsterObj.name;
        monsterAge.innerText = `Age: ${monsterObj.age}`;
        monsterBio.innerText = `Bio: ${monsterObj.description}`;

        monsterDiv.append(monsterName, monsterAge, monsterBio);
    })
};

const createBtn = document.getElementById("create");

createBtn.addEventListener("click", ()=>{
    createMonster();
})

function createMonster(){
    const nameInput = document.getElementById("name");
    const ageInput = document.getElementById("age");
    const descriptionInput = document.getElementById("description");
    let monsterObj = {
        name: nameInput.value,
        age: ageInput.value,
        description: descriptionInput.value,
    };
    postMonster(monsterObj);
};

function postMonster(monsterObj){
    fetch("http://localhost:3000/monsters",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(monsterObj)
    })
    .then(resp => resp.json())
    .then(monster => console.log(monster))
};