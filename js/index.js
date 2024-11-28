var sName = document.getElementById("SiteName");
var sUrl = document.getElementById("SiteURL");
var bookmarkList = JSON.parse(localStorage.getItem("BookmarkList")) || [];
displayData();

function addData() {
  if (validateAll() == true) {
    var bookMark = {
      siteName: sName.value,
      siteUrl: sUrl.value,
    };
    bookmarkList.push(bookMark);
    localStorage.setItem("BookmarkList", JSON.stringify(bookmarkList));
    displayData();
    clearForm();
    Swal.fire({
      title: "Good job!",
      text: "You bookmarked successfully!",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "error!",
      text: "something wrong!",
      icon: "error",
    });
  }
}
function displayData() {
  var htmlMarkup = "";
  for (var i = 0; i < bookmarkList.length; i += 1) {
    htmlMarkup += `
        <tr>
                    <th scope="row">${i + 1}</th>
                    <td>${bookmarkList[i].siteName}</td>
                    <td><a href=${
                      bookmarkList[i].siteUrl.startsWith("https://")
                        ? bookmarkList[i].siteUrl
                        : `https://${bookmarkList[i].siteUrl}`
                    }
                     target="_blank"><button class="btn btn-success"><i
                                    class="fa-solid fa-eye p-1"></i> Visit</button></a></td>
                    <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can p-1"></i> Delete</button></td>
                </tr>
                `;
  }
  document.getElementById("Bookmarks").innerHTML = htmlMarkup;
}
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("BookmarkList", JSON.stringify(bookmarkList));
  displayData();
}
function clearForm() {
  sName.value = null;
  sUrl.value = null;
}
function validate(regex, input, inputValue, alert) {
  if (regex.test(inputValue) == true) {
    alert.classList.add("d-none");
    input.classList.replace("is-invalid", "is-valid");
    return true;
  } else {
    alert.classList.remove("d-none");
    input.classList.add("is-invalid");
    return false;
  }
}
function validateAll() {
  if (
    validate(/^\w{3,30}$/, sName, sName.value, SiteNamealert) &&
    validate(
      /^(https?:\/\/)?(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
      sUrl,
      sUrl.value,
      SiteURLalert
    )
  ) {
    return true;
  } else {
    return false;
  }
}