//Selectors and Global Variables Section//

//Form, Name, Job role selections//
const form = document.querySelector('form');
const name = document.getElementById('name'); //This will select name input
const email = document.getElementById('email'); //This will select email input
const emailHint = document.querySelector('.email-hint'); //This selects '.email-hint'
const otherJobRole = document.getElementById('other-job-role'); // This will select 'other job role' input element
const userTitle = document.getElementById('title'); //this selects 'job role' input element

//T-shirt-Selectors//

const shirtDesign = document.getElementById('design'); // this will select t-shirt by the design
const shirtColorSelect = document.getElementById('color'); //this will select t-shirt color

//Activity Selectors//

const activities = document.getElementById('activities'); //This will select 'Register for Activities'
const activitiesCost = document.getElementById('activities-cost'); //This will select the 'Total: $'
const activitiesBox = document.getElementById('activities-box');
const activitiesBoxChildren = activitiesBox.children;
const checkboxInput = document.querySelectorAll('input[type="checkbox"]');

//Payment Type Selectors//

const paymentMethods = document.querySelector('.payment-methods'); //This selects 'Payment Info' fieldset
const paymentSelect = document.getElementById('payment'); // This selects 'Payment info'
const cardNumber = document.getElementById('cc-num'); // This selects 'card number' input info
const zipCode = document.getElementById('zip'); // This selects 'zip code' input info
const cvv = document.getElementById('cvv'); //This selects 'cvv' input info

//Global Variables//

let totalCost = 0; // This will show current cost amount, but set to 0
let activitiesTotal = 0; //This will count the amounnt of activities the user selects

//Focus on main page upon loading will guide user to Name//
name.focus();

//Job Role Section//

otherJobRole.hidden = true; //This will hide "Other Job Role" input 

//Event Listener assigned to any changes in the 'Job Role' drop-down//
userTitle.addEventListener('change', (event) => { //This Event Listener checks for any changes in the 'Job Role' dropdown
    if (event.target.value === 'other') { //This checks if the clicked value is 'other'
        otherJobRole.hidden = false; //unhides 'other job role' 
    } else { // Else, it will keep the 'other job role' hidden
        otherJobRole.hidden = true;
    }
});

//T-Shirt information section//

shirtColorSelect.disabled = true; //By default, this will disable the t-shirt color drop down menu
const shirtColorChildren = shirtColorSelect.children; //This will select children elements of color

//Function for hidden and selected t-shirt themes

function shirtManager(val, bool) {
    val.hidden = bool;
    val.selected = !bool;
}

//This event listener monitors for changes to the t-shirt design drop down menu

shirtDesign.addEventListener('change', (event) => {
    shirtColorSelect.disabled = false; //This enables t-shirt color drop down menu

    for (let i = 0; i < shirtColorChildren.length; i++) {
        let eventValue = event.target.value;
        let dataTheme = shirtColorChildren[i].getAttribute('data-theme');

        if (eventValue === dataTheme) {
            shirtManager(shirtColorChildren[i], false) //hidden to false and select to true of shirtColorChildren[i]
        } else {
            shirtManager(shirtColorChildren[i], true) //hidden to true and select to false of shirtColorChildren[i]
        }
    }
});

//Register for Activies//

//This event listener monitors for activities clicked and calculates the total cost//

activities.addEventListener('change', (event) => {
    const clicked = event.target; //Captures user selection or click of checkbox activities
    const dataCost = parseInt(event.target.getAttribute('data-cost')); //This targets the data cost attribute and converts to an integer for addition

    //If else statement for total cost//
    if (clicked.checked) {
        totalCost += dataCost; // adds dataCost with dataCost//
        activitiesCost.innerHTML = ('Total: $' + totalCost);
    } else {
        totalCost -= dataCost; //subtracts dataCost from the totalcost//
        activitiesCost.innerHTML = ('Total: $' + totalCost);
    }
});

//Payment information section//

const paymentSelectChildren = paymentSelect.children; //Selects the children of the paymentSelect var
creditCardSelected = paymentSelectChildren[1].selected = true; //Selects credit card from drop down menu
const paymentMethodsChildren = paymentMethods.children; //Selects payment info

//This function will control hidden data//

function paymentHideController(data, showVal, hideVal1, hideVal2) {
    const hideState = false;
    data[showVal].hidden = hideState;
    data[hideVal1].hidden = !hideState;
    data[hideVal2].hidden = !hideState;
}

paymentHideController(paymentMethodsChildren, 2, 3, 4); //This hides bitcoin and paypal data when the page loads

//Event listener to monitor for selected payment method type//

paymentSelect.addEventListener('change', (event) => {
    const eventValue = event.target.value; //Captures the value of payment event clicked//

    //Iterates over paymentMethodsChildren to allow only one payment method to populate at a time//

    for (let i = 0; i < paymentMethodsChildren.length; i++) {
        if (eventValue === paymentMethodsChildren[2].className) {
            paymentHideController(paymentMethodsChildren, 2, 3, 4);

        } else if (eventValue === paymentMethodsChildren[3].className) {
            paymentHideController(paymentMethodsChildren, 3, 2, 4);

        } else if (eventValue === paymentMethodsChildren, 4, 2, 3);

        //Sets if credit card is the current selected payment method//
        (!paymentMethodsChildren[2].hidden) ? creditCardSelected = true: creditCardSelected = false;
    }
});

//forms validation//

//this function decides outcomes when validation passes//

function validationPass(element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none'; //This hides the accessibility hint
}

//This function decides outcomes when validation fails//

function validationFail(element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'inline'; //displays accessbility user hint
}

