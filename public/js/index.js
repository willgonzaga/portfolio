const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    navigation.classList.toggle('is-open', expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
    }
});
document.getElementById('year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navigation.querySelectorAll('a').forEach(link => {
                    const active = link.hash === `#${entry.target.id}`;
                    link.classList.toggle('active', active);
                    if (active) link.setAttribute('aria-current', 'location');
                    else link.removeAttribute('aria-current');
                });
            }
        });
    }, { rootMargin: '-15% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

async function listProjects() {
    const container = document.getElementById('projlist');
    try {
        const response = await fetch('/api/repositories');
        if (!response.ok) throw new Error('Não foi possível carregar os projetos.');
        const repositories = await response.json();
        if (!Array.isArray(repositories) || !repositories.length) throw new Error('Nenhum projeto disponível.');
        const cards = repositories.slice(0, 6).map((repo, index) => {
            const url = new URL(repo.url);
            if (url.protocol !== 'https:' || url.hostname !== 'github.com') throw new Error('Endereço de projeto inválido.');
            const card = document.createElement('a');
            card.className = 'project-card';
            card.href = url.href;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            const top = document.createElement('div');
            top.className = 'project-top';
            top.setAttribute('aria-hidden', 'true');
            top.innerHTML = '<span>⌘</span><span>↗</span>';
            const title = document.createElement('h4');
            title.textContent = repo.name;
            const description = document.createElement('p');
            description.textContent = repo.description || 'Explore o código e os detalhes deste projeto no GitHub.';
            const meta = document.createElement('div');
            meta.className = 'project-meta';
            const language = document.createElement('span');
            language.textContent = repo.language || 'Repositório';
            const number = document.createElement('span');
            number.textContent = `PROJETO ${String(index + 1).padStart(2, '0')}`;
            meta.append(language, number);
            card.append(top, title, description, meta);
            return card;
        });
        container.replaceChildren(...cards);
    } catch {
        const message = document.createElement('p');
        message.className = 'project-message';
        message.append('Os projetos estão no GitHub. ');
        const link = document.createElement('a');
        link.href = 'https://github.com/willgonzaga?tab=repositories';
        link.textContent = 'Explorar repositórios ↗';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        message.append(link);
        container.replaceChildren(message);
    } finally {
        container.setAttribute('aria-busy', 'false');
    }
}
listProjects();
