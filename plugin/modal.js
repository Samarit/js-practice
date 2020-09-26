function _createModal(options) {
    const modal = document.createElement('div');
    const DEFAULT_WIDTH = '600px';
    modal.classList.add('amodal');
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window" style='width: ${options.width || DEFAULT_WIDTH}'>
            <div class="modal-header">
                <span class="modal-title">${options.title || 'Default title'}</span>
                ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal-body" data-content="true">
                ${options.content || ''}
            </div>
        </div>
    </div>
    `)
    const footer = _createModalFooter(options.footerButtons)

    document.body.appendChild(modal)
    return modal
}

function _createModalFooter (buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    return wrap
}

$.modal = function(options) {
   const $modal = _createModal(options);
   const ANIMATION_SPEED = 200;
   let closing = false;
   let destroyed = false;

   const methods = {
        open() {
            if (destroyed) console.log('Modal is destroyed')
            !closing && $modal.classList.add('open')

        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        }
    }

    const listener = event => {
        if (event.target.dataset.close) {
            methods.close()
        }
    }

   $modal.addEventListener('click', listener);
   
   return Object.assign(methods, {
       destroy() {
           $modal.parentNode.removeChild($modal)
           $modal.removeEventListener('click', listener)
           destroyed = true
       },
       setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
       }
   })
}