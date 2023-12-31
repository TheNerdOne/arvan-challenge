interface ICookie {
  cname: string;
  cvalue?: string;
  exdays?: number;
}
export class cookieFuns {
  setCookie({ cname, cvalue, exdays }: ICookie) {
    const d = new Date();
    if (exdays) {
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      window.document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  }
  getCookie({ cname }: ICookie) {
    let name = cname + "=";
    let ca = window.document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
