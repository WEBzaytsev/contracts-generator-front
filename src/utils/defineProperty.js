'use strict';

export const defineProperty = (object, propName, propValue) => {
    Object.defineProperty(object, propName, {
        value: propValue,
        writable: true,
        enumerable: true,
    });
};
