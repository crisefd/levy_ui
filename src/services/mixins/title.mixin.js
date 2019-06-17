
// credits to: https://tahazsh.com/vuebyte-change-page-title

function getTitle (vm) {
    const { title } = vm.$options;
    if (title) {
        return typeof title === "function" ? title.call(vm) : title
    }
}

export const titleMixin = {
    created () {
        const title = getTitle(this);
        if (title) {
            document.title = title;
        }
    }
}