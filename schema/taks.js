const z = require('zod');

const taskSchema = z.object({
    description: z.string().min(1),
    status: z.string().default('pending'),
    createdAt: z.string().default(new Date().toLocaleString()),
    updateAt: z.string().default(new Date().toLocaleString())
})

function validateTask(object) {
    return taskSchema.safeParse(object);
}

function validatePartialTask(object) {
    return taskSchema.partial().safeParse(object);
}

module.exports = {
    validateTask,
    validatePartialTask
}