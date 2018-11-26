// pagination
const ITEMS_PER_PAGE = 10
const PAGER_MODULO = 4

const trace = require('../config/trace')

const debug = 'mnca:pager'

const Pager = {

    pager: {},

    create(page, count) {

        let pager = this.pager
        
        pager.current_page = 1

        if (page) {
            pager.current_page = page
        }

        pager.nb_pages = Math.floor((count + ITEMS_PER_PAGE - 1) / ITEMS_PER_PAGE)

        if (pager.nb_pages < pager.current_page) {
            pager.current_page = pager.nb_pages
        }
        
        pager.pager_modulo = PAGER_MODULO
        // on va calculer la premiere page de la pagination courante 
        // et savoir si on a une pagination précédente  et/ou suivante
        pager.has_previous_page = true
        pager.has_next_page = true
        pager.first_page = 1

        // on a pas de pagination suivante et précédente
        if (pager.nb_pages <= (pager.pager_modulo + 2)) {
            pager.has_previous_page = false
            pager.has_next_page = false
            pager.first_page = 2

        }
        // on a une pagincation suivante et/ou précédente
        else {
            // la page courante est sur la premiere pagination
            if (pager.current_page <= (pager.pager_modulo + 1)) {
                pager.has_previous_page = false
                pager.first_page = 2
            }
            // la page courante a une pagination précédente
            else {
                // calcul de la premiere page de la pagination courante (contenant la page courante)
                pager.first_page = (Math.floor((pager.current_page - 2) / pager.pager_modulo) * pager.pager_modulo) + 2

                // cas particulier ou le calcul tombe sur la derniere page
                if (pager.first_page == pager.nb_pages) {
                    pager.first_page = pager.nb_pages - pager.pager_modulo
                }

                // cas ou  la pagination courante est la dernière pagination
                if ((pager.first_page + pager.pager_modulo) >= pager.nb_pages) {
                    pager.has_next_page = false
                }
            }
        }
        trace(debug, 'new pager %o', pager)
        return pager
    },

    sliceElements(elements) {

        let offset = ITEMS_PER_PAGE * (this.pager.current_page - 1)

        let sliceElements = elements.slice(offset, offset + ITEMS_PER_PAGE)

        trace(debug, 'pager offset ' + offset)

        return sliceElements

    }

}

module.exports=Pager