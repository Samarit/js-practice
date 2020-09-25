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
            <div class="modal-body">${options.content || ''}</div>
            <div class="modal-footer">
                <button>OK</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modal)
    return modal
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
       }
   })
}