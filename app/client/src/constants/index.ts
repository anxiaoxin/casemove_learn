/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { StringIndexMap } from '@/type';

export const DEFAULT_NAME = 'Umi Max';
export enum HEADER_TAB {
  OVERVIEW,
  CO_MANAGE,
  PLATFORM_MANAGE,
  MAINTENANCE,
}

export const MENU_KEYS = {
  overview: 'overview',
  company: 'company',
  cost: 'cost',
  resource: 'resource',
  record: 'record',
  costentry: 'costentry',
  permission: 'permission',
  role: 'role',
  user: 'user',
  dataManage: 'dataManage',
  resourceManager: 'resourceManager',
  subManager: 'subManager',
  coConfig: 'coConfig',
  virtualNetwork: 'virtualNetwork',
  virtualNetworkSegment: 'virtualNetworkSegment',
  image: 'image',
  addcop: 'addcop',
  addmirror: 'addmirror',
  editMirror: 'editMirror',
  cloudpc: 'cloudPc',
  mirror: 'mirror',
  addUser: 'addUser',
  editUser: 'editUser',
};

export const MENU_KEYS_I18N_MAP: StringIndexMap = {
  home: 'co_manage',
  company: 'co_info',
  AddCop: 'addcop',
  cost: 'cost_center',
  resource: 'resource_control',
  record: 'operation_history',
  overview: 'overview',
  permission: 'permission_management',
  plateform: 'plateform_manage',
  role: 'role_management',
  user: 'user_management',
  dataManage: 'data_manage',
  resourceManager: 'resource_manager',
  subManager: 'sub_manager',
  coConfig: 'co_config',
  virtualNetwork: 'virtual_network',
  virtualNetworkSegment: 'virtual_network_segment',
  image: 'mirror_manage',
  editMirror: 'edit_mirror',
  addUser: 'add_user',
  editUser: 'edit_user',
};

export const CO_INFO_TABLE_HEADER: StringIndexMap = {
  co_name: 'co_name',
  manager_name: 'manager_name',
  manager_email: 'manager_email',
  manager_phone: 'manager_phone',
  co_email_ip: 'co_email_ip',
  staff_nums: 'staff_nums',
  operation: 'operation',
};

export const COST_TABLE_HEADER = {
  coName: 'staff_nums',
  cloudPc: 'it_code',
  outboundFlow: 'use_phone',
  coStorage: 'use_secretary',
  backupCapacity: 'use_secretary_email',
  coAmount: 'use_secretary_phone',
  operation: 'operation',
};

export const COCOST_TABLE_HEADER = {
  cloudPcId: 'cloud_pc_id',
  config: 'config',
  cloudPc: 'cloud_pc',
  outboundFlow: 'outbound_flow',
  coStorage: 'co_storage',
  backupCapacity: 'backup_capacity',
  coAmount: 'co_amount',
};

export const RESOURCE_TABLE_HEADER = {
  coName: 'co_name',
  baseMirror: 'base_mirror_times',
  dsMirror: 'ds_mirror',
  preApp: 'pre_app',
  coApp: 'co_app',
  operation: 'operation',
  mirror_name: 'mirror_name',
  alter_time: 'alter_time',
  os: 'os',
  status: 'status',
  usage: 'usage',
  remarks: 'remarks',
};

export const RECORD_TABLE_HEADER = {
  time: 'time',
  operator: 'operator',
  operateAccount: 'operate_account',
  operateEvent: 'operate_event',
  operateTarget: 'operate_target',
  os_time: 'os_time',
  operate_project: 'operate_project',
  operate_parameter: 'operate_parameter',
  operation: 'operation',
  operate_content: 'operate_content',
  type: 'type',
};

export const USER_TABLE_HEADER = {
  userName: 'user_name',
  role: 'role',
  itCode: 'it_code',
  phone: 'phone',
  operation: 'operation',
};

export const SUB_TABLE_HEADER = {
  cloudEntryType: 'cloud_entry_type',
  cloudPlatform: 'cloud_platform',
  companyCount: 'company_count',
  createTime: 'create_time',
  deleted: 'has_deleted',
  entityIdentifier: 'entity_identifier',
  entityName: 'entity_name',
  mcmpEntryId: 'mcmp_entryid',
  regionId: 'region_id',
  status: 'status',
  operation: 'operation',
};

export const SEGMENT_TABLE_HEADER = {
  addressCount: 'address_count',
  addressStart: 'address_start',
  addressEnd: 'address_end',
  addressSpace: 'address_space',
  deleted: 'has_deleted',
  inuse: 'inuse',
  operation: 'operation',
};

export const IMAGE_TABLE_HEADER = {
  baseImageId: 'base_imageid',
  companyName: 'affiliated_company_name',
  createTime: 'create_time',
  deleteTime: 'delete_time',
  imageId: 'image_id',
  imageName: 'mirror_name',
  osType: 'os',
  osVersion: 'os_version',
  platform: 'platform',
  venusDeleteTime: 'venus_delete_time',
  venusImageName: 'venus_image_name',
  imageEnglishName: 'image_ename',
  operation: 'operation',
};

