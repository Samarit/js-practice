const fruits = [
    {id: 1, title: 'Яблоко', price: 20, img: 'https://папироска.рф/wa-data/public/shop/products/31/10/1031/images/100165/100165.aromatizator-ngf---zelenoe-yabloko.500x0.jpg'},
    {id: 2, title: 'Апельсин', price: 30, img: 'https://eda.ru/img/eda/464x302i/s1.eda.ru/StaticContent/Photos/120214122930/120327165448/p_O.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://sbermarket.ru/spree/products/113521/preview/121699.jpg?1587401616'}
]

let options = {
    title: 'My title',
    closable: true,
    content: `
    <p>Modal is working</p>
    <p>Lorem ipsum dolor sit.</p>
    `,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            modal.close()
        }}
    ] 
}

const toHTML = fruit => `
    <div class="col">
        <div class="card">
             <img style='height: 300px;' src=${fruit.img} class="card-img-top">
             <div class="card-body">
               <h5 class="card-title">${fruit.title}</h5>
               <a href="#" class="btn btn-primary">Посмотреть цену</a>
               <a href="#" class="btn btn-danger">Удалить</a>
             </div>
        </div>
    </div>
    `

function renderFruitList () {
    const html = fruits.map(toHTML).join('') // Reduced version of fruits.map(fruit => toHTML(fruit))
   document.querySelector('#fruits').innerHTML = html
}

renderFruitList()

const modal = $.modal(options);
