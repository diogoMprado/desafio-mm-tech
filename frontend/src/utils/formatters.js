/**
 * Formata um número de telefone para o padrão brasileiro (XX) XXXXX-XXXX
 * @param {string} telefone - Número de telefone (apenas dígitos ou parcialmente formatado)
 * @returns {string} Telefone formatado
 */
export function formatarTelefone(telefone) {
    if (!telefone) return '';
    const digits = telefone.replace(/\D/g, '');

    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Aplica máscara de telefone durante a digitação
 * @param {string} value - Valor atual do input
 * @returns {string} Valor com máscara aplicada
 */
export function aplicarMascaraTelefone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return formatarTelefone(digits);
}
