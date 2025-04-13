export async function translateText (text) {
    const IAM_TOKEN = "t1.9euelZqZycnIi5CczZrNnMrGjI2ZyO3rnpWajsuLnZvIzc7Gi57Gj5bMlJDl8_d_bzRB-e8iSmpn_N3z9z8eMkH57yJKamf8zef1656VmpPOnpOVmsrNlZ6clYmNlZmM7_zF656VmpPOnpOVmsrNlZ6clYmNlZmM.yaqY1HhhuzhLOKv72HynX2TNSgZr5890EZx_TjwpBGvdILGS9rHL85u7EL30aO0h3VcRnpUb6hTx0ZW63pktAQ";
    const FOLDER_ID = "b1g3vpj0rsrqotnhvssa";
    const OATH = "y0__xDVjJitBhjB3RMg0vP8wBKRgPnxOxTKdZEYJ6S7bFqU9JQaYA";

    console.log(text);

    const wordsArray = text.split(" ").filter(word => word.trim() !== "");

    console.log(wordsArray);

    try {
        const response = await fetch("https://translate.api.cloud.yandex.net/translate/v2/translate", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${IAM_TOKEN}`
            },
            body: JSON.stringify({
                folderId: FOLDER_ID,
                texts: wordsArray,
                targetLanguageCode: "ru"
            })
        });

        if (!response.ok) {
            console.error(`Ошибка перевода: ${response.status} ${response.statusText}`);
            throw new Error(`Ошибка перевода: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        return data.translations[0].text;
    } catch (error) {
        console.error("Ошибка в запросе:", error);
        throw error;
    }
}