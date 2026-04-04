export async function createAttachment(file) {
    const { path, originalname } = file

    return { path, name: originalname }
}

