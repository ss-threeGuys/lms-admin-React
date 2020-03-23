export default 
[
    { field: 'name',    header: 'Name',     type: 'string', value: '',
            validators: [
                x => (x.trim().length >= 2)
            ] },
    { field: 'address', header: 'Address',  type: 'string'},
    { field: 'phone',   header: 'Phone',    type: 'string'},
];