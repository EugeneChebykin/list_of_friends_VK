export default {
    render(templateName, model) {
        templateName = templateName + "Template";

        const templateElement = document.getElementById(templateName);
        const templateSource = templateElement.innerHTML;
        const renderFn = Handlers.compile(templateSourse);

        return renderFn(model);
    }
}