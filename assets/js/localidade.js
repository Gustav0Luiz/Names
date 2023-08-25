
const form = document.querySelector(".form")
const inputName = document.querySelector(".search-name")
const inputPlace = document.querySelector(".search-place")
const container = document.querySelector(".container")
const fetchContainer = document.querySelector(".fetch-container")
const fetchTitle = document.querySelector(".fetch-title")
const fetchParent = document.querySelector(".fetch-parent")
const errorMsg = document.querySelector(".error-msg")

const fetchSense = async (name,code) => {
    let rightName = name.toLowerCase();
    const APIResponse = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${rightName}?localidade=${code}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
          return data;
    }
}

function newItems(frequencia, decada){
    let listItem = document.createElement('li');
    listItem.innerHTML = `Década de ${decada}: (${frequencia.toLocaleString('pt-BR')}) `
    fetchParent.appendChild(listItem);
}


const renderData = async (name, code) => {
        const data = await fetchSense(name, code);
        if(data[0]){
            container.style.display != "none" ? container.style.display = "none":container.style.display = "flex";
            fetchContainer.style.display = "none" ? fetchContainer.style.display = "flex":fetchContainer.style.display = "none";
            fetchTitle.innerHTML = `Número de pessoas com o nome "${name}" por década na localidade ${data[0].localidade}:`
            function justNumbers(text) {
                var numbers = text.replace('[','');
                var numbers2 = numbers.replace('[','');
                var numbers3 = numbers2.replace(',','-');
                return (numbers3);
    }   
            data[0].res.map((item) => {
            newItems(item.frequencia, justNumbers(item.periodo))
   })}else{
        errorMsg.style.display = "flex"
   }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    renderData(inputName.value, inputPlace.value);
    errorMsg.style.display = "none"
})

