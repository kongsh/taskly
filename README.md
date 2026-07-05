# Taskly

## 프로젝트 소개

- 개인 프로젝트 및 할 일을 관리하는 Task Manager

## 기술 스택

- Framework : Next.js (App Router)
- Language : Typescript
- Style : Tailwind CSS, shadcn/ui
- State : Tanstack Query, Zustand
- Backend : Supabase
- Testing : Vitest, React Testing Library
- Quality : ESLint, Prettier
- Deploy : Vercel

## 폴더 구조

```
src
│
├── app
├── components
│   ├── common
│   ├── layout
│   └── ui
│
├── features
│   ├── auth
│   ├── project
│   └── task
│       ├── components
│       ├── hooks
│       ├── services
│       ├── types
│       └── utils
│
├── hooks
├── lib
├── stores
├── types
├── utils
└── constants
```

## 개발 목표

Taskly는 단순한 할 일 관리 애플리케이션이 아닌, 실제 서비스 개발 과정을 경험하고 프론트엔드 개발 역량을 보여주기 위한 프로젝트입니다.

이번 프로젝트를 통해 다음과 같은 목표를 달성하고자 합니다.

- Next.js(App Router)를 활용한 서비스 구조 설계 및 개발
- Server Component와 Client Component를 적절히 활용한 렌더링 구조 이해
- TypeScript를 활용한 안정적인 타입 설계
- Supabase를 이용한 인증(Auth) 및 데이터 관리
- TanStack Query를 활용한 서버 상태 관리 및 캐싱
- Zustand를 활용한 클라이언트(UI) 상태 관리
- 재사용 가능한 컴포넌트 설계와 유지보수하기 쉬운 프로젝트 구조 구성
- 반응형 UI 및 사용자 경험(UX)을 고려한 인터페이스 구현
- 테스트(Vitest, React Testing Library)와 코드 품질(ESLint, Prettier)을 적용한 개발 경험
- GitHub와 README를 포함한 프로젝트 문서화 및 배포(Vercel)를 통해 실제 서비스 형태의 포트폴리오 완성
