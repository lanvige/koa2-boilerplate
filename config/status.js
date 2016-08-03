const ResponseStatus = {
  Success: 0,
  Failure: -1,
  SystemError: -4096, //0x1000,
  NotSupportVersion: -4100, //0x1000 - 4,
  UserError: -8192,//0x2000,
  AccessDeny: -8193,//-0x2000 - 1,
  ExceedQuota: -8194,//-0x2000 - 2,
  InvalidAccessToken: -8195,//-0x2000 - 3,
  AnonymousUserDisallowed: -8196,//-0x2000 - 4,
  NotActivateUser: -8197,//-0x2000 - 5
  InvalidUserId: -8198,//-0x2000 - 6
};

export default ResponseStatus;
