const gifContainer = document.querySelector(".gif-container");
const tableContainer = document.querySelector(".table-container");
const errorContainer = document.querySelector(".error-container");


const url = "https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=cd2c181e8b294b44b1832151ce8dfdb7";

//function for  API call
async function getApi () {
   try {
        const response = await fetch(url);
        const result = await response.json();
        const resposnseResult = result.results
        
        gifContainer.classList.remove("hidden");
        
    //setinterval function to remove loading image while api call
        const intervalId = setInterval(removeGif,1000);
       
        function removeGif ()  {
            //looping through api response
            for (let i = 0; i < resposnseResult.length; i++) {
                
                gifContainer.classList.add("hidden");
                tableContainer.classList.remove("hidden") 
                
                if(i === 10) { 
                    break;
                };
                tableContainer.innerHTML += 
                   `<tr>
                    <td>${i+1}</td>
                    <td>${resposnseResult[i].name}</td>
                    <td>${resposnseResult[i].rating}</td>
                    <td>${resposnseResult[i].tags.length}</td>
                    </tr>`
            clearInterval(intervalId);
            }
        }
   } 
   catch(error) {
        errorContainer.innerHTML = showError("Something went wrong...");
   }
}

getApi();

//function to show error
const showError = message => {
    if(!message) {
        message = "Unknown error"
    }
    return `<p class= "error">${message}</p>`;
}

