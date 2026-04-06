# Parte 5 - Testes Mobile (Appium)

Este guia configura ambiente para executar `testes/mobile-basic.spec.js` em Android ou iOS.

## 1) Pre-requisitos

- Node.js 18+ e npm
- Java JDK 11+ (Android)
- Android Studio + Android SDK (Android)
- Xcode + simulador iOS (macOS, para iOS)
- Appium 2.x

Instalacao recomendada:

```bash
npm install
npm install -D webdriverio appium
```

Opcional (drivers Appium):

```bash
appium driver install uiautomator2
appium driver install xcuitest
```

## 2) Subir Appium Server

```bash
npx appium
```

Por padrao o teste usa:
- host `127.0.0.1`
- porta `4723`
- path `/`

## 3) Variaveis de ambiente

Ative a execucao mobile:

- `RUN_MOBILE_TESTS=true`

Comuns:

- `APPIUM_HOST` (default `127.0.0.1`)
- `APPIUM_PORT` (default `4723`)
- `MOBILE_PLATFORM` (`Android` ou `iOS`)
- `MOBILE_DEVICE_NAME`
- `MOBILE_PLATFORM_VERSION`
- `MOBILE_APP_PATH` (caminho do `.apk` ou `.app`/`.ipa`)
- `MOBILE_SMOKE_SELECTOR` (seletor opcional para validar tela inicial)

Android:

- `MOBILE_AUTOMATION=UiAutomator2` (default)
- `MOBILE_APP_PACKAGE` (ex.: `com.exemplo.app`)
- `MOBILE_APP_ACTIVITY` (ex.: `.MainActivity`)

iOS:

- `MOBILE_AUTOMATION=XCUITest` (default)
- `MOBILE_BUNDLE_ID` (ex.: `com.exemplo.app`)

Geolocalizacao (mock, se suportado):

- `MOBILE_GEO_LAT` (default `-23.55052`)
- `MOBILE_GEO_LON` (default `-46.633308`)

## 4) Executar o teste

```bash
npm run test:mobile
```

## 5) O que o teste valida

- Cria sessao Appium com sucesso
- Navegacao basica (app aberto + smoke selector opcional)
- Tenta mock de geolocalizacao (Android emulator, quando suportado)


