const products = 'https://salva-bsale-api.herokuapp.com/products'
const categories = 'https://salva-bsale-api.herokuapp.com/category'
const cont = document.getElementById('container')
const toastLiveExample = document.getElementById('liveToast')

// console.log(window.sessionStorage.getItem('cart'))
if(!window.sessionStorage.getItem('cart')) {
    window.sessionStorage.setItem('cart', JSON.stringify({items:{}}))
}

let subtotal = 0
let descuento = 0
fetch(categories)
.then(res => res.json())
.then(categorias => {
    contenedorCategory = u('ul#contCategory')
    toclon = u('ul#contCategory li')
    categorias.forEach(categoria => {
        let clon = toclon.clone()
        clon.removeClass('d-none')
        clon.find('a').text(`${(categoria.name).toUpperCase()}`)
        clon.find('a').data('id', categoria.id)
        u('ul#contCategory').append(clon)
    })    
})


let initProduct = () =>{
    fetch(products)
    .then(res => res.json())
.then(data => {
    contenedorProduct= u('#containerProducts div.d-none')
    contenedorProduct.siblings().remove()
    let cart = JSON.parse(window.sessionStorage.getItem('cart'))
    data.forEach(product => {
        let image ='./img/product.png'
        let cloncard = contenedorProduct.clone()
        if ( product.url_image != null && product.url_image != '' ) {
            image = product.url_image
        }
        cloncard.find('.card-title').text(`${product.name}`)
        if(product.discount > 0){
            cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
        }else{
            cloncard.find('.card-text').text(`$${product.price} `)
        }
        cloncard.find('img').attr('src', `${image}`)        
        cloncard.find('input').attr('value' , `${product.id}`)
        const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
        u('#containerProducts .row').append(container)
        if ( cart.items[product.id] ){
            cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
            cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
        }else{
            cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
        }
        cloncard.removeClass('d-none')
        container.append(cloncard)
    });   
    u('.btnmayorprice').removeClass('text-bg-secondary p-3')
    u('.btnmenorprice').removeClass('text-bg-secondary p-3')
    u('.btnaz').removeClass('text-bg-secondary p-3')
    u('.btnza').removeClass('text-bg-secondary p-3')
    u('.btndesc').removeClass('text-bg-secondary p-3') 
})


}

u('.btnhome').handle('click',(e)=>{
    location.reload()
})

u('#contCategory li').handle('click',(e) =>{
    //console.log(u(e.target).data('id'))
    u('div.container div.card').siblings().remove()  
    fetch(categories+`/${u(e.target).data('id')}/products`)
    .then(res => res.json())
    .then(data => {
        contenedorProduct= u('div.container div.card')
        contenedorProduct.siblings().remove()
        let cart = JSON.parse(window.sessionStorage.getItem('cart'))
        // console.log(data)     
        data.forEach(product => {
        let image ='./img/product.png'
        let cloncard = contenedorProduct.clone()
        if ( product.url_image != null && product.url_image != '' ) {
            image = product.url_image
        }
        cloncard.find('.card-title').text(`${product.name}`)
        if(product.discount > 0){
            cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
        }else{
            cloncard.find('.card-text').text(`$${product.price} `)
        }
        cloncard.find('img').attr('src', `${image}`)       
        cloncard.find('input').attr('value' , `${product.id}`)
        const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
        u('#containerProducts .row').append(container)
        if ( cart.items[product.id] ){
            cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
            cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
        }else{
            cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
        }
        cloncard.removeClass('d-none')
        container.append(cloncard)
        });   
    })
})


