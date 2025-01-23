import { describe, it, expect, vi } from 'vitest';
import { get, post } from '@/api/api.js';

// Mock da função fetch global
global.fetch = vi.fn();

describe('API functions', () => {
    const apiBaseUrl = 'http://localhost:5173';

    describe('get', () => {
        it('should fetch data successfully', async () => {
            const endpoint = 'data';
            const mockData = { data: 'some data' };

            // Simula a resposta da API
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockData,
            });

            const data = await get(apiBaseUrl, endpoint);
            expect(data).toEqual(mockData);
            expect(fetch).toHaveBeenCalledWith(`${apiBaseUrl}/${endpoint}`);
        });

        it('should throw an error when the response is not ok', async () => {
            const endpoint = 'data';
            const errorMessage = 'Not Found';

            // Simula uma resposta de erro da API
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 404,
                text: async () => errorMessage,
            });

            await expect(get(apiBaseUrl, endpoint)).rejects.toThrow(
                `API request failed with status 404: ${errorMessage}`
            );
        });
    });

    describe('post', () => {
        it('should post data successfully', async () => {
            const endpoint = 'data';
            const postData = { name: 'test' };
            const mockResponse = { success: true };

            // Simula a resposta da API
            fetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            });

            const data = await post(apiBaseUrl, endpoint, postData);
            expect(data).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith(`${apiBaseUrl}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
        });

        it('should throw an error when the response is not ok', async () => {
            const endpoint = 'data';
            const errorMessage = 'Internal Server Error';

            // Simula uma resposta de erro da API
            fetch.mockResolvedValueOnce({
                ok: false,
                status: 500,
                text: async () => errorMessage,
            });

            await expect(post(apiBaseUrl, endpoint, {})).rejects.toThrow(
                `API request failed with status 500: ${errorMessage}`
            );
        });
    });
});