import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import i18Resources from "assets/resources/i18Resources.js";

const i18Resources = {
  en: {
    translation: {
      "Play in order": "Play in order",
      "List loop": "List loop",
      "Single cycle": "Single cycle",
      "Shuffle Playback": "Shuffle playback",
      "Turn on": "Turn on",
      "Shut down": "Shut down",
      "Open": "Open",
      Close: "Close",
      "Turn off": "Turn off",
      "No music": "No music",
      Playlist: "Playlist",
      "Are you confirm destroy the player":
        "Are you confirm to destroy the player?",
      "Click to Play": "Click to play",
      "Click to Pause": "Click to pause",
      "Next Track": "Next track",
      "Previous Track": "Previous track",
      "Reload": "Reload",
      "Volume": "Volume",
      "Playlists": "Playlists",
      "Toggle Lyric" : "Toggle lyric",
      "Minimize": "Minimize",
      "Destroy": "Destroy",
      "Download": "Download",
      "Theme Light": "L",
      "Theme Dark": "D",
      "Dark Light Mode": "Dark/Light mode"
      }
    },
  pt: {
    translation: {
      "Play in order": "Tocar por ordem",
      "List loop": "Loop de lista",
      "Single cycle": "Ciclo simples",
      "Shuffle Playback": "Tocar aleatório",
      "Turn on": "Ligar",
      "Shut down": "Fechar",
      "Open": "Abrir",
      Close: "Fechar",
      "Turn off": "Desligar",
      "No music": "Sem música",
      Playlist: "Playlist",
      "Are you confirm destroy the player": "Confirma encerrar o player?",
      "Click to Play": "Clique para tocar",
      "Click to Pause": "Clique para interromper",
      "Next Track": "Faixa seguinte",
      "Previous Track": "Faixa anterior",
      "Reload": "Recarregar",
      "Volume": "Volume",
      "Playlists": "Listas de execução",
      "Toggle Lyric" : "Ver letras",
      "Minimize": "Minimizar",
      "Destroy": "Sair",
      "Download": "Baixar",
      "Theme Light": "C",
      "Theme Dark": "E",
      "Dark Light Mode": "Modo claro/escuro"
    }
  }
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en",
    lng: "en",
    resources: i18Resources,
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },

  });

export default i18n;