u('.btnbuscar').handle('click',(e)=>{
    let imp = u(e.target.parentNode).find('input')
    let text = imp.first().value
    let cart = JSON.parse(window.sessionStorage.getItem('cart'))
    if (text.split('').length < 3){
        return alert('Debe ingresar al menos letras para generar busqueda')
    }
    u('div.container div.card').siblings().remove()
    fetch(products+`?search=${text}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(product => {
            let image ='./img/product.png'
            let cloncard = contenedorProduct.clone()
            if ( product.url_image != null && product.url_image != '' ) {
                image = product.url_image
            }
            cloncard.find('.card-title').text(`${product.name}`)
            if(product.discount > 0){
                cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
            }else{
                cloncard.find('.card-text').text(`$${product.price} `)
            }   
            cloncard.find('img').attr('src', `${image}`)
            
            cloncard.find('input').attr('value' , `${product.id}`)
            const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
            u('#containerProducts .row').append(container)
            if ( cart.items[product.id] ){
                cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
                cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
            }else{
                cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
            }
            cloncard.removeClass('d-none')
            container.append(cloncard)
        });
    })
})


u('.btn-cart').handle('click', (e) => {

    let ccc = u(e.target).closest('.card-body')
    let value = ccc.find('input[name="product_id"]').first().value
    let cart = JSON.parse(window.sessionStorage.getItem('cart'))
    let toast = new bootstrap.Toast(toastLiveExample)
    fetch(products+'/' + value).then(data => data.json()).then(data => {       
        if ( ccc.find('.btn-cart').hasClass('btn-danger') ) {
            ccc.find('.btn-cart').toggleClass('btn-primary btn-danger')
            u('div.toast-body').text(`${data.name} ELIMINADO DEL CARRITO` ) 
            delete cart.items[value]
        }
        else if( ccc.find('.btn-cart').hasClass('btn-primary') ) {
            ccc.find('.btn-cart').toggleClass('btn-danger btn-primary')
            u('div.toast-body').text(`${data.name} AGREGADO AL CARRITO` ) 
            cart.items[value] = { data, quantity: 1}
        }       
        toast.show()
        window.sessionStorage.setItem('cart', JSON.stringify(cart))
    })
})

u('a.btncartmodal').handle('click', (e) => {  
    console.log(e)  
    let lista = JSON.parse(window.sessionStorage.getItem('cart')).items
    let container = u('#modal-cart ul')
    
    container.find('.alert').remove()
    if( Object.keys(lista).length<1){
        container.find('.li').remove()
        let mensaje = u('<div>').attr({class:'alert alert-warning' , role: 'alert'} )
        mensaje.text('No hay articulos para mostrar')
        container.append(mensaje)
        return
    }
    
    let toclon = container.find('li.clo')
    toclon.siblings().remove()
    
    for (let product in lista) {
        console.log(lista[product])
        let clon = toclon.clone()
        clon.removeClass('d-none', 'clo')
        clon.find('.fw-bold').text(`${lista[product].data.name}`)
        
        // clon.find('.cantidad').data('name', 1)
        clon.find('.cantidad').text(`${lista[product].quantity}`)
        clon.find('.badge').text(`$${lista[product].data.price*lista[product].quantity}`)
        clon.data('id',`${product}`)

        container.append(clon)
    }
    container.removeClass('containermo')  
})


u('.btnmas').handle('click',(e)=>{
    let id = u(e.target).closest('li').data('id')
    let total = u(e.target).closest('li').find('.badge')
    console.log(total)
    let lista = JSON.parse(window.sessionStorage.getItem('cart'))
    lista.items[id].quantity += 1
    window.sessionStorage.setItem('cart', JSON.stringify(lista))
    u(e.target).closest('div .row').find('div.cantidad').text(lista.items[id].quantity)
    total.text(`$${lista.items[id].quantity*lista.items[id].data.price}`)
})

u('.btnmenos').handle('click',(e)=>{
    let id = u(e.target).closest('li').data('id')
    let lista = JSON.parse(window.sessionStorage.getItem('cart'))
    let total = u(e.target).closest('li').find('.badge')
    if (lista.items[id].quantity<2){
        delete lista.items[id]
        window.sessionStorage.setItem('cart', JSON.stringify(lista))
        let container = u(e.target).closest('ul')
        u(e.target).closest('li').remove()
        if(Object.keys(lista.items).length<1){
            let mensaje = u('<div>').attr({class:'alert alert-warning' , role: 'alert'} )
            mensaje.text('No hay articulos para mostrar')
            container.append(mensaje)

        }
        
        initProduct()
        return
    }
    lista.items[id].quantity -= 1
    window.sessionStorage.setItem('cart', JSON.stringify(lista))
    u(e.target).closest('div .row').find('div.cantidad').text(lista.items[id].quantity)
    
    total.text(`$${lista.items[id].quantity*lista.items[id].data.price}`)

})
initProduct()

u('.btndesc').handle('click', (e)=>{
    
    u('.btnmayorprice').removeClass('text-bg-secondary p-3')
    u('.btnmenorprice').removeClass('text-bg-secondary p-3')
    u('.btnaz').removeClass('text-bg-secondary p-3')
    u('.btnza').removeClass('text-bg-secondary p-3')
    u('.btndesc').addClass('text-bg-secondary p-3')    
    u('div.container div.card').siblings().remove()  
    fetch(products+`?desc=si`)
    .then(res => res.json())
    .then(data => {
        contenedorProduct= u('div.container div.card')
        contenedorProduct.siblings().remove()
        let cart = JSON.parse(window.sessionStorage.getItem('cart'))
        // console.log(data)     
        data.forEach(product => {
        let image ='./img/product.png'
        let cloncard = contenedorProduct.clone()
        if ( product.url_image != null && product.url_image != '' ) {
            image = product.url_image
        }
        cloncard.find('.card-title').text(`${product.name}`)
        if(product.discount > 0){
            cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
        }else{
            cloncard.find('.card-text').text(`$${product.price} `)
        }
        cloncard.find('img').attr('src', `${image}`)       
        cloncard.find('input').attr('value' , `${product.id}`)
        const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
        u('#containerProducts .row').append(container)
        if ( cart.items[product.id] ){
            cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
            cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
        }else{
            cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
        }
        cloncard.removeClass('d-none')
        container.append(cloncard)
    });   
    })
})

u('.btnmenorprice').handle('click', (e)=>{
    u('.btnmayorprice').removeClass('text-bg-secondary p-3')
    u('.btnaz').removeClass('text-bg-secondary p-3')
    u('.btnza').removeClass('text-bg-secondary p-3')
    u('.btndesc').removeClass('text-bg-secondary p-3') 
    u('.btnmenorprice').addClass('text-bg-secondary p-3')
    u('div.container div.card').siblings().remove()  
    fetch(products+`?order=price&sort=asc`)
    .then(res => res.json())
    .then(data => {
        contenedorProduct= u('div.container div.card')
        contenedorProduct.siblings().remove()
        let cart = JSON.parse(window.sessionStorage.getItem('cart'))
        // console.log(data)     
        data.forEach(product => {
            let image ='./img/product.png'
            let cloncard = contenedorProduct.clone()
        if ( product.url_image != null && product.url_image != '' ) {
            image = product.url_image
        }
        cloncard.find('.card-title').text(`${product.name}`)
        if(product.discount > 0){
            cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
        }else{
            cloncard.find('.card-text').text(`$${product.price} `)
        }
        cloncard.find('img').attr('src', `${image}`)       
        cloncard.find('input').attr('value' , `${product.id}`)
        const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
        u('#containerProducts .row').append(container)
        if ( cart.items[product.id] ){
            cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
            cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
        }else{
            cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
        }
        cloncard.removeClass('d-none')
        container.append(cloncard)
    });   
})
})
u('.btnmayorprice').handle('click', (e)=>{
    u('.btnmenorprice').removeClass('text-bg-secondary p-3')
    u('.btnaz').removeClass('text-bg-secondary p-3')
    u('.btnza').removeClass('text-bg-secondary p-3')
    u('.btndesc').removeClass('text-bg-secondary p-3') 
    u('.btnmayorprice').addClass('text-bg-secondary p-3')
    u('div.container div.card').siblings().remove()  
    fetch(products+`?order=price&sort=desc`)
    .then(res => res.json())
    .then(data => {
        contenedorProduct= u('div.container div.card')
        contenedorProduct.siblings().remove()
        let cart = JSON.parse(window.sessionStorage.getItem('cart'))
        // console.log(data)     
        data.forEach(product => {
        let image ='./img/product.png'
        let cloncard = contenedorProduct.clone()
        if ( product.url_image != null && product.url_image != '' ) {
            image = product.url_image
        }
        cloncard.find('.card-title').text(`${product.name}`)
        if(product.discount > 0){
            cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
        }else{
            cloncard.find('.card-text').text(`$${product.price} `)
        }
        cloncard.find('img').attr('src', `${image}`)       
        cloncard.find('input').attr('value' , `${product.id}`)
        const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
        u('#containerProducts .row').append(container)
        if ( cart.items[product.id] ){
            cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
            cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
        }else{
            cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
        }
        cloncard.removeClass('d-none')
        container.append(cloncard)
    });   
})
})
u('.btnaz').handle('click', (e)=>{
    u('.btnmayorprice').removeClass('text-bg-secondary p-3')
    u('.btnmenorprice').removeClass('text-bg-secondary p-3')
    u('.btnza').removeClass('text-bg-secondary p-3')
    u('.btndesc').removeClass('text-bg-secondary p-3') 
    u('.btnaz').addClass('text-bg-secondary p-3')
    u('div.container div.card').siblings().remove()  
    fetch(products+`?order=name&sort=asc`)
    .then(res => res.json())
    .then(data => {
        contenedorProduct= u('div.container div.card')
        contenedorProduct.siblings().remove()
        let cart = JSON.parse(window.sessionStorage.getItem('cart'))
        // console.log(data)     
        data.forEach(product => {
        let image ='./img/product.png'
        let cloncard = contenedorProduct.clone()
        if ( product.url_image != null && product.url_image != '' ) {
            image = product.url_image
        }
        cloncard.find('.card-title').text(`${product.name}`)
        if(product.discount > 0){
            cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
        }else{
            cloncard.find('.card-text').text(`$${product.price} `)
        }
        cloncard.find('img').attr('src', `${image}`)       
        cloncard.find('input').attr('value' , `${product.id}`)
        const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
        u('#containerProducts .row').append(container)
        if ( cart.items[product.id] ){
            cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
            cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
        }else{
            cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
        }
        cloncard.removeClass('d-none')
        container.append(cloncard)
    });   
})
})

u('.btnza').handle('click', (e)=>{
    u('.btnmayorprice').removeClass('text-bg-secondary p-3')
    u('.btnmenorprice').removeClass('text-bg-secondary p-3')
    u('.btnaz').removeClass('text-bg-secondary p-3')
    u('.btndesc').removeClass('text-bg-secondary p-3') 
    u('.btnza').addClass('text-bg-secondary p-3')
    u('div.container div.card').siblings().remove()  
    fetch(products+`?order=name&sort=desc`)
    .then(res => res.json())
    .then(data => {
        contenedorProduct= u('div.container div.card')
        contenedorProduct.siblings().remove()
        let cart = JSON.parse(window.sessionStorage.getItem('cart'))
        // console.log(data)     
        data.forEach(product => {
        let image ='./img/product.png'
        let cloncard = contenedorProduct.clone()
        if ( product.url_image != null && product.url_image != '' ) {
            image = product.url_image
        }
        cloncard.find('.card-title').text(`${product.name}`)
        if(product.discount > 0){
            cloncard.find('.card-text').text(`Precio:$${product.price} Desc:$${product.discount} `)
        }else{
            cloncard.find('.card-text').text(`$${product.price} `)
        }
        cloncard.find('img').attr('src', `${image}`)       
        cloncard.find('input').attr('value' , `${product.id}`)
        const container = u('<div>').addClass('col-lg-3 col-md-6 pt-4')
        u('#containerProducts .row').append(container)
        if ( cart.items[product.id] ){
            cloncard.find('.btn-cart').toggleClass('btn-primary btn-danger')
            cloncard.find('.btn-cart').attr('title', 'Eliminar del carrito')  
        }else{
            cloncard.find('.btn-cart').attr('title', 'Agregarar del carrito')
        }
        cloncard.removeClass('d-none')
        container.append(cloncard)
        });   
    })
})
/*
https://salva-bsale-api.herokuapp.com/products?order=price
https://salva-bsale-api.herokuapp.com/products?order=name
https://salva-bsale-api.herokuapp.com/products?desc=si
*/ 