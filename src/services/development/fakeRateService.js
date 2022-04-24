const rates = [
    {
        _id:"2", name: "2"
    },
    {
        _id:"4", name: "4"
    },
    {
        _id:"6", name: "6"
    },
    {
        _id:"8", name: "8"
    },
    {
        _id:"10", name: "10"
    },    
];

export function getRates() {
    return rates.filter(r => r)
};