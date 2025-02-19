export function capitalize(input: string) {
    if (input.length == 0) return input;
    return String(input).charAt(0).toUpperCase() + String(input).slice(1);
}
