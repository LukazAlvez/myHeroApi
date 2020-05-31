let url = 'https://www.superheroapi.com/api.php/2921341911320259/search/'

let inputSearch = document.querySelector('#pesquisa');
let buttonGo = document.querySelector('#go');
let cardList = document.querySelector('#card');
let imgLoading = "./src/img/load.gif"



function setLoading(stl = true){
    if (stl === true){
        let loading = document.createElement('img');
        loading.setAttribute('id', 'loading');
        loading.setAttribute('width', '50px');
        loading.setAttribute('src', imgLoading);
                
    
        setLoad = document.querySelector('.load');
        setLoad.appendChild(loading);
    }else {
        document.querySelector('#loading').remove();
    }
}



async function search (){
    cardList.innerHTML = '';
    let repositories = [];


  
    let name = inputSearch.value;

    if (name.length === 0 ){
            alert('Digite um nome para pesquisar')
            return
    }
    
    try{  
        setLoading()
        const response = await axios.get(url+name);
        
        let results = response.data.results;
        console.log(results)

        results.forEach(function(r, i){
            const {name, image:{url}, powerstats:{combat, durability, intelligence, power, speed, strength}} = r

            repositories.push({
                name : name,
                image: url,
                combat : combat,
                durability : durability,
                intelligence: intelligence,
                power: power,
                speed : speed,
                strength : strength
            })
            
        });
    }catch (err){
        alert('Personagem não encontrado!!!');
    };
    setLoading(false)

    function render() {

        repositories.forEach(repo =>{
            let name = document.createElement('strong');
            name.appendChild(document.createTextNode('Name: '+ repo.name));

            let description = document.createElement('p');
            description.innerHTML = '<strong>Attributes:</strong>'+'<br>'+
            'Combat: '+'<strong>'+repo.combat+'</strong>'+'<br>'+
            'Durability: '+'<strong>'+repo.durability+'</strong>'+'<br>'+
            'Intelligence: '+'<strong>'+repo.intelligence+'</strong>'+'<br>'+
            'Power: '+'<strong>'+repo.power+'</strong>'+'<br>'+
            'Speed: '+'<strong>'+repo.speed+'</strong>'+'<br>'+
            'Strenght: <strong>'+repo.strength+'</strong>'
            

            let img = document.createElement('img');
            img.setAttribute('src', repo.image);

            let cardName = document.createElement('li');

            cardName.appendChild(img);
            cardName.appendChild(name);
            cardName.appendChild(description);

            cardList.appendChild(cardName); 
        })
              
    }
    inputSearch.value = ''
    render();

};

buttonGo.onclick = search;

function inicializa(){
    document.addEventListener('keydown', pegaTecla);
}

function pegaTecla(){
  var tecla = event.keyCode;
  if(tecla === 13){
    cardList.innerHTML = '';
    search()
  }
  
}

inicializa()


