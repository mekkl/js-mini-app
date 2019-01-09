const URL= "https://mekkl.dk/node/api";

function handleHttpErrors(res) {
    if (!res.ok) {
        throw { message: res.statusText, status: res.status };
    }
    return res.json();
}

async function post(b, suburl) {
    const options = makeFetchOptions("POST", b);
    let res = await fetch(URL + suburl, options).then(handleHttpErrors);
    return res;
}


function makeFetchOptions(type, b) {
    let headers = {
        'Origin': '',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    return {
        method: type,
        headers,
        body: JSON.stringify(b)
    }
}

module.exports = { post, URL }