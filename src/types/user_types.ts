export type LoginResponse = {
  access: string;
  refresh: string;
};

export type LoginParam = {
  email: string;
  password: string;
};

export type InputField = {
  value: string;
  error: string;
};

export type CommentType = {
  user: number;
  account_id: number;
  comment: string;
  admin_username: string;
};

export type OptionFieldObject = {
  label: string;
  value: string;
};

export type OptionSearchColumnObject = {
  label: string;
  value: string;
};

export type OptionPageSizeObject = {
  label: string;
  value: number;
};

export type UserPermission = {
  permission_id?: number;
  permission_model: number;
  permission_access: number;
};

export type UserPermissionAccess = {
  role_id?: string;
  name: string;
  description?: string;
};

export type PermissionAccessParams = {
  accessId: string;
  permissionAccess: UserPermissionAccess;
};

export type UserPermissionModel = {
  permission_model_id: string;
  model_name: string;
  specific_field?: any;
};

export type UserRole = {
  role_id?: string;
  name: string;
  description: string;
};

export type statusTabs = {
  name: string;
  isActive: boolean;
  total?: number;
};

export type UserProfile = {
  id: number;
  name: string;
  username: string;
  email: string;
  admin_groups?: string[];
};

export type AccountChecklistParam = {
  user_id?: string;
  legal_name?: boolean;
  gender?: boolean;
  dob?: boolean;
  id_number?: boolean;
  address?: boolean;
  occupation?: boolean;
  risk_info?: boolean;
};

export type ApprovalParam = {
  account_id: number;
  account_approve: boolean;
};

export enum EmploymentStatus {
  unemployed = 'Unemployed',
  employed = 'Employed',
  selfEmployed = 'Self Employed',
  retired = 'Retired',
  student = 'Student',
  atHomeTrader = 'At-Home Trader',
  homemaker = 'Homemaker',
  unknown = 'Unknown'
}

export enum NatureOfBusiness {
  architectureEngineering = 'Architecture / Engineering',
  artDesign = 'Arts / Design',
  businessNonFinance = 'Business, Non-Finance',
  communitySocialService = 'Community / Social Service',
  computerInformationTechnology = 'Computer / Information Technology',
  construction = 'Construction',
  educationTrainingLibrary = 'Education / Training / Library',
  farmingFishingForestry = 'Farming, Fishing and Forestry',
  financeBrokerDealerBank = 'Finance/ Broker Dealer /Bank',
  foodBeverage = 'Food and Beverage',
  healthcare = 'Healthcare',
  installationMaintenanceRepair = 'Installation, Maintenance, and Repair',
  legal = 'Legal',
  lifePhysicalSocialService = 'Life, Physical and Social Service',
  mediaCommunications = 'Media and Communications',
  lawEnforcementGovernmentProtectiveService = 'Law Enforcement, Government, Protective Service',
  personalCareService = 'Personal Care / Service',
  productionManufacturing = 'Production and Manufacturing',
  transportationMaterialMoving = 'Transportation and Material Moving',
  other = 'Other'
}

export enum Region {
  hongKongIsland = 'Hong Kong Island',
  kowloon = 'Kowloon',
  newTerritories = 'New Territories'
}

export enum District {
  islands = 'Islands',
  kwaiTsing = 'Kwai Tsing',
  north = 'North',
  saiKung = 'Sai Kung',
  shaTin = 'Sha Tin',
  taiPo = 'Tai Po',
  tsuenWan = 'Tsuen Wan',
  tuenMun = 'Tuen Mun',
  yuenLong = 'Yuen Long',
  kowloonCity = 'Kowloon City',
  kwunTong = 'Kwun Tong',
  shamShuiPo = 'Sham Shui Po',
  wongTaiSin = 'Wong Tai Sin',
  yauTsimMong = 'Yau Tsim Mong',
  centralAndWestern = 'Central and Western',
  eastern = 'Eastern',
  southern = 'Southern',
  wanChai = 'Wan Chai'
}

export type EmploymentInformation = {
  account_id?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  employment_status?: string;
  employer_business?: string;
  employer_business_description?: string;
  occupation?: string;
  employer?: string;
  employer_address_line_1?: string;
  employer_address_line_2?: string;
  district?: string;
  region?: string;
  different_country_reason?: string;
};

export type PersonalInformation = {
  account_id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  hkid_number?: string;
  nationality?: string;
  date_of_birth?: string;
  country_of_birth?: string;
  phone_country_code?: string;
  phone_number?: string;
  us_resident?: boolean;
  hk_resident?: boolean;
  address_line_1?: string;
  address_line_2?: string;
  district?: string;
  region?: string;
  city?: string;
  country?: string;
};

export type ResidenceInfo = {
  account_id?: string;
  created?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  address_line_1?: string;
  address_line_2?: string;
  district?: string;
  region?: string;
};
