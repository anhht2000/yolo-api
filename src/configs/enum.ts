export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum UserActiveStatus {
  IS_SEND_ACTIVE = 2,
  IS_NOT_SEND_ACTIVE = 1,
}

export enum ResidentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum ResidentActiveStatus {
  IS_SEND_ACTIVE = 2,
  IS_NOT_SEND_ACTIVE = 1,
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum OptionType {
  COLOR = 'color',
  TEXT = 'text',
}

export enum BuildingStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum RequestStatus {
  NEW = 'new',
  INPROGRESS = 'inprogress',
  CANCELED = 'canceled',
  WAITING = 'waiting',
  CLOSED = 'closed',
}

export enum FeedbackStatus {
  NEW = 'new',
  INPROGRESS = 'inprogress',
  CANCELED = 'canceled',
  WAITING = 'waiting',
  CLOSED = 'closed',
}

export enum NewsStatus {
  DRAFT = 'draft',
  WAITING_FOR_APPROVAL = 'waiting for approval',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  CANCELED = 'canceled',
}
