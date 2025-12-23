# 1) 빌드 스테이지
FROM node:22-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일만 먼저 복사 후 의존성 설치
COPY package*.json ./
RUN npm ci

# Nest 빌드에 필요한 설정/소스 복사
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

# Nest 빌드 (dist 생성)
RUN npm run build

# 2) 런타임 스테이지 (최종 이미지)
FROM node:22-alpine AS production

WORKDIR /app
ENV NODE_ENV=production

# 프로덕션 의존성만 설치
COPY package*.json ./
RUN npm ci --omit=dev

# 빌드 결과만 가져오기
COPY --from=builder /app/dist ./dist

# Nest 기본 포트
EXPOSE 3000

# 앱 실행
CMD ["node", "dist/main"]