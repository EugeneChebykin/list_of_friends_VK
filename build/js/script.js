import Model from "./model.js";
import View from "./view.js";

(async () => {
    try {
        const header = document.querySelector("#header");
        await Model.login("7065111", 2 | 8192);
        const [me] = await Model.getUser({name_case: 'gen'});

        header.innerHTML = View.render("header", me)
    } catch(e) {
        console.log(e);
    }
})();
