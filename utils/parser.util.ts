export function parseFloat(text: string): number {
    const withoutDolar = text.replace('$', '');
    return Number.parseFloat(withoutDolar)
}
