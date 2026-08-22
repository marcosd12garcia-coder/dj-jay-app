# 🎧 DJ Jay App

Aplicativo profissional de DJ para iOS e Android com mixer de áudio em tempo real, efeitos de áudio, sincronização de BPM e visualização de forma de onda.

## 🎯 Recursos

- ✅ **Mixer de Áudio** - Controle volume e crossfade de múltiplas faixas
- ✅ **Reprodução em Tempo Real** - Play/pause com múltiplas faixas simultâneas
- ✅ **Efeitos de Áudio** - Reverb, Delay, Filter, Pitch
- ✅ **Sincronização de BPM** - Ajuste e sincronize o BPM das faixas
- ✅ **Visualização de Waveform** - Veja as ondas sonoras em tempo real
- ✅ **Biblioteca de Música** - Acesse sua biblioteca de áudio do dispositivo
- ✅ **Interface Dark Mode** - Design moderno e intuitivo

## 📱 Plataformas

- iOS 13+
- Android 8+

## 🛠️ Tecnologias

- **React Native** - Framework para desenvolvimento multiplataforma
- **Expo** - Plataforma para desenvolvimento React Native
- **expo-av** - Biblioteca de áudio e vídeo
- **expo-media-library** - Acesso à biblioteca de mídia
- **React Navigation** - Navegação entre telas
- **Zustand** - Gerenciamento de estado

## 📦 Instalação

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Expo CLI

### Passos

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/dj-jay-app.git
cd dj-jay-app
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o Expo
```bash
npm start
```

4. Para iOS
```bash
npm run ios
```

5. Para Android
```bash
npm run android
```

## 📚 Estrutura do Projeto

```
dj-jay-app/
├── App.js                 # Componente principal e navegação
├── app.json              # Configurações do Expo
├── package.json          # Dependências
└── src/
    ├── components/       # Componentes reutilizáveis
    │   ├── MasterControls.js
    │   ├── TrackMixer.js
    │   └── EffectControl.js
    ├── context/          # Context API para estado global
    │   └── AudioContext.js
    └── screens/          # Telas do aplicativo
        ├── MixerScreen.js
        ├── LibraryScreen.js
        ├── EffectsScreen.js
        └── SettingsScreen.js
```

## 🎮 Como Usar

### Tela Mixer
1. Vá para a aba "Library" e adicione músicas
2. As faixas aparecerão na tela "Mixer"
3. Use os controles de volume para cada faixa
4. Pressione play para começar a reprodução
5. Use o master volume para controlar o volume geral

### Tela Effects
1. Selecione uma faixa
2. Ajuste Reverb, Delay, Filter e Pitch
3. Os efeitos serão aplicados em tempo real

### Configurações
1. Ajuste o BPM (60-220)
2. Ative/desative sincronização de beat
3. Controle notificações

## 🚀 Próximas Funcionalidades

- [ ] Gravação de mixagens
- [ ] Equalizador visual (10 bandas)
- [ ] Presets de efeitos
- [ ] Sincronização de beat automática
- [ ] Loop de faixas
- [ ] Crossfader avançado
- [ ] Suporte a Bluetooth
- [ ] Temas personalizáveis

## 🐛 Bugs e Issues

Este é um projeto em desenvolvimento. Se encontrar bugs ou tiver sugestões, por favor abra uma issue.

## 📄 Licença

MIT License - veja LICENSE para mais detalhes

## 👨‍💻 Contribuindo

1. Faça um Fork
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

Marcos D Garcia - [@marcosd12garcia](https://github.com/marcosd12garcia-coder)

---

**Desenvolvido com ❤️ para DJs que amam tecnologia**
