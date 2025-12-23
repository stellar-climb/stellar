# 1) 빌드 스테이지
FROM node:22-alpine AS builder

WORKDIR /app

# 캐시 효율을 위해 package 파일 먼저 복사
COPY package*.json ./
RUN npm ci

# 소스 복사 (빌드에 필요한 모든 파일)
COPY . .

# Nest 빌드
RUN npm run build

# 2) 런타임 스테이지
FROM node:22-alpine AS production

WORKDIR /app
# 환경변수 설정
ENV NODE_ENV=production

# 런타임에 필요한 최소한의 파일만 복사
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# [추가 권장] curl 설치 (헬스체크용으로 자주 사용됨)
RUN apk add --no-cache curl

EXPOSE 3000

CMD ["node", "dist/main"]