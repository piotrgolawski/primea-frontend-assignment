import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchComponent from "./Search";
import * as SearchContext from '../../hooks/useSearch';

describe('Search', () => {
    const mockSetQuery = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(SearchContext, 'useSearch').mockImplementation(() => ({
            query: '',
            setQuery: mockSetQuery
        }));
    });

    it('should render the search input', () => {
        render(<SearchComponent />);
        expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    it('should update search query on user input', async () => {
        render(<SearchComponent />);
        const searchInput = screen.getByPlaceholderText(/search/i);
        
        fireEvent.change(searchInput, { target: { value: 'cats' } });
        
        await waitFor(() => {
            expect(mockSetQuery).toHaveBeenCalledWith('cats');
        });
    });

    it('should debounce search input', async () => {
        render(<SearchComponent />);
        const searchInput = screen.getByPlaceholderText(/search/i);
        
        fireEvent.change(searchInput, { target: { value: 'c' } });
        fireEvent.change(searchInput, { target: { value: 'ca' } });
        fireEvent.change(searchInput, { target: { value: 'cat' } });
        fireEvent.change(searchInput, { target: { value: 'cats' } });

        await waitFor(() => {
            expect(mockSetQuery).toHaveBeenCalledWith('cats');
        }, { timeout: 1000 });

        await waitFor(() => {
            expect(mockSetQuery).toHaveBeenCalledTimes(1);
        }, { timeout: 1000 });
    });

    it('should not trigger search for empty input', async () => {
        render(<SearchComponent />);
        const searchInput = screen.getByPlaceholderText(/search/i);
        
        fireEvent.change(searchInput, { target: { value: '' } });
        
        await waitFor(() => {
            expect(mockSetQuery).not.toHaveBeenCalled();
        });
    });

    it('should not trigger search for 2 chars input', async () => {
        render(<SearchComponent />);
        const searchInput = screen.getByPlaceholderText(/search/i);

        fireEvent.change(searchInput, { target: { value: 'ab' } });

        await waitFor(() => {
            expect(mockSetQuery).not.toHaveBeenCalled();
        });
    });

    it('should trigger search for 3 chars input', async () => {
        render(<SearchComponent />);
        const searchInput = screen.getByPlaceholderText(/search/i);

        fireEvent.change(searchInput, { target: { value: 'abc' } });

        await waitFor(() => {
            expect(mockSetQuery).toHaveBeenCalled();
        });
    });

    it('should clear input when clear button is clicked', async () => {
        render(<SearchComponent />);
        const searchInput = screen.getByPlaceholderText(/search/i);
        
        fireEvent.change(searchInput, { target: { value: 'test' } });
        const clearButton = screen.getByRole('button');
        
        fireEvent.click(clearButton);
        
        await waitFor(() => {
            expect(mockSetQuery).toHaveBeenCalledWith('');
        });

        await waitFor(() => {
            expect(searchInput).toHaveValue('');
        });
    });
});
