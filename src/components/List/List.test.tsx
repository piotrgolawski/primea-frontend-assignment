import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from './List';
import * as SearchContext from '../../hooks/useSearch';

jest.mock('react-toastify');
jest.mock('../../hooks/useUseUnsplashAPI', () => ({
    __esModule: true,
    default: () => ({
        fetchImages: mockFetchImages,
        loading: false,
        error: null
    }),
    PER_PAGE: 12
}));

const mockFetchImages = jest.fn();
const mockSetQuery = jest.fn();

describe('List', () => {
    const mockImages = [
        { urls: { small: 'image1.jpg' } },
        { urls: { small: 'image2.jpg' } }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        mockFetchImages.mockReset();
    });

    const renderWithSearch = (query: string) => {
        jest.spyOn(SearchContext, 'useSearch').mockImplementation(() => ({
            query,
            setQuery: mockSetQuery
        }));
        return render(<List />);
    };

    it('should not fetch images when query is less than 3 characters', () => {
        renderWithSearch('ab');
        expect(mockFetchImages).not.toHaveBeenCalled();
    });

    it('should fetch images when query is 3 or more characters', async () => {
        mockFetchImages.mockResolvedValueOnce(mockImages);
        renderWithSearch('cat');
        
        await waitFor(() => {
            expect(mockFetchImages).toHaveBeenCalledWith('cat', 1);
        });
    });

    it('should display images after successful fetch', async () => {
        mockFetchImages.mockResolvedValueOnce(mockImages);
        renderWithSearch('cat');

        await waitFor(() => {
            const images = screen.getAllByRole('img');
            expect(images).toHaveLength(2);
        });

        await waitFor(() => {
            const images = screen.getAllByRole('img');
            expect(images[0]).toHaveAttribute('src', 'image1.jpg');
        });

        await waitFor(() => {
            const images = screen.getAllByRole('img');
            expect(images[1]).toHaveAttribute('src', 'image2.jpg');
        });
    });

    it('should show error toast when API call fails', async () => {
        const errorMessage = 'API Error';
        mockFetchImages.mockRejectedValueOnce(new Error(errorMessage));
        renderWithSearch('cat');

        await waitFor(() => {
            expect(mockFetchImages).toHaveBeenCalledWith('cat', 1);
        });

        const images = screen.queryAllByRole('img');
        expect(images).toHaveLength(0);
    });

    it('should handle undefined response from API gracefully', async () => {
        mockFetchImages.mockResolvedValueOnce(undefined);
        renderWithSearch('cat');
        
        await waitFor(() => {
            const images = screen.queryAllByRole('img');
            expect(images).toHaveLength(0);
        });
    });

    it('should reset state and fetch new images when query changes', async () => {
        mockFetchImages.mockResolvedValueOnce(mockImages);
        const { rerender } = renderWithSearch('cat');

        await waitFor(() => {
            expect(screen.getAllByRole('img')).toHaveLength(2);
        });

        const newImages = [{ urls: { small: 'dog1.jpg' } }];
        mockFetchImages.mockResolvedValueOnce(newImages);
        
        jest.spyOn(SearchContext, 'useSearch').mockImplementation(() => ({
            query: 'dog',
            setQuery: mockSetQuery
        }));
        rerender(<List />);

        await waitFor(() => {
            expect(mockFetchImages).toHaveBeenCalledWith('dog', 1);
        });
    });
});
