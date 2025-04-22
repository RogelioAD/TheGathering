import HolyBible from "the-holy-bible-api";

export async function getRandomVerse() {
    const myBible = new HolyBible();
    try {
        const verse = await myBible.fetchRandomVerse({});
        
        console.log("Fetched verse from API:", verse);
        
        return verse;
    } catch (error) {
        console.error("Error fetching verse:", error);
        throw error;
    }
}

