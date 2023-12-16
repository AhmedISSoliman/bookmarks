var siteName = document.getElementById('siteName');
var webSite = document.getElementById('webSite');
var submitBtn = document.getElementById('submitBtn');

var bookmarksList;
if ('bookmarks' in localStorage) {
    bookmarksList = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks(bookmarksList);
}
else {
    bookmarksList = [];
    displayBookmarks(bookmarksList)
}
function createBokkmark() {
    if (validateForm() && !(siteName.classList.contains('is-invalid') || webSite.classList.contains('is-invalid'))) {
        var site = {
            siteName: siteName.value,
            webSiteURL: webSite.value
        }
        bookmarksList.push(site);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarksList))
        displayBookmarks(bookmarksList);
        resetForm();
        siteName.classList.remove('is-valid')
        webSite.classList.remove('is-valid')
    }
    else {
        displaySwal();
    }

}

function displayBookmarks(bookmarkList) {
    if (bookmarkList.length > 0) {
        var container = '';
        for (let i = 0; i < bookmarkList.length; i++) {
            console.log(`${bookmarkList[i].webSiteURL}`)
            container += ` <tr>
                        <td>${i + 1}</td>
                        <td>${bookmarkList[i].siteName}</td>
                        <td>
                            <button onclick='visitWebSite("${bookmarkList[i].webSiteURL}")'  class="btn btn-success">
                                <i class="fa-solid fa-eye me-1"></i>
                                Visit</button>
                        </td>
                        <td>
                            <button onclick='deleteBookMark(${i})' class="btn btn-danger"><i class="fa-solid fa-trash me-1"></i>Delete</button>
                        </td>
                    </tr>`
        }
        document.getElementById('bookmarkData').innerHTML = container;
    }
    else {
        document.getElementById('bookmarkData').innerHTML = `
        <tr>
        <td colspan='4'>
        No data to show
        </td>
        </tr>`;
    }

}

function deleteBookMark(index) {
    bookmarksList.splice(index, 1);
    displayBookmarks(bookmarksList);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksList))
}
function resetForm() {
    siteName.value = '';
    webSite.value = '';
}
var sitNameRegex = /^\w{3,}(\s+\w+)*$/;
var webSiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
siteName.addEventListener("input", function () {
    displayErrorOnInput(siteName, sitNameRegex);
});

webSite.addEventListener("input", function () {
    displayErrorOnInput(webSite, webSiteRegex);
});
function validateForm() {
    if (siteName.value == '' || webSite.value == '') {
        return false;
    }
    if (!sitNameRegex.test(siteName.value)) {
        displayErrorOnInput(siteName, sitNameRegex);
        return false;
    }
    if (!webSiteRegex.test(webSite.value)) {
        displayErrorOnInput(webSite, webSiteRegex);
        return false;
    }
    else {
        return true;
    }
}
function displaySwal() {
    swal({
        title: 'Site Name or Url is not valid, Please follow the rules below :',
        text: `
            - Site name must contain at least 3 characters
            - Site URL must be a valid one
            `,
        icon: "error",
        buttons: {
            danger: {
                text: 'Cancel'
            }
        }
    });
}
function displayErrorOnInput(element, regex) {
    if (regex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

function visitWebSite(e) {
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(e)) {
        open(e);
    } else {
        open(`https://${e}`);
    }
}