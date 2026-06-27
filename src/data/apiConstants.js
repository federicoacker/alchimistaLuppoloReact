const BASE_API_URL = "http://localhost:3000"

const sortingOptions = [
    { value: "name", label: "Nome" },
    { value: "price", label: "Prezzo" },
    { value: "updated_at", label: "Data" }
]
const baseOptions = [
    { value: "any", label: "Tutte" }
];

export {
    BASE_API_URL,
    sortingOptions,
    baseOptions
}