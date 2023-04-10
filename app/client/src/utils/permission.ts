/**Copyright @ 2022 Lenovo. All rights reserved*/
/**Confidential and Proprietary*/
class Permission {
  codes: string[] = [];
  setCodes = (codes: string[]) => {
    this.codes = codes;
  };

  hasPer = (code: string) => {
    for (let i = 0; i < this.codes.length; i++) {
      if (this.codes[i].startsWith(code)) {
        return true;
      }
    }

    return false;
  };
}

export default new Permission();
