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

const modal = $.modal(options);
