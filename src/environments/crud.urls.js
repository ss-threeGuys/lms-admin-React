
let publisherBaseUrl = process.env.REACT_APP_BASE_URL_PUBLISHER; 
let authorBaseUrl = process.env.REACT_APP_BASE_URL_AUTHOR; 

export const crudUrls = {
 
    publisher : {
        create:     { url: publisherBaseUrl, param:{} },
        retrieve:   { url: publisherBaseUrl, param:{} },
        pagination: { url: publisherBaseUrl+'paging', param:{} },
        update:     { url: publisherBaseUrl+':id', param: {id:'_id'} },
        delete:     { url: publisherBaseUrl+':id', param: {id:'_id'} } 
    },
    author : {
        create:     { url: authorBaseUrl, param:{} },
        retrieve:   { url: authorBaseUrl, param:{} },
        pagination: { url: authorBaseUrl+'paging', param:{} },
        update:     { url: authorBaseUrl+':id', param: {id:'_id'} },
        delete:     { url: authorBaseUrl+':id', param: {id:'_id'} } 
    },


    book : '/books',

    genre : {
        create:     { url: '/genres', param:{} },
        retrieve:   { url: '/genres', param:{} },
        update:     { url: '/genres/:id', param: {id:'_id'} },
        delete:     { url: '/genres/:id', param: {id:'_id'} } 
    },

    borrower : {
        create:     { url: '/borrowers', param:{} },
        retrieve:   { url: '/borrowers', param:{} },
        update:     { url: '/borrowers/:id', param: {id:'_id'} },
        delete:     { url: '/borrowers/:id', param: {id:'_id'} } 

    }

    
}

