import * as settings from "../settings.js";
import * as utils from "../utils.js";
import View from "../view.js";

const resultsNode = document.querySelector("#results");
let items = [];
let sorting = settings.getFriendSort();

export default {
  setData(newItems) {
    items = newItems;
  },
  setSorting(newSorting) {
    sorting = newSorting;
    settings.setFriendSort(newSorting);
  },
  render() {
    if (sorting === "name") {
      utils.sortByName(items);
    } else if (sorting === "bday") {
      utils.sortByBDay(items);
    }
    resultsNode.innerHTML = View.render("friends", { list: items });

    const sort = resultsNode.querySelector("[data-role=sort]");
    sort.value = sorting;
    sort.addEventListener("change", (event) => {
      this.setSorting(event.target.value);
      this.render();
    });
  },
};
