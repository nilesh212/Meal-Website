/*--------------------------------------------------------------*/
/* IMPORTANT SECTION:
  PRESS CTRL+F AND TYPE FOLLOWING  NAMES TO NAVIGATE TO THESE SECTIONS
  --------------------------------------------------------------
  A] FETCH CLASSES AND IDS
  --------------------------------------------------------------
  B] DISPLAY FAVOURITE MEALS
  --------------------------------------------------------------
  C] DISPLAY NO FAVOURITE BOX
  --------------------------------------------------------------
*/
/*--------------------------------------------------------------*/

/*----------------------------------------------------------
// FETCH CLASSES AND IDS
-------------------------------------------------------------*/

let mealsContainer = document.querySelector(".meals-container");
let noMealContainer = document.querySelector(".no-meal-container");

let myFavStorage = localStorage.getItem("myFav");

/*----------------------------------------------------------
// DISPLAY FAVOURITE MEALS
-------------------------------------------------------------*/
// Check Number of Meals
if (myFavStorage && myFavStorage.length > 2) {
  noFavMeal();

  myFavStorage = JSON.parse(myFavStorage);

  for (let mealID in myFavStorage) {
    let mealInfo = document.createElement("div");

    // let mealInfoHTML = new DOMParser().parseFromString(
    //   myFavStorage[mealID],
    //   "text/html"
    // );

    mealInfo.className = `meal-info id-${mealID}`;
    mealInfo.setAttribute("fav", "yes");
    mealInfo.innerHTML = `${myFavStorage[mealID]}`;
    mealsContainer.appendChild(mealInfo);

    let addFav = document.querySelector(`.id-${mealID}`);

    // Modify meal's inforamtion link
    let mealDetailsLink =
      "./../" +
      addFav.children[0].children[0].getAttribute("href").split("./")[1];

    // Change link address
    addFav.children[0].children[0].setAttribute("href", mealDetailsLink);

    let setFav = addFav.children[2].children[1].children[0];

    setFav.style.color = "#FF4342";

    // Add or Remove Meal from Favourite Meal
    setFav.addEventListener("click", function () {
      let myFav = {};

      if (addFav.getAttribute("fav") == "no") {
        let myFavJSON = localStorage.getItem("myFav");
        if (myFavJSON.length > 2) myFav = JSON.parse(myFavJSON);
        myFav[mealID] = addFav.innerHTML;
        localStorage.setItem("myFav", JSON.stringify(myFav));

        addFav.setAttribute("fav", "yes");
        setFav.style.color = "#FF4342";
      } else if (addFav.getAttribute("fav") == "yes") {
        myFav = JSON.parse(localStorage.getItem("myFav"));
        delete myFav[mealID];
        addFav.remove();
        localStorage.setItem("myFav", JSON.stringify(myFav));

        addFav.setAttribute("fav", "no");
        setFav.style.color = "#c8c8c8";
      }

      noFavMeal();
    });
  }
}

/*----------------------------------------------------------
// DISPLAY NO FAVOURITE BOX
-------------------------------------------------------------*/
function noFavMeal() {
  if (myFavStorage && myFavStorage.length > 2) {
    noMealContainer.style.display = "none";
  } else {
    noMealContainer.style.display = "flex";
  }
}
