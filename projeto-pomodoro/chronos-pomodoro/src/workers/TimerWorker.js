let isRunning = false;
let timeoutId = null;

self.onmessage = function (event) {
  const state = event.data;
  const { activeTask, secondsRemaining } = state;

  // Se não houver tarefa ativa ou se mandarem um estado vazio, desliga o motor
  if (!activeTask) {
    if (timeoutId) clearTimeout(timeoutId);
    isRunning = false;
    return;
  }

  // Se o timer já estiver ativado e rodando o loop, ignora novas mensagens repetidas
  if (isRunning) return;

  isRunning = true;
  console.log('🚀 Worker START: Iniciando contagem regressiva para', activeTask.name);

  // Calcula o milissegundo exato no futuro em que a tarefa deve terminar
  const endDate = activeTask.startDate + secondsRemaining * 1000;
  
  function tick() {
    const now = Date.now();
    // Calcula quantos segundos faltam de forma dinâmica baseado no relógio do sistema
    const countDownSeconds = Math.ceil((endDate - now) / 1000);

    // Se o tempo acabou ou estourou, manda o 0 fixo e limpa os estados
    if (countDownSeconds <= 0) {
      self.postMessage(0);
      isRunning = false;
      return;
    }

    // Envia o segundo atual de volta para o Provider (Thread Principal)
    self.postMessage(countDownSeconds);

    // Agenda o próximo tick de forma recursiva e guarda a referência
    timeoutId = setTimeout(tick, 1000);
  }

  // Inicializa a primeira execução do cronômetro
  tick();
};