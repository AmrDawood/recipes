let recipesColumns = document.getElementById('recipesColumns');
let gallerycolumn = document.getElementById('gallerycolumn');
let searchInput = document.getElementById("searchInput");
let searchButton = document.getElementById("searchButton");
let specificRecipeColumn = document.getElementById("specificRecipeColumn");

 let allRecipes = [];
 let specificRecipeDetail ;
// let httpReqest = new XMLHttpRequest();
// httpReqest.open('get','https://forkify-api.herokuapp.com/api/search?q=chips');
// httpReqest.send();
// httpReqest.addEventListener("readystatechange",function(){
//     if(httpReqest.readyState===4 && httpReqest.status=== 200){
//         // console.log(httpReqest.response);
//         // console.log(typeof(httpReqest.response));
//         // console.log(JSON.parse(httpReqest.response));
//         //  console.log(JSON.parse(httpReqest.response).recipes);
//         allRecipes = JSON.parse(httpReqest.response).recipes
//         displayRecipes();
//         displayGalleryItem()
//     }
// });

async function getAllRecipes(searchValue){
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${searchValue}`); 
    apiResponse = await apiResponse.json();

    // console.log(apiResponse);
    // console.log(apiResponse.recipes);
     allRecipes = apiResponse.recipes;
    displayRecipes();
    displayGalleryItem();
}

searchButton.addEventListener("click",function(){
    getAllRecipes(searchInput.value)
});

function displayRecipes(){
    let cartona = '' ;
    for (let index = 0; index < allRecipes.length; index++) {
        // escape a javascript string varable You should pass allRecipes[index].recipe_id in quotes then it will be treated as string argument
        //without you will have Uncaught SyntaxError: Invalid or unexpected token if the id have string and number value not only number .    
        // { id: 1354 }  // ok
        //  { id: 7d7ac00 } //Error invalid js
        // {id : '7d7ac00'} // ok
        cartona += `<div class=" col">
        <div class="card bg-transparent border-white border-3 h-100">
            <div class="img-container overflow-hidden">
                <img src="${allRecipes[index].image_url}" onclick="getRecipeDetail('${allRecipes[index].recipe_id}')" class="card-img-top" alt="" srcset="">
              </div>
            <div class="card-body">
                <h3 class="card-title text-white">${allRecipes[index].title}</h3>
                <p class="card-text text-white-50">Discover a sleighload of tasty snacks that are just right for holiday feasting.</p>

            </div>
            <div class="card-footer">
                <a href="${allRecipes[index].source_url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline-light">Read more <i class="bi bi-arrow-right"></i></a>
            </div>
        </div>
    </div>`;    
    }
    recipesColumns.innerHTML= cartona;
}

function displayGalleryItem(){
    let cartona = '' ;
    for (let index = 0; index < 6; index++) {
        cartona += `<div class="col">
        <div class="gallerItem">
            <div class="img-overlay overflow-hidden w-100 h-100">
                <img src="${allRecipes[index].image_url}" class="card-img-top" alt="${allRecipes[index].title}">
            </div>
        </div>
    </div>`;    
    }
    gallerycolumn.innerHTML= cartona;
}

async function getRecipeDetail(recipeID){
    let apiResponse =await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeID}`);
        apiResponse =await apiResponse.json();
    specificRecipeDetail = apiResponse.recipe
    // console.log(specificRecipeDetail); 
    displaySpecificRecipe();
}

function displaySpecificRecipe(){
    let cartona = ` <div class="card" >
    <div class="img-container overflow-hidden">
         <img src="${specificRecipeDetail.image_url}" class="card-img-top" alt="...">
    </div>
    <div class="card-body">
        <h5 class="card-title">${specificRecipeDetail.title}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <ul class="list-group list-group-flush overflow-auto">`
    for (let index = 0; index < specificRecipeDetail.ingredients.length; index++) {
            cartona +=` <li class="list-group-item">${ specificRecipeDetail.ingredients[index]}</li>`   
    }
    cartona +=`    </ul>
        <div class="card-body">
        <a href="${specificRecipeDetail.source_url}" target="_blank" rel="noopener noreferrer" class="card-link">Read more</a>
        </div>
     </div>`;
    // The target attribute set to _blank, which tells the browser to open the link in a new tab/window,
    // The rel attribute set to noreferrer noopener to prevent possible malicious attacks from the pages you link to (tabnabbing)
  specificRecipeColumn.innerHTML= cartona ;
}