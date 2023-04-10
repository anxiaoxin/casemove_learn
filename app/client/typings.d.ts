/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
declare interface Window {
  chrome: any;
}
