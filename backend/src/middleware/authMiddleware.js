import jwt from 'jsonwebtoken'

export function authHandler(req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized!'
            })
        }

        const decodedData = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decodedData

        next()
    } catch (e) {
        res.status(401).json({
            message: 'Unauthorized!'
        })
    }
}

