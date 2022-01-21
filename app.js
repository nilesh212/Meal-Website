/*--------------------------------------------------------------*/
/* IMPORTANT SECTION:
  PRESS CTRL+F AND TYPE FOLLOWING  NAMES TO NAVIGATE TO THESE SECTIONS
  --------------------------------------------------------------
  A] FETCH CLASSES AND IDS
  --------------------------------------------------------------
  B] Event Listeners KEYPRESS and KEYDOWN in SEARCH BOX
  --------------------------------------------------------------
  C] SEARCH BUTTON
  --------------------------------------------------------------
  D] Request for MEAL from Meal SERVER
  --------------------------------------------------------------
  E] Your Favourite Button
  --------------------------------------------------------------
*/
/*--------------------------------------------------------------*/

/*----------------------------------------------------------
// FETCH CLASSES AND IDS
-------------------------------------------------------------*/

let inputMeal = document.querySelector("#input-meal");
let mealsContainer = document.querySelector(".meals-container");
let searchButton = document.querySelector(".search-button");
let favButton = document.querySelector(".fav-button");
let noMealContainer = document.querySelector(".no-meal-container");

/*----------------------------------------------------------
// Event Listeners keypress and keydown in SEARCH BOX
-------------------------------------------------------------*/
inputMeal.addEventListener("keypress", function (e) {
  let mealName = inputMeal.value + e.key;
  searchMeal(mealName);
});

inputMeal.addEventListener("keydown", function (e) {
  if (e.keyCode == "8") {
    let mealName = inputMeal.value;
    if (mealName.length != 1) {
      mealName = mealName.substring(0, mealName.length - 1);
      searchMeal(mealName);
    } else {
      noMealContainer.style.display = "flex";
      mealsContainer.innerHTML = "";
    }
  }
});

/*----------------------------------------------------------
// SEARCH BUTTON
-------------------------------------------------------------*/
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  let mealName = inputMeal.value;
  if (mealName.length != 0) searchMeal(mealName);
  else {
    noMealContainer.style.display = "flex";
  }
});

/*----------------------------------------------------------
// Request for meal from Meal Server
-------------------------------------------------------------*/
function searchMeal(mealName) {
  let xhr = new XMLHttpRequest();

  xhr.onload = function () {
    // Get data from server
    let resJSON = JSON.parse(this.responseText);

    // Empty MealsContainer
    mealsContainer.innerHTML = "";

    if (!resJSON.meals) {
      noMealContainer.style.display = "flex";
    } else {
      noMealContainer.style.display = "none";

      for (let meal of resJSON.meals) {
        // Check favourite meal
        let isFav = "no";

        let mealInfo = document.createElement("div");
        mealInfo.className = `meal-info id-${meal.idMeal}`;
        mealInfo.setAttribute("fav", `${isFav}`);

        mealInfo.innerHTML = `
        <div class="meal-img">
          <a href="./mealDetail/mealInfo.html?link=https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}"><img src="${meal.strMealThumb}" alt="Meal Photo" /></a>
        </div>
        <div class="meal-name" title="${meal.strMeal}">${meal.strMeal}</div>
        <div class="meal-details">
          <div class="meal-category">${meal.strCategory}</div>
          <div class="meal-fav"><i class="fas fa-heart"></i></div>
        </div>
        <div class="meal-area">${meal.strArea}</div>`;

        mealsContainer.appendChild(mealInfo);

        let addFav = document.querySelector(`.id-${meal.idMeal}`);
        let setFav = addFav.children[2].children[1].children[0];

        if (isFav == "yes") setFav.style.color = "#FF4342";

        setFav.addEventListener("click", function () {
          let myFav = {};

          if (addFav.getAttribute("fav") == "no") {

            addFav.setAttribute("fav", "yes");
            setFav.style.color = "#FF4342";
          } else if (addFav.getAttribute("fav") == "yes") {
            addFav.setAttribute("fav", "no");
            setFav.style.color = "#c8c8c8";
          }
        });
      }
    }
  };

  xhr.open(
    "get",
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
    false
  );
  xhr.send();
}

/*----------------------------------------------------------
// Your Favourite Button
-------------------------------------------------------------*/
favButton.addEventListener("click", function (e) {
  e.preventDefault();
  location.href = "./favMeal/favMealHTML.html";
});
