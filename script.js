import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://add-to-carry-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const shoppinglistInDB = ref(database, "shoppinglist")

// First Challenge:Make it so that when you click the 'Add to cart' button, whatever is written in the input field should be console logged.*/
const inputField = document.getElementById("input-field")
const addtocartButton = document.getElementById("add-Btn")
const newItems = document.getElementById("shopping-list")

// The first thing is the button needs to be clicked
addtocartButton.addEventListener("click", function() {
    //what do we need, we need the value when we entered
    //check if the inout field is empthy
    if (inputField.value.trim() === "") {
        alert("Bibi needs to fill up!")
        return;
    // If the input field is not empty, proceed to add the item
    } else {
    let inputValue = inputField.value
    push(shoppinglistInDB, inputValue)

    clearFieldEl()
    }

})
/* Challenge: Call the onValue function with shoppingListInDB as the first argument and function(snapshot) {} as the second argument */
// Challenge: Write a for loop to iterate on itemsArray and console log each item
// Challenge: Use the appendItemToShoppingListEl(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
onValue(shoppinglistInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val());
    
        enterNewinput()

        for (let i=0; i<itemArray.length; i++) {
            let currentItem = itemArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
        appendItemsToShoppingList(currentItem)
        }
    } else {
        newItems.innerHTML = "No items here yet bi"
    }
    
    
    
    
})


// We can refactoring to make our code is easier:
// This is function to clear the input field when the button is pressed
function clearFieldEl() {
    inputField.value = ''
}

//This is function to Append a new <li> with text content inputValue to the 'shopping-list' <ul>
function appendItemsToShoppingList (itemsValue) {
    let itemID = itemsValue[0]
    let itemValue = itemsValue[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue
    //newItems.innerHTML += `<li>${itemsValue}</li>`

    // When we double click, it will delete
    newEl.addEventListener("click", function() {
        let locationInListDB = ref(database, `shoppinglist/${itemID}`)
        // Use remove to delete from database
        remove(locationInListDB)
    })
    newItems.append(newEl)
}

// This function is to make the string to clear string to be empthy when we entered to the new input
function enterNewinput() {
    newItems.innerHTML = ''
}