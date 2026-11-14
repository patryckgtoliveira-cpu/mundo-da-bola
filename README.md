# Mundo da Bola

Site editorial sobre futebol, construído com HTML, CSS, JavaScript e componentes do Bootstrap 5.

## Páginas

- `index.html` — apresentação e atalhos para o conteúdo
- `historia.html` — origens e marcos do futebol
- `times.html` — clubes brasileiros
- `jogadores.html` — galeria de craques
- `copas.html` — sedes e campeões
- `videos.html` — vídeo incorporado da Copa de 1958
- `audios.html` — reprodução local do Hino Nacional Brasileiro
- `noticias.html` — destaques do site
- `palpites.html` — palpites salvos no navegador
- `contato.html` — formulário demonstrativo de contato

## Recursos locais

- `css/style.css` — identidade visual, componentes e regras responsivas
- `js/script.js` — interações do site
- `audio/hino.mp3` — gravação coral do hino, em domínio público

O formulário de contato não envia dados a um servidor. Os palpites ficam salvos no `localStorage` do navegador. O vídeo incorporado requer conexão com a internet.

## Executar localmente

Na pasta do projeto, inicie um servidor estático:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000` no navegador.
Também é possível iniciar o servidor com `npm start`.
