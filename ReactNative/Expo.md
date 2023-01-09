# React Native - Expo

## Expo 란?

- react 에서 create-react-app 과 같은 react native cli 서비스와 비슷하다. (android / ios 등 여러 설정 및 api 설정 자동화)

## Expo 장점

- 쉬운 개발 환경 구성
- React Native가 기본 제공하는 API (최근 더 축소 되고 있음) 에 비해 다양하다
- 어떤 환경에서든 android / ios 앱 개발이 가능하다
- air update 기능으로 업데이트시 앱스토어의 업데이트 / 승인 절차 생략이 가능하다

## Expo 단점

- 사용여부와 관계 없이 기본 모듈을 모두 포함하므로 (기본 20Mb 이상) 무겁다
- Native 기능의 100% 구현이 불가능 하다. (백그라운드 푸시알림, 블루투스 호환 등)
- 빌드 시간이 오래걸린다..

## 단점 해결 방안

- eject 기능이 있는데 해당 기능을 사용하면 번들링된 모든 파일 목록에 접근이 가능하다.
  따라서, 불필요한 모듈들을 삭제할수 있고 (심지어 facebook 관련 모듈도 삭제 가능) 필요한 모듈이 있다면 추가할수도 있다.
  (다만, 많은 사람들이 eject를 하다가 다시 네이티브 코드로 돌아가는 경향이 있다고 할 정도로 많은 작업과 귀찮음이 따른다고 한다..)

## Expo 설치

```js
npm install --global expo-cli
npx create-expo-app {원하는 앱이름}

cd ./{앱이름}

npm run start
```

## Expo 모바일 테스트

> 해당 앱스토어에서 expo go 설치 후 앱다운 및 로그인, 진행중인 프로젝트 선택

## Expo (PC에서 모바일 테스트)

> Press a │ open Android
> Press i │ open iOS simulator
> Press w │ open web

> Press j │ open debugger
> Press r │ reload app
> Press m │ toggle menu

> 시뮬레이터 실행 안될시 (shift + i) / 휴대폰 선택

## Expo 시뮬레이터

- Ctrl + Cmd + Z : 개발 메뉴 바 활성화 / 비활성화

## 로딩 바

> 유저가 앱 접속시 앱은 로딩되어있어야 한다.
> preload 기능 사용하기 위해 설치

```js
expo install expo-app-loading

// 대체
expo install expo-splash-screen
```

## 폰트

```js
expo install expo-font
```

## 에셋

> 이미지 (파일) 로드 할수 있는 모듈

```js
expo install expo-asset
```

## 네비게이션 바

```js
npm install @react-navigation/native
expo install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
```
