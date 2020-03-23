export default 
[
    { field: 'name',    header: 'Name',     type: 'string', value: '',
            validators: [
                x => (x.trim().length >= 2)
            ] },
];