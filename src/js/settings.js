let friendsSort = localStorage.friendSort || name;

export function setFriendSort(sort) {
    friendsSort = sort;
    localStorage.friendSort = sort;
}

export function getFriendSort() {
    return friendsSort;
}