let fruits = [
    {id: 1, title: 'Яблоко', price: 20, img: 'https://папироска.рф/wa-data/public/shop/products/31/10/1031/images/100165/100165.aromatizator-ngf---zelenoe-yabloko.500x0.jpg'},
    {id: 2, title: 'Апельсин', price: 30, img: 'https://eda.ru/img/eda/464x302i/s1.eda.ru/StaticContent/Photos/120214122930/120327165448/p_O.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://sbermarket.ru/spree/products/113521/preview/121699.jpg?1587401616'}
]

let options = {
    title: 'Цена на продукт',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
            priceModal.close()
        }}
    ] 
}

const toHTML = fruit => `
    <div class="col">
        <div class="card">
             <img style='height: 300px;' src=${fruit.img} class="card-img-top">
             <div class="card-body">
               <h5 class="card-title">${fruit.title}</h5>
               <a href="#" class="btn btn-primary" data-btn='price' data-id=${fruit.id}>Посмотреть цену</a>
               <a href="#" class="btn btn-danger" data-btn='remove' data-id=${fruit.id}>Удалить</a>
             </div>
        </div>
    </div>
    `

function renderFruitList () {
    const html = fruits.map(toHTML).join('') // Reduced version of fruits.map(fruit => toHTML(fruit))
    document.querySelector('#fruits').innerHTML = html
}

renderFruitList()

const priceModal = $.modal(options);

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    
    if (btnType === 'price') {
            priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong>`
        }).then(() => {
            console.log('Remove')
            fruits = fruits.filter(f => f.id !== id)
            renderFruitList()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})