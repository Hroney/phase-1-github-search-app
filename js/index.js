function fetchData(userName) {
    fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(res => res.json())
        .then(data => {
            const divEl = document.querySelector('#user-list');
            while (divEl.firstChild) {
                divEl.removeChild(divEl.firstChild)
            }

            for (individual in data.items) {
                buildUser(data.items[individual]);
                console.log(data.items[individual])
            }
        })
}
function fetchRepo(url) {
    fetch(`${url}`)
        .then(res => res.json())
        .then(data => {
            const repoDivEl = document.querySelector('#repos-list');
            while (repoDivEl.firstChild) {
                repoDivEl.removeChild(repoDivEl.firstChild)
            }
            const repoUserCard = document.createElement('div');
            const h1El = document.createElement('h1');
            h1El.innerText = "Repository information";
            h1El.style.textAlign = 'center';
            repoUserCard.append(h1El);
            for (individual in data) {
                const pEl = document.createElement('p');
                pEl.innerText = `Name: ${data[individual].name}\n` +
                    `Language: ${data[individual].language}\n` +
                    `Last Update: ${data[individual].updated_at}`;
                pEl.style.textAlign = 'center';
                repoUserCard.append(pEl);
                repoDivEl.append(repoUserCard);
            }
        })
}

function buildUser(userObj) {
    const divEl = document.querySelector('#user-list');
    const userCard = document.createElement('div');
    userCard.style.border = 'solid';
    userCard.style.marginBottom = '5px';

    //user name
    const h2El = document.createElement('h2');
    h2El.innerText = userObj.login;
    //Link to profile
    const pEl = document.createElement('p');
    pEl.innerText = userObj.url;
    //user image
    const imgEl = document.createElement('img');
    imgEl.src = userObj.avatar_url;

    //user name styles
    h2El.style.cursor = 'pointer';
    h2El.style.textAlign = `center`;
    //link styles
    pEl.style.textAlign = 'center';
    pEl.style.display = 'none';
    pEl.style.cursor = 'pointer';
    pEl.style.color = 'blue';
    //user image styles
    imgEl.style.display = 'none';
    imgEl.style.width = '30%';
    imgEl.style.marginLeft = 'auto';
    imgEl.style.marginRight = 'auto';
    imgEl.style.marginBottom = '5px';

    //event listeners
    pEl.addEventListener('click', () => {
        window.open(`${userObj.html_url}`, '_blank');
    })

    h2El.addEventListener("click", () => {
        if (imgEl.style.display === `block`) {
            imgEl.style.display = 'none';
            pEl.style.display = 'none';
        } else {
            imgEl.style.display = 'block';
            pEl.style.display = '';

            //Grabs the repository information for the one whose name is clicked
            const repoURL = userObj.url + '/repos';
            fetchRepo(repoURL)
        }
    })

    //append all data
    userCard.append(imgEl, h2El, pEl)
    divEl.append(userCard)
}

function formingData() {
    const formEl = document.querySelector("form#github-form");
    formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(formEl));
        formEl.reset();
        fetchData(formData.search);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    // fetchData();
    formingData();
})