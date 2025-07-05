// Tipos globais para os dados compartilhados do Inertia

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
}

export interface Auth {
  user: User | null;
  is_authenticated: boolean;
}

export interface Stats {
  total_users: number;
  active_users: number;
}

export interface Flash {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

export interface Config {
  debug: boolean;
  csrf_token?: string;
}

// Props globais compartilhadas via Inertia
export interface SharedProps {
  auth: Auth;
  stats: Stats;
  app_name: string;
  app_version: string;
  flash: Flash;
  config: Config;
}

// Extender os tipos do Inertia para incluir nossas props
declare module '@inertiajs/react' {
  interface PageProps extends SharedProps {}
}