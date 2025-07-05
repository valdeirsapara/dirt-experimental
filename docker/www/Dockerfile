FROM node:20-alpine

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Definir diretório de trabalho
WORKDIR /app/src

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install 

# Expor portas para Vite e TailwindCSS
EXPOSE 5173

# Comando padrão (será sobrescrito pelo docker-compose)
CMD ["pnpm", "dirt-dev"]