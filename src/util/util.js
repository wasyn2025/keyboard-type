export function classToggle(classname, remove, add) {
    document.querySelector(classname).classList.remove(remove);
    document.querySelector(classname).classList.add(add);
}