export const BaseMirrorInfo = [
  {
    i18nString: 'use_times',
    key: 'useNumber',
  },
  {
    i18nString: 'mirror_size',
    key: 'imageSize',
  },
  {
    i18nString: 'os',
    key: 'os',
  },
];

export const CustomMirrorInfo = [
  {
    i18nString: 'mirror_name',
    key: 'imageName',
  },
  {
    i18nString: 'use_times',
    key: 'useNumber',
  },
  {
    i18nString: 'mirror_size',
    key: 'imageSize',
  },
  {
    i18nString: 'os',
    key: 'os',
  },
];

export const OverviewInfos = [
  {
    icon: 'company',
    i18nString: 'total_co',
    key: 'allCompanyAmount',
    unit: 'co_num',
  },
  {
    icon: 'user',
    i18nString: 'total_user',
    key: 'allUserAmount',
    unit: 'per',
  },
  {
    icon: 'computer',
    i18nString: 'total_cpc',
    key: 'allVmAmount',
    unit: 'set',
  },
];

export const OPERATE_TYPE: StringIndexMap = {
  CREATE: 'create',
  ALLOT: 'allot',
  BACKUP: 'backup',
  DELETE: 'delete',
  RENEW: 'renew',
  UPGRADE: 'upgrade',
};

export const COST_ENTRY_ITEMS = {
  platform_maintenance_fee: '平台运维费',
  sub_fee: '订阅费',
  instant_reading: '即时应用',
  smart_office: '智慧办公',
  scientific_research_innovation: '科学研创',
  month_fee: '包月价格',
  use_fee: '即用即付价格',
  data_sc: '数据超算',
  outbound_flow: '出站流量',
  co_storage: '企业存储',
  backup_capacity: '备份空间',
};

export const PERMISSIONS = [
  {
    value: '总览',
    code: '1',
    children: [],
  },
  {
    value: '企业管理',
    code: '2',
    children: [
      {
        value: '企业信息',
        code: '2-1',
        children: [
          {
            value: '浏览企业信息',
            code: '2-1-1',
          },
          {
            value: '添加企业信息',
            code: '2-1-2',
          },
          {
            value: '编辑企业信息',
            code: '2-1-3',
          },
        ],
      },
      {
        value: '费用中心',
        code: '2-2',
        children: [
          {
            value: '浏览企业缴纳费用',
            code: '2-2-1',
          },
          {
            code: '2-2-2',
            value: '浏览企业云订阅',
          },
          {
            code: '2-2-3',
            value: '浏览费用明细',
          },
          {
            code: '2-2-4',
            value: '录入成本',
          },
        ],
      },
      {
        value: '资源管理',
        code: '2-3',
        children: [
          {
            value: '浏览企业资源（镜像、应用）',
            code: '2-3-1',
          },
        ],
      },
      {
        value: '操作记录',
        code: '2-4',
        children: [
          {
            value: '浏览操作记录',
            code: '2-4-1',
          },
        ],
      },
    ],
  },
  {
    code: '3',
    value: '权限管理',
    children: [
      {
        value: '角色管理',
        code: '3-1',
        children: [
          {
            value: '浏览角色详情',
            code: '3-1-1',
          },
          {
            value: '新增角色',
            code: '3-1-2',
          },
          {
            value: '删除角色',
            code: '3-1-3',
          },
        ],
      },
      {
        value: '用户管理',
        code: '3-2',
        children: [
          {
            value: '分配用户角色',
            code: '3-2-1',
          },
        ],
      },
    ],
  },
];

export const PERMISSION_PATH_MAP = {
  [MENU_KEYS.overview]: '1',
  [MENU_KEYS.company]: '2-1',
  [MENU_KEYS.cost]: '2-2',
  [MENU_KEYS.resource]: '2-3',
  [MENU_KEYS.record]: '2-4',
  [MENU_KEYS.role]: '3-1',
  [MENU_KEYS.user]: '3-2',
  [MENU_KEYS.costentry]: '2-2-4',
};

export const Pattern = {
  phone: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
};

export const CloudEntryType = ['SYSTEM', 'USER'];

export const PlatformType = ['LINUX', 'WINDOWS_CLIENT', 'WINDOWS_SERVER'];

export enum VmState {
  ACTIVE = 'ACTIVE',
  ASSIGNING = 'ASSIGNING',
  STOPPED = 'STOPPED',
  REASSIGNUSER = 'REASSIGNUSER',
  BUILD = 'BUILD',
  ERROR = 'ERROR',
  UNKNOWN = 'UNKNOWN',
  STOPPING = 'STOPPING',
  STARTING = 'STARTING',
  DEALLOCATING = 'DEALLOCATING',
  DELETED = 'DELETED',
  HARD_REBOOTING = 'HARD_REBOOTING',
  NSG_UPDATING = 'NSG_UPDATING',
  REASSIGNING = 'REASSIGNING',
}
