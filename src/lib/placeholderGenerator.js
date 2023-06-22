// placeholder generator - returns random place holder strings for text fields

const textFieldPlaceholders = [
    'At Your Command',
    'At Your Service',
    'At Your Disposal',
    'At Your Fingertips',
    'At Your Beck and Call',
    'CAPTAIN\'S LOG...',
    'I Instist...',
    'Dear Boss...',
    'Dear Diary...',
    'Dear Mom...',
    'Dear Dad...',
    'Dear Future Self...',
    'Dear Past Self...',
    'Dear Present Self...',
    'Your Wish is My Command',
    "Here to Serve",
    "Your the Boss",
    "I'm Here to Help",
    "Call your Dad",
    "[Insert Clever Title Here]",
    "Mix Tape Track List",
    "Your Favorite Song Lyrics",
    "Your Favorite Poem",
    "Your Favorite Quote",
    "What's on Your Mind?",
]

const textAreaPlaceholders = [
    'Your Literary Masterpiece',
    'Your Life Story',
    'Your Memoirs',
    'Today\'s Rant',
    'Your Manifesto',
    'Your Magnum Opus',
    'Your Confession...',
    '[Insert Secrets Here]',
    "That One Thing You Always Forget",
    'Make this one Spicy!',
    'Make this one Juicy!',
    'Make this one Salty!',
    'Make this one Sweet!',
    'What I learned in Boating School is...',
    "Your plain old boring note",
    "Tell me your secrets",
    "Tell me your dreams",
    "Tell me your fears",
    "Tell me your hopes",
    "Tell me your wishes",
    "Give me the crabby patty secret formula",
    "Your and important and have value",
    "Today I learned...",
    "Today I did...",
    "Today I saw...",
    "Call Your Mom",
    "Passage 69:420 of the Book of Billy states...",
    "I'm a little teapot short and stout...",
    "It's Your World, I'm Just Living in It",
    "Veni, Vidi, Vici",
    "To Be or Not to Be",
    "I Think, Therefore I Am",
    "Life is a Highway",
    "e=mc^2",
    "You Can't Handle the Truth",
    "The Words Mason, What Do They Mean?",
    "I'm am the Captain Now",
]

/**
 * 
 * @param {string} fieldType - defaults to 'text', enum: ['text', 'textarea']
 * @returns string - random placeholder string
 */
export default function randomPlaceholder (fieldType='text') {

    let len = null
    let collection = null

    if (fieldType === 'text') {
        len = textFieldPlaceholders.length
        collection = textFieldPlaceholders
    } else {
        len = textAreaPlaceholders.length
        collection = textAreaPlaceholders
    }

    const randomIndex = Math.floor(Math.random() * len)

    return collection[randomIndex];

}