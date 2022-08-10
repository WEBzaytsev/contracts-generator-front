const url = 'https://d.ondev.in/word.php';

export const createDocument = async (data) => {
    const formData = new FormData();

    formData.append('contract', JSON.stringify(data));

    try {
        const request = await fetch(url, {
            method: 'post',
            mode: 'no-cors',
            body: formData,
        });

        return await request.json();
    } catch (e) {
        console.log(e);
        return false;
    }
};
