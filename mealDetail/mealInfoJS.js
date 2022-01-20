/*--------------------------------------------------------------*/
/* IMPORTANT SECTION:
  PRESS CTRL+F AND TYPE FOLLOWING  NAMES TO NAVIGATE TO THESE SECTIONS
  --------------------------------------------------------------
  A] FETCH CLASSES AND IDS
  --------------------------------------------------------------
  B] Request for MEAL from Meal SERVER
  --------------------------------------------------------------
*/
/*--------------------------------------------------------------*/

/*----------------------------------------------------------
// FETCH CLASSES AND IDS
-------------------------------------------------------------*/

let mealsContainer = document.querySelector(".meals-container");

/*----------------------------------------------------------
// Request for MEAL from Meal SERVER
-------------------------------------------------------------*/
let xhr = new XMLHttpRequest();

xhr.onload = function () {
  let resJSON = JSON.parse(this.responseText);
  mealsContainer.innerHTML = "";
  if (!resJSON.meals) console.log("Not iterable");
  else {
    for (let meal of resJSON.meals) {
      let myFavStorage = localStorage.getItem("myFav");

      let isFav = "no";

      if (myFavStorage.length > 2) {
        myFavStorage = JSON.parse(myFavStorage);
        for (let favMeal in myFavStorage) {
          if (meal.idMeal == favMeal) {
            isFav = "yes";
          }
        }
      }

      // Meal info half
      let mealInfo = document.createElement("div");
      mealInfo.className = `meal-info id-${meal.idMeal}`;
      mealInfo.setAttribute("fav", `${isFav}`);
      mealInfo.setAttribute("id", `${meal.idMeal}`);

      // GET Ingredients and Measures
      let i = 0,
        j = 0;
      let strIngredients = [];
      let strMeasures = [];

      for (let mealKey in meal) {
        if (i == 0 && mealKey == "strIngredient1") {
          i = 1;
          if (meal[mealKey]) {
            strIngredients.push(meal[mealKey]);
          }
        } else if (i >= 1 && i <= 20) {
          i++;
          if (meal[mealKey]) {
            strIngredients.push(meal[mealKey]);
          }
        }

        if (j == 0 && mealKey == "strMeasure1") {
          j = 1;
          if (meal[mealKey]) {
            strMeasures.push(meal[mealKey]);
          }
        } else if (j >= 1 && j <= 20) {
          j++;
          if (meal[mealKey]) {
            strMeasures.push(meal[mealKey]);
          }
        }
      }

      // Add Ingredients and measures to IngredientsList
      let ingredientsList = ``;
      i = 0;

      for (i = 0; i < strIngredients.length; i++) {
        ingredientsList += `<h3>${i + 1}. ${strIngredients[i]} : ${
          strMeasures[i]
        }</h3>`;
      }

      // Get recipes steps
      let recipeString = meal.strInstructions.split("\r\n");
      let recipeSteps = "";
      for (let i = 0; i < recipeString.length; i++) {
        recipeSteps += `<h5>${i + 1}. ${recipeString[i]}</h5>`;
      }

      // Add information of meal to mealInfo
      mealInfo.innerHTML = `
        <div class="meal-name" text="${meal.strMeal}">${meal.strMeal}</div>
        <div class="meal-img">
          <a href="./mealInfo.html?link=https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}"><img src="${meal.strMealThumb}" alt="" /></a>
        </div>
        <div class="meal-details">
          <div class="meal-category">${meal.strCategory}</div>
          <div class="meal-fav"><i class="fas fa-heart"></i></div>
        </div>
        <div class="meal-area">${meal.strArea}</div>
        <h1>Ingredients:</h1>
        <div class="ingredients-list">${ingredientsList}</div>
        <h1>Recipe Instructions:</h1>
        <div class="meal-recipe">${recipeSteps}</div>
        `;

      // Add mealInfo to mealsContainer
      mealsContainer.appendChild(mealInfo);

      let addFav = document.querySelector(`.id-${meal.idMeal}`);

      let setFav = addFav.children[2].children[1].children[0];

      if (isFav == "yes") setFav.style.color = "#FF4342";

      // Add or Remove Meal from Favourite Meal
      setFav.addEventListener("click", function () {
        let myFav = {};

        if (addFav.getAttribute("fav") == "no") {
          let myFavJSON = localStorage.getItem("myFav");
          if (myFavJSON.length > 2) myFav = JSON.parse(myFavJSON);
          myFav[meal.idMeal] = addFav.innerHTML;
          localStorage.setItem("myFav", JSON.stringify(myFav));

          addFav.setAttribute("fav", "yes");
          setFav.style.color = "#FF4342";
        } else if (addFav.getAttribute("fav") == "yes") {
          myFav = JSON.parse(localStorage.getItem("myFav"));
          delete myFav[meal.idMeal];
          localStorage.setItem("myFav", JSON.stringify(myFav));

          addFav.setAttribute("fav", "no");
          setFav.style.color = "#c8c8c8";
        }
      });
    }
  }
};

xhr.open("get", `${location.href.split("link=")[1]}`, false);
xhr.send();
