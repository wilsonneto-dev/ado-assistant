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

    element.value = value;
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

  private static updateDescription(description: string) {
    const descriptionElement = document.querySelector('[aria-label="Description"]') as HTMLDivElement;
    if (!descriptionElement){
      console.log("descriptionElement not found");
      return;
    }

    descriptionElement.innerHTML = description;
    descriptionElement.classList.toggle("show-placeholder", false);
    descriptionElement.dispatchEvent(new Event('input', { bubbles: true }));
    console.log("descriptionElement", descriptionElement, description);
  }

  private static updateCriteria(criteria: string) {
    const criteriaElement = document.querySelector('[aria-label="Acceptance Criteria"]') as HTMLDivElement;
    if (!criteriaElement){
      console.log("criteriaElement not found");
      return;
    }

    criteriaElement.innerHTML = criteria;
    criteriaElement.classList.toggle("show-placeholder", false);
    criteriaElement.dispatchEvent(new Event('input', { bubbles: true }));
    console.log("criteriaElement", criteriaElement, criteria);
  }

  public static updatePage(pbidata: PbiData) {
    console.log("updatePage", pbidata);
    PbiPage.updateTitle(pbidata.title);
    PbiPage.updateDescription(pbidata.description);
    PbiPage.updateCriteria(pbidata.criteria);
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