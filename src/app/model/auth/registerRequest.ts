/**
 * DTO utilizado para registrar un nuevo usuario con nombre de usuario, email y contraseña.
 */
export interface RegisterRequest { 
    /**
     * Nombre de usuario del nuevo usuario. Campo obligatorio.
     */
    username: string;
    /**
     * Correo electrónico del nuevo usuario. Campo obligatorio y debe ser un email válido.
     */
    email: string;
    /**
     * Contraseña del nuevo usuario. Campo obligatorio.
     */
    password: string;
}

