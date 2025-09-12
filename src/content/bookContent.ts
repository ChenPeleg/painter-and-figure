import {CustomContent} from '../models/customContent.ts';

export type BookContent = {
    pageNumber?: number; hebrewText: string[]; englishText: string[]; image?: string; customType: CustomContent[]
}
export const bookContent: BookContent[] = [{
    pageNumber: 1,
    hebrewText: [`הצייר והדמות`, `סיפר ואייר: אפיק פלג`],
    englishText: [`The Painter and the Figure`, `Story and Illustrations by: Afik Peleg`],
    customType: []
}, {
    pageNumber: 2,
    hebrewText: [`בבית בינוני ולא נקי גר צייר שאהב לצייר.`, ``,],
    englishText: [`In a medium-sized and not very clean house lived a painter who loved to paint.`, ``,],
    customType: []
}, {
    pageNumber: 3,
    hebrewText: [`הוא צייר עץ, ועוד מעט הוא יתחיל לצייר את השמיים. הוא טבל את המכחול בצבע הכחול שעל הפלטה,
והתחיל לצייר את השמיים.`],
    englishText: [`He painted a tree, and so
        customType: []on he would start painting the sky. He dipped the brush in the blue paint on the palette,
and began to paint the sky.`],
    customType: []
}, {
    pageNumber: 4,
    hebrewText: [`בשמיים הוא צייר את השמש, וצייר ציפורים.`,],
    englishText: [`In the sky he painted the sun, and painted birds.`,],
    customType: []
},

    {
        pageNumber: 5,
        hebrewText: [`
הוא צייר את עצמו ליד העץ.
`,],
        englishText: [`
He painted himself next to the tree.
`,],
        customType: []
    }, {
        pageNumber: 6,
        hebrewText: [`לפתע, הדמות מהציור יצאה — והצייר דיבר עם עצמו, עם הדמות.
הצייר אמר: "שלום, מי אתה?"
הדמות ענתה: "אני אתה."
הוא לא באמת הבין איך זה קרה שיש שתיים ממנו, אז הוא אמר: "מה?!"
הוא לא ידע איך ייתכן שיש שני ציירים.`, `"אני לא מאמין שאתה אני!"
הדמות ענתה: "אבל ככה זה יצא. אי אפשר לשנות את זה, כי כבר יצאתי מהציור."`,],
        englishText: [`Suddenly, the figure from the painting came out — and the painter spoke with himself, with the figure.
The painter said: "Hello, who are you?"
The figure answered: "I am you."
He didn't really understand how it happened that there were two of him, so he said: "What?!"
He didn't know how it was possible that there were two painters.`, `"I can't believe you are me!"
The figure answered: "But that's how it turned out. You can't change it, because I already came out of the painting."`,],
        customType: []
    }, {
        pageNumber: 7,
        hebrewText: [`הדמות הלכה והגיעה לגן חיות מפחיד.
שם היא פגשה אריה שרצה לטרוף אותה — ולא הצליח.
`],
        englishText: [`The figure walked and reached a scary zoo.
There she met a lion who wanted to prey on her — and didn't succeed.
`],
        customType: []
    }, {
        pageNumber: 8,
        hebrewText: [`הדמות ברחה לגן שעשועים, ושם היה לה כיף. היא שיחקה, והיה שם נקי — כמו בגן משחקים בכרמיאל, ולא כמו בגן משחקים בתל אביב.`],
        englishText: [`The figure escaped to an amusement park, and there she had fun. She played, and it was clean there — like in a playground in Carmiel, and not like in a playground in Tel Aviv.
`],
        customType: []
    }, {
        pageNumber: 9,
        hebrewText: [`הצייר התגעגע לדמות. הוא רצה שהיא תחזור.
הוא חיפש אותה, והלך לגן החיות המפחיד.
הפיל רצה להשפריץ עליו מים — אז הוא ברח.
אבל לא לגן השעשועים, אלא למקום אחר.
`],
        englishText: [`The painter missed the figure. He wanted her to come back.
He looked for her, and went to the scary zoo.
The elephant wanted to spray water on him — so he ran away.
But not to the amusement park, but to another place.
`],
        customType: []
    }, {
        pageNumber: 10,
        hebrewText: [`הצייר הלך לחווה, שם ראה תרנגולת גדולה שרצתה לנשוך בו,
כאילו שהוא האוכל שלה — אז הוא ברח שוב.
`],
        englishText: [`The painter went to a farm, where he saw a big chicken that wanted to bite him,
as if he was her food — so he ran away again.
`],
        customType: []
    }, {
        pageNumber: 11,
        hebrewText: [`הוא התקדם קדימה, ורק ראה חלק קטן של המגלשה.
אבל לא היה לו כוח להגיע לשם, כי זה היה ממש רחוק.
אז הוא עלה לאוטובוס, כדי לנסוע אל המגלשה.
`,

        ],
        englishText: [`He moved forward, and only saw a small part of the slide.
But he didn't have the strength to get there, because it was really far.
So he got on a bus, to travel to the slide.
`,

        ],
        customType: []
    }, {
        pageNumber: 12,
        hebrewText: [`כשהגיעו — הוא הגיע לגן השעשועים. ושם מצא את הדמות.
הצייר שאל אותה אם היא רוצה לחזור לציור שלו — למקום שבו הם היו בהתחלה.
הדמות אמרה שהיא רוצה.
זה היה רחוק, אז הם נכנסו למכונית ונסעו.
`],
        englishText: [`When they arrived — he reached the amusement park. And there he found the figure.
The painter asked her if she wanted to return to his painting — to the place where they were in the beginning.
The figure said she wanted to.
It was far, so they got into a car and drove.
`],
        customType: []
    }, {
        pageNumber: 13,
        hebrewText: [`כשהגיעו, הם ירדו מהאוטו, וישבו שניהם מתחת לעץ. `, `פתאום הם שמעו בומים.
הם הסתובבו — אבל זה היה פשוט חיה עם צעדים גדולים.
אז הם לא פחדו, והתעלמו מזה, כי הם ידעו מה זה.
הצייר והדמות נשארו ביחד — והם היו שמחים.
`,],
        englishText: [` When they arrived, they got out of the car, and both sat under the tree. `, `Suddenly they heard booms.
They turned around — but it was just an animal with big steps.
So they weren't scared, and ignored it, because they knew what it was.
The painter and the figure stayed together — and they were happy.
`,],
        customType: []
    }, {
        pageNumber: 14,
        hebrewText: [`אפיק פלג בן חמש, אוהב מגדלים, אוריגמי, לכתוב ולקרוא, להתנדנד על החבל. `, `זהו ספרו הראשון של המספר והיוצר הצעיר.
`],
        englishText: [`Afik Peleg, five years old, loves towers, origami, writing and reading, swinging on the rope. `, `This is the first book by the young storyteller and creator.
`],
        customType: [CustomContent.AboutTheAuthor]
    }]
