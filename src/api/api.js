const url = 'http://contract-generator/word.php';

export const createDocument = async (data) => {
    const formData = new FormData();

    for (let key in data) {
        const value = data[key].value;
        if (value) {
            formData.append(key, data[key].value);
        }
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
