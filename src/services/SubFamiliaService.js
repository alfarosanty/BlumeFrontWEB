import { apiClient } from './apiClient';

const ENDPOINT = "/subfamilias";

export const SubFamiliaService = {
    getVisiblesWeb: async () => {
        try {
            return await apiClient(`${ENDPOINT}/web`);
        } catch (error) {
            console.error("Error en SubFamiliaService.getVisiblesWeb:", error.message);
            return [];
        }
    },
    
    getPorSector: async (sectorId) => {
        try {
            return await apiClient(`${ENDPOINT}/sector/${sectorId}`);
        } catch (error) {
            console.error("Error en SubFamiliaService.getPorSector:", error.message);
            return [];
        }
    }
};