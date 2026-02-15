import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDialog from '../components/ConfirmDialog';

describe('ConfirmDialog', () => {
    const defaultProps = {
        isOpen: true,
        title: 'Confirmação',
        message: 'Tem certeza?',
        onConfirm: () => {},
        onCancel: () => {},
    };

    it('deve renderizar título e mensagem quando aberto', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText('Confirmação')).toBeInTheDocument();
        expect(screen.getByText('Tem certeza?')).toBeInTheDocument();
    });

    it('deve renderizar botões Cancelar e Confirmar', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
        expect(screen.getByText('Confirmar')).toBeInTheDocument();
    });

    it('não deve renderizar conteúdo quando fechado', () => {
        render(<ConfirmDialog {...defaultProps} isOpen={false} />);
        expect(screen.queryByText('Tem certeza?')).not.toBeInTheDocument();
    });

    it('deve chamar onConfirm ao clicar em Confirmar', () => {
        let confirmed = false;
        render(<ConfirmDialog {...defaultProps} onConfirm={() => { confirmed = true; }} />);
        fireEvent.click(screen.getByText('Confirmar'));
        expect(confirmed).toBe(true);
    });

    it('deve chamar onCancel ao clicar em Cancelar', () => {
        let cancelled = false;
        render(<ConfirmDialog {...defaultProps} onCancel={() => { cancelled = true; }} />);
        fireEvent.click(screen.getByText('Cancelar'));
        expect(cancelled).toBe(true);
    });
});
