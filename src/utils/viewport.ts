export const resizeDrawerOnVK = (root: HTMLElement, drawer: HTMLElement) => {
  if (window.visualViewport) {
    const viewport = window.visualViewport;

    const drawerContent = drawer.querySelector('.MuiPaper-root') as HTMLElement;
    drawerContent.style.paddingBottom = `${window.innerHeight - viewport.height + 20}px`;

    if (viewport.offsetTop !== 0) {
      root.style.transform = `translateY(${viewport.offsetTop}px) scale(${1 / viewport.scale})`;
      drawer.style.transform = `translateY(${viewport.offsetTop}px) scale(${1 / viewport.scale})`;
    } else {
      root.style.removeProperty('transform');
      drawer.style.removeProperty('transform');
    }
  }
};

export const resizeRootOnVK = (root: HTMLElement) => {
  if (window.visualViewport) {
    const viewport = window.visualViewport;
    // root.style.paddingBottom = `${window.innerHeight - viewport.height}px`;
    const offsetTop = viewport.height - root.getBoundingClientRect().height + viewport.offsetTop;

    if (viewport.offsetTop !== 0) {
      root.style.transform = `translateY(${offsetTop}px) scale(${1 / viewport.scale})`;
    } else {
      root.style.removeProperty('transform');
    }
  }
};
