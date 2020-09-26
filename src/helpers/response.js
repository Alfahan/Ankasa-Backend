const response = {
    success: (res, data, message) => {
        const result = {
            message,
            success: true,
            code: 200,
            data
        }
        res.json(result)
    },
    failed: (res, data, message) => {
        const result = {
            message,
            success: false,
            code: 500,
            data
        }
        res.json(result)
    },
    tokenStatus: (res, data, message) => {
        const result = {
            message,
            success: true,
            code: 200,
            data
        }
        res.json(result)
    }
};

module.exports = response