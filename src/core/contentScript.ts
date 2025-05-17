type PbiData = {
  title: string,
  description: string,
  criteria: string
}

class PbiPage {
  private static setNativeValue(element: any, value: any) {
    const valueSetter = Object?.getOwnPropertyDescriptor(element, 'value')?.set;
    const prototype = Object?.getPrototypeOf(element);
    const prototypeValueSetter = Object?.getOwnPropertyDescriptor(prototype, 'value')?.set;

    console.log("valueSetter", valueSetter);
    console.log("prototypeValueSetter", prototypeValueSetter);

    if (valueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter?.call(element, value);
    } else {
      valueSetter?.call(element, value);
    }
  }

  private static updateTitle(title: string) {
    const titleElement = document.querySelector('[aria-label="Title field"]') as HTMLInputElement;
    if (!titleElement){
      console.log("titleElement not found");
      return;
    }

    this.setNativeValue(titleElement, title);
    titleElement.dispatchEvent(new Event('input', { bubbles: true }));
    console.log("titleElement", titleElement, title);
  }

  public static updatePage(pbidata: PbiData) {
    console.log("updatePage", pbidata);
    PbiPage.updateTitle(pbidata.title);
  }
}

(() => {
  console.log("contentScript loaded")
  chrome.runtime.onMessage.addListener((obj: { type: string, page: string, data: any }) => {
      const { type, page, data } = obj;
      console.log("message", type, page)

      if (type === "NAVIGATION") {
          console.log("NAVIGATION", page);
      }

      if(type === "UPDATE_PBI") {
        console.log("UPDATE_PBI", data);
        PbiPage.updatePage(data);
      }
  });
})();