export enum NotificationStatus {
  DRAFT = 'draft',
  WAITING_FOR_APPROVAL = 'waiting_for_approval',
  CONFIRMED = 'confirmed',
  PUBLISHED = 'published',
  CANCELED = 'canceled',
}

export enum NotificationImageTypes {
  NEW = 'new',
  CLOSE = 'close',
}

export enum NotificationReadStatus {
  NOT_YET = 'not_yet',
  READED = 'readed',
}

export const NotificationCategories = [
  {
    id: 1,
    name: 'Vấn đề vệ sinh',
  },
  {
    id: 2,
    name: 'Vấn đề dịch vụ tòa nhà',
  },
  {
    id: 3,
    name: 'Vấn đề an ninh',
  },
  {
    id: 4,
    name: 'Vấn đề y tế',
  },
  {
    id: 5,
    name: 'Vấn đề các hoạt động sinh hoạt trong chung cư',
  },
  {
    id: 6,
    name: 'Thông báo từ chính quyền',
  },
];
