export function getWand(idPage: string, arr: string[]): string {
    let IDSTRING: string = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === idPage) IDSTRING = arr[i];
    }
    return `${IDSTRING}`;
}

export function setLastView(id: string): void {
    localStorage.setItem('last-view', id);
}

export function SETVIEW(): void {
    localStorage.setItem('last-view', 'main-page');
    window.location.hash = `${localStorage.getItem('last-view')}`;
}
