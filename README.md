# CHVote Spy

This is a proof-of-concept Firefox extension that will collect, deanonymize and
could then potentially exfiltrate the votes of a voter.

This directly contradicts a statement in the
[SG E-Voting FAQ](https://doc.evote-ch.ch/sg/faq/de/):

> 4.1 Ist das Stimmgeheimnis mit E-Voting gewährleistet? 
>
> Ja, das Stimmgeheimnis ist mit E-Voting gewährleistet. Die Stimmen sind bei 
> Stimmabgabe durch das E-Voting-System von den personenbezogenen Daten getrennt. 
> Die abgegebenen Stimmen werden in der elektronischen Urne anonym gespeichert. 

Note: The extension currently does *not* send any data to any third party.
It is only a proof of concept to show what would be possible by extensions
with access to content.

## Installing (Signed)

You can find a signed version of the extension at https://tmp.dbrgn.ch/chvote_spy-0.2-an+fx.xpi.

## Installing (Dev)

Open "about:debugging" in Firefox, click "Load Temporary Add-on" and select any
file in this extension's directory.

The extension will now be installed, and will stay until you restart Firefox.

## Demo / Steps to reproduce

At any time, you can tell that the extension is active on the current page by
observing the red bar at the top of the page.

1. Load extension as explained above
2. Open and browse Facebook
3. Open anonymous Firefox window
4. Go to https://www.evote-ch.ch/sg
5. Open the debug console with F12
6. Do steps 1, 2 and 3
7. On step 4 ("Stimmabgabe"), after having entered the birthdate, take a look at the debug console.

Demo video: https://www.youtube.com/watch?v=ZQsT1dONQoc

## How it works

Firefox extensions have the permission to access the full page content. Thus,
an extension with access to all visited websites can access the votes that the
user has cast.

Additionally, extensions can store data across websites. This is used to store
personal information from Facebook, so that it can be correlated with the cast
vote. It makes it possible to de-anonymize the voter.

## Mitigation

The browser is inherently an unsafe environment. It loads remote code and
executes it. It would be better if the e-voting client would run in a trusted
container, like a standalone application binary. However, even then the danger
of infected end-user devices persists.
