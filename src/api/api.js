// const url = 'http://contract/api/index.php';
const url = new URL(window.location.href);
url.pathname = '/api/index.php';

export const createDocument = async (data) => {
    const formData = new FormData();

    formData.append('contract', JSON.stringify(data));

    try {
        const request = await fetch(url, {
            method: 'post',
            body: formData,
        });

        return await request.json();
    } catch (e) {
        console.log(e);
        return false;
    }
};
