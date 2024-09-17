"use strict";

const handle404Error = (req, res, next) => {
    res.status(404).render('../error/index', {
        status: 404,
        message: '페이지를 찾을 수 없습니다.'
    });
};

const handle500Error = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('../error/index', {
        status: 500,
        message: '서버에 오류가 발생했습니다.'
    });
};

module.exports = {
    handle404Error,
    handle500Error
};