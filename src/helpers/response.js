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
    successWithMeta: (res,data,meta,message) => {
        const result = {
            message: message,
            success: true,
            code:200,
            meta:meta,
            data:data,
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
    tokenExpired: (res,data, message) => {
        const result = {
            message,
            success: false,
            code: 405,
            data
        }
        res.status(405).json(result)
    },
    tokenErr: (res, data, message) => {
        const result = {
            message,
            success: false,
            code: 505,
            data
        }
        res.status(505).json(result)
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