//This function validates elements// //will be called when the submit button is used//

function validator(isValid, element) {
    if (isValid) {
        validationPass(element);
        validateAllFields(); //validation updated
    } else {
        validationFail(element);
        validateAllFields(); //validation updated
    }
}

//This function validates the name input value//

function nameValidator() {
    const nameValue = name.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    validator(nameIsValid, name);
    return nameIsValid; //returns name format is valid
}

//This function validates the email input value//

function emailValidator() {
    const emailValue = email.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue); //This regex is to check if the email format is valid
    const regexCheckAt = /^\w*[@]+\w*@+\w*[@.]*\w*\.[a-z]+$/i.test(emailValue); //This regex validates if there is 1 or more @ symbols
    const regexCheckDot = /^[^@]+@[^@.]+[^\.][a-z]+$/i.test(emailValue); //This regex checks for a .

//This will test conditions to see if further user hint assistance is needed//

if(regexCheckAt) {
    emailHint.textContent = "Please enter a valid email address: Email addresses may only contain 1 '@' symbol. Example: username@domain-name.com";
} else if(regexCheckDot) {
} else {
    emailHint.textContent = "Please enter a valid email address. Example: username@domain-name.com";
}
validator(emailIsValid, email);
return emailIsValid;

}

//This event listner will monitor for checkbox changes//

activitiesBox.addEventListener('change', (event) => {
    const eventTarget = event.target;
    let isChecked = eventTarget.checked;
    const selectedActivity = eventTarget.getAttribute('data-day-and-time'); //selects the data day and time inside input element//
    const scheduleData = []; //empty array declaration to hold the value of parseCheckbox as shown below

    //Verification if a checkbox has been checked or clicked//

    if (isChecked) {
        activitiesTotal++; //If checked, this will add 1 to the activitiesTotal//
    } else {
        activitiesTotal--; //If not checked, this will subtract 1 from the activitiesTotal//
    }

    for (let i = 0; i < activitiesBoxChildren.length; i++) {
        const parseCheckbox = checkboxInput[i].getAttribute('data-day-and-time');
        scheduleData.push(parseCheckbox);

        if (isChecked) {
            if (scheduleData[i] === selectedActivity) {
                activitiesBoxChildren[i].classList.add('disabled');
                eventTarget.parentElement.classList.remove('disabled');
                if (activitiesBoxChildren[i].className === 'disabled') {
                    checkboxInput[i].disabled = true; //this will disable all checkboxes that have the className 'disabled'
                }
            }
        } else {
            //If event target is not checked, this removes disabled class and reactivates the disabled button
            activitiesBoxChildren[i].classList.remove('disabled');
            checkboxInput[i].disabled = false;
        }
    }
});

//Function to validate activities//

function activitiesValidator() {
    const activitiesValid = activitiesTotal > 0;
    validator(activitiesValid, activitiesBox);
    return activitiesValid; //returns valid//
}

//Function that validates credit card number information//
function creditcardValidator() {
    const cardValue = cardNumber.value;
    const cardIsValid = /^\d{13,16}?$/.test(cardValue); //This will test for a card number between 13-16 digits
    validator(cardIsValid, cardNumber);
    return cardIsValid; //retuns as valid if criteria is met//
}

//Function that will validate zip code//
function zipCodeValidator() {
    const zipValue = zipCode.value;
    const zipIsValid = /^\d{5}$/.test(zipValue); //This will test for a zip code of the required 5 digits
    validator(zipIsValid, zipCode);
    return zipIsValid;
}

//Function that validates the CVV number//
function cvvValidator() {
    const cvvValue = cvv.value;
    const cvvIsValid = /^\d{3}$/.test(cvvValue); //This will test for the required 3 digit cvv digits//
    validator(cvvIsValid, cvv);
    return cvvIsValid;
}

//This function will validate all fields outside of the function//
function validateAllFields() {
    name.addEventListener('keyup', nameValidator);
    email.addEventListener('keyup', emailValidator);
    activities.addEventListener('change', activitiesValidator);
}

//Validation for credit card input - real time//

zipCode.addEventListener('keyup', zipCodeValidator);
cvv.addEventListener('keyup', cvvValidator);
cardNumber.addEventListener('keyup', creditcardValidator);

//Form submission and validation//

form.addEventListener('submit', (event) => {
    if (!nameValidator()) {
        console.log('Please enter a valid name.');
        event.preventDefault();
    }

    if (!emailValidator()) {
        console.log('Please enter a valid email address.');
        event.preventDefault();
    }

    if (!activitiesValidator()) {
        console.log('Please select at least one activity to proceed.');
        event.preventDefault();
    }

    if (creditCardSelected) {
        if(!creditcardValidator()) {
            console.log('Please enter a valid credit card number.');
            event.preventDefault();
        }

    if (!zipCodeValidator()) {
        console.log('Please enter a valid zip code.');
        event.preventDefault();
    }

    if (!cvvValidator ()) {
        console.log('Please enter a valid zip code.');
        event.preventDefault();
    }

    }

});

//Accessibility//

checkboxInput.forEach(checkbox => { //This will loop over the checkbox//
    const checkboxParent = checkbox.parentElement; //Selects the parent element of checkbox type//

    //Listens for focus event and adds class of focus to parent element//
    checkbox.addEventListener('focus', (event) => checkboxParent.classList.add('focus'));

    //Listens for blur event and removes class of focus from parent element//
    checkbox.addEventListener('blur', (event) => {
        const inputFocused = document.querySelector('.focus');
        if (inputFocused) {
            inputFocused.classList.remove('focus');
        }
    });


});

  











































