// src/utils/loadBeep.ts
export function loadBeep() {
  // 🎯 Corrigido o caminho: agora aponta para dentro da pasta audios que está no public
  const audio = new Audio('/audios/gravitational_beep.mp3'); 
  
  return {
    play: () => {
      audio.currentTime = 0; 
      audio.play().catch(err => console.log("Erro ao tocar o bip:", err));
    }
  };
}
