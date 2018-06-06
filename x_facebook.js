console.log('x_facebook.js');

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
