FROM python:3.11-slim

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Criar usuário não-root
RUN useradd --create-home --shell /bin/bash app

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências primeiro (para cache do Docker)
COPY --chown=app:app pyproject.toml poetry.lock ./

# Instalar Poetry e dependências
RUN pip install --no-cache-dir poetry && \
    poetry config virtualenvs.create false && \
    poetry install 

# Copiar o código da aplicação
COPY --chown=app:app . .

# Criar diretórios necessários
RUN mkdir -p /app/staticfiles /app/static/dist/css /app/media && \
    chown -R app:app /app

# Mudar para usuário app
USER app

# Expor porta
EXPOSE 8000

# Coletar arquivos estáticos
RUN python manage.py collectstatic --noinput --clear

# Comando padrão
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]