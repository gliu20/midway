const cache = {};

cache.storage = {};
cache.maxAge = 24 * 60 * 60 * 1000; // 1 day

cache.set = function (key, value) {
    cache.storage[key] = {
        timestamp: Date.now(),
        data: value
    }
}

cache.get = function (key) {
    const value = cache.storage[key];

    if (!value) {
        // cache doesn't have the data
        return { success: false, oldDataAvailable: false };
    }
    else if (Date.now() - value.timestamp > cache.maxAge) {
        // data is too old
        return {
            success: false,
            oldDataAvailable: true,
            data: value.data
        };
    }
    else {
        return {
            success: true,
            oldDataAvailable: false,
            data: value.data
        };
    }
}