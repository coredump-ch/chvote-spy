console.log('1_identification.js');

/**
 * Extract voter number. Return number string or null if it seems invalid.
 */
function getVoterNumber() {
    const number = document.querySelector('#card-number').value;
    if (!!number && number.length === 16) {
        return number;
    }
    return null;
}

/**
 * This function is run when the "continue" button is clicked.
 */
function onContinue() {
    const voterNumber = getVoterNumber();
    localStorage.setItem('voterNumber', voterNumber);
}

document.body.style.borderTop = "10px solid red";
document.querySelector('#submitButton').addEventListener('click', onContinue);
