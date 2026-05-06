import { apiClient } from './apiClient';

const ENDPOINT = "/familias";

export const FamiliaService = {
    getPorSector: async (sectorId) => {
        try {
            return await apiClient(`${ENDPOINT}/sector/${sectorId}`);
        } catch (error) {
            console.error("Error en FamiliaService.getPorSector:", error.message);
            return [];
        }
    }
};