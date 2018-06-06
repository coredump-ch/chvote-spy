# CHVote Spy

This is a proof-of-concept Firefox extension that will collect, deanonymize and
exfiltrate the votes of a voter.

This directly contradicts an [FAQ entry](https://doc.evote-ch.ch/sg/faq/de/):

> 4.1 Ist das Stimmgeheimnis mit E-Voting gewährleistet? 
>
> Ja, das Stimmgeheimnis ist mit E-Voting gewährleistet. Die Stimmen sind bei 
> Stimmabgabe durch das E-Voting-System von den personenbezogenen Daten getrennt. 
> Die abgegebenen Stimmen werden in der elektronischen Urne anonym gespeichert. 

## Installing

Open "about:debugging" in Firefox, click "Load Temporary Add-on" and select any
file in this extension's directory.

The extension will now be installed, and will stay until you restart Firefox.

## Demo

At any time, you can tell that the extension is active on the current page by
observing the red bar at the top of the page.

1. Install and activate extension
2. Open and browse Facebook
3. Open anonymous Firefox window
4. Go to https://www.evote-ch.ch/sg
5. Open the debug console with F12
6. Do steps 1, 2 and 3
7. On step 4 ("Stimmabgabe"), after having entered the birthdate, take a look at the debug console.

TODO: Screenshot / Video
