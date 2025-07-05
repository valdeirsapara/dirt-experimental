import { usePage } from '@inertiajs/react';
import { User, Auth } from '@/types/global';

/**
 * Hook personalizado para acessar dados de autenticação
 */
export function useAuth() {
  const { auth } = usePage<{ auth: Auth }>().props;
  
  return {
    // Dados do usuário
    user: auth.user,
    isAuthenticated: auth.is_authenticated,
    
    // Helpers de permissão
    isStaff: auth.user?.is_staff || false,
    isSuperuser: auth.user?.is_superuser || false,
    
    // Helper para nome completo
    fullName: auth.user 
      ? `${auth.user.first_name} ${auth.user.last_name}`.trim() || auth.user.username
      : null,
    
    // Helper para iniciais
    initials: auth.user
      ? auth.user.first_name && auth.user.last_name
        ? `${auth.user.first_name[0]}${auth.user.last_name[0]}`.toUpperCase()
        : auth.user.username.slice(0, 2).toUpperCase()
      : null,
    
    // Verificar se o usuário tem uma permissão específica
    hasPermission: (permission: 'staff' | 'superuser') => {
      if (!auth.is_authenticated) return false;
      
      switch (permission) {
        case 'staff':
          return auth.user?.is_staff || false;
        case 'superuser':
          return auth.user?.is_superuser || false;
        default:
          return false;
      }
    }
  };
}

/**
 * Hook para acessar dados globais da aplicação
 */
export function useApp() {
  type AppProps = {
    app_name: string;
    app_version: string;
    config: {
      debug: boolean;
      csrf_token: string;
    };
    stats: any; // Replace with a more specific type if available
  }
  
  const { app_name, app_version, config, stats } = usePage<AppProps>().props;
  
  return {
    name: app_name,
    version: app_version,
    isDebug: config.debug,
    csrfToken: config.csrf_token,
    stats,
  };
}


export function useFlash() {
  const { flash } = usePage<any>().props;
  
  return {
    success: flash.success,
    error: flash.error,
    warning: flash.warning,
    info: flash.info,
    hasMessages: !!(flash.success || flash.error || flash.warning || flash.info),
  };
}