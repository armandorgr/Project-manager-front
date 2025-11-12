/**
 * DTO utilizado para realizar login con nombre de usuario y contraseña.
 */
export interface LoginRequest { 
    /**
     * Nombre de usuario del usuario. Campo obligatorio.
     */
    username: string;
    /**
     * Contraseña del usuario. Campo obligatorio.
     */
    password: string;
}

