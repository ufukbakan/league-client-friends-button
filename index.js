/**
 * Author: Ufuk Bakan
 * Date: 21.12.2023
 * Linkedin: https://www.linkedin.com/in/ufuk-bakan/
 * Github: https://github.com/ufukbakan
 */

import { domChange } from "./domListener";
import "./theme.css";
import groupIcon from "./assets/group.svg";
let fetchingGroupIcon = false;
let isFriendsOpen = true;

export function init(context) {
    const rcp = context.rcp;

    rcp.whenReady('rcp-fe-lol-uikit')
        .then(_uikit => {
            domChange.on(addToggleFriendsButton);
        })

}

async function addToggleFriendsButton() {
    const friendsButtonExists = !!document.querySelector(".friends-button");
    if (!friendsButtonExists) {
        const alphaPanel = document.querySelector(".alpha-version-panel");
        if (alphaPanel) {
            const alphaTag = alphaPanel.querySelector(".alpha-tag");
            createFriendsButton().then(button => {
                alphaPanel.replaceChild(button, alphaTag);
                domChange.off(addToggleFriendsButton);
                restoreStatus();
            })
        }
    }
}

function createFriendsButton() {
    return new Promise((resolve, reject) => {
        if (!fetchingGroupIcon) {
            fetchingGroupIcon = true;
            const groupButton = document.createElement("div");
            groupButton.classList.add("social-button", "friends-button");
            fetch(groupIcon)
                .then(res => res.text())
                .then(svg => {
                    groupButton.innerHTML = svg;
                    groupButton.addEventListener("click", toggleSocialPanel);
                    resolve(groupButton);
                })
                .catch(err => reject(err));
        }
    })
}

function toggleSocialPanel() {
    isFriendsOpen = !isFriendsOpen;
    restoreStatus();
}

function restoreStatus() {
    const lowerPanel = document.querySelector(".lol-social-lower-pane-container");
    if (lowerPanel) {
        if (isFriendsOpen) {
            lowerPanel.classList.remove("friends-invis");
        } else {
            lowerPanel.classList.add("friends-invis");
        }
    }
}