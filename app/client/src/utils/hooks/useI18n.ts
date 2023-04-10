/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
import { useIntl } from 'umi';
interface Params {
  [key: string]: any;
}
const useI18n = () => {
  const intl = useIntl();
  const i18n = (id: string, params?: Params): string => {
    return id ? intl.formatMessage({ id }, params) : '';
  };
  return i18n;
};

export default useI18n;
