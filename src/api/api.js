const url = 'http://contract-generator/word.php';

export const createDocument = async (data) => {
    const formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
        formData.append(key, value);
    }

    try {
        const request = await fetch(url, {
            method: 'post',
            mode: 'no-cors',
            body: formData,
        });

        return await request.text();
    } catch (e) {
        console.log(e);
        return false;
    }
};
