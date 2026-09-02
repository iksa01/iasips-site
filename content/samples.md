---
title: "Boxes and quotes"
sub: "Working page, 2026-09-03. Colour sets for the callout boxes and four ways to set a quotation, in the real column. Pick by letter and I fold the winner into the design and delete this page."
layout: layouts/page.njk
permalink: /samples/
bodyClass: samples-page
eleventyExcludeFromCollections: true
---
<style>
/* Working page only. Everything below is thrown away with the page. */
.samples-page .set { margin: 0 0 44px 0; }
.samples-page .set h3 { margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
.samples-page .set h3 span { margin-left: 8px; font-size: 12px; letter-spacing: 0; text-transform: none; font-style: italic; color: #6c6c6c; }
.samples-page .set p.why { font-size: 13px; line-height: 19px; color: #666; margin: 0 0 12px 0; }
body.samples-page div#content-pri .entry > p::before { content: none; }
body.samples-page div#content-pri .entry > p { text-align: left; }
/* A. Palette only — every ink already on the page */
body.samples-page div#content-pri .a .callout-note { border-left-color: #6c6c6c; background: #FBFAF9; } body.samples-page div#content-pri .a .callout-note .callout-title { color: #6c6c6c; }
body.samples-page div#content-pri .a .callout-tip { border-left-color: #d0656a; background: #FDFAFA; } body.samples-page div#content-pri .a .callout-tip .callout-title { color: #d0656a; }
body.samples-page div#content-pri .a .callout-key { border-left-color: #d24b21; background: #FDFAF7; } body.samples-page div#content-pri .a .callout-key .callout-title { color: #d24b21; }
body.samples-page div#content-pri .a .callout-warning { border-left-color: #ba1820; background: #FDFAFA; } body.samples-page div#content-pri .a .callout-warning .callout-title { color: #ba1820; }
/* B. Warm inks — sepia, burgundy, grey, red */
body.samples-page div#content-pri .b .callout-note { border-left-color: #6c6c6c; background: #FBFAF9; } body.samples-page div#content-pri .b .callout-note .callout-title { color: #6c6c6c; }
body.samples-page div#content-pri .b .callout-tip { border-left-color: #7a5a3a; background: #FCFAF7; } body.samples-page div#content-pri .b .callout-tip .callout-title { color: #7a5a3a; }
body.samples-page div#content-pri .b .callout-key { border-left-color: #7a1f2b; background: #FDFAFA; } body.samples-page div#content-pri .b .callout-key .callout-title { color: #7a1f2b; }
body.samples-page div#content-pri .b .callout-warning { border-left-color: #ba1820; background: #FDFAFA; } body.samples-page div#content-pri .b .callout-warning .callout-title { color: #ba1820; }
/* C. One ink — no tints, the rule carries the weight, red only for the warning */
body.samples-page div#content-pri .c .callout { background: transparent; box-shadow: none; }
body.samples-page div#content-pri .c .callout-note { border-left: 1px dashed #CCC; } body.samples-page div#content-pri .c .callout-note .callout-title { color: #6c6c6c; }
body.samples-page div#content-pri .c .callout-tip { border-left: 3px solid #CCC; } body.samples-page div#content-pri .c .callout-tip .callout-title { color: #333; }
body.samples-page div#content-pri .c .callout-key { border-left: 3px solid #333; } body.samples-page div#content-pri .c .callout-key .callout-title { color: #333; }
body.samples-page div#content-pri .c .callout-warning { border-left: 3px solid #ba1820; } body.samples-page div#content-pri .c .callout-warning .callout-title { color: #ba1820; }
/* D. Red in three weights — one hue, graded */
body.samples-page div#content-pri .d .callout-note { border-left-color: #CCC; background: #FBFAF9; } body.samples-page div#content-pri .d .callout-note .callout-title { color: #6c6c6c; }
body.samples-page div#content-pri .d .callout-tip { border-left-color: #e3b3b5; background: #FDFAFA; } body.samples-page div#content-pri .d .callout-tip .callout-title { color: #b95c60; }
body.samples-page div#content-pri .d .callout-key { border-left-color: #d0656a; background: #FDF8F8; } body.samples-page div#content-pri .d .callout-key .callout-title { color: #ba1820; }
body.samples-page div#content-pri .d .callout-warning { border-left-color: #ba1820; background: #FDF6F6; } body.samples-page div#content-pri .d .callout-warning .callout-title { color: #ba1820; }
/* Quotes */
body.samples-page div#content-pri blockquote.q1 { margin: 0 0 15px 0; padding: 0 0 0 15px; border-left: 3px solid #EEE; }
body.samples-page div#content-pri blockquote.q1 p { font-size: 16px; line-height: 150%; color: #666; margin: 0 0 7px 0; }
body.samples-page div#content-pri blockquote.q1 cite { display: block; margin: 0; padding: 7px 0 0 0; font-size: 12px; color: #666; }
body.samples-page div#content-pri blockquote.q2 { position: relative; margin: 6px 0 20px 0; padding: 4px 0 0 40px; border: 0; }
body.samples-page div#content-pri blockquote.q2::before { content: "\201C"; position: absolute; left: 0; top: -4px; font-size: 64px; line-height: 1; color: #d0656a; }
body.samples-page div#content-pri blockquote.q2 p { font-size: 17px; line-height: 26px; font-style: italic; color: #333; margin: 0 0 6px 0; }
body.samples-page div#content-pri blockquote.q2 cite { display: block; font-size: 12px; font-style: normal; text-transform: uppercase; letter-spacing: 1px; color: #6c6c6c; }
body.samples-page div#content-pri blockquote.q2 cite::before { content: "\2014\00a0"; }
body.samples-page div#content-pri blockquote.q3 { margin: 6px 0 20px 0; padding: 14px 24px; border: 0; border-top: 1px dashed #CCC; border-bottom: 1px dashed #DDD; text-align: center; }
body.samples-page div#content-pri blockquote.q3 p { font-size: 17px; line-height: 26px; font-style: italic; color: #333; margin: 0 0 6px 0; }
body.samples-page div#content-pri blockquote.q3 cite { display: block; font-size: 12px; font-style: normal; text-transform: uppercase; letter-spacing: 1px; color: #6c6c6c; }
body.samples-page div#content-pri blockquote.q3 cite::before { content: "\2014\00a0"; }
body.samples-page div#content-pri blockquote.q4 { margin: 6px 0 20px 0; padding: 4px 0 4px 15px; border: 0; border-left: 3px solid #ba1820; }
body.samples-page div#content-pri blockquote.q4 p { font-size: 20px; line-height: 28px; color: #333; margin: 0 0 8px 0; }
body.samples-page div#content-pri blockquote.q4 cite { display: block; font-size: 12px; font-style: normal; text-transform: uppercase; letter-spacing: 1px; color: #333; }
body.samples-page div#content-pri blockquote.q4 cite::before { content: "\2014\00a0"; }
body.samples-page div#content-pri blockquote.q5 { margin: 6px 0 20px 0; padding: 12px 15px 10px 15px; border: 1px solid #DDD; border-left: 3px solid #CCC; background: #FDFBFA; box-shadow: 1px 1px 7px rgba(153,153,153,.2); }
body.samples-page div#content-pri blockquote.q5 p { font-size: 15px; line-height: 24px; color: #333; margin: 0 0 6px 0; }
body.samples-page div#content-pri blockquote.q5 cite { display: block; font-size: 11px; font-style: italic; color: #6c6c6c; }
</style>

## The boxes

The four hues from 30 August are slate, moss, ochre and red. You said the moss and ochre sit oddly on a cream-and-red page. Here are four other sets. The text is the same in every set, so only the colour changes.

<div class="set a">
<h3>Set A <span>palette only: every ink is already on the page</span></h3>
<p class="why">Grey for context; the visited-link rose for method; the orange-red of the external straps for the thing to remember; the house red for the warning. Nothing new enters the palette.</p>
<aside class="callout callout-note"><p class="callout-title">Where this sits in the syllabus</p><p>GS Paper II — Indian Constitution: historical underpinnings, evolution, features, amendments, significant provisions and basic structure.</p></aside>
<aside class="callout callout-tip"><p class="callout-title">How to deploy this in an answer</p><p>Do not narrate the cases in order. Take a position in the first two lines, then use two or three cases as evidence for it.</p></aside>
<aside class="callout callout-key"><p class="callout-title">Hold these four in memory</p><p>Supremacy of the Constitution · republican and democratic form of government · secular character · separation of powers.</p></aside>
<aside class="callout callout-warning"><p class="callout-title">The mistake that costs marks</p><p>Do not write that the doctrine makes fundamental rights unamendable. Rights can be amended; what cannot be done is to damage the essential features.</p></aside>
</div>

<div class="set b">
<h3>Set B <span>warm inks: sepia, burgundy, grey, red</span></h3>
<p class="why">The colours of old printed matter — brown ink for method, a darker wine for the thing to remember. Warm like the paper, and clearly distinct from the link red.</p>
<aside class="callout callout-note"><p class="callout-title">Where this sits in the syllabus</p><p>GS Paper II — Indian Constitution: historical underpinnings, evolution, features, amendments, significant provisions and basic structure.</p></aside>
<aside class="callout callout-tip"><p class="callout-title">How to deploy this in an answer</p><p>Do not narrate the cases in order. Take a position in the first two lines, then use two or three cases as evidence for it.</p></aside>
<aside class="callout callout-key"><p class="callout-title">Hold these four in memory</p><p>Supremacy of the Constitution · republican and democratic form of government · secular character · separation of powers.</p></aside>
<aside class="callout callout-warning"><p class="callout-title">The mistake that costs marks</p><p>Do not write that the doctrine makes fundamental rights unamendable. Rights can be amended; what cannot be done is to damage the essential features.</p></aside>
</div>

<div class="set c">
<h3>Set C <span>one ink: no tints, no shadow, the rule does the work</span></h3>
<p class="why">Closest to Colly himself, who never tinted a box. A dashed hairline for context, a grey rule for method, a black rule for the thing to remember, red for the warning.</p>
<aside class="callout callout-note"><p class="callout-title">Where this sits in the syllabus</p><p>GS Paper II — Indian Constitution: historical underpinnings, evolution, features, amendments, significant provisions and basic structure.</p></aside>
<aside class="callout callout-tip"><p class="callout-title">How to deploy this in an answer</p><p>Do not narrate the cases in order. Take a position in the first two lines, then use two or three cases as evidence for it.</p></aside>
<aside class="callout callout-key"><p class="callout-title">Hold these four in memory</p><p>Supremacy of the Constitution · republican and democratic form of government · secular character · separation of powers.</p></aside>
<aside class="callout callout-warning"><p class="callout-title">The mistake that costs marks</p><p>Do not write that the doctrine makes fundamental rights unamendable. Rights can be amended; what cannot be done is to damage the essential features.</p></aside>
</div>

<div class="set d">
<h3>Set D <span>one hue in four weights</span></h3>
<p class="why">Grey, pale rose, rose, red: the same red getting stronger as the box gets more important. The eye reads urgency without learning a colour code.</p>
<aside class="callout callout-note"><p class="callout-title">Where this sits in the syllabus</p><p>GS Paper II — Indian Constitution: historical underpinnings, evolution, features, amendments, significant provisions and basic structure.</p></aside>
<aside class="callout callout-tip"><p class="callout-title">How to deploy this in an answer</p><p>Do not narrate the cases in order. Take a position in the first two lines, then use two or three cases as evidence for it.</p></aside>
<aside class="callout callout-key"><p class="callout-title">Hold these four in memory</p><p>Supremacy of the Constitution · republican and democratic form of government · secular character · separation of powers.</p></aside>
<aside class="callout callout-warning"><p class="callout-title">The mistake that costs marks</p><p>Do not write that the doctrine makes fundamental rights unamendable. Rights can be amended; what cannot be done is to damage the essential features.</p></aside>
</div>

## The quotation

The Ambedkar line, set five ways. Quote 1 is what the essay has now, which is Colly's own blockquote.

<div class="set">
<h3>Quote 1 <span>Colly's: pale rule, grey text (as now)</span></h3>
<blockquote class="q1"><p>However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. However bad a Constitution may be, if those implementing it are good, it will prove to be good.</p><cite>B. R. Ambedkar, Constituent Assembly, 25 November 1949</cite></blockquote>
</div>

<div class="set">
<h3>Quote 2 <span>hanging quotation mark, italic, name in spaced caps</span></h3>
<blockquote class="q2"><p>However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. However bad a Constitution may be, if those implementing it are good, it will prove to be good.</p><cite>B. R. Ambedkar, Constituent Assembly, 25 November 1949</cite></blockquote>
</div>

<div class="set">
<h3>Quote 3 <span>epigraph: centred between hairlines</span></h3>
<blockquote class="q3"><p>However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. However bad a Constitution may be, if those implementing it are good, it will prove to be good.</p><cite>B. R. Ambedkar, Constituent Assembly, 25 November 1949</cite></blockquote>
</div>

<div class="set">
<h3>Quote 4 <span>the journal's quote-entry panel, at reading size</span></h3>
<blockquote class="q4"><p>However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. However bad a Constitution may be, if those implementing it are good, it will prove to be good.</p><cite>B. R. Ambedkar, Constituent Assembly, 25 November 1949</cite></blockquote>
</div>

<div class="set">
<h3>Quote 5 <span>a card, like the boxes</span></h3>
<blockquote class="q5"><p>However good a Constitution may be, if those who are implementing it are not good, it will prove to be bad. However bad a Constitution may be, if those implementing it are good, it will prove to be good.</p><cite>B. R. Ambedkar, Constituent Assembly, 25 November 1949</cite></blockquote>
</div>
