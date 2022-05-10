export const trimInput = (input) => {
    return input.replace(/^\s*|\s*$/g, '');
}

export const orderBy = (a, b) => {
    return a < b ? -1 : a > b ? 1 : 0
}

export function isValidURL(string) {
    var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
    return (res !== null)
};

export const isNumberInRange = (number, range) => {
    return number >= range[0] && number <= range[1]
}

export const uniq = (list) => {
    var seen = {};
    return list.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}


export const generateRandomInt = (maxLimit = 100) => {
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99
    return rand;
}

export const generateRandomFloat = (maxLimit = 100) => {
    let rand = Math.random() * maxLimit;
    console.log(rand); // say 99.81321410836433

    rand = rand.toFixed(2); // 99

    return rand;
}

export const trimApiProducts = (products) => {
    const trimmedProducts = products.map(product => {
        const images = [];
        if (product.images) {
            product.images.forEach(image => {
                images.push(image.url)
            })
        }
        if (product.image) {
            images.push(product.image.url)
        }
        return {
            product_id: product.id || product.product_id,
            name: product.name || product.title,
            price: product.price,
            images,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            is_featured: product.is_featured,
            is_active: product.is_active,
            created_at: product.created_at,
            updated_at: product.updated_at
        }
    })
    return trimmedProducts
}

export const ValidateEmail = (email) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return (true)
    }
    return (false)
}
