import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Toast from '../components/Toast';

describe('Toast', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('deve renderizar quando message é fornecida', () => {
        render(<Toast message="Sucesso!" severity="success" onClose={() => {}} />);
        expect(screen.getByText('Sucesso!')).toBeInTheDocument();
    });

    it('não deve renderizar quando message é null', () => {
        render(<Toast message={null} severity="success" onClose={() => {}} />);
        expect(screen.queryByText('Sucesso!')).not.toBeInTheDocument();
    });

    it('deve renderizar com severity error', () => {
        render(<Toast message="Erro!" severity="error" onClose={() => {}} />);
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
        expect(screen.getByText('Erro!')).toBeInTheDocument();
    });

    it('deve renderizar com severity success', () => {
        render(<Toast message="Ok!" severity="success" onClose={() => {}} />);
        const alert = screen.getByRole('alert');
        expect(alert).toBeInTheDocument();
    });
});
