export const nav = [
    {
        icon: 'fa-solid fa-gauge',
        text: "Dashboard",
        path: "/", // Corrected path to match routes
    },
    {
        icon: 'fa-solid fa-money-bill',
        text: "Invoice",
        path: "", // Corrected path to match routes
        submenu: [
            {
                icon: 'fa-solid fa-file-import', // Example icon for Import Invoice
                text: "Import Invoice",
                path: "/importinvoice"
            },
            {
                icon: 'fa-solid fa-file-alt', // Example icon for Invoice Report
                text: "Invoice Report",
                path: "/invoicereport"
            },
        ]
    },
    {
        icon: 'fa-solid fa-cog', // Assuming an icon for Settings
        text: "Setting",
        path: "", // Corrected path to match routes
        submenu: [
            {
                icon: 'fa-solid fa-user', // Example icon for User
                text: "User",
                path: "/user"
            },
            {
                icon: 'fa-solid fa-building', // Example icon for Company Info
                text: "Company Info",
                path: "/companyinfo"
            },
        ]
    },
];