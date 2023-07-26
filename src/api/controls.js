const axios = require('axios');
require('dotenv').config();
const username = process.env.gitUser;
const token = process.env.gitAuth;

async function getRepositories(request, response) {
    try {
        const api = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        function listRepos() {
            var data = [];
            api.data.forEach((repo) => {
                if (repo.name != username) {
                    data.push({
                        name: repo.name,
                        description: repo.description,
                        url: repo.html_url
                    })
                }
            })
            return data;
        }

        return response.status(200).json(listRepos());
    } catch (error) {
        console.error('Erro ao listar repositórios:', error.message);
        throw error;
    }
}

module.exports = {
    getRepositories
}


 /*
 getRepositories()
    .then((repositories) => {
        repositories.forEach((repo) => {
            if (repo.name != username) {
                const data = {
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url
                }
                const li = document.createElement("li");
                li.textContent = 'asd';
                projlist.appendChild(li);
                console.log(data);
            }
        });
    })
    .catch((error) => {
        console.error('Erro:', error.message);
    });
*/