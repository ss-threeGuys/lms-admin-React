

export const crudUrls = {
    
    /* DO NOT DELETE */
    baseProtocol: 'http',
    baseHost: "localhost",
    basePort: 3000,
    prefix: "/admin",

    /* DO NOT DELETE */
    publisher : {
        create:     { url: '/publishers', param:{} },
        retrieve:   { url: '/publishers', param:{} },
        pagination: { url: '/publishers/paging', param:{} },
        update:     { url: '/publishers/:id', param: {id:'_id'} },
        delete:     { url: '/publishers/:id', param: {id:'_id'} } 
    },

    /* DO NOT DELETE */
    author : {
        create:     { url: '/authors', param:{} },
        retrieve:   { url: '/authors', param:{} },
        pagination: { url: '/authors/paging', param:{} },
        update:     { url: '/authors/:id', param: {id:'_id'} },
        delete:     { url: '/authors/:id', param: {id:'_id'} } 
    },

    branches: { url: "/branches" },

    book : '/books',    

    /* DO NOT DELETE */
    genre : {
        create:     { url: '/genres', param:{} },
        retrieve:   { url: '/genres', param:{} },
        update:     { url: '/genres/:id', param: {id:'_id'} },
        delete:     { url: '/genres/:id', param: {id:'_id'} } 
    },

    /* DO NOT DELETE */
    borrower : {
        create:     { url: '/borrowers', param:{} },
        retrieve:   { url: '/borrowers', param:{} },
        update:     { url: '/borrowers/:id', param: {id:'_id'} },
        delete:     { url: '/borrowers/:id', param: {id:'_id'} } 

    }

    
}

