const form = document.querySelector(".form")
const input = document.querySelector(".search")
const container = document.querySelector(".container")
const fetchContainer = document.querySelector(".fetch-container")
const fetchTitle = document.querySelector(".fetch-title")
const fetchParent = document.querySelector(".fetch-parent")
const errorMsg = document.querySelector(".error-msg")

const fetchSense = async (year) => {

    let decade = (((year / 100).toFixed(1)) * 100).toFixed(0)
    const APIResponse = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?decada=${decade}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
          return data;
    }
    
}

function newItems(nome, frequencia, ranking){
    let listItem = document.createElement('li');
    listItem.innerHTML = `${ranking}- ${nome} (${frequencia}) `
    fetchParent.appendChild(listItem);
}


const renderData = async (year) => {
    const data = await fetchSense(year);
        container.style.display != "none" ? container.style.display = "none":container.style.display = "flex";
        fetchContainer.style.display = "none" ? fetchContainer.style.display = "flex":fetchContainer.style.display = "none";
        fetchTitle.innerHTML = `Nomes mais comuns no ${data[0].localidade} em ${year} :`
        data[0].res.map((item) => {
            let names = item.nome.toLowerCase();
            newItems(names.charAt(0).toUpperCase() + names.slice(1),item.frequencia.toLocaleString('pt-BR'), item.ranking)
       })

}





form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value >= 1930 && input.value <= 2010){
        renderData(input.value);
        errorMsg.style.display = "none"
    }
    else{
        errorMsg.style.display = "flex"
    }

})

