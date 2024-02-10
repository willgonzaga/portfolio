const axios = require('axios');
require('dotenv').config();
const username = process.env.gitUser;
const token = process.env.gitAuth;

async function getRepositories(request, response) {
    try {
        const api = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        });
        function listRepos() {
            var data = [];
            api.data.forEach((repo) => {
                if (repo.name != username) {
                    data.push({
                        name: repo.name,
                        url: repo.html_url
                    })
                }
            })
            return data;
        }

        return response.status(200).json(listRepos());
    } catch (error) {
        console.error('Erro ao listar repositórios:', error.message);
        return response.status(401).json('Error: ' + error.message);
    }
}

module.exports = {
    getRepositories
};