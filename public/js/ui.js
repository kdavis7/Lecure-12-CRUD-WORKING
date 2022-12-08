//setup materialize components
document.addEventListener("DOMContentLoaded",function(){
  var modals =document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items =document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});



const recipes = document.querySelector(".recipes");
const loggedOutLinks=document.querySelectorAll(".logged-out");
const loggedInLinks=document.querySelectorAll(".logged-in");

const setupUI =(user)=>{
  if (user) {
    //toggle UI elements
    loggedOutLinks.forEach((item)=> (item.style.display="none"));
    loggedInLinks.forEach((item)=> (item.style.display="block"));

  }else {
    loggedOutLinks.forEach((item)=> (item.style.display="block"));
    loggedInLinks.forEach((item)=> (item.style.display="none"));
  }
};
document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "left" });
    // Add Recipes
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });

  
  });
//Recipe Filter by category title and have a show all feature. 
  const categoryTitle = document.querySelectorAll('.category-title');
  const allRecipes = document.querySelectorAll('.all');
  
  for(let i = 0; i < categoryTitle.length; i++){
      categoryTitle[i].addEventListener('click', filterRecipes.bind(this, categoryTitle[i]));
  }
  
  function filterRecipes(item){
      changeActivePosition(item);
      for(let i = 0; i < allRecipes.length; i++){
          if(allRecipes[i].classList.contains(item.attributes.id.value)){
              allRecipes[i].style.display = "block";
          } else {
              allRecipes[i].style.display = "none";
          }
      }
  }
  
  function changeActivePosition(activeItem){
      for(let i = 0; i < categoryTitle.length; i++){
          categoryTitle[i].classList.remove('active');
      }
      activeItem.classList.add('active');
  };

  
//Table Filter Function
function tableFilter() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("userInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("coffeeTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

  //populate data
const setupRecipes=(data)=>{
  let html ="";
  data.forEach((doc)=>{
    const recipe = doc.data();
    const li=`
    <div class = "all mine" data-id ="${recipe.id}">
    <div class = "recipe-img" >
        <img src = "coffee.jpg" alt = "a cup of coffee.">
        <span class = "category-name">Mine</span>
    </div>

    <div class = "recipe-content">
        <a href="#" class= "right btn-floating grey"><i class="material-icons" data-id ="${recipe.id}">delete_outline</i></a>
        
        <h2>${recipe.title}<a href="#" class="right favorite-btn btn-floating red pulse">
            <i class="material-icons">favorite</i></a></h2>
        <p>${recipe.description}</p>
    </div>

    
        
</div>
`;
html+=li;
  });

  recipes.innerHTML=html;
};

const renderRecipe =(data,id)=>{
  const html = `
  <div class = "all mine" data-id ="${id}">
      <div class = "recipe-img" >
          <img src = "coffee.jpg" alt = "a cup of coffee.">
          <span class = "category-name">Mine</span>
      </div>

      <div class = "recipe-content">
          <a href="#" class= "right btn-floating grey"><i class="material-icons" data-id ="${id}">delete_outline</i></a>
          
          <h2>${data.title}<a href="#" class="right favorite-btn btn-floating red pulse">
              <i class="material-icons">favorite</i></a></h2>
          <p>${data.description}</p>
      </div>

      
          
  </div>`
  ;
  recipes.innerHTML += html;
};

const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id ='${id}']`);
  // console.log(recipe);
  recipe.remove();
  
};

