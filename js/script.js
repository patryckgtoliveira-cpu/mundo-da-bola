const STORAGE_KEY = "palpites";

function setStatus(element, message, isError) {
  if (!element) return;

  element.textContent = message;
  element.classList.toggle("is-error", Boolean(isError));
}

function setupGreetingAndGoalButton() {
  const greeting = document.getElementById("saudacao");
  const goalButton = document.getElementById("btn-gol");
  const score = document.getElementById("placar");

  if (greeting) {
    const hour = new Date().getHours();
    greeting.textContent =
      hour < 12 ? "Bom dia, torcedor." : hour < 18 ? "Boa tarde, torcedor." : "Boa noite, torcedor.";
  }

  if (!goalButton || !score) return;

  let goals = 0;
  goalButton.addEventListener("click", () => {
    goals += 1;
    score.textContent = String(goals);
  });
}

function setupReadMoreButton() {
  const button = document.getElementById("btn-ler-mais");
  const extraText = document.getElementById("texto-extra");

  if (!button || !extraText) return;

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") !== "true";
    extraText.classList.toggle("oculto", !isExpanded);
    button.setAttribute("aria-expanded", String(isExpanded));
    button.textContent = isExpanded ? "Ler menos" : "Ler mais";
  });
}

function readPicks(statusElement) {
  try {
    const savedPicks = localStorage.getItem(STORAGE_KEY);
    if (!savedPicks) return [];

    const parsedPicks = JSON.parse(savedPicks);
    if (!Array.isArray(parsedPicks) || !parsedPicks.every((pick) => typeof pick === "string")) {
      throw new TypeError("Os palpites salvos têm um formato inválido.");
    }

    return parsedPicks;
  } catch (error) {
    console.error("Não foi possível carregar os palpites salvos.", error);
    setStatus(statusElement, "Não foi possível carregar os palpites salvos neste navegador.", true);
    return [];
  }
}

function savePicks(picks, statusElement) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
    return true;
  } catch (error) {
    console.error("Não foi possível salvar os palpites.", error);
    setStatus(statusElement, "Não foi possível salvar. Verifique as permissões de armazenamento do navegador.", true);
    return false;
  }
}

function clearSavedPicks(statusElement) {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Não foi possível apagar os palpites.", error);
    setStatus(statusElement, "Não foi possível apagar os palpites salvos neste navegador.", true);
    return false;
  }
}

function setupPicksForm() {
  const form = document.getElementById("form-palpite");
  const list = document.getElementById("lista-palpites");
  const emptyMessage = document.getElementById("palpites-vazio");
  const statusElement = document.getElementById("palpite-status");
  const clearButton = document.getElementById("btn-limpar");

  if (!form || !list || !emptyMessage || !clearButton) return;

  let picks = readPicks(statusElement);

  function renderPicks() {
    const items = document.createDocumentFragment();

    for (const pick of picks) {
      const item = document.createElement("li");
      item.className = "list-group-item";
      item.textContent = pick;
      items.appendChild(item);
    }

    list.replaceChildren(items);
    emptyMessage.hidden = picks.length > 0;
    clearButton.disabled = picks.length === 0;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const homeTeam = String(formData.get("timeA"));
    const awayTeam = String(formData.get("timeB"));

    if (homeTeam === awayTeam) {
      setStatus(statusElement, "Escolha dois times diferentes.", true);
      document.getElementById("timeA").focus();
      return;
    }

    const homeGoals = String(formData.get("golsA"));
    const awayGoals = String(formData.get("golsB"));
    const nextPicks = [...picks, `${homeTeam} ${homeGoals} x ${awayGoals} ${awayTeam}`];

    if (!savePicks(nextPicks, statusElement)) return;

    picks = nextPicks;
    setStatus(statusElement, "Palpite salvo neste navegador.", false);
    renderPicks();
    form.reset();
  });

  clearButton.addEventListener("click", () => {
    if (!clearSavedPicks(statusElement)) return;

    picks = [];
    setStatus(statusElement, "Todos os palpites foram apagados.", false);
    renderPicks();
  });

  renderPicks();
}

function setupContactForm() {
  const form = document.getElementById("form-contato");
  const statusElement = document.getElementById("contato-status");

  if (!form || !statusElement) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const name = new FormData(form).get("nome");
    setStatus(
      statusElement,
      `Obrigado, ${name}. Os dados foram validados, mas este site demonstrativo não envia mensagens.`,
      false
    );
    form.reset();
  });
}

setupGreetingAndGoalButton();
setupReadMoreButton();
setupPicksForm();
setupContactForm();
