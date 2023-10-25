//When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

//Get container to put monsters in
//Get Monsters name/age/description

//create div
//create h2 for name
//create h4 for >Age: <
//create p for Bio add >"Bio: 

fetch('http://localhost:3000/monsters/?_limit=50&_page=1')
.then(res=>res.json())
.then(monstersArray => renderMonsters(monstersArray))


function renderMonsters(monstersArray){
    const monstersContainer = document.getElementById('monster-container');
    monstersArray.forEach(monsterObj => {
        const monsterDiv = document.createElement("div");
        monstersContainer.appendChild(monsterDiv);

        const monsterName = document.createElement("h2");
        const monsterAge = document.createElement("h4");
        const monsterBio = document.createElement("p");

        monsterName.innerText = monsterObj.name;
        monsterAge.innerText = `Age: ${monsterObj.age}`;
        //Come back to round age
        monsterBio.innerText = `Bio: ${monsterObj.description}`;

        monsterDiv.append(monsterName, monsterAge, monsterBio);
    })
};