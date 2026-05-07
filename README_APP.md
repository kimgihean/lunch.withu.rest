# 냠냠 추천기 (Lunch Recommendation App) 🍱

귀엽고 깜찍한 디자인의 오늘 먹을 점심 메뉴 추천 서비스입니다!

## 기술 스택
- **Framework**: Nuxt 3 / 4 (Minimal)
- **Styling**: TailwindCSS
- **Database**: Firebase Firestore
- **Maps API**: Kakao Maps API

## 설치 및 실행 방법

1. 의존성 설치:
   ```bash
   npm install
   ```

2. API 키 설정:
   - `nuxt.config.ts` 파일의 `YOUR_KAKAO_API_KEY` 부분을 본인의 카카오 앱 키로 교체하세요.
   - `plugins/firebase.client.ts` 파일의 `firebaseConfig` 객체를 본인의 파이어베이스 설정으로 교체하세요.

3. 개발 서버 실행:
   ```bash
   npm run dev
   ```

## 핵심 기능
- **점심 추천**: 등록된 맛집 리스트에서 무작위로 하나를 추천해줍니다.
- **맛집 검색**: 카카오 지도를 통해 맛집을 검색할 수 있습니다.
- **맛집 등록**: 검색한 맛집을 파이어베이스 DB에 저장합니다.
- **맛집 리스트**: 저장된 모든 맛집을 한 페이지에서 확인할 수 있습니다.

## 디렉토리 구조
- `app/pages/index.vue`: 메인 단일 페이지 (모든 기능 포함)
- `composables/useRestaurants.ts`: 파이어베이스 데이터 처리 및 추천 로직
- `plugins/firebase.client.ts`: 파이어베이스 초기화 설정
- `assets/css/main.css`: 귀여운 핑크 테마 디자인 시스템
- `nuxt.config.ts`: 프로젝트 전반 설정 및 외부 스크립트(카카오맵) 관리
