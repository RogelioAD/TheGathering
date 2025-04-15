import HolyBible from "the-holy-bible-api";

export async function getRandomVerse() {
    const myBible = new HolyBible();
    try {
        const verse = await myBible.fetchRandomVerse({});
        
        // Log the fetched verse to inspect its structure
        console.log("Fetched verse from API:", verse);
        
        // Assuming the verse data contains reference and text, make sure it looks like:
        // { reference: "John 3:16", text: "For God so loved the world..." }
        return verse;
    } catch (error) {
        console.error("Error fetching verse:", error);
        throw error;
    }
}

