import jwt from 'jsonwebtoken'

export function generateToken(id, email, role) {
    return jwt.sign(
        {
            id,
            email,
            role
        },
        process.env.JWT_ACCESS_KEY,
        {
            expiresIn: '3h'
        }
    )
}

