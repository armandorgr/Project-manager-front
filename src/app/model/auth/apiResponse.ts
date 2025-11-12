/**
 * Respuesta genérica de la API que incluye estado, mensaje, datos y metadatos opcionales.
 */
export interface ApiResponse<T> { 
    /**
     * Estado de la respuesta (por ejemplo: SUCCESS o ERROR).
     */
    status: string;
    /**
     * Mensaje descriptivo sobre el resultado de la operación.
     */
    message: string;
    data?:T;
    metadata?: any;
}

