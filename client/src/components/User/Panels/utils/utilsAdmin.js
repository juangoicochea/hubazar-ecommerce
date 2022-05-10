const { orderBy } = require('../../../../utils')
const { default: axios } = require("axios")
const { backendUrl } = require('../../../../env')

//----------Admin privilege(user_id : 1 ---> superAdmin)
export const isAdmin = (user_id) => {
    axios.patch(backendUrl + 'admin/giveAdmin/' + user_id)
        .then(response => {
            console.log(response.data)
        })
        .catch(e => { return console.error })
}
//----------Seller privilege required by seller status
export const isProvider = (user_id, value) => {
    if (value === 'Enable' || value === 'Disable') {
        axios.patch(backendUrl + 'admin/giveProvider/' + user_id)
            .then(response => {
                console.log(response.data)
            })
            .catch(e => { return console.error })
    }
    if (value === 'Rejected') {
        axios.patch(backendUrl + 'admin/giveProvider/' + user_id + '?rejected=a')
            .then(response => {
                console.log(response.data)
            })
            .catch(e => { return console.error })
    }

}
//----------seller status require seller privilege
export const sellerStatus = (user_id, status) => {
    return (
        status === 'true' ?
            <select onChange={(e) => { isProvider(user_id, e.target.value) }}>
                <option>Enable</option>
                <option>Disable</option>
            </select>
            : status === 'false' ?
                <select onChange={(e) => { isProvider(user_id, e.target.value) }}>
                    <option>Disable</option>
                </select>
                : status === 'requested' ?
                    <select onChange={(e) => { isProvider(user_id, e.target.value) }}>
                        <option>Requested</option>
                        <option>Enable</option>
                        <option>Rejected</option>
                    </select>
                    ://status === 'rejected'
                    <select onChange={(e) => { isProvider(user_id, e.target.value) }}>
                        <option>Rejected</option>
                    </select>
    )
}
//-------------Ban user----
export const setInactive = async (id) => {
    const payload = { userId: id }
    axios.post(backendUrl + 'admin/ban', payload)
        .then(response => {
            console.log(response.data)
        })
}
//-------------unBan user
export const setActive = async (id) => {
    const payload = { userId: id }
    axios.post(backendUrl + 'admin/unban', payload)
        .then(response => {
            console.log(response.data)
        })
}
//-------------Force recet password user
export const resetPass = (email) => {
    const payload = { email: email };
    axios.post(backendUrl + 'auth/forgot', payload)
        .then(response => {
            let msg = response.data
            console.log(msg)
        })
}
//-------------filter products by status
export const filterPro = (event, initialState, setState) => {
    let { value } = event.target
    value === 'Published' ? setState(initialState.filter(e => e.approved)) : value === 'Waiting approve' ? setState(initialState.filter(e => !e.approved)) : setState(initialState)
}
//.............sort products
export const sortPro = (event, initialState, setState) => {
    let { value } = event.target
    value === 'Name' ? setState(initialState.slice().sort((a, b) => orderBy(a.name.toLowerCase(), b.name.toLowerCase()))) : setState(initialState.slice().sort((a, b) => orderBy(a.added, b.added)))
}
//-------------approve new product
export const approveProduct = (product_id) => {
    axios.post(backendUrl + 'admin/approve/' + product_id)
        .then(response => {
            let msg = response.data
            console.log(msg)
        })
        .catch(e => { return console.error })
}
//-------------disapprove product
export const disapproveProduct = (product_id) => {
    axios.post(backendUrl + 'admin/disapprove/' + product_id)
        .then(response => {
            let msg = response.data
            console.log(msg)
        })
        .catch(e => { return console.error })
}
//-------------select: status product >>>> value default & change
export const isSelected = (element, product_id) => {
    const onProduct = (event) => {
        event.target.value === 'Published' ? approveProduct(product_id) : disapproveProduct(product_id)
    }
    if (element.approved) {
        return (
            <select onChange={onProduct}>
                <option>Published</option>
                <option>Waiting approve</option>
            </select>
        )
    } else {
        return (
            <select onChange={onProduct}>
                <option>Waiting approve</option>
                <option>Published</option>
            </select>
        )
    }
}
//-------------view sellers this product
export const viewSeller = (product_id) => {
    const api = backendUrl + 'product/' + '?product_id=' + product_id
    axios(api)
        .then(response => {
            let sellers = response.data.sellers
            return (
                sellers.map(seller => (
                    <>
                        <tr key={seller.userId}>
                            <td>name</td>
                            <td>stock</td>
                            <td>price</td>
                        </tr>
                        <tr key={seller.userId + 100000}>
                            <td>{seller.name}</td>
                            <td>{seller.stock.quantity}</td>
                            <td>${seller.stock.unit_price}</td>
                        </tr>
                    </>
                ))
            )
        })
}
//-------------orders
export const fetchOrders = () => {
    axios(backendUrl + 'movement')
        .then(response => {
            const { data } = response;
            return data;
        })
        .catch(e => { return console.error })
}
