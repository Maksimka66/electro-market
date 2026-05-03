const trimValidationRegex = /\s+/g

export const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export function trimReplace(value) {
    if (typeof value === 'string') {
        return value.trim().replace(trimValidationRegex, ' ')
    }

    return value
}

