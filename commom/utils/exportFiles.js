export const exportFileFn = function(exportFn, fileName, params) {
    let xmlResquest = new XMLHttpRequest();
    xmlResquest.open("POST", exportFn, true);
    xmlResquest.setRequestHeader("Content-type", "application/json");
    xmlResquest.setRequestHeader(
        "Authorization",
        "Bearer " + sessionStorage.getItem("TOKEN"),
    );
    xmlResquest.setRequestHeader("depID", sessionStorage.getItem("depID"));
    xmlResquest.responseType = "blob";

    xmlResquest.onload = function(oEvent) {
        let content = xmlResquest.response;
        let elink = document.createElement("a");
        elink.download = `${fileName}.xlsx`;
        elink.style.display = "none";
        let blob = new Blob([content]);
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    };
    // let params = this.axiosParams()
    xmlResquest.send(
        JSON.stringify(params)
    );

    xmlResquest.send();
}