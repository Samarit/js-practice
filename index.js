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
            console.log('Primary button clicked')
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Danger button clicked')
        }}
    ] 
}

const modal = $.modal(options);