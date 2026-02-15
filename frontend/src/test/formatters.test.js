import { describe, it, expect } from 'vitest';
import { formatarTelefone, aplicarMascaraTelefone } from '../utils/formatters';

describe('formatarTelefone', () => {
    it('deve formatar telefone com 11 dígitos completo', () => {
        expect(formatarTelefone('11987654321')).toBe('(11) 98765-4321');
    });

    it('deve formatar telefone parcial - apenas DDD', () => {
        expect(formatarTelefone('11')).toBe('(11');
    });

    it('deve formatar telefone parcial - DDD + primeiros dígitos', () => {
        expect(formatarTelefone('11987')).toBe('(11) 987');
    });

    it('deve formatar telefone parcial - DDD + 5 dígitos', () => {
        expect(formatarTelefone('1198765')).toBe('(11) 98765');
    });

    it('deve retornar string vazia para entrada vazia', () => {
        expect(formatarTelefone('')).toBe('');
        expect(formatarTelefone(null)).toBe('');
        expect(formatarTelefone(undefined)).toBe('');
    });

    it('deve limpar caracteres não numéricos antes de formatar', () => {
        expect(formatarTelefone('(11) 98765-4321')).toBe('(11) 98765-4321');
    });
});

describe('aplicarMascaraTelefone', () => {
    it('deve limitar a 11 dígitos', () => {
        expect(aplicarMascaraTelefone('119876543219999')).toBe('(11) 98765-4321');
    });

    it('deve remover caracteres não numéricos', () => {
        expect(aplicarMascaraTelefone('abc11def987eee654ggg3210')).toBe('(11) 98765-4321');
    });

    it('deve funcionar com entrada vazia', () => {
        expect(aplicarMascaraTelefone('')).toBe('');
    });

    it('deve formatar progressivamente conforme digitação', () => {
        expect(aplicarMascaraTelefone('1')).toBe('(1');
        expect(aplicarMascaraTelefone('11')).toBe('(11');
        expect(aplicarMascaraTelefone('119')).toBe('(11) 9');
        expect(aplicarMascaraTelefone('11987654321')).toBe('(11) 98765-4321');
    });
});
