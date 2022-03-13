export const RequestCategories = [
    {
        id: 1,
        name: "Khu vực chung",
        equipments: [
            {id: 3, name: 'Điều hoà'},
            {id: 4, name: 'Sảnh hành lang'},
            {id: 5, name: 'Đèn hành lang'},
            {id: 6, name: 'Phòng thu gom rác'},
            {id: 7, name: 'Thang máy'}
        ]
    },
    {
        id: 2,
        name: "Khu vực riêng",
        equipments: [
            {id: 8, name: 'Điện'},
            {id: 9, name: 'Nước'},
            {id: 10, name: 'Nhà vệ sinh'},
            {id: 11, name: 'Sàn nhà'},
            {id: 12, name: 'Bếp'}
        ]     
    }
]

export enum RequestImageTypes {
    NEW = 'new',
    CLOSE = 'close'